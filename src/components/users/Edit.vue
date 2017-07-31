<template>
  <div class="user-edit">
    <div class="row">
      <div class="col-md-8">
        <EditForm v-if="user" v-bind:user="user" :newUser="false" align="center"></EditForm>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditForm from '@/components/users/edit/EditForm'

export default {
  name: '',
  data () {
    return {
      user: null
    }
  },
  components: {
    EditForm
  },
  mounted () {
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
    ])
  }
}
</script>

<style>
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
