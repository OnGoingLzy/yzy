(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-tag/components/uni-tag/uni-tag"],{532:function(t,n,e){"use strict";e.r(n);var i=e(533),r=e(535);for(var u in r)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return r[t]}))}(u);e(537);var a,c=e(72),o=Object(c["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,"1516016e",null,!1,i["components"],a);o.options.__file="uni_modules/uni-tag/components/uni-tag/uni-tag.vue",n["default"]=o.exports},533:function(t,n,e){"use strict";e.r(n);var i=e(534);e.d(n,"render",(function(){return i["render"]})),e.d(n,"staticRenderFns",(function(){return i["staticRenderFns"]})),e.d(n,"recyclableRender",(function(){return i["recyclableRender"]})),e.d(n,"components",(function(){return i["components"]}))},534:function(t,n,e){"use strict";var i;e.r(n),e.d(n,"render",(function(){return r})),e.d(n,"staticRenderFns",(function(){return a})),e.d(n,"recyclableRender",(function(){return u})),e.d(n,"components",(function(){return i}));var r=function(){var t=this,n=t.$createElement;t._self._c},u=!1,a=[];r._withStripped=!0},535:function(t,n,e){"use strict";e.r(n);var i=e(536),r=e.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=r.a},536:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={name:"UniTag",emits:["click"],props:{type:{type:String,default:"default"},size:{type:String,default:"normal"},text:{type:String,default:""},disabled:{type:[Boolean,String],default:!1},inverted:{type:[Boolean,String],default:!1},circle:{type:[Boolean,String],default:!1},mark:{type:[Boolean,String],default:!1},customStyle:{type:String,default:""}},computed:{classes:function(){var t=this.type,n=this.disabled,e=this.inverted,i=this.circle,r=this.mark,u=this.size,a=this.isTrue,c=["uni-tag--"+t,"uni-tag--"+u,a(n)?"uni-tag--disabled":"",a(e)?"uni-tag--"+t+"--inverted":"",a(i)?"uni-tag--circle":"",a(r)?"uni-tag--mark":"",a(e)?"uni-tag--inverted uni-tag-text--"+t:"","small"===u?"uni-tag-text--small":""];return c.join(" ")}},methods:{isTrue:function(t){return!0===t||"true"===t},onClick:function(){this.isTrue(this.disabled)||this.$emit("click")}}};n.default=i},537:function(t,n,e){"use strict";e.r(n);var i=e(538),r=e.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=r.a},538:function(t,n,e){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-tag/components/uni-tag/uni-tag.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-tag/components/uni-tag/uni-tag-create-component',
    {
        'uni_modules/uni-tag/components/uni-tag/uni-tag-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(532))
        })
    },
    [['uni_modules/uni-tag/components/uni-tag/uni-tag-create-component']]
]);