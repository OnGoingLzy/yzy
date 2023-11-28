<template>
	<view>
		<view class="appointment-card" v-for="(appointment,i) in filterAppointments" :key="i">
			<view>
				<text style="font-weight: bold;">{{'预约医生：'+appointment.doctorName+' '+appointment.position}}</text>
				<text style="">{{'\n预约科室：'+appointment.departmentName+'\n'}}</text>
				<text user-select=true v-text="'预约时间：'+appointment.appointmentTime+' '+appointment.appointmentTimeSlot" style="font-size: 14px;"></text>
				
				
				<text v-text="'\n患者：'" style="color: gray;"></text>
				<text v-text="appointment.patientName" style="font-size: 13px;"></text>
				<text v-text="'\n患者联系电话'+appointment.patientPhone" style="font-size: 13px;"></text>
				<text v-text="'\n预约人联系电话'+appointment.appointmentUserPhone" style="font-size: 13px;"></text>
			</view>
			<view class="line" style="height: 1upx;background-color: #ccc;margin-top: 5px;"></view>
			<view  style="    display: flex;justify-content: flex-end;padding: 5px;">
			<button v-if="appointment.status=='待处理'" class="mini-btn" type="primary" size="mini" style="margin: initial;    border-radius: 50px;"
				@click="appointmentFinished(appointment)">确认</button>
			</view>
			<view>
				<text v-if="appointment.status=='已取消'" style="color: crimson;">用户已取消预约</text>
				<text v-if="appointment.status=='已完成'" style="color: darkgreen;">已完成</text>
				<text v-if="appointment.status=='已过期'" style="color: gray;">已过期</text>
			</view>
		</view>	
		<view style="text-align: center;margin-bottom: 20px;padding-bottom: 20px;" @click="clickShowMore()" >
			<text style="color: gray;" v-text="showMore" ></text>
		</view>
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
	export default {
		data() {
			return {
				appointments:[],
				filterAppointments:[],
				showMore:"查看更多"
			}
		},
		onShow() {
			uni.hideHomeButton()
			this.checkUserPermissions()
		},
		methods: {
			toAuthorizePhone() {
				uni.navigateTo({
					url: '/pages/login/login'
					
				})
			},
			async appointmentFinished(appointment){
				var data1 = {
					openid: uni.getStorageSync("openid"),
					phone: uni.getStorageSync("phone"),
					type: "医生",
					appointmentId: appointment.id,
					origin_status: appointment.status,
					status:"已完成",
				}
				const url = '/api/appointment/updateAppointmentStatus';
				const method = 'POST'; 
				const data = data1
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					
					if(response.data.flag==99){
							uni.showToast({
								title:"确认成功!",
								icon:"none",
								mask:true,
								duration:1300,						
							})
							this.getAppointment()
							
						}else{
							uni.showToast({
								title:response.data.sm,
								icon:"none",
								mask:true,
								duration:1300,						
							})
						}
					
					} catch (error) {
						console.log(error);
						uni.showToast({
							title:"出错了",
							icon:"none",
							mask:true,
							duration:1300,						
						})
						
					}
			},
			clickShowMore(){
				if(this.showMore=="查看更多"){
					this.showMore="收起"
					this.filterData("ALL")
				}else{
					this.showMore="查看更多"
					this.filterData("DEFAULT")
				}
			},
			filterData(type){
				if(type=='ALL'){
					this.filterAppointments=this.appointments
				}
				if(type=='DEFAULT'){
					// 使用 filter 方法筛选 status 为 "待处理" 的预约
					this.filterAppointments = this.appointments.filter(appointment => appointment.status === "待处理");
					console.log(this.filterAppointments)
					if(this.filterAppointments.length==0){
						this.filterAppointments=this.appointments
						
					}
				}
			},
			async getAppointment(){
				this.showMore="查看更多"
				var that = this
				var data1 = {
					openid: uni.getStorageSync("openid"),
					phone: uni.getStorageSync("phone"),
					type: "医生"
				}
				const url = '/api/appointment/getAppointment';
				const method = 'POST'; 
				const data = data1
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					
					if(response.data.flag==99){
						this.appointments= response.data.data
						that.filterData("DEFAULT")
						
					}else{
						
					}
				
				} catch (error) {
					console.log(error);
					uni.hideLoading()
					
				}
				
				
			},
			//检查用户权限，只有有权限的用户才能访问该页面
			async checkUserPermissions(){
				if(!uni.getStorageSync("phone")){
					this.toAuthorizePhone()
					return
				}
				var data1 = {
					openid: uni.getStorageSync("openid"),
					phone: uni.getStorageSync("phone")
	
				}
				const url = '/api/appointment/checkUserPermissions';
				const method = 'POST'; 
				const data = data1
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					
					if(response.data.flag==99){
						
						this.getAppointment()
					}else{
						uni.showToast({
							title: '您没有医生权限,准备跳转云找药',
							icon:"none"
						});
						setTimeout(function(){
							uni.reLaunch({
								url:"/pages/index/index"
							})
							// uni.exitMiniProgram({
							// 	success: function() {
							// 		console.log('退出小程序成功');
							// 	},
							// 	fail: function(err) {
							// 		console.log('退出小程序失败', err);
							// 	}
							// })
						},1000)
					}
	
				} catch (error) {
					console.log(error);
					uni.hideLoading()
					
				}
				
			},
		}
	}
</script>

<style lang="scss">
.appointment-box{
	padding: 5px;display: flex;border-radius: 5px;margin-top: 5px;
}	
.appointment-card{
	margin: auto;
	background: white;
	border-radius: 10px;
	width: 92vw;
	padding: 2vw;
	margin-top: 10px;
}
page{
	background: #F2F3F5;
}
</style>
