// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import $ from 'jquery'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import setting from "./playform/appApi.js";
import mui from "./playform/mui.js";
import "./playform/alert.js";
import "./playform/layer.js";
import './assets/css/common/mui.less'
import './assets/css/common/mui.min.less'
import './assets/css/common/icons-extend.less';
import './assets/css/common/common.less';
import './assets/css/common/style.less';
import './assets/css/common/layer.less';

let http = axios.create({
  baseURL: '/api',
  timeout: 10000,
  // transformRequest: [function (data) {
  //   // Do whatever you want to transform the data
  //   return Qs.stringify(data)
  // }]
})
Vue.use(http)
Vue.use(router)
Vue.use(mui)
// Vue.prototype.$http = axios
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.prototype.HOST = ''

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
