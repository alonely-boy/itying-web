import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',

    component: Home,//整个大home框架,分为上navbar,左homeleft和右homeright，左homeleft中的文章需要根据路由决定
    children: [
      {//左Homeleft下的子组件
        path: '/', component: () => import('@/components/childs/HomeLeft.vue'), children: [
          { path: '/', component: () => import('@/components/childs/content/New') },//home+homeleft+self
          { path: '/school', component: () => import('@/components/childs/content/School') },//home+homeleft+self
          { path: '/it', component: () => import('@/components/childs/content/IT') },//home+homeleft+self
          { path: '/share', component: () => import('@/components/childs/content/Share') },//home+homeleft+self
          { path: '/question', component: () => import('@/components/childs/content/Question') },//home+homeleft+self
          { path: '/hot', component: () => import('@/components/childs/content/Hot') },//home+homeleft+self
        ]
      },
      {//左的同级组件,但还是在Home下
        path:'/star',component: () => import('@/components/childs/Star.vue')
      },
      {
        path:'/editcenter',component: () => import('@/components/childs/EditCenter.vue')
      },
      {
        path: '/article:article', component: () => import('@/components/childs/Article.vue'),//home+self
      }

    ]
  },

  {//下面开始为大页面路由，与Home同级，navbar,homeright根据需求添加
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '../views/Register.vue')
  },
  {
    path: '/write',
    name: 'Write',
    component: () => import(/* webpackChunkName: "wrie" */ '../views/Write.vue')
  },
  {
    path: '/edit:article', component: () => import('../views/Edit.vue'),
  },
  {
    path:'*',component:()=>import('../views/Error.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  // console.log(to.path)
  let judge = true
  const list = ['/write','/star','/editcenter']
  for(let i of list){
    if(i == to.path){
      judge = false
      break
    }
  }
  if(!judge&&!localStorage.token){
    Vue.prototype.$message.warning('请先登录')
    next('/login')
  }else{
    next()
  }
  
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
