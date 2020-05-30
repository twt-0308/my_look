import Vue from 'vue'
import VueRouter from 'vue-router'
const Register = () => import('@/views/register.vue')
const Login = () => import('@/views/login/Login.vue')
const Index = () => import('@/views/home/index.vue')

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
  }
]

const router = new VueRouter({
  routes
})

export default router
