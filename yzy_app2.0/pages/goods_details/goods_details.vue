<template>
	<view class="content">
		
		
		<view style="position: fixed;z-index: 9999;top: 0;width: 100%;">
			<view class="search-container">
				<view class="search-input" @click="toNewSearch()">
				  <input type="text" class="search-text"  disabled="true" placeholder="药名、品牌、厂家、症状"/>
				  <view style="height: 100%;width: 40px;text-align: center;" >
					  <text class="voice-icon" style="    line-height: 30px;">×</text>
				  </view>
				  <view>
				  <button  @tap="toNewSearch()" style="height: 30px; max-width: 20vw; border-radius: 30px; background-color: #409EFF; color: #fff; font-size: 14px;display: flex;justify-content: center;">
				    <text style="line-height: 30px;">搜索</text>
				  </button>
				  </view>
				  
				</view>
			</view>
			
			<view class="choice-bar-container">
				<view class="choice-bar-item-box"  @click="selectBar('test1')">
					<text ref="text1"  :style="{ color: choiceBar === 'test1' ? '#1296DB' : 'black' }" >商品</text>
				</view>	
				<view class="choice-bar-item-box"  @click="selectBar('test2')">
					<text ref="text2"  :style="{ color: choiceBar === 'test2' ? '#1296DB' : 'black' }">详情</text>
				</view>	
			</view>
		</view>
		
		
		<view class="goods-img-container">
			<view class="goods-img-swiper">
				<image v-if="!goods.goodsImg" style="width: 100%;" @click="showImg(defaultPic)" class="swiper"
					:src="defaultPic"
					></image>
				<swiper v-if="goods.goodsImg" class="swiper" :indicator-dots="true" :autoplay="true" :interval="4000" :duration="1000" :circular="true">
					
					<swiper-item v-for="(item, i) in goods.goodsImg" :key="i" v-if="goods.goodsType!='处方药'">
						<image style="height: 100%;width: 100%;" @click="showImg((!item.tplszh)?defaultPic:(imgurl+item.tplszh))"
							:src="!item.tplszh?defaultPic:(imgurl+item.tplszh)"
							></image>
					</swiper-item>
					<swiper-item v-if="goods.goodsType=='处方药'">
						<image style="height: 100%;width: 100%;" 
							:src="!goods.goodsImg?defaultPic:(imgurl+goods.goodsImg[0].tplszh)"
							@error="() => handleImageError(0)" :style="{filter : goods.goodsType!='处方药'?'blur(0)':'blur(5px);'}"></image>
							<view v-if="goods.goodsType=='处方药'" style="    position: absolute;
																	top: 50%;
																	text-align: center;
																	transform: translate(-50%, -50%);
																	left: 50%;">
								<text style="font-size: 18px;">处方药,开方后可查看详细信息</text>
							</view>
					</swiper-item>
					
				</swiper>
			</view>
		</view>
		
		<view class="goods-detail-container">
			<view class="goods-price">
				<text v-text="shop.price==0?'详询门店':'¥'+shop.price"></text>
			</view>
			<view class="goods-name-container">
				<view class="goods-tag-box">
					  <view class="goods-bq" v-if="goods.goodsType=='处方药' " style="color: #ec7063;">处方药</view>
					  
					  <view class="goods-bq2" v-if="goods.goodsType=='非处方药' " style="color: #68d568;">OTC</view>  
				</view>
				<view class="goods-name">
					<text v-text="goods.goodsName+' '"></text>
					<text v-text="goods.genericName+' '"></text>
					<text v-text="goods.manufacturer+' '"></text>
				</view>
			</view>
			<view style="display: flex;width: 100%;">
				<view style="width: 90%;">
					<view>
						<text style="color: #00aaff;font-size: 14px;" v-if="goods.onlineShoppingFlag!=='y' ">小云提醒您：该品种禁止网络销售</text>
					</view>
					<view>
						<text style="color: #bfbfbf;font-size: 14px;" v-if="goods.goodsType=='处方药' ">处方药需凭处方在药师指导下购买和使用</text>
					</view>
				</view>
				<view style="width: 10%;height: 30px;position: relative;text-align: center;" >
					
					
					<button open-type="share" plain="true" class="bt_contact" style="border: none;bottom: 0px;padding: 0;" @click="shareGoods()">
						<view style="">
							<view style="align-items: center;display: flex;justify-content: center;">
								<image src="../../static/icon/分享.svg" style="width: 20px; height: 20px;"></image>
							</view>

							<view style="align-items: center;display: flex;justify-content: center;">
								<text style="color: grey; ">分享</text>  
							</view>
						  
						</view>

							
						
					</button>
				</view>
			</view>
			
			<view style="margin-top: 10px;">
				<!-- <view v-if="shop.healthInsuranceFlag=='y'" class="yb-tag">
					<text>可线上医保</text>
				</view> -->
			</view>
			<view  style="margin-top: 10px;background: #f5f5f5;border-radius: 15px;" v-if="goods.goodsType!='处方药' " @click="indicationShow=!indicationShow">
				<view class="goods-info">
					<!-- 暂时不显示适应症 -->
					<!-- <view class="goods-info-box" :style="goods.indication?'width: 70%;border-right: #b7b7b7 1px solid;':'width: 50%;border-right: #b7b7b7 1px solid;'">
						<view>
							<text style="font-weight: bold;font-size: 14px;">适应症</text>
						</view>
						<view style="display: flex; ">
							<text style="color:#a7a7a7;" class="goods-info-text" :style="indicationShow?'-webkit-line-clamp:10':'2'" v-text="goods.indication?'适应症:' + goods.indication:'详见说明书'"></text>
						</view>
					</view>
					<view class="goods-info-box" :style="goods.indication?'width: 30%;':'width: 50%;'">
						<view>
							<text style="font-weight: bold;font-size: 14px;">用法用量</text>
						</view>
						<view style="display: flex; ">
							<text style="color:#a7a7a7;" class="goods-info-text">详见说明书</text>
						</view>
					</view> -->
					
					<view class="goods-info-box" style="width: 50%;border-right: #b7b7b7 1px solid;">
						<view>
							<text style="font-weight: bold;font-size: 14px;">适应症</text>
						</view>
						<view style="display: flex; ">
							<text style="color:#a7a7a7;" class="goods-info-text" >详见说明书</text>
						</view>
					</view>
					<view class="goods-info-box" style="width: 50%;">
						<view>
							<text style="font-weight: bold;font-size: 14px;">用法用量</text>
						</view>
						<view style="display: flex; ">
							<text style="color:#a7a7a7;" class="goods-info-text">详见说明书</text>
						</view>
					</view>
					
				</view>
				<view style="text-align: center;">
					<text style="color: gray;">点击查看详情</text>
				</view>
			</view>
			
		</view>
		
		<view class="goods-detail-container" style="margin-top: 10px;">
			<view class="line">
				<view style="display:flex;justify-content:center;align-items:center;">
					<text style="width: 50px;color: #909090;font-size: 15px;">库存</text>
				</view>
				<view style="padding-left: 12px;">
					<text v-text="shop.inventory==null ? 0:shop.inventory" style="font-size: 15px;"></text>
				</view>
			</view>
			
			<!-- <view class="line" style="margin-bottom: 0px;width: 100%;">
				<view style="display:flex;justify-content:center;align-items:center;">
					<text style="width: 50px;color: #909090;font-size: 15px;">送至</text>
				</view>
				<view style="padding-left: 12px;width: 80%;" @click="showNextAddress" v-if="addressList">
					<text style="font-size: 15px;"  v-text="addressList[currentIndex].city+addressList[currentIndex].details" ></text>
				</view>
				<view style="padding-left: 12px;width: 80%;" @click="toAddUserAddress" v-if="addressList==null">
					<text style="font-size: 15px;">请添加收货地址</text>
				</view>
				<view style="width: 20%;justify-content: flex-end;display: flex;padding-right: 11px;">
					<uni-icons type="forward" @click="toAddUserAddress"></uni-icons>
				</view>
			</view> -->
			
			<view class="line" style="margin: auto;">
				<view style="display: flex;justify-content: center;">
					<text style="width: 50px;padding-top:12px;color:#909090;font-size: 15px;">参数</text>
				</view>
				<view style="width: 100%;">
					<uni-collapse ref="collapse" style="width: 100%;background: white;" >
						<uni-collapse-item :title="'批 准 文 号：'+ goods.approvalNumber" style="background: white;padding:12px 0 12px 0" :open="true">
							<view style="padding: 0 12px 12px 12px;">
								<text decode="true" style="font-size: 14px;" v-text="'生 产 企 业：'+goods.manufacturer"></text>
							</view>
							<view style="padding: 0 12px 12px 12px;">
								<text decode="true" style="font-size: 14px;" v-text="'规&ensp;&emsp;&ensp;&emsp;格：'+goods.specification+ '/' +goods.sellUnit"></text>
							</view>
							<view style="padding: 0 12px 12px 12px;">
								<text decode="true" style="font-size: 14px;" v-text="'剂&ensp;&emsp;&ensp;&emsp;型：'+goods.form"></text>
							</view>
							<view style="padding: 0 12px 12px 12px;">
								<text decode="true" style="font-size: 14px;" v-text="'单&ensp;&emsp;&ensp;&emsp;位：'+goods.sellUnit"></text>
							</view>
						</uni-collapse-item>
					
					</uni-collapse>
				</view>
			</view>
		</view>
		
		<view class="shop-container" >
			<view class="shop-image-box">
				<image v-if="shop.shopImg!=null" :src="imgurl+shop.shopImg" class="shop-image" @click="showImg(imgurl+shop.shopImg)"></image>
				<image v-if="shop.shopImg==null" :src="defaultPic" class="shop-image"></image>
			</view>
			<view style="padding-left: 10px;"@click="toShop">
				<view>
					<text v-text="shop.simplifyShopName" style="font-weight: bold;"></text>
				</view>
				<view>
					<text v-text="shop.shopAddress" style="font-size: 13px;color: #8b8b8b;" class="goods-info-text"></text>
				</view>
				
			</view>
		</view>
		
		<view class="goods-detail-container2" style="margin-top: 10px;padding-bottom:60px;" ref="goodsDetail">
			<view style="font-size: 16px;font-weight:bold">商品详情</view>
			<view style="    padding: 5px;margin: 10px;background: #f4f4f4;line-height: 15px;">
				<text style="color: #8f8f8f;font-size:13px">温馨提醒:图片为实物拍摄,可能出现新旧包装更换或者图片展示效期和实物效期不一致,请以收到实物为准。</text>
			</view>
			<view v-for="(item,i) in goods.goodsImg" :key="i" class="goods-img-box" v-if="goods.goodsType!='处方药'">
				<image mode="widthFix" class="goods-img" :src="imgurl+item.tplszh" @error="() => handleImageError(i)" @click="showImg(imgurl+item.tplszh)"></image>
			</view>
			<view  class="goods-img-box" v-if="goods.goodsType=='处方药'">
				<image mode="widthFix" class="goods-img" :src="imgurl+goods.goodsImg[0].tplszh" @error="() => handleImageError(0)" :style="{filter : goods.goodsType!='处方药'?'blur(0)':'blur(10px);'}"></image>
			</view>
			<view style="font-size: 16px;font-weight:bold">退换货标准</view>
			<view style="padding: 5px;">
				
				
				<view class="text-box">
					<view style="font-size: 15px;font-weight:bold">特殊说明</view>
					<view style="color: #8f8f8f;" v-if="theGoodsType=='药品'">
						<text>因药品是特殊商品，依据中华人民共和国《药品经营质量管理规范》及其实施细则(GSP)、《互联网药品交易服务审批暂行规定》等法律、法规的相关规定:药品一经售出，无质量问题，不退不换。</text>
					</view>
					<view style="color: #8f8f8f;" v-if="theGoodsType=='器械'">
						<text>因医疗器械是特殊商品，依据中华人民共和国《药品经营质量管理规范》及其实施细则(GSP)、《互联网药品交易服务审批暂行规定》等法律、法规的相关规定:药品一经售出，无质量问题，不退不换。</text>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="goods-carts" v-if="orderType=='提交需求'">
			<uni-goods-nav :options="options" :fill="true" :button-group="customButtonGroup2" @click="onClick"
				@buttonClick="popupBuyGoods('提交需求')" >
			</uni-goods-nav> 
			
		</view>
		<!-- 商品购买 -->
		<view class="goods-carts" v-if="goods.goodsType!='处方药' && orderType!=='提交需求'">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" >
			</uni-goods-nav> 
	
		</view>
		<view class="goods-carts" v-if="goods.goodsType=='处方药' && orderType!=='提交需求'">
			<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup1" @click="onClick"
			@buttonClick="popupBuyGoods('问诊开方')"  >
			</uni-goods-nav> 
		</view>
		
		<uni-popup ref="popup" type="bottom" background-color="#fff" > 
			<view style="    display: flex;justify-content: flex-end;padding-right: 10px;">
				<uni-icons type="closeempty" size="18" @click="closePopupBuyGoods('null')"></uni-icons>
			</view>
			<orderPopup  @closePopupBuyGoods=closePopupBuyGoods :goods="goods" :shop="shop" :orderType="orderType"></orderPopup>
		</uni-popup>
		
		<view v-if="visible" class="bottom-popup" style="height: 100vh;" @click="visible=false">
		  <!-- 遮罩 -->
		</view>
		<view v-if="visible" class="bottom-popup2" style="max-height: 75vh;">
			<view class="popup-content" >
			  <!-- 在这里放置底部弹出层的内容 -->
			  <view style="    display: flex;justify-content: flex-end;padding-right: 10px;">
			  	<uni-icons type="closeempty" size="18" @click="closePopup()"></uni-icons>
			  </view>
			  <orderPopup  @closePopupBuyGoods=closePopupBuyGoods :goods="goods" :shop="shop" :orderType="orderType"></orderPopup>
			</view> 
		</view>	
		 
	</view>
</template>

<script>
	import goodsCard from '@/components/goods/goods_card.vue';
	import request from '@/common/api/request.js'
	import orderPopup from '@/components/order/order_popup.vue'
	export default {
		components:{goodsCard,orderPopup},
		data() {
			return {
				visible: false,
				indicationShow:false,
				addressList:[],
				goods:{},
				shop:{},
				choiceBar:'test1',
				imgurl: "http://images.yndzyf.com/getimage.ashx?mlszh=",
				defaultPic: 'http://images.yndzyf.com/getimage.ashx?mlszh=17700932',
				errorImage: '/static/icon/errorImg.svg',
				orderType:'', //订购类型 ： 加入购物车/直接购买/提交需求
				indication:'',//适应症,
				UsageAndDosage:'',//用法及用量
				currentIndex: 0,
				options: [{
						icon: 'shop',
						text: '店铺',
						info: 0,
						infoBackgroundColor: '#007aff',
						infoColor: "#f5f5f5"
					}, {
						icon: 'cart',
						text: '购物车',
						info: 0
					}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
				customButtonGroup1: [{
					text: '问诊开方',
					backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
					color: '#fff'
				}],
				customButtonGroup2: [{
					text: '提交需求',
					backgroundColor: 'linear-gradient(90deg, #12cbdb, #1296DB)',
					color: '#fff'
				}],
				shoppingCart:[],
				
			}
		},
		onShareAppMessage(res) { //发送给朋友
		    return {
		        title: '有人拍了拍你,推荐了：'+this.goods.genericName,
		        imageUrl: this.imgurl+this.goods.goodsImg[0].tplszh,
				path:"/pages/goods_details/goods_details?goods="+encodeURIComponent(JSON.stringify(this.goods))+"&shop="+encodeURIComponent(JSON.stringify(this.shop))
		    }
		},
		onShareTimeline(res) {//分享到朋友圈
		    return {
		        title: '有人拍了拍你,推荐了：'+this.goods.genericName,
		        imageUrl: this.imgurl+this.goods.goodsImg[0].tplszh,
				path:"/pages/goods_details/goods_details?goods="+encodeURIComponent(JSON.stringify(this.goods))+"&shop="+encodeURIComponent(JSON.stringify(this.shop))
		    }
		},
		computed:{
			theGoodsType(){
				if (this.goods && this.goods.goodsType) {
				    if (this.goods.goodsType.includes('药')) return '药品';
				    if (this.goods.goodsType.includes('械')) return '器械';
				  }
			}
		},
		
		onLoad: function (option) {
			//解析传过来的对象
			this.goods = JSON.parse(decodeURIComponent(option.goods));
			this.shop = JSON.parse(decodeURIComponent(option.shop));
			console.log("111111");
			console.log(this.goods)
			console.log(this.shop)
			if(this.shop.flag!=='1' && this.shop.reservationFlag=='y'){
				this.orderType = '提交需求'
			}else if(this.shop.flag=='1'){
				if(this.shop.reservationFlag=='y'&&this.shop.inventory==0){
					this.orderType = '提交需求'
				}
			}else{
				
			}
			this.getUserCartGoods()
		},
		onShow() {
			this.getAddressList()
		},
		methods: {
			copyPageLink() {
			     uni.share({
			         provider: "weixin",
			         scene: "WXSceneSession",
			         type: 1,
			         summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
			         success: function (res) {
			             console.log("success:" + JSON.stringify(res));
			         },
			         fail: function (err) {
			             console.log("fail:" + JSON.stringify(err));
			         }
			     });
			    },
			shareGoods(){
				
				console.log("share")
			},
			openPopup() {
			  this.visible = true;
			},
			closePopup() {
			  this.visible = false;
			},
			//获取该用户的购物车中的信息
			async getUserCartGoods() {
				const url = '/api/user/getUserCartGoods';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid"),
					phone: uni.getStorageSync("phone"),
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response)
					if(response.data){
						this.shoppingCart = JSON.parse(response.data);
						
						// 初始化总数量为 0
						let totalQuantity = 0;
						
						// 遍历 shoppingCart 中的每个元素
						for (const item of this.shoppingCart) {		 
						  totalQuantity = item.drugs.length + totalQuantity
						}
						this.options[1].info = totalQuantity
					}
					
					
				} catch (error) {
					console.log(error);
				}
			},
			showImg(url){
				console.log(url);
				var that = this
				// 预览图片
				uni.previewImage({
					urls: [url],
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
			toAddUserAddress(){
				uni.navigateTo({
					url:'/pages/user-add-path/addPath'
				})
			},
			showNextAddress() {
			      this.currentIndex = (this.currentIndex + 1) % this.addressList.length;
			    },
			toShop(){
				uni.navigateTo({
					url:'/pages/shop_certificate/shop_certificate?shopName='+encodeURIComponent(JSON.stringify(this.shop.shopName))+'&shopId='+encodeURIComponent(JSON.stringify(this.shop.shopId))+'&shop='+encodeURIComponent(JSON.stringify(this.shop))
				})
			},
			//获取用户的地址信息
			async getAddressList() {
				const url = '/api/user/getAddressList';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid")
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						this.addressList = response.data.data;
						console.log(this.list);
					} else {
						console.log("-99" + response.result);
					}
				} catch (error) {
					console.log(error);
				}
			},
			// 前往问诊开方页
			toPrescription(){
				
				uni.navigateTo({
					url: '/pages/prescription/prescription'
				})
			},
			popupBuyGoods(type){
				if(!uni.getStorageSync("phone")){
					this.toAuthorizePhone()
					return
				}
				if(type=='问诊开方'){
					uni.requestSubscribeMessage({
						//此处填写申请模板的模板ID
					  	tmplIds: ['K9QtB4z2B8YIyUScP1Bx5iROO-IOZqd3Opi7KjySbKc'],
					  	success (res) {
					  		console.log(res)
					  	},
						
					})
				}
				uni.requestSubscribeMessage({
					//此处填写申请模板的模板ID
				  	tmplIds: ['JZGbfSSv0-jB5yS4GObkqD0TUrPqDdAbalAcz70xjZg'],
				  	success (res) {
				  		console.log(res)
				  	},
					
				})
				this.orderType=type
				//this.$refs.popup.open()
				
				this.openPopup()
				console.log("弹出")
			},
			closePopupBuyGoods(result){
				if(!uni.getStorageSync("phone")){
					this.toAuthorizePhone()
					return
				}
				console.log(result)
				var num = result.num
				if(result=='null'){
					this.$refs.popup.close()
					this.closePopup()
				}
				else if(result.type=='加入购物车'){
					this.addToShoppingCart(result.num)
					this.$refs.popup.close()
					this.closePopup()
				}
				else if(result.type=='立即购买'){
					//async await 返回的是promise对象
					this.addToShoppingCart(num).then(shoppingCartId => {
					    
						//请编写跳转购买页面的方法
						const result = [
							{"id":0, //门店id
							"shopName":this.shop.shopName,
							"shopId":this.shop.shopId,
							"simplifyShopName": this.shop.simplifyShopName,
							
							"drugs":[
									{"id":shoppingCartId,
									"drugId":this.goods.goodsId,
									"drugName":this.goods.genericName,
									"specification":this.goods.specification,
									"price":this.shop.price,
									"num": num,
									"imgLszh": this.goods.goodsImg?this.goods.goodsImg[0].tplszh:"",
									"manufacturer":this.goods.manufacturer,
									"sellUnit":this.goods.sellUnit,
									"healthInsuranceFlag": this.shop.healthInsuranceFlag,
									},
								],
							},
						]
						uni.navigateTo({
							url: `/pages/confirm_order/confirm_order?drug=${encodeURIComponent(JSON.stringify(result))}`,
						})
					    
					}).catch(error => {
					    console.error('Error:', error);
					});

					
				}
				else{
					//不是普通关闭的话说明提交了购买请求或者加入购物车请求
					this.$refs.popup.close()
					this.closePopup()
				}
			},
			async addToShoppingCart(num){
				//添加到购物车
				const url = '/api/trade/addGoodsToShoppingCart';
				const method = 'POST'; 
				const data = {
					openid: uni.getStorageSync("openid"),
					shopId : this.shop.shopId,
					goodsId : this.goods.goodsId,
					num : num,
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						//添加到购物车后再查询下数量
						this.getUserCartGoods()
						uni.showToast({
							icon: 'none',
							title: '商品已加入购物车'
						})
						return response.data.shoppingCartId
					}
					else {
						uni.showToast({
							icon: 'none',
							title: '添加失败'+response.data.sm
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
			onClick(e) {
				// uni.showToast({
				// 	title: `点击${e.content.text}`,
				// 	icon: 'none'
				// })
				
				if(e.content.text=='购物车'){
					console.log(e.content.text)
					uni.switchTab({
						url:'/pages/shopping_cart/shopping_cart'
					})				
				}else{
					this.toShop()
				}
			},
			toAuthorizePhone() {
				uni.navigateTo({
					url: '/pages/login/login'
					
				})
			},
			buttonClick(e) {
				if(!uni.getStorageSync("phone")){
					this.toAuthorizePhone()
					return
				}
				
				console.log(e)
				uni.requestSubscribeMessage({
					//此处填写申请模板的模板ID
				  	tmplIds: ['NaEQhsqAO72iO_ruYzrhHIZigJQO8davB0gST5-xtIk','K9QtB4z2B8YIyUScP1Bx5uEk1tudwnuVUXA6SZM3H0E','JZGbfSSv0-jB5yS4GObkqD0TUrPqDdAbalAcz70xjZg'],
				  	success (res) {
				  		console.log(res)
				  	},
					
				})
				if(e.index==0){
					// 加入购物车					
					this.popupBuyGoods('加入购物车')
					//订阅消息
					
				}else if(e.index==1){
					this.popupBuyGoods('立即购买')
				}
			},
			selectBar(val){
				this.choiceBar = val
				if(val=='test2'){
					this.scrollToTarget('2')
				}else{
					this.scrollToTarget('1')
				}
			},
			toNewSearch(){
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			handleImageError(index) {
			  // 图片加载失败时，将图片路径替换为对应的默认图片路径
			  console.log("图片加载失败")
			  this.goods.goodsImg[index].tplszh = this.errorImage;
			},
			scrollToTarget(to) {
				//pageScrollTo 方法滚动到目标元素的位置
				if(to=='2'){
					uni.pageScrollTo({
						selector: ".goods-detail-container2", // 将目标元素的选择器传递给 selector 属性
						duration: 300, // 滚动动画的时长，单位为 ms
					});
				}else{
					uni.pageScrollTo({
						selector: ".content", // 将目标元素的选择器传递给 selector 属性
						duration: 300, // 滚动动画的时长，单位为 ms
					});
				}
				
			},
		}
	}
</script>

<style lang="scss">
	.bt_contact{
		position: absolute;
		width: 100%;

		border: 0;
		
	}
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
page{
	background: #f5f5f5;
}
/* 底部弹出层的样式 */
.bottom-popup {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 10000;
}
.bottom-popup2 {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  max-height: 75vh;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  z-index: 10001;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.popup-content {
  width: 100%;
  max-height: 75vh;
  overflow: auto;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

}


.goods-img-box{
	 padding: 4vw;
	 display: flex;
	 justify-content: center;
}
.goods-img{
	width: 85vw;
	height: 85vw;
}
.text-box{
	text{
		font-size: 14px;
	}
}
.goods-carts {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	position: fixed;
	left: 0;
	right: 0;
	/* #ifdef H5 */
	left: var(--window-left);
	right: var(--window-right);
	/* #endif */
	bottom: 0;
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
.shop-image{
	width: 64px;
	height: 64px;
	display: block;
	border-radius: 10%;
}
.shop-container{
	display: flex;
	margin-top: 10px;
	padding-bottom: 120px;
	padding: 2vw;
	width: 96vw;
    min-height: 50px;
	background: #ffffff;
}	
.content{
	min-height: 120vh;
	margin-bottom: 40px;
}	
.line{
	display: flex;
	margin: 10px 0;
}	
.goods-info{
	
	background: #f5f5f5;
	
	border-radius: 15px;
	display: flex;
	.goods-info-box{
		text-align: center;
		padding: 0 10px 10px 10px ;
		margin-top: 10px;

	}
}	
.goods-name-container{
	 display: flex;
	 justify-content: left;
}	
.goods-name{
	font-size: 18px;
	font-family: monospace;
	font-weight: bold;
	max-width: 80vw;
	line-height: normal;
}	
.goods-tag-box{
	display: inline-grid;
    height: auto;
    padding: rpx 0;
	align-items: center;
	text-align: center;
	
	.space {
		color: #ffffff;
		}
	
}
.goods-tag{
	    text-align: center;
	    align-items: left;
	    padding: 5rpx 5px 5rpx 5px;
	    font-size: 24rpx;
	    width: auto;
	    color: #ffffff;
	    border-radius: 5px;
	    line-height: 1;
}	
.goods-bq{
			    border: 1px solid #ec7063;  
			text-align: center;
            align-items:left;
            padding: 5rpx 5px 5rpx 5px;
            font-size: 24rpx;
            width: auto;
            color: #ffffff;
            border-radius: 5px;
            line-height: 1;          
          }
.goods-bq2{
    border: 1px solid #68d568;
text-align: center;
  align-items:left;
  padding: 5rpx 5px 5rpx 5px;
  font-size: 24rpx;
  width: auto;
  color: #ffffff;
  border-radius: 5px;
  line-height: 1;          
}  
.goods-price {
	color: #bc1903;
	font-size: 18px;
	font-family: fantasy;
	padding: 5px 0;

}	
.goods-detail-container{
	background: #ffffff;
	padding: 2vw;
	border-radius: 15px;
	width: 96vw;
}	
.goods-detail-container2{
	background: #ffffff;
	padding: 2vw;
	border-radius: 15px;
	width: 96vw;
}	
.goods-img-container{
	margin-top: 80px;
}
.swiper{
	height: 40vh;
}	
.choice-bar-container{
	 width: 100%;
	 background: #1296DB;
	display: flex;
	overflow : auto;
	background: white;
}
.choice-bar-item-box {
	height: 100%;
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 5px 0;
} 	

 .search-container{
 	 background: #ffffff;
 	width: 98vw;
 	display: flex;
 	padding: 1vw;
 	 justify-content: center;
 	 background: #1296DB;
  } 
/* search input */
.search-input {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  background: #ffffff;
	  /* border: 1px solid #0045cf; */
	  border-radius: 24px;
		padding: 2px 2px 2px 2vw;
	    width: 93vw;
	  height: 30px;	
	}
	.search-text {
	  flex: 1;
	  border: none;
	  outline: none;
	  font-size: 4vw;
	  color: #1a1a1a;
	}
</style>
