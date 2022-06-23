import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: 'goods',
    children: [
      {
        path: 'goods',
        name: 'GoodsView',
        meta: {
          isShow: true,  // 是否需要被展示出来
          title: "商品列表"
        },
        component: () => import('../views/goods/GoodsView.vue')
      },
      {
        path: 'user',
        name: 'UserView',
        meta: {
          isShow: true,  // 是否需要被展示出来
          title: "用户列表"
        },
        component: () => import('../views/user/UserView.vue')
      },
      {
        path: 'role',
        name: 'RoleView',
        meta: {
          isShow: true,  // 是否需要被展示出来
          title: "角色列表"
        },
        component: () => import('../views/role/RoleView.vue')
      },
      {
        path: 'authority',
        name: 'AuthorityView',
        meta: {
          isShow: false,  // 是否需要被展示出来
          title: "角色列表"
        },
        component: () => import('../views/authority/AuthorityView.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem("token")
  if(!token && to.path !== "/login"){
    next("/login")
  }
  else{
    next()
  }
})

export default router
