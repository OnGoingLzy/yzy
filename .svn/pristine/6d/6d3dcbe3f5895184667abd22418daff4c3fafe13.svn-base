<template>
	<view>
		<view class="search-order-container"></view>
		<view class="order-container">
			
			<view class="search-container">
				<view class="search-input">
					<view style="height: 100%;width: 40px;text-align: left;margin-left: 10px;display: flex;align-items: center;" >
					<image src="../../static/icon/ss.png" style="width: 22px;height: 22px;"></image>
					</view>
					<input type="text" style="width: 80%;" v-model="searchContent" placeholder="药名名称/药房名称/订单号/状态"  @confirm="searchOrder()"/>
					<view style="height: 100%;width: 40px;text-align: right: ;" >
					<text class="voice-icon" @click="searchContent=''">×</text>
					</view>
				</view>
				<view style="display: flex;align-item:center;width: 10vw;justify-content: center;" @click="searchOrder()">
					<text style="color: white;line-height:31px">搜索</text>
				</view>
			</view>
			
			<view class="choice-bar-container">	
				<view class="choice-bar-item-box" :class="{activeBar : choiceBar === 'test0'}">
					<text ref="text0" @click="selectBar('test0')" :style="{ color: choiceBar === 'test0' ? '#1296DB' : 'black' }" >全部</text>
				</view>	
				<view class="choice-bar-item-box" :class="{activeBar : choiceBar === 'test1'}">
					<text ref="test1" @click="selectBar('test1')" :style="{ color: choiceBar === 'test1' ? '#1296DB' : 'black' }">待付款</text>
				</view>
				
				<view class="choice-bar-item-box" :class="{activeBar : choiceBar === 'test2'}">
					<text ref="text2" @click="selectBar('test2')" :style="{ color: choiceBar === 'test2' ? '#1296DB' : 'black' }">待发货</text>
				</view>
				
				<view class="choice-bar-item-box" :class="{activeBar : choiceBar === 'test3'}">
					<text ref="text3" @click="selectBar('test3')" :style="{ color: choiceBar === 'test3' ? '#1296DB' : 'black' }">待收货</text>
				</view>	
				<view class="choice-bar-item-box" :class="{activeBar : choiceBar === 'test4'}">
					<text ref="text4" @click="selectBar('test4')" :style="{ color: choiceBar === 'test4' ? '#1296DB' : 'black' }">退货/款</text>
				</view>
			</view>
			
			<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21072362" style="width: 100%;height: 131rpx;" @click="toPublicAccount"></image>
		</view>
		 
		<view class="show-container" style="width: 100%;min-height: 100px;margin-top: 170px;;">
			<view v-for="(order,i) in filterOrderList" :key="i">
				<order-card :order="order" @childMethod="getOrderList"></order-card>
			</view>
			<view v-if="filterOrderList.length==0" style="    text-align: center;">
				<image src="../../static/img/empty3.svg" style="width: 50vw;height: 50vw"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	import orderCard from '@/components/order/order_card.vue';
	import request from '@/common/api/request.js'
	export default {
		components:{orderCard},
		data() {
			return {
				choiceBar:"test0",
				orderList:[],
				filterOrderList:[],
				searchContent:'',
				
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option.num); //打印出上个页面传递的参数。
			this.choiceBar = option.num
			this.getOrderList()
		},
		watch:{
			
		},
		onShow() {
			
			
			
		
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.searchOrder()
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
			this.getOrderList()
		},
		methods: {
			toPublicAccount(){
				uni.navigateTo({
					url:'/pages/public_account/public_account'
				})
			},
			searchOrder(){
				uni.showLoading({
					title:"查询中..."
				})
				this.selectBar(this.choiceBar)
				if (this.searchContent === '') {
				        // 如果搜索值为空，则不搜索
				       
				      } else {
				        // 使用 filter() 方法筛选订单列表
				        this.filterOrderList = this.filterOrderList.filter((order) => {
				          // 判断是否满足搜索条件
				          const containsGenericName = order.goodsList.some(
				            (goods) =>
				              goods.genericName &&
				              goods.genericName.includes(this.searchContent)
				          );
				          const containsShopName = order.shopInfo.some(
				            (shop) =>
				              shop.shopName && shop.shopName.includes(this.searchContent)
				          );
						const containsOrderId = order.main_order_id && order.main_order_id.includes(this.searchContent);
						
						const containsStatus= order.status && order.status.includes(this.searchContent);
							
				          // 返回满足条件的订单对象
				          return containsGenericName || containsShopName || containsOrderId || containsStatus;
				        });
				      }  
				uni.hideLoading()
			},
			calcTotalPriceAndNum() {
				// 遍历 orderList 计算 TotalNum 和 TotalPrice，并添加到订单对象上
				if(this.orderList==null||this.orderList.length==0) return
				this.orderList.forEach(order => {
				  let totalNum = 0;
				  let totalPrice = 0;
				
				  order.goodsList.forEach(goods => {
					  
				    totalNum += goods.num;
				    totalPrice += goods.totalPrice;
				  });
				
				  order.totalNum = totalNum;
				  order.totalPrice = totalPrice+order.shippingFee;
				  let originalTotalPrice = order.totalPrice;
				  
				  // 将浮点数转换为字符串
				  let priceString = originalTotalPrice.toString();
				  
				  // 使用正则表达式提取整数位和小数点后两位
				  let match = priceString.match(/^-?\d+(?:\.\d{0,2})?/);
				  
				  // 提取的结果即为整数位和小数点后两位
				  let truncatedPrice = match ? match[0] : "";
				  order.totalPrice = truncatedPrice
				});
			},
			async getOrderList(){
				uni.showLoading({
					title:"查询中"
				})
				const url = '/api/trade/getOrderList';
				const method = 'POST'; 
				const data = {
					openid: uni.getStorageSync("openid"),
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						
						if(response.data.data){
							this.orderList = response.data.data
							this.selectBar(this.choiceBar)
							
							this.calcTotalPriceAndNum()
							uni.hideLoading()
						}else{
							
							uni.hideLoading()
							uni.showToast({
								title:'没查到订单信息',
								icon:'none'
							})
						}
						
					}
					else {
						
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
				}
			},
			selectBar(num){
				uni.showLoading({
					title:"查询中"
				})
				console.log(num)
				this.choiceBar=num
				if(this.orderList==null||this.orderList.length==0) {
					uni.hideLoading()
					return
				}
				// 筛选出 status 为 "未支付" 的订单			
				if(num == "test0"){
					this.filterOrderList = this.orderList 
					
				}else if(num == "test1"){
					const filterOrderList = this.orderList.filter(order => order.status === '待付款');
					// 将筛选结果赋值给 this.filterOrderList（假设在 Vue 组件中使用）
					this.filterOrderList = filterOrderList;
				}else if(num == "test2"){
					const filterOrderList = this.orderList.filter(order => order.status === '待发货');
					// 将筛选结果赋值给 this.filterOrderList（假设在 Vue 组件中使用）
					this.filterOrderList = filterOrderList;
				}else if(num == "test3"){
					const filterOrderList = this.orderList.filter(order => order.status === '待收货');
					// 将筛选结果赋值给 this.filterOrderList（假设在 Vue 组件中使用）
					this.filterOrderList = filterOrderList; 
				}else{
					const filterOrderList = this.orderList.filter(order => order.status === '待退款' || order.status === '已退款' || order.status === '退款中' || order.status === '退款待审核' || order.status === '已取消');
					// 将筛选结果赋值给 this.filterOrderList（假设在 Vue 组件中使用）
					this.filterOrderList = filterOrderList; 
				}
				setTimeout(function (){
					uni.hideLoading()
				},1000)
			}
		},
		
	}
</script>

<style lang="scss">
.activeBar{
	font-size: 18px;
	border-bottom: 4px #1296DB solid;
}
.choice-bar-container{
    display: flex;
    width: 100%;
    overflow: auto;
    background: white;
    padding: 10px 0 0 0;
}
.choice-bar-item-box {
	height: 100%;
	width: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 5px 0;
} 
.order-container{
	position: absolute;
	 top: 0;
	 width: 100%;
}
 .search-input {
     display: flex;
     align-items: center;
     // justify-content: center;
     border-radius: 24px;
     width: 80vw;
	 background: white;
 }
 .search-container{
	 display: flex;
	 padding: 3vw;
	 background: #1296DB;
 }
 .voice-icon{
	 font-family: "Material Icons";
	 font-size: 5vw;
	 color: #9aa0a6;
	 margin-left: 8px;
	 line-height: 31px;
 }
 page{
 	background-color: #ebebeb;
 }
</style>
