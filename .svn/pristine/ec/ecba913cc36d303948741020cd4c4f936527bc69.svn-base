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
				url:''
			}
		},
		onLoad(query) {
			console.log('Entered new page!');
			const url = JSON.parse(decodeURIComponent(query.url));		
			this.url = url
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
