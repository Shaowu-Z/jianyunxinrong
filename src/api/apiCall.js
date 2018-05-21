import Vue from 'vue'
import Axios from 'axios'

function ApiCall (param, url) {  // ajax请求的回掉函数
    let postUrl = window.INIT_API_URL + url
    // let options = {

    // }
    return Axios(param).then((res) => {
        return Promise.resolve(res)
    }).catch((res) => {
        return Promise.rejecte(res)
    })
}
export default ApiCall