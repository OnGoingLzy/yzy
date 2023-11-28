(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/vk-data-goods-sku-popup/vk-data-goods-sku-popup"],{697:function(e,t,o){"use strict";o.r(t);var n=o(698),r=o(700);for(var a in r)["default"].indexOf(a)<0&&function(e){o.d(t,e,(function(){return r[e]}))}(a);o(702);var u,i=o(72),c=Object(i["default"])(r["default"],n["render"],n["staticRenderFns"],!1,null,"1d216e7a",null,!1,n["components"],u);c.options.__file="components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.vue",t["default"]=c.exports},698:function(e,t,o){"use strict";o.r(t);var n=o(699);o.d(t,"render",(function(){return n["render"]})),o.d(t,"staticRenderFns",(function(){return n["staticRenderFns"]})),o.d(t,"recyclableRender",(function(){return n["recyclableRender"]})),o.d(t,"components",(function(){return n["components"]}))},699:function(e,t,o){"use strict";var n;o.r(t),o.d(t,"render",(function(){return r})),o.d(t,"staticRenderFns",(function(){return u})),o.d(t,"recyclableRender",(function(){return a})),o.d(t,"components",(function(){return n}));try{n={vkDataInputNumberBox:function(){return o.e("components/vk-data-input-number-box/vk-data-input-number-box").then(o.bind(null,767))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement,o=(e._self._c,e.themeColorFn("priceColor")),n=e.selectArr.join(" "),r=e.__map(e.goodsInfo[e.specListName],(function(t,o){var n=e.__get_orig(t),r=e.__map(t.list,(function(t,n){var r=e.__get_orig(t),a=e.__get_style([t.ishow?"":e.themeColorFn("disableStyle"),t.ishow?e.themeColorFn("btnStyle"):"",e.subIndex[o]==n?e.themeColorFn("activedStyle"):""]);return{$orig:r,s0:a}}));return{$orig:n,l0:r}})),a=e.outFoStock||4==e.mode||1!=e.mode?null:e.themeColorFn("addCartColor"),u=e.outFoStock||4==e.mode||1!=e.mode?null:e.themeColorFn("addCartBackgroundColor"),i=e.outFoStock||4==e.mode||1!=e.mode?null:e.themeColorFn("buyNowColor"),c=e.outFoStock||4==e.mode||1!=e.mode?null:e.themeColorFn("buyNowBackgroundColor"),s=e.outFoStock||4==e.mode||1==e.mode||2!=e.mode?null:e.themeColorFn("addCartColor"),l=e.outFoStock||4==e.mode||1==e.mode||2!=e.mode?null:e.themeColorFn("addCartBackgroundColor"),d=e.outFoStock||4==e.mode||1==e.mode||2==e.mode||3!=e.mode?null:e.themeColorFn("buyNowColor"),f=e.outFoStock||4==e.mode||1==e.mode||2==e.mode||3!=e.mode?null:e.themeColorFn("buyNowBackgroundColor");e.$mp.data=Object.assign({},{$root:{m0:o,g0:n,l1:r,m1:a,m2:u,m3:i,m4:c,m5:s,m6:l,m7:d,m8:f}})},a=!1,u=[];r._withStripped=!0},700:function(e,t,o){"use strict";o.r(t);var n=o(701),r=o.n(n);for(var a in n)["default"].indexOf(a)<0&&function(e){o.d(t,e,(function(){return n[e]}))}(a);t["default"]=r.a},701:function(e,t,o){"use strict";(function(e){var n=o(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,a=n(o(30)),u=n(o(18)),i=n(o(13)),c=n(o(32)),s={},l={name:"vk-data-goods-sku-popup",emits:["update:modelValue","input","update-goods","open","close","add-cart","buy-now","cart","buy","num-change"],props:{value:{Type:Boolean,default:!1},modelValue:{Type:Boolean,default:!1},goodsId:{Type:String,default:""},action:{Type:String,default:""},noStockText:{Type:String,default:"该商品已抢完"},stockText:{Type:String,default:"库存"},goodsIdName:{Type:String,default:"_id"},skuIdName:{Type:String,default:"_id"},skuListName:{Type:String,default:"sku_list"},isRxName:{Type:String,default:"false"},specListName:{Type:String,default:"spec_list"},stockName:{Type:String,default:"stock"},skuArrName:{Type:String,default:"sku_name_arr"},defaultSingleSkuName:{Type:String,default:"默认"},mode:{Type:Number,default:1},maskCloseAble:{Type:Boolean,default:!0},borderRadius:{Type:[String,Number],default:0},goodsThumbName:{Type:[String],default:"goods_thumb"},goodsThumbBackgroundColor:{Type:String,default:"transparent"},minBuyNum:{Type:[String,String],default:1},maxBuyNum:{Type:[String,String],default:1e5},stepBuyNum:{Type:[Number,String],default:1},stepStrictly:{Type:Boolean,default:!1},customAction:{Type:[Function],default:null},localdata:{type:Object},priceColor:{Type:String},buyNowText:{Type:String,default:"提交需求"},buyNowColor:{Type:String},buyNowBackgroundColor:{Type:String},addCartText:{Type:String,default:"加入购物车"},addCartColor:{Type:String},addCartBackgroundColor:{Type:String},disableStyle:{Type:Object,default:null},activedStyle:{Type:Object,default:null},btnStyle:{Type:Object,default:null},showClose:{Type:Boolean,default:!0},closeImage:{Type:String,default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAEyUlEQVR42sSZeWwNURTGp4OqtBo7sSXELragdkpQsRRJ1Zr4hyJiJ9YgxNIg1qANiT+E1i5IY0kVVWtQEbuEKLFGUSH27/ANN5PXmTvzupzkl/tm8t6b7517lnvvC0lKSjJ8WmnQAUSDFqABqALKgl8gD7wE90E2SAeXwFf1SxISErQeVtKHwCgwFsSDSIf3hYFKoCkYDBaDdyAViHdueHmoF6FtwDLQ23b/E7gM7oIcejIERIDaoBFoC8qA8mA8SQNz6W1XC9GY+nCQCCYAk/c+gF0gBZwH312+IxR0BCPBUIaH2A+wHsxHCHxx+gLT5QGN6a2JfG8uvVCDws9oiDQYlxkMGfHyQvARlADTwcXk5OT6foV2kS8ATXidymlcyen1a/Jjl9IJh3hPkjELYqO8Cu0KjjNZvtETw5jFBWXPmGSTGQKSeOn5iQ0kVLL0CINfPNcPbDMKyRCbGzEMBJ+ZD8cChYFdqGTqfsWT8otPGoVsEHsMwxDFs3shNsxJ6BrQ0Po8OGUUkVHsNCVml+cntB1jUWwn2GEUsTEMrASbDK+2CCQ0kYX6nfLLisMmKqUr0S60M+jG10vAm+JSCa8+x7CKlzHwaktV6DiObzUzPJIxFO1BQ12wGtTReO9GetVgY/kjNJzZbcWmTjHfxw51AsRqvL8eOAtmsJuFu3g1l+1ZLB5eDTVZ3K0P7tL0TkWOpSg61kVkBtuuNRthGs+wtJST5aQI7cEbkkRXNYVKgX6kIdYuUhYzMQwxN8tiExCLFqHNeSF9/aem0BzGp5PYQCJ7c/Gsk1RfuSD6U1dNpcDf9ZigTmKbMRZ9iVTsHscGJluW2FMf1SSQWGnBmaB6kCJVTVVNJZE++Cx9drEllS1KMCINpURFmEbBWA63Fz9s95cGIdJgp/zXmT4pZcOvSUzuZttTbblmnc3PIjjmidDXvKgdhMh0JdbzuCjWrbNOVovjS5P7bkPJ/mBESkz2BO0166ybNeJ431S2q+01NntuIq3E0amzjiZtk9tssWyTDzO4525bACK9NAUn68TtkNhpEXpOSagRml+S6iLSSeweHv242Qhl13rRyvoDvDlKyTQny/ZQJ+1iH7vVbEx7OR5UiKVIO7VicgvHCtwrudloMIV7/0uadVYW57O4Wvvi8v4pymlKkrpwvsDeLLZAY2pkwbAB3PSQfC+4cH7l4k1ZH8zkZRq8ecO+Z5rN40JJqnXFuGfaxPCTLjcn0OZOpnArXw8HY4paIbw5CcMgXq6HN2/mt6+XGLrN15tBryIUGavMpCTrfKcDCKkAceA9S8nhAOehhSUyhXpkBxxnP4YM1InugP7cBkjBPcqVUWFYCEROxXiQz5JlXV+IfKh7mpfJac+lZ6V87QXVClBkTc7YWsWTPSDyitfzUTlJlj8TbvE6jluDOdwZ+jX57GLO3ADeuyZrDYi86vV81FD2UVGsmT+5Zl0BnkhoseOEaogL46pqO4v/IqUEyalIR4h85BgjHv6+aUWRMbb7EstX6O0cpT1Gco0ry8fWygLDMjmDnQeBt3Qe7uVfkeugDwVLcsVzGsuwLXbV+I63XNAkG5r/hvgRqgqWs6pJPKrsbvz/Q6yyun0w/h6lP+BnzrCpfPMT2L8FGAA7k1GZ/vnaqAAAAABJRU5ErkJggg=="},hideStock:{Type:Boolean,default:!0},theme:{Type:String,default:"default"},actionTips:{Type:String,default:"请求中..."},defaultSelect:{Type:Object},useCache:{Type:Boolean,default:!0},defaultGoods:{Type:Object},amountType:{Type:Number,default:1},selectedInit:{Type:Boolean,default:!1},safeAreaInsetBottom:{Type:Boolean,default:!0}},data:function(){return{complete:!1,goodsInfo:{},isShow:!1,initKey:!0,shopItemInfo:{},selectArr:[],subIndex:[],selectShop:{},selectNum:this.minBuyNum||1,note:"",outFoStock:!1,openTime:0,themeColor:{default:{priceColor:"rgb(254, 86, 10)",buyNowColor:"#ffffff",buyNowBackgroundColor:"rgb(254, 86, 10)",addCartColor:"#ffffff",addCartBackgroundColor:"rgb(255, 148, 2)",btnStyle:{color:"#333333",borderColor:"#f4f4f4",backgroundColor:"#ffffff"},activedStyle:{color:"rgb(254, 86, 10)",borderColor:"rgb(254, 86, 10)",backgroundColor:"rgba(254,86,10,0.1)"},disableStyle:{color:"#c3c3c3",borderColor:"#f6f6f6",backgroundColor:"#f6f6f6"}},"red-black":{priceColor:"rgb(255, 68, 68)",buyNowColor:"#ffffff",buyNowBackgroundColor:"rgb(255, 68, 68)",addCartColor:"#ffffff",addCartBackgroundColor:"rgb(85, 85, 85)",activedStyle:{color:"rgb(255, 68, 68)",borderColor:"rgb(255, 68, 68)",backgroundColor:"rgba(255,68,68,0.1)"}},"black-white":{priceColor:"rgb(47, 47, 52)",buyNowColor:"#ffffff",buyNowBackgroundColor:"rgb(47, 47, 52)",addCartColor:"rgb(47, 47, 52)",addCartBackgroundColor:"rgb(235, 236, 242)",activedStyle:{color:"rgb(47, 47, 52)",borderColor:"rgba(47,47,52,0.12)",backgroundColor:"rgba(47,47,52,0.12)"}},coffee:{priceColor:"rgb(195, 167, 105)",buyNowColor:"#ffffff",buyNowBackgroundColor:"rgb(195, 167, 105)",addCartColor:"rgb(195, 167, 105)",addCartBackgroundColor:"rgb(243, 238, 225)",activedStyle:{color:"rgb(195, 167, 105)",borderColor:"rgb(195, 167, 105)",backgroundColor:"rgba(195, 167, 105,0.1)"}},green:{priceColor:"rgb(99, 190, 114)",buyNowColor:"#ffffff",buyNowBackgroundColor:"rgb(99, 190, 114)",addCartColor:"rgb(99, 190, 114)",addCartBackgroundColor:"rgb(225, 244, 227)",activedStyle:{color:"rgb(99, 190, 114)",borderColor:"rgb(99, 190, 114)",backgroundColor:"rgba(99, 190, 114,0.1)"}}}}},created:function(){var e=this;r=e.vk,e.valueCom&&e.open()},mounted:function(){},methods:{init:function(e){var t=this;t.selectArr=[],t.subIndex=[],t.selectShop={},t.selectNum=t.minBuyNum||1,t.outFoStock=!1,t.shopItemInfo={};var o=t.specListName;t.goodsInfo[o].map((function(e){t.selectArr.push(""),t.subIndex.push(-1)})),t.checkItem(),t.checkInpath(-1),e||t.autoClickSku()},findGoodsInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this,o=e.useCache;if("undefined"==typeof r)return t.toast("custom-action必须是function","none"),!1;var n=t.actionTips,a="",u=!1;"custom"!==n?a=o?"":"请求中...":u=!o,r.callFunction({url:t.action,title:a,loading:u,data:{goods_id:t.goodsId},success:function(e){t.updateGoodsInfo(e.goodsInfo),s[t.goodsId]=e.goodsInfo,t.$emit("update-goods",e.goodsInfo)},fail:function(){t.updateValue(!1)}})},updateValue:function(e){var t=this;e?(t.$emit("open",!0),t.$emit("input",!0),t.$emit("update:modelValue",!0)):(t.$emit("input",!1),t.$emit("close","close"),t.$emit("update:modelValue",!1))},updateGoodsInfo:function(e){var t=this,o=t.skuListName;"{}"===JSON.stringify(t.goodsInfo)||t.goodsInfo[t.goodsIdName]!==e[t.goodsIdName]?(t.goodsInfo=e,t.initKey=!0):t.goodsInfo[o]=e[o],t.initKey&&(t.initKey=!1,t.init());var n=t.getListItem(t.goodsInfo[o],t.skuIdName,t.selectShop[t.skuIdName]);Object.assign(t.selectShop,n),t.defaultSelectSku(),t.complete=!0},open:function(){var e=this;return(0,c.default)(a.default.mark((function t(){var o,n,r,u,c,l;return a.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(o=e,o.openTime=(new Date).getTime(),n=!0,o.skuListName,r=!1,u=s[o.goodsId],u&&o.useCache?(r=!0,o.updateGoodsInfo(u)):o.complete=!1,!o.customAction||"function"!==typeof o.customAction){t.next=33;break}return t.prev=8,t.next=11,o.customAction({useCache:r,goodsId:o.goodsId,goodsInfo:u,close:function(){setTimeout((function(){o.close()}),500)}}).catch((function(e){setTimeout((function(){o.close()}),500)}));case 11:u=t.sent,t.next=21;break;case 14:if(t.prev=14,t.t0=t["catch"](8),c=t.t0.message,l=void 0===c?"":c,!(l.indexOf(".catch is not a function")>-1)){t.next=21;break}return o.toast("custom-action必须返回一个Promise","none"),setTimeout((function(){o.close()}),500),t.abrupt("return",!1);case 21:if(s[o.goodsId]=u,!u||"object"!=(0,i.default)(u)||"{}"==JSON.stringify(u)){t.next=28;break}n=!1,o.updateGoodsInfo(u),o.updateValue(!0),t.next=31;break;case 28:return o.toast("未获取到商品信息","none"),o.$emit("input",!1),t.abrupt("return",!1);case 31:t.next=47;break;case 33:if("undefined"===typeof o.localdata||null===o.localdata){t.next=46;break}if(u=o.localdata,!u||"object"!=(0,i.default)(u)||"{}"==JSON.stringify(u)){t.next=41;break}n=!1,o.updateGoodsInfo(u),o.updateValue(!0),t.next=44;break;case 41:return o.toast("未获取到商品信息","none"),o.$emit("input",!1),t.abrupt("return",!1);case 44:t.next=47;break;case 46:n&&o.findGoodsInfo({useCache:r});case 47:case"end":return t.stop()}}),t,null,[[8,14]])})))()},close:function(e){var t=this;if((new Date).getTime()-t.openTime<400)return!1;"mask"==e?!1!==t.maskCloseAble&&(t.$emit("input",!1),t.$emit("close","mask"),t.$emit("update:modelValue",!1)):(t.$emit("input",!1),t.$emit("close","close"),t.$emit("update:modelValue",!1))},moveHandle:function(){},skuClick:function(e,t,o){var n=this;e.ishow&&(n.selectArr[t]!=e.name?(n.$set(n.selectArr,t,e.name),n.$set(n.subIndex,t,o)):(n.$set(n.selectArr,t,""),n.$set(n.subIndex,t,-1)),n.checkInpath(t),n.checkSelectShop())},checkSelectShop:function(){var e=this;e.selectArr.every((function(e){return""!=e}))?(e.selectShop=e.shopItemInfo[e.getArrayToSting(e.selectArr)],e.selectNum>e.maxBuyNum&&(e.selectNum=e.maxBuyNum)):e.selectShop={}},checkInpath:function(e){for(var t=this,o=t.specListName,n=t.goodsInfo[o],r=0,a=n.length;r<a;r++)if(r!=e)for(var i=n[r].list.length,c=0;c<i;c++)if(-1==t.subIndex[r]||c!=t.subIndex[r]){var s=(0,u.default)(t.selectArr);t.$set(s,r,n[r].list[c].name);var l=s.filter((function(e){return""!==e&&"undefined"!==typeof e}));t.shopItemInfo.hasOwnProperty(t.getArrayToSting(l))?n[r].list[c].ishow=!0:n[r].list[c].ishow=!1}t.$set(t.goodsInfo,o,n)},checkItem:function(){var e=this,t=e.stockName,o=e.skuListName,n=e.goodsInfo[o],r=[];n.map((function(e,o){r.push(e),e[t]}));r.reduce((function(t,o){return t.concat(o[e.skuArrName].reduce((function(t,n){return t.concat(t.map((function(t){return e.shopItemInfo.hasOwnProperty(e.getArrayToSting([].concat((0,u.default)(t),[n])))||(e.shopItemInfo[e.getArrayToSting([].concat((0,u.default)(t),[n]))]=o),[].concat((0,u.default)(t),[n])})))}),[[]]))}),[[]])},getArrayToSting:function(e){var t="";return e.map((function(e,o){e=e.replace(/\./g,"。"),t+=0==o?e:","+e})),t},checkSelectComplete:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this,o=(new Date).getTime();if(t.clickTime&&o-t.clickTime<400)return!1;t.clickTime=o;var n=t.selectShop;t.selectNum,t.stockText,t.stockName;if(!n||!n[t.skuIdName])return t.toast('请先选择对应"门店"和"规格"',"none"),!1;"function"==typeof e.success&&e.success(n)},addCart:function(){var e=this;e.checkSelectComplete({success:function(t){t.buy_num=e.selectNum,e.$emit("add-cart",t),e.$emit("cart",t)}})},buyNow:function(){this.$set(this.selectShop,"note",this.note);var e=this;e.checkSelectComplete({success:function(t){console.log(t),t.buy_num=e.selectNum,e.$emit("buy-now",t),e.$emit("buy",t)}})},toast:function(t,o){e.showToast({title:t,icon:o})},getListItem:function(e,t,o){var n;for(var r in e)if("object"==(0,i.default)(o)){if(JSON.stringify(e[r][t])===JSON.stringify(o)){n=e[r];break}}else if(e[r][t]===o){n=e[r];break}return n},getListIndex:function(e,t,o){for(var n=-1,r=0;r<e.length;r++)if(e[r][t]===o){n=r;break}return n},autoClickSku:function(){for(var e=this,t=(e.stockName,e.goodsInfo[e.skuListName],e.goodsInfo[e.specListName]),o=t[0].list,n=0;n<o.length;n++){e.skuClick(o[n],0,n);break}},themeColorFn:function(e){var t=this,o=t.theme,n=t.themeColor,r=t[e]?t[e]:n[o][e];return r},defaultSelectSku:function(){var e=this,t=e.defaultSelect;t&&t.sku&&t.sku.length>0&&e.selectSku(t)},selectSku:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this,o=e.sku,n=e.num,r=t.goodsInfo[t.specListName];if(o&&r.length===o.length){for(var a=[],u=!0,i=0;i<o.length;i++){var c=o[i],s=r[i].list,l=i,d=t.getListIndex(s,"name",c);if(-1==d){u=!1;break}a.push({spec:s[d],index1:l,index2:d})}u&&(t.init(!0),a.map((function(e){t.skuClick(e.spec,e.index1,e.index2)})))}n>0&&(t.selectNum=n)},priceFilter:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=this;return"string"==typeof e?e:0===t.amountType?e.toFixed(2):(e/100).toFixed(2)},pushGoodsCache:function(e){var t=this,o=t.goodsIdName;s[e[o]]=e},stop:function(){},previewImage:function(){if("true"!=this.goodsInfo.isRx){var t=this,o=t.selectShop,n=t.goodsInfo,r=t.goodsThumbName,a=o.image?o.image:n[r];a&&e.previewImage({urls:[a]})}},getMaxStock:function(){var e=0,t=this,o=t.selectShop,n=void 0===o?{}:o,r=t.goodsInfo,a=void 0===r?{}:r,u=t.skuListName,i=t.stockName;if(n[i])e=n[i];else{var c=a[u];if(c&&c.length>0){var s=[];c.map((function(e,t){s.push(e[i])}));Math.max.apply(Math,s);e=1e4}}return e},numChange:function(e){this.$emit("num-change",e.value)}},computed:{valueCom:function(){return this.value},maxBuyNumCom:function(){var e=this,t=e.getMaxStock(),o=e.maxBuyNum;return o>t&&(o=t),o},isManyCom:function(){var e=this,t=e.goodsInfo,o=e.defaultSingleSkuName,n=e.specListName,r=!0;return t[n]&&1===t[n].length&&1===t[n][0].list.length&&t[n][0].name===o&&(r=!1),r},priceCom:function(){var e="",t=this,o=t.selectShop,n=void 0===o?{}:o,r=t.goodsInfo,a=void 0===r?{}:r,u=t.skuListName,i=t.skuIdName;if(n[i])e=t.priceFilter(n.price);else{var c=a[u];if(c&&c.length>0){var s=[];c.map((function(e,t){s.push(e.price)}));var l=t.priceFilter.apply(t,s),d=t.priceFilter.apply(t,s);e=l===d?l+"":"".concat(l," - ").concat(d)}}return e},stockCom:function(){var e="",t=this,o=t.selectShop,n=void 0===o?{}:o,r=t.goodsInfo,a=void 0===r?{}:r,u=t.skuListName,i=t.stockName;if(n[i])e=n[i];else{var c=a[u];if(c&&c.length>0){var s=[];c.map((function(e,t){s.push(e[i])})),e=s}}return e}},watch:{valueCom:function(e,t){var o=this;e&&o.open()},defaultGoods:{immediate:!0,handler:function(e,t){var o=this,n=o.goodsIdName;"object"===(0,i.default)(e)&&e&&e[n]&&!s[e[n]]&&o.pushGoodsCache(e)}}}};t.default=l}).call(this,o(2)["default"])},702:function(e,t,o){"use strict";o.r(t);var n=o(703),r=o.n(n);for(var a in n)["default"].indexOf(a)<0&&function(e){o.d(t,e,(function(){return n[e]}))}(a);t["default"]=r.a},703:function(e,t,o){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/vk-data-goods-sku-popup/vk-data-goods-sku-popup-create-component',
    {
        'components/vk-data-goods-sku-popup/vk-data-goods-sku-popup-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(697))
        })
    },
    [['components/vk-data-goods-sku-popup/vk-data-goods-sku-popup-create-component']]
]);
