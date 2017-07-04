<template>
  <div class="login">
    <b-form-fieldset
      :feedback="feedback"
      description="Please enter your username"
      label="Username"
      :state="state"
      :label-size="1"
      >

        <b-form-input v-model="username"></b-form-input>

      </b-form-fieldset>
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
  computed: {
    feedback () {
      return this.username.length ? '' : 'Please enter something'
    },
    state () {
      return this.username.length ? 'success' : 'warning'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
