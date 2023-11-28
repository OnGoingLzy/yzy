<template>
	<view class="goods-item notTheLastOne">
		<!-- 左侧的盒子 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#ff4400" v-if="showRadio" @click="radioClickHandler"></radio>
			<!-- <image :src="imgurl+goods.spml_tpxx_lb[0].tplszh || defaultPic" class="goods-pic"></image> -->
			<view class="tpyj" style="position: relative;">
				<!-- <image :src="imgurl+goods.spml_tpxx_lb[0].tplszh || defaultPic" class="goods-pic"></image> -->
				<image
					v-if="goods.tssm1!='处方药,请凭正规医院处方购买!'"
					:src="(imgurl+goods.spml_tpxx_lb[0].tplszh)=='http://images.yndzyf.com/getimage.ashx?mlszh=undefined'?defaultPic:(imgurl+goods.spml_tpxx_lb[0].tplszh) || defaultPic"
					class="goods-pic"></image>
				<image
					v-if="goods.tssm1=='处方药,请凭正规医院处方购买!'"
					style="filter: blur(5px);"
					:src="(imgurl+goods.spml_tpxx_lb[0].tplszh)=='http://images.yndzyf.com/getimage.ashx?mlszh=undefined'?defaultPic:(imgurl+goods.spml_tpxx_lb[0].tplszh) || defaultPic"
					class="goods-pic"></image>	
				<view v-if="goods.tssm1=='处方药,请凭正规医院处方购买!'" style="position: absolute;
														top: 50%;
														text-align: center;
														transform: translate(-50%, -50%);
														left: 50%;line-height: 9px;"
														>
					<text style="font-size: 8px;">处方药,开方后可查看详细信息</text>
				</view>			
					
			</view>
		</view>
		<!-- 右侧的盒子 -->
		<view class="goods-item-right">
			<!-- 商品的名字 -->		
      <view class="goods-box">
			<text class="goods-box-name">{{goods.pm}}</text>
			<view class="has-stock-tag" v-if="goods.isReserve === '0'">
				<text>有库存</text>
			</view>
			<view class="is-reserve-tag" v-if="goods.isReserve === '1'">
				<text>可预订</text>
			</view>
	  </view>
			<view class="goods-desc">规格：{{goods.spgg}}</view>
			<view class="goods-desc">厂商：{{goods.sccs}}</view>
			<view class="goods-info-box">
				<view class="goods-price space" v-if="goods.dqlsj==='' || goods.dqlsj=='0.0000' "><text
						class="space">a</text></view>
				<view class="goods-price" v-else>参考价:￥{{goods.xsdjs}}</view>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"
					class="aaaa"></uni-number-box>        
			</view>
			
      <view class="goods-bq-box">
	  <view class="goods-bq":style="{'background':'#55aaff'}" v-if="goods.tssm1=='处方药,请凭正规医院处方购买!' ">处方药</view>
	  <text
	  		class="space">a</text>
      <view class="goods-bq":style="{'background':'#E93423'}" v-if="goods.cfyzj!=='' ">针剂处方</view>
      <text
      		class="space">a</text>
      <view class="goods-bq":style="{'background':'#439143'}" v-if="goods.std!=='' ">国谈药</view>
     <text
     		class="space">a</text>
     <view class="goods-bq":style="{'background':'#ebc726'}" v-if="goods.tgy!=='' ">含特殊成分复方制剂</view>  
      </view>
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
			gotoDetail(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?spdm=' + goods.spdm
				})
			},
			// 监听到了 NumberBox 组件数量变化的事件
			numChangeHandler(val) {
				this.$emit('num-change', {
					spdm: this.goods.spdm,
					goods_count: +val
				})
			}
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
      
      .goods-bq-box{
        display: flex;
        align-items: baseline;
        height: 50rpx;
        padding: rpx 0;
        font-size: 26rpx;
          
        .space {
        	color: #ffffff;
        }
        
           
        .goods-bq{
            align-items:left;
            padding: 8rpx 10px 8rpx 10px;
            font-size: 24rpx;
            width: auto;
            color: #ffffff;
            border-radius: 20rpx;
            line-height: 1;          
          }
      }
      
      
      
      
			.goods-desc {
				color: #bebebe;
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
       

			}
		}
	}
	
	.goods-box{
		display: flex;
		align-items: center;
	}
	
	.goods-box-name{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient:vertical;
		word-break: break-all;
		padding-right: 5px;
	}
	
	.has-stock-tag{
		border-radius: 4px;
		border: 1px solid rgb(52, 152, 219);
		font-size: 10px;
		color: rgb(52, 152, 219);
		text-align: center;
		justify-content: center;
		align-items: center;
		display: flex;
		padding: 1px 2px;
		white-space: nowrap;
	}
	
	.is-reserve-tag{
		border-radius: 4px;
		border: 1px solid rgb(236, 112, 99);
		font-size: 10px;
		color: rgb(236, 112, 99);
		text-align: center;
		justify-content: center;
		align-items: center;
		display: flex;
		padding: 1px 2px;
		white-space: nowrap;
	}
	
	
	
</style>
