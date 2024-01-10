<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods, i) in searchResults" :key="i">
				<historyList :goods="goods"></historyList>
			</view>
		</view>
		<view class="isShows">
			{{show}}
		</view>
	</view>

</template>

<script>
		import request from '@/common/api/request.js'
	import historyList from "@/components/goods_order/history_list/history_list.vue"
	export default {
		components:{
			historyList
		},
		data() {
			return {
				show: this.showInit,
				showSync: false,
				searchVal: this.searchValInit,
				searchResults: [],
				isShowInit: true,
				lxdh: '',
				isloading: true,
				time: 1,
				times: 2,
				total: '',
				show: '',
				reobj: {
					'lxdh': '',
					pageIndex: 1,
					pageSize: 20
				},
			};
		},
		//初始化数据
		onLoad(options) {
			this.time = 1;
			this.times = 2;
			this.reobj.lxdh = uni.getStorageSync('lxdh');
			this.lxdh = uni.getStorageSync('lxdh')
			//this.reobj.lxdh = '15969538994';
			//this.lxdh='15969538994';
		},
		methods: {
			async gethistoryList(){
				if (this.lxdh === undefined || this.lxdh === '') {
					return;
				}
				console.log('电话号码' + this.lxdh);
				if (this.time === 1) {
					console.log(this.time);
					this.time = this.time + 1
					uni.showLoading({
						title: '搜索中...'
					})
				}
				const data = this.reobj
				
				const url = '/api/user/SearchHistory';
				const method = 'POST';
				
				try {
					const res = await request('yzy_app', url, method, data);
					console.log(res); //统一格式：{"data":{}, "flag":99, "result":"成功"}
					this.isloading = false
				
				
					if (res.data.result !== 99) return uni.$showMsg()
					//能搜索到数据
					if (res.data !== null) {
						this.searchResults = [...this.searchResults, ...res.data.data] //下拉加载更多数据 与旧数据连接
						this.reobj.spdm = res.data.data.spdm
						this.total = res.data.totalCount
						uni.hideLoading()
				
					} else {
						return uni.$showMsg("暂无结果！")
					}
					
				} catch (error) {
					console.log(error);
					return uni.$showMsg("服务器异常！")
				}
			},
		// 	async gethistoryList() {
		// 		if (this.lxdh === undefined || this.lxdh === '') {
		// 			return;
		// 		}
		// 		console.log('电话号码' + this.lxdh);
		// 		if (this.time === 1) {
		// 			console.log(this.time);
		// 			this.time = this.time + 1
		// 			uni.showLoading({
		// 				title: '搜索中...'
		// 			})
		// 		}

		// 		uni.$http.beforeRequest = function(options) {
		// 			options.header = {
		// 				'X-Ca-Key': 'wxe7c826a1a5e00055',
		// 				'X-Service-Method': 'SearchHistory'
		// 			}
		// 		}
		// 		const {
		// 			data: res
		// 		} = await uni.$http.post('/user/SearchHistory', this.reobj)

		// 		console.log(res)
		// 		this.isloading = false


		// 		if (res.result !== 99) return uni.$showMsg()
		// 		//能搜索到数据
		// 		if (res.data !== null) {
		// 			this.searchResults = [...this.searchResults, ...res.data] //下拉加载更多数据 与旧数据连接
		// 			this.reobj.spdm = res.data.spdm
		// 			this.total = res.totalCount

		// 		} else {
		// 			return uni.$showMsg("暂无结果！")
		// 		}
		// 	}
		
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
			this.gethistoryList()
		},


		mounted() {
			this.gethistoryList();
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
