(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/consultation/consultation"],{"33ed":function(e,t,s){"use strict";var n=s("50f5"),o=s.n(n);o.a},"34a3":function(e,t,s){"use strict";s.r(t);var n=s("ffab"),o=s("61b4");for(var a in o)["default"].indexOf(a)<0&&function(e){s.d(t,e,(function(){return o[e]}))}(a);s("33ed");var i=s("f0c5"),r=Object(i["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);t["default"]=r.exports},"441c":function(e,t,s){"use strict";(function(e){var n=s("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(s("2eee")),a=n(s("448a")),i=n(s("c973")),r=n(s("24db")),c={data:function(){return{goodsId:"",shopId:"",stock:10,stockLimit:100,persons:[],selectPersonIndex:null,selectButton:"无",diseaseList:[""],selectDiseaseIndex:null,checkboxSelected:!1,hasNextSmarthosId:!1,drugAmount:1,selectDiseaseName:null,selectPersonId:null,clinicUrl:"",hosId:"",accessToken:"",isConsultateFinished:!1}},computed:{maxBuyNum:function(){return this.stockLimit>0?this.stock<this.stockLimit?this.stock:this.stockLimit:this.stock}},methods:{openReadText:function(){e.navigateTo({url:"../agreement/agreement"})},checkboxChange:function(){this.checkboxSelected=!this.checkboxSelected},consultateNextStep:function(){if(null!==this.selectPersonIndex)if(null!==this.selectDiseaseIndex)if(!1!==this.checkboxSelected)if(!1!==this.hasNextSmarthosId)if(""===this.clinicUrl)e.showLoading({title:"请稍等..."}),this.consultate();else{var t={url:this.clinicUrl};e.navigateTo({url:"/pages/outer_webview/outer_webview?urlObj="+encodeURIComponent(JSON.stringify(t))})}else e.$showMsg("获取待开方品种失败，请重试！",3e3);else e.$showMsg("请先阅读并知晓《互联网诊疗风险告知及知情同意书》，谢谢！",3e3);else e.$showMsg("请先选择已确诊疾病再进行问诊开方！",3e3);else e.$showMsg("请先选择用药人再进行问诊开方！",3e3)},consultate:function(){var t=this;return(0,i.default)(o.default.mark((function s(){var n,a,i;return o.default.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return"/api/Recipe/consultate","POST",n={goodsId:t.goodsId,allergyHistory:t.selectButton,amount:t.drugAmount,diseaseName:t.selectDiseaseName,personId:t.selectPersonId,shopId:t.shopId},s.prev=3,s.next=6,(0,r.default)("yzy_app","/api/Recipe/consultate","POST",n);case 6:a=s.sent,console.log(a),99==a.code?(e.hideLoading(),t.clinicUrl=a.data,i={url:t.clinicUrl},e.navigateTo({url:"/pages/outer_webview/outer_webview?urlObj="+encodeURIComponent(JSON.stringify(i))})):(e.hideLoading(),e.$showMsg(a.msg,5e3)),s.next=15;break;case 11:s.prev=11,s.t0=s["catch"](3),e.hideLoading(),e.$showMsg(s.t0,3e3);case 15:case"end":return s.stop()}}),s,null,[[3,11]])})))()},getDisease:function(){var t=this;return(0,i.default)(o.default.mark((function s(){var n,i;return o.default.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return e.showLoading({mask:!0,title:"加载中..."}),"/api/Recipe/getDisease","POST",n={goodsId:t.goodsId},s.prev=4,s.next=7,(0,r.default)("yzy_app","/api/Recipe/getDisease","POST",n);case 7:i=s.sent,console.log(i),99==i.code?(t.diseaseList=JSON.parse(i.data),t.diseaseList=(0,a.default)(new Set(t.diseaseList)),t.diseaseList=Array.from(t.diseaseList),t.hasNextSmarthosId=!0):(e.$showMsg(i.msg,3e3),t.hasNextSmarthosId=!1),setTimeout((function(){e.hideLoading()}),100),s.next=17;break;case 13:s.prev=13,s.t0=s["catch"](4),e.$showMsg(s.t0,3e3),t.hasNextSmarthosId=!1;case 17:case"end":return s.stop()}}),s,null,[[4,13]])})))()},checkPerson:function(){e.navigateTo({url:"../goods_user/goods_user?openAddUser=true"})},getGoodsUser:function(){var t=this;return(0,i.default)(o.default.mark((function s(){var n,a,i;return o.default.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return"/api/user/getGoodsUser","POST",n={openid:e.getStorageSync("openid"),phone:e.getStorageSync("phone")},s.prev=3,s.next=6,(0,r.default)("yzy_app","/api/user/getGoodsUser","POST",n);case 6:a=s.sent,console.log(a),99==a.code?(t.persons=a.data.data,null==t.persons&&0==t.persons.length||(t.persons.sort((function(e,t){return"本人"===e.relationship&&"本人"!==t.relationship?-1:"本人"!==e.relationship&&"本人"===t.relationship?1:"本人"===e.relationship&&"本人"===t.relationship?e.id-t.id:0})),i=t.persons.findIndex((function(e){return"本人"===e.relationship})),-1!==i?(t.selectPersonIndex=i,t.selectPersonId=t.persons[i].id):t.persons.length)):(e.$showMsg(a.msg,3e3),t.hasNextSmarthosId=!1),s.next=15;break;case 11:s.prev=11,s.t0=s["catch"](3),e.$showMsg(s.t0,3e3),t.hasNextSmarthosId=!1;case 15:case"end":return s.stop()}}),s,null,[[3,11]])})))()},calculateAge:function(e){var t=new Date(e.substr(0,4),e.substr(4,2)-1,e.substr(6,2)),s=new Date,n=s-t,o=Math.floor(n/31536e6);return o},getRecipeStatus:function(t){var s=this;return(0,i.default)(o.default.mark((function n(){var a,i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return"/api/Recipe/getRecipeStatus","POST",a={clinicId:t},n.prev=3,n.next=6,(0,r.default)("yzy_app","/api/Recipe/getRecipeStatus","POST",a);case 6:i=n.sent,console.log(i),99==i.code?s.persons=i.data.data:(e.$showMsg(i.msg,3e3),s.hasNextSmarthosId=!1),n.next=15;break;case 11:n.prev=11,n.t0=n["catch"](3),e.$showMsg(n.t0,3e3),s.hasNextSmarthosId=!1;case 15:case"end":return n.stop()}}),n,null,[[3,11]])})))()}},created:function(){},onLoad:function(t){var s=this;this.goodsId=t.goodsId,this.shopId=t.shopId,this.drugAmount=parseInt(t.goodsAmount),this.stockLimit=parseInt(t.stockLimit),this.stock=parseInt(t.stock),this.getDisease(),this.getGoodsUser(),console.log(t),e.$on("pageClosed",(function(e){s.getGoodsUser(),s.selectPersonIndex=null})),e.$on("orderEnd",(function(t){s.isConsultateFinished=!0,e.showToast({duration:3e3,mask:!0,title:"问诊完成，请等待审方完成继续购药",icon:"none"}),setTimeout((function(){e.redirectTo({url:"/pages/user_recipe/user_recipe?clinicId="+t.clinicId})}),3e3)}))}};t.default=c}).call(this,s("543d")["default"])},"50f5":function(e,t,s){},"61b4":function(e,t,s){"use strict";s.r(t);var n=s("441c"),o=s.n(n);for(var a in n)["default"].indexOf(a)<0&&function(e){s.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},bf3e:function(e,t,s){"use strict";(function(e,t){var n=s("4ea4");s("7711");n(s("66fd"));var o=n(s("34a3"));e.__webpack_require_UNI_MP_PLUGIN__=s,t(o.default)}).call(this,s("bc2e")["default"],s("543d")["createPage"])},ffab:function(e,t,s){"use strict";s.d(t,"b",(function(){return o})),s.d(t,"c",(function(){return a})),s.d(t,"a",(function(){return n}));var n={uniNumberBox:function(){return s.e("uni_modules/uni-number-box/components/uni-number-box/uni-number-box").then(s.bind(null,"958a"))},uniTag:function(){return s.e("uni_modules/uni-tag/components/uni-tag/uni-tag").then(s.bind(null,"ccec"))}},o=function(){var e=this,t=e.$createElement,s=(e._self._c,e.__map(e.persons,(function(t,s){var n=e.__get_orig(t),o=e.calculateAge(t.birthday);return{$orig:n,m0:o}})));e._isMounted||(e.e0=function(t,s,n){var o=arguments[arguments.length-1].currentTarget.dataset,a=o.eventParams||o["event-params"];s=a.index,n=a.person;e.selectPersonIndex=s,e.selectPersonId=n.id},e.e1=function(t){e.selectButton="有"},e.e2=function(t){e.selectButton="无"},e.e3=function(t,s,n){var o=arguments[arguments.length-1].currentTarget.dataset,a=o.eventParams||o["event-params"];s=a.index,n=a.item;e.selectDiseaseIndex=s,e.selectDiseaseName=n}),e.$mp.data=Object.assign({},{$root:{l0:s}})},a=[]}},[["bf3e","common/runtime","common/vendor"]]]);