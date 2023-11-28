<template>
	<view>
		<view class="appointment-card" v-for="(appointment,i) in appointments" :key="i" :style="appointment.status!=='待处理'?'background: #dedede;':''">
			<view>
				
				<text style="font-weight: bold;">{{'预约医生：'+appointment.doctorName+' '+appointment.position}}</text>
				<text style="">{{'\n预约科室：'+appointment.departmentName+'\n'}}</text>
				<text user-select=true v-text="'预约时间：'+appointment.appointmentTime+' '+appointment.appointmentTimeSlot" style="font-size: 14px;"></text>	
				<text v-text="'\n就诊人：'" style="color: gray;"></text>
				<text v-text="appointment.patientName" style="font-size: 13px;"></text>
				<text v-text="'\n联系电话'+appointment.patientPhone" style="font-size: 13px;"></text>
				
			</view>
			<view class="line" style="height: 1upx;background-color: #ccc;margin-top: 5px;"></view>
			<view style="	display: flex;margin-top: 5px">
				<view class="left-box">
					<image :src="appointment.hospitalImgId? 'http://images.yndzyf.com/getimage.ashx?mlszh='+appointment.hospitalImgId:defaultPic" style="width: 20vw;height: 20vw;border-radius: 10px;" mode="aspectFit"></image>
				</view>
				<view class="right-box">
					<view>
						<text style="font-weight: bold;">{{appointment.hospitalName}}</text>
					</view>
					<view style="display: flex;">
						<view style="display: flex;align-items: center;">
							<image src="../../static/icon/location.svg" style="width: 16px;height: 16px;"></image>
						</view>
						<view class="location-box" @click="toLocation(appointment.longitude,appointment.latitude,appointment.hospitalName)">
							<text style="color: gray;">{{appointment.location}}</text>
						</view>
						
					</view>
				</view>
				
			</view>
			<view>
				<text v-if="appointment.status=='已取消'" style="color: crimson;">已取消</text>
				<text v-if="appointment.status=='已完成'" style="color: darkgreen;">已完成</text>
				<text v-if="appointment.status=='已过期'" style="color: gray;">已过期</text>
			</view>
			<view class="line" style="height: 1upx;background-color: #ccc;margin-top: 5px;"></view>
			<view  style="    display: flex;justify-content: flex-end;padding: 5px;">
				<button v-if="appointment.status=='待处理'" class="mini-btn" type="warn" size="mini" style="margin: initial;    border-radius: 50px;"
					@click="cancelAppointment(appointment)">取消预约</button>
			</view>
		</view>	
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
	export default {
		data() {
			return {
				appointments:[],
				defaultPic: 'http://images.yndzyf.com/getimage.ashx?mlszh=21946710',
			}
		},
		onShow() {
			this.getAppointment()
		},
		methods: {
			async cancelAppointment(appointment){
				var data1 = {
					openid: uni.getStorageSync("openid"),
					phone: uni.getStorageSync("phone"),
					type: "用户",
					appointmentId: appointment.id,
					origin_status: appointment.status,
					status:"已取消",
				}
				const url = '/api/appointment/updateAppointmentStatus';
				const method = 'POST'; 
				const data = data1
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					
					if(response.data.flag==99){
						uni.showToast({
							title:"取消预约成功!",
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
			toLocation(longitude,latitude,name){
				uni.openLocation({
					latitude: latitude,
					longitude: longitude,
					name: name,
				})
			},
			async getAppointment(){
				var data1 = {
					openid: uni.getStorageSync("openid"),
					phone: uni.getStorageSync("phone"),
					type: "用户"
				}
				const url = '/api/appointment/getAppointment';
				const method = 'POST'; 
				const data = data1
				try {
					const response = await request('yzy_app', url, method, data);
					console.log(response);		//统一格式：{"data":{}, "flag":99, "result":"成功"}
					
					if(response.data.flag==99){
						this.appointments=response.data.data
						
					}else{
						
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
.yy-button{
	border-radius: 10px;
	width: 80px;
	text-align: center;
	background: #1296DB;
	color: #fff;
}	
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
.location-box{
	line-height: 16px;
	overflow: hidden;
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 3; /** 显示的行数 **/
}	
.left-box{
	max-width: 30%;
	
}
.right-box{
	margin-left: 10px;
	max-width: 75%;
}	
.hospital-card	{
	width: 92vw;
	padding: 2vw;
	background: #fff;
	border-radius: 10px;
	margin-bottom: 10px;
}
.date-container {
  background: #1296DB;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.date-item {
  text-align: center;
  line-height: 19px;
  border: 2px solid transparent; /* 初始状态无边框 */
  border-radius: 10px; /* 圆角效果 */
}

.date {
  font-size: 15px;
  color: #fff;
}
.date-item.selected {
  border-color: #fff; /* 点击后显示黑色边框 */
}
.day {
  font-size: 14px;
  color: #fff;
}
page{
	background: #F2F3F5;
}
</style>
