<template>
  <div class="login" align="center">
    <b-card header="Login" class="login-card">
      <b-form-fieldset
        label="Email"
        :label-size="1"
        >

          <b-form-input v-model="email" class="email" v-validate="'required|email'" name="email" type="text" id="email-input"></b-form-input>
          <span v-show="errors.has('email')" class="help is-danger" id="email-error">{{ errors.first('email') }}</span>

        </b-form-fieldset>
        <b-form-fieldset
          label="Password"
          :label-size="1"
          >

            <b-form-input v-validate="'required'" name="password" type="password" v-model="password" id="password-input"></b-form-input>
            <span v-show="errors.has('password')" class="help is-danger" id="password-error">{{ errors.first('password') }}</span>
        </b-form-fieldset>
        <b-button @click.native="authenticate">Login</b-button>
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
    feedback (model) {
      return model.length ? '' : 'Please enter something'
    },
    state (model) {
      return model.length ? 'success' : 'warning'
    },
    authenticate () {
      // this.$store.dispatch('AUTHENTICATE', {email: this.email, password: this.password}).then(console.log('done'))
      // this.$store.dispatch('AUTHENTICATE', {email: this.email, password: this.password}, this)
      this.$auth.login({
        data: {email: this.email, password: this.password}, // Axios
        rememberMe: true,
        fetchUser: false,
        redirect: {name: 'Hello'},
        success (res) {
          console.log({res})
          console.log('success ' + this.context)
        },
        error (res) {
          console.log('error ' + this.context)
          console.log({res})
          this.error = res.message
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
