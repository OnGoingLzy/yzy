(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/confirm_order/confirm_order"],{4321:function(e,t,n){},"8b03":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return o}));var o={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"f79a"))},uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"0336"))}},r=function(){var e=this.$createElement,t=(this._self._c,this.distance.toFixed(2)),n=this.shippingFee.toFixed(2),o=Number(this.totalPrice).toFixed(2),r=this.selectRange.length;this.$mp.data=Object.assign({},{$root:{g0:t,g1:n,g2:o,g3:r}})},s=[]},9732:function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("7711");o(n("66fd"));var r=o(n("c1ce"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},c1ce:function(e,t,n){"use strict";n.r(t);var o=n("8b03"),r=n("cf64");for(var s in r)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(s);n("dc66");var i=n("f0c5"),a=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);t["default"]=a.exports},cf64:function(e,t,n){"use strict";n.r(t);var o=n("f0c6"),r=n.n(o);for(var s in o)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(s);t["default"]=r.a},dc66:function(e,t,n){"use strict";var o=n("4321"),r=n.n(o);r.a},f0c6:function(e,t,n){"use strict";(function(e){var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("2eee")),s=o(n("9523")),i=o(n("7037")),a=o(n("c973")),c=o(n("24db")),u=o(n("ae48"));function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function d(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,s.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"===typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(e,t)}(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var o=0,r=function(){};return{s:r,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,i=!0,a=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){a=!0,s=e},f:function(){try{i||null==n.return||n.return()}finally{if(a)throw s}}}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var g={components:{selectUserLocation:function(){n.e("components/user/select_user_location").then(function(){return resolve(n("037d"))}.bind(null,n)).catch(n.oe)}},data:function(){return{validSubmit:!0,selectValue:0,selectRange:[{value:0,text:"请选择",price:999,caution:"无caution"}],shops:[],totalPrice:0,selectedAddress:{name:"",phone:"",province:"",city:"",district:"",address:"请点击此处选择收货地址"},shippingFee:0,distance:0,checkboxSelected:!1,totalNum:0,list:[],selectedList:[],isEnableClick:!0,popup:!0,locationId:null,memo:"",realTimePricing:[],canNext:!0,priceMatch:!0,allMatch:!0,defaultPic:"http://images.yndzyf.com/getimage.ashx?mlszh=17700932",feeOrigin:[],selectText:"请点击此处选择...",cautionText:"",isShopping:null,businessHours:"",coldFlag:null,showSelector:!1}},onShow:function(){this.getAddressList()},methods:{turntypeToDefault:function(){this.cautionText="",this.selectValue=0,this.selectText="请点击此处选择...",this.shippingFee=0,this.calcTotalPrice()},openSelectType:function(){this.$refs.popupShipping.open("center")},checkType:function(e){var t=this;this.cautionText=e.caution,this.selectValue=e.value,this.selectText=e.text,this.feeOrigin.forEach((function(e){e.type===t.selectText&&(t.shippingFee=e.Fee)})),this.calcTotalPrice(),this.$refs.popupShipping.close()},showImg:function(t){e.previewImage({urls:[t],longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){},fail:function(e){console.log(e.errMsg)}}})},goToShop:function(t){e.navigateTo({url:"/pages/shop_certificate/shop_certificate?shopName="+encodeURIComponent(JSON.stringify(t.shopName))+"&shopId="+encodeURIComponent(JSON.stringify(t.shopId))})},fatherMethods:function(e){console.log("父组件方法",e),this.addOver(e)},addOver:function(e){this.$refs.popup.close()},submitOrder:function(){var t=this;e.requestSubscribeMessage({tmplIds:["JZGbfSSv0-jB5yS4GObkqD0TUrPqDdAbalAcz70xjZg"],success:function(e){console.log(e)}}),this.checkboxSelected?""!==this.selectText&&"请点击此处选择..."!==this.selectText?"请点击此处选择收货地址"!==this.selectedAddress.address?Number(this.totalPrice)!==Number(this.shippingFee)?(this.validSubmit=!1,e.showLoading({title:"请稍等...",mask:!0}),console.log(this.locationId),this.realTimePricing=this.shops[0].drugs.map((function(e){return{goodsId:e.drugId,goodsOuterId:e.drugId,shopId:t.shops[0].shopId}})),this.getRealTimePricing()):e.$showMsg("亲，您购买的药品没货了，请联系药房补货",3e3):e.$showMsg("请先选择收货地址再结算",3e3):e.$showMsg("请先选择配送方式再结算",3e3):e.$showMsg("请先阅读并同意《商品验收标准》，谢谢！",3e3)},getRealTimePricing:function(){var t=this;return(0,a.default)(r.default.mark((function n(){var o,s,a,u,l,d,f,g;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return"/api/Goods/getShopSellGoodsInfo","POST",o={Body:JSON.stringify(t.realTimePricing)},n.prev=3,n.next=6,(0,c.default)("yzy_app","/api/Goods/getShopSellGoodsInfo","POST",o);case 6:if(s=n.sent,console.log(s),t.priceMatch=!1,t.canNext=!1,99!=s.code){n.next=40;break}a=s.data,console.log("比较数据"),console.log(JSON.stringify(a)),console.log(JSON.stringify(t.shops[0])),u=p(t.shops[0].drugs),n.prev=16,d=function(){var n=l.value,o=a.find((function(e){return e.goodsId===n.drugId&&e.shopId===t.shops[0].shopId}));if(o?n.num<=o.inventory&&n.price===o.price?(console.log("购买库存和价格一致，无需同步，drugId: "+n.drugId),t.priceMatch=!0,t.canNext=!0):(t.priceMatch=!1,t.canNext=!0):t.canNext=!1,!1===t.canNext)return e.$showMsg("未查询到所购买商品的价格和库存信息",3e3),t.validSubmit=!0,{v:void 0};if(!1===t.priceMatch){f=t;var r=a.find((function(e){return e.goodsId===n.drugId&&e.shopId===t.shops[0].shopId}));if(r){if(n.price>=r.price)t.allMatch=!1,n.price=r.price,console.log("(调低)价格同步：drugId: "+n.drugId);else if(n.price<r.price)return t.allMatch=!1,console.log("(调高)价格同步：drugId: "+n.drugId),e.showToast({duration:5e3,mask:!0,title:"请注意，当前价格低于后台价格，请重新选择商品购买",icon:"none"}),f.canNext=!1,setTimeout((function(){e.reLaunch({url:"/pages/shopping_cart/shopping_cart"})}),5e3),t.updatePriceAndInventoryToYzy(a),t.validSubmit=!0,{v:void 0};n.num>r.inventory&&(t.allMatch=!1,n.num=r.inventory,console.log("购买数量同步：drugId: "+n.drugId))}e.$showMsg("请留意，因后台数据变化，价格和数量存在变动",3e3),t.calcTotalPrice()}},u.s();case 19:if((l=u.n()).done){n.next=25;break}if(g=d(),"object"!==(0,i.default)(g)){n.next=23;break}return n.abrupt("return",g.v);case 23:n.next=19;break;case 25:n.next=30;break;case 27:n.prev=27,n.t0=n["catch"](16),u.e(n.t0);case 30:return n.prev=30,u.f(),n.finish(30);case 33:if(!1!==t.allMatch&&!1!==t.canNext){n.next=37;break}return t.updatePriceAndInventoryToYzy(a),t.validSubmit=!0,n.abrupt("return");case 37:!0===t.priceMatch&&!0===t.canNext?t.Pay():t.validSubmit=!0,n.next=42;break;case 40:console.log("-99"+s.result),e.$showMsg(s.result,3e3);case 42:n.next=47;break;case 44:n.prev=44,n.t1=n["catch"](3),e.$showMsg(n.t1,3e3);case 47:case"end":return n.stop()}}),n,null,[[3,44],[16,27,30,33]])})))()},updatePriceAndInventoryToYzy:function(e){return(0,a.default)(r.default.mark((function t(){var n,o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return"/api/shop/updatePriceAndInventoryToYzy","POST",n={realTimePriceArray:e},t.prev=3,t.next=6,(0,c.default)("yzy_app","/api/shop/updatePriceAndInventoryToYzy","POST",n);case 6:o=t.sent,console.log(o),99==o.code?console.log("价格同步成功！"):console.log("-99"+o.result),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](3),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[3,11]])})))()},Pay:function(){var t=this;return(0,a.default)(r.default.mark((function n(){var o,s,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=t.shops[0].drugs.map((function(e){return{id:e.id,goodsId:e.drugId,num:e.num,price:e.price}})),"/api/Trade/wechatPay","POST",s={openid:e.getStorageSync("openid"),shopId:t.shops[0].shopId,goodsList:o,locationId:t.locationId,memo:t.memo,shippingFee:t.shippingFee,type:t.selectText},n.prev=4,n.next=7,(0,c.default)("yzy_app","/api/Trade/wechatPay","POST",s);case 7:i=n.sent,console.log(i),99==i.code?(t.requestWxPay(i.data,i.data.main_order_id),e.hideLoading()):e.showToast({icon:"none",title:"创建订单失败"}),n.next=16;break;case 12:n.prev=12,n.t0=n["catch"](4),console.log(n.t0),e.showToast({icon:"none",title:"服务器出错了"});case 16:case"end":return n.stop()}}),n,null,[[4,12]])})))()},requestWxPay:function(t,n){var o=this;e.requestPayment({provider:"wxpay",timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,signType:t.signType,paySign:t.paySign,success:function(r){console.log("支付成功"),e.showToast({icon:"success",title:"支付成功",mask:!0}),o.testQueryPay(t.out_order_id,n),o.shops=null,e.redirectTo({url:"/pages/payment_success/payment_success"}),o.validSubmit=!0},fail:function(r){console.log("支付失败"),e.showToast({icon:"none",title:"支付失败"}),o.testQueryPay(t.out_order_id,n),e.reLaunch({url:"/pages/user_order/user_order?num=test1"}),o.validSubmit=!0}})},testQueryPay:function(t,n){var o=this;return(0,a.default)(r.default.mark((function s(){var i,a;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return"/api/example/testQueryPayOrder","POST",i={openid:e.getStorageSync("openid"),main_order_id:n,out_order_id:t},r.prev=3,r.next=6,(0,c.default)("yzy_app","/api/example/testQueryPayOrder","POST",i);case 6:a=r.sent,console.log(a),99==a.code&&(console.log("真实的response.msg"),console.log(a.msg),console.log("operateId："+a.data.operateId),o.uploadOrderToZhyf(a.msg,a.data.operateId),console.log("查询成功并回填数据库成功！")),r.next=14;break;case 11:r.prev=11,r.t0=r["catch"](3),console.log(r.t0);case 14:case"end":return r.stop()}}),s,null,[[3,11]])})))()},uploadOrderToZhyf:function(e,t){return(0,a.default)(r.default.mark((function n(){var o,s,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=JSON.parse(e),o.operateId=t,console.log(JSON.stringify(o)),"/api/Zhyf/makeAccountForOuterOrder","POST",s=JSON.stringify(o),n.prev=6,console.log(s),n.next=10,(0,u.default)("yzy_app","/api/Zhyf/makeAccountForOuterOrder","POST",s);case 10:i=n.sent,console.log(i),99==i.code&&console.log("销售记录上传智慧药房成功！"),n.next=18;break;case 15:n.prev=15,n.t0=n["catch"](6),console.log(n.t0);case 18:case"end":return n.stop()}}),n,null,[[6,15]])})))()},checkboxChange:function(){this.checkboxSelected=!this.checkboxSelected},openReadText:function(){e.navigateTo({url:"/pages/agreement_order/agreement_order"})},bindTextAreaBlur:function(e){this.memo=e.detail.value,console.log(e.detail.value)},calcTotalPrice:function(){var e=this.shops.map((function(e){return d(d({},e),{},{drugs:e.drugs.map((function(e){return d(d({},e),{},{total:e.num*e.price})}))})})),t=e.map((function(e){return d(d({},e),{},{total:e.drugs.reduce((function(e,t){return e+t.total}),0)})})),n=t.reduce((function(e,t){return e+t.total}),0),o=this.shops.flatMap((function(e){return e.drugs.map((function(e){return e.num}))})),r=o.reduce((function(e,t){return e+t}),0);console.log(this.shippingFee);var s=n+this.shippingFee,i=s.toString(),a=i.match(/^-?\d+(?:\.\d{0,2})?/),c=a?a[0]:"";this.totalPrice=c,this.totalNum=r},getAddressList:function(){var t=this;return(0,a.default)(r.default.mark((function n(){var o,s;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return"/api/user/getAddressList","POST",o={openid:e.getStorageSync("openid")},n.prev=3,n.next=6,(0,c.default)("yzy_app","/api/user/getAddressList","POST",o);case 6:s=n.sent,console.log(s),99==s.code?(console.log("99"+s.result),t.selectedAddress=s.data.data[0],t.selectedAddress.phone=s.data.data[0].tel,t.selectedAddress.address=s.data.data[0].details,console.log(t.selectedAddress)):console.log("-99"+s.result),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](3),console.log(n.t0);case 14:case"end":return n.stop()}}),n,null,[[3,11]])})))()},showAddFrame:function(){this.$refs.popup.open("center")},getShopShippingFee:function(){var e=this;return(0,a.default)(r.default.mark((function t(){var n,o,s;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return"/api/shop/getShopShippingFee","POST",n={shopId:e.shops[0].shopId,addressId:e.locationId},t.prev=3,t.next=6,(0,c.default)("yzy_app","/api/shop/getShopShippingFee","POST",n);case 6:o=t.sent,console.log("ShippingFee"),console.log(o),99==o.data.flag?(s=e,e.feeOrigin=o.data.data,e.selectRange=[],e.distance=o.data.distance,e.businessHours=o.data.businessHours,"true"===o.data.isShopping?e.isShopping=!0:e.isShopping=!1,e.feeOrigin.sort((function(e,t){return e.Fee-t.Fee})),e.feeOrigin.forEach((function(t){var n="";"跑腿（第三方）"===t.type?n=e.isShopping?s.businessHours+"内订单，收到订单15分钟内完成打包，并交由跑腿（第三方）配送。":s.businessHours+"外订单，第二天营业开始15分钟内完成打包，并交由跑腿（第三方）配送。":"快递邮寄"===t.type?n=e.isShopping?s.businessHours+"内订单，当天完成发货。":s.businessHours+"外订单，第二天营业开始2小时内完成发货。":"药房自配"===t.type?n=e.isShopping?s.businessHours+"内订单，2小时内完成配送。":s.businessHours+"外订单，第二天营业开始2小时内完成配送。":"到店自取"===t.type&&(n=e.isShopping?s.businessHours+"内订单，药房收到订单后20分钟内完成订单打包，顾客凭订单号到店取药。":s.businessHours+"外订单，第二天营业开始20分钟内完成订单打包，顾客凭订单号到店取药。"),e.selectRange.push({value:t.id,text:t.type,price:"￥"+t.Fee.toFixed(2),caution:n}),n=""})),!0===e.coldFlag&&(e.selectRange=e.selectRange.filter((function(e){return"药房自配"===e.text||"到店自取"===e.text||"请选择"===e.text}))),e.calcTotalPrice()):console.log("-99"+o.data.result),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](3),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[3,12]])})))()},getGoodsColdFlag:function(){var e=this;return(0,a.default)(r.default.mark((function t(){var n,o,s;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.shops[0].drugs.map((function(e){return{goodsId:e.drugId}})),"/api/goods/getGoodsColdFlag","POST",o={goodsList:n},t.prev=4,t.next=7,(0,c.default)("yzy_app","/api/goods/getGoodsColdFlag","POST",o);case 7:s=t.sent,console.log(s),99==s.data.flag?"y"===s.data.coldFlag?e.coldFlag=!0:e.coldFlag=!1:console.log("-99"+s.msg),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](4),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[4,12]])})))()}},onLoad:function(e){var t=JSON.parse(decodeURIComponent(e.drug));console.log(t),this.shops=t},created:function(){var t=this;e.$on("pageClosedLocation",(function(e){console.log("pageClosedLocation"),console.log(e),t.selectedAddress.name=e.name,t.selectedAddress.phone=e.tel,t.selectedAddress.address=e.details,t.selectedAddress.city=e.city,t.locationId=e.id,console.log("this.locationId:"+t.locationId),t.turntypeToDefault(),t.getGoodsColdFlag(),t.getShopShippingFee()})),e.$on("addressUpdated",(function(e){t.getAddressList(),console.log("获取地址成功！"),t.$refs.child.getAddressList()})),e.$on("pageClosedAddress",(function(e){t.getAddressList(),console.log("pageClosedAddress: FromSelect"),t.$refs.child.getAddressList()}))},beforeDestroy:function(){e.$off("pageClosedLocation")}};t.default=g}).call(this,n("543d")["default"])}},[["9732","common/runtime","common/vendor"]]]);