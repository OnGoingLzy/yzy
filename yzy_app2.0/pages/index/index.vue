<template>
	<!-- Nihao -->
	<view class="content">
		<button @click="toSubPack">跳转分包-久远银海</button>
		<!-- <button @click="toweb">跳转web</button> -->
	<!-- Hello -->
		<view class="search-container">
			<!-- <image src="/static/icon/yzyicon.svg" style="width: 224px;height: 52px;border-radius: 20%;object-fit: cover;"></image> -->
		    <view class="search-input" @click="toNewSearch()">
		      <input type="text" class="search-text"  disabled="true" placeholder="药名、品牌、厂家、症状"/>
			  <view style="height: 100%;width: 40px;text-align: center;" @tap="clearSpmc()">
				  <text class="voice-icon" style="    line-height: 30px;">×</text>
			  </view>
			  <view>
		      <button  @tap="toNewSearch()" style="height: 30px; max-width: 20vw; border-radius: 30px; background-color: #409EFF; color: #fff; font-size: 14px;display: flex;justify-content: center;">
		        <text style="line-height: 30px;">搜索</text>
		      </button>
			  </view>
			  
		    </view>
		</view>
		<view class="color-container">
		
			<!-- 分类容器 -->
			<view class="main-container" style="height: auto;">
				
				<view>
					<text style="font-weight: bold;">商品分类</text>
				</view> 
				<view>
					<swiper style="min-height: 61.6vw;;" circular indicator-dots="true"  interval="2000" indicator-active-color="#409EFF"
						duration="500">
						<swiper-item v-for="(page, pageIndex) in Math.ceil(category.length / 15)" :key="pageIndex">
							<uni-grid :column="5" :highlight="true"  :showBorder="false" >
								<uni-grid-item v-for="(item, index) in getPageCategories(pageIndex)" :index="item.id" :key="item.id" >
									<view class="grid-item-box" style="background-color: #fff;" @click="toCategory(index,item.id,pageIndex,item.categoryName)">
										<!-- <image :src="icon[index%7]" class="icon-class"></image> -->
										
										<image :src="'http://images.yndzyf.com/getimage.ashx?mlszh='+item.categoryImg" class="icon-class"></image>
										<text class="text" style="font-size: 13px;">{{item.categoryName}}</text>
									</view>
								</uni-grid-item>
							</uni-grid>	
						</swiper-item>
					</swiper>	
				</view>
				
				
			</view>
		</view>
		
	<!-- 	<view style="" class="main-container" style="display: flex;justify-content: space-between;"> 
			<view class="active-card" @click="toAppointment()">
				<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21946532" style="width: 32px;height: 32px;"></image>
				<text style="font-weight: bold;">预约挂号</text>
			</view>
			
			<view class="active-card" @click="toVideo1">
				<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21974134" style="width: 32px;height: 32px;"></image>
				<text style="font-weight: bold;">科普宣传</text>
			</view> 
			
			<view class="active-card" @click="toVideo2">
				<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21974147" style="width: 32px;height: 32px;"></image>
				<text style="font-weight: bold;">{{'云找药\n'+'使用指南'}}</text>
			</view>
			
		</view> -->
		
		<!-- 轮播图 -->

			<view class="uni-margin-wrap">
				<swiper class="swiper" circular  autoplay="true" interval="3000" style="height: 43vw;width: 96vw;"
					duration="1000">
					<swiper-item v-for="(url,i) in swiperUrl" :key="i">
						<image :src="url" class="swiper-2" :mode="'scaleToFill'" @click="toOtherMiniProgram(i)"></image>
					</swiper-item>
				</swiper>
			</view>		

		
		<view class="recommendation-title">
			<text style="font-size: 19px;font-weight: bold;">药房精选</text>
		</view>
		<!-- 推荐药品容器 -->
		<view class="main-container2" >
			<view v-for="(goods, i) in searchResults" :key="i" @click="toGoodsSellShop(goods)" class="recommendation-box">
				 <goods-cardbigimg :goods="goods"></goods-cardbigimg> 
				<goods-card2 :goods="goods"></goods-card2>
			</view>
		</view>
		<!-- <button @click="testPay">直接支付1分</button> -->
		<!-- <button @click="testQueryPay('202308177097851972444225536','202300000043')">查询支付结果</button> -->
		<!-- <button @click="testExistsPrePayOrderWxPay">支付已存在的订单</button> -->

		<!-- <button @click="testSubmitRefundApplication">提交退款申请</button>
		<button @click="testRequestRefund">正式请求微信退款</button>

		<button @click="testRequestQueryRefund">查询退款结果</button> -->
		<!-- <button @click="testPublishMsg">审核完消息推送</button>
		<button @click="testPublishMsg2">未付款消息推送</button> -->
		<!-- <button @click="testPublishMsg">审核完消息推送</button>
		<button @click="testPublishMsg2">未付款消息推送</button>
		<button @click="queryPay">批量查询微信支付结果</button> -->
		<view style="display: flex;width: 100%;justify-content: center;" @click="toCertificate">
			<view class="certificate-box">
				<text v-text="'平台资质证书展示'" style="color: #fff; text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);"></text>
			</view>
		</view>
		<view class="index-bottom">
			<view>点此阅读</view>
			<view style="color: #1296DB;" @click="gotoAuthenticate()">《云找药用户须知》</view>
		</view>
		
		<!-- <uni-popup ref="popup" type="center" >
			<view style="width: 80vw;padding: 3vw;background: white;border-radius: 15px;text-align: center;">
				<view>
					<text style="font-size: 18px;font-weight: bold;">路- 一路艰辛 一路相伴</text>
				</view>
			  <view>
				  <text>十年来
				   我们努力将腹膜透析液
				   送到更多肾衰竭患者家中
				   未来，我们会继续坚持
				   </text>
			  </view>
			  <video
			     controls
			     id="myvideo"
			     :src="videoUrl"
			     v-if="videoPlay"
				 autoplay="true"
			  ></video>
			</view>
		</uni-popup> -->
		
		
		
	</view>
</template>

<script>
	import goodsCard2 from '@/components/goods/goods_card2.vue';
	import request from '@/common/api/request.js'
	
	
	export default {
		data() {
			return {
				
				defaultIcon:'../../static/icon/yp.png',
				searchObj: {
					searchContent: '', //商品查询名
					pageIndex: 1,
					pageSize: 20,
					drugsList: [],
					sortRule:'默认',
					filterRule:'无',//筛选条件
				},
				searchResults:[],
				category:[],
				swiperUrl:[
					"http://images.yndzyf.com/getimage.ashx?mlszh=21562118&sy=",
					"http://images.yndzyf.com/getimage.ashx?mlszh=20999312&sy=",
					"http://images.yndzyf.com/getimage.ashx?mlszh=21182372&sy=",
				],
				icon:[
					'../../static/icon/categoryIcon/药品.svg',
					'../../static/icon/categoryIcon/药品1.svg',
					'../../static/icon/categoryIcon/药品2.svg',
					'../../static/icon/categoryIcon/药品3.svg',
					'../../static/icon/categoryIcon/药品4.svg',
					'../../static/icon/categoryIcon/药品5.svg',
					'../../static/icon/categoryIcon/药品6.svg',
					'../../static/icon/categoryIcon/药品7.svg',
					// 添加更多图片文件名
				],		
				testImg:[
					'http://images.yndzyf.com/getimage.ashx?mlszh=21089350',
					'http://images.yndzyf.com/getimage.ashx?mlszh=21089354',
					'http://images.yndzyf.com/getimage.ashx?mlszh=21089391',
					'http://images.yndzyf.com/getimage.ashx?mlszh=21089393',
					'http://images.yndzyf.com/getimage.ashx?mlszh=21088516',
					'http://images.yndzyf.com/getimage.ashx?mlszh=21089507',
					'http://images.yndzyf.com/getimage.ashx?mlszh=21089630'
				]
			}
		},
		components:{goodsCard2 },
		mounted() {
			this.searchGoods()
			this.getGoodsCategory()
			
			
		},
		onLoad(options) {
			
		},
		methods: {
			toweb(){
				uni.navigateTo({
					url:'/pages/outer_webview/outer_webview2'
				})
			},
			toVideo1(){
				uni.navigateTo({
					url:'/pages/video_page/video_page?src='+encodeURIComponent(JSON.stringify("https://appletservice.dyb.yn.cn/jkkp.mp4"))
				})
			},
			toVideo2(){
				
				uni.navigateTo({
					url:'/pages/video_page/video_page?src='+encodeURIComponent(JSON.stringify("https://appletservice.dyb.yn.cn/syzn.mp4"))
				})
			},
			toDoctorQuery(){
				uni.redirectTo({
					url:"/subPackage_appointment/doctor_queryAppointment/doctor_queryAppointment"
				})
			},
			toAuthorizePhone() {
				uni.navigateTo({
					url: '/pages/login/login'
					
				})
			},
			//前往预约界面
			toAppointment(){
				if(!uni.getStorageSync("phone")){
					this.toAuthorizePhone()
					return
				}
				uni.navigateTo({
					url:"/subPackage_appointment/appointment/appointment"
				})
			},
			toSubPack(){
				uni.redirectTo({
					// url:"/subPackage_appointment/index/index"
					url:"/subPackage_yinhai/index/index"
				})
			},
			toOtherMiniProgram(i){
				var that = this
				// const appid = 'xx'
				// const path = 'pages/index/index?id=123'
				console.log(i)
				if(i==1) {
					// uni.navigateTo({
					//   url: '/pages/outer_webview/outer_webview2?url='+encodeURIComponent(JSON.stringify('https://www.baidu.com'))
					//   // url: '/pages/outer_webview/outer_webview2?url='+encodeURIComponent(JSON.stringify('https://d.baiyaodajiankang.com/w6mkv'))
					// })
					uni.navigateToMiniProgram({
					  appId: 'wxffe680a300a29912',
					  path: '/pages/index/index',
					  extraData: {
					    'from': '云找药'
					  },
					  success(res) {
					    // 打开成功
						console.log("跳转其他小程序成功")
					  },
					  fail: err => {
					    console.log(err);
					  }
					})
				}
				if(i==2){
					
					var src= 'https://eca1adb7636e0fe5dc2895c2318b65e2.v.smtcdns.com/om.tc.qq.com/Af3CDF-hSwPF66LzjQoACa9tUDafKVbukLNaxG7ONCzk/B_JxNyiJmktHRgresXhfyMelgW8UCu677gtCk0UpllLP1NXwzgrLud5EhnUFs-ktvh/svp_50001/szg_1891_50001_0bf2fqabwaaabuapdgfuq5pvclgddmwaag2a.f632.mp4?sdtfrom=v1104&guid=1361c0d17440cc9d&vkey=CB8D01EB1D223FF0AF6C3AE537727079834E98052E1A339F3BB39B5AB4ACE8154377DA709626FB7F9334A7D1BBBCD699D4D0168B96CFD3C3F069E2DDCCF09D20D23890892B2429EBE6BCCDDD744329DA484C696480267431EEF574BB768EEFC104C3E32AE0C7B2EB670046C14CD0C7E42D0CCB475009CAA90AD90098E868C9157AEADE61117EDE7EC1D44FEA7125B18E7258FF2891623F996944EAD78002EA947D51BC901CB8E86E'
					// uni.navigateTo({
					// 	url:'/pages/video_page/video_page?src='+encodeURIComponent(JSON.stringify(src))
					// })
				}
				
			},	
			gotoAuthenticate(){
				uni.navigateTo({
					url: '/pages/authenticate/authenticate',
				});
			},
			toCertificate(){
				uni.navigateTo({
					url:'/pages/shop_certificate/shop_certificate?shopName='+encodeURIComponent(JSON.stringify("云南省医药有限公司"))+'&shopId='+encodeURIComponent(JSON.stringify("80-AG"))
				})
				
			},
			getPageCategories(pageIndex) {
			    const startIndex = pageIndex * 15;
			    const endIndex = Math.min(startIndex + 15, this.category.length);
			    return this.category.slice(startIndex, endIndex);
			  },
			swiperClick(){
				console.log("click swiper")
			},
			//
			async queryPay(){
				const url = '/api/trade/queryPayOrder';
				const method = 'POST'; 
				const data = {
					value:"",
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						
					}
					else {
						
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			//测试消息推送
			async testPublishMsg(){
				const url = '/api/PublishMsg/PublishRecipeAuditMsg';
				const method = 'POST'; 
				const data = {
					value:"",
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						
					}
					else {
						
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			//测试消息推送2
			async testPublishMsg2(){
				const url = '/api/PublishMsg/PublishNoPayMsg';
				const method = 'POST'; 
				const data = {
					value:"",
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						
					}
					else {
						
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			//测试支付
			async testPay(){
				const url = '/api/example/testWechatPay';
				const method = 'POST'; 
				const data = {
					openid: uni.getStorageSync("openid"),
					main_order_id : "20230815testOrder1",
					shopId: '1002',
					goodsList: [
						{goodsId: '10010',
						 num: 1,
						 detail_order_id: '', //细流水号，预留空,在后端生成
						},
						{goodsId: '10012',
						 num: 1,
						 detail_order_id: '',
						},
					],
					businessUnitId:'1002',
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						this.requestWxPay(response.data,data.main_order_id)
					}
					else {
						uni.showToast({
							icon: 'none',
							title: '创建订单失败'
						})
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			//测试查询支付
			async testQueryPay(out_order_id,main_order_id){
				const url = '/api/example/testQueryPayOrder';
				const method = 'POST'; 
				const data = {
					openid: uni.getStorageSync("openid"),
					main_order_id : main_order_id,
					out_order_id : out_order_id,
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						
					}
					else {
						uni.showToast({
							icon: 'none',
							title: '查询失败'
						})
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			//测试提交退款申请
			async testSubmitRefundApplication(){
				const url = '/api/example/submitRefundApplication';
				const method = 'POST'; 
				const data = {
					businessUnitId:'1002',
					openid: uni.getStorageSync("openid"),
					new_main_order_id : "dss退款单1", //新生成的退单主订单号
					out_order_id: "202312127140223322445832192", //要退款的商户订单号
					wxpay_order_id: "4200002111202312121807482724",//要退款的微信订单号
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						
					}
					else {
						uni.showToast({
							icon: 'none',
							title: '申请退款失败'
						})
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			//测试提交退款请求
			async testRequestRefund(){
				const url = '/api/example/testRequestRefund';
				const method = 'POST'; 
				const data = {
					businessUnitId:'80-AG01',
					openid: uni.getStorageSync("openid"),
					origin_out_order_id : "202312127140223322445832192", //原商户订单号
					out_order_id: "202312127140243403963117568", //商户订单号
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						
					}
					else {
						uni.showToast({
							icon: 'none',
							title: '申请退款失败'
						})
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			//测试查询退款结果
			async testRequestQueryRefund(){
				const url = '/api/example/testRequestQueryRefund';
				const method = 'POST'; 
				const data = {
					businessUnitId:'1002',			
					out_order_id: "202308147096774748114006016", //商户订单号
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						
					}
					else {
						uni.showToast({
							icon: 'none',
							title: '查询失败'
						})
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			//测试支付已存在的未支付订单
			async testExistsPrePayOrderWxPay(){
				const url = '/api/example/testExistsPrePayOrderWxPay';
				const method = 'POST'; 
				const data = {
					businessUnitId:'1002',
					openid: uni.getStorageSync("openid"),
					main_order_id : "20230814testOrder1",
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						this.requestWxPay(response.data,data.main_order_id)
					}
					else {
						uni.showToast({
							icon: 'none',
							title: '创建订单失败'
						})
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			requestWxPay(data,main_order_id){
				var that = this
				uni.requestPayment({
					provider: 'wxpay',    //支付类型-固定值
					timeStamp: data.timeStamp, // 时间戳（单位：秒）
					nonceStr: data.nonceStr, // 随机字符串
					package: data.package, // 固定值
					signType: data.signType, //固定值
					paySign: data.paySign, //签名
					
					success: function (res) {
						// console.log('success:' + JSON.stringify(res));
						console.log("支付成功");
						uni.showToast({
							icon: 'success',
							title: '支付成功'
						})
						that.testQueryPay(data.out_order_id,main_order_id)//支付成功后查询一下微信支付订单状态
						
					},
					
					fail: function (err) {
						// console.log('fail:' + JSON.stringify(err));
						console.log("支付失败");
						uni.showToast({
							icon: 'none',
							title: '支付失败'
						})
						//用户未支付则发一个通知
					}
				})
			},
			setIcon(index) {
				const icons = [
					'../../static/icon/categoryIcon/药品.svg',
					'../../static/icon/categoryIcon/药品1.svg',
					'../../static/icon/categoryIcon/药品2.svg',
					'../../static/icon/categoryIcon/药品3.svg',
					'../../static/icon/categoryIcon/药品4.svg',
					'../../static/icon/categoryIcon/药品5.svg',
					'../../static/icon/categoryIcon/药品6.svg',
					'../../static/icon/categoryIcon/药品7.svg',
					// 添加更多图片文件名
				];
				index = (index+Math.floor(Math.random() * (8 - 0)) + 0)%8 
				const randomIcon = icons[index];
				return randomIcon
			},
			toCategory(index,id,pageIndex,categoryName){//前往分类页
				index = index + 10*pageIndex
				console.log(id)
				uni.navigateTo({
					url:'/pages/category/category_page?id='+encodeURIComponent(JSON.stringify(id))+'&scrollTop='+encodeURIComponent(JSON.stringify(index))+'&categoryName='+encodeURIComponent(JSON.stringify(categoryName))
				})
			},
			async getGoodsCategory(){
				const url = '/api/goods/getGoodsCategory';
				const method = 'POST'; 
				const data = {
					parentId: '0'
				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						this.category = response.data.data
						this.category.sort((a, b) => b.weight - a.weight);
					}
					else {
					}
				} catch (error) {
					console.log(error);
				}
			},
			toNewSearch(){
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			async getResult(){
				const url = '/api/控制器名/方法名';
				const method = 'POST'; 
				const data = {
					Value1: "Key1"
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						console.log("99" + response.result);
					}
					else {
						console.log("-99" + response.result);
					}
				} catch (error) {
					console.log(error);
				}
			},
			//搜索推荐商品/热门商品
			async searchGoods(){
								
				var that = this				
				//发起搜索请求
				const url = '/api/goods/searchGoods';
				const method = 'POST'; 
				const data = {
					searchObj: that.searchObj,
				};
				try {
					const res = await request('yzy_app', url, method, data);
							//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(res.code == 99){
						//能搜索到数据
						if (res.data !== null) {
							this.searchResults = res.data.data	
								
						} else {	
						}																		
					}
					else {
					}
				} catch (error) {
					console.log(error);
				}
										
			},
			toGoodsSellShop(goods){
				uni.navigateTo({
					url:"/pages/shops_selling_This_goods/shops_selling_This_goods?goods="+encodeURIComponent(JSON.stringify(goods))
					//传对象参数给这个页面需要使用这个方法
				})
			},
			async getOpenid (sharerPhone){
				//获取code
				const [err, res] = await uni.login().catch(err => err)
				this.code = res.code
				const url = '/api/Example/getOpenid';
				const method = 'POST'; 
				const data = {
					js_code: this.code,
					secret: ""
				};
				try {
					const response = await request('yzy_app', url, method, data);	//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						uni.setStorageSync("openid", response.data.openid)
						this.checkUserExist(response.data.openid,sharerPhone)
						console.log("99" + response.data);
					}
					else {
						console.log("-99" + response.data);
					}
				} catch (error) {
					console.log(error);
				}
			},
			async checkUserExist(openid,sharerPhone){
				const url = '/api/user/checkUserExist';
				const method = 'POST'; 
				const data = {
					openid: openid,
					sharerPhone: sharerPhone,
				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){

					}
					else {

					}
				} catch (error) {
					console.log(error);
				}
			},
		}
	}
</script>

<style lang="scss">
.active-card{
	    margin: auto;
	text-align: center;
    width: 26.3vw;
    padding: 1vw;
    background: #fff0de;
    border-radius: 8px;
    display: flex;
    align-items: center;
	line-height: 16px;
}	
.certificate-box{
	display: flex;
	width: 90%;  /* 改变按钮宽度 */
	height: 50px;
	border-radius: 25px;  /* 增大圆角 */
	font-size: 18px;
	font-weight: bold;
	background: #6991C7;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #6991C7, #9DB8F2);  /* Chrome 10-25, Safari 5.1-6 修改渐变色 */
	background: linear-gradient(to right, #6991C7, #9DB8F2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ 修改渐变色 */
	box-shadow: 0px 10px 15px rgba(0,0,0,0.1);  /* 添加阴影 */
	transition: all 0.3s ease;  /* 添加过渡动画 */
	margin: 20rpx 0;

	align-items: center;
	justify-content: center;
}	
.color-container{
	background: #f5f5f5;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to bottom, #1296DB, #f5f5f5);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to bottom, #1296DB, #f5f5f5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}	
.recommendation-title{
	background: #a6d0d4;  /* fallback for old browsers */
	position: sticky;
	top: 67px;
	background: #f5f5f5;
	z-index: 1;
	padding: 0 10px;
	
}	
.search-container {
	position: sticky;
	top: 0;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 10px;
	background: #1296DB;  /* fallback for old browsers */
	height: 48px;
	
}
.search-input {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #0045cf;
    border-radius: 24px;
	 padding: 2px 2px 2px 2vw;
	    width: 93vw;
	height: auto;
	background: white;
  }
 .search-text { 
   flex: 1;
   border: none;
   outline: none;
   font-size: 4vw;
   color: #1a1a1a;
 }
.main-container{
	padding: 2vw;
	background: white;
	border-radius: 15px;
	margin: 0 2vw 2vw 2vw;
	width: 92vw;

}
.main-container2{
	min-height: 200px;
	border-radius: 15px;
	margin: 2vw;
	width: 96vw;
	display: flex;
	flex-wrap: wrap;
}
.recommendation-box{
	background: white;
	width: 46%;
	margin: auto;
	border-radius: 15px;
	ackground: white;
	padding: 1vw;
	margin-bottom: 10px;

}
.grid-item-box {
	
	flex: 1;
	// position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 5px 0;
}
.uni-margin-wrap{
	border-radius: 15px;
	width: 96vw;
	height: 43vw;
	margin: 2vw;
} 
.swiper-1{
	background: #a8ff78;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to bottom, #78ffd6, #a8ff78);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to bottom, #78ffd6, #a8ff78); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	width: 96vw;
    height: 15vh;
	border-radius: 15px;
	text-align: center;
	
}
.swiper-2{
	width: 96vw;
	height: 43vw;
	border-radius: 15px;
	text-align: center;
}
.icon-class{
	// height: 9vw;
	// width: 9vw;
	height: 12vw;
	width: 12vw;
}
.content{
	background: #f5f5f5;
}
.index-bottom{
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30rpx;
	padding-bottom: 20rpx;
}
</style>
