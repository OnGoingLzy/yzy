<template>
	<view class="goods-item notTheLastOne">
		<!-- 左侧的盒子 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#ff4400" v-if="showRadio" @click="radioClickHandler"></radio>
			<!-- <image :src="imgurl+goods.spml_tpxx_lb[0].tplszh || defaultPic" class="goods-pic"></image> -->
			<view class="tpyj">
				<!-- <image :src="imgurl+goods.spml_tpxx_lb[0].tplszh || defaultPic" class="goods-pic"></image> -->
				<image
					:src="(imgurl+goods.tplszh)=='http://images.yndzyf.com/getimage.ashx?mlszh=undefined'?defaultPic:(imgurl+goods.tplszh) || defaultPic"
					class="goods-pic"></image>
			</view>
		</view>
		<!-- 右侧的盒子 -->
		<view class="goods-item-right">
			<!-- 商品的名字 -->
			<view class="goods_box_name">{{goods.pm}}</view>
			<view class="goods-desc">规格：{{goods.spgg}}</view>
			<view class="goods-desc">厂商：{{goods.sccs}}</view>
			<view class="goods-info-box">
				<view class="goods-price space" v-if="goods.xsdjs==='' || goods.xsdjs=='0.0000' "><text
						class="space">a</text></view>
				<view class="goods-price" v-else>金额:￥{{goods.xsdjs}}</view>
				<view class="goods-count">数量: {{goods.xssl}}</view>
			</view>
			<view class="goods-desc">门店：{{goods.mdmc}}</view>
			<view class="goods-desc">下单时间：{{goods.ddsj}}</view>
		</view>
		<!-- <view>门店:{{goods.xsdjs}}</view>
    <view>下单时间:{{goods.xsdjs}}</view> -->

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
				imgurl: "http://images.yndzyf.com/getimage.ashx?mlszh="
			};
		},
		goods: {},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		// onLoad() {
		//   console.log(goods.spml_tpxx_lb[0].tplszh)
		// },
		methods: {
			// 这是 radio 组件的 点击事件处理函数
			radioClickHandler() {
				this.$emit('radio-change', {
					spdm: this.goods.spdm,
					goods_state: !this.goods.goods_state
				})
			},
		}
	}
</script>

<style lang="scss">
	.notTheLastOne {
		// border-bottom: 4px solid rgb(249,249,249);
		border-top: 6px solid rgb(249, 249, 249);
	}


	.goods-item {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;

		.goods-item-left {
			margin-right: 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 85px;
				height: 90px;
				display: block;
				border-radius: 10%;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

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
					padding: 5rpx 10px 5rpx 10px;
					font-size: 24rpx;
					width: auto;
					color: #ffffff;
					border-radius: 20%;
					line-height: 1;
				}
			}




			.goods-desc {
				color: #434343;
				font-size: 12px;
				// height: 2px;
				// justify-content:space-around;

			}

			.goods-name {
				font-size: 14px;
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

				.goods-count {
					color: #C00000;
					font-size: 13px;
					padding-right: 30px;
				}
			}
		}
	}
</style>
