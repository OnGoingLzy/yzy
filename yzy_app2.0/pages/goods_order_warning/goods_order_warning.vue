<template>
	<view class="item-cell" catchtouchmove="true">
		<view class="ts">
			<!-- <view class="xx"></view> -->

			<view class="tag-view">
				<uni-tag :inverted="true" text="暂无搜索结果" type="primary" />
			</view>
		</view>
		<image class="item-bgImg" src="../../static/icon/back.png" mode=""></image>
		<view class="item-content">
			<view class="sm" style="font-size:16">
				您寻找的药品暂时无货，小云将在全国范围内全力寻找，并在一周内反馈，请确认是否继续找药?
			</view>

			<view class="bt">
				<button form-type="reset" class="bt_reset" @click="quit()">离开</button>
				<button form-type="submit" open-type="contact" class="bt_search">继续找药</button>
			</view>

		</view>
	</view>

	<!-- <view clase="sm">
            您寻找的药品暂时无货，小云将权力帮您寻找，并在1周内反馈，请确认是否继续找药
          </view>
        <view class="bt">
        <button form-type="reset" class="bt_reset">离开</button>      
    		<button form-type="submit" class="bt_search">继续找药</button>
        </view> -->

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {


			quit() {
				console.log('1');
				uni.reLaunch({
					url:'/pages/goods_order/goods_order'
				})
			}




		}
	}
</script>

<style lang="scss">
	.item-cell {
		width: 100%;
		height: 100vh;
		font-size: 18px;
		color: black;

		//padding: 30rpx;
		//margin: 10rpx auto;
		position: relative;
	}

	.ts {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 30rpx;
		margin-top: 50px;

		.xx {
			align-items: center;
			font-size: 28rpx;
			width: auto;

			color: #000;
			border-radius: 0.5;
			line-height: 2;
			// background-color: #788188;
		}
	}




	.item-bgImg {
		width: 160%;
		height: 500px;
		border-radius: 20rpx;
		position: absolute;
		left: -140px;
		top: -20px;
		z-index: 1;
	}

	.item-content {
		position: relative;
		left: 10px;

		top: 100px;
		z-index: 2;
		width: 100%;
		height: 100%;

		.sm {
			padding-left: 10px;
			padding-right: 10px;
			font-size: 18px
		}
	}







	// .form_exact_search{
	//     width:auto;
	//     hegiht:auto;
	//     padding-top: 200px;
	//     background-image: url('../../static/back.png');
	//     size: 100%;


	.bt {
		display: flex;
		flex-flow: wrap;
		width: 100%;
		font-size: 22px;

		margin: 20px 0;

		.bt_reset {
			width: 30%;
			background-color: #FFFFFF;
			color: #788188;
		}

		.bt_search {
			width: 30%;
			background-color: #1296DB;
			color: #FFFFFF;
		}
	}

	//}
</style>
