import request from '@/common/api/request.js'
export default {
    data() {
       return {
            
       }
    },
	onLoad(options) {
		//二维码参数，推广人的手机号
		if (options.scene && options.scene !== '' && options.scene !== null) {
			console.log('有推广码')
			const scene = decodeURIComponent(options.scene)
			console.log(scene)
			if(!uni.getStorageSync('openid')){
				this.getOpenid(scene)
			}
			
		} else{
			console.log('无推广码')
			if(!uni.getStorageSync('openid')){
				this.getOpenid("0")
			}
			
		}
	},
    methods: {
		async getOpenid (sharerPhone){
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
				console.log(response)
				if(response.code == 99){
					if(response.data.openid!==null && response.data.openid!==''){
						uni.setStorageSync("openid", response.data.openid)
					}
					
					this.checkUserExist(response.data.openid,sharerPhone)
					
				}
				else {
					
				}
			} catch (error) {
				console.log(error);
			}
		},
		async checkUserExist(openid,sharerPhone){
			const url = '/api/user/checkUserExist';
			const method = 'POST'; 
			const data = {
				openid: openid,
				sharerPhone: sharerPhone,
			};
			try {
				const response = await request('yzy_app', url, method, data);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
				if(response.code == 99){
				}
				else {
		
				}
			} catch (error) {
				console.log(error);
			}
		},
		
	}
}