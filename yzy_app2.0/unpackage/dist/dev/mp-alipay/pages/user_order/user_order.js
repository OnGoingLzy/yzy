(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/user_order/user_order"],{130:function(t,e,r){"use strict";(function(t){var e=r(3);r(22);e(r(21));var n=e(r(131));my.__webpack_require_UNI_MP_PLUGIN__=r,t(n.default)}).call(this,r(1)["createPage"])},131:function(t,e,r){"use strict";r.r(e);var n=r(132),i=r(134);for(var o in i)["default"].indexOf(o)<0&&function(t){r.d(e,t,(function(){return i[t]}))}(o);r(136);var s,c=r(68),a=Object(c["default"])(i["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],s);a.options.__file="pages/user_order/user_order.vue",e["default"]=a.exports},132:function(t,e,r){"use strict";r.r(e);var n=r(133);r.d(e,"render",(function(){return n["render"]})),r.d(e,"staticRenderFns",(function(){return n["staticRenderFns"]})),r.d(e,"recyclableRender",(function(){return n["recyclableRender"]})),r.d(e,"components",(function(){return n["components"]}))},133:function(t,e,r){"use strict";var n;r.r(e),r.d(e,"render",(function(){return i})),r.d(e,"staticRenderFns",(function(){return s})),r.d(e,"recyclableRender",(function(){return o})),r.d(e,"components",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.searchContent=""})},o=!1,s=[];i._withStripped=!0},134:function(t,e,r){"use strict";r.r(e);var n=r(135),i=r.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){r.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},135:function(t,e,r){"use strict";(function(t){var n=r(3);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(r(26)),o=n(r(28)),s=n(r(29)),c=function(){Promise.all([r.e("common/vendor"),r.e("components/order/order_card")]).then(function(){return resolve(r(542))}.bind(null,r)).catch(r.oe)},a={components:{orderCard:c},data:function(){return{choiceBar:"test0",orderList:[],filterOrderList:[],searchContent:""}},onLoad:function(t){console.log(t.num),this.choiceBar=t.num,this.getOrderList()},watch:{},onShow:function(){},onPullDownRefresh:function(){console.log("refresh"),this.searchOrder(),setTimeout((function(){t.stopPullDownRefresh()}),1e3),this.getOrderList()},methods:{toPublicAccount:function(){t.navigateTo({url:"/pages/public_account/public_account"})},searchOrder:function(){var e=this;t.showLoading({title:"查询中..."}),this.selectBar(this.choiceBar),""===this.searchContent||(this.filterOrderList=this.filterOrderList.filter((function(t){var r=t.goodsList.some((function(t){return t.genericName&&t.genericName.includes(e.searchContent)})),n=t.shopInfo.some((function(t){return t.shopName&&t.shopName.includes(e.searchContent)})),i=t.main_order_id&&t.main_order_id.includes(e.searchContent),o=t.status&&t.status.includes(e.searchContent);return r||n||i||o}))),t.hideLoading()},calcTotalPriceAndNum:function(){null!=this.orderList&&0!=this.orderList.length&&this.orderList.forEach((function(t){var e=0,r=0;t.goodsList.forEach((function(t){e+=t.num,r+=t.totalPrice})),t.totalNum=e,t.totalPrice=r+t.shippingFee;var n=t.totalPrice,i=n.toString(),o=i.match(/^-?\d+(?:\.\d{0,2})?/),s=o?o[0]:"";t.totalPrice=s}))},getOrderList:function(){var e=this;return(0,o.default)(i.default.mark((function r(){var n,o,c,a;return i.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t.showLoading({title:"查询中"}),n="/api/trade/getOrderList",o="POST",c={openid:t.getStorageSync("openid")},r.prev=4,r.next=7,(0,s.default)("yzy_app",n,o,c);case 7:a=r.sent,console.log(a),99==a.code&&(a.data.data?(e.orderList=a.data.data,e.selectBar(e.choiceBar),e.calcTotalPriceAndNum(),t.hideLoading()):(t.hideLoading(),t.showToast({title:"没查到订单信息",icon:"none"}))),r.next=16;break;case 12:r.prev=12,r.t0=r["catch"](4),console.log(r.t0),t.showToast({icon:"none",title:"服务器出错了"});case 16:case"end":return r.stop()}}),r,null,[[4,12]])})))()},selectBar:function(e){if(t.showLoading({title:"查询中"}),console.log(e),this.choiceBar=e,null!=this.orderList&&0!=this.orderList.length){if("test0"==e)this.filterOrderList=this.orderList;else if("test1"==e){var r=this.orderList.filter((function(t){return"待付款"===t.status}));this.filterOrderList=r}else if("test2"==e){var n=this.orderList.filter((function(t){return"待发货"===t.status}));this.filterOrderList=n}else if("test3"==e){var i=this.orderList.filter((function(t){return"待收货"===t.status}));this.filterOrderList=i}else{var o=this.orderList.filter((function(t){return"待退款"===t.status||"已退款"===t.status||"退款中"===t.status||"退款待审核"===t.status||"已取消"===t.status}));this.filterOrderList=o}setTimeout((function(){t.hideLoading()}),1e3)}else t.hideLoading()}}};e.default=a}).call(this,r(1)["default"])},136:function(t,e,r){"use strict";r.r(e);var n=r(137),i=r.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){r.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},137:function(t,e,r){}},[[130,"common/runtime","common/vendor"]]]);