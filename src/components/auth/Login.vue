<template>
  <div class="login row justify-content-center m-t-100">
    <div class="col-md-6 col-lg-4 col-sm-8">
      <b-card class="login-card">
        <div class="custom-login-header">
          <img src="../../assets/img/bound.png" :srcset="logoSrcSet()" height="100px" class="bound-logo"/>
        </div>
        <b-form v-if="!resetSent" class="mt-4">
          <b-form-group
            :label="$t('login.email')"
            :label-size="1"
            :feedback="(!$v.email.required && emailValidated) ? $t('common.validations.required') : (!$v.email.email && emailValidated) ? $t('common.validations.email') : '' "
            :state="($v.email.$error && emailValidated) ? 'warning' : ''">
            <b-form-input
              v-model.trim="email"
              type="email"
              id="email-input"
              v-on:input="validate('email')">
            </b-form-input>
          </b-form-group>

          <b-form-group v-if="!forgottenPass">
            <b-form-fieldset
              :label="$t('login.password')"
              :label-size="1"
              :feedback="(!$v.password.required && passwordValidated) ? $t('common.validations.required') : '' "
              :state="$v.password.$error ? 'warning' : ''"
            >
              <b-form-input
                v-model="password"
                type="password"
                id="password-input"
                v-on:input="validate('password')">
              </b-form-input>
            </b-form-fieldset>
          </b-form-group>
          <div align="center">
            <b-button @click="authenticate" type="submit" variant="primary" :disabled='sigingIn' id="login" v-if="!forgottenPass" size="lg" class="w-100">
              <fa-icon  v-show="sigingIn" name="refresh" spin></fa-icon> {{ $t('login.login') }}
            </b-button>
            <b-button variant="link" @click="forgottenPass = true" v-if="!forgottenPass">{{ $t('login.forgot') }}</b-button><br>
            <b-button @click="forgot" variant="primary" :disabled='sigingIn' id="login" v-if="forgottenPass" size="lg" class="w-100">
              <fa-icon v-show="resetting" name="refresh" spin></fa-icon> {{ $t('login.reset') }}
            </b-button>
          </div>
        </b-form>
        <p class="mt-4" v-else>{{ $t('login.resetSent') }} {{ email }}</p>
      </b-card>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: '',
      emailValidated: false,
      passwordValidated: false,
      sigingIn: false,
      forgottenPass: false,
      resetting: false,
      resetSent: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    authenticate (evt) {
      evt.preventDefault()
      this.validate('email')
      this.validate('password')

      if (!this.$v.$invalid && !this.$v.$error) {
        this.sigingIn = true
        // The $auth object contains all the methods for controlling the auth state.
        // See the docs at https://github.com/websanova/vue-auth
        this.$auth.login({
          data: {email: this.email, password: this.password},
          rememberMe: true,
          fetchUser: true, // Do we want to fetch the user after login? Useful for validating roles
          redirect: {name: 'projects'}, // Where do we want to redirect after?
          success (res) {
            this.sigingIn = false
          },
          error (res) {
            this.sigingIn = false
            let message = res.response.status === 401 ? `<b>${this._i18n.t('login.errors.title')}</b><br /> ${this._i18n.t('login.errors.unauth')}`
                                                      : `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')} (${res.response.status})`
            this.$notifications.notify(
              {
                message,
                icon: 'exclamation-triangle',
                horizontalAlign: 'right',
                verticalAlign: 'bottom',
                type: 'danger'
              })
            // Dispatch an error update to vuex (we can then re-use a generic error toast or something)
          }
        })
      }
    },
    forgot () {
      this.$v['email'].$touch()
      if (!this.$v['email'].$error) {
        this.resetting = true
        axios.post('/auth/password/reset', {email: this.email}).then(() => {
          this.resetting = false
          this.resetSent = true
        })
      }
    },
    validate (field) {
      // Method to call the vuelidate check and to only validate after first error is called (not when the form loads and it's blank)
      this.$v[field].$touch()
      if (this.$v[field].$error) {
        this[field + 'Validated'] = true
      }
    }
  }
}
</script>
