(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subPackage_appointment/appointment/submit_appointment"],{427:function(e,t,n){"use strict";(function(e,t){var o=n(4);n(26);o(n(25));var s=o(n(428));e.__webpack_require_UNI_MP_PLUGIN__=n,t(s.default)}).call(this,n(1)["default"],n(2)["createPage"])},428:function(e,t,n){"use strict";n.r(t);var o=n(429),s=n(431);for(var r in s)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return s[e]}))}(r);n(433);var i,a=n(72),u=Object(a["default"])(s["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);u.options.__file="subPackage_appointment/appointment/submit_appointment.vue",t["default"]=u.exports},429:function(e,t,n){"use strict";n.r(t);var o=n(430);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},430:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return s})),n.d(t,"staticRenderFns",(function(){return i})),n.d(t,"recyclableRender",(function(){return r})),n.d(t,"components",(function(){return o}));try{o={uniForms:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-forms/components/uni-forms/uni-forms")]).then(n.bind(null,724))},uniFormsItem:function(){return n.e("uni_modules/uni-forms/components/uni-forms-item/uni-forms-item").then(n.bind(null,733))},uniEasyinput:function(){return n.e("uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput").then(n.bind(null,740))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var s=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.persons,(function(t,n){var o=e.__get_orig(t),s=e.calculateAge(t.birthday);return{$orig:o,m0:s}})));e._isMounted||(e.e0=function(t,n,o){var s=arguments[arguments.length-1].currentTarget.dataset,r=s.eventParams||s["event-params"];n=r.index,o=r.person;e.selectPersonIndex=n,e.selectPersonId=o.id,e.selectPerson=o}),e.$mp.data=Object.assign({},{$root:{l0:n}})},r=!1,i=[];s._withStripped=!0},431:function(e,t,n){"use strict";n.r(t);var o=n(432),s=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=s.a},432:function(e,t,n){"use strict";(function(e){var o=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s,r=o(n(30)),i=o(n(11)),a=o(n(32)),u=o(n(5)),c=o(n(33)),l={data:function(){return{hospital:{hospitalName:"",location:""},disabled:!1,persons:[],appointmentDate:null,selectPersonIndex:null,selectPersonId:null,selectPerson:null,morningSlots:["9:00","9:30","10:00","10:30","11:00","11:30"],afternoonSlots:["14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"],selectedTime:null,department:["内科","外科"],selectedDepartment:null,countdown:30,timer:null,buttonLabel:"确认",patientPhone:"",validInput:!1,schedule:null,departmentInfo:"",doctor:""}},onShow:function(){this.getGoodsUser()},onLoad:function(e){this.hospital=JSON.parse(decodeURIComponent(e.hospital)),this.appointmentDate=JSON.parse(decodeURIComponent(e.date)),this.schedule=JSON.parse(decodeURIComponent(e.schedule)),this.departmentInfo=JSON.parse(decodeURIComponent(e.departmentInfo)),this.doctor=JSON.parse(decodeURIComponent(e.doctor))},beforeDestroy:function(){clearInterval(this.timer)},methods:(s={generateTimeSlots:function(e){for(var t=e.split("~"),n=(0,u.default)(t,2),o=n[0],s=n[1],r=o.split(":").map(Number),i=(0,u.default)(r,2),a=i[0],c=(i[1],s.split(":").map(Number)),l=(0,u.default)(c,2),d=l[0],p=(l[1],[]),f=a;f<=d;f++)for(var h=0;h<60;h+=30){var m=f.toString().padStart(2,"0"),g=h.toString().padStart(2,"0");p.push("".concat(m,":").concat(g))}return p},initTimeSlot:function(){var e=this.schedule.moringWorkHours,t=this.schedule.afternoonWorkHours;this.morningSlots=this.generateTimeSlots(e),this.afternoonSlots=this.generateTimeSlots(t)},onInput:function(){var e=this.patientPhone,t=e.replace(/[^\d]/g,"");this.validInput=!1,/^\d{11}$/.test(t)?(console.log("hefa"),this.patientPhone=t,this.validInput=!0):this.patientPhone=t.slice(0,11)}},(0,i.default)(s,"onInput",(function(){var e=this.patientPhone,t=e.replace(/\D/g,"");this.validInput=!1,t.length>11?this.patientPhone=t.slice(0,11):(this.patientPhone=t,/^1[3456789]\d{9}$/.test(t)&&(this.validInput=!0))})),(0,i.default)(s,"submit",(function(){var t=this;return(0,a.default)(r.default.mark((function n(){var o,s,i,a,u;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.showLoading({title:" 预约中...",mask:!0}),o={openid:e.getStorageSync("openid"),appointmentUserPhone:e.getStorageSync("phone"),patientName:t.selectPerson.goodsUserName,patientPhone:t.selectPerson.phone,appointmentTime:t.appointmentDate,appointmentHospitalId:t.hospital.id,appointmentDoctorScheduleId:t.schedule.id,departmentId:t.schedule.departmentId},s="/api/appointment/generateAppointment",i="POST",a=o,n.prev=5,n.next=8,(0,c.default)("yzy_app",s,i,a);case 8:u=n.sent,console.log(u),99==u.data.flag?(e.showToast({title:"预约成功!请按时前往预约点",icon:"none",mask:!0,duration:1300}),setTimeout((function(){e.redirectTo({url:"/subPackage_appointment/user_queryAppointment/user_queryAppointment"})}),1300)):e.showToast({title:"预约失败!"+u.data.sm,icon:"none",mask:!0}),n.next=17;break;case 13:n.prev=13,n.t0=n["catch"](5),console.log(n.t0),e.hideLoading();case 17:console.log(a);case 18:case"end":return n.stop()}}),n,null,[[5,13]])})))()})),(0,i.default)(s,"clickSubmit",(function(){this.selectPersonId?this.validInput?this.disabled?e.showToast({title:"您的预约太频繁",icon:"none",duration:2e3}):(this.startCountdown(),this.submit()):e.showToast({title:"请正确输入电话号码",icon:"none",duration:2e3}):e.showToast({title:"请正确输入/选择必填项",icon:"none",duration:2e3})})),(0,i.default)(s,"startCountdown",(function(){var e=this;this.disabled=!0,this.buttonLabel="".concat(this.countdown," s"),this.timer=setInterval((function(){e.countdown>0?(e.countdown--,e.buttonLabel="".concat(e.countdown," s")):e.stopCountdown()}),1e3)})),(0,i.default)(s,"stopCountdown",(function(){clearInterval(this.timer),this.disabled=!1,this.buttonLabel="确认",this.countdown=30})),(0,i.default)(s,"selectDepartment",(function(e){this.selectedDepartment=e})),(0,i.default)(s,"selectTime",(function(e){this.selectedTime=e})),(0,i.default)(s,"checkPerson",(function(){console.log("toaddgoodsuser"),e.navigateTo({url:"/pages/goods_user/goods_user?openAddUser=true"})})),(0,i.default)(s,"getGoodsUser",(function(){var t=this;return(0,a.default)(r.default.mark((function n(){var o,s,i,a,u;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o="/api/user/getGoodsUser",s="POST",i={openid:e.getStorageSync("openid"),phone:e.getStorageSync("phone")},n.prev=3,n.next=6,(0,c.default)("yzy_app",o,s,i);case 6:a=n.sent,console.log(a),99==a.code?(t.persons=a.data.data,null==t.persons&&0==t.persons.length||(t.persons.sort((function(e,t){return"本人"===e.relationship&&"本人"!==t.relationship?-1:"本人"!==e.relationship&&"本人"===t.relationship?1:"本人"===e.relationship&&"本人"===t.relationship?e.id-t.id:0})),u=t.persons.findIndex((function(e){return"本人"===e.relationship})),-1!==u?(t.selectPersonIndex=u,t.selectPersonId=t.persons[u].id,t.selectPerson=t.persons[u]):t.persons.length)):(e.$showMsg(a.msg,3e3),t.hasNextSmarthosId=!1),n.next=15;break;case 11:n.prev=11,n.t0=n["catch"](3),e.$showMsg(n.t0,3e3),t.hasNextSmarthosId=!1;case 15:case"end":return n.stop()}}),n,null,[[3,11]])})))()})),(0,i.default)(s,"calculateAge",(function(e){var t=new Date(e.substr(0,4),e.substr(4,2)-1,e.substr(6,2)),n=new Date,o=n-t,s=Math.floor(o/31536e6);return s})),s)};t.default=l}).call(this,n(2)["default"])},433:function(e,t,n){"use strict";n.r(t);var o=n(434),s=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=s.a},434:function(e,t,n){}},[[427,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subPackage_appointment/appointment/submit_appointment.js.map