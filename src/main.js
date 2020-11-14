import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import Loading from './plugin/index'
import VueCookies from 'vue-cookies'

Vue.use(VueLazyload)
Vue.use(Loading)
Vue.use(VueCookies)

// set default config
Vue.$cookies.config('7d')

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})

fastclick.attach(document.body) // 解决移动端点击事件100ms+的延迟

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
