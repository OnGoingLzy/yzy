<template>
	<view style="line-height: normal;">
		<view class="shop-container">
			<view class="left-container">
				<view style="display: flex;align-items: center"  @click="toShop">
					<image src="/static/icon/药店.svg" style="width: 18px;height: 18px;"></image>
					<text v-text="shop.simplifyShopName"></text>
				</view>
				<view style="padding-left: 5px;max-height: 20px;color: #c01a04;display: flex;"  @click="toShop">
					<view>
						<text v-text="shop.distance?'距您'+shop.distance+'km':'\n'"></text>
					</view>
					
					<view v-if="shop.healthInsuranceFlag=='y'" class="yb-tag">
						<text>可线上医保</text>
					</view>
					<!-- {{'距您'+shop.distance+'km'}} -->
					<!-- <text style="color: #c01a04;" v-text="'\n距您'+shop.distance+'km'"></text> -->
				</view>
				<view style="padding-left: 5px;height: 20px;" @click="toShop">
					<text v-text="''+shop.shopAddress" style="font-size: 13px;color: #8b8b8b;" class="goods-info-text"></text>
							
				</view>
				
				<!-- <view style="margin: 0;width: 60%;" class="goods-info-text" @click="callPhone(shop.shopPhone)">
					<text v-text="'联系电话: '" style="font-size: 13px;color: #8b8b8b;"></text>
					<text v-text="shop.shopPhone" style="font-size: 13px;color: #0055ff;"></text>
				</view>
				<view style="margin: 0;width: 60%;" class="goods-info-text" @click="callPhone(shop.shopPhone)">
					<text v-text="'营业时间: '" style="font-size: 13px;color: #8b8b8b;"></text>
					<text v-text="shop.businessHours" style="font-size: 13px;color: #8b8b8b;"></text>
				</view> -->

			</view>
			<view class="right-container" @click="toGoodsDetails(goods,shop)">
				<view style="text-align: right;">
					<text v-text="(shop.price==0)?'详询门店':'￥'+shop.price" class="goods-price"></text>
				</view>
				<view style="justify-content: flex-end;display: flex;">
					<view><text style="color: #8b8b8b;font-size: 23rpx;" v-text="shop.inventory>0?'库存: ':'无库存'"></text></view>
					<view style="width: 40px;">
						<text v-if="shop.reservationFlag!=='y'||shop.inventory>0" v-text="shop.inventory+ '' +goods.sellUnit" style="color: #c01a04;font-size: 23rpx;"></text>
						<text v-if="(shop.reservationFlag=='y'&&shop.inventory==0)" v-text="shop.inventory>0 ?shop.inventory+ '' +goods.sellUnit:'可预订'" style="color: #4b9810;font-size: 23rpx;"></text>
					</view>
					
				</view>
				<view class="button-view" >
						<text style="font-size: 13px;">查看商品详情</text>				
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"shopCard",
		props: {
			shop: {
				type: Object,
				default: {}
			},
			goods:{
				type: Object,
				default: null
			},
			enableClick:{
				
			}
		},
		data() {
			return {
				
			};
		},
		mounted() {
			
		},
		methods:{
			toShop(){
				uni.navigateTo({
					url:'/pages/shop_certificate/shop_certificate?shopName='+encodeURIComponent(JSON.stringify(this.shop.shopName))+'&shopId='+encodeURIComponent(JSON.stringify(this.shop.shopId))+'&shop='+encodeURIComponent(JSON.stringify(this.shop))
				})
			},
			toGoodsDetails(goods,shop){
				console.log(goods)
				uni.navigateTo({
					url:"/pages/goods_details/goods_details?goods="+encodeURIComponent(JSON.stringify(goods))+"&shop="+encodeURIComponent(JSON.stringify(shop))
					//传对象参数给这个页面需要使用这个方法
				})
			},
			callPhone(phone){
				// 使用正则表达式匹配电话号码
				const phoneNumberMatches = phone.match(/\d+-?\d+/g);
				
				// 提取匹配到的数字部分作为电话号码
				if (phoneNumberMatches && phoneNumberMatches.length > 0) {
				  const phoneNumber = phoneNumberMatches[0];
				  console.log("提取到的电话号码：" + phoneNumber);
				  uni.makePhoneCall({
				  	phoneNumber: phoneNumber //仅为示例
				  });
				} else {
				  console.log("未找到电话号码");
				}
				
			}
		},
	}
</script>

<style lang="scss">
.yb-tag{
	    max-width: 69px;
	    line-height: 13px;
	    padding: 1px 3px;
	    border: #0aa71a solid 1px;
	    border-radius: 7px;
	    text-align: center;
	    align-items: center;
	    justify-content: center;
	    display: flex;
	    background: #0aa71a;
	    color: white;
	    font-size: 13px;
}	
.button-view{
	padding: 2px 5px 2px 5px;
	height: 19px;
	border-radius: 12px;
	background: #1296DB;
	color: white;
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: center;
	    margin: auto;
}	
.goods-info-text{
	margin: auto;
	font-size: 13px;
	overflow: hidden;
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 2; /** 显示的行数 **/
	line-height: 20px;
}	
.shop-container{
	line-height: 19px;
	padding: 2vw;
	border-radius: 15px;
	display: flex;
	// min-height: 80px;
	box-shadow: 2px -1px 10px 0.5px rgba(0, 0, 0, 0.2);
}

.left-container {
	width: 62vw;
	display: flex;
	flex: 1;
	flex-direction: column;	   
}
.right-container{
	margin: auto;
	    margin-left: 15px;
	text-align: right;
	// width: 35vw;
}
.goods-price {
	color: #c01a04;
	font-size: 15px;
	font-family: fantasy;
}
*{
	line-height: normal;
}
</style>