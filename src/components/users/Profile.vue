<template>
  <div class="row" align="center">
    <div class="col-lg-8">
      <b-card v-if="user" class="edit-card mb-3" :title="user.fullName" sub-title="Admin">
        <p class="card-text">
            <v-gravatar class="img-fluid rounded-circle m-t-10 m-b-10" :email="user.email" default-img="mm" :size="100"> </v-gravatar>
        </p>
        <dl>
          <dt>Email</dt>
          <dd>{{user.email}}</dd>
          <dt>Account Created</dt>
          <dd>{{user.createdAt}}</dd>
          <dt>Last Updated</dt>
          <dd>{{user.updatedAt}}</dd>
          <dt>Status</dt>
          <dd>{{status}}</dd>
        </dl>
        <p class="card"
        <b-button class="card-link" variant="primary" :to="{ name: 'user-edit', params: { id: user.id }}">Edit User</b-button></b-button>
      </b-card>
      <b-card class="edit-card" header="Activity">

      </b-card>
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
    this.$store.dispatch('GET_USER', this.$route.params.id).then(() => {
      let user = this.getUserById(parseInt(this.$route.params.id), 10)
      this.user = user
    })
  },
  computed: {
    ...mapGetters([
      'getUserById'
    ]),
    status () {
      return this.user.isActive ? 'Active' : 'Disabled'
    }
  }
}
</script>
