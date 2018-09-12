import Vue         from 'vue'
import store       from './store'
import router      from './route'
import App         from './components/App'

new Vue({
  el        : '#app',
  components: {App},
  template  : '<App/>',
  store,
  router,
})