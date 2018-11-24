import 'babel-polyfill'; // es6 api 补丁(比如promise)
import fastclick from 'fastclick'; // 移动端300毫秒延迟

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import './common/stylus/index.styl'; // 引入样式

fastclick.attach(document.body); // 绑定到body上 body上面的点击事件就没有300ms的延迟


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
