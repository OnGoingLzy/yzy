<template>
	<view style="">
		<view style="width: 94vw;padding: 3vw;background: white;border-radius: 15px;text-align: center;">
			<view>
				<text style="font-size: 18px;font-weight: bold;">视频播放</text>
			</view>
		  <view>
			 
		  </view>
		  <video
		     controls
		     ref="videoPlayer"
		     :src="url"
			 autoplay="true"
		  ></video>
		</view>
		<!-- <web-view :webview-styles="webviewStyles" src="url"></web-view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://appletservice.dyb.yn.cn/健康科普.mp4',
				text:"",
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad: function (option) {
			//解析传过来的对象
		
			this.url = JSON.parse(decodeURIComponent(option.src));
			
			//this.text = JSON.parse(decodeURIComponent(option.text));
			this.resetVideo()
		},
		mounted() {
			
		},
		methods: {
			resetVideo(){
				console.log(this.url)
				// 获取 video 元素的上下文
				const videoContext = uni.createVideoContext("videoPlayer", this);
			
				// 更改视频地址
				videoContext.src = this.url;
			
				// 播放视频
				videoContext.play();
			}
		}
	}
</script>

<style>
.swiper-2{
	width: 96vw;
	height: 43vw;
	border-radius: 15px;
	text-align: center;
}
</style>
