<template>
  <div class="login row justify-content-center m-t-100">
    <div class="col-lg-4">
      <b-card header="Login" class="login-card">
        <b-form v-on:submit.prevent="onSubmit">
          <b-form-group
            :label="$t('login.email')"
            :label-size="1"
            :feedback="(!$v.email.required && emailValidated) ? $t('common.validations.required') : (!$v.email.email && emailValidated) ? $t('common.validations.email') : '' "
            :state="($v.email.$error && emailValidated) ? 'warning' : ''">
            <b-input-group>
              <b-input-group-addon slot="left">
                <fa-icon name="at"></fa-icon>
              </b-input-group-addon>
              <b-form-input
                v-model.trim="email"
                type="email"
                id="email-input"
                v-on:input="validate('email')">
              </b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group>
            <b-form-fieldset
              :label="$t('login.password')"
              :label-size="1"
              :feedback="(!$v.password.required && passwordValidated) ? $t('common.validations.required') : '' "
              :state="$v.password.$error ? 'warning' : ''"
            >
              <b-input-group>
                <b-input-group-addon slot="left">
                  <fa-icon name="lock"></fa-icon>
                </b-input-group-addon>
                <b-form-input
                  v-model="password"
                  type="password"
                  id="password-input"
                  v-on:input="validate('password')">
                </b-form-input>
              </b-input-group>
            </b-form-fieldset>
          </b-form-group>
          <div align="center">
            <b-button @click="authenticate" type="submit" variant="primary" :disabled='sigingIn' id="login"><fa-icon  v-show="sigingIn" name="refresh" spin></fa-icon> {{ $t('login.login') }}</b-button>
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      emailValidated: false,
      passwordValidated: false,
      sigingIn: false
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
