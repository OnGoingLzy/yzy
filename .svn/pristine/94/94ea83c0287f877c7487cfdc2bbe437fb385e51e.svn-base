<template>
	<view>
		<view class="container">
			<view class="header-container">
				<text style="font-size:18px;font-weight: bold;">{{shopName + '\n'}}</text>
				<text style="font-size: 13px;">资质校验 | 正品承诺</text>
			
			
				<view v-if="shop!==null">
					<view style="" >
						<text v-text="'药房地址: '" style="font-size: 13px;color: #8b8b8b;"></text>
						<text v-text="shop.shopAddress" style="font-size: 13px;color: #8b8b8b;" class="goods-info-text"></text>		
					</view>
					<view style="margin: 0;width: 100%;" class="goods-info-text" @click="callPhone(shop.shopPhone)">
						<text v-text="'联系电话: '" style="font-size: 13px;color: #8b8b8b;"></text>
						<text v-text="shop.shopPhone" style="font-size: 13px;color: #0055ff;"></text>
					</view>
					<view style="margin: 0;width: 100%;" class="goods-info-text" @click="callPhone(shop.shopPhone)">
						<text v-text="'营业时间: '" style="font-size: 13px;color: #8b8b8b;"></text>
						<text v-text="shop.businessHours" style="font-size: 13px;color: #8b8b8b;"></text>
					</view>
				</view>
			</view>
			
			
			<view class="certifcate-container" v-if="shop!==null">
				<map style="width: 100%; height: 30vh;" 
				:style="{height:mapheight}" 
				:show-location='true'  
				:latitude="shop.latitude" 
				:longitude="shop.longitude" 
				:markers="markers" 
				:scale="scale"  
				@tap="toLocation()"
				>
				
				</map>
			</view>
			<!-- 右下角悬浮按钮 -->
			    <view class="floating-button" @click="toLocation()"  v-if="shop!==null">
					<view style="display: flex; flex-direction: column; align-items: center;line-height: 15px;">
					      <image src="/static/icon/右转向灯.svg" style="    width: 24px;height: 24px;"></image>
					      <text class="button-text">前往药房</text>
					</view>
			    </view>
			
			<view v-for="(item,i) in certificate" :key="i" class="certifcate-container">
				<text style="font-size: 16px;font-weight: bold;">{{item.shopCertificate + '\n'}}</text>
				<text style="font-size: 13px;color: #bcbcbc;">{{item.shopCertificateNo}}</text>
				<image :src="item.shopCertificateUrl ? 'http://images.yndzyf.com/getimage.ashx?mlszh='+item.shopCertificateUrl : '../../static/icon/loading.svg'" style="width: 100%;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
	export default {
		data() {
			return {
				shop:null,
				shopName:{},
				shopId:{},
				certificate:[{
						id:1,
						shopCertificate:'营业执照',
						shopCertificateNo:'',
						shopCertificateUrl:null,
					},
					{
						id:2,
						shopCertificate:'药品经营许可证',
						shopCertificateNo:'',
						shopCertificateUrl:null,
					},
				],
				markers: [
				  {
				    id: 1,
				    latitude: 24.833571, // 位置点的纬度，与上面的 shop.latitude 相同
				    longitude: 102.839036, // 位置点的经度，与上面的 shop.longitude 相同
				    title: "云南省医药有限公司", // 位置点的名称
					width: 40, // 标记点宽度
					height: 40, // 标记点高度
					iconPath: '/static/icon/location.svg',  //重点在路径这里
				  },
				],
				mapheight: "200px", // 设置地图的高度
				scale: 16, // 地图缩放级别
				latitude: 24.83430561, 
				longitude: 102.84125743,
					
			}
		},
		onShow() {
			if(this.shop){
				
				this.markers= [{
						id: 0,   //id 必填项
						width: 40,
						height: 40,
						callout:{
							content:"646"
						},
						longitude: this.longitude,
						latitude: this.latitude,
						iconPath: '/static/icon/location.svg',  //重点在路径这里
					
					}];
			}
		},
		onLoad: function (option) {
			//解析传过来的对象
			
			if(option.shop!=null){
				this.shop =  JSON.parse(decodeURIComponent(option.shop));
				
				this.latitude=this.shop.latitude
				this.longitude=this.shop.longitude
				console.log("have shop")
			}
			else{
				
				console.log(this.shopId)
				this.getShop(JSON.parse(decodeURIComponent(option.shopId)))
			}
			this.shopName = JSON.parse(decodeURIComponent(option.shopName));
			this.shopId = JSON.parse(decodeURIComponent(option.shopId));
		},
		mounted() {
			this.getShopCertificate()
		},
		methods: {
			toLocation(){
				console.log(this.shop)
				var longitude=102.839036
				var latitude=24.833571
				var name = "云南省医药有限公司"
				
				if(this.shop){
					longitude=this.shop.longitude
					latitude=this.shop.latitude
					name=this.shop.shopName
				}
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					name:name,
				})
			},
			async getShop(shopId){
				const url = '/api/shop/getShopBaseInfo';
				const method = 'POST'; 
				const data = {
					shopId: shopId
				};
				try {
					const res = await request('yzy_app', url, method, data);
						//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(res.code == 99 && res.data.data!=null){
						this.shop = res.data.data[0]
						console.log(this.shop.shopPhone)
					}
					else {
						
					}
				} catch (error) {
					
				}
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
				
			},
			async getShopCertificate(){
				console.log("获取门店资质")
				const url = '/api/shop/getShopCertificate';
				const method = 'POST'; 
				const data = {
					shopId: this.shopId
				};
				try {
					const res = await request('yzy_app', url, method, data);
					console.log(res);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(res.code == 99 && res.data.data!=null){
						this.certificate = res.data.data
					}
					else {
						
					}
				} catch (error) {
					
				}
			}
		}
	}
</script>

<style lang="scss">
.floating-button {
  position: fixed;
  right: 10vw;
  bottom: 5vh;
  background-color: #3c8dbc; /* 设置蓝色背景颜色 */
  border-radius: 50%; /* 使按钮变成圆形 */
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.button-text {
  color: white;
  font-size: 12px;
}	
.container{
	background: #efefef;
	border-radius: 20px 20px 0 0;
	min-height: 100px;
	width: 100vw;
}
.header-container{
	width: 96vw;
	background: white;
	border-radius: 20px 20px 0 0;
	padding: 2vw;
}
.certifcate-container{
	margin: 2vw 3vw 0 3vw;
	padding: 2vw;
	min-height: 100px;
	border-radius: 15px;
	background: white;
}
page{
	background: #efefef;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to bottom, #1296DB, #efefef);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to bottom, #1296DB, #efefef); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
