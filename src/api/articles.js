//基地址
import { http } from '../utils/http/'

//暴露接口
export const getArticlesByTime = ({channel_id, timestamp,with_top}) => {

    return http.get('/app/v1_1/articles', {

        params: {
            channel_id,
            timestamp,
            with_top

        }

    })
}