<template>
	<view class="goods-item notTheLastOne">
		<!-- 左侧的盒子 -->
		<view class="goods-item-left">
			
			<view class="tpyj" style="position: relative;;">
				<image
					v-if="goods.goodsType!='处方药'" @click="showImg()"
					:src="(imgurl+goods.goodsImg[0].tplszh)=='http://images.yndzyf.com/getimage.ashx?mlszh=undefined'?defaultPic:(imgurl+goods.goodsImg[0].tplszh) || defaultPic"
					class="goods-pic"></image>
					<!-- filter模糊图片 -->
					<!-- 添加一个数字展示的视图 -->
					    <view class="number-badge" v-if="showImgNum=='all' && goods.goodsType!='处方药'">{{ imgNum }}</view>
				<image
					v-if="goods.goodsType=='处方药'"
					style="filter: blur(5px);"
					:src="(imgurl+goods.goodsImg[0].tplszh)=='http://images.yndzyf.com/getimage.ashx?mlszh=undefined'?defaultPic:(imgurl+goods.goodsImg[0].tplszh) || defaultPic"
					class="goods-pic"></image>
				<view v-if="goods.goodsType=='处方药'" style="position: absolute;
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
				  <view class="goods-bq-box" style="    width: 20%;" v-if="goods.goodsType=='处方药'|| goods.goodsType=='非处方药'">
				  	  <view class="goods-bq" v-if="goods.goodsType=='处方药' ">
						  <text v-if="goods.goodsType=='处方药' " style="color: #ec7063;">处方药</text>
						  
					  </view>

					  <view class="goods-bq2"  v-if="goods.goodsType=='非处方药'">
						  <text v-if="goods.goodsType!='处方药' " style="color: #68d568;">OTC</text>
					  </view>  
				  </view>
				  
				  <view class="goods-bq-box" :style="!otherType ? 'width: 75%;' : 'width: 100%;'">
					  <text class="goods-box-name" style="font-size: 17px;font-weight: bold;font-family: monospace;">{{goods.goodsName}} {{goods.genericName}}</text>
				  </view>
					
					<!-- <view class="has-stock-tag" v-if="goods.isReserve === '0'">
						<text>有库存</text>
					</view>
					<view class="is-reserve-tag" v-if="goods.isReserve === '1'">
						<text>可预订</text>
					</view> -->
			  </view>
				<view class="goods-desc">规格：{{goods.specification + '/' +goods.sellUnit}}</view>
				<view class="goods-desc">厂商：{{goods.manufacturer}}</view>
				<view class="goods-desc" v-if="shop">店铺：{{shop.simplifyShopName}}</view>
				<view class="goods-info-box">
					<view v-if="!shop">
						<view class="goods-price" v-if="(goods.minPrice==0 || goods.minPrice=='0.0000' )">
							暂无定价
						</view>
						<view class="goods-price" v-else v-text="goods.minPrice?'￥'+goods.minPrice+'起':''" v-if="shop.price!==0"></view>
					</view>
					
					<view class="goods-price" v-if="shop" v-text="shop.price==0?'详询门店':'￥'+shop.price">￥{{shop.price}}</view>
					
					<view v-if="!shop ">
						<text style="color: #00aa00;font-weight: bold;">{{goods.shopNum}}</text>
						<text v-if="goods.shopNum">家药房在售</text>
					</view>	  
				</view>
			
			  
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goods: {
				// type: Object,
				default: null,
			},
			shop:{
			},
			from:{
				
			},
			showImgNum:{
				
			}
		},
		data() {
			return {
				// 默认的图片
				defaultPic: 'http://images.yndzyf.com/getimage.ashx?mlszh=17700932',
				// defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				imgurl: "http://images.yndzyf.com/getimage.ashx?mlszh=",
				otherType : false,
				imgNum: 1,
			};
		},
		goods: {},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		mounted() {

			if(this.goods.goodsImg === null){
				this.imgNum = 1
			} else {
				this.imgNum = this.goods.goodsImg.length
			}
			
		},
		methods: {
			showImg(){
				let url = []
				if(this.from=='fromSelect' || this.goods.goodsImg === null){
					//来自于搜索页点击图片不显示预览图
					return
				}else{
					var that = this
					if(this.showImgNum!='all'){
						
						url.push((this.imgurl+this.goods.goodsImg[0].tplszh)=='http://images.yndzyf.com/getimage.ashx?mlszh=undefined'?defaultPic:(this.imgurl+this.goods.goodsImg[0].tplszh) || this.defaultPic)
					}else{
						const tplszhArray = this.goods.goodsImg.map(item => this.imgurl+item.tplszh);
						console.log(tplszhArray)
						url = tplszhArray
					}
					// 预览图片
					uni.previewImage({
						urls: url,
						longPressActions: {
							itemList: ['发送给朋友', '保存图片', '收藏'],
							success: function(data) {
								
							},
							fail: function(err) {
								console.log(err.errMsg);
							}
						}
					});
				}
				
			},
			// 监听到了 NumberBox 组件数量变化的事件
			numChangeHandler(val) {
				this.$emit('num-change', {
					spdm: this.goods.spdm,
					goods_count: +val
				})
			},
			
		}
	}
</script>

<style lang="scss">
	.number-badge {
	  position: absolute;
	  bottom: 0px; /* 距离底部的距离 */
	  left: 65px; /* 距离左侧的距离 */
	  // background-color: #626262; /* 背景颜色 */
	  color: white; /* 字体颜色 */
	  padding: 5px 5px; /* 内边距 */
	  border-radius: 10px 0 10px 0; /* 圆角 */
	  height: 10px;
	  text-align: center;
	  width: 10px;
	  line-height: 12px;
	  background-color: rgba(98,98, 98, 0.5); /* 这将创建一个半透明的红色背景 */
	}
	.notTheLastOne {

		border-top: 6px solid rgb(249, 249, 249);
	}
  

	.goods-item {
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
				border-radius: 10px;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
      
		  .goods-bq-box{
			  
			display: inline-grid;
			height: 100%;
			padding: rpx 0;
			font-size: 26rpx;
			align-items: center;  
			.space {
				color: #ffffff;
			}
        
           
        .goods-bq{
			    border: 1px solid #ec7063;
			    color: #ec7063;
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
      }
      
      
      
      
			.goods-desc {
				color: #bebebe;
				font-size: 12px;
				overflow: hidden;
				text-overflow: ellipsis; /* 超出部分省略号 */
				display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 1; /** 显示的行数 **/

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
					color: #c01a04;
					font-size: 15px;
					font-family: fantasy;
				}
       

			}
		}
	}
	
	.goods-box{
		min-height: 40px;
		display: flex;
		align-items: center;
		justify-content: left;
	}
	
	.goods-box-name{
		line-height: normal;
		text-overflow: ellipsis;
		// display: -webkit-box; 
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
