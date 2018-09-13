<template>
  <div>
    <h1>SignIn</h1>
    <a href="#" @click.prevent="handleSignIn">sign-in with facebook</a>
  </div>
</template>

<script>

  import {mapActions} from 'vuex'
  import router       from '../../../route'

  export default {

    name: 'SignIn',

    methods: {

      ...mapActions('AuthModule', ['signIn']),

      async handleSignIn() {
        await this.signIn()
        router.push({name: 'Home'})
      },
    }
  }
</script>