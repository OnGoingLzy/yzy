<template>
	<view style="max-height: 75vh;overflow: auto;" > 
		<goodsCard :goods="goods" :shop="shop"></goodsCard>
		<view style="padding: 10px 5px;">
			<view style="width: 100%;max-height: 33px;margin-top: 15px;">
				<text style="font-weight: bold;">选择单品</text>
			</view>
			
			</br>
			<view class="box">
				<text style="color: #1296DB;" decode="true" v-text="goods.specification+'&ensp;'"></text>
			</view>
		</view>
		
		<view style="display: flex;padding: 0px 5px;">
			<view style="width: 60%;">
				<text style="font-weight: bold;" decode="true">库存数量：</text>
				<text style="color: #c7c7c7;font-size: 13px" v-text="shop.inventory==null ? 0:shop.inventory" v-if="!reservation"></text>
				<text style="color: #c7c7c7;font-size: 13px" v-text="'可预订'" v-if="reservation"></text>
				<text decode="true" style="color: #c7c7c7;font-size: 13px" v-text="shop.limitNum==0 ? '':'&ensp;|&ensp; 限购:'+shop.limitNum"></text>
			</view>
			
			<view style="    display: flex;justify-content: flex-end;width: 60%;padding-right: 20rpx;">
				<uni-number-box :min="1" :max="maxBuyNum" :value="num"  @change="numChange()"/>
			</view>
			
		</view>
		<view>
			<button class="button" @click="submit()">
				<text v-if="orderType=='加入购物车'">加入购物车</text> 
				<text v-if="orderType=='立即购买'">立即购买</text>
				<text v-if="orderType=='问诊开方'">问诊开方</text>
				<text v-if="orderType=='提交需求'">提交需求</text>
			</button>
		</view>
		<!-- 流程导航 -->
		<view class="title-navi" v-if="orderType=='问诊开方'">
			<text class="f-active-color">点击问诊开方</text>
			<image class="title-navi-next" src="../../static/icon/next_step_filled.svg"></image>
			<text>问诊信息</text>
			<image class="title-navi-next" src="../../static/icon/next_step.svg"></image>
			<text>医生开方</text>
			<image class="title-navi-next" src="../../static/icon/next_step.svg"></image>
			<text>下单购药</text>
		</view>
		<view style="height: 5vh;width: 100%;"></view>
	</view>
</template>

<script>
	import goodsCard from '@/components/goods/goods_card.vue';
	import request from '@/common/api/request.js'
	export default {
		components:{goodsCard},
		name:"orderPopup",
		props: {
			shop: {
				type: Object,
				default: {}
			},
			goods:{
				type: Object,
				default: {}
			},
			orderType:{
			},
		},
		data() {
			return {
				num:1,
				localOrderType:'',
				recipeId:'',
				reservation:false
			};
		},
		 watch: {
		    orderType: {
		      immediate: true, 
		      deep: true, 
		      handler(newVal) {
		        this.localOrderType = newVal;
		      }
			}  
		},
		computed:{
			maxBuyNum(){
				if(this.shop.reservationFlag=='y'&& (this.shop.inventory==0  || this.shop.flag=='0')){
					this.reservation = true
					return 999
				}
				
				if(this.shop.limitNum>0){
					return this.shop.inventory<this.shop.limitNum ? this.shop.inventory:this.shop.limitNum
				}
				else{
					return this.shop.inventory
				}
			}
		},
		methods:{
			//查询该药品是否存在可用处方
			async existsEffectiveRecipe(){
				var that = this
				if(this.goods.goodsType == '处方药'){
					const url = '/api/recipe/existsEffectiveRecipe';
					const method = 'POST';
					const data = {
						openid: uni.getStorageSync("openid"),
						goodsId:this.goods.goodsId,
						num:this.num,
					};
					try {
						const res = await request('yzy_app', url, method, data);
						console.log(res); //统一格式：{"data":{}, "flag":99, "result":"成功"}
						if(res.code==99){
							if(res.data.data=='true'){
								this.recipeId = res.data.recipeId
								//存在有效处方
								uni.showModal({
									title: '注意',
									content: '您已存在一个可用处方,是否直接购买药品？',
									success: function(res) {
										if (res.confirm) {
											that.toBuyGoods()
								
										} else if (res.cancel) {
											return
										}
									}
								});
							}else{
								this.toPrescription()
							}
						}
					} catch (error) {
						console.log(error);
					}
				}
			},
			toBuyGoods(){
				
				const result = [
					{"id":0, //门店id
					"shopName":this.shop.shopName,
					"shopId":this.shop.shopId,
					"simplifyShopName": this.shop.simplifyShopName,
					
					"drugs":[
							{"id":this.recipeId,
							"drugId":this.goods.goodsId,
							"drugName":this.goods.genericName,
							"specification":this.goods.specification,
							"price":this.shop.price,
							"num": this.num,
							"imgLszh":this.goods.goodsImg[0].tplszh,
							"manufacturer": this.goods.manufacturer,
							"sellUnit": this.goods.sellUnit,
							"healthInsuranceFlag": this.shop.healthInsuranceFlag,
							},
						],
					},
				]
				uni.navigateTo({
					url: `/pages/confirm_order/confirm_order?drug=${encodeURIComponent(JSON.stringify(result))}`,
				})
			},
			// 发现bug @change事件会把button的字情况
			numChange(value){
				this.num = value
			},
			submit(){
				//传给父组件
				var data={ 
					num:this.num,
					type:this.localOrderType,
				};
				if(this.orderType!=='提交需求'&&(this.shop.price==null||this.shop.price==0)){
					uni.showToast({
						icon:'error',
						title:'暂无定价'
					})
					return	
				}
				if(this.orderType=='提交需求'){
					var result = [
						{"id":0, //门店id
						"shopName":this.shop.shopName,
						"shopId":this.shop.shopId,
						"simplifyShopName": this.shop.simplifyShopName,
						
						"drugs":[
								{"id":this.recipeId,
								"drugId":this.goods.goodsId,
								"drugName":this.goods.genericName,
								"specification":this.goods.specification,
								"price":this.shop.price,
								"num": this.num,
								"imgLszh":this.goods.goodsImg?this.goods.goodsImg[0].tplszh:null,
								"manufacturer": this.goods.manufacturer,
								"sellUnit": this.goods.sellUnit,
								},
							],
						},
					]
					console.log(result)
					uni.navigateTo({
						url:"/subPackage_other/submit_requirements/submit_requirements?drug="+encodeURIComponent(JSON.stringify(result))
					})
					
				}
				
				if(this.orderType=='问诊开方'){
					
					if(this.shop.inventory==null || this.shop.inventory==0) {
						uni.showToast({
							icon:'error',
							title:'库存不足'
						})
						return	
					}
					this.existsEffectiveRecipe()
					
				}else if(this.orderType=='立即购买'){
					if(this.shop.inventory==null || this.shop.inventory==0) {
						uni.showToast({
							icon:'error',
							title:'库存不足'
						})
						return	
					}
					this.$emit("closePopupBuyGoods",data)
				}
				else{
					this.$emit("closePopupBuyGoods",data)
				}
				
			},
			// 前往问诊开方页
			toPrescription(){
				console.log(this.goods.goodsId)
				uni.navigateTo({
					url: `/pages/consultation/consultation?goodsId=${this.goods.goodsId}&shopId=${this.shop.shopId}&goodsAmount=${this.num}&stockLimit=${this.shop.limitNum}&stock=${this.shop.inventory}`,
				})
			},
		}
	}
</script>

<style>
	
uni-number-box {
	scale: 110%;
}
.box{
	margin: 15px 5vw 0 5vw;
    border-radius: 25px;
    max-width: 90vw;
    border: 1px solid #1296DB;
    padding: 5px;
}
.button{
	margin: 15px;
	padding: 10px;
	background: #1296DB;
	height: 40px;
	border-radius: 30px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: bold;
}
.title-navi {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10rpx 26rpx 20rpx 26rpx;
	background-color: white;
}

.title-navi-next {
	width: 20rpx;
	height: 20rpx;
}
</style>