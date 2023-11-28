<template>
	<view>
		<!-- 流程导航 -->
		<view class="title-navi tabbar">
			<text class="f-active-color">点击问诊开方</text>
			<image class="title-navi-next" src="../../static/icon/next_step_filled.svg"></image>
			<text class="f-active-color">问诊信息</text>
			<image class="title-navi-next" src="../../static/icon/next_step_filled.svg"></image>
			<text class="f-active-color">医生开方</text>
			<image class="title-navi-next" src="../../static/icon/next_step_filled.svg"></image>
			<text class="f-active-color">下单购药</text>
		</view>
		<view style="height: 90rpx;"></view>
		<view v-for="(item,i) in recipeList" :key="i" style="padding: 2vw;" v-if="reload">	
			<recipeCard :recipe="item"></recipeCard>
		</view>
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
	import recipeCard from '@/components/recipe/recipe_card.vue'
	export default {
		data() {
			return {
				recipeList:[],
				reload:true,
				clinicId:'',
			}
		},
		components:{recipeCard},
		onShow() {
			
		},
		onUnload() {
		  // 在页面卸载时清除定时器
		  clearInterval(this.timer);
		},
		onLoad:function (option) {
			console.log("onload user_recipe")
			if(option!=null && option.clinicId!=null){
				this.clinicId = option.clinicId
				console.log("只显示一个处方"+option.clinicId)
				this.getRecipeList(option.clinicId)
				// 启动定时器，每隔 30 秒执行一次 this.getRecipeList()
				this.timer = setInterval(() => {
				  this.getRecipeList(option.clinicId);
				  
				}, 5000); // 30秒，单位是毫秒
			}else{
				this.getRecipeList('')
				// 启动定时器，每隔 30 秒执行一次 this.getRecipeList()
				this.timer = setInterval(() => {
				  this.getRecipeList('');
				  
				}, 30000); // 30秒，单位是毫秒
			}
			
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
			if(this.clinicId!=''){
				this.getRecipeList(this.clinicId)
			}else{
				this.getRecipeList('') 
			}
			
		},
		methods: {
			async getRecipeList(clinicId){
				this.reload = false
				if(this.recipeList.length==0 ||this.recipeList == null){
					uni.showLoading({
						title:'查询中'
					})
				}
				const url = '/api/recipe/getRecipeList';
				const method = 'POST'; 
				const data = {
					openid: uni.getStorageSync("openid"),
					type:'ALL',
				};
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						
						if(clinicId!==''){
							this.recipeList = null 
							// 使用 filter 方法筛选数据
							const filteredRecipes = response.data.data.filter(recipe => recipe.clinicId === clinicId);
							// 将筛选后的数据重新赋值给 recipeList
							this.recipeList = filteredRecipes;
						}else{
							this.recipeList = response.data.data
						}
						uni.hideLoading()
						this.reload = true
					}
					else {
						this.reload = true
					}
				} catch (error) {
					console.log(error);
					uni.showToast({
						icon: 'none',
						title: '服务器出错了'
					})
					this.reload = true
				}
			},
		}
	}
</script>

<style lang="scss">
	
 page{
 	background-color: #ebebeb;
 }
 
 .title-navi {
 	display: flex;
 	justify-content: space-between;
 	align-items: center;
 	padding: 10rpx 26rpx 20rpx 26rpx;
 	background-color: white;
 }
 
 .title-navi-next {
 	width: 20rpx;
 	height: 20rpx;
 }
 
 .tabbar {
	width: 95%;
	height: 60rpx;
	background-color: #F7FCFF;
	position: fixed;
	top: 0;
	bottom: -5rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: -16rpx;
	z-index: 10;
 }
</style>
