<template>
  <div class="password-reset row justify-content-center mb-5">
    <div class="col-md-6 col-lg-4 col-sm-8">
      <b-card v-if="!done">
        <div class="custom-login-header">
          <img src="../../assets/img/bound.png" :srcset="logoSrcSet()" height="100px" class="bound-logo"/>
        </div>
        <h4 class="mt-3">{{ activation ? $t('reset.accountActivation') : $t('reset.passwordReset') }}</h4>
        <b-form @submit="onSubmit" v-if="!missing">
          <b-form-group
              :label="$t('reset.newPass')"
              label-for="pass1">
            <b-form-input
              id="pass1"
              type="password"
              v-model="pass1" required
              :placeholder="$t('login.password')"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              :label="$t('reset.reenter')"
              label-for="pass2"
              :feedback="passwordState === 'invalid' ? $t('reset.noMatch') : ''"
              :state="passwordState">
            <b-form-input
              id="pass2"
              type="password"
              v-model="pass2" required
              placeholder="And again"
            ></b-form-input>
          </b-form-group>
          <div class="row">
            <div class="col mb-1">
              <b-button type="submit" variant="primary" class="w-100"><fa-icon name="refresh" spin v-show="resetting"></fa-icon> {{ $t('common.submit') }}</b-button>
            </div>
            <div class="col">
              <b-button type="reset" variant="outline-danger" class="w-100"> {{ $t('common.resetForm') }}</b-button>
            </div>
          </div>
          <b-alert variant="danger"
                   dismissible
                   :show="errorMessage.length > 0"
                   @dismissed="errorMessage = ''"
                   class="mt-2">
                   {{ errorMessage }}
          </b-alert>
        </b-form>
        <div align="center" v-else>
          <p class="text-left">
            {{ $t('reset.missing') }}
          </p>
          <b-button variant="outline-primary" :to="{name: 'Login'}" class="pl-5 pr-5">{{ $t('login.login') }}</b-button>
        </div>
      </b-card>
      <b-card v-else header="Thanks" align="center">
        <p v-if="!activation">{{ $t('reset.resetSuccess') }}</p>
        <p v-else>{{ $t('reset.activateSuccess') }}</p>
        <b-button variant="outline-primary" :to="{name: 'Login'}" class="pl-5 pr-5">{{ $t('login.login') }}</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['token', 'code'],
  data () {
    return {
      pass1: '',
      pass2: '',
      resetting: false,
      activation: false,
      done: false,
      missing: true,
      errorMessage: ''
    }
  },
  mounted () {
    if (this.code) {
      this.activation = true
      this.missing = false
    }
    if (this.token && !this.activation) {
      this.missing = false
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if (this.pass1 === this.pass2 && this.pass1.length >= 8) {
        this.resetting = true
        let endpoint = this.activation ? '/auth/activate' : '/auth/password/update'
        let payload = this.activation ? {password: this.pass1, code: this.code} : {password: this.pass1, token: this.token}
        axios.post(endpoint, payload).then(() => {
          this.resetting = false
          this.done = true
        }).catch(() => {
          this.resetting = false
        })
      } else {
        this.errorMessage = this.$t('reset.passwordFieldError')
      }
    }
  },
  computed: {
    passwordState () {
      if (this.pass2.length) {
        return this.pass1 === this.pass2 ? 'valid' : 'invalid'
      }
      return 'valid'
    }
  }
}
</script>
