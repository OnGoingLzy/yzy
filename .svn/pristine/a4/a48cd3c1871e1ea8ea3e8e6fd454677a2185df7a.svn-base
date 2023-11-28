<template>
	<view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		//获取用户定位信息
		//获取成功后自动跳转返回需求清单界面并点击提交需求
		onLoad() {
      
			uni.$showMsg("请先获取位置信息！")
			uni.getLocation({
				type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				success: function(res) {
          console.log(res)
					uni.setStorageSync('wd', res.latitude)
					uni.setStorageSync('jd', res.longitude)
					uni.$showMsg("获取定位成功！")
					 // uni.redirectTo({
					 	// url: '/pages/cart/cart',
					 	// success: res => {
					 		// setTimeout(() => {
					 			// let pages = getCurrentPages(); //当前页面栈
					 			// let beforePage = pages[pages.length - 1]; //指定调用页面为上个页面
					 			// console.log(pages);
					 			// console.log(beforePage);
					 			// beforePage.$vm.$children[2].settlement()
					 		// }, 100)
					 	// }
					 // })
           
             uni.navigateBack({
                    delta: 1 // 返回的页面数
                })
         
          
          
				}
			})
		}
	}
</script>

<style lang="scss">

</style>
