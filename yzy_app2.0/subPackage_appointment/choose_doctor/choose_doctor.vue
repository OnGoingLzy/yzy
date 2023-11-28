<template>
	<view>
		<!-- 顶部七天日期 -->
		<view class="date-container">
			<view
				v-for="(day, index) in sevenDays"
				:key="index"
				class="date-item"
				@click="selectDay(index)"
				:class="{ 'selected': selectedIndex === index }"
			>	
				<view><text class="day">{{ day.day }}</text></view>
				<view>
					<text class="date">{{ day.date }}</text>
				</view>
				
			  </view>
		</view>
		
		<view v-for="(item,i) in filterDoctor" :key="i" class="doctor-card" @click="openChooseSchedule(item)">
			<view style="    align-items: center;display: flex;justify-content: center;">
				<image src="/static/icon/avatar.png" class="avatar"></image>
			</view>
			<view style="margin-left: 10px;">
				<view>
					<text>{{item.name}}</text>
				</view>
				<view>
					<text style="font-size: 11px;color: gray;">{{item.position}}</text>
				</view><view>
					<text style="font-size: 12px;color: gray;">{{'擅长：'+item.note}}</text>
				</view>
			</view>
			<view style="margin-left: auto;">
				<view>
					<view :class="item.remainedNum>=0?'tag1':'tag2'">
						<text v-text="item.remainedNum>=0?'可预约':'暂无号'"></text>
					</view>
					<!-- <text>{{'剩余号源：'+ item.remainedNum}}</text> -->
				</view>
			</view>
		</view>
		
		<view v-if="filterDoctor.length==0" style="text-align: center;">
			<view>没有可预约挂号的医生</view>
			<image src="../../static/img/empty3.svg" style="width: 50vw;height: 50vw;padding: 100rpx 0 120rpx 0;"></image>
		</view>
		<uni-popup ref="popup" type="right" background-color="#fff">
			<view>
				<view style="    text-align: center;font-weight: bold;">
					{{selectedDate+' '+ clickDoctor.name + ' ' + clickDoctor.position}}
				</view>
				<view style="text-align: center;width: 100%;padding: 5px;">
					<view>选择时间段：</view>
					<view v-for="(item,i) in schedule" :key="i" style="display: flex;align-items: center;">
						<view @click="toSubmitAppointment(item)" v-if="item.limitNum>item.alreadyAppointmentNum" class="time-slot" >
							{{item.appointmentTimeSlot}}
						</view>
						<view  v-if="item.limitNum<=item.alreadyAppointmentNum" class="time-slot2">
							{{item.appointmentTimeSlot}}
						</view>
						<text>剩余数量：</text>
						<text >{{item.limitNum-item.alreadyAppointmentNum}}</text>
					</view>
				</view>
				
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import request from '@/common/api/request.js'
	export default {
		data() {
			return {
				doctor:[],
				hospital:null,
				departmentSubClass:{},
				sevenDays: [],
				selectedIndex: 0,
				selectedDate: null,
				filterDoctor:[],
				clickDoctor:null, //当前点击的医生
				schedule:null,//弹出层的时间表
				day:"",//当前选择的是周几
			}
		},
		onLoad: function (option) {
			//解析传过来的对象
		
			this.hospital = JSON.parse(decodeURIComponent(option.hospital));
			this.departmentSubClass = JSON.parse(decodeURIComponent(option.departmentSubClass));

			this.generateSevenDays()
			
			
		},
		mounted() {
			this.selectDay(0)
		},
		methods: {
			toSubmitAppointment(schedule1){
				console.log(schedule1)
				var departmentName = this.departmentSubClass.departmentName?this.departmentSubClass.departmentName:""
				uni.redirectTo({
					url:"/subPackage_appointment/appointment/submit_appointment?date="+encodeURIComponent(JSON.stringify(this.selectedDate))+'&schedule='+encodeURIComponent(JSON.stringify(schedule1))+'&hospital='+encodeURIComponent(JSON.stringify(this.hospital))+'&departmentInfo='+encodeURIComponent(JSON.stringify(departmentName+'-'+this.departmentSubClass.subclassName))+'&doctor='+encodeURIComponent(JSON.stringify(this.clickDoctor.name + ' ' + this.clickDoctor.position))
				})
			},
			//设置弹出层时间表
			setSchedule(){
				
				if (!this.clickDoctor || !this.clickDoctor.schedule) {
				    return; // 处理错误或无数据的情况
				  }
				
				  const selectedDate = new Date(this.selectedDate);
				  const selectedDateStr = selectedDate.toISOString().split('T')[0];
				
				  // 筛选符合条件的时间段
				  const filteredSlots = this.clickDoctor.schedule.filter((slot) => {
				    const startWorkTime = new Date(slot.startWorkTime);
				    const endWorkTime = new Date(slot.endWorkTime);
				
				    return selectedDate >= startWorkTime && selectedDate <= endWorkTime;
				  });
				  //console.log(filteredSlots)
				  
				  this.schedule = filteredSlots
				  // 提取并拼接时间段
				  // const appointmentTimeSlots = filteredSlots.map((slot) => slot.appointmentTimeSlot);
				  // this.schedule = appointmentTimeSlots
				  // appointmentTimeSlots 现在包含了所选日期的时间段
				  // console.log(appointmentTimeSlots);
			},
			//弹出选择时间表界面
			openChooseSchedule(doctor){
			  // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
			  this.clickDoctor = doctor
			  this.setSchedule()
			  this.$refs.popup.open('right')
			},
			//根据日期筛选医生
			filterDoctorsByDate() {
				console.log("筛选医生")
				var that = this
				var targetDate = this.selectedDate
				var day = this.day //现在周几
				
				//筛选法1
				// var filteredData = this.doctor.filter((doctor1) => {
				// 	// 使用 some 方法检查医生的时间表是否包含目标日期
				// 	if(doctor1.schedule){
				// 		return doctor1.schedule.some((schedule) => {
				// 		const startDate = new Date(schedule.startWorkTime);
				// 		const endDate = new Date(schedule.endWorkTime);
				// 		const targetDateObj = new Date(targetDate);
				// 		// 根据day和schedule.isWeekendWork来筛选医生
				// 		const isWeekendDay = day === "周六" || day === "周日";
				// 		const isWeekendWork = schedule.isWeekendWork === "y";
				// 		return (
				// 			targetDateObj >= startDate &&
				// 			targetDateObj <= endDate &&
				// 			(isWeekendDay ? isWeekendWork : true)
				// 		);			
						
				// 		});
						
				// 	}		
			 //  });
			 //--- 筛选法2
			 // var filteredData = this.doctor.reduce((result, doctor1) => {
			 //   if (doctor1.schedule && doctor1.schedule.some((schedule) => {
			 //     const startDate = new Date(schedule.startWorkTime);
			 //     const endDate = new Date(schedule.endWorkTime);
			 //     const targetDateObj = new Date(targetDate);
			 //     const isWeekendDay = day === "周六" || day === "周日";
			 //     const isWeekendWork = schedule.isWeekendWork === "y";
			 //     return targetDateObj >= startDate && targetDateObj <= endDate && (isWeekendDay ? isWeekendWork : true);
			 //   })) {
			 //     result.push(doctor1);
			 //   }
			 //   return result;
			 // }, []);
			 
			 //筛选法3
			var filteredData = [];
			var len = this.doctor.length;
			for (var i = 0; i < len; i++) {
			  var doctor1 = this.doctor[i];
			  
			  if (doctor1.schedule) {
				var scheduleLen = doctor1.schedule.length;
				for (var j = 0; j < scheduleLen; j++) {
				  var schedule = doctor1.schedule[j];
				  var startDate = new Date(schedule.startWorkTime);
				  var endDate = new Date(schedule.endWorkTime);
				  var targetDateObj = new Date(targetDate);
				  var isWeekendDay = day === "周六" || day === "周日";
				  var isWeekendWork = schedule.isWeekendWork === "y";
				  if (
					targetDateObj >= startDate &&
					targetDateObj <= endDate &&
					(isWeekendDay ? isWeekendWork : true)
				  ) {
					filteredData.push(doctor1);
					break; // 医生满足条件，退出内层循环
				  }
				}
			  }
			}

			  console.log(filteredData)
			  this.filterDoctor=filteredData
			
			},
			//计算剩余号源数
			calculateRemainedNum(){

				this.filterDoctor.forEach((doctor) => {
				  // 初始化剩余数量为0
				  let remainedNum = 0;
				  
				  if (doctor.schedule) {
				    doctor.schedule.forEach((schedule) => {
				      // 计算剩余数量：limitNum之和减去alreadyAppointmentNum之和
				      remainedNum += (schedule.limitNum || 0) - (schedule.alreadyAppointmentNum || 0);
				    });
				  }
			
				  // 将计算的剩余数量赋值给每个医生对象的 remainedNum 属性
				  doctor.remainedNum = remainedNum;
				});
			},
			// 生成七天日期和星期几
			generateSevenDays() {
			  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
			  const today = new Date();
			
			  for (let i = 0; i < 7; i++) {
			    const date = new Date(today);
			    date.setDate(today.getDate() + i);
			    const dayOfWeek = days[date.getDay()];
			    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
			    const day = date.getDate().toString().padStart(2, '0');   //必须两位的日期与月份，不然ios端不兼容该日期
			    const formattedDate = `${month}-${day}`;
			
			    if (i === 0) {
			      // 如果是当天，将 dayOfWeek 设置为 "今天"
			      this.sevenDays.push({ date: formattedDate, day: '今天' });
			    } else {
			      this.sevenDays.push({ date: formattedDate, day: dayOfWeek });
			    }
			  }
			},

			selectDay(index) {
			  uni.showLoading({
			  	title:"loading...",
				mask:true
			  })
			  const today = new Date();
			  const currentYear = today.getFullYear();
			  this.selectedIndex = index;
			  this.selectedDate = currentYear+'-'+this.sevenDays[index].date;
			  this.day = this.sevenDays[index].day
			  var that = this
			  this.getDoctor(this.selectedDate,"day") 
			  
			  
			},
			async getDoctor(date,type){
				var that = this
				const url = '/api/appointment/getDoctor';
				const method = 'POST'; 
				const data = {
					departmentSubClassId: this.departmentSubClass.id,
					hospitalId:this.hospital.id,
					type:type,
					date:date
				};
				try {
					const response = await request('yzy_app', url, method, data);
						//统一格式：{"data":{}, "flag":99, "result":"成功"}
						console.log(response)
					if(response.code == 99 && response.data.data){
						
						if(type=='week'){
							this.doctor = response.data.data
							setTimeout(function(){
								that.calculateRemainedNum()
								uni.hideLoading()			 
							},500)
							
						}else{
							this.doctor = response.data.data
							setTimeout(function(){
								that.filterDoctorsByDate()
								that.calculateRemainedNum()
								uni.hideLoading()			 
							},500)
						}
						
					}
					else {
						uni.showToast({
							title: '没有查到任何数据',
							icon:"none"
						});
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
	}
</script>

<style>
.tag1{
	padding: 0 2px;
	border-radius: 3px;
	border: #1296DB 1px solid;
	color: #1296DB;
}
.tag2{
	padding: 0 2px;
	border-radius: 3px;
	border: gray 1px solid;
	color: gray;
}
.time-slot{
	color: #1296DB;
	text-align: center;
	margin-top: 5px;
	border-radius: 5px;
	width: 25vw;
	height: 25px;
	border: #1296DB 2px solid;
}
.time-slot2{
	color: gray;
	text-align: center;
	margin-top: 5px;
	border-radius: 5px;
	width: 25vw;
	height: 25px;
	border: gray 2px solid;
}
.date-container {
  background: #1296DB;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.date-item {
	width: 107rpx;
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
.doctor-card{
	display: flex;
	padding: 5px;
	border-bottom: #f2f3f4 1px solid;
}
.avatar{
	width: 36px;
	height: 36px;
	border-radius: 50%;
	border: 2px solid #FFF;
	box-shadow: 0 1px 5px black;
}
</style>
