(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods_details/goods_details"],{1406:function(o,e,n){"use strict";(function(o,e){var t=n("4ea4");n("7711");t(n("66fd"));var r=t(n("f20a"));o.__webpack_require_UNI_MP_PLUGIN__=n,e(r.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"3f3e":function(o,e,n){},"4a5f":function(o,e,n){"use strict";n.r(e);var t=n("cfd6"),r=n.n(t);for(var s in t)["default"].indexOf(s)<0&&function(o){n.d(e,o,(function(){return t[o]}))}(s);e["default"]=r.a},"86a1":function(o,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return t}));var t={uniCollapse:function(){return n.e("uni_modules/uni-collapse/components/uni-collapse/uni-collapse").then(n.bind(null,"5e8f"))},uniCollapseItem:function(){return n.e("uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item").then(n.bind(null,"b9d9"))},uniGoodsNav:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav")]).then(n.bind(null,"76a6"))},uniPopup:function(){return n.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(n.bind(null,"0336"))},uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(n.bind(null,"f79a"))}},r=function(){var o=this,e=o.$createElement;o._self._c;o._isMounted||(o.e0=function(){return o.handleImageError(0)},o.e1=function(e){o.indicationShow=!o.indicationShow},o.e2=function(e){var n=[],t=arguments.length-1;while(t-- >0)n[t]=arguments[t+1];var r=n[n.length-1].currentTarget.dataset,s=r.eventParams||r["event-params"];e=s.i;return o.handleImageError(e)},o.e3=function(){return o.handleImageError(0)},o.e4=function(e){o.visible=!1})},s=[]},c7f7:function(o,e,n){"use strict";var t=n("3f3e"),r=n.n(t);r.a},cfd6:function(o,e,n){"use strict";(function(o){var t=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=t(n("2eee")),s=t(n("c973")),i=t(n("24db"));function a(o,e){var n="undefined"!==typeof Symbol&&o[Symbol.iterator]||o["@@iterator"];if(!n){if(Array.isArray(o)||(n=function(o,e){if(!o)return;if("string"===typeof o)return c(o,e);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(o,e)}(o))||e&&o&&"number"===typeof o.length){n&&(o=n);var t=0,r=function(){};return{s:r,n:function(){return t>=o.length?{done:!0}:{done:!1,value:o[t++]}},e:function(o){throw o},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,i=!0,a=!1;return{s:function(){n=n.call(o)},n:function(){var o=n.next();return i=o.done,o},e:function(o){a=!0,s=o},f:function(){try{i||null==n.return||n.return()}finally{if(a)throw s}}}}function c(o,e){(null==e||e>o.length)&&(e=o.length);for(var n=0,t=new Array(e);n<e;n++)t[n]=o[n];return t}var u={components:{goodsCard:function(){n.e("components/goods/goods_card").then(function(){return resolve(n("0faa"))}.bind(null,n)).catch(n.oe)},orderPopup:function(){n.e("components/order/order_popup").then(function(){return resolve(n("002d"))}.bind(null,n)).catch(n.oe)}},data:function(){return{visible:!1,indicationShow:!1,addressList:[],goods:{},shop:{},choiceBar:"test1",imgurl:"http://images.yndzyf.com/getimage.ashx?mlszh=",defaultPic:"http://images.yndzyf.com/getimage.ashx?mlszh=17700932",errorImage:"/static/icon/errorImg.svg",orderType:"",indication:"",UsageAndDosage:"",currentIndex:0,options:[{icon:"shop",text:"店铺",info:0,infoBackgroundColor:"#007aff",infoColor:"#f5f5f5"},{icon:"cart",text:"购物车",info:0}],buttonGroup:[{text:"加入购物车",backgroundColor:"linear-gradient(90deg, #FFCD1E, #FF8A18)",color:"#fff"},{text:"立即购买",backgroundColor:"linear-gradient(90deg, #FE6035, #EF1224)",color:"#fff"}],customButtonGroup1:[{text:"问诊开方",backgroundColor:"linear-gradient(90deg, #FE6035, #EF1224)",color:"#fff"}],shoppingCart:[]}},computed:{theGoodsType:function(){if(this.goods&&this.goods.goodsType){if(this.goods.goodsType.includes("药"))return"药品";if(this.goods.goodsType.includes("械"))return"器械"}}},onLoad:function(o){this.goods=JSON.parse(decodeURIComponent(o.goods)),this.shop=JSON.parse(decodeURIComponent(o.shop)),console.log("111111"),console.log(this.goods),console.log(this.shop),this.getUserCartGoods()},onShow:function(){this.getAddressList()},methods:{openPopup:function(){this.visible=!0},closePopup:function(){this.visible=!1},getUserCartGoods:function(){var e=this;return(0,s.default)(r.default.mark((function n(){var t,s,c,u,d,l;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return"/api/user/getUserCartGoods","POST",t={openid:o.getStorageSync("openid"),phone:o.getStorageSync("phone")},n.prev=3,n.next=6,(0,i.default)("yzy_app","/api/user/getUserCartGoods","POST",t);case 6:if(s=n.sent,console.log(s),s.data){e.shoppingCart=JSON.parse(s.data),c=0,u=a(e.shoppingCart);try{for(u.s();!(d=u.n()).done;)l=d.value,c=l.drugs.length+c}catch(r){u.e(r)}finally{u.f()}e.options[1].info=c}n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](3),console.log(n.t0);case 14:case"end":return n.stop()}}),n,null,[[3,11]])})))()},showImg:function(e){console.log(e);o.previewImage({urls:[e],longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(o){},fail:function(o){console.log(o.errMsg)}}})},toAddUserAddress:function(){o.navigateTo({url:"/pages/user-add-path/addPath"})},showNextAddress:function(){this.currentIndex=(this.currentIndex+1)%this.addressList.length},toShop:function(){o.navigateTo({url:"/pages/shop_certificate/shop_certificate?shopName="+encodeURIComponent(JSON.stringify(this.shop.shopName))+"&shopId="+encodeURIComponent(JSON.stringify(this.shop.shopId))+"&shop="+encodeURIComponent(JSON.stringify(this.shop))})},getAddressList:function(){var e=this;return(0,s.default)(r.default.mark((function n(){var t,s;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return"/api/user/getAddressList","POST",t={openid:o.getStorageSync("openid")},n.prev=3,n.next=6,(0,i.default)("yzy_app","/api/user/getAddressList","POST",t);case 6:s=n.sent,console.log(s),99==s.code?(e.addressList=s.data.data,console.log(e.list)):console.log("-99"+s.result),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](3),console.log(n.t0);case 14:case"end":return n.stop()}}),n,null,[[3,11]])})))()},toPrescription:function(){o.navigateTo({url:"/pages/prescription/prescription"})},popupBuyGoods:function(e){o.getStorageSync("phone")?(o.requestSubscribeMessage({tmplIds:["K9QtB4z2B8YIyUScP1Bx5iROO-IOZqd3Opi7KjySbKc","JZGbfSSv0-jB5yS4GObkqD0TUrPqDdAbalAcz70xjZg"],success:function(o){console.log(o)}}),this.orderType=e,this.openPopup(),console.log("弹出")):this.toAuthorizePhone()},closePopupBuyGoods:function(e){var n=this;console.log(e);var t=e.num;"null"==e?(this.$refs.popup.close(),this.closePopup()):"加入购物车"==e.type?(this.addToShoppingCart(e.num),this.$refs.popup.close(),this.closePopup()):"立即购买"==e.type?this.addToShoppingCart(t).then((function(e){var r=[{id:0,shopName:n.shop.shopName,shopId:n.shop.shopId,simplifyShopName:n.shop.simplifyShopName,drugs:[{id:e,drugId:n.goods.goodsId,drugName:n.goods.genericName,specification:n.goods.specification,price:n.shop.price,num:t,imgLszh:n.goods.goodsImg?n.goods.goodsImg[0].tplszh:"",manufacturer:n.goods.manufacturer,sellUnit:n.goods.sellUnit}]}];o.navigateTo({url:"/pages/confirm_order/confirm_order?drug=".concat(encodeURIComponent(JSON.stringify(r)))})})).catch((function(o){console.error("Error:",o)})):(this.$refs.popup.close(),this.closePopup())},addToShoppingCart:function(e){var n=this;return(0,s.default)(r.default.mark((function t(){var s,a;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return"/api/trade/addGoodsToShoppingCart","POST",s={openid:o.getStorageSync("openid"),shopId:n.shop.shopId,goodsId:n.goods.goodsId,num:e},t.prev=3,t.next=6,(0,i.default)("yzy_app","/api/trade/addGoodsToShoppingCart","POST",s);case 6:if(a=t.sent,console.log(a),99!=a.code){t.next=14;break}return n.getUserCartGoods(),o.showToast({icon:"none",title:"商品已加入购物车"}),t.abrupt("return",a.data.shoppingCartId);case 14:o.showToast({icon:"none",title:"添加失败"+a.data.sm});case 15:t.next=21;break;case 17:t.prev=17,t.t0=t["catch"](3),console.log(t.t0),o.showToast({icon:"none",title:"服务器出错了"});case 21:case"end":return t.stop()}}),t,null,[[3,17]])})))()},onClick:function(e){"购物车"==e.content.text?(console.log(e.content.text),o.switchTab({url:"/pages/shopping_cart/shopping_cart"})):this.toShop()},toAuthorizePhone:function(){o.navigateTo({url:"/pages/login/login"})},buttonClick:function(e){o.getStorageSync("phone")?(console.log(e),o.requestSubscribeMessage({tmplIds:["NaEQhsqAO72iO_ruYzrhHIZigJQO8davB0gST5-xtIk","K9QtB4z2B8YIyUScP1Bx5uEk1tudwnuVUXA6SZM3H0E","JZGbfSSv0-jB5yS4GObkqD0TUrPqDdAbalAcz70xjZg"],success:function(o){console.log(o)}}),0==e.index?this.popupBuyGoods("加入购物车"):1==e.index&&this.popupBuyGoods("立即购买")):this.toAuthorizePhone()},selectBar:function(o){this.choiceBar=o,"test2"==o?this.scrollToTarget("2"):this.scrollToTarget("1")},toNewSearch:function(){o.navigateTo({url:"/pages/search/search"})},handleImageError:function(o){console.log("图片加载失败"),this.goods.goodsImg[o].tplszh=this.errorImage},scrollToTarget:function(e){"2"==e?o.pageScrollTo({selector:".goods-detail-container2",duration:300}):o.pageScrollTo({selector:".content",duration:300})}}};e.default=u}).call(this,n("543d")["default"])},f20a:function(o,e,n){"use strict";n.r(e);var t=n("86a1"),r=n("4a5f");for(var s in r)["default"].indexOf(s)<0&&function(o){n.d(e,o,(function(){return r[o]}))}(s);n("c7f7");var i=n("f0c5"),a=Object(i["a"])(r["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],void 0);e["default"]=a.exports}},[["1406","common/runtime","common/vendor"]]]);