import Vue from 'vue'
import App from './App'

import utils from './utils/index';
import https from './https/request';
import apipath from './https/api'

import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$https = https;
Vue.prototype.$utils = utils;
Vue.prototype.$apipath = apipath


const app = new Vue({
  ...App
})
app.$mount()
