(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop_certificate/shop_certificate"],{2484:function(t,e,o){"use strict";var a=o("94bc"),n=o.n(a);n.a},"562e":function(t,e,o){"use strict";(function(t){var a=o("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(o("2eee")),i=a(o("c973")),s=a(o("24db")),c={data:function(){return{shop:null,shopName:{},shopId:{},certificate:[{id:1,shopCertificate:"营业执照",shopCertificateNo:"",shopCertificateUrl:null},{id:2,shopCertificate:"药品经营许可证",shopCertificateNo:"",shopCertificateUrl:null}],markers:[{id:1,latitude:24.833571,longitude:102.839036,title:"云南省医药有限公司",width:40,height:40,iconPath:"/static/icon/location.svg"}],mapheight:"200px",scale:16,latitude:24.83430561,longitude:102.84125743}},onShow:function(){this.shop&&(this.markers=[{id:0,width:40,height:40,callout:{content:"646"},longitude:this.longitude,latitude:this.latitude,iconPath:"/static/icon/location.svg"}])},onLoad:function(t){null!=t.shop?(this.shop=JSON.parse(decodeURIComponent(t.shop)),this.latitude=this.shop.latitude,this.longitude=this.shop.longitude,console.log("have shop")):(console.log(this.shopId),this.getShop(JSON.parse(decodeURIComponent(t.shopId)))),this.shopName=JSON.parse(decodeURIComponent(t.shopName)),this.shopId=JSON.parse(decodeURIComponent(t.shopId))},mounted:function(){this.getShopCertificate()},methods:{toLocation:function(){console.log(this.shop);var e=102.839036,o=24.833571,a="云南省医药有限公司";this.shop&&(e=this.shop.longitude,o=this.shop.latitude,a=this.shop.shopName),t.openLocation({latitude:o,longitude:e,name:a})},getShop:function(t){var e=this;return(0,i.default)(n.default.mark((function o(){var a,i;return n.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return"/api/shop/getShopBaseInfo","POST",a={shopId:t},o.prev=3,o.next=6,(0,s.default)("yzy_app","/api/shop/getShopBaseInfo","POST",a);case 6:i=o.sent,99==i.code&&null!=i.data.data&&(e.shop=i.data.data[0],console.log(e.shop.shopPhone)),o.next=12;break;case 10:o.prev=10,o.t0=o["catch"](3);case 12:case"end":return o.stop()}}),o,null,[[3,10]])})))()},callPhone:function(e){var o=e.match(/\d+-?\d+/g);if(o&&o.length>0){var a=o[0];console.log("提取到的电话号码："+a),t.makePhoneCall({phoneNumber:a})}else console.log("未找到电话号码")},getShopCertificate:function(){var t=this;return(0,i.default)(n.default.mark((function e(){var o,a;return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("获取门店资质"),"/api/shop/getShopCertificate","POST",o={shopId:t.shopId},e.prev=4,e.next=7,(0,s.default)("yzy_app","/api/shop/getShopCertificate","POST",o);case 7:a=e.sent,console.log(a),99==a.code&&null!=a.data.data&&(t.certificate=a.data.data),e.next=14;break;case 12:e.prev=12,e.t0=e["catch"](4);case 14:case"end":return e.stop()}}),e,null,[[4,12]])})))()}}};e.default=c}).call(this,o("543d")["default"])},"89eb":function(t,e,o){"use strict";o.r(e);var a=o("562e"),n=o.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){o.d(e,t,(function(){return a[t]}))}(i);e["default"]=n.a},"94bc":function(t,e,o){},a2b4:function(t,e,o){"use strict";o.r(e);var a=o("ce04"),n=o("89eb");for(var i in n)["default"].indexOf(i)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(i);o("2484");var s=o("f0c5"),c=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);e["default"]=c.exports},bd48:function(t,e,o){"use strict";(function(t,e){var a=o("4ea4");o("7711");a(o("66fd"));var n=a(o("a2b4"));t.__webpack_require_UNI_MP_PLUGIN__=o,e(n.default)}).call(this,o("bc2e")["default"],o("543d")["createPage"])},ce04:function(t,e,o){"use strict";o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return n})),o.d(e,"a",(function(){}));var a=function(){var t=this.$createElement;this._self._c},n=[]}},[["bd48","common/runtime","common/vendor"]]]);