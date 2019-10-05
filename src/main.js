import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/'

//导入vant 插件
import Vant from 'vant';
import 'vant/lib/index.css'
Vue.use(Vant);

//rem单位转换插件 导入第三方包的文件
import 'amfe-flexible'

//导入less 的样式
import './styles/base.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')