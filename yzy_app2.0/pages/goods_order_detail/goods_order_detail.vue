<template>
	<view class="test">
		<view v-for="(item,i) in goods_info" :key="i" class="goods-detail-container">
			<!--  轮播图区域 -->

			<!-- 判断是否有图片 没有就设置成默认 -->
			<view v-if="(imgurl+item.spml_tpxx_lb[0].tplszh)!='http://images.yndzyf.com/getimage.ashx?mlszh=undefined'"
				class="">
				<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" :circular="true">
					<swiper-item v-for="(item1, i) in item.spml_tpxx_lb" :key="i">
						<image v-if="goods_info[0].tssm1=='处方药须凭处方在药师指导下购买和使用!'" style="filter: blur(5px);"
							:src="(imgurl+item1.tplszh)=='http://images.yndzyf.com/getimage.ashx?mlszh=undefined'?defaultPic:(imgurl+item1.tplszh)"
							@click="preview(i, goods_info[0].tssm1)"></image>
						<image v-if="goods_info[0].tssm1!='处方药须凭处方在药师指导下购买和使用!'"
							:src="(imgurl+item1.tplszh)=='http://images.yndzyf.com/getimage.ashx?mlszh=undefined'?defaultPic:(imgurl+item1.tplszh)"
							@click="preview(i, goods_info[0].tssm1)"></image>
						<view v-if="goods_info[0].tssm1=='处方药须凭处方在药师指导下购买和使用!'" style="position: absolute;
																top: 50%;
																text-align: center;
																transform: translate(-50%, -50%);
																left: 50%;line-height: 9px;">
							<text style="font-size: 16px; white-space: nowrap;color: white;">处方药，开方后可查看详细信息</text>
						</view>


					</swiper-item>
				</swiper>
			</view>
			<view class="dfpic" v-else>
				<image :src="defaultPic" mode=""></image>
			</view>
			<!--    轮播图区域 -->
			<!-- 商品信息区域 -->
			<view class="goods-info-box">
				<!-- 商品名称规格 -->
				<!-- <view class="goods-name">{{goods_info.goods_name}}</view> -->
				<view class="goods-name">{{item.pm}}</view>
				<!-- 商品的价格 -->
				<view class="goods-price space" v-if="item.dqlsj==='' || item.dqlsj=='0.0000' ">
					<text class="space">a</text>
				</view>
				<view class="price" v-else>参考价:￥{{item.xsdjs}}
					<text class="price-sm">价格仅供参考，以门店实际交易价格为准。</text>
				</view>



				<view class="goods-bq-box">
					<view class="goods-bq" :style="{'background':'#55aaff'}" v-if="item.tssm1=='处方药须凭处方在药师指导下购买和使用!' ">
						处方药</view>
					<text class="space">a</text>
					<view class="goods-bq" :style="{'background':'#E93423'}" v-if="item.cfyzj!=='' ">针剂处方药</view>
					<text class="space">a</text>
					<view class="goods-bq" :style="{'background':'#439143'}" v-if="item.std!=='' ">国谈药</view>
					<text class="space">a</text>
					<view class="goods-bq" :style="{'background':'#ebc726'}" v-if="item.tgy!=='' ">含特殊成分复方制剂</view>
				</view>
				<view v-if="item.bqsm!==''">
					<view class="goods_detail">小云提示您:
						<text class="goods_detail_bqsm" :style="{'color':'#E93423'}"
							v-if="item.cfyzj!=='' || item.tssm1=='处方药须凭处方在药师指导下购买和使用!'">该药须凭处方在药师指导下购买和使用</text>
						</br>
						<text class="goods_detail_bqsm" :style="{'color':'#30d138'}"
							v-if="item.std!=='' ">该药属于国谈药品,如需统筹报销,请至定点医院开具处方、购买;如自费双通道口服药,请直接至店购买;如自费双通道针剂,请凭处方至店购买。</text>
						</br>
						<text class="goods_detail_bqsm" :style="{'color':'#ebc726'}"
							v-if="item.tgy!=='' ">请凭身份证购买，且每次购药不超过2个最小包装</text>
					</view>
					<view style="color:#bebebe;">商品图片仅供参考，以实际包装为准</view>
				</view>
				<view class="goods_detail"></view>
			</view>
			<view class="goods_details">
				<view class="details_title">商品介绍</view>
				<uni-table stripe border="true" emptyText="暂无更多数据" class="table_style">
					<uni-tr>
						<uni-th class="text_style " width="140px">通用名</uni-th>
						<uni-th class="text_style">{{item.pm}}</uni-th>
					</uni-tr>
					<uni-tr>
						<uni-td class="text_style">商品名</uni-td>
						<uni-td class="text_style">{{item.bm}}</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td class="text_style ">性状</uni-td>
						<uni-td class="text_style ">{{item.xz}}</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td class="text_style">药品规格</uni-td>
						<uni-td class="text_style">{{item.spgg}}</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td class="text_style">生产企业</uni-td>
						<uni-td class="text_style">{{item.sccs}}</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td class="text_style">进口药品注册证号</uni-td>
						<uni-td class="text_style">{{item.pzwh}}</uni-td>
					</uni-tr>
				</uni-table>
				<view class="tp_hl">
					———— 图片详情 ————
				</view>
				<view v-if="(imgurl+item.spml_tpxx[0].tplszh)!='http://images.yndzyf.com/getimage.ashx?mlszh='"
					class="">
					<view v-for="(item2,i) in item.spml_tpxx" :key="i" class="bottom_pic" style="position: relative;">
						<image mode="widthFix" class="tpxq" :src="imgurl+item2.tplszh" @click="bpreview(i, goods_info[0].tssm1)"
							v-if="goods_info[0].tssm1=='处方药须凭处方在药师指导下购买和使用!'" style="filter: blur(5px);"></image>
						<image mode="widthFix" class="tpxq" :src="imgurl+item2.tplszh" @click="bpreview(i, goods_info[0].tssm1)"
							v-if="goods_info[0].tssm1!='处方药须凭处方在药师指导下购买和使用!'"></image>
						<view v-if="goods_info[0].tssm1=='处方药须凭处方在药师指导下购买和使用!'" style="position: absolute;
																top: 50%;
																text-align: center;
																transform: translate(-50%, -50%);
																left: 50%;line-height: 9px;">
							<text style="font-size: 16px; white-space: nowrap; color: white;">处方药，开方后可查看详细信息</text>
						</view>

					</view>
				</view>

			</view>
			<button type="warn" size="default" class="btn" @click="settlement()">下一步</button>

		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		// computed: {
		// 	...mapState('m_cart', []),
		// 	...mapGetters('m_cart', ['total'])
		// },
		// watch: {
		// 	total(newVal) {
		// 		const findResult = this.options.find(x => x.text === '需求清单')
		// 		if (findResult) {
		// 			findResult.info = newVal
		// 		}
		// 	},
		// 	total: {
		// 		handler(newVal) {
		// 			const findResult = this.options.find(x => x.text === '需求清单')
		// 			if (findResult) {
		// 				findResult.info = newVal
		// 			}
		// 		},
		// 		immediate: true
		// 	}
		// },
		data() {
			return {
				goods_count: 1,
				goods_info: {},
				spdm: '',


				//options: [{
				//	icon: 'bars',
				//	text: '需求清单',
				//	info: 0
				//}],
				buttonGroup: [{
					text: '下一步',
					backgroundColor: '#ff0000',
					// font-size: '15px',
					color: '#fff'
				}],
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				spjg: "",
				imgurl: "http://images.yndzyf.com/getimage.ashx?mlszh=",
				imgList: [],
				bimgList: [],
				isRx: ''
			};
		},
		//获取页面数据
		onLoad(options) {
			this.spdm = options.spdm
			this.getGoodsDetail(this.reobj)
			uni.setStorageSync('pagelx', '下订单')
		},
		//处理价格保留两位小数 为0则不显示
		filters: {
			tofixed(num) {
				if (num == 0.00) {
					return ' '
				}
				return Number(num).toFixed(2)
			}
		},
		methods: {
			...mapMutations('m_cart', ['addToCart']),
			//发起请求获取药品详情
			async getGoodsDetail(spdm) {
				uni.request({
					url: 'https://appletservice.dyb.yn.cn/api/SearchSpmlDetail',
					method: 'POST',
					header: {
						"Content-Type": "application/json",
						"X-Ca-Key": "wxe7c826a1a5e00055",
						"X-Service-Method": "SearchSpmlDetail"
					},
					data: {
						spdm: this.spdm
					},
					success: res => {
						if (res.data.result != -99) {
							console.log(res.data.data)
							this.goods_info = res.data.data
							//如果是处方药，需要传一下获取一下值
							if(this.goods_info[0].tssm1 === '处方药须凭处方在药师指导下购买和使用!'){
								this.isRx = 'true';
							}else{
								this.isRx = 'false';
							}
						}
					}
				});

			},
			numFilter(value) {
				// 截取当前数据到小数点后两位
				let realVal = parseFloat(value).toFixed(2)
				return realVal
			},
			//下面四个方法都是预览图片功能
			preview(i, text) {
				//如果有遮罩，则不允许点击查看大图
				if(text === "处方药须凭处方在药师指导下购买和使用!"){
					return;
				}
				this.getImgList()
				const set = new Set(this.imgList)
				this.imgList = Array.from(set)
				uni.previewImage({
					current: this.imgurl + this.goods_info[0].spml_tpxx_lb[i].tplszh,
					urls: this.imgList
				})
			},

			//计数器监听
			numChangeHandler(val) {

				this.goods_count = val

			},


			bpreview(i, text) {
				//如果有遮罩，则不允许点击查看大图
				if(text === "处方药须凭处方在药师指导下购买和使用!"){
					return;
				}
				this.getbImgList()
				var that = this
				const bset = new Set(this.bimgList)
				this.bimgList = Array.from(bset)
				uni.previewImage({
					current: this.imgurl + this.goods_info[0].spml_tpxx[i].tplszh,
					urls: this.bimgList
				})
			},
			getImgList() {
				for (var i = 0; i < this.goods_info[0].spml_tpxx_lb.length; i++) {
					this.imgList.push(this.imgurl + this.goods_info[0].spml_tpxx_lb[i].tplszh)
				}
				console.log(this.imgList);
			},
			getbImgList() {
				for (var i = 0; i < this.goods_info[0].spml_tpxx.length; i++) {
					this.bimgList.push(this.imgurl + this.goods_info[0].spml_tpxx[i].tplszh)
				}
				console.log(this.bimgList);
			},
		
			// 用户点击了下一步按钮
			async settlement() {
				var that = this;
				if (!uni.getStorageSync("userInfo")) return this.delayNavigate()
				//获取定位
				if (!uni.getStorageSync("mdId")) {
					if (!uni.getStorageSync('wd')) {
						uni.navigateTo({
							url: '/pages/goods_order_location/goods_order_location',
						})
					} else {
						uni.getLocation({
							type: 'gcj02', //返回可以用于uni.openLocation的经纬度
							success: function(res) {
								console.log(res)
								uni.setStorageSync('wd', res.latitude)
								uni.setStorageSync('jd', res.longitude)
							},
						})
						uni.showLoading({
							title: '获取门店信息中'
						})

						const goods = {
							'spdm': this.goods_info[0].spdm,
							'pm': this.goods_info[0].pm,
							'spgg': this.goods_info[0].spgg,
							'dqlsj': this.goods_info[0].dqlsj,
							'sccs': this.goods_info[0].sccs,
							'tsbz': this.goods_info[0].tsbz,
							'spml_tpxx_lb': [{
									tplszh: this.goods_info[0].spml_tpxx_lb[0].tplszh
								},
								{
									tplszh: this.goods_info[0].spml_tpxx_lb[0].tplszh
								}
							],
							'goods_count': 1,
							'goods_state': true
						}
						uni.removeStorageSync('cart')
						uni.setStorageSync('cart', JSON.stringify(goods))
						//this.addToCart(goods);
						//this.newCarts = JSON.parse(uni.getStorageSync("cart"))
						//this.newCarts = this.newCarts.filter(v => v.goods_state)
						// console.log(JSON.stringify(this.newCarts));
						//查询门店库存是否满足 满足则返回门店信息
						uni.request({
							url: 'https://appletservice.dyb.yn.cn/api/CheckMdkc',
							//url: 'http://localhost:58309/api/CheckMdkc',
							header: {
								"Content-Type": "application/json",
								"X-Ca-Key": "wxe7c826a1a5e00055",
								"X-Service-Method": "CheckMdkc"
							},
							method: 'POST',
							data: {
								spxx_json: goods,
								wd: uni.getStorageSync('wd'),
								jd: uni.getStorageSync('jd')
							},
							success: (res) => {
								console.log(goods);
								console.log(res);
								this.mdxx = res.data.data
								if (this.mdxx === null) {
									console.log('无门店')
									uni.navigateTo({
										url: '/pages/goods_order_warning_shop/goods_order_warning_shop'
									})
								} else {
									uni.setStorage({
										key: "mdxx",
										data: this.mdxx,
										success: function() {
											uni.navigateTo({
												url: '/pages/goods_order_address_select/goods_order_address_select?isRx=' + that.isRx
											})
											//console.log("2");
										}
									});


								}
							},


							fail: (res) => {
								console.log('出错了');
								console.log(res);
								uni.hideLoading();
							}
						})

					}
				}
				//上传需求清单
				if (uni.getStorageSync("mdId")) {
					var that = this;
					this.newCart = JSON.parse(uni.getStorageSync("cart"))
					this.newCart = this.newCart.filter(v => v.goods_state)
					console.log(this.newCart);
					uni.request({
						url: 'https://appletservice.dyb.yn.cn/api/InsertXqqd',
						// url: 'https://appletservice.dyb.yn.cn/api/InsertXqqd',
						method: 'POST',
						header: {
							"Content-Type": "application/json",
							"X-Ca-Key": "wxe7c826a1a5e00055",
							"X-Service-Method": "InsertXqqd"
						},
						data: {
							"openid": uni.getStorageSync("openid"),
							"lxdh": uni.getStorageSync("lxdh"),
							"mddm": uni.getStorageSync("mdId"),
							"spxx_json": that.newCart

						},
						success: res => {
							uni.setStorageSync("mdId", '')
							uni.showModal({
								title: '提交需求成功！',
								content: '请保持电话畅通，稍后会有客服与您联系！',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										that.removeGoodsByIsCheck(that.datac)
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								},
							});
						},
						fail: res => {
							console.log("出错了")
							console.log(res)
						}
					});

				}
			},
			//延迟n秒后跳转到登录页面
			delayNavigate() {
				this.seconds = 3
				this.showTips(this.seconds)
				this.timer = setInterval(() => {
					this.seconds--
					if (this.seconds <= 0) {
						clearInterval(this.timer)
						uni.navigateTo({
							url: '/pages/login/login',
							// success: () => {
							// 	settlement();
							// }
						})

						return
					}

					this.showTips(this.seconds)
				}, 1000)
			},
			// 展示倒计时的提示消息
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '请授权后再点击下一步！' + n + '秒之后自动跳转到授权页',
					mask: true,
					duration: 1500
				})
			}



		} //method    
	} //data
</script>

<style lang="scss">
	.login {
		width: 512rpx;
		height: 95rpx;
		line-height: 95rpx;
		border-radius: 47.5rpx;
		background: #002bd4;
		opacity: 0.89;
		font-size: 40rpx;
		text-align: center;
		color: #fff;
	}



	.btn {

		width: 100%;
		position: fixed;
		bottom: 0;


	}

	.test {
		box-sizing: border-box;
		height: 100%;
	}

	.tpxq {
		padding-top: 5px;
		width: 100%;
	}

	.table_style {
		width: 90%;

		.text_style {
			color: #000;
		}
	}

	.detail_title {
		background-color: #005BAB;
		color: #ffffff;
		width: 100%;
		height: 30px;
		text-align: center;
		justify-content: center;
	}

	.dfpic {
		image {
			width: 100%;
		}
	}

	.goods_details {
		.tp_hl {
			display: flex;
			color: #bebebe;
			font-size: 15px;
			justify-content: center;
			align-items: center;
			padding: 10px 0;
		}


		.details_title {
			background-color: #1296DB;
			padding-left: 13px;
			padding-top: 6px;
			color: #ffffff;
			// width: 90%;
			height: 35px;
			justify-content: center;
		}
	}

	swiper {
		// padding-top: 25%;
		height: 475rpx;

		image {
			width: 100%;
			height: 100%;
			// height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.goods_detail_bqsm {
			line-height: 50rpx;
			padding-top: 10rpx;

			letter-spacing: 2rpx
		}

		.goods-bq-box {
			display: flex;
			align-items: baseline;
			height: 50rpx;
			padding: rpx 0;
			font-size: 26rpx;

			.space {
				color: #ffffff;
			}

			.goods-bq {
				align-items: left;
				padding: 8rpx 10px 8rpx 10px;
				font-size: 24rpx;
				width: auto;
				color: #ffffff;
				border-radius: 20rpx;
				line-height: 1;
			}

		}


		.space {
			color: #ffffff;
		}

		.price {
			color: #C00000;
			font-size: 14px;
			padding: 6px 4px 0 0;
			display: flex;
			flex-direction: column;

			.price-sm {
				color: black;
				font-size: 12px;
				padding-top: 3px;
			}

		}

		.goods-name {
			font-size: 16px;
			font-weight: bold;
		}

		.goods_detail {
			padding: 2px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;


			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

	}

	.goods_nav {
		position: fixed;
		bottom: -2px;
		left: 0;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 20px;

		.count_js {
			padding-left: 10px;

		}

	}

	.goods-detail-container {
		padding-bottom: 50px;
	}
</style>
