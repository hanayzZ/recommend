// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './routers'
import store from './vuex/store'
import './assets/js/base.js'
import './assets/mint-ui/lib/style.css'
// Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({routes: routerConfig})
new Vue({
  router,
  el: '#app',
  store,
  render: h => h(App)
})

