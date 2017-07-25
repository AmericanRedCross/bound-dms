<template>
  <div class="profile">
    <div class="row">
      <div class="col-lg-8">
        <b-card v-if="user" class="edit-card mb-3" :title="user.fullName" sub-title="Admin">
          <p class="card-text">
              <v-gravatar class="img-fluid rounded-circle m-t-10 m-b-10" :email="user.email" default-img="mm" :size="100"> </v-gravatar>
          </p>
          <dl>
            <dt>Email</dt>
            <dd>{{ user.email }}</dd>
            <dt>Account Created</dt>
            <dd>{{ user.createdAt }}</dd>
            <dt>Last Updated</dt>
            <dd>{{ user.updatedAt }}</dd>
          </dl>
          <p class="card"
          <b-button class="card-link" variant="primary" :to="{ name: 'user-edit', params: { id: user.id }}">Edit User</b-button>
          <b-button class="card-link" variant="primary" :to="{ name: 'change-password', params: { id: user.id }}">Change Password</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: '',
  data () {
    return {
      user: null
    }
  },
  mounted () {
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
