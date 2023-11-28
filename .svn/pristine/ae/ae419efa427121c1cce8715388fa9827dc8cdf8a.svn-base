<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods, i) in searchResults" :key="i" @click="gotoDetail(goods)">
				<goodsList :goods="goods"></goodsList>
			</view>
		</view>
		<view class="isShows">
			{{show}}
		</view>
	</view>

</template>

<script>
	import goodsList from '@/components/goods_order/goods_list/goods_list';
	export default {
		components:{
			goodsList
		},
		data() {
			return {
				searchValue: '123123',
				show: this.showInit,
				showSync: false,
				searchVal: this.searchValInit,
				isShowInit: true,
				defS: JSON.parse(JSON.stringify(uni.getStorageSync('dSv'))),
				reobj: {
					'spcxm': '',
					pageIndex: 1,
					pageSize: 20,
					drugsList: [],
				},
				timer: null,
				kw: '',
				// 搜索的结果列表
				searchResults: [],
				// 搜索历史的数组
				historyList: [],
				isloading: true,
				time: 1,
				times: 2,
				total: '',
				show: ''
			};
		},
		//初始化数据
		onLoad(options) {
			this.time = 1;
			this.times = 2;
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]');
			this.kw = uni.getStorageSync('kw');
		},
		methods: {
			// input 输入事件的处理函数 原查询函数，现未使用
			async getSearchList() {
				console.log(this.kw);
				// 判断搜索关键词是否为空
				var that = this
				if (!that.kw.trim() || that.kw.length === 0) {
					that.searchResults = []
					return
				}
				console.log('测试用' + uni.getStorageSync('dS').value);

				this.reobj.spcxm = uni.getStorageSync('dS').value;
				//保证只有第一次搜索时才有搜索中的提示，后续下拉加载更多数据不显示
				if (that.time === 1) {
					console.log(that.time);
					that.time = that.time + 1
					uni.showLoading({
						title: '搜索中...'
					})
				}
				//发起搜索请求
				uni.$http.beforeRequest = function(options) {
					if (options.url.indexOf('/api/SearchSpml') !== -1) {
						options.header = {
							'X-Ca-Key': 'wxe7c826a1a5e00055',
							'X-Service-Method': 'SearchSpml'
						}
					}
				}
				const {
					data: res
				} = await uni.$http.post('/api/SearchSpml', this.reobj)
				this.isloading = false


				if (res.result !== 99) return uni.$showMsg()
				//能搜索到数据
				if (res.data !== null) {
					this.searchResults = [...this.searchResults, ...res.data] //下拉加载更多数据 与旧数据连接
					this.reobj.spdm = res.data.spdm
					that.total = res.totalCount

				} else {
					//不能搜索到数据
					uni.navigateTo({
						url: '/pages/goods_order_warning/goods_order_warning'
					})
					//return uni.$showMsg("暂无结果！")
				}

			},
			//2023.5.5添加 已淘汰
			async getSearchList2() {

				console.log('测试2');
				
				
				// 判断搜索关键词是否为空
				var that = this
				if (!that.kw.trim() || that.kw.length === 0) {
					that.searchResults = []
					return
				}
				this.reobj.drugsList = uni.getStorageSync('dS').drugsList;
				this.reobj.spcxm = uni.getStorageSync('dS').spcxm;
				//保证只有第一次搜索时才有搜索中的提示，后续下拉加载更多数据不显示
				if (that.time === 1) {
					console.log(that.time);
					that.time = that.time + 1
					uni.showLoading({
						title: '搜索中...'
					})
				}
				//发起搜索请求
				uni.$http.beforeRequest = function(options) {
					// if (options.url.indexOf('/api/SearchSpml') !== -1) {
					if (options.url.indexOf('/api/SearchSpml') !== -1) {
						options.header = {
							'X-Ca-Key': 'wxe7c826a1a5e00055',
							'X-Service-Method': 'SearchSpml'
						}
					}
				}
				const {
					data: res
				} = await uni.$http.post('/api/SearchSpml', this.reobj)
			
				this.isloading = false
			
			
				if (res.result !== 99) return uni.$showMsg()
				//能搜索到数据
				if (res.data !== null) {
					this.searchResults = [...this.searchResults, ...res.data] //下拉加载更多数据 与旧数据连接
					this.reobj.spcxm = res.data.spdm
					that.total = res.totalCount
					
				} else {
					//不能搜索到数据
					uni.navigateTo({
						url: '/pages/goods_order_warning/goods_order_warning'
					})
					//return uni.$showMsg("暂无结果！")
				}
			
			},
			//2023.5.6添加 正在使用，可优化代码结构
			getSpdmList(){
				// 判断搜索关键词是否为空
				var that = this
				if (!that.kw.trim() || that.kw.length === 0) {
					that.searchResults = []
					return
				}
				//保证只有第一次搜索时才有搜索中的提示，后续下拉加载更多数据不显示
				if (that.time === 1) {
					console.log(that.time);
					that.time = that.time + 1
					uni.showLoading({
						title: '搜索中...'
					})
				}
				this.reobj.spcxm = uni.getStorageSync('dS').spcxm;
				let spcxm = this.reobj.spcxm
				console.log("当前查询商品:"+spcxm)
				/* 5/8注释掉，改用api1调用api2
				uni.request({
				  // url: 'http://localhost:8080/api/select', // 请求的url
				  url: 'http://47.120.7.226/api/select', // 请求的url
				  method: 'GET', // 请求的方法
				  data: { // 请求的参数
				    searchName: this.reobj.spcxm,
				  },
				  success: function(res){ // 请求成功的回调函数
						console.log(res.data.drugList);
						//that.reobj.drugsList = res.data.drugList;
						that.getSearchList3();
					},
				  fail: function(res){ // 请求失败的回调函数
					console.log(res.errMsg);
				  }
				})
				*/
			   this.getSearchList3()
			},
			//2023.5.6添加
			async getSearchList3() {
			
				console.log('测试3');
				
				// 判断搜索关键词是否为空
				var that = this
				if (!that.kw.trim() || that.kw.length === 0) {
					that.searchResults = []
					return
				}
				this.reobj.spcxm = uni.getStorageSync('dS').spcxm;
				let spcxm = this.reobj.spcxm
				//发起搜索请求
				uni.$http.beforeRequest = function(options) {
					console.log("searchSpml")
					// if (options.url.indexOf('/api/SearchSpml') !== -1) {
					if (options.url.indexOf('/api/SearchSpml') !== -1) {
						options.header = {
							'X-Ca-Key': 'wxe7c826a1a5e00055',
							'X-Service-Method': 'SearchSpml'
						}
					}
				}
				const {
					data: res
				} = await uni.$http.post('/api/SearchSpml', this.reobj)
			
				this.isloading = false
			
			
				if (res.result !== 99) return uni.$showMsg()
				//能搜索到数据
				if (res.data !== null) {
					this.searchResults = [...this.searchResults, ...res.data] //下拉加载更多数据 与旧数据连接
					this.reobj.spdm = res.data.spdm
					that.total = res.totalCount
					this.reobj.drugsList = res.drugsList
			
				} else {
					//不能搜索到数据
					uni.navigateTo({
						url: '/pages/goods_order_warning/goods_order_warning'
					})
					//return uni.$showMsg("暂无结果！")
				}
			
			},
			//到达页面底部 触发加载更多内容
			onReachBottom() {
				this.show = '正在加载中...'
				//如果数据已经全部加载完毕
				if (this.reobj.pageIndex * this.reobj.pageSize >= this.total) {
					this.show = ''
					if (this.times == 2) {
						this.times = 1
						return uni.$showMsg('数据加载完毕!')
					}
					return;
				}
				if (this.isloading) return

				// 让页码值自增+1
				this.reobj.pageIndex++
				console.log("到达底部")
				this.getSearchList3()
			},
			//点击进入详情页
			gotoDetail(item) {
				uni.navigateTo({
					url: '/pages/goods_order_detail/goods_order_detail?spdm=' + item.spdm
				})
			}
		},
		mounted() {
			// this.getSearchList();
			this.getSpdmList();
		}
	}
</script>

<style lang="scss">
	.isShows {
		display: flex;
		padding-top: 5px;
		padding-bottom: 5px;
		align-content: center;
		justify-content: center;
	}

	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;

			.goods-name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}

	.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 15px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;

			uni-tag {
				margin-top: 5px;
				margin-right: 5px;
				font-size: 2rpx;
			}
		}
	}
</style>
