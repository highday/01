import Vue            from 'vue'
import VueRouter      from 'vue-router'
import Home           from '../components/pages/Home'
import SignIn         from '../components/pages/Auth/SignIn'
import SignInCallback from '../components/pages/Auth/SignInCallback'
import store          from '../store'

Vue.use(VueRouter)

const meta = {requiresAuth: true}
const router = new VueRouter({
  mode  : 'history',
  routes: [
    {path: '/', component: Home, name: 'Home', meta},
    {path: '/signin', name: 'SignIn', component: SignIn},
    {path: '/signin/callback', name: 'SignInCallback', component: SignInCallback},
  ]
})

router.beforeEach(async (to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {

    // if (true !== store.getters['AuthModule/isAuth']) {
    //   await store.dispatch('AuthModule/autoSignIn')
    // }

    if (true !== store.getters['AuthModule/isAuth']) {
      return next({
        path : '/signin',
        query: {redirect: to.fullPath}
      })
    }
  }

  next()
})
export default router
