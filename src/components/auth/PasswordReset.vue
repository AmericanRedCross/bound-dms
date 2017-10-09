<template>
  <div class="password-reset row justify-content-center m-t-100">
    <div class="col-lg-5">
      <b-card v-if="!done">
        <div class="custom-login-header">
          <img src="../../assets/img/bound.png" :srcset="logoSrcSet()" height="100px" class="bound-logo"/>
        </div>
        <h4 class="mt-3">{{ activation ? $t('reset.accountActivation') : $t('reset.passwordReset') }}</h4>
        <b-form @submit="onSubmit">
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
              <b-button type="reset" variant="secondary" class="w-100"> {{ $t('common.resetForm') }}</b-button>
            </div>
          </div>
        </b-form>
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
  data () {
    return {
      pass1: '',
      pass2: '',
      resetting: false,
      activation: false,
      done: false,
      resetToken: ''
    }
  },
  mounted () {
    this.resetToken = this.$route.query.token
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if (this.pass1 === this.pass2 && this.pass1.length > 0 && this.resetToken.length > 0) {
        this.resetting = true
        axios.post('/auth/password/update', {password: this.pass1, token: this.resetToken}).then(() => {
          this.resetting = false
          this.done = true
        })
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
