import Vue       from 'vue'
import VueRouter from 'vue-router'
import Home      from '../components/pages/Home'

Vue.use(VueRouter)

const meta = {requiresAuth: true}
const router = new VueRouter({
  // mode  : 'history',
  routes: [
    {path: '/', component: Home, name: 'Home', meta}
  ]
})

export default router
