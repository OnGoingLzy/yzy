(my["webpackJsonp"]=my["webpackJsonp"]||[]).push([["pages/search/search"],{100:function(e,t,r){"use strict";r.r(t);var s=r(101);r.d(t,"render",(function(){return s["render"]})),r.d(t,"staticRenderFns",(function(){return s["staticRenderFns"]})),r.d(t,"recyclableRender",(function(){return s["recyclableRender"]})),r.d(t,"components",(function(){return s["components"]}))},101:function(e,t,r){"use strict";var s;r.r(t),r.d(t,"render",(function(){return n})),r.d(t,"staticRenderFns",(function(){return a})),r.d(t,"recyclableRender",(function(){return o})),r.d(t,"components",(function(){return s}));try{s={uniTag:function(){return r.e("uni_modules/uni-tag/components/uni-tag/uni-tag").then(r.bind(null,528))},uniIcons:function(){return Promise.all([r.e("common/vendor"),r.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(r.bind(null,506))},uniPopup:function(){return r.e("uni_modules/uni-popup/components/uni-popup/uni-popup").then(r.bind(null,521))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var n=function(){var e=this,t=e.$createElement,r=(e._self._c,e.__map(e.filterRule.manufacturer,(function(t,r){var s=e.__get_orig(t),n=e.getTagType(t,"生产厂商");return{$orig:s,m0:n}}))),s=e.__map(e.filterRule.goodsName,(function(t,r){var s=e.__get_orig(t),n=e.getTagType(t,"品牌名");return{$orig:s,m1:n}}));e._isMounted||(e.e0=function(e){return this.$refs.popup.close()}),e.$mp.data=Object.assign({},{$root:{l0:r,l1:s}})},o=!1,a=[];n._withStripped=!0},102:function(e,t,r){"use strict";r.r(t);var s=r(103),n=r.n(s);for(var o in s)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return s[e]}))}(o);t["default"]=n.a},103:function(e,t,r){"use strict";(function(e){var s=r(3);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(r(26)),o=s(r(16)),a=s(r(28)),i=s(r(29));function u(e,t){var r="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=c(e))||t&&e&&"number"===typeof e.length){r&&(e=r);var s=0,n=function(){};return{s:n,n:function(){return s>=e.length?{done:!0}:{done:!1,value:e[s++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return a=e.done,e},e:function(e){i=!0,o=e},f:function(){try{a||null==r.return||r.return()}finally{if(i)throw o}}}}function c(e,t){if(e){if("string"===typeof e)return l(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?l(e,t):void 0}}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,s=new Array(t);r<t;r++)s[r]=e[r];return s}var h=function(){r.e("components/goods/goods_card").then(function(){return resolve(r(535))}.bind(null,r)).catch(r.oe)},d=function(){r.e("components/goods/goods_card2").then(function(){return resolve(r(499))}.bind(null,r)).catch(r.oe)},f={data:function(){return{showType:"列表",hotList:[],historyList:[],showView:"view1",searchContent:"",searchResults:[],filterSearchResults:[],searchTime:1,isloding:!0,totalNum:"",choiceBar:"test0",searchObj:{searchContent:"",pageIndex:1,pageSize:20,drugsList:[],sortRule:"默认",filterRule:"无"},maySearchList:[],filterRule:{manufacturer:[],goodsName:[]},useFilterRule:{manufacturer:[],goodsName:[]},useFilter:!1,focus:!1,isCategorySearch:!1,categoryId:""}},components:{goodsCard:h,goodsCard2:d},watch:{searchContent:function(e,t){""===e?this.showView="view1":e.length>=1&&!/^[0-9a-z]*$/.test(e)&&this.watchInput()}},onShow:function(){},mounted:function(){this.getHotGoods(),this.historyList=JSON.parse(e.getStorageSync("historyList")||"[]")},onLoad:function(e){if(e&&e.searchContent){var t=JSON.parse(decodeURIComponent(e.searchContent));this.isCategorySearch=!0,this.categoryId=t,this.categorySearchGoods(t,""),console.log(this.searchContent)}else this.focus=!0},created:function(){},computed:{filteredSearchResultsList:function(){var e=this;if(console.log("筛选执行"),this.searchResults!=[]&&null!=this.searchResults)return 0==this.useFilterRule.manufacturer.length&&0==this.useFilterRule.goodsName.length?this.searchResults:this.searchResults.filter((function(t){var r=e.useFilterRule.manufacturer.some((function(e){return e===t.manufacturer})),s=e.useFilterRule.goodsName.some((function(e){return e===t.goodsName}));return 0==e.useFilterRule.manufacturer.length?s:0==e.useFilterRule.goodsName.length?r:r||s}))}},methods:{toReserveGoods:function(){e.switchTab({url:"/pages/goods_order/goods_order"})},clickFilterRule:function(t,r,s){if(e.showToast({title:"正在筛选",icon:"none"}),"生产厂商"==s){var n=this.useFilterRule.manufacturer.findIndex((function(e){return e===t}));-1===n?this.useFilterRule.manufacturer.push(t):this.useFilterRule.manufacturer.splice(n,1)}else if("品牌名"==s){var o=this.useFilterRule.goodsName.findIndex((function(e){return e===t}));-1===o?this.useFilterRule.goodsName.push(t):this.useFilterRule.goodsName.splice(o,1)}0!=this.useFilterRule.goodsName.length||0!=this.useFilterRule.manufacturer.length?this.useFilter=!0:this.useFilter=!1},getTagType:function(e,t){if("生产厂商"==t){var r=this.useFilterRule.manufacturer.some((function(t){return t===e}));return r?"primary":""}if("品牌名"==t){var s=this.useFilterRule.goodsName.some((function(t){return t===e}));return s?"primary":""}},createfilterRule:function(e){var t=new Set,r=new Set;e.forEach((function(e){t.add(e.manufacturer),r.add(e.goodsName)})),this.filterRule.manufacturer=Array.from(t),this.filterRule.goodsName=Array.from(r)},resetFilterRule:function(){this.useFilterRule.manufacturer=[],this.useFilterRule.goodsName=[],this.filterSearchResults=this.searchResults,this.useFilter=!1},toGoodsSellShop:function(t){e.navigateTo({url:"/pages/shops_selling_This_goods/shops_selling_This_goods?goods="+encodeURIComponent(JSON.stringify(t))})},selectBar:function(t,r){if("test4"!=t&&(this.choiceBar=t),"test3"==t)"大图"==this.showType?this.showType="列表":this.showType="大图";else{this.choiceBar=t;var s=this.searchObj.sortRule}return"test3"!=t&&e.pageScrollTo({scrollTop:0,duration:300}),"test0"==t&&(this.searchObj.sortRule="默认"),"test1"==t&&"price"==r?("价格升序"==s&&"价格降序"==s||(this.searchObj.sortRule="价格降序"),"价格升序"==s&&(this.searchObj.sortRule="价格降序"),"价格降序"==s&&(this.searchObj.sortRule="价格升序"),void this.sortSearchResults(this.searchObj.sortRule)):"test2"==t&&"shopsNum"==r?("报价数升序"==s&&"报价数降序"==s||(this.searchObj.sortRule="报价数降序"),"报价数升序"==s&&(this.searchObj.sortRule="报价数降序"),"报价数降序"==s&&(this.searchObj.sortRule="报价数升序"),void this.sortSearchResults(this.searchObj.sortRule)):("test4"==t&&this.$refs.popup.open("right"),void this.sortSearchResults(this.searchObj.sortRule))},sortSearchResults:function(e){"价格降序"==e&&(console.log(e),this.searchResults.sort((function(e,t){return t.minPrice-e.minPrice}))),"价格升序"==e&&this.searchResults.sort((function(e,t){return e.minPrice-t.minPrice})),"默认"==e&&this.searchResults.sort((function(e,t){return t.similarity-e.similarity})),"报价数降序"==e&&(console.log(e),this.searchResults.sort((function(e,t){return t.shopNum-e.shopNum}))),"报价数升序"==e&&this.searchResults.sort((function(e,t){return e.shopNum-t.shopNum})),this.removeDuplicates()},searchGoods:function(t,r){var s=this;return(0,a.default)(n.default.mark((function a(){var u,c,l,h,d,f;return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(s.showView="view3",s.isCategorySearch=!1,u=s,c=s.searchContent,""!=t&&(console.log("热门/记录搜索"+t),c=t,s.searchContent=t,s.resetFilterRule()),!/^[0-9]*$/.test(s.searchContent)){n.next=12;break}return console.log("纯数字-分类查询"),s.isCategorySearch=!0,s.categoryId=s.searchContent,n.next=11,s.categorySearchGoods(s.categoryId,"");case 11:return n.abrupt("return");case 12:if(s.searchObj.searchContent==c&&""!=c){n.next=20;break}s.searchTime=1,s.searchObj.pageIndex=1,s.searchObj.drugsList=[],s.searchResults=[],s.resetFilterRule(),n.next=22;break;case 20:if("loadMore"==r||""==s.searchContent){n.next=22;break}return n.abrupt("return");case 22:return s.saveSearchHistory(c),s.resetFilterRule(),1===u.searchTime&&(console.log(u.searchTime),u.searchTime=u.searchTime+1,e.showLoading({title:"搜索中..."})),u.searchObj.searchContent=c,l="/api/goods/searchGoods",h="POST",d={searchObj:u.searchObj},n.prev=29,n.next=32,(0,i.default)("yzy_app",l,h,d);case 32:f=n.sent,console.log(f),99==f.code&&(null!==f.data.data?(s.searchResults=[].concat((0,o.default)(s.searchResults),(0,o.default)(f.data.data)),u.totalNum=f.data.totalCount,s.searchObj.drugsList=f.data.drugsList,s.showView="view3",s.createfilterRule(s.searchResults)):(s.showView="view3",e.showToast({title:"没有找到该药品!",icon:"error",duration:1200})),0==!f.data.drugsList.length?s.sortSearchResults("报价数降序"):s.sortSearchResults(s.searchObj.sortRule)),e.hideLoading(),n.next=42;break;case 38:n.prev=38,n.t0=n["catch"](29),console.log(n.t0),e.hideLoading();case 42:case"end":return n.stop()}}),a,null,[[29,38]])})))()},categorySearchGoods:function(t,r){var s=this;return(0,a.default)(n.default.mark((function a(){var u,c,l,h,d,f;return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(s.showView="view3",u=s,c=t,s.searchObj.searchContent==c&&""!=c){n.next=11;break}s.searchTime=1,s.searchObj.pageIndex=1,s.searchObj.drugsList=[],s.searchResults=[],s.resetFilterRule(),n.next=13;break;case 11:if("loadMore"==r||""==s.searchContent){n.next=13;break}return n.abrupt("return");case 13:return s.resetFilterRule(),1===u.searchTime&&(console.log(u.searchTime),u.searchTime=u.searchTime+1,e.showLoading({title:"搜索中..."})),u.searchObj.searchContent=c,l="/api/goods/searchGoods",h="POST",d={searchObj:u.searchObj},n.prev=19,n.next=22,(0,i.default)("yzy_app",l,h,d);case 22:f=n.sent,console.log(f),99==f.code&&(null!==f.data.data?(s.searchResults=[].concat((0,o.default)(s.searchResults),(0,o.default)(f.data.data)),u.totalNum=f.data.totalCount,s.searchObj.drugsList=f.data.drugsList,s.showView="view3",s.createfilterRule(s.searchResults)):e.showToast({title:"没有找到该药品!",icon:"error",duration:1200}),0==!f.data.drugsList.length?s.sortSearchResults("报价数降序"):s.sortSearchResults(s.searchObj.sortRule)),e.hideLoading(),n.next=32;break;case 28:n.prev=28,n.t0=n["catch"](19),console.log(n.t0),e.hideLoading();case 32:case"end":return n.stop()}}),a,null,[[19,28]])})))()},removeDuplicates:function(){var e,t=[],r=u(this.searchResults);try{var s=function(){var r=e.value,s=t.some((function(e){return e.goodsId===r.goodsId}));s||t.push(r)};for(r.s();!(e=r.n()).done;)s()}catch(n){r.e(n)}finally{r.f()}this.searchResults=t},onReachBottom:function(){if(this.searchObj.pageIndex*this.searchObj.pageSize>=this.totalNum)return console.log("数据加载完毕"),void e.showToast({title:"数据加载完毕",icon:"success"});this.isloading||(this.searchObj.pageIndex++,console.log("到达底部"),this.isCategorySearch?this.categorySearchGoods(this.categoryId,"loadMore"):this.searchGoods("","loadMore"))},saveSearchHistory:function(t){console.log("存储搜索历史");var r=new Set(this.historyList),s=/^[0-9]+$/;if(!s.test(t)){0!==t.trim().length&&(r.delete(t.trim()),r.add(t.trim()));var n=Array.from(r);n.length>8&&r.delete(n[1]),this.historyList=Array.from(r).reverse(),e.setStorageSync("historyList",JSON.stringify(Array.from(r)))}},getHotGoods:function(){var e=this;return(0,a.default)(n.default.mark((function t(){var r,s,o,a;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e,r="/api/goods/searchGoods",s="POST",o={searchObj:{searchContent:"",pageIndex:1,pageSize:20,drugsList:[],sortRule:"默认",filterRule:"无"}},t.prev=4,t.next=7,(0,i.default)("yzy_app",r,s,o);case 7:a=t.sent,99==a.code&&null!==a.data&&(e.hotList=a.data.data),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](4),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[4,11]])})))()},getMaySearch:function(){var e=this;return(0,a.default)(n.default.mark((function t(){var r,s,o,a;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r="/api/goods/getMaySearch",s="POST",o={searchContent:e.searchContent},t.prev=3,t.next=6,(0,i.default)("yzy_app",r,s,o);case 6:a=t.sent,console.log(a),99==a.code&&(e.maySearchList=a.data.data),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](3),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[3,11]])})))()},watchInput:function(){""!=this.searchContent?(this.showView="view2",this.getMaySearch()):this.showView="view1"},clearSearchContent:function(){this.searchContent="",this.searchTime=1,this.searchObj.pageIndex=1,this.searchObj.drugsList=[]},clearSearchResult:function(){this.searchTime=1,this.searchObj.pageIndex=1,this.searchObj.drugsList=[],this.searchResults=[]}}};t.default=f}).call(this,r(1)["default"])},104:function(e,t,r){"use strict";r.r(t);var s=r(105),n=r.n(s);for(var o in s)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return s[e]}))}(o);t["default"]=n.a},105:function(e,t,r){},98:function(e,t,r){"use strict";(function(e){var t=r(3);r(22);t(r(21));var s=t(r(99));my.__webpack_require_UNI_MP_PLUGIN__=r,e(s.default)}).call(this,r(1)["createPage"])},99:function(e,t,r){"use strict";r.r(t);var s=r(100),n=r(102);for(var o in n)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return n[e]}))}(o);r(104);var a,i=r(68),u=Object(i["default"])(n["default"],s["render"],s["staticRenderFns"],!1,null,null,null,!1,s["components"],a);u.options.__file="pages/search/search.vue",t["default"]=u.exports}},[[98,"common/runtime","common/vendor"]]]);