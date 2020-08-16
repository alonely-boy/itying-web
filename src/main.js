import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/global.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import http from './http'
Vue.prototype.$http = http

import preventClick from './controlClickState'
Vue.use(preventClick)
// Vue.prototype.$login = a

// function a(){
//     if(localStorage.id){
//       return
//     }else{
//       this.$message.error('登录失效')
//       this.$router.push('/login')
//     }
  
// }
Vue.use(ElementUI);
Vue.config.productionTip = false



Vue.filter('filterHTMLTag',function (msg) {
  msg = msg.replace(/<img.*?>/ig,"")
  msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
  msg = msg.replace(/[|]*\n/, '') //去除行尾空格
  msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
  return msg;
})
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)//传过来的时间

  const now = new Date()
  const ny = now.getFullYear()//今年
  const nm = now.getMonth()//这个月
  const nd = now.getDate()//今天
  const nhh = now.getHours()//今时
  const nowYear = new Date(ny,0)//今年1月1日0点
  const nowDay = new Date(ny,nm,nd)//今天0点
  const nowHour = new Date(ny,nm,nd,nhh)
  // console.log("dt",dt)
  // console.log("now",now)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '')
  const d = (dt.getDate() + '')
  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  // const ss = (dt.getSeconds() + '').padStart(2,'0')
  if(dt < nowYear){//去年的日期
    return  `${y}-${m}-${d}`
  }else if(dt >= nowYear && dt < nowDay -86400*1000){//上下二者之间
    return `${m}月${d}日`
  }else if(nowDay > dt && dt >= nowDay -86400*1000){//昨天的日期
    return `昨天 ${hh}:${mm}`
  }else if(nowHour > dt){//今天的日期
    return `今天 ${hh}:${mm}`
  }else {//1小时内的日期
    return `${Math.floor((now - dt)/1000/60 + 1)}分钟前`
  }

  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
