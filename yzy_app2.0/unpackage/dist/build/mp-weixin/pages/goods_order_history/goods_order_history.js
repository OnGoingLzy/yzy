(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods_order_history/goods_order_history"],{"00d6":function(t,e,n){},3782:function(t,e,n){"use strict";n.r(e);var o=n("70d9"),i=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},"520e":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){}));var o=function(){var t=this.$createElement;this._self._c},i=[]},"70d9":function(t,e,n){"use strict";(function(t){var o=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("2eee")),r=o(n("448a")),s=o(n("c973")),a=o(n("9523")),u={components:{historyList:function(){n.e("components/goods_order/history_list/history_list").then(function(){return resolve(n("527c"))}.bind(null,n)).catch(n.oe)}},data:function(){var t;return t={show:this.showInit,showSync:!1,searchVal:this.searchValInit,searchResults:[],isShowInit:!0,lxdh:"",isloading:!0,time:1,times:2,total:""},(0,a.default)(t,"show",""),(0,a.default)(t,"reobj",{lxdh:"",pageIndex:1,pageSize:20}),t},onLoad:function(e){this.time=1,this.times=2,this.reobj.lxdh=t.getStorageSync("lxdh"),this.lxdh=t.getStorageSync("lxdh")},methods:{gethistoryList:function(){var e=this;return(0,s.default)(i.default.mark((function n(){var o,s;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(void 0!==e.lxdh&&""!==e.lxdh){n.next=2;break}return n.abrupt("return");case 2:return console.log("电话号码"+e.lxdh),1===e.time&&(console.log(e.time),e.time=e.time+1,t.showLoading({title:"搜索中..."})),t.$http.beforeRequest=function(t){t.header={"X-Ca-Key":"wxe7c826a1a5e00055","X-Service-Method":"SearchHistory"}},n.next=7,t.$http.post("/api/SearchHistory",e.reobj);case 7:if(o=n.sent,s=o.data,console.log(s),e.isloading=!1,99===s.result){n.next=13;break}return n.abrupt("return",t.$showMsg());case 13:if(null===s.data){n.next=19;break}e.searchResults=[].concat((0,r.default)(e.searchResults),(0,r.default)(s.data)),e.reobj.spdm=s.data.spdm,e.total=s.totalCount,n.next=20;break;case 19:return n.abrupt("return",t.$showMsg("暂无结果！"));case 20:case"end":return n.stop()}}),n)})))()}},onReachBottom:function(){if(this.show="正在加载中...",this.reobj.pageIndex*this.reobj.pageSize>=this.total)return this.show="",2==this.times?(this.times=1,t.$showMsg("数据加载完毕!")):void 0;this.isloading||(this.reobj.pageIndex++,this.gethistoryList())},mounted:function(){this.gethistoryList()}};e.default=u}).call(this,n("543d")["default"])},"883e":function(t,e,n){"use strict";n.r(e);var o=n("520e"),i=n("3782");for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("8d2e");var s=n("f0c5"),a=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=a.exports},"8d2e":function(t,e,n){"use strict";var o=n("00d6"),i=n.n(o);i.a},"99d1":function(t,e,n){"use strict";(function(t,e){var o=n("4ea4");n("7711");o(n("66fd"));var i=o(n("883e"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])}},[["99d1","common/runtime","common/vendor"]]]);