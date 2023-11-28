<template>
	<view>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147309" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147309")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147310" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147310")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147311" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147311")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147312" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147312")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147313" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147313")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147314" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147314")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147315" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147315")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147316" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147316")'></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
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
		}
	}
</script>

<style scoped>
	image{
		width: 100%;
		height: 1050rpx;
	}
</style>
