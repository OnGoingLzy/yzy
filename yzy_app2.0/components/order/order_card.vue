<template>
	<view class="content">
		<view class="order-list card-shadow">
			<view class="order-item">
				<view class="item-list">

					<view class="shop-name">
						<view style="width: 70%;display: flex;align-items: center" @click="toShop">
							<image src="/static/icon/药店.svg" style="width: 18px;height: 18px;"></image>
							{{ order.shopInfo[0].simplifyShopName }}
						</view>
						
						<view style="display: flex;justify-content: flex-end;width: 30%;padding-right: 10px;">
							<text style="font-weight: 100;color: gray;" v-text="order.status=='已取消'?'退款已取消':order.status">{{order.status}}</text>
						</view>
					</view>
					<view class="item" v-for="(item,j) in order.goodsList" :key="j">
						<view class="item-info" @click="toPurchasedGoodsDetails(item)">
							<image :src="item.goodsImg[0].tplszh ? 'http://images.yndzyf.com/getimage.ashx?mlszh=' + item.goodsImg[0].tplszh : defaultPic"
								mode="" style="    border-radius: 8px;" >
							</image>
							<view class="item-details" > 
								<view class="item-name">{{ item.genericName }}</view>
								<view class="item-spec">{{ item.specification }}</view>
								<view class="item-spec">{{ item.manufacturer }}</view>
							</view>
							<view class="item-detail-right">
								<view class="item-quantity">x{{ item.num }}</view>
								<view class="item-price">￥{{ item.unitPrice }}</view>
							</view>
						</view>
					</view>
					
					<!-- 按钮 -->
					<view style="padding-right: 14px;;display: flex;justify-content: flex-end;"
						v-if="order.status == '待付款' && order.cash_url=='无'">
						<button class="mini-btn" type="warn" size="mini" style="margin: initial;border-radius: 50px;margin-right: 20px;"
							@click="showCancelModal()" :disabled="!validCancel">取消</button>
						<button class="mini-btn" type="primary" size="mini" style="margin: initial;border-radius: 50px;"
							@click="testExistsPrePayOrderWxPay">付款</button>
					</view>
					<view style="padding-right: 14px;;display: flex;justify-content: flex-end;"
						v-if="order.status == '待付款' && order.cash_url!=='无'">
						<button class="mini-btn" type="warn" size="mini" style="margin: initial;border-radius: 50px;margin-right: 20px;"
							@click="showCancelModal()" :disabled="!validCancel">取消</button>
						<button class="mini-btn" type="primary" size="mini" style="margin: initial;border-radius: 50px;"
							@click="OpenYhPay">付款</button>
					</view>
					<view style="padding-right: 14px;;display: flex;justify-content: flex-end;"
						v-if="order.status == '退款中' && order.cash_url!=='无'">
						<button class="mini-btn" type="primary" size="mini" style="margin: initial;border-radius: 50px;"
							@click="OpenRefund(order.main_order_id)">获取退款金额</button>
					</view>
					<view style="padding-right: 14px;;display: flex;justify-content: flex-end;"
						v-if="order.status == '待发货' || order.status == '待收货'">						
						<button class="mini-btn" type="warn" size="mini" style="margin: initial;    border-radius: 50px;"
							@click="refund">退款</button>
						<button class="mini-btn" type="primary" size="mini" style="margin: initial;margin-left: 10px ; border-radius: 50px;"
							@click="confirmReceived" v-if="order.status == '待收货'">确认收货</button>
					</view>
					<view class="line" style="margin-top: 5px;"></view>
					
					<view class="form-container">
						<view class="form-item" v-if="order.cash_url!=='无'">
							<view class="label">	
							</view>
							<view class="value" >
								<text class="label-word" style="color: #ff4006;">医保支付</text>
							</view>
						</view>
						<view class="form-item">
							<view class="label">
								<text class="label-word">订单号：</text>
							</view>
							<view class="value" >
								<text user-select=true> {{  order.main_order_id  }}</text>
							</view>
						</view>
						<!-- <view class="line"></view> -->
						
						<!-- <view class="line"></view> -->
						<view class="form-item">
							<view class="label">
								<text class="label-word">送至：</text>
							</view>
							<view class="value">{{order.goodsList[0].address}}</view>
						</view>
						<view class="form-item">
							<view class="label">
								<text class="label-word" style="">运费：</text>
							</view>
							<view class="value">
								<text style="color: #ff4006;">{{'￥'+order.shippingFee}}</text>
							</view>
						</view>
						<!-- <view class="line"></view> -->
						<view class="form-item">
							<view class="label">
								<text class="label-word">总价：</text>
							</view>
							<view class="value">
								<text style="font-size: 16px;font-weight: bold; color: #ff4006;">{{ '￥' + order.sumPrice }}</text>
							</view>
						</view>
						<view class="form-item" v-if="order.status=='已取消' || order.outerReturnedResult!='NO'">
							
							<view class="value">
								<text style="font-size: 13px;font-weight: bold; color: #d60f00;" 
								v-text="order.outerReturnedResult=='NO'? '不符合退货/款标准,请咨询药房获取详细原因':order.outerReturnedResult"></text>
							</view>
						</view>
						<!-- <view class="line"></view> -->
						
						<!-- 显示更多内容box -->
						<view class="collapse-box" v-show="showMore">
							<view class="form-item">
								<view class="label">
									<text class="label-word">商品数量：</text>
								</view>
								<view class="value">{{'共 ' + order.totalNum + ' 件'}}</view>
							</view>
							<view class="form-item"  @click="callPhone(order.shopInfo[0].shopPhone)">
								<view class="label">
									<text class="label-word">发票信息：</text>
								</view>
								<view class="value">
									<text>{{  '请联系药房:' }}</text>
									<text v-text="order.shopInfo[0].shopPhone" style="color: #0055ff;"></text>
								</view>
							</view>	
							<view class="form-item">
								<view class="label">
									<text class="label-word">创建时间：</text>
								</view>
								<view class="value">{{  order.createTime }}</view>
							</view>	
							<view class="form-item" v-if="order.payTime!='NO' && order.payTime!=null">
								<view class="label">
									<text class="label-word" >支付时间：</text>
								</view>
								<view class="value">{{  order.payTime }}</view>
							</view>
							<view class="form-item" v-if="order.deliveryTime!='NO'">
								<view class="label">
									<text class="label-word" >发货时间：</text>
								</view>
								<view class="value">{{  order.deliveryTime }}</view>
							</view>	
							<view class="form-item" v-if="order.receivedTime!='NO'">
								<view class="label">
									<text class="label-word">收货时间：</text>
								</view>
								<view class="value">{{  order.receivedTime }}</view>
							</view>	
							<view class="form-item" v-if="order.refundTime!='NO' && order.refundTime!=null">
								<view class="label">
									<text class="label-word" >退款时间：</text>
								</view>
								<view class="value">{{  order.refundTime }}</view>
							</view>
							<view class="form-item" v-if="order.shippingType!='' && order.shippingType!=null">
								<view class="label">
									<text class="label-word" >配送方式：</text>
								</view>
								<view class="shipping-type-btn" style="">{{  order.shippingType }}</view>
								
							</view>
							<view class="form-item" v-if="order.memo!=''" style="display: block;">
								<view class="label" >
									<text class="label-word" >订单备注：</text>
								</view>
								<view class="" style="background: #ececec;color: #999;padding: 5px;border-radius: 10px;">{{  order.memo }}</view>
							</view>
							
						</view>	
					</view>
					<view style="    margin-right: 15px;display: flex;justify-content: flex-end;"
						v-if="order.status == '已过期'">
						<text style="font-size: 16px;color: gray;">已过期</text>
					</view>
					<view style="display: flex;justify-content: center;" @click="clickShowMore()">
						<text v-text="showMore? '收起':'查看更多'" style="color: gray;"></text>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :mask-click="isEnableClick" :animation="false" :mask="true">
			<view class="popup">
				<view class="popup-content">
					<view class="popup-title">申请退款</view>
					<view class="popup-reason">
						<view>请选择退款原因：</view>
						<uni-data-select
							v-model="checkboxValue"
							:localdata="checkboxRange"
							style="width: 325rpx;"
							:clear="false"
						></uni-data-select>
					</view>
					<view class="uni-textarea textarea">
						<textarea placeholder="请输入申请退货原因(选填)" v-model="textareaContent" />
					</view>
					<view class="button-list">
						<button class="mini-btn confirm-refund" type="primary" size="mini" style="margin: 0rpx 40rpx;"
							@click="refundConfirm">确认</button>
						<button class="mini-btn" type="default" size="mini" style="margin: 0rpx 40rpx;"
							@click="refundCancel">取消</button>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
	import requestZhyf from '@/common/api/requestZhyf.js'
	export default {
		props: {
			order: {
				// type: Object,
				default: null,
			}
		},
		data() {
			return {
				validCancel: true,
				checkboxValue: 0,
				checkboxRange:[
					{"value": 0, "text": "请选择"}
				],
				showMore: false,//是否显示更多信息
				orderInfo: {
					shop: {
						shopId: 1,
						shopName: '测试店铺',
					},
					goods: [{
							goodsName: '测试药品1',
							price: 16.80,
							goodsImg: '/static/icon/shop.svg',
							description: '20mgx6粒/瓶',
							num: 1
						},
						{
							goodsName: '测试药品2',
							price: 16.80,
							goodsImg: '/static/icon/shop.svg',
							description: '20mgx6粒/瓶',
							num: 1
						},
					],
					order: {
						orderNo: '202308031154',
						orderStatus: '待付款',
					},
					allPrice: 30.0,
					fee: 0, //其他费用
					discounts: 3.60,
				},
				// shops: [],
				totalPrice: 0, // 总价
				totalNum: 0,
				shippingFee: 0.00,
				// 默认的图片
				defaultPic: 'http://images.yndzyf.com/getimage.ashx?mlszh=17700932',
				imgurl: "http://images.yndzyf.com/getimage.ashx?mlszh=",
				isEnableClick: true,
				textareaContent: '',
				eventChannel: null,
			};
		},
		mounted() {

		},
		methods: {
			showCancelModal(){
				var that = this
				uni.showModal({
					title: '取消订单',
					content: '是否取消订单?',
					success: function (res) {
						if (res.confirm) {
							that.cancelOrder()
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
							return
						}
					}
				});
			},
			async cancelOrder(){
				
				var that = this
				
				
				uni.showLoading({
					title:'取消中...'
				})
				
				const url = '/api/trade/cancelOrder';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid"),
					main_order_id: this.order.main_order_id,
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						
						if(response.data.flag== 99){
							uni.showToast({
								icon: 'none',
								title: response.data.sm,
								mask:true
							})
							that.order.status = "已过期"
							console.log(this.order)
							
							setTimeout(function(){
								that.$emit("userCancelOrder")
							},1500)
							
						}else{
							uni.showToast({
								icon: 'none',
								title: response.data.sm
							})
							this.validCancel=true
							uni.hideLoading()
						}
						
						
					} else {
						uni.showToast({
							icon: 'none',
							title: response.msg
						})
						uni.hideLoading()
					}
					
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			toPurchasedGoodsDetails(goods){
				uni.navigateTo({
					url:'/pages/purchased_goods_details/purchased_goods_details?goods='+encodeURIComponent(JSON.stringify(goods))
				})
			},
			toShop(){
				uni.navigateTo({  
					url:'/pages/shop_certificate/shop_certificate?shopName='+encodeURIComponent(JSON.stringify(this.order.shopInfo[0].shopName))+'&shopId='+encodeURIComponent(JSON.stringify(this.order.shopInfo[0].shopId))
				})
			},
			showImg(url){
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
			//从数据库后台获取退货原因
			async getRefundReason(){
				const url = '/api/User/getRefundReason';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid")
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						this.checkboxRange = JSON.parse(response.data);
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
			clickShowMore(){
				this.showMore=!this.showMore
			},
			//用户点击确认收货的按钮
			confirmReceived() {
				console.log(this.order.main_order_id);
				var that = this;
				uni.showModal({
					title: '确认收货',
					content: '您确定即将对该笔订单进行确认收货吗？',
					success: function(res) {
						if (res.confirm) {
							//用户点击确认后，对该笔订单进行确认收货
							that.uploadConfirmMsg(that.order.main_order_id);
						} else if (res.cancel) {
							//用户点击取消后，直接不处理其他业务
							return;
						}
					}
				});
			},
			//先从前台把数据传到后台，进行写t_order_order表的操作：已收货状态
			async uploadConfirmMsg(main_order_id) {
				const url = '/api/User/uploadConfirmReceived';
				const method = 'POST';
				const data = {
					tradeNo: main_order_id,
					confirmType: '客户确认',
				}
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						//处理拼接调用上传的语句
						const operateId = JSON.parse(response.data);
						this.uploadConfirmMsgToZhyf(main_order_id, operateId.operateId, operateId.receiveConfirmTime);
					} else {
						uni.showToast({
							icon: 'error',
							title: '确认收货失败',
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
			//先从前台把数据传到后台，进行写t_order_order表的操作：已收货状态
			async uploadConfirmMsgToZhyf(main_order_id, operateId, receiveConfirmTime) {
				const url = '/api/Zhyf/getOuterOrderReceived';
				const method = 'POST';
				const dataOrigin = {
					tradeNo: main_order_id,
					confirmType: '客户确认',
					confirmTime: receiveConfirmTime,
					operateId: operateId
				}
				const data = JSON.stringify(dataOrigin);
				try {
					const response = await requestZhyf('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						//处理拼接调用上传的语句
						uni.showToast({
							icon: 'success',
							title: '确认收货成功',
							duration: 3000
						})
						this.$emit('childMethod');
					} else {
						uni.showToast({
							icon: 'error',
							title: '确认收货失败',
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
			refund() {
				uni.requestSubscribeMessage({
					//此处填写申请模板的模板ID
				  	tmplIds: ['uJZopLHooaB2-RHZ_mkkn59E_a9KJjCa_INAdBtf_9U'],
				  	success (res) {
				  		console.log(res)
				  	},
					
				})
				console.log(this.order.main_order_id);
				var that = this;
				this.$refs.popup.open('center');
				this.getRefundReason();
			},
			refundCancel() {
				this.$refs.popup.close();
				this.textareaContent = '';
				this.checkboxValue = 0;
			},
			//用户填写退货申请后点击提交按钮提交退货原因给后台
			refundConfirm() {
				if (this.checkboxValue === 0) {
					uni.showToast({
						icon: 'error',
						title: '请选择退货原因',
						duration: 3000
					});
					return;
				}
				uni.showLoading({
					title:'请稍等...',
					mask:true
				});
				//用户点击确认后，对该笔订单进行确认收货
				let selectedOption = this.checkboxRange.find(option => option.value === this.checkboxValue);
				let text = selectedOption ? selectedOption.text : '';
				const reasonOfReturn = text + "：" + this.textareaContent;
				console.log(reasonOfReturn);
				this.applyReturned(this.order.main_order_id, reasonOfReturn);
			},
			//t_order_order表中写退单记录,待药房确认
			async applyReturned(main_order_id, reasonOfReturn) {
				const url = '/api/User/applyReturned';
				const method = 'POST';
				const data = {
					orign_main_order_id: main_order_id,
					reasonOfReturn: reasonOfReturn
				}
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						//处理拼接调用上传的语句
						const returnresult = JSON.parse(response.data);

						//获取上传退货申请到门店的参数 20231127注释，测试时不要上传到智慧药房
						this.getJsonZhyfOrderReturned(returnresult.main_order_id, returnresult.operateId);
						uni.hideLoading()
					} else {
						uni.hideLoading();
						uni.showToast({
							icon: 'error',
							title: '申请退款失败,'+response.msg,
							duration: 3000
						});
						this.$refs.popup.close();
						this.checkboxValue = 0;
						this.$emit('childMethod');
					}
				} catch (error) {
					uni.showToast({
						icon: 'error',
						title: error,
						duration: 3000
					});
				}
			},
			//获取上传退货申请到门店的参数
			async getJsonZhyfOrderReturned(main_order_id, operateId) {
				const url = '/api/User/getJsonZhyfOrderReturned';
				const method = 'POST';
				const data = {
					main_order_id: main_order_id
				}
				
				try {
					const response = await request('yzy_app', url, method, data);

					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						//处理拼接调用上传的语句
						//获取上传退货申请到门店的参数
						this.sendApplyReturned(response.data, operateId);
					} else {
						uni.showToast({
							icon: 'error',
							title: response.msg,
							duration: 3000
						});
						uni.hideLoading();
						this.$refs.popup.close();
						this.checkboxValue = 0;
						this.$emit('childMethod');
					}
				} catch (error) {
					uni.showToast({
						icon: 'error',
						title: error,
						duration: 3000
					})
				}
			},
			//退货申请传到门店
			async sendApplyReturned(returnJson, operateId) {
				const url = '/api/Zhyf/getApplyForOuterOrderReturned';
				const method = 'POST';
				const msgJson = JSON.parse(returnJson);
				msgJson.operateId = operateId;
				const data = JSON.stringify(msgJson);
				try {
					const response = await requestZhyf('yzy_app', url, method, data);
					console.log("申请退款成功！");
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						//退款[{"returnedFlag":"99","returnedMsg":"确认退款"}]
						//在此处调用WebAPI进行后续的退款操作
						uni.hideLoading();
						this.$refs.popup.close();
						this.checkboxValue = 0;
						this.$emit('childMethod');
						this.textareaContent = '';
						uni.showToast({
							icon: 'success',
							title: '申请成功，请等待审核',
							duration: 3000
						});

					} else {
						uni.showToast({
							icon: 'error',
							title: response.msg,
							duration: 3000
						});
						uni.hideLoading();
						this.$refs.popup.close();
						this.checkboxValue = 0;
						this.$emit('childMethod');
					}
				} catch (error) {
					uni.showToast({
						icon: 'error',
						title: error,
						duration: 3000
					})
				}
			},
			async queryOrder(main_order_id){
				const url = '/api/Trade/requestYinhaiQueryOrder';
				const method = 'POST'; 
				const data = {
					main_order_id: main_order_id
				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					console.log(response)
				} catch (error) {
					console.log(error);
				}
			},
			OpenYhPay(){
				var that = this
				console.log(this.order.cash_url) //plugin://yh-pay-plugin/order-pay?pay_token=0276c75500594df6898906ae3b4ab98e&unified_token=8f7381fdb59147b7b886d537469888f8
				uni.navigateTo({
					url:'/subPackage_yinhai/yinhaiPay/yinhaiPay?main_order_id='+encodeURIComponent(JSON.stringify(this.order.main_order_id))+'&cash_url='+encodeURIComponent(JSON.stringify(this.order.cash_url))
				})
			},
			OpenRefund(main_order_id){
				uni.navigateTo({
					url:'/subPackage_yinhai/yinhaiRefund/yinhaiRefund?main_order_id='+encodeURIComponent(JSON.stringify(main_order_id))
				})
			},
			
			//测试支付已存在的未支付订单
			async testExistsPrePayOrderWxPay() {
				const url = '/api/example/testExistsPrePayOrderWxPay';
				const method = 'POST';
				const data = {
					businessUnitId: this.order.shopInfo[0].businessUnitId,
					openid: uni.getStorageSync("openid"),
					main_order_id: this.order.main_order_id,
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						//2023-09-20 后禹谦添加：每次用户点击支付时需要判断智慧药房当前库存和价格是否同步
						//先要获取一下最新的库存和价格，如果价格和库存不一致的话需要进行提示用户
						
						//2023-09-20 后禹谦添加结束
						this.requestWxPay(response.data, response.data.main_order_id)
					} else {
						uni.showToast({
							icon: 'none',
							title: response.msg
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
			requestWxPay(data, main_order_id) {
				var that = this
				uni.requestPayment({
					provider: 'wxpay', //支付类型-固定值
					timeStamp: data.timeStamp, // 时间戳（单位：秒）
					nonceStr: data.nonceStr, // 随机字符串
					package: data.package, // 固定值
					signType: data.signType, //固定值
					paySign: data.paySign, //签名

					success: function(res) {
						// console.log('success:' + JSON.stringify(res));
						console.log("支付成功");
						uni.showToast({
							icon: 'success',
							title: '支付成功'
						})
						that.testQueryPay(data.out_order_id,
							main_order_id) //支付成功后查询一下微信支付订单状态

					},

					fail: function(err) {
						// console.log('fail:' + JSON.stringify(err));
						console.log("支付失败");
						uni.showToast({
							icon: 'none',
							title: '支付失败'
						})
						//用户未支付则发一个通知
						that.testQueryPay(data.out_order_id,
							main_order_id) //支付成功后查询一下微信支付订单状态
					}
				})
			},
			//测试查询支付
			async testQueryPay(out_order_id, main_order_id) {
				const url = '/api/example/testQueryPayOrder';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid"),
					main_order_id: main_order_id,
					out_order_id: out_order_id,
				};
				try {
					const response = await request('yzy_app', url, method, data);

					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						this.uploadOrderToZhyf(response.msg, response.data.operateId);

					} else {
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
			//上传智慧药房做账
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
						this.$emit('childMethod');
					} else {

					}
				} catch (error) {
					console.log(error);
				}
			},
			// calcTotalPrice() {
			// 	for (const goods of this.order.goodsList) {
			// 	    this.totalNum += goods.num;
			// 	    this.totalPrice += goods.totalPrice;
			// 	  }
			// },
		}
	}
</script>

<style lang="scss">
	.shipping-type-btn{
		height: 15px;border-radius: 20px;padding: 3px 5px;background: #ff5a07;color: white;display: flex;align-items: center;
	}
	.popup-reason{
		display: flex;
		justify-items: center;
		align-items: center;
		padding: 10rpx 0;
	}
	
	.value{
		color: #999;
		overflow: hidden;
		word-break: break-all; /* break-all(允许在单词内换行。) */
		text-overflow: ellipsis; /* 超出部分省略号 */
		display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 1; /** 显示的行数 **/
		
	}
	.confirm-refund {
		background-color: #1296DB !important;
		color: #fff !important
	}

	.button-list {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
	}

	.popup-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.textarea {
		border: #aaa solid 1rpx;
		border-radius: 10rpx;
	}

	.popup-title {
		font-size: 30rpx;
		font-weight: bold;
	}

	.popup {
		padding: 15px;
		background-color: #fff;
		border-radius: 15px;
		width: 75vw;
		height: 395rpx;
		position: relative;
		top: -180rpx;
	}

	.goods-name-box {
		height: 50%;
		font-weight: bold;
	}

	.right-container {
		display: flex;
		flex: 1;

		justify-content: space-between;
	}

	.image {
		width: 90px;
		height: 90px
	}

	.content {
		width: 96vw;
		padding: 2vw;
		background: white;
		min-height: 80px;
	}

	.goods-card {
		display: flex;
		width: 100%;
	}

	.form-container {
		padding: 20upx;
	}

	.form-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
	}

	.label {
		width: 140rpx;
		display: flex;
		justify-content: space-between;
	}

	.line {
		height: 1upx;
		background-color: #ccc;
	}

	page {
		background-color: #F7FCFF;
	}

	.address-name-phone {
		display: flex;
		align-items: center;
	}

	.address-card {
		display: flex;
		align-items: center;
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 24rpx;
	}

	.address-info {
		flex: 1;
		padding: 0 10rpx;
	}

	.address-name {
		font-size: 30rpx;
		font-weight: bold;
	}

	.address-phone {
		font-size: 30rpx;
		color: #636263;
		padding: 0 30rpx;
	}

	.address-details {
		font-size: 32rpx;
		color: #636263;
		margin-top: 10rpx;
	}

	.address-details-road {
		font-size: 32rpx;
		color: #636263;
		font-weight: bold;
	}

	.confirm-order {
		padding: 20rpx;
	}

	.order-list {
		margin-bottom: 20rpx;
		border-radius: 24rpx;
	}

	.order-item {
		margin-bottom: 20rpx;
	}

	.shop-name {
		display: flex;
		font-size: 32rpx;
		font-weight: 800;
		margin-bottom: 10rpx;
		padding-top: 10rpx;
	}

	.item-list {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 32rpx;
	}

	.item {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 32rpx;
	}

	.item-info {
		display: flex;
		align-items: center;
	}

	.item-details {
		margin-left: 20rpx;
	}

	.item-name {
		width: 375rpx;
		display: flex;
		font-size: 28rpx;
		margin-bottom: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 40rpx;
	}

	.item-spec {
		font-size: 24rpx;
		color: #999;
		margin-bottom: 10rpx;
	}

	.item-price {
		font-size: 28rpx;
		color: #f00;
		 text-align: right;
		 padding-right: 4px;
	}

	.item-quantity {
		font-size: 28rpx;
		color: #999;
		margin-left: auto;
		padding-right: 10rpx;
		font-weight: bold;
	}

	image {
		width: 120rpx;
		height: 120rpx;
	}

	.item-detail-right {
		display: flex;
		flex-direction: column;
		justify-items: right;
		width: 110rpx;
	}

	.more-location-icon {
		width: 30rpx;
		height: 30rpx;
		padding: 0 20rpx;
	}

	.tabbar {
		width: 100%;
		height: 220rpx;
		background-color: #ffffff;
		position: fixed;
		bottom: -5rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		margin-left: -16rpx;
	}

	.total-price {
		display: flex;
		font-size: 28rpx;
		font-weight: bold;
		text-align: right;
		margin-bottom: 20rpx;
	}

	.submit-btn {
		width: 240rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #1296DB;
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-radius: 16rpx;
		margin-right: 20rpx;
		margin-left: 20rpx;
	}

	.total-price-num {
		color: red;
		font-size: 48rpx;
		font-weight: bold;
		padding-bottom: 20rpx;
	}

	.total-item {
		display: flex;
		align-items: center;
	}

	.caution-card {
		display: flex;
		flex-direction: column;
		align-items: left;
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 24rpx;
		margin: 24rpx 0;
	}

	.caution-title {
		color: #1296DB;
		font-size: 28rpx;
		font-weight: bold;
	}

	.caution-content {
		color: #636263;
		font-size: 24rpx;
	}

	.checkbox-item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 36rpx 0 10rpx 0;
	}

	.tabbar-commit {
		display: flex;
		margin-left: auto;
		margin-bottom: 20rpx;
	}

	.blank {
		height: 200rpx;
	}

	.memo {
		font-size: 24rpx;
		font-weight: bold;
		margin-left: -14rpx;
	}

	.card-shadow {
		box-shadow: 2px -1px 10px 0.5px rgba(0, 0, 0, 0.2);
	}

	.memo-card {
		border-radius: 24rpx;
	}

	.path-item {
		padding: 30rpx 20rpx;
		margin: 20rpx;
		border-bottom: 2rpx solid #1296DB;
		border-radius: 10px;
		background-color: #ffffff;
		color: #fff;
	}

	.item-main {
		display: flex;
		align-items: center;
	}

	.active {
		padding: 0 3rpx;
		border: 1px solid #1296DB;
		color: #1296DB;
		border-radius: 20rpx;
		font-size: 16rpx;
	}

	.item-name {
		padding-right: 10rpx;
		font-size: 28rpx;
		color: #000;
	}
</style>
