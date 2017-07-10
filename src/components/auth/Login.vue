<template>
  <div class="login" align="center">
    <b-card header="Login" class="login-card">
      <b-form-fieldset
        :label="$t('login.email')"
        :label-size="1"
        >

          <b-form-input v-model="email" class="email" v-validate="'required|email'" name="email" type="text" id="email-input"></b-form-input>
          <span v-show="errors.has('email')" class="help is-danger" id="email-error">{{ errors.first('email') }}</span>

        </b-form-fieldset>
        <b-form-fieldset
          :label="$t('login.password')"
          :label-size="1"
          >

            <b-form-input v-validate="'required'" name="password" type="password" v-model="password" id="password-input"></b-form-input>
            <span v-show="errors.has('password')" class="help is-danger" id="password-error">{{ errors.first('password') }}</span>

        </b-form-fieldset>
        <b-button @click.native="authenticate" id="login">Login</b-button>
        <b-alert variant="danger" class="m-t-15" dismissible :show="error !== ''" @dismissed="error=''">
            {{ error }}
        </b-alert>
      </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    authenticate () {
      // this.$store.dispatch('AUTHENTICATE', {email: this.email, password: this.password}).then(console.log('done'))
      // this.$store.dispatch('AUTHENTICATE', {email: this.email, password: this.password}, this)

      // The $auth object contains all the methods for controlling the auth state.
      // See the docs at https://github.com/websanova/vue-auth
      this.$auth.login({
        data: {email: this.email, password: this.password},
        rememberMe: true,
        fetchUser: false, // Do we want to fetch the user after login? Useful for validating roles
        redirect: {name: 'Hello'}, // Where do we want to redirect after?
        success (res) {

        },
        error (res) {
          this.error = res.message
          // Dispatch an error update to vuex (we can then re-use a generic error toast or something)
        }
      })
    }
  },
  computed: mapState([
    'auth'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .login-card {
    width: 30rem;
  }
</style>
