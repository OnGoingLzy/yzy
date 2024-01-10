<template>
	<view class="confirm-order">
		<view class="address-card card-shadow" @click="showAddFrame()">
			<view class="address-info">
				<view class="address-details">
					{{ selectedAddress.city }}
				</view>
				<view class="address-details-road">{{ selectedAddress.address }}</view>
				<view class="address-name-phone">
					<view class="address-name">{{ selectedAddress.name }}</view>
					<view class="address-phone">{{ selectedAddress.phone }}</view>
				</view>
			</view>
			<view>
				<image class="more-location-icon" src="../../static/icon/more_person.svg"></image>
			</view>
		</view>
		<view class="order-list card-shadow">
			<view class="order-item" v-for="items in shops" :key="items.id">
				<view class="item-list">
					<view class="shop-title" @click="goToShop(items)">
						<image src="/static/tabbar/home-active.png" style="width: 16px;height: 16px;"></image>
						<view class="shop-name">{{ items.simplifyShopName }}</view>
					</view>
					<view class="item" v-for="item in items.drugs" :key="item.id">
						<view class="item-info">
							<image
								@click="showImg(item.imgLszh ? 'http://images.yndzyf.com/getimage.ashx?mlszh=' + item.imgLszh : defaultPic)"
								:src="item.imgLszh ? 'http://images.yndzyf.com/getimage.ashx?mlszh=' + item.imgLszh : defaultPic"
								mode="">
							</image>
							<view class="item-details">
								<view class="item-name">{{ item.drugName }}</view>
								<view class="item-spec">{{ item.specification +'/'+item.sellUnit}}</view>
								<!-- <view class="item-spec">{{ item.specification }}</view> -->
								<view class="item-manu">{{ item.manufacturer }}</view>
							</view>
							<view class="item-detail-right">
								<view class="item-quantity">x{{ item.num }}</view>
								<view class="item-price" >
									<text v-text="item.price==0?'详询门店':'￥'+item.price"></text>
								</view>
								
							</view>
						</view>
					</view>
					<view class="form-container">
						<view class="form-item">
							<view class="label">
								<text class="label-word">商品数量：</text>
							</view>
							<view class="value">{{'共 ' + totalNum + ' 件'}}</view>
						</view>
						<view class="line"></view>
					</view>
				</view>
			</view>
		</view>
		

		<view class="memo-card card-shadow">
			<view class="uni-title uni-common-pl memo">订单备注：</view>
			<view class="uni-textarea">
				<textarea @blur="bindTextAreaBlur" placeholder="请在此处填写订单备注信息(选填)" />
			</view>
		</view>
		
		<view class="tabbar">

			<view class="tabbar-commit">
				<view class="total-item">
					<!-- <view class="total-price">总计：</view>
					<text class="total-price-num">￥{{Number(totalPrice).toFixed(2)}}</text> -->
				</view>
				<!-- <view class="submit-btn" @tap="submitOrder" :disabled="!validSubmit">提交订单</view> -->
				<button class="submit-btn" @tap="submitOrder" :disabled="!validSubmit">提交需求</button>
			</view>
		</view>
		
		
		
		<!-- 用户地址选择的弹出层 -->
		<uni-popup ref="popup" type="center" :mask-click="isEnableClick" :animation="true">
			<selectUserLocation @fatherMethod="fatherMethods" ref="child"></selectUserLocation>
		</uni-popup>
		
		
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
	import requestZhyf from '@/common/api/requestZhyf.js'
	import selectUserLocation from '@/components/user/select_user_location.vue'
	export default {
		
		data() {
			return {
				validSubmit:true,//是否有效提交按钮
				selectedAddress: {
					name: '',
					phone: '',
					province: '',
					city: '',
					district: '',
					address: '请点击此处选择收货地址',
					totalPrice: 0, // 总价
				},
				shops: [],
				totalNum: 0,
				totalPrice: 0, // 总价
				note:"",
			}
		},
		onShow() {
			this.getAddressList()
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.drug));
			console.log(item);
			this.shops = item;
			this.calcTotalPrice()
			
		},
		methods: {
			bindTextAreaBlur: function(e) {
				this.note = e.detail.value;
				console.log(e.detail.value);
			},
			calcTotalPrice() {
				//总价
				const drugsWithTotal = this.shops.map(shop => ({
					...shop,
					drugs: shop.drugs.map(drug => ({
						...drug,
						total: drug.num * drug.price
					}))
				}))
				const shopsWithTotal = drugsWithTotal.map(shop => ({
					...shop,
					total: shop.drugs.reduce((acc, drug) => acc + drug.total, 0)
				}));
				const total = shopsWithTotal.reduce((acc, shop) => acc + shop.total, 0);
			
				//商品总数量
				const drugs = this.shops.flatMap(shop =>
					shop.drugs.map(drug => drug.num)
				);
			
				const totalNum = drugs.reduce((a, b) => a + b, 0);
				
				//2023-09-06
				//前端浮点型计算例子
				let originalTotalPrice = total ;
				// 将浮点数转换为字符串
				let priceString = originalTotalPrice.toString();
				// 使用正则表达式提取整数位和小数点后两位
				let match = priceString.match(/^-?\d+(?:\.\d{0,2})?/);
				// 提取的结果即为整数位和小数点后两位
				let truncatedPrice = match ? match[0] : "";
				this.totalPrice = truncatedPrice;
				
				this.totalNum = totalNum;
			},
			async submitOrder() {
				this.validSubmit=false
				uni.showLoading({
					title: "请稍等...",
					mask: false
				});
				var goods = this.shops[0].drugs[0]
				const data = {
					spxx_json:{
						spdm: goods.drugId,
						xssl: goods.num,
						xsdjs: goods.price,
					},
					openid: uni.getStorageSync("openid"),
					"lxdh": uni.getStorageSync("phone"),
					"mddm": this.shops[0].shopId,
					"count":  goods.num,
					"note": this.note,
					shdz:this.selectedAddress.city + ';'+ this.selectedAddress.address
				}
				
				const url = '/api/shop/InsertXqqd';
				const method = 'POST';
				
				try {
					const res = await request('yzy_app', url, method, data);
					console.log(res); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (res.data.result == -99) {
						uni.showModal({
							title: '提交需求失败！',
							content: res.data.sm,
							showCancel: false,
							success: function(res) {},
						});
					} else {
						uni.showModal({
							title: '提交需求成功！',
							content: "提交需求成功!您的需求我们已经收到，门店已经为您配药，稍后会电话联系您，感谢您的使用!",
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
					uni.hideLoading()
					
				} catch (error) {
					console.log(error);
					uni.hideLoading()
				}
				
			},
			showAddFrame() {
				this.$refs.popup.open('center');
			},
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
						console.log("99" + response.result);
						this.selectedAddress = response.data.data[0];
						this.selectedAddress.phone = response.data.data[0].tel;
						this.selectedAddress.address = response.data.data[0].details;
						console.log(this.selectedAddress);
					} else {
						console.log("-99" + response.result);
					}
				} catch (error) {
					console.log(error);
				}
			},
		}
	}
</script>

<style>
	.star-sign {
		color: red;
		padding-right: 10rpx;
	}
	.person-item {
		width: 25%;
		background-color: #F9F9F9;
		padding: 6rpx 30rpx 6rpx 12rpx;
		margin: 24rpx 12rpx 12rpx 8rpx;
		border-radius: 12rpx;
		border: #FFFFFF solid 4rpx;
		color: gray;
	}
	
	.person-name {
		font-weight: bold;
		font-size: 30rpx;
	}
	
	.person-row {
		flex-wrap: wrap;
	}
	.more-person-icon {
		width: 20rpx;
		height: 20rpx;
	}
	
	.select-person-title,
	.disease-list-title {
		display: flex;
		font-size: 36rpx;
		align-items: center;
	}
	.persong-item-selected {
		background-color: #1296DB;
		width: 25%;
		padding: 6rpx 30rpx 6rpx 12rpx;
		margin: 24rpx 12rpx 12rpx 8rpx;
		border-radius: 12rpx;
		border: #1296DB solid 4rpx;
		color: white;
	}
	.person-age {
			padding-left: 20rpx;
		}
	.more-person {
		display: flex;
		align-items: center;
		margin-left: auto;
	}
	
	.select-person-firstline {
		display: flex;
		align-items: center;
	}
	
	.select-person,
	.disease-list {
		background-color: #FFFFFF;
		border-radius: 24rpx;
		padding: 24rpx 24rpx;
		margin: 36rpx 24rpx 24rpx;
	}
	
	.more-person-icon {
		padding: 0 10rpx;
	}
	.yb-tag{
		    max-width: 69px;
		    line-height: 24rpx;
		    padding: 1px 3px;
		    border: #0aa71a solid 1px;
		    border-radius: 7px;
		    text-align: center;
		    align-items: center;
		    justify-content: center;
		    display: flex;
		    background: #0aa71a;
		    color: white;
		    font-size: 24rpx;
	}
	.form-container-shipping {
		padding: 10rpx 20rpx 0 20rpx;
	}
	
	.form-container {
		padding: 20rpx;
	}

	.form-item {
		display: flex;
		align-items: center;
		margin-bottom: 10upx;
		justify-content: space-between;
		padding: 0 20rpx;
	}
	
	.form-item-caution{
		display: flex;
		align-items: center;
		justify-content: center;
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
		margin: 10upx 0;
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
		font-size: 32rpx;
		font-weight: 800;
		margin-bottom: 10rpx;
		padding-top: 10rpx;
		padding-left: 6rpx;
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
		    max-width: 55%;
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
	}
	
	.item-manu{
		font-size: 24rpx;
		color: #999;
		margin-bottom: 10rpx;
	}

	.item-price {
		font-size: 28rpx;
		color: #f00;
	}

	.item-quantity {
		font-size: 28rpx;
		color: #999;
		font-weight: bold;
		padding-left: 6rpx;
	}

	image {
		width: 120rpx;
		height: 120rpx;
	}

	.item-detail-right {
		display: flex;
		flex-direction: column;
		justify-items: right;
		width: 140rpx;
		justify-content: center;
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
		z-index: 10;
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
		margin-left: -10rpx;
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
		color: #ffffff;
	}

	.item-main {
		display: flex;
		align-items: center;
	}

	/* .active {
		padding: 0 3rpx;
		border: 1px solid #1296DB;
		color: #1296DB;
		border-radius: 20rpx;
		font-size: 16rpx;
	} */

	.item-name {
		padding-right: 10rpx;
		font-size: 28rpx;
		color: #000;
	}
	
	.shop-title{
		display: flex;
		align-items: center;
		padding-left: 10rpx;
	}
	
	.shipping-fee-card{
		background-color: #FFF;
		border-radius: 24rpx;
		padding: 20rpx 0;
		margin-bottom: 20rpx;
	}
	
	.shipping-select{
		display: flex;
		width: 520rpx;
		padding: 0 20rpx;
	}
	
	.shipping-type-tag-list{
		display: flex;
		flex-wrap: wrap;
	}
	
	.shipping-type-tag {
		padding: 16rpx 10rpx;
	}
	
	.label-word{
		width: 140rpx;
		height: 50rpx;
		text-align: justify;
	}
	
	/* .label-word::after{
		width: 100%;
		display: inline-block;
		content: '';
	} */
	
	.popupShipping-panel{
		padding: 15px;
		background-color: #fff;
		border-radius: 15px;
		width: 90vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.panel-item{
		padding: 30rpx 20rpx;
		margin: 10rpx 20rpx 10rpx 20rpx;
		border: 1rpx solid #1296DB;
		border-radius: 10px;
		background-color: #fff;
		color: #fff;
		box-shadow: 2px -1px 10px 0.5px rgba(0, 0, 0, 0.2);
		width: 595rpx;
	}
	
	.panel-item-main{
		display: flex;
		align-items: center;
	}
	
	.item-type-popup {
		padding-right: 10rpx;
		font-size: 28rpx;
		color: #000;
	}
	
	.item-type-price {
		padding-left: 40rpx;
		color: red;
		margin-left: auto;
		padding-right: 50rpx;
	}
	
	.item-type-caution {
		color: #000;
	}
	
	.item-type-name{
		padding-left: 20rpx;
		font-weight: bold;
	}
	
	.caution-caution{
		display: flex;
		white-space: nowrap;
	}
	
	.type-choose{
		display: flex;
		width: 520rpx;
		height: 56rpx;
		border: 1rpx solid #ccc;
		border-radius: 10rpx;
		margin-left: 10rpx;
		justify-content: space-between;
		padding-right: 20rpx;
	}
	
	.type-choose-text{
		margin-left: 14rpx;
		color: #636263;
		font: 30rpx;
		font-style: italic;
	}
	
	.type-choosed-text{
		margin-left: 14rpx;
		color: #000;
		font: 30rpx;
		font-weight: bold;
	}
</style>
