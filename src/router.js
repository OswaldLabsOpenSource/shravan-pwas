import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/location',
      name: 'Location',
      component: () => import(/* webpackChunkName: "location" */ './views/Location.vue')
    },
    {
      path: '/magnifier',
      name: 'Magnifier',
      component: () => import(/* webpackChunkName: "Magnifier" */ './views/Magnifier.vue')
    }
  ]
})
