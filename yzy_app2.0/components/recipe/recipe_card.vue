<template>
	<view class="recipe-card">
		<view>
			<text user-select=true v-text="'问诊单号：'+recipe.clinicId" style="font-size: 14px;"></text>
			<!-- <text v-text="recipe.issueTime==null?'\n等待开具,1分钟内开具完成':'\n处方开具时间：'+recipe.issueTime" style="font-size: 13px;color: #999999;"></text> -->
			<text v-text="'\n处方药：'+recipe.clinicDrugName" v-if="recipe.issueTime==null" style="font-weight: bold;"></text>
			<text v-text="'\n患者：'" style="color: gray;"></text>
			<text v-text="recipe.patName" style="font-size: 13px;"></text>
			<text v-if="recipe.status=='待审核' || recipe.issueTime==null" v-text="'\n药师审核中,请稍等'" style="color: #e72222;"></text>
		</view>
		<view class="line" style="height: 1upx;background-color: #ccc;margin-top: 5px;"></view>
		<view :style="recipe.status=='可使用'? 'background: #f3fff9;':'background: #f7f7f7;'" class="recipe-box" @click="toRecipeDetail" v-if="recipe.status">
			<view style="width: 80%;">
				<view style="display:flex;align-items:center;text-align: center;">
					<image src="../../static/icon/cf.png" class="icon-class" style="width: 16px;height: 16px;"></image>
					<text style="font-size: 13px;color: gray;">药品处方\n</text>
				</view>
				
				<text v-text="recipe.drugName+'\n'" style="font-weight: bold;"></text>
				<text v-text="recipe.drugSpecification+'/'+recipe.sellUnit +'\n'" style="font-size: 13px;color: gray;"></text>
			</view>
			<view style="width: 20%;text-align: right;display: grid;;">
				<view :style="statusStyle">
					
					<!-- <text v-text="recipe.status" :style="recipe.status=='可使用'||recipe.status=='已使用'? 'color: #0ec385':'color: gray'"></text> -->
					<text v-text="recipe.status" ></text>
				</view>
				<view style="    display: flex; justify-content: flex-end; align-items: flex-end;">
					<text v-text="'x'+recipe.amount"></text>
				</view>
			</view>
		</view>
		
		<view  style="    display: flex;justify-content: flex-end;padding: 5px;">
			
			<button class="mini-btn" type="default" size="mini" style="margin: initial;    border-radius: 50px;margin-right: 10px;"
				@click="toHome" plain="true">再去逛逛</button>
			
			<button v-if="recipe.status=='可使用'" class="mini-btn" type="primary" size="mini" style="margin: initial;    border-radius: 50px;margin-right: 10px;"
				@click="toShoppingCart" plain="true">去购物车</button>
				
			<button v-if="recipe.status=='可使用'" class="mini-btn" type="warn" size="mini" style="margin: initial;    border-radius: 50px;"
				@click="toBuyGoods()">立即购买</button>	
		</view>
		
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
	export default {
		name:"recipe_card",
		props: {
			recipe: {
				// type: Object,
				default: null,

			}
		},
		data() {
			return {
				GoodsSettlementInfo:null
			};
		},
		mounted() {
			//console.log("load recipe card"+this.recipe.status)
			if(this.recipe.status=='可使用'){
				this.getGoodsSettlementInfo()
			}
		},
		// onShow() {
		// 	this.getGoodsSettlementInfo();
		// },
		computed:{
			//获取不同状态的字体样式
			statusStyle(){
				if (this.recipe.status === '可使用' || this.recipe.status === '已使用') {
				  return 'color: #0ec385';
				}else if(this.recipe.status === '待审核'){
					return 'color: #ff8d00';
				}
				 else {
				  return 'color: gray';
				}
			
			},
		},
		methods:{
			toHome(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			toBuyGoods(){
				
				const result = [
					{"id":0, //门店id
					"shopName":this.GoodsSettlementInfo.shopName,
					"shopId":this.GoodsSettlementInfo.shopId,
					"simplifyShopName": this.GoodsSettlementInfo.simplifyShopName,
					
					"drugs":[
							{"id":this.GoodsSettlementInfo.recipeBizId,
							"drugId":this.GoodsSettlementInfo.goodsId,
							"drugName":this.GoodsSettlementInfo.drugName,
							"specification":this.GoodsSettlementInfo.drugSpecification,
							"price":this.GoodsSettlementInfo.price,
							"num": this.GoodsSettlementInfo.amount,
							"imgLszh":this.GoodsSettlementInfo.goodsImg,
							"manufacturer": this.GoodsSettlementInfo.manufacturer,
							"sellUnit": this.GoodsSettlementInfo.sellUnit,
							"healthInsuranceFlag": this.GoodsSettlementInfo.healthInsuranceFlag,
							},
						],
					},
				]
				console.log(result)
				uni.navigateTo({
					url: `/pages/confirm_order/confirm_order?drug=${encodeURIComponent(JSON.stringify(result))}`,
				})
			},
			async getGoodsSettlementInfo(){
				const url = '/api/trade/getGoodsSettlementInfo';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid"),
					clinicId: this.recipe.clinicId
				};
				try {
					const response = await request('yzy_app', url, method, data);
					//console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						
						if(response.data.flag==99){
							//console.log(response.data.data[0])
							this.GoodsSettlementInfo = response.data.data[0]
							
						}else{
							
						}
						
					} else {
						uni.showToast({
							icon: 'error',
							title: response.msg,
							duration: 3000
						})
					}
				} catch (error) {
					uni.showToast({
						icon: 'error',
						title: error,
						duration: 3000
					})
				}
			},
			toShoppingCart(){
				uni.switchTab({
					url:'/pages/shopping_cart/shopping_cart'
				})		
			},
			toRecipeDetail(){
				if(this.GoodsSettlementInfo==null){
					uni.navigateTo({
						url:'/pages/recipe_detail/recipe_detail?recipe='+encodeURIComponent(JSON.stringify(this.recipe))
					})
				}else 
				uni.navigateTo({
					url:'/pages/recipe_detail/recipe_detail?recipe='+encodeURIComponent(JSON.stringify(this.recipe))+'&GoodsSettlementInfo='+encodeURIComponent(JSON.stringify(this.GoodsSettlementInfo))
				})
			},
			showRecipe(){ 
				var that = this
				// 预览图片
				uni.previewImage({
					urls: [that.recipe.recipePdfImgUrl],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.recipe-box{
	padding: 5px;display: flex;border-radius: 5px;margin-top: 5px;
}	
.recipe-card{
	background: white;
	border-radius: 10px;
	width: 92vw;
	padding: 2vw;
}
</style>