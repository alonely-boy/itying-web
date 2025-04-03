import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
  baseURL:'http://localhost:3000/server/api'
  // baseURL:process.env.VUE_APP_API_URL || '/server/api',
})

http.interceptors.request.use((config)=>{
  config.headers.Authorization = localStorage.token || ''
  return config
})


http.interceptors.response.use((res)=>{
  return res
},(err)=>{
  if(err.response.data.message){
    Vue.prototype.$message.warning(err.response.data.message)
  }

  if(err.response.status === 401){
    router.push('/login')
  }
  if(err.response.status === 402){
    router.replace('/')
  }


  return Promise.reject(err)
})

export default http