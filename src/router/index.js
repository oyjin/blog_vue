import { createRouter, createWebHistory } from 'vue-router'
import Blogs from '../views/Blogs.vue'
import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Blogs' }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    component: BlogEdit,
    meta: {
      requireAuth: true
    }
  }
]

const router = createRouter({
  // 如果路由中要带#，history设为createWebHashHistory()
  history: createWebHistory(),
  routes
})

export default router
