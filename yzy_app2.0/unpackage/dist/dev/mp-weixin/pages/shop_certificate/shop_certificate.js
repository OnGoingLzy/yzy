(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop_certificate/shop_certificate"],{291:function(t,e,n){"use strict";(function(t,e){var o=n(4);n(26);o(n(25));var i=o(n(292));t.__webpack_require_UNI_MP_PLUGIN__=n,e(i.default)}).call(this,n(1)["default"],n(2)["createPage"])},292:function(t,e,n){"use strict";n.r(e);var o=n(293),i=n(295);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n(297);var r,s=n(72),c=Object(s["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],r);c.options.__file="pages/shop_certificate/shop_certificate.vue",e["default"]=c.exports},293:function(t,e,n){"use strict";n.r(e);var o=n(294);n.d(e,"render",(function(){return o["render"]})),n.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(e,"components",(function(){return o["components"]}))},294:function(t,e,n){"use strict";var o;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return r})),n.d(e,"recyclableRender",(function(){return a})),n.d(e,"components",(function(){return o}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=!1,r=[];i._withStripped=!0},295:function(t,e,n){"use strict";n.r(e);var o=n(296),i=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},296:function(t,e,n){"use strict";(function(t){var o=n(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n(30)),a=o(n(32)),r=o(n(33)),s={data:function(){return{shop:null,shopName:{},shopId:{},certificate:[{id:1,shopCertificate:"营业执照",shopCertificateNo:"",shopCertificateUrl:null},{id:2,shopCertificate:"药品经营许可证",shopCertificateNo:"",shopCertificateUrl:null}],markers:[{id:1,latitude:24.833571,longitude:102.839036,title:"云南省医药有限公司",width:40,height:40,iconPath:"/static/icon/location.svg"}],mapheight:"200px",scale:16,latitude:24.83430561,longitude:102.84125743}},onShow:function(){this.shop&&(this.markers=[{id:0,width:40,height:40,callout:{content:"646"},longitude:this.longitude,latitude:this.latitude,iconPath:"/static/icon/location.svg"}])},onLoad:function(t){null!=t.shop?(this.shop=JSON.parse(decodeURIComponent(t.shop)),this.latitude=this.shop.latitude,this.longitude=this.shop.longitude,console.log("have shop")):(console.log(this.shopId),this.getShop(JSON.parse(decodeURIComponent(t.shopId)))),this.shopName=JSON.parse(decodeURIComponent(t.shopName)),this.shopId=JSON.parse(decodeURIComponent(t.shopId))},mounted:function(){this.getShopCertificate()},methods:{toLocation:function(){console.log(this.shop);var e=102.839036,n=24.833571,o="云南省医药有限公司";this.shop&&(e=this.shop.longitude,n=this.shop.latitude,o=this.shop.shopName),t.openLocation({latitude:n,longitude:e,name:o})},getShop:function(t){var e=this;return(0,a.default)(i.default.mark((function n(){var o,a,s,c;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o="/api/shop/getShopBaseInfo",a="POST",s={shopId:t},n.prev=3,n.next=6,(0,r.default)("yzy_app",o,a,s);case 6:c=n.sent,99==c.code&&null!=c.data.data&&(e.shop=c.data.data[0],console.log(e.shop.shopPhone)),n.next=12;break;case 10:n.prev=10,n.t0=n["catch"](3);case 12:case"end":return n.stop()}}),n,null,[[3,10]])})))()},callPhone:function(e){var n=e.match(/\d+-?\d+/g);if(n&&n.length>0){var o=n[0];console.log("提取到的电话号码："+o),t.makePhoneCall({phoneNumber:o})}else console.log("未找到电话号码")},getShopCertificate:function(){var t=this;return(0,a.default)(i.default.mark((function e(){var n,o,a,s;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("获取门店资质"),n="/api/shop/getShopCertificate",o="POST",a={shopId:t.shopId},e.prev=4,e.next=7,(0,r.default)("yzy_app",n,o,a);case 7:s=e.sent,console.log(s),99==s.code&&null!=s.data.data&&(t.certificate=s.data.data),e.next=14;break;case 12:e.prev=12,e.t0=e["catch"](4);case 14:case"end":return e.stop()}}),e,null,[[4,12]])})))()}}};e.default=s}).call(this,n(2)["default"])},297:function(t,e,n){"use strict";n.r(e);var o=n(298),i=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},298:function(t,e,n){}},[[291,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shop_certificate/shop_certificate.js.map