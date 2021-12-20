import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VuexStore from '@/store/index'
// //重写VueRouter的push图数。解决Error: Redirected when going from“/”to "/cart" via a navigation guard
// const OriginPush=VueRouter.prototype.push;
// VueRouter.prototype.push=function(location,onResolve,onReject){
//   if(onResolve||onReject) return OriginPush.call(this,location,onResolve,onReject)
//   //如果出现异常提示，不显示异常
//   return OriginPush.call(this.location).catch(err=>err);
// }
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('@/views/Category.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: { needLogin:true },//需要登录界面就true，不要就是false
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta: { needLogin:true },//需要登录界面就true，不要就是false
    component: () => import('@/views/User.vue')
  },
  {
    path: '/address',
    name: 'Address',
    meta: { needLogin:true },//需要登录界面就true，不要就是false
    component: () => import('@/views/User.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    meta: { hideNav:true },
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/boutique',
    name: 'Boutique',
    component: () => import('@/views/Boutique.vue')
  },
  {
    path: '/toplist',
    name: 'Toplist',
    component: () => import('@/views/Toplist.vue')
  },
  {
    path: '/firstnewproduct',
    name: 'Firstnewproduct',
    component: () => import('@/views/Firstnewproduct.vue')
  },
  {
    path: '/promotionalitems',
    name: 'Promotionalitems',
    component: () => import('@/views/Promotionalitems.vue')
  },
  {
    path: '/quickselection',
    name: 'Quickselection',
    component: () => import('@/views/Quickselection.vue')
  },
  {
    path: '/allorders',
    name: 'Allorders',
    component: () => import('@/views/Allorders.vue')
  },
  {
    path: '/some',
    name: 'some',
    component: () => import('@/views/some.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});
//全局路由守卫
router.beforeEach((to,from,next)=>{
  // console.log(VuexStore.getters.logintoken)
  //拿取路由里面meta信息判断当前进入的路由是否需要登录才能进入
  if(to.meta.needLogin && !VuexStore.getters.logintoken){
    next('/login')
  }
  next();
});

export default router
