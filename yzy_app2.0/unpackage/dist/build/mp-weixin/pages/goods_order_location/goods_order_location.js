(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods_order_location/goods_order_location"],{"79bc":function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){}));var o=function(){var t=this.$createElement;this._self._c},c=[]},"7df0":function(t,n,e){"use strict";(function(t,n){var o=e("4ea4");e("7711");o(e("66fd"));var c=o(e("8867"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(c.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},8867:function(t,n,e){"use strict";e.r(n);var o=e("79bc"),c=e("c3bf");for(var a in c)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return c[t]}))}(a);var u=e("f0c5"),r=Object(u["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);n["default"]=r.exports},c3bf:function(t,n,e){"use strict";e.r(n);var o=e("eb1d"),c=e.n(o);for(var a in o)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=c.a},eb1d:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{}},onLoad:function(){t.$showMsg("请先获取位置信息！"),t.getLocation({type:"gcj02",success:function(n){console.log(n),t.setStorageSync("wd",n.latitude),t.setStorageSync("jd",n.longitude),t.$showMsg("获取定位成功！"),t.navigateBack({delta:1})}})}};n.default=e}).call(this,e("543d")["default"])}},[["7df0","common/runtime","common/vendor"]]]);