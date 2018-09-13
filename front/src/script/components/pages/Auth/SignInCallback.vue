<template>
  <div>
    <h4>now signining</h4>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>

  import {mapActions} from 'vuex'
  import router       from '../../../route'

  export default {

    name: 'SignInCallback',

    data() {
      return {
        error: false
      }
    },

    async mounted() {
      try {
        await this.signInCallback()
        router.push({name: 'Home'})
      } catch (e) {
        this.error = e
      }
    },

    methods: {
      ...mapActions('AuthModule', ['signInCallback'])
    }
  }
</script>