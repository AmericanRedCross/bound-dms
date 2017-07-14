<template>
  <div class="login" align="center">
    <b-card header="Login" class="login-card">
      <div class="form-group" v-bind:class="{error: $v.email.$error}">
        <b-form-fieldset
          :label="$t('login.email')"
          :label-size="1"
          >

          <b-form-input
            v-model="email"
            type="text"
            id="email-input"
            v-on:input="$v.email.$touch"
            v-bind:class="{error: $v.email.$error, valid: $v.email.$dirty && !$v.email.$invalid}">
          </b-form-input>
          <span class="form-group__message" v-if="!$v.email.required">Field is required</span>
        </b-form-fieldset>
      </div>
      <div class="form-group" v-bind:class="{ 'form-group--error': $v.password.$error }">
        <b-form-fieldset
          :label="$t('login.password')"
          :label-size="1"
          >

          <b-form-input
            v-model="password"
            type="password"
            id="password-input"
            v-on:input="$v.password.$touch"
            v-bind:class="{error: $v.password.$error, valid: $v.password.$dirty && !$v.password.$invalid}">
          </b-form-input>

          <span class="form-group__message" v-if="!$v.password.required">Field is required</span>
        </b-form-fieldset>
      </div>
      <b-button @click.native="authenticate" id="login">Login</b-button>
      <b-alert variant="danger" class="m-t-15" dismissible :show="error !== ''" @dismissed="error=''">
          {{ error }}
      </b-alert>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  validations: {
    email: {
      required
    },
    password: {
      required
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
  .error {
    border-color: #ff3860;
  }
</style>
