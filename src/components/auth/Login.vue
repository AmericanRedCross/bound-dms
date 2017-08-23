<template>
  <div class="login row justify-content-center m-t-100">
    <div class="col-lg-4">
      <b-card header="Login" class="login-card">
        <b-form v-on:submit.native.prevent="onSubmit">
          <div class="form-group">
            <b-form-fieldset
              :label="$t('login.email')"
              :label-size="1"
              :feedback="(!$v.email.required && emailValidated) ? $t('common.validations.required') : (!$v.email.email && emailValidated) ? $t('common.validations.email') : '' "
              :state="($v.email.$error && emailValidated) ? 'warning' : ''"
            >
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
            </b-form-fieldset>
          </div>

          <div class="form-group">
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
            <b-alert variant="danger" class="m-t-15 col" dismissible :show="error !== ''" @dismissed="error=''">
                {{ error }}
            </b-alert>
          </div>
          <div align="center">
            <b-button @click="authenticate" variant="primary" :disabled='sigingIn' id="login">{{ $t('login.login') }}</b-button>
            <span v-show="sigingIn" class="m-t-5" style="inline-block">
              <fa-icon name="refresh" spin></fa-icon>
            </span>
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
      error: '',
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
    authenticate () {
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
          redirect: {name: 'Dashboard'}, // Where do we want to redirect after?
          success (res) {
            this.sigingIn = false
          },
          error (res) {
            this.error = res.message
            this.sigingIn = false
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
