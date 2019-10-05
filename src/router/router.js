import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login/'
//导入home组件
import home from '../views/home/'
//导入tabber 栏组件
import tabbar from '../views/tabbar_layout/'

Vue.use(Router)

export default new Router({
  routes: [{

    path: '/login',
    component: login,
    name: 'login',
  }, {
    path: '',
    component: tabbar,
    children: [
      
      { path: "/home", component: home },
      { path: "", redirect: "/home" }
    
    ]
  }]
})