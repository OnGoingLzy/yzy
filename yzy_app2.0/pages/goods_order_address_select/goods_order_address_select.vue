<template>
	<view>
		<view class="ResultTitle">
			<text class="smxx">请选择区域：</text>
			<view class="content-picker">
				<pickerAddress @change="change" class="picker-address"> {{txt}}
				</pickerAddress>
			</view>
			<image class="arrow" src="/static/icon/drop-down-arrow.png"></image>
		</view>

		<view v-for="(mdxx_item, i) in mdxx" :key="i" @click="getMdId(mdxx_item)">
			<shopList :goods="mdxx_item"></shopList>
		</view>

		<vk-data-goods-sku-popup ref="skuPopup" v-model="skuKey" border-radius="20" :localdata="goodsInfo" :mode="3"
			:hide-stock="false" @open="onOpenSkuPopup" @close="onCloseSkuPopup" @add-cart="addCart" @buy-now="buyNow"
			:amount-type="0" height="300"></vk-data-goods-sku-popup>

		<!-- <view v-if="mdxx.length === 0 || mdxx === null">
      <view class="null_tsxx"><text>您好！您需要的这个药品，药店暂时无现货，如果您需要继续找药，请联系客服。</text></view>
            <view class="null_tsxx"><text>谢谢您的关注！</text></view>
<!--      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text> -->
		<!-- </view> -->

		<!--    <view v-else>
      <view class="goods-name">没有找到有库存的门店，可以联系客服</view>
    </view> -->
		<!-- <view class="goods-item" @click="getMdIdzd()"> -->
		<!-- 左侧的盒子 -->
		<!-- 	<view class="goods-item-left">
				<view class="tpyj">
					<image :src="defaultPic" class="goods-pic"></image>
				</view>
			</view> -->
		<!-- 右侧的盒子 -->
		<!-- <view class="goods-item-right"> -->
		<!-- 门店信息 -->
		<!-- 			<view class="goods-name">云南省医药有限公司</view>
				<view class="goods-desc">地址：云南省医药有限公司</view>
			</view> -->
	</view>
	</view>
</template>

<script>
	import pickerAddress from '@/components/goods_order/pick_address/pick_address.vue'
	import shopList from '@/components/goods_order/shop_list/shop_list.vue'
	export default {
		components: {
			pickerAddress,
			shopList
		},

		data() {
			return {
				txt: '点击选择所属区域',
				title: 'Hello',

				// 是否打开SKU弹窗
				skuKey: false,
				// SKU弹窗模式
				skuMode: 3,
				// 后端返回的商品信息
				goodsInfo: {},

				datajson: {},

				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				popMenu: false,
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},

				//mdxx:JSON.parse(JSON.stringify(uni.getStorageSync('mdxx'))),
				mdxx: uni.getStorageSync('mdxx'),
				message: '',
				cfybz: '',
				tsbz: '',
				newCart: JSON.parse(uni.getStorageSync("cart")),
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				mdxhbz: '',
				isRx: ''
			}
		},
		onLoad(option) {
			console.log("aaa");
			this.isRx = option.isRx;
		},
		methods: {
			change(data) {
				this.txt = data.data.join('')

				uni.request({
					url: 'https://appletservice.dyb.yn.cn/api/SearchMd',
					// url: 'https://appletservice.dyb.yn.cn/api/InsertXqqd',
					method: 'POST',
					header: {
						"Content-Type": "application/json",
						"X-Ca-Key": "wxe7c826a1a5e00055",
						"X-Service-Method": "SearchMd"
					},
					data: {
						"md_json": uni.getStorageSync('mdxx'),
						"mdlx": data.data[0],
						"shi": data.data[1],
						"qu": data.data[2]
					},
					success: res => {
						console.log(res.data.data)
						if (res.data.data !== null) {

							this.mdxx = res.data.data
						} else {
							this.mdxx = null
							uni.showToast({
								title: '没有相应的门店，请重新选择门店信息',
								icon: "none"
							});
						}
					},
					fail: res => {

					}
				})
			},
			//点击选择门店确定后将mdid存入storage中
			getMdId(mdxx_item) {
				this.tsbz = this.newCart.tsbz
				if (mdxx_item.kcsm.includes('预订')) {
					uni.setStorageSync('message',
						'小云提示您：\n\n\t\t您的订购需求正在处理中，我们将于两个工作日内电话联系您。\n\n\t\t感              谢您的使用!祝您健康!')

				} else {
					uni.setStorageSync('message', this.newCart.tsbz)
				}
				console.log(uni.getStorageSync('message'))
				this.openSkuPopup(mdxx_item)
			},

			//新加
			openSkuPopup(mdxx_item) {

				this.goodsInfo = {
					"_id": "" + mdxx_item.mddm + "",
					"isRx": "" + this.isRx + "",
					"name": "" + this.newCart.pm + "" + "" + mdxx_item.xssm + "",
					"goods_thumb": "http://images.yndzyf.com/getimage.ashx?mlszh=" + this.newCart.spml_tpxx_lb[0]
						.tplszh + "",
					"sku_list": [{
							"_id": "" + mdxx_item.mddm + "",
							"goods_id": "" + this.newCart.spdm + "",
							"goods_name": "" + this.newCart.pm + "",
							"image": "http://images.yndzyf.com/getimage.ashx?mlszh=" + this.newCart.spml_tpxx_lb[0]
								.tplszh + "",
							// "price": ""+this.newCart.dqlsj+"",
							"price": mdxx_item.xsdjs,
							"sku_name_arr": ["" + this.newCart.spgg + "" + "" + this.newCart.sccs + "", "" +
								mdxx_item.mdmc + ""
							],
							"stock": "" + mdxx_item.xzkc + "",
							"hideStock": "false"
							//"stock": "有"
						}

					],
					"spec_list": [

						{
							"list": [{

								"name": "" + this.newCart.spgg + "" + "" + this.newCart.sccs + ""
							}],
							"name": "选择规格"
						},
						{
							"list": [{
								"name": "" + mdxx_item.mdmc + "",
							}],
							"name": "选择门店"
						},
					]
				}
				console.log(this.goodsInfo)
				this.skuKey = true;
			},

			onOpenSkuPopup() {
				console.log("监听 - 打开sku组件");
			},
			onCloseSkuPopup() {
				console.log("监听 - 关闭sku组件");
			},



			// 加入购物车按钮
			buyNow(selectShop) {

				this.skuKey = false;

				uni.request({
					url: 'https://appletservice.dyb.yn.cn/api/InsertXqqd',
					//url: 'http://localhost:58309/api/InsertXqqd',
					method: 'POST',
					header: {
						"Content-Type": "application/json",
						"X-Ca-Key": "wxe7c826a1a5e00055",
						"X-Service-Method": "InsertXqqd"
					},
					data: {
						"openid": uni.getStorageSync("openid"),
						"lxdh": uni.getStorageSync("lxdh"),
						"mddm": selectShop._id,
						"spxx_json": JSON.parse(uni.getStorageSync("cart")),
						"tjr": uni.getStorageSync("tg_czy"),
						"count": selectShop.buy_num,
						"note": selectShop.note,
					},
					success: res => {
						console.log(res.data)
						if (res.data.result == -99) {
							uni.showModal({
								title: '提交需求失败！',
								content: res.data.sm,
								showCancel: false,
								success: function(res) {},
							});
						} else {
							uni.setStorageSync("mdId", '')
							uni.showModal({
								title: '提交需求成功！',
								content: uni.getStorageSync('message').replace(/<br>/g, "\n\n"),
								showCancel: false,
								success: function(res) {
									if (res.confirm) {

										uni.removeStorageSync('cart')

										console.log('成功')
										uni.reLaunch({
											url: '/pages/goods_list/goods_list',
										})

									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								},
							});
						}
					},
					fail: res => {
						console.log("出错了")
						console.log(res)
					}
				});
			},


			toast(msg) {
				uni.showToast({
					title: msg,
					icon: "none"
				});
			},

			//点击总店，传入‘总店’（暂无mdid）
			getMdIdzd() {
				uni.showModal({
					title: '门店选择',
					content: '确认选择"云南省医药有限公司"?',
					success: function(res) {
						if (res.confirm) {
							uni.setStorageSync("mdId", '总店')
							let pages = getCurrentPages(); //当前页面栈
							let beforePage = pages[pages.length - 2]; //指定调用页面为上个页面
							uni.navigateBack({
								url: '/pages/cart/cart',
								success: res => {
									// this.selectComponent('#my-settle').settlement();
									beforePage.$vm.$children[2].settlement()
								}
							})
						} else if (res.cancel) {

						}
					}
				});

			}
		}

	}
</script>

<style lang="scss">
	.goods-item {
		height: 150px;
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-top: 5px solid rgb(249, 249, 249);



		.goods-item-left {
			margin-right: 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
				border-radius: 10%;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-desc {
				color: #666666;
				font-size: 12px;
				// height: 2px;
				// justify-content:space-around;

			}

			.goods-name {
				font-size: 15px;
				// font-weight: bold;
			}

			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.space {
					color: #ffffff;
				}

				.goods-price {
					color: #C00000;
					font-size: 13px;
				}

			}
		}
	}

	.detail_title {
		background-color: #007AFF;
		color: #ffffff;
		width: 100%;
		height: 70rpx;
		text-align: center;
		justify-content: center;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.null_tsxx {
		color: #8B0000;
		font-size: 18px;
		margin: 20px;
		text-align: center;
	}

	uni-modal .uni-modal__bd {
		white-space: pre-wrap;
	}

	.ResultTitle {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 25px;
		margin: 10px 0;
	}

	.smxx {
		width: 150px;
		line-height: 1;
		font-size: 16px;
		flex-direction: row;
		padding-left: 5px;
	}

	.content-picker {
		background-color: #9fc5e8;
		color: lightcyan;
		height: 20px;
		width: 60%;
		font-size: 16px;
		align-items: left;
		margin-left: -30px;
		line-height: 1;
	}

	.arrow {
		width: 20px;
		height: 20px;

	}
</style>
