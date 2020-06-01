import Vue from 'vue'
import VueRouter from 'vue-router'
const Register = () => import('@/views/register.vue')
const Login = () => import('@/views/login/Login.vue')
const Index = () => import('@/views/home/index.vue')
const User = () => import('@/views/user/User.vue')
const Edit = () => import('@/views/user/childCom/Edit.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Index
  },
  {
    path: '/user',
    component: User,
    meta: {
      isToken: true
    }
  },
  {
    path: '/edit',
    component: Edit,
    meta: {
      isToken: true
    }
  }
]

const router = new VueRouter({
  routes
})

// 导航首位
router.beforeEach((to, from, next) => {
  // 如果访问注册登录放行
  if (to.path === '/' || to.path === '/login') return next()
  // 获取token
  const token = localStorage.getItem('token')
  if (!token && to.meta.isToken) return next('/login')
  next()
})
export default router
