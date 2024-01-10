<template>
	<view>
		久远银海
		<button @click="testPublishMsg()">测试推送退款成功通知</button>
		<button @click="testApi">测试查询订单接口</button>
		<button @click="plcxddzt">测试批量查询订单接口</button>
		<button @click="testApi2">测试查询退款订单接口</button>
		<button @click="testQueryOrder">测试插件-查询订单</button>
		<button @click="testCreateOrder" :disabled="!createOrderParam">测试插件-创建订单</button>
		<button @click="testOpenPay('plugin://yh-pay-plugin/order-pay?pay_token=0276c75500594df6898906ae3b4ab98e&unified_token=8f7381fdb59147b7b886d537469888f8')">测试插件-跳转支付</button>
		<button @click="testRequestRefund()">测试退款</button>
		<block></block>
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
			}
		},
		
		onLoad: function (option) {
			
			if(option.orderInfo){
				this.createOrderParam = JSON.parse(decodeURIComponent(option.orderInfo));
				var that = this
				console.log(that.createOrderParam)
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
				        }).catch( err =>{
				            console.log(`插件初始化失败1：${err.errMsg}`)
				        })
				    },
				})
			}
			
			
		},
		methods: {
			async testRequestRefund(){
				var that= this
				const url = '/api/Trade/yinHaiRefund';
				const method = 'POST'; 
				const data = {
					main_order_id: '202350000637'
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
								   that.testRefundOrder(response.data)
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
			async testPublishMsg(){
				const url = '/api/PublishMsg/PublishRefundMsg';
				const method = 'POST'; 
				const data = {
				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					console.log(response)
				} catch (error) {
					console.log(error);
				}
			},
			async testApi(){
				const url = '/api/Trade/requestYinhaiQueryOrder';
				const method = 'POST'; 
				const data = {
					main_order_id: '202400001462',
					type:"付款"
				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					console.log(response)
					if(response.data.status=='2'){
							
						console.log("支付成功")
						if(response.data.operateId!=="0"){
							this.uploadOrderToZhyf(response.msg, response.data.operateId);
						}
					}
				} catch (error) {
					console.log(error);
				}
			},
			async testApi3(main_order_id){
				const url = '/api/Trade/requestYinhaiQueryOrder';
				const method = 'POST'; 
				const data = {
					main_order_id: main_order_id,
					type:"付款"
				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					console.log(response)
					if(response.data.status=='2'){
							
						console.log("支付成功")
						if(response.data.operateId!=="0"){
							this.uploadOrderToZhyf(response.msg, response.data.operateId);
						}
					}
				} catch (error) {
					console.log(error);
				}
			},
			//批量查询订单
			plcxddzt(){
				var orderId=["202450001417","202400001449","202450001407","202400001450","202450001411","202400001457","202450001416","202425001453","202475001453"]
				for (var i = 0; i < orderId.length; i++) {
				   this.testApi3(orderId[i])
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
			async testApi2(){
				const url = '/api/Trade/requestYinhaiQueryRefundOrder';
				const method = 'POST'; 
				const data = {
					main_order_id: '202475001351',
					type:"退款"
				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					console.log(response)
					if(response.code==99){
						
					}
				} catch (error) {
					console.log(error);
				}
			},
			async queryOrder(main_order_id,type){
				const url = '/api/Trade/requestYinhaiQueryOrder';
				const method = 'POST'; 
				const data = {
					main_order_id: main_order_id,
					type:type
				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					console.log(response)
				} catch (error) {
					console.log(error);
				}
			},
			testCreateOrder(){
				var that = this
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
					//保存数据到服务器
					 that.saveResData(res.data,this.createOrderParam.yinhaiCreateOrderObject.acss_sys_ord_no,cash_url)
				    // 打开支付功能页
				    //that.testOpenPay(cash_url)
				}).catch( err =>{
					console.log(`err:${JSON.stringify(err)}`)
				})
			},
			testRefundOrder(param){
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
						that.testOpenPay(cash_url,main_order_id)
					} else {
						
					}
				} catch (error) {
					console.log(error);
				}
			},
			testOpenPay(cash_url,main_order_id){
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
										that.queryOrder(that.main_order_id,"付款")
											//requestPayment:ok
									}else{
										that.queryOrder(that.main_order_id,"付款")
										that.payOver=true
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
			testQueryOrder(){
				plugin.queryOrderDsmp ({
				    medins_code:"P53050201208",
				    medins_name:"云南省医药有限公司新特药保山零售店",
				    opter_type:"102",
				    opter_id:"530002",
				    opter_name:"lzy",
				    input_data: {
				        plaf_ord_no: 'PP202311011921393941'
				    }
				}).then( res => {
				    console.log(`res:${JSON.stringify(res)}`)
				})
			}
		}
	}
</script>

<style>

</style>
