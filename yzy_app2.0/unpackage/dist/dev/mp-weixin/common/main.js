(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{0:function(e,t,n){"use strict";(function(e,t,o){var r=n(4),a=r(n(11));n(26);var u=r(n(25)),c=r(n(27)),i=r(n(73)),l=r(n(77)),f=r(n(78)),s=n(79);function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){(0,a.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}e.__webpack_require_UNI_MP_PLUGIN__=n,u.default.config.productionTip=!1,u.default.prototype.$store=i.default,u.default.mixin(l.default),u.default.mixin(f.default),t.$http=s.$http,s.$http.baseUrl="https://appletservice.dyb.yn.cn",s.$http.beforeRequest=function(e){t.showLoading({title:"数据加载中..."}),-1!==e.url.indexOf("/my/")&&(e.header={Authorization:i.default.state.m_user.token})},s.$http.afterRequest=function(){t.hideLoading()},u.default.prototype.navigateTo=function(e){if(!i.default.state.user.loginStatus)return t.showToast({title:"请先登录",icon:"none"}),t.navigateTo({url:"/pages/login/login"});t.redirectTo(e)},c.default.mpType="app";var h=new u.default(p({store:i.default},c.default));o(h).$mount(),t.$showMsg=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"数据请求失败！",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;t.showToast({title:e,duration:n,icon:"none",mask:!0})}}).call(this,n(1)["default"],n(2)["default"],n(2)["createApp"])},27:function(e,t,n){"use strict";n.r(t);var o=n(28);for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n(70);var a,u,c,i,l=n(72),f=Object(l["default"])(o["default"],a,u,!1,null,null,null,!1,c,i);f.options.__file="App.vue",t["default"]=f.exports},28:function(e,t,n){"use strict";n.r(t);var o=n(29),r=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},29:function(e,t,n){"use strict";(function(e){var o=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n(30)),a=o(n(5)),u=o(n(32)),c=o(n(33)),i={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")},data:{code:"",openid:""},methods:{getOpenid:function(){var t=this;return(0,u.default)(r.default.mark((function n(){var o,u,i,l,f,s,d;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.login().catch((function(e){return e}));case 2:return o=n.sent,u=(0,a.default)(o,2),u[0],i=u[1],t.code=i.code,l="/api/Example/getOpenid",f="POST",s={js_code:t.code,secret:""},n.prev=10,n.next=13,(0,c.default)("yzy_app",l,f,s);case 13:d=n.sent,99==d.code?(e.setStorageSync("openid",d.data.openid),console.log("99"+d.data)):console.log("-99"+d.data),n.next=20;break;case 17:n.prev=17,n.t0=n["catch"](10),console.log(n.t0);case 20:case"end":return n.stop()}}),n,null,[[10,17]])})))()},checkUserExist:function(e){return(0,u.default)(r.default.mark((function t(){var n,o,a,u;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n="/api/user/checkUserExist",o="POST",a={openid:e},t.prev=3,t.next=6,(0,c.default)("yzy_app",n,o,a);case 6:u=t.sent,99==u.code?console.log("99"+u.data):console.log("-99"+u.data),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](3),console.log(t.t0);case 13:case"end":return t.stop()}}),t,null,[[3,10]])})))()}}};t.default=i}).call(this,n(2)["default"])},70:function(e,t,n){"use strict";n.r(t);var o=n(71),r=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},71:function(e,t,n){}},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map