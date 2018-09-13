import Vue                  from 'vue'
import Vuex                 from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import AppModule            from './modules/app'
import AuthModule           from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppModule
    , AuthModule
  },
  plugins: [createPersistedState()]
})

store.dispatch('AuthModule/initialize')

export default store