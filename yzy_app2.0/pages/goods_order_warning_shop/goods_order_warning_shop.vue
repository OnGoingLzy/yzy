<template>
	<view class="item-cell">
		<image class="item-bgImg" src="../../static/icon/back.png" mode="aspectFill"></image>
		<view class="item-content">
			<view class="sm">
				小云提示您：
			</view>
			</br>
			<view class="sm">
				您寻找的药品入驻单位暂时无法销售，请至医院购买。
			</view>
			</br>
			<view class="sm">
				感谢您的使用!祝您健康!
			</view>

			<!--  <view clase="sm-1">
               <text clase="sm-2">在5个工作日内反馈，请确认</text> 
              <text clase="sm-2":style="{'color':'#E93423'}" >是否继续找药?</text>
          </view> -->
			<view class="bt">
				<button form-type="reset" class="bt_reset" @click="quit()">离开</button>
				<!-- <button form-type="submit" open-type="contact" class="bt_search">继续找药</button> -->
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
					url: '/pages/goods_order/goods_order',
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
		// background-color: #E8F1FC;
	}

	.item-bgImg {
		width: 150%;
		height: 500px;
		border-radius: 20rpx;
		position: absolute;
		left: -140px;
		top: 30px;
		z-index: 1;
		// border: #788188 solid 1px;
	}

	.item-content {
		position: relative;
		left: 10px;
		top: 175px;
		z-index: 2;
		width: 100%;
		height: 100%;
	}

	.sm {
		padding-bottom: 10px;
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
