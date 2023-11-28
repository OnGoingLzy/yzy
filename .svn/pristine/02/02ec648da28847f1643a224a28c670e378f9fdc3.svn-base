<script>
	import request from '@/common/api/request.js'
	export default {
		onLaunch: function() {
			// this.$store.commit('initUser');
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		data:{
			code: "",
			openid: ""
		},
		methods:{
			async getOpenid (){
				//获取code
				const [err, res] = await uni.login().catch(err => err)
				this.code = res.code
				const url = '/api/Example/getOpenid';
				const method = 'POST'; 
				const data = {
					js_code: this.code,
					secret: ""
				};
				try {
					const response = await request('yzy_app', url, method, data);	//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						uni.setStorageSync("openid", response.data.openid)
						// this.checkUserExist(response.data.openid)
						console.log("99" + response.data);
					}
					else {
						console.log("-99" + response.data);
					}
				} catch (error) {
					console.log(error);
				}
			},
			async checkUserExist(openid){
				const url = '/api/user/checkUserExist';
				const method = 'POST'; 
				const data = {
					openid: openid,

				};
				try {
					const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					if(response.code == 99){
						console.log("99" + response.data);
					}
					else {
						console.log("-99" + response.data);
					}
				} catch (error) {
					console.log(error);
				}
			}
		},
	}
</script>

<style>
/*每个页面公共css */
@import './common/uni.css';
@import './common/common.css';

</style>
