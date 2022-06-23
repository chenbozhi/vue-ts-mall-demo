import axios from "axios";

//创建axios实例
const service = axios.create({
    baseURL: "https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
    timeout: 5000,
    headers: {
        "Content-type" : "application/json;charset=utf-8"
    }
})

//请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if(localStorage.getItem("token")){
        config.headers.token = localStorage.getItem("token") || ""
    }
    return config
})

//响应拦截
service.interceptors.response.use((res) => {
    const code : number = res.data.code
    if(code != 200){
        return Promise.reject(res.data)
    }
    return res.data
},(err) => {
    console.log(err)
})

export default service