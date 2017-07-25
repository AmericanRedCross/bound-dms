<template>
  <div class="user-edit">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <PasswordForm v-bind:user="user" :newUser="false"></PasswordForm>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PasswordForm from '@/components/users/edit/PasswordForm'

export default {
  name: '',
  components: {
    PasswordForm
  },
  props: {
    user: {
      type: Object
    }
  },
  data () {
    return {
      user: null
    }
  },
  beforeMount () {
    let id = parseInt(this.$auth.user().id, 10)
    if (id >= 0) {
      this.$store.dispatch('GET_USER', id).then(() => {
        let user = this.getUserById(id)
        this.user = user
      })
    } else {
      // oops
    }
  },
  computed: {
    ...mapGetters([
      'getUserById'
    ])
  }
}
</script>
