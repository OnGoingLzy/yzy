<template>
	<view class="example">
		<scroll-view scroll-y="true" style="height: 600rpx;">
			<view class="path-item" v-for='(item,index) in list' :key='index' @click="checkLocation(item)">
				<view class="item-main">
					<view class="item-name-popup item-name-name">{{item.name}}</view>
					<view class="item-name-popup item-name-phone">{{item.tel}}</view>
				</view>
				<view class="item-main" style="align-items: flex-start; margin-left: 60rpx;">
					<view class="active" v-if='item.isDefault==1'>默认</view>
					<view class="item-name-popup">{{item.city}} {{item.details}}</view>
				</view>
			</view>
		</scroll-view>
		<button class="button-goto-maintain" type="primary" style="margin-top: 20rpx;"
			@click="goToMaintain">去维护地址</button>
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
	export default {
		data() {
			return {
				shops: [],
				totalPrice: 0, // 总价
				selectedAddress: {},
				shippingFee: 0.00,
				checkboxSelected: false,
				totalNum: 0,
				list: [],
				selectedList: [],
				isEnableClick: true,
				popup: true,
			}
		},
		methods: {
			async getAddressList() {
				const url = '/api/user/getAddressList';
				const method = 'POST';
				const data = {
					openid: uni.getStorageSync("openid"),
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					if (response.code == 99) {
						this.list = response.data.data;
						console.log("展示目前的this.list");
						console.log(this.list);
						//如果该用户无地址信息
						if (this.list === null) {
							uni.showToast({
								title: "无地址信息，请前往地址维护界面添加收货地址",
								duration: 3000,
								icon: 'none',
								mask: true
							})
							
						} else {
							//取送货地址中的默认地址方法
							let defaultList = this.list.filter(item => item.isDefault === 1);
							let result;
							if (defaultList.length > 0) {
								result = defaultList.reduce((prev, curr) => prev.id < curr.id ? prev : curr);
							} else {
								result = this.list.reduce((prev, curr) => prev.id < curr.id ? prev : curr);
							}
							uni.$emit('pageClosedLocation', result);
						}
					} else {
						console.log("-99" + response.result);
					}
				} catch (error) {
					console.log(error);
				}
			},
			//用户点击某一个地址时，将这个地址的信息传递回父组件
			checkLocation(item) {
				var that = this;
				uni.$emit('pageClosedLocation', item);
				that.addOver("1");
			},
			addOver(res) {
				//通知父组件添加完毕
				var that = this
				that.$emit('fatherMethod', res);
			},
			goToMaintain() {
				uni.navigateTo({
					url: '/pages/user-path-list/pathList'
				})
			}
		},
		onLoad() {
			
		},
		mounted() {
			this.getAddressList();
			console.log("getAddressList");
			console.log('测试进来了');
			if (this.list.length === 0) {
				console.log("return了");
				return;
			} else {
				console.log("没有return");
				// uni.$emit('pageClosedLocation', this.list[0]);
				this.addOver("1");
			}
		}
	};
</script>

<style>
	.button-goto-maintain {
		background-color: #1296DB !important;
	}

	.example {
		padding: 15px;
		background-color: #fff;
		border-radius: 15px;
		width: 90vw;
		height: 700rpx;
	}

	.path-list {
		padding-left: 20rpx;
		border-radius: 30rpx;
	}

	.path-item {
		padding: 30rpx 20rpx;
		margin: 20rpx;
		border: 1rpx solid #1296DB;
		border-radius: 10px;
		background-color: #fff;
		color: #fff;
		box-shadow: 2px -1px 10px 0.5px rgba(0, 0, 0, 0.2);
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

	.item-name-popup {
		padding-right: 10rpx;
		font-size: 28rpx;
		color: #000;
	}

	.item-name-phone {
		padding-left: 20rpx;
	}

	.item-name-name {
		padding-left: 20rpx;
	}
</style>
