import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from './plugins/axios/index'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import '../cfg/settings.d.ts'

Vue.use(axios)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueReCaptcha, { siteKey: window.__env.captcha.key })
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
