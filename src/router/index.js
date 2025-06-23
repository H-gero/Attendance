import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Protección de rutas
  Router.beforeEach((to, from, next) => {
    const authData = localStorage.getItem('authData')
    if (to.path !== '/login' && !authData) {
      next('/login')
    } else if (to.path === '/login' && authData) {
      next('/')
    } else {
      next()
    }
  })

  return Router
})
