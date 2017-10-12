<template>
  <div class="row user-profile">
    <div class="col-lg-4">
      <b-card v-if="user" class="edit-card mb-3" :title="user.fullName" :sub-title="$t('projects.profile.admin')">
        <p class="card-text">
            <v-gravatar class="img-fluid rounded-circle m-t-10 m-b-10" :email="user.email" default-img="mm" :size="100"> </v-gravatar>
        </p>
        <dl>
          <dt>{{ $t('projects.profile.email') }}</dt>
          <dd>{{user.email}}</dd>
          <dt>{{ $t('projects.profile.created') }}</dt>
          <dd>{{user.createdAt | formatDate }}</dd>
          <dt>{{ $t('projects.profile.updated') }}</dt>
          <dd>{{user.updatedAt | formatDate }}</dd>
          <dt>{{ $t('projects.profile.status') }}</dt>
          <dd>{{status}}</dd>
        </dl>
        <p class="card">
         <b-button class="card-link" variant="primary" :to="{ name: 'user-edit', params: { id: user.id }}">{{ $t('projects.profile.edituser') }}</b-button>
        </p>
      </b-card>
    </div>
    <div class="col-lg-8">
      <UserHistoryList :user-id="user.id" v-if="user">

      </UserHistoryList>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserHistoryList from './history/UserHistoryList'

export default {
  name: '',
  components: {
    UserHistoryList
  },
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
    .catch(() => {
      this.$notifications.notify(
        {
          message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
          icon: 'exclamation-triangle',
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          type: 'danger'
        })
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
