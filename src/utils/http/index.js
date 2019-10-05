//导入axios
import axios from 'axios'
//导入获取token
import {getUser} from '../storage/'

/*  原来的方法 存放在原型中 供其他组件使用 (缺点只能设置一个基地址)
 Vue.prototype.$axios =axios 
 2.以前设置基地址
    axios.defaults.baseURl ='http'

--------create(创建)多基地址----------------------
   1.独立到一个文件里, 到时候要改,方便
   2.create可以创建一个新的axios对象，写入baseURL(地址)，就代表这个新的axios对象用设置这个基地址

*/

export const http = axios.create({

    baseURL: "http://ttapi.research.itcast.cn/"
})

// 添加请求拦截器 很多地方获取token
http.interceptors.request.use(function (config) {
    //是否有值,有值添加 bearer
    if(getUser()){
        config.headers.Authorization=`Bearer ${getUser().token}`
    
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});