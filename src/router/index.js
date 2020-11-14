import Vue from 'vue'

import VueRouter from 'vue-router'

// 组件按需加载  可查看文档Vue Router懒加载
const Home = () => import("../views/Home.vue")
const Ranker = () => import("../views/Ranker.vue")
const Mood = () => import("../views/Mood.vue")
const Commend = () => import("../views/Commend.vue")
const User = () => import("../views/User.vue")

Vue.use(VueRouter)

const routes = [
  {path:'/', redirect: '/Home'},
  {path:'/Home',component: Home,},
  {path:'/Mood', component: Mood},
  {path: '/Ranker', component: Ranker},
  {path: '/Commend', component: Commend},
  {path: '/User', component: User}
]

const router = new VueRouter({
  mode: 'history', //history模式，刷新会导致404，hash可以解决或者修改服务端配置
  base: process.env.BASE_URL,
  routes
})

export default router
