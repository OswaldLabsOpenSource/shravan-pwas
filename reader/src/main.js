import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationArrow, faMap, faEnvelopeOpenText, faCubes, faSearchPlus, faChevronLeft, faCamera, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faLocationArrow, faMap, faEnvelopeOpenText, faCubes, faSearchPlus, faChevronLeft, faCamera, faSyncAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import Vue2TouchEvents from 'vue2-touch-events'
Vue.use(Vue2TouchEvents)

import VueTimeago from 'vue-timeago'
Vue.use(VueTimeago)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
