import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Location from './views/Location.vue'
import Magnifier from './views/Magnifier.vue'

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
      component: Location
    },
    {
      path: '/magnifier',
      name: 'Magnifier',
      component: Magnifier
    }
  ]
})
