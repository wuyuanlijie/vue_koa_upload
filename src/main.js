// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import uploader from 'vue-simple-uploader'  //全局使用 全局声明
import App from './App'
import router from './router'

Vue.use(uploader) //使用别人的组件来构建项目
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
