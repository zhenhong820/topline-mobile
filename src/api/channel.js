//导入http 网页基地址
import {http} from '../utils/http/'

//暴露获取列表
export const getChannel = () => {

    return http.get('/app/v1_0/user/channels')
}
