(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/goods_user/goods_user"],{214:function(e,n,t){"use strict";(function(e){var n=t(3);t(22);n(t(21));var o=n(t(215));my.__webpack_require_UNI_MP_PLUGIN__=t,e(o.default)}).call(this,t(1)["createPage"])},215:function(e,n,t){"use strict";t.r(n);var o=t(216),r=t(218);for(var s in r)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(s);t(220);var i,u=t(68),a=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);a.options.__file="pages/goods_user/goods_user.vue",n["default"]=a.exports},216:function(e,n,t){"use strict";t.r(n);var o=t(217);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},217:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return i})),t.d(n,"recyclableRender",(function(){return s})),t.d(n,"components",(function(){return o}));try{o={uniTag:function(){return t.e("uni_modules/uni-tag/components/uni-tag/uni-tag").then(t.bind(null,528))},uniPopup:function(){return t.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(t.bind(null,521))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement,t=(e._self._c,e.__map(e.goodsUser,(function(n,t){var o=e.__get_orig(n),r=e.calculateAge(n.birthday);return{$orig:o,m0:r}})));e.$mp.data=Object.assign({},{$root:{l0:t}})},s=!1,i=[];r._withStripped=!0},218:function(e,n,t){"use strict";t.r(n);var o=t(219),r=t.n(o);for(var s in o)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(s);n["default"]=r.a},219:function(e,n,t){"use strict";(function(e){var o=t(3);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=o(t(26)),s=o(t(28)),i=o(t(29)),u=function(){t.e("components/user/add_goods_user").then(function(){return resolve(t(595))}.bind(null,t)).catch(t.oe)},a={name:"user-id-card-verify",components:{addGoodsUser:u},data:function(){return{index:0,frontImage:null,backImage:null,popup:!0,popupidverify:!0,msg:"",authObj:{goodsUserName:"",idCard:"",phone:"",relationship:"",sex:"",openid:e.getStorageSync("openid")},goodsUser:[],isEnableClick:!0,choiceObj:null,backToConsultationDirectly:null}},mounted:function(){this.getGoodsUser()},onLoad:function(e){"true"==e.openAddUser&&(this.showAddFrame(),this.backToConsultationDirectly=!0)},onUnload:function(){e.$emit("pageClosed","Success")},methods:{fatherMethods:function(e){console.log("父组件方法",e),this.addOver(e)},addOver:function(n){this.getGoodsUser(),this.$refs.popup.close(),!0===this.backToConsultationDirectly&&e.navigateBack()},getGoodsUser:function(){var n=this;return(0,s.default)(r.default.mark((function t(){var o,s,u,a;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return o="/api/user/getGoodsUser",s="POST",u={openid:e.getStorageSync("openid"),phone:e.getStorageSync("phone")},t.prev=3,t.next=6,(0,i.default)("yzy_app",o,s,u);case 6:a=t.sent,console.log(a),99==a.code&&(n.goodsUser=a.data.data,null!=n.goodsUser&&n.goodsUser.sort((function(e,n){return"本人"===e.relationship&&"本人"!==n.relationship?-1:"本人"!==e.relationship&&"本人"===n.relationship?1:"本人"===e.relationship&&"本人"===n.relationship?e.id-n.id:0}))),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](3),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[3,11]])})))()},deleteUser:function(n){var t=this;return(0,s.default)(r.default.mark((function o(){var s;return r.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(0!=t.isEnableClick){o.next=2;break}return o.abrupt("return");case 2:s=t,e.showModal({title:"删除",content:"是否删除该用药人",success:function(t){if(t.confirm)e.showLoading({title:"删除中..."}),s.postDeleteRequest(n);else if(t.cancel)return}});case 4:case"end":return o.stop()}}),o)})))()},postDeleteRequest:function(n){var t=this;return(0,s.default)(r.default.mark((function o(){var s,u,a,c;return r.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return s="/api/user/delGoodsUser",u="POST",a={openid:e.getStorageSync("openid"),id:n.id},o.prev=3,o.next=6,(0,i.default)("yzy_app",s,u,a);case 6:c=o.sent,console.log(c),99==c.code?(e.showToast({title:"成功"}),t.getGoodsUser()):e.showToast({title:c.data.sm}),e.hideLoading(),o.next=15;break;case 12:o.prev=12,o.t0=o["catch"](3),console.log(o.t0);case 15:e.hideLoading();case 16:case"end":return o.stop()}}),o,null,[[3,12]])})))()},calculateAge:function(e){var n=new Date(e.substr(0,4),e.substr(4,2)-1,e.substr(6,2)),t=new Date,o=t-n,r=Math.floor(o/31536e6);return r},hideCode:function(){this.popup=!0},hideCode2:function(){0!=this.isEnableClick?this.popupidverify=!0:console.log("正在验证,不给退出")},showAddFrame:function(){this.$refs.popup.open("center")}}};n.default=a}).call(this,t(1)["default"])},220:function(e,n,t){"use strict";t.r(n);var o=t(221),r=t.n(o);for(var s in o)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(s);n["default"]=r.a},221:function(e,n,t){}},[[214,"common/runtime","common/vendor"]]]);