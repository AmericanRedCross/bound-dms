<template>
  <div class="login" align="center">
    <b-card header="Login" style="width: 30rem;">
      <b-form-fieldset
        label="Email"
        :label-size="1"
        >

          <b-form-input v-model="email" class="email" v-validate="'required|email'" name="email" type="text"></b-form-input>
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>

        </b-form-fieldset>
        <b-form-fieldset
          label="Password"
          :label-size="1"
          >

            <b-form-input v-validate="'required'" name="password" type="password" v-model="password"></b-form-input>
            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>

        </b-form-fieldset>
        <b-button @click.native="authenticate">Login</b-button>
      </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
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
      this.$store.dispatch('AUTHENTICATE', {email: this.email, password: this.password}).then(console.log('done'))
    }
  },
  computed: mapState([
    'auth'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
