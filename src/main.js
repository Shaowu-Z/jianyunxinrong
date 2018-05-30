// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import setting from "./playform/appApi.js";
import mui from "./playform/mui.js";
import "./playform/alert.js";
import "./playform/layer.js";
import "./playform/mui.js";
import './assets/css/common/mui.less'
import './assets/css/common/mui.min.less'
import './assets/css/common/icons-extend.less';
import './assets/css/common/common.less';
import './assets/css/common/style.less';
import './assets/css/common/layer.less';

Vue.use(router)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.HOST = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
