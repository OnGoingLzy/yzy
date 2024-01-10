<template>
	<view class="parent-box">
		<view v-if="payOver" class="parent-box">
			<image src="../../static/icon/pay_success.svg" mode="" class="success-icon"></image>
			<view class="pay-success">支付成功</view>
			<view class="pay-success-tips">您已经完成支付</view>
			<view class="button-list">
				<button type="primary" class="go-to" @click="goToOrder">我的订单</button>
				<button type="default" class="go-to" @click="goToBuy">继续买药</button>
			</view>
		</view>
		<view v-if="!payOver" class="parent-box">
			<!-- <image src="../../static/icon/pay_success.svg" mode="" class="success-icon"></image> -->
			<view class="pay-success">待支付</view>
			<view class="pay-success-tips">您还未完成支付</view>
			<!-- <view class="button-list">
				<button type="primary" class="go-to" @click="OpenPay2">立即支付</button>
			</view> -->
		</view>
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
		import requestZhyf from '@/common/api/requestZhyf.js'
	const plugin = requirePlugin('yh-pay-plugin')
	export default {
		data() {
			return {
				createOrderParam:null,
				cash_url: '', // 订单支付路径,
				eventChannel: null,
				payOver: false,
				cash_url:null,
				main_order_id:null,
				// 设置轮询间隔时间（单位：毫秒）
				pollingInterval: 3000, // 例如，每隔5秒轮询一次
				pollingTimer: null, // 用于存储定时器的变量
			}
		},
		onUnload() {
			this.stopPolling()
		},
		beforeDestroy() {
		    this.stopPolling();
		  },
		onShow(){
			uni.showLoading({
				title:"loading..."
			})
			 
		},
		onBackPress() {
			this.queryOrder(this.main_order_id,'付款')
		},
		onHide() {
			this.stopPolling()
		},
		onLoad: function (option) {
			
			if(option.orderInfo){
				this.createOrderParam = JSON.parse(decodeURIComponent(option.orderInfo));
				var that = this
				console.log('初始化银海插件');
				console.log(that.createOrderParam)
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				uni.login({
				    success: (res) => {
				        plugin.init({
				            url: "https://ynyb.yinhaiyun.com/utsp-api", // 服务器接口地址
				            dppSyscode: that.createOrderParam.dppSyscode, // 支付平台系统编号
				            dsmpSyscode: '1002100005', // 银医平台系统编号
				            authCode: res.code ,// 用户登录凭证
							chnlAppId: 'wxe7c826a1a5e00055',
							acssToken: that.createOrderParam.acssToken
				        }).then( _=> {
				            console.log('插件初始化成功1')
							that.CreateOrder()
				        }).catch( err =>{
				            console.log(`插件初始化失败1：${err.errMsg}`)
				        })
				    },
				})
			}
			if(option.main_order_id){
				var main_order_id = JSON.parse(decodeURIComponent(option.main_order_id));
				var cash_url = JSON.parse(decodeURIComponent(option.cash_url));
				this.cash_url = 'plugin://yh-pay-plugin/'+cash_url
				this.main_order_id = main_order_id
				this.getInitParam(main_order_id,cash_url)
				
			}
			
		},
		methods: {
			goToBuy(){
				uni.reLaunch({
					url: '/pages/index/index',
				})
			},
			goToOrder(){
				uni.redirectTo({
					url: '/pages/user_order/user_order?num=test2',
				})
			},
			async getInitParam(main_order_id,cash_url){
				uni.showLoading({
					title:'初始化...',
					mask:true
				})
				var that = this
				const url = '/api/trade/getYhInitParam';
				const method = 'POST';
				const data = {
					main_order_id:main_order_id,
					payType:"微信医保支付"
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						uni.login({
						    success: (res) => {
						        plugin.init({
						            url: "https://ynyb.yinhaiyun.com/utsp-api", // 服务器接口地址
						            dppSyscode: response.data.dppSyscode, // 支付平台系统编号
						            dsmpSyscode: '1002100005', // 银医平台系统编号
						            authCode: res.code ,// 用户登录凭证
									chnlAppId: 'wxe7c826a1a5e00055',
									acssToken: response.data.acssToken
						        }).then( _=> {
						            console.log('插件初始化成功1')
									that.OpenPay('plugin://yh-pay-plugin/'+cash_url,main_order_id)
						        }).catch( err =>{
						            console.log(`插件初始化失败1：${err.errMsg}`)
									uni.showToast({
										title:'初始化失败!请返回重试!',
										icon:'none'
									})
						        })
						    },
						})
					} else {
						uni.showToast({
							title:response.msg,
							icon:"none"
						})
					}
				} catch (error) {
					console.log(error);
				}
			},
			CreateOrder(){
				var that = this
				console.log('创建银海订单');
				plugin.createOrderDsmp({
					medins_code:this.createOrderParam.medins_code,
					medins_name:this.createOrderParam.medins_name,
					opter_type:"102",
					opter_id:this.createOrderParam.yinhaiCreateOrderObject.acss_sys_ord_no,
					opter_name:"***",
					input_data:this.createOrderParam.yinhaiCreateOrderObject
				}).then( res => {
					console.log(res)
				    console.log(res.data.cash_url)
					var	cash_url= 'plugin://yh-pay-plugin/'+res.data.cash_url
					console.log(cash_url) 
					this.cash_url = cash_url
					this.main_order_id = this.createOrderParam.yinhaiCreateOrderObject.acss_sys_ord_no
					//保存数据到服务器
					 that.saveResData(res.data,this.createOrderParam.yinhaiCreateOrderObject.acss_sys_ord_no,cash_url,'付款')
				    // 打开支付功能页
				    //that.testOpenPay(cash_url)
				}).catch( err =>{
					console.log(`err:${JSON.stringify(err)}`)
					uni.showToast({
						title:'加载失败!请重新下单!',
						icon:'none'
					})
					uni.hideLoading()
					setTimeout(function(){
						uni.navigateBack()
					},1000)
				})
			},
			async saveResData(orderInfo,main_order_id,cash_url,type){
				var that = this
				const url = '/api/trade/updateYinHaiOrderInfo';
				const method = 'POST';
				const data = {
					orderInfo : orderInfo,
					main_order_id:main_order_id,
					type:type,
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						
						//更新信息成功才能进行下一步
						that.OpenPay(cash_url,main_order_id)
					} else {
						uni.showToast({
							title:'保存订单失败!请重新下单!',
							icon:'none'
						})
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						title:'保存订单失败!请重新下单!',
						icon:'none'
					})
				}
			},
			OpenPay2(){
				var that = this
				console.log(this.cash_url) //plugin://yh-pay-plugin/order-pay?pay_token=0276c75500594df6898906ae3b4ab98e&unified_token=8f7381fdb59147b7b886d537469888f8
				//this.startPolling(that.main_order_id)
				uni.navigateTo({
					url: that.cash_url,
					events: {
						wxPayEvent: function(data) {
				  			console.log(`wxPayEvent data:${JSON.stringify(data)}`)
				  			wx.requestPayment({
				    			...data,
				    			complete(res){
				      				that.eventChannel.emit('wxPaymentComplete', res)
				      				console.log(`微信支付操作完成 res: ${JSON.stringify(res)}`)
									console.log(res)
									if(res.errMsg=="requestPayment:fail cancel"){
										that.queryOrder(that.main_order_id,"付款")
											//requestPayment:ok
									}else{
										that.queryOrder(that.main_order_id,"付款")
										that.payOver=true
										uni.redirectTo({
											url:'/pages/user_order/user_order'
										})
									}
									
									
									
				    			}
				  			})
						}
					},
					success: function(res) {
						// 可通过eventChannel向被打开页面传送数据
						that.eventChannel = res.eventChannel
					},
					fail() {
						uni.showToast({
							title:'打开支付页失败!请前往订单中心重新点击支付!',
							icon:'none'
						})
						setTimeout(function(){
							uni.navigateBack()
						},1000)
					}
				})
			},
			OpenPay(cash_url,main_order_id){
				uni.hideLoading()
				var that = this
				this.main_order_id=main_order_id
				this.startPolling(main_order_id)
				console.log(cash_url) //plugin://yh-pay-plugin/order-pay?pay_token=0276c75500594df6898906ae3b4ab98e&unified_token=8f7381fdb59147b7b886d537469888f8
				uni.navigateTo({
					url: cash_url,
					events: {
						wxPayEvent: function(data) {
				  			console.log(`wxPayEvent data:${JSON.stringify(data)}`)
				  			wx.requestPayment({
				    			...data,
				    			complete(res){
				      				that.eventChannel.emit('wxPaymentComplete', res)
				      				console.log(`微信支付操作完成 res: ${JSON.stringify(res)}`)
									console.log(res)
									if(res.errMsg=="requestPayment:fail cancel"){
										//that.queryOrder(main_order_id,"付款")
											//requestPayment:ok
									}else{
										//that.queryOrder(main_order_id,"付款")
										that.payOver=true
										
										wx.redirectTo({
											url:'/pages/user_order/user_order'
										})
									}
									
									
									
				    			}
				  			})
						}
					},
					success: function(res) {
						// 可通过eventChannel向被打开页面传送数据
						that.eventChannel = res.eventChannel
					}
				})
			},
			async queryOrder(main_order_id,type){
				var that =this
				const url = '/api/Trade/requestYinhaiQueryOrder';
				const method = 'POST'; 
				const data = {
					main_order_id: main_order_id,
					type:type
				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					console.log(response)
					if(response.code==99){
						if(response.data.status=='2'){
							this.payOver=true
							this.stopPolling()
							console.log("支付成功")
							uni.hideLoading()
							if(response.data.operateId!=="0"){
								that.uploadOrderToZhyf(response.msg, response.data.operateId);
							}
						}
					}
					
				} catch (error) {
					console.log(error);
				}
			},
			async uploadOrderToZhyf(msg, operateId) {
				const msgJson = JSON.parse(msg);
				msgJson.operateId = operateId;
				console.log(JSON.stringify(msgJson));
				const url = '/api/Zhyf/makeAccountForOuterOrder';
				const method = 'POST';
				const data = JSON.stringify(msgJson);
				try {
					console.log(data);
					const response = await requestZhyf('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						console.log("销售记录上传智慧药房成功！");
					} else {
			
					}
				} catch (error) {
					console.log(error);
				}
			},
			// 轮询调用的方法
			
				pollingMethod(orderId1) {
				 uni.showLoading({
					title:"查询中..."
				 })
			      console.log('轮询调用的方法');
			      // 在这里调用你的其他方法，比如：
				  var orderId = this.main_order_id
				  if(orderId1){
					  orderId=orderId1
				  }
			      this.queryOrder(orderId,'付款');
			      // 在方法执行完毕后，再次启动定时器
			      this.startPolling(orderId);
			    },
			
			    // 启动轮询
			    startPolling(orderId) {
			      // 清除之前的定时器
			      if (this.pollingTimer) {
			        clearTimeout(this.pollingTimer);
			        this.pollingTimer = null;
			      }
			      
			      // 使用setTimeout设置定时器，达到轮询的效果
			      this.pollingTimer = setTimeout(() => {
			        this.pollingMethod(orderId);
			      }, this.pollingInterval);
			    },
			
			    // 停止轮询
			    stopPolling() {
			      // 清除定时器
			      if (this.pollingTimer) {
			        clearTimeout(this.pollingTimer);
			        this.pollingTimer = null;
			      }
			    },
			
		}
	}
</script>

<style>
	.parent-box{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.success-icon {
		width: 200rpx;
		height: 200rpx;
		padding-top: 180rpx;
	}
	
	.pay-success{
		font-size: 48rpx;
		font-weight: bold;
		padding-top: 40rpx;
	}
	
	.pay-success-tips{
		font-size: 32rpx;
		color: #636263;
	}
	
	.button-list{
		padding-top: 60rpx;
		width: 90%;
	}
	
	.go-to{
		margin-bottom: 30rpx;
	}
</style>
