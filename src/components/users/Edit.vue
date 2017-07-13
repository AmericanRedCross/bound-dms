<template>
  <div class="user-edit" align="center">
    <div class="row">
      <div class="col-md-6">
        <EditForm v-bind:user="user"></EditForm>
      </div>
      <div class="col-md-6">
        <PasswordForm></PasswordForm>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditForm from '@/components/users/edit/EditForm'
import PasswordForm from '@/components/users/edit/PasswordForm'

export default {
  name: '',
  components: {
    EditForm,
    PasswordForm
  },
  data () {
    return {
      user: {}
    }
  },
  beforeMount () {
    // Call vuex to retrieve the current user from the backend. This returns a promise so we know when it's finished.
    this.$store.dispatch('GET_USER', this.$route.params.id).then(() => {
      // Get the user that was just retrieved (the getUserById getter is from the vuex getter, there's a special helper
      // called 'mapGetters' in the computed section of this component that gets the user from the vuex state.)
      let user = this.getUserById(parseInt(this.$route.params.id), 10)
      // Set the user so the component can see it
      this.user = user
    })
  },
  computed: {
    ...mapGetters([
      'getUserById'
    ]),
    feedback () {
      return this.name.length ? '' : 'Please enter something'
    },
    state () {
      return this.name.length ? 'success' : 'warning'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .card {
    width: 30rem;
  }
  .input.is-danger {
    border-color: #ff3860;
  }
</style>
