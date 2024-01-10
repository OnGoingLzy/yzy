<template>
	<view>
		<view>
			<web-view :src="url" ></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'http://localhost:52804/view/%E6%99%BA%E6%85%A7%E8%B4%B9%E7%94%A8/fybx_ldsp.html'
			}
		},
		onLoad() {
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
