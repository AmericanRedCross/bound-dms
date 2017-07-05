<template>
  <div class="login" align="center">
    <b-card header="Login" style="width: 30rem;">
      <b-form-fieldset
        :feedback="feedback(username)"
        description="Please enter your username"
        label="Username"
        :state="state(username)"
        :label-size="1"
        >

          <b-form-input v-model="username"></b-form-input>

        </b-form-fieldset>
        <b-form-fieldset
          :feedback="feedback(password)"
          description="Please enter your password"
          label="Password"
          :state="state(password)"
          :label-size="1"
          >

            <b-form-input type="password" v-model="password"></b-form-input>

        </b-form-fieldset>
        <b-button>Login</b-button>
      </b-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    feedback (model) {
      return model.length ? '' : 'Please enter something'
    },
    state (model) {
      return model.length ? 'success' : 'warning'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
