//导入http文件
import {http} from '../utils/http/'
//登录
export const login = (data) => {
    //返回值(promise对象)
    return http.post('/app/v1_0/authorizations', data)
}