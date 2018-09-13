import Vue          from 'vue'
import Amplify      from 'aws-amplify'
import store        from './store'
import router       from './route'
import App          from './components/App'
import {AuthConfig} from "./lib/aws_auth"


Amplify.configure({
  Auth: AuthConfig
})

new Vue({
  el        : '#app',
  components: {App},
  template  : '<App/>',
  store,
  router,
})
