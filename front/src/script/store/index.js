import Vue                  from 'vue'
import Vuex                 from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import AppModule            from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    AppModule
  },
  plugins: [createPersistedState()]
})

export default store