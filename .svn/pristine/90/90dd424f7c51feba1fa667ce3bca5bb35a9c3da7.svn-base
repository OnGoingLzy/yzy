import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import store from '@/store/store.js'
Vue.prototype.$store = store;
import share from './common/share.js'
import getOpenid from './common/getOpenid.js'
Vue.mixin(share)
Vue.mixin(getOpenid)

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'

uni.$http = $http

// 请求的根路径
$http.baseUrl = 'https://appletservice.dyb.yn.cn'
//$http.baseUrl = 'http://localhost:58309'

// 请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: '数据加载中...'
	})

	// 判断当前请求的是否为有权限的接口
	if (options.url.indexOf('/my/') !== -1) {
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
}

// 响应拦截器
$http.afterRequest = function() {
	uni.hideLoading()
}

//权限跳转
Vue.prototype.navigateTo = (options) => {
	if (!store.state.user.loginStatus) {
		uni.showToast({
			title: "请先登录",
			icon: "none"
		})
		return uni.navigateTo({
			url: "/pages/login/login"
		})
	}
	uni.redirectTo(options)
}

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()

// 封装弹框的方法
uni.$showMsg = function(title = '数据请求失败！', duration = 1000) {
	uni.showToast({
		title: title,
		duration: duration,
		icon: 'none',
		mask: true
	})
}
