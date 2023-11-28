<template>
	<view style="padding: 3vw;">
		<view class="container">
			<view style="width: 90vw;margin-top: 30px;">
				<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21163100" style="width: 100%;height: 16vw;"></image>
			</view>
			<view style="width: 100%;display: inline-grid;justify-content: center;align-items: center;margin-top: 20px;">
				<view class="img-box" >
					<image src="http://images.yndzyf.com/getimage.ashx?mlszh=21161626" style="width: 100%;height: 100%;" :show-menu-by-longpress="true"></image>
				</view>
				
				<view style="width: 60vw;display: flex;justify-content: center;margin:20px 0">
					<view class="font-box">
						<text style="color: white;font-weight: bold;">长按二维码,关注微信号\n</text>
						<text style="color: white;font-size: 13px;">订单状态,实时推送,随时知</text>
					</view>
				</view>
			</view>
			
	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.container{
	border-radius: 12px;
	width: 94vw;
	background: #fdf5e6;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to top, #FFFFFF, #fdf5e6);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to top, #FFFFFF, #fdf5e6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	min-height: 300px;
	border: 1px solid #fedeb1;
	display: inline-grid;
	justify-content: center;
	align-items: center;
}
.font-box{
	width: 50vw;border-radius: 10px;
	background: #1296DB;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #13a9f3, #1296DB);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #13a9f3, #1296DB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	height: 50px;
	text-align: center;
}
.img-box{
	width: 60vw;
	height: 60vw;
	border: 3px solid #1296DB;
}
</style>
