<template>
	<view>
		<view :class="recipe.status=='可使用'||recipe.status=='已使用'? 'true-header-box':'false-header-box'">
			<view>
				
			</view>
			<view>
				<text style="font-size: 17px;font-weight: bold;color: white;" v-text="recipe.status=='可使用'||recipe.status=='已使用' ?'审核通过':recipe.status"></text>
				<text style="font-size: 13px;color: white;">\n处方仅限本平台使用,自行配药不具有处方效力</text>
			</view>
		</view>
		<view class="recipe-id-box">
			<text v-text="'处方ID：'" style="color: gray;"></text>
			<text v-text="recipe.recipeBizId" style="font-weight: bold;"></text>
		</view>
		
		<view style="    padding: 5px;background: white;">
			<view :style="recipe.status=='可使用'? 'background: #f3fff9;':'background: #f7f7f7;'" class="recipe-box">
				<view style="width: 80%;">
					<view style="display:flex;align-items:center;text-align: center;">
						<image src="../../static/icon/cf.png" class="icon-class" style="width: 16px;height: 16px;"></image>
						<text style="font-size: 13px;color: gray;">药品处方\n</text>
					</view>
					
					<text v-text="recipe.drugName+'\n'" style="font-weight: bold;"></text>
					<text v-text="recipe.drugSpecification+'/'+recipe.sellUnit +'\n'" style="font-size: 13px;color: gray;"></text>
				</view>
				<view style="width: 20%;text-align: right;display: grid;;">
					<view>
						<text v-text="recipe.status" :style="recipe.status=='可使用'||recipe.status=='已使用'? 'color: #0ec385':'color: gray'"></text>
					</view>
					<view style="    display: flex; justify-content: flex-end; align-items: flex-end;">
						<text v-text="'x'+recipe.amount"></text>
					</view>
				</view>
			</view>
			
			<view style="text-align: center;align-items: center;">
				<text style="font-size: 20px;font-weight: bold;">电子处方笺</text>
			</view>
			
		</view>
		
		 <view class="recipe-image-container">
		    <!-- 使用 v-if 控制加载圈的显示状态 -->
		    <view v-if="isLoading" class="loading-container">
		      <image src="../../static/icon/loading.svg" class="loading-spinner"></image>
		    </view>
		    
		    <image
		      style="width: 100vw; height: 162.2vw;margin-bottom: 30px; "
		      :src="recipe.recipePdfImgUrl"
		      @load="onImageLoad"
			   @click="showRecipe()"
		      mode="aspectFit"
		    ></image>
		  </view>
		
		<view class="button" v-if="recipe.status=='可使用'" @click="toBuyGoods">
			<text style="color: white; font-size: 20px;font-weight: bold;" >去购药</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				recipe:{},
				GoodsSettlementInfo:{},
				isLoading: true, // 控制加载圈的显示状态
			}
		},
		onLoad: function (option) {
			//解析传过来的对象
			console.log(option)
			this.recipe = JSON.parse(decodeURIComponent(option.recipe));
			if(option.GoodsSettlementInfo){
				//console.log(option.GoodsSettlementInfo)
				this.GoodsSettlementInfo = JSON.parse(decodeURIComponent(option.GoodsSettlementInfo));
				console.log(this.GoodsSettlementInfo)
			}
			
		},
		methods: {
			// 图片加载完成时触发
			onImageLoad() {
			  this.isLoading = false; // 隐藏加载圈
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
							"sellUnit":this.GoodsSettlementInfo.sellUnit,
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
			
		}
	}
</script>

<style lang="scss">
.recipe-image-container{
	
	  width: 100vw;
	  height: 162.2vw;
	 text-align: center;
}
.loading-spinner {
  width: 50px; /* 加载圈的宽度 */
  height: 50px; /* 加载圈的高度 */
}	
.button{
	width: 96vw;
	position: fixed;
	bottom: 30px;
	margin: 0 2vw;
	border-radius: 50px;
	background: #0ed196;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #78ffd6, #0ed196);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #78ffd6, #0ed196); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	text-align: center;
	align-items: center;
}
.recipe-box{
	padding: 5px;display: flex;border-radius: 5px;margin-top: 5px;
}		
.true-header-box{
	width: 92vw;
	background: #0ed196;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #78ffd6, #0ed196);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #78ffd6, #0ed196); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	padding: 4vw;
}
.false-header-box{
	width: 92vw;
	background: #b9b9b9;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #b9b9b9, #a9a9a9);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #b9b9b9, #a9a9a9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	padding: 4vw;
}
.recipe-id-box{
	background: white;height: 40px;display: flex;padding-left: 20px;margin-bottom: 10px;
	align-items: center;
}
 page{
 	background-color: #ebebeb;
 }
</style>
