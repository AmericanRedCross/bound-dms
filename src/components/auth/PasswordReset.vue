<template>
  <div class="password-reset row justify-content-center m-t-100">
    <div class="col-lg-4">
      <b-card :header="activation ? 'Account activation' : 'Password Reset'" v-if="!done">
        <b-form @submit="onSubmit">
          <b-form-group
              v-if="!activation"
              label="Email address:"
              label-for="email"
              description="We'll never share your email with anyone else.">
            <b-form-input
                id="email"
                type="email"
                v-model.trim="email" required
                placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              label="Enter a new password"
              label-for="pass1">
            <b-form-input
              id="pass1"
              type="password"
              v-model="pass1" required
              placeholder="Password"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              label="Re-enter the password"
              label-for="pass2"
              :feedback="passwordState === 'invalid' ? 'Passwords do not match' : ''"
              :state="passwordState">
            <b-form-input
              id="pass2"
              type="text"
              v-model="pass2" required
              placeholder="And again"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary"><fa-icon name="refresh" spin v-show="resetting"></fa-icon> Submit</b-button>
          <b-button type="reset" variant="secondary">Reset</b-button>
        </b-form>
      </b-card>
      <b-card v-else header="Thanks" align="center">
        <p v-if="!activation">Your password has been reset</p>
        <p v-else>Your account has been activated</p>
        <b-button variant="outline-primary" :to="{name: 'Login'}" class="pl-5 pr-5">Login</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      pass1: '',
      pass2: '',
      email: '',
      resetting: false,
      activation: false,
      done: false
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
    onSubmit (evt) {
      evt.preventDefault()
      if (this.pass1 === this.pass2 && this.pass1.length > 0 && this.email.length > 0) {
        this.resetting = true
        setTimeout(() => {
          this.resetting = false
          this.done = true
        }, 1000)
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
