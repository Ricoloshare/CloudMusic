import Vue from 'vue'
// import Recommend from "../views/Recommend.vue";
// import Singer from "../views/Singer.vue";
// import Rank from "../views/Rank.vue";
// import Search from "../views/Search.vue";
import VueRouter from 'vue-router'

// 组件按需加载  可查看文档Vue Router懒加载
const Recommend = () => import("../views/Recommend.vue")
const Singer = () => import("../views/Singer.vue")
const Video = () => import("../views/Video.vue")
const Search = () => import("../views/Search.vue")
const Playlistdetail = () => import("../views/Playlistdetail.vue")

Vue.use(VueRouter)

const routes = [
  {path:'/', redirect: '/recommend'},
  {path:'/recommend',
   component: Recommend,
   children: [{path:'details/:id/:type', component: Playlistdetail}]
  },
  {path: '/search', component: Search },
  {path:'/video', component: Video},
  {path: '/singer', component: Singer }
]

const router = new VueRouter({
  mode: 'history', //history模式，刷新会导致404，hash可以解决或者修改服务端配置
  base: process.env.BASE_URL,
  routes
})

export default router
