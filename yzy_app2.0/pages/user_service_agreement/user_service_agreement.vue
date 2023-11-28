<template>
	<view>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147480" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147480")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147481" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147481")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147482" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147482")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147483" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147483")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147484" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147484")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147485" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147485")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147486" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147486")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147487" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147487")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147488" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147488")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147489" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147489")'></image>
		<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21147490" mode="" @click='showImg("http://images.yndzyf.com/getimage.ashx?mlszh=21147490")'></image>
	
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
