<template>
  <div class="row" align="center">
    <div class="col-lg-8">
      <b-card v-if="user" class="edit-card mb-3" :title="user.fullName" :sub-title="$t('projects.profile.admin')">
        <p class="card-text">
            <v-gravatar class="img-fluid rounded-circle m-t-10 m-b-10" :email="user.email" default-img="mm" :size="100"> </v-gravatar>
        </p>
        <dl>
          <dt>{{ $t('projects.profile.email') }}</dt>
          <dd>{{user.email}}</dd>
          <dt>{{ $t('projects.profile.created') }}</dt>
          <dd>{{user.createdAt}}</dd>
          <dt>{{ $t('projects.profile.updated') }}</dt>
          <dd>{{user.updatedAt}}</dd>
          <dt>{{ $t('projects.profile.status') }}</dt>
          <dd>{{status}}</dd>
        </dl>
        <p class="card"
        <b-button class="card-link" variant="primary" :to="{ name: 'user-edit', params: { id: user.id }}">{{ $t('projects.profile.edituser') }}</b-button></b-button>
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
