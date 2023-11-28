<template>
	<view class="content">
		<view style="position: fixed;z-index: 9999;top: 0;width: 100%;">
			<view class="search-container">
				<view class="search-input" @click="toNewSearch()">
				  <input type="text" class="search-text"  disabled="true" placeholder="药名、品牌、厂家、症状"/>
				  <view style="height: 100%;width: 40px;text-align: center;" >
					  <text class="voice-icon" style="    line-height: 30px;">×</text>
				  </view>
				  <view>
				  <button  @tap="toNewSearch()" style="height: 30px; max-width: 20vw; border-radius: 30px; background-color: #409EFF; color: #fff; font-size: 14px;display: flex;justify-content: center;">
				    <text style="line-height: 30px;">搜索</text>
				  </button>
				  </view>
				  
				</view>
			</view>
			
			<view class="choice-bar-container">
				<view class="choice-bar-item-box"  @click="selectBar('test1')">
					<text ref="text1"  :style="{ color: choiceBar === 'test1' ? '#1296DB' : 'black' }" >商品</text>
				</view>	
				<view class="choice-bar-item-box"  @click="selectBar('test2')">
					<text ref="text2"  :style="{ color: choiceBar === 'test2' ? '#1296DB' : 'black' }">详情</text>
				</view>	
			</view>
		</view>
		
		
		<view class="goods-img-container">
			<view class="goods-img-swiper">
				<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="4000" :duration="1000" :circular="true">
					<swiper-item v-for="(item, i) in goods.goodsImg" :key="i" >
						<image style="height: 100%;width: 100%;" @click="showImg((imgurl+item.tplszh)=='http://images.yndzyf.com/getimage.ashx?mlszh=undefined'?defaultPic:(imgurl+item.tplszh))"
							:src="(imgurl+item.tplszh)=='http://images.yndzyf.com/getimage.ashx?mlszh=undefined'?defaultPic:(imgurl+item.tplszh)"
							@error="() => handleImageError(i)"></image>
					</swiper-item>
					
					
				</swiper>
			</view>
		</view>
		
		<view class="goods-detail-container">
			<!-- <view class="goods-price">
				<text v-text="'¥'+shop.price"></text>
			</view> -->
			<view class="goods-name-container">
				<view class="goods-tag-box">
					  <view class="goods-bq" v-if="goods.goodsType=='处方药' " style="color: #ec7063;">处方药</view>
					  
					  <view class="goods-bq2" v-if="goods.goodsType=='非处方药' " style="color: #68d568;">OTC</view>  
				</view>
				<view class="goods-name">
					<text v-text="goods.goodsName+' '"></text>
					<text v-text="goods.genericName+' '"></text>
					<text v-text="goods.manufacturer+' '"></text>
				</view>
			</view>
			<view>
				<text style="color: #bfbfbf;font-size: 14px;" v-if="goods.goodsType=='处方药' ">处方药需凭处方在药师指导下购买和使用</text>
			</view>
			
			<view  style="margin-top: 15px;background: #f5f5f5;border-radius: 15px;" v-if="goods.goodsType!='处方药' " @click="indicationShow=!indicationShow">
				<view class="goods-info">
					<!-- 暂时不显示适应症 -->
					<!-- <view class="goods-info-box" :style="goods.indication?'width: 70%;border-right: #b7b7b7 1px solid;':'width: 50%;border-right: #b7b7b7 1px solid;'">
						<view>
							<text style="font-weight: bold;font-size: 14px;">适应症</text>
						</view>
						<view style="display: flex; ">
							<text style="color:#a7a7a7;" class="goods-info-text" :style="indicationShow?'-webkit-line-clamp:10':'2'" v-text="goods.indication?'适应症:' + goods.indication:'详见说明书'"></text>
						</view>
					</view>
					<view class="goods-info-box" :style="goods.indication?'width: 30%;':'width: 50%;'">
						<view>
							<text style="font-weight: bold;font-size: 14px;">用法用量</text>
						</view>
						<view style="display: flex; ">
							<text style="color:#a7a7a7;" class="goods-info-text">详见说明书</text>
						</view>
					</view> -->
					
					<view class="goods-info-box" style="width: 50%;border-right: #b7b7b7 1px solid;">
						<view>
							<text style="font-weight: bold;font-size: 14px;">适应症</text>
						</view>
						<view style="display: flex; ">
							<text style="color:#a7a7a7;" class="goods-info-text" >详见说明书</text>
						</view>
					</view>
					<view class="goods-info-box" style="width: 50%;">
						<view>
							<text style="font-weight: bold;font-size: 14px;">用法用量</text>
						</view>
						<view style="display: flex; ">
							<text style="color:#a7a7a7;" class="goods-info-text">详见说明书</text>
						</view>
					</view>
					
				</view>
				<view style="text-align: center;">
					<text style="color: gray;">点击查看详情</text>
				</view>
			</view>
			
		</view>
		
		<view class="goods-detail-container" style="margin-top: 10px;">
			<view class="line">
				<view style="display:flex;justify-content:center;align-items:center;">
					<text style="width: 50px;color: #909090;font-size: 15px;">库存</text>
				</view>
				<view style="padding-left: 12px;">
					<text  style="font-size: 15px;">请前往购买页查看</text>
				</view>
			</view>
			
			<view class="line" style="margin-bottom: 0px;width: 100%;">
				<view style="display:flex;justify-content:center;align-items:center;">
					<text style="width: 50px;color: #909090;font-size: 15px;">送至</text>
				</view>
				<view style="padding-left: 12px;width: 80%;" >
					<text style="font-size: 15px;"  v-text="goods.address" ></text>
				</view>
				<!-- <view style="padding-left: 12px;width: 80%;" @click="toAddUserAddress" v-if="addressList==null">
					<text style="font-size: 15px;">请添加收货地址</text>
				</view>
				<view style="width: 20%;justify-content: flex-end;display: flex;padding-right: 11px;">
					<uni-icons type="forward" @click="toAddUserAddress"></uni-icons>
				</view> -->
			</view>
			
			<view class="line" style="margin: auto;">
				<view style="display: flex;justify-content: center;">
					<text style="width: 50px;padding-top:12px;color:#909090;font-size: 15px;">参数</text>
				</view>
				<view style="width: 100%;">
					<uni-collapse ref="collapse" style="width: 100%;background: white;" >
						<uni-collapse-item :title="'批 准 文 号：'+ goods.approvalNumber" style="background: white;padding:12px 0 12px 0" :open="true">
							<view style="padding: 0 12px 12px 12px;">
								<text decode="true" style="font-size: 14px;" v-text="'生 产 企 业：'+goods.manufacturer"></text>
							</view>
							<view style="padding: 0 12px 12px 12px;">
								<text decode="true" style="font-size: 14px;" v-text="'规&ensp;&emsp;&ensp;&emsp;格：'+goods.specification+ '/' +goods.sellUnit"></text>
							</view>
							<view style="padding: 0 12px 12px 12px;">
								<text decode="true" style="font-size: 14px;" v-text="'剂&ensp;&emsp;&ensp;&emsp;型：'+goods.form"></text>
							</view>
							<view style="padding: 0 12px 12px 12px;">
								<text decode="true" style="font-size: 14px;" v-text="'单&ensp;&emsp;&ensp;&emsp;位：'+goods.sellUnit"></text>
							</view>
						</uni-collapse-item>
					
					</uni-collapse>
				</view>
			</view>
		</view>
		
		<view class="goods-detail-container2" style="margin-top: 10px;padding-bottom:60px;" ref="goodsDetail">
			<view style="font-size: 16px;font-weight:bold">商品详情</view>
			<view style="    padding: 5px;margin: 10px;background: #f4f4f4;line-height: 15px;">
				<text style="color: #8f8f8f;font-size:13px">温馨提醒:图片为实物拍摄,可能出现新旧包装更换或者图片展示效期和实物效期不一致,请以收到实物为准。</text>
			</view>
			<view v-for="(item,i) in goods.goodsImg" :key="i" class="goods-img-box" >
				<image mode="widthFix" class="goods-img" :src="imgurl+item.tplszh" @error="() => handleImageError(i)" @click="showImg(imgurl+item.tplszh)"></image>
			</view>
			<view style="font-size: 16px;font-weight:bold">退换货标准</view>
			<view style="padding: 5px;">
				
				
				<view class="text-box">
					<view style="font-size: 15px;font-weight:bold">特殊说明</view>
					<view style="color: #8f8f8f;" v-if="theGoodsType=='药品'">
						<text>因药品是特殊商品，依据中华人民共和国《药品经营质量管理规范》及其实施细则(GSP)、《互联网药品交易服务审批暂行规定》等法律、法规的相关规定:药品一经售出，无质量问题，不退不换。</text>
					</view>
					<view style="color: #8f8f8f;" v-if="theGoodsType=='器械'">
						<text>因医疗器械是特殊商品，依据中华人民共和国《药品经营质量管理规范》及其实施细则(GSP)、《互联网药品交易服务审批暂行规定》等法律、法规的相关规定:药品一经售出，无质量问题，不退不换。</text>
					</view>
				</view>
				
			</view>
		</view>
		
		<view style="position: fixed;bottom: 0px;width: 100%;background: white;">
			<view class="button"  @click="toGoodsSellShop" style="margin-bottom: 15px;">
				<text style="color: white; font-size: 20px;font-weight: bold;" >去购药</text>
			</view>
		</view>
	
	</view>
</template>

<script>
	import goodsCard from '@/components/goods/goods_card.vue';
	import request from '@/common/api/request.js'
	import orderPopup from '@/components/order/order_popup.vue'
	export default {
		components:{goodsCard,orderPopup},
		data() {
			return {
				indicationShow:false,
				addressList:[],
				goods:{},
				shop:{},
				choiceBar:'test1',
				imgurl: "http://images.yndzyf.com/getimage.ashx?mlszh=",
				defaultPic: '/static/icon/shop.svg',
				errorImage: '/static/icon/errorImg.svg',
				indication:'',//适应症,
				UsageAndDosage:'',//用法及用量
				currentIndex: 0,
				shoppingCart:[],
				
			}
		},
		computed:{
			theGoodsType(){
				if (this.goods && this.goods.goodsType) {
				    if (this.goods.goodsType.includes('药')) return '药品';
				    if (this.goods.goodsType.includes('械')) return '器械';
				  }
			}
		},
		
		onLoad: function (option) {
			//解析传过来的对象
			this.goods = JSON.parse(decodeURIComponent(option.goods));
			console.log(this.goods)
		},
		onShow() {
			this.getAddressList()
		},
		methods: {
			toGoodsSellShop(){
				uni.navigateTo({
					url:"/pages/shops_selling_This_goods/shops_selling_This_goods?goods="+encodeURIComponent(JSON.stringify(this.goods))
					//传对象参数给这个页面需要使用这个方法
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
			toAddUserAddress(){
				uni.navigateTo({
					url:'/pages/user-add-path/addPath'
				})
			},
			showNextAddress() {
			      this.currentIndex = (this.currentIndex + 1) % this.addressList.length;
			    },
			//获取用户的地址信息
			async getAddressList() {
				const url = '/api/user/getAddressList';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid")
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						this.addressList = response.data.data;
						console.log(this.list);
					} else {
						console.log("-99" + response.result);
					}
				} catch (error) {
					console.log(error);
				}
			},

			toAuthorizePhone() {
				uni.navigateTo({
					url: '/pages/login/login'
					
				})
			},	
			selectBar(val){
				this.choiceBar = val
				if(val=='test2'){
					this.scrollToTarget('2')
				}else{
					this.scrollToTarget('1')
				}
			},
			toNewSearch(){
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			handleImageError(index) {
			  // 图片加载失败时，将图片路径替换为对应的默认图片路径
			  console.log("图片加载失败")
			  this.goods.goodsImg[index].tplszh = this.errorImage;
			},
			scrollToTarget(to) {
				//pageScrollTo 方法滚动到目标元素的位置
				if(to=='2'){
					uni.pageScrollTo({
						selector: ".goods-detail-container2", // 将目标元素的选择器传递给 selector 属性
						duration: 300, // 滚动动画的时长，单位为 ms
					});
				}else{
					uni.pageScrollTo({
						selector: ".content", // 将目标元素的选择器传递给 selector 属性
						duration: 300, // 滚动动画的时长，单位为 ms
					});
				}
				
			},
		}
	}
</script>

<style lang="scss">
page{
	background: #f5f5f5;
}
.button{
	width: 96vw;
	
	margin: 0 2vw;
	border-radius: 50px;
	background: #1296DB;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #78ffd6, #1296DB);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #78ffd6, #1296DB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	text-align: center;
	align-items: center;
}
.goods-img-box{
	 padding: 4vw;
	 display: flex;
	 justify-content: center;
}
.goods-img{
	width: 85vw;
	height: 85vw;
}
.text-box{
	text{
		font-size: 14px;
	}
}
.goods-carts {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	position: fixed;
	left: 0;
	right: 0;
	/* #ifdef H5 */
	left: var(--window-left);
	right: var(--window-right);
	/* #endif */
	bottom: 0;
}
.goods-info-text{
	margin: auto;
	font-size: 13px;
	overflow: hidden;
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 2; /** 显示的行数 **/
	line-height: 20px;
}
.shop-image{
	width: 64px;
	height: 64px;
	display: block;
	border-radius: 10%;
}
.shop-container{
	display: flex;
	margin-top: 10px;
	padding-bottom: 120px;
	padding: 2vw;
	width: 96vw;
    min-height: 50px;
	background: #ffffff;
}	
.content{
	min-height: 120vh;
	margin-bottom: 40px;
}	
.line{
	display: flex;
	margin: 10px 0;
}	
.goods-info{
	
	background: #f5f5f5;
	
	border-radius: 15px;
	display: flex;
	.goods-info-box{
		text-align: center;
		padding: 0 10px 10px 10px ;
		margin-top: 10px;

	}
}	
.goods-name-container{
	 display: flex;
	 justify-content: left;
}	
.goods-name{
	font-size: 18px;
	font-family: monospace;
	font-weight: bold;
	max-width: 80vw;
	line-height: normal;
}	
.goods-tag-box{
	display: inline-grid;
    height: auto;
    padding: rpx 0;
	align-items: center;
	text-align: center;
	
	.space {
		color: #ffffff;
		}
	
}
.goods-tag{
	    text-align: center;
	    align-items: left;
	    padding: 5rpx 5px 5rpx 5px;
	    font-size: 24rpx;
	    width: auto;
	    color: #ffffff;
	    border-radius: 5px;
	    line-height: 1;
}	
.goods-bq{
			    border: 1px solid #ec7063;  
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
.goods-price {
	color: #bc1903;
	font-size: 18px;
	font-family: fantasy;
	padding: 5px 0;

}	
.goods-detail-container{
	background: #ffffff;
	padding: 2vw;
	border-radius: 15px;
	width: 96vw;
}	
.goods-detail-container2{
	background: #ffffff;
	padding: 2vw;
	border-radius: 15px;
	width: 96vw;
}	
.goods-img-container{
	margin-top: 80px;
}
.swiper{
	height: 40vh;
}	
.choice-bar-container{
	 width: 100%;
	 background: #1296DB;
	display: flex;
	overflow : auto;
	background: white;
}
.choice-bar-item-box {
	height: 100%;
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 5px 0;
} 	

 .search-container{
 	 background: #ffffff;
 	width: 98vw;
 	display: flex;
 	padding: 1vw;
 	 justify-content: center;
 	 background: #1296DB;
  } 
/* search input */
.search-input {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  background: #ffffff;
	  /* border: 1px solid #0045cf; */
	  border-radius: 24px;
		padding: 2px 2px 2px 2vw;
	    width: 93vw;
	  height: 30px;	
	}
	.search-text {
	  flex: 1;
	  border: none;
	  outline: none;
	  font-size: 4vw;
	  color: #1a1a1a;
	}
</style>
