<template>
	<view class="goods-item">
		<!-- 左侧的盒子  图片 -->
		<view class="goods-item-left">
			<view class="tpyj">
				<image :src="imgurl+goods.mdtp || defaultPic" class="goods-pic"></image>
			</view>
		</view>
		<!-- 右侧的盒子 -->
		<view class="goods-item-right">

			<!-- 商品详情 -->
			<view class="goods-name">{{goods.mdmc}}</view>
			<view class="goods-desc">地址：{{goods.shdz}}</view>
			<view class="goods-phone" v-if="goods.mdlxdh"><text @click="telFun(goods.mdlxdh)"
					@click.stop=''>电话：</text><text class="goods-phone1" @click="telFun(goods.mdlxdh)"
					@click.stop=''>{{goods.mdlxdh}}</text></view>
			<view class="goods-desc">营业时间：{{goods.yysj}}</view>
			<view class="goods-sm1">
				<text class="goods-sm1-jgsm">零售价:</text>
				<text class="goods-sm1-jg" v-text="goods.xsdjs === '暂无定价详询门店' ? '详询门店': goods.xsdjs"></text>
				<text class="goods-sm1-kcsm">库存:</text>
				<view class="goods-sm1-kc">{{goods.kc}}</view>
			</view>
			<view class="favi">
				<uni-icons type="map-pin-ellipse" size="25" color="#07aefc"></uni-icons>
				<view class="wrap_tag" :style="{'background':'#07aefc'}">
					<text class="goods-dst">
						距离:{{goods.jl}}
					</text>
				</view>
				<text class="space">aaaaaa</text>
				<view class="wrap_tag2">
					<text class="goods-dst">
						{{goods.kcsm}}
					</text>
				</view>



				<!-- <view class="goods-kc_y" v-show="goods.kcsm=='有现货'">{{goods.kcsm}}</view>
              <view class="goods-kc_n" v-show="goods.kcsm!=='有现货'">{{goods.kcsm}}</view>
              </view> -->

			</view>
			<!-- <view class="sm2" v-show="goods.kcsm==='提交需求'">提前电联保留库存</view>
			<view class="sm2" v-show="goods.kcsm==='点击预定'">1到2个工作日后到货</view> -->
			<!-- <text class="xsdjs">门店零售价:￥{{goods.xsdjs}}</text> -->

			<!--  <view class="goods-kc_y" v-show="goods.kcsm=='有现货'">{{goods.kcsm}}</view> 
     <view class="goods-kc_n" v-show="goods.kcsm!=='有现货'">{{goods.kcsm}}</view> -->


		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				// 默认情况下，不会展示 radio 组件
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 默认的图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',

				imgurl: "http://images.yndzyf.com/getimage.ashx?mlszh=",

				from: uni.getStorageSync("wd") + ',' + uni.getStorageSync("jd")
			};
		},
		methods: {
			telFun(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //电话号码
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		height: 200px;
		width: 600rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 10px;
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
			line-height: 20rpx;

			.goods-desc {
				color: #666666;
				font-size: 13px;
				line-height: 1.5;
				padding-right: 20rpx;
			}

			.xsdjs {
				color: #C00000;
				font-size: 15px;
				//padding-top: 10px;
			}

			.goods-sm1 {
				display: flex;
				flex-direction: row;
				width: auto;

				.goods-sm1-jgsm {
					color: #666666;
					font-size: 13px;
					width: 80px;
					text-align: left;
					line-height: 1.5;
					white-space: nowrap;
				}

				.goods-sm1-kcsm {
					color: #666666;
					font-size: 13px;
					width: 60px;
					text-align: left;
					line-height: 1.5;
					white-space: nowrap;
					padding-left: 30px;
				}

				.goods-sm1-jg {
					color: #C00000;
					font-size: 13px;
					width: 45%;
					text-align: left;
					line-height: 1.5;
					padding-left: 10rpx;
				}

				.goods-sm1-kc {
					color: #117fde;
					font-size: 13px;
					width: 40%;
					line-height: 1.5;
					padding-right: 5px;
				}

				.space {
					color: #ffffff;
				}

			}

			.favi {
				display: flex;
				flex-direction: row;
				align-items: center;
				//padding-top: 10px;
				//justify-content: left;
				//align-items: center;
				//border-left: 1px solid #efefef;

				.wrap_tag {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 110px;
					height: 60rpx;
					border-radius: 10rpx;
					font-size: 12px;
					lines: 1;

					.goods-dst {
						width: auto;
						align-items: center;
						justify-content: center;
						font-size: 14px;
						line-height: 1.5;
						lines: 1;
						letter-spacing: 0 rpx;
						color: #edf7fc;
					}

				}

				.wrap_tag2 {
					height: 60rpx;
					width: 90px;
					border-radius: 10rpx;
					font-size: 16px;
					background-color: #D45146;
					text-align: center;
					lines: 1;
					margin-left: -35px;

					.goods-dst {

						text-align: center;
						font-size: 14px;
						line-height: 1.5;
						lines: 1;
						letter-spacing: 0rpx;
						color: #edf7fc;

					}


				}








				.space {
					color: #ffffff;
				}
			}

			.sm2 {
				text-align: right;
				color: #666666;
				font-size: 10px;
				padding-right: 10px;

			}

			.goods-name {
				font-size: 14px;
				lines: 1;
				line-height: 1;
			}

			.goods-phone {
				// text-decoration: underline;
				font-size: 14px;
				color: #117fde;
			}

			.goods-phone1 {
				text-decoration: underline;
				font-size: 14px;
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
</style>
