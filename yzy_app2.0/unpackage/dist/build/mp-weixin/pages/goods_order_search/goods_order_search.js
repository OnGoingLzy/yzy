(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods_order_search/goods_order_search"],{"334b":function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"c",(function(){return s})),r.d(t,"a",(function(){}));var a=function(){var e=this.$createElement;this._self._c},s=[]},"6e06":function(e,t,r){"use strict";r.r(t);var a=r("84b7"),s=r.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return a[e]}))}(o);t["default"]=s.a},"84b7":function(e,t,r){"use strict";(function(e){var a=r("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=a(r("2eee")),o=a(r("448a")),n=a(r("c973")),i=a(r("9523")),c={components:{goodsList:function(){r.e("components/goods_order/goods_list/goods_list").then(function(){return resolve(r("536a"))}.bind(null,r)).catch(r.oe)}},data:function(){return(0,i.default)({searchValue:"123123",show:this.showInit,showSync:!1,searchVal:this.searchValInit,isShowInit:!0,defS:JSON.parse(JSON.stringify(e.getStorageSync("dSv"))),reobj:{spcxm:"",pageIndex:1,pageSize:20,drugsList:[]},timer:null,kw:"",searchResults:[],historyList:[],isloading:!0,time:1,times:2,total:""},"show","")},onLoad:function(t){this.time=1,this.times=2,this.historyList=JSON.parse(e.getStorageSync("kw")||"[]"),this.kw=e.getStorageSync("kw")},methods:{getSearchList:function(){var t=this;return(0,n.default)(s.default.mark((function r(){var a,n,i;return s.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(console.log(t.kw),a=t,a.kw.trim()&&0!==a.kw.length){r.next=5;break}return a.searchResults=[],r.abrupt("return");case 5:return console.log("测试用"+e.getStorageSync("dS").value),t.reobj.spcxm=e.getStorageSync("dS").value,1===a.time&&(console.log(a.time),a.time=a.time+1,e.showLoading({title:"搜索中..."})),e.$http.beforeRequest=function(e){-1!==e.url.indexOf("/api/SearchSpml")&&(e.header={"X-Ca-Key":"wxe7c826a1a5e00055","X-Service-Method":"SearchSpml"})},r.next=11,e.$http.post("/api/SearchSpml",t.reobj);case 11:if(n=r.sent,i=n.data,t.isloading=!1,99===i.result){r.next=16;break}return r.abrupt("return",e.$showMsg());case 16:null!==i.data?(t.searchResults=[].concat((0,o.default)(t.searchResults),(0,o.default)(i.data)),t.reobj.spdm=i.data.spdm,a.total=i.totalCount):e.navigateTo({url:"/pages/goods_order_warning/goods_order_warning"});case 17:case"end":return r.stop()}}),r)})))()},getSearchList2:function(){var t=this;return(0,n.default)(s.default.mark((function r(){var a,n,i;return s.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(console.log("测试2"),a=t,a.kw.trim()&&0!==a.kw.length){r.next=5;break}return a.searchResults=[],r.abrupt("return");case 5:return t.reobj.drugsList=e.getStorageSync("dS").drugsList,t.reobj.spcxm=e.getStorageSync("dS").spcxm,1===a.time&&(console.log(a.time),a.time=a.time+1,e.showLoading({title:"搜索中..."})),e.$http.beforeRequest=function(e){-1!==e.url.indexOf("/api/SearchSpml")&&(e.header={"X-Ca-Key":"wxe7c826a1a5e00055","X-Service-Method":"SearchSpml"})},r.next=11,e.$http.post("/api/SearchSpml",t.reobj);case 11:if(n=r.sent,i=n.data,t.isloading=!1,99===i.result){r.next=16;break}return r.abrupt("return",e.$showMsg());case 16:null!==i.data?(t.searchResults=[].concat((0,o.default)(t.searchResults),(0,o.default)(i.data)),t.reobj.spcxm=i.data.spdm,a.total=i.totalCount):e.navigateTo({url:"/pages/goods_order_warning/goods_order_warning"});case 17:case"end":return r.stop()}}),r)})))()},getSpdmList:function(){if(this.kw.trim()&&0!==this.kw.length){1===this.time&&(console.log(this.time),this.time=this.time+1,e.showLoading({title:"搜索中..."})),this.reobj.spcxm=e.getStorageSync("dS").spcxm;var t=this.reobj.spcxm;console.log("当前查询商品:"+t),this.getSearchList3()}else this.searchResults=[]},getSearchList3:function(){var t=this;return(0,n.default)(s.default.mark((function r(){var a,n,i;return s.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(console.log("测试3"),a=t,a.kw.trim()&&0!==a.kw.length){r.next=5;break}return a.searchResults=[],r.abrupt("return");case 5:return t.reobj.spcxm=e.getStorageSync("dS").spcxm,t.reobj.spcxm,e.$http.beforeRequest=function(e){console.log("searchSpml"),-1!==e.url.indexOf("/api/SearchSpml")&&(e.header={"X-Ca-Key":"wxe7c826a1a5e00055","X-Service-Method":"SearchSpml"})},r.next=10,e.$http.post("/api/SearchSpml",t.reobj);case 10:if(n=r.sent,i=n.data,t.isloading=!1,99===i.result){r.next=15;break}return r.abrupt("return",e.$showMsg());case 15:null!==i.data?(t.searchResults=[].concat((0,o.default)(t.searchResults),(0,o.default)(i.data)),t.reobj.spdm=i.data.spdm,a.total=i.totalCount,t.reobj.drugsList=i.drugsList):e.navigateTo({url:"/pages/goods_order_warning/goods_order_warning"});case 16:case"end":return r.stop()}}),r)})))()},onReachBottom:function(){if(this.show="正在加载中...",this.reobj.pageIndex*this.reobj.pageSize>=this.total)return this.show="",2==this.times?(this.times=1,e.$showMsg("数据加载完毕!")):void 0;this.isloading||(this.reobj.pageIndex++,console.log("到达底部"),this.getSearchList3())},gotoDetail:function(t){e.navigateTo({url:"/pages/goods_order_detail/goods_order_detail?spdm="+t.spdm})}},mounted:function(){this.getSpdmList()}};t.default=c}).call(this,r("543d")["default"])},"9b0e":function(e,t,r){"use strict";var a=r("9c7b"),s=r.n(a);s.a},"9c7b":function(e,t,r){},c12e:function(e,t,r){"use strict";r.r(t);var a=r("334b"),s=r("6e06");for(var o in s)["default"].indexOf(o)<0&&function(e){r.d(t,e,(function(){return s[e]}))}(o);r("9b0e");var n=r("f0c5"),i=Object(n["a"])(s["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=i.exports},ff00:function(e,t,r){"use strict";(function(e,t){var a=r("4ea4");r("7711");a(r("66fd"));var s=a(r("c12e"));e.__webpack_require_UNI_MP_PLUGIN__=r,t(s.default)}).call(this,r("bc2e")["default"],r("543d")["createPage"])}},[["ff00","common/runtime","common/vendor"]]]);