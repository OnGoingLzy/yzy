<template>
	<view class="parent-box">
		<view v-if="payOver" class="parent-box">
			<image src="../../static/icon/pay_success.svg" mode="" class="success-icon"></image>
			<view class="pay-success">退款完成</view>
			<view class="pay-success-tips">您已经完成退款</view>
			<view class="button-list">
				<button type="primary" class="go-to" @click="goToOrder">我的订单</button>
				<button type="default" class="go-to" @click="goToBuy">继续买药</button>
			</view>
		</view>
		<view v-if="!payOver" class="parent-box">
			<!-- <image src="../../static/icon/pay_success.svg" mode="" class="success-icon"></image> -->
			<view class="pay-success">退款中</view>
			<view class="pay-success-tips">您还未确认退款</view>
			<!-- <view class="button-list">
				<button type="primary" class="go-to" @click="OpenPay2">立即支付</button>
			</view> -->
		</view>
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
	const plugin = requirePlugin('yh-pay-plugin')
	export default {
		data() {
			return {
				payOver: false,
				main_order_id:null,
				pollingInterval: 5000,
				pollingTimer: null, 
			}
		},
		onLoad: function (option) {
			
			if(option.main_order_id){
				this.main_order_id = JSON.parse(decodeURIComponent(option.main_order_id));
				this.RequestRefund()		
			}
			
		},
		onShow() {
			if(this.main_order_id){
				this.queryOrder(this.main_order_id,'退款');
				this.startPolling(this.main_order_id)
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
					url: '/pages/user_order/user_order?num=test4',
				})
			},
			async RequestRefund(){
				var that= this
				const url = '/api/Trade/yinHaiRefund';
				const method = 'POST'; 
				const data = {
					main_order_id: this.main_order_id,
					type:'微信'
				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					console.log(response)
					if(response.code==99){
						
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
						           console.log('插件初始化成功2')
								   that.RefundOrder(response.data)
						       }).catch( err =>{
						           console.log(`插件初始化失败2：${err.errMsg}`)
						       })
						    },
						})
					}else{
						uni.$showMsg(response.msg,1000)
					}
					
				} catch (error) {
					console.log(error);
				}
			},
			RefundOrder(param){
				var that = this
				console.log(param.yinhaiCreateRefundOrderObject)		
				plugin.orderRefundDsmp({
				    medins_code:param.medins_code,
				    medins_name:param.medins_name,
				    opter_type:"102",
				    opter_id:param.yinhaiCreateRefundOrderObject.acss_sys_refd_ord_no,
				    opter_name:"***",
				    input_data: param.yinhaiCreateRefundOrderObject
				}).then( res => {
					console.log(res)
					console.log(res.data.cash_url)
					var	cash_url= 'plugin://yh-pay-plugin/'+res.data.cash_url
					//console.log(cash_url) 
					//保存数据到服务器
					var type = '退款'
					that.saveResData(res.data,param.yinhaiCreateRefundOrderObject.acss_sys_refd_ord_no,cash_url,type)
					//that.testOpenPay(cash_url,param.yinhaiCreateRefundOrderObject.acss_sys_refd_ord_no)
					 
				}).catch( err =>{
					console.log(`err:${JSON.stringify(err)}`)
					that.queryOrder(that.main_order_id,"退款")
					that.stopPolling()
					uni.navigateBack()
				})
				
			},
			async saveResData(orderInfo,main_order_id,cash_url,type1){
				var that = this
				const url = '/api/trade/updateYinHaiOrderInfo';
				const method = 'POST';
				console.log(type1)
				const data = {
					orderInfo : orderInfo,
					main_order_id:main_order_id,
					type: type1,
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						
						//更新信息成功才能进行下一步
						that.OpenPay(cash_url,main_order_id)
					} else {
						
					}
				} catch (error) {
					console.log(error);
				}
			},
			OpenPay(cash_url,main_order_id){
				var that = this
				console.log('退款地址'+cash_url) //plugin://yh-pay-plugin/order-pay?pay_token=0276c75500594df6898906ae3b4ab98e&unified_token=8f7381fdb59147b7b886d537469888f8
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
									if(res.errMsg=="requestPayment:fail cancel"){
										that.queryOrder(that.main_order_id,"退款")
											//requestPayment:ok
									}else{
										that.queryOrder(that.main_order_id,"退款")
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
					}
				})
			},
			async queryOrder(main_order_id,type){
				const url = '/api/Trade/requestYinhaiQueryRefundOrder';
				const method = 'POST'; 
				const data = {
					main_order_id: main_order_id,
					type:"退款"
				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					console.log(response)
					if(response.code==99){
						if(response.data=='5'){
							this.payOver=true
							this.stopPolling()
							console.log("退款成功")
							uni.hideLoading()
							// if(response.data.operateId!=="0"){
							// 	this.uploadOrderToZhyf(response.msg, response.data.operateId);
							// }
						}
					}
				} catch (error) {
					console.log(error);
				}
			},
			pollingMethod(orderId1) {
			 uni.showLoading({
				title:"查询中..."
			 })
			
						 
			  var orderId = this.main_order_id
			  if(orderId1){
				  orderId=orderId1
			  }
			  this.queryOrder(orderId,'退款');
			  this.startPolling(orderId);
			},
						
					
			startPolling(orderId) {
			
				uni.showLoading({
					title:"查询中..."
				})
					
			  if (this.pollingTimer) {
			    clearTimeout(this.pollingTimer);
			    this.pollingTimer = null;
			  }
			   
			  
						
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
			  uni.hideLoading()
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
