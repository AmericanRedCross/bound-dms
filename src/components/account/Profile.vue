<template>
  <div class="profile">
    <div class="row">
      <div class="col-lg-8">
        <b-card v-if="user" class="edit-card mb-3" :title="user.fullName" :sub-title="$t('projects.profile.admin')">
          <p class="card-text">
              <v-gravatar class="img-fluid rounded-circle m-t-10 m-b-10" :email="user.email" default-img="mm" :size="100"> </v-gravatar>
          </p>
          <dl>
            <dt>{{ $t('projects.profile.email') }}</dt>
            <dd>{{ user.email }}</dd>
            <dt>{{ $t('projects.profile.created') }}</dt>
            <dd>{{ user.createdAt | formatDate }}</dd>
            <dt>{{ $t('projects.profile.updated') }}</dt>
            <dd>{{ user.updatedAt | formatDate }}</dd>
          </dl>
          <p class="card"
          <b-button class="card-link" variant="primary" :to="{ name: 'user-edit', params: { id: user.id }}">{{ $t('projects.profile.edituser') }}</b-button>
          <b-button class="card-link" variant="primary" @click="resetPassword">
            <fa-icon v-show="resetting" name="refresh" spin></fa-icon> {{ $t('login.reset') }}
          </b-button>
          <small v-if="resetSent">
            {{ $t('login.resetSent') }} {{ user.email }}
          </small>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  name: '',
  data () {
    return {
      user: null,
      resetting: false,
      resetSent: false
    }
  },
  mounted () {
    let id = parseInt(this.$auth.user().id, 10)
    if (id >= 0) {
      this.$store.dispatch('GET_USER', id).then(() => {
        let user = this.getUserById(id)
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
    } else {
      // oops
    }
  },
  methods: {
    resetPassword () {
      if (this.user) {
        this.resetting = true
        axios.post('/auth/password/reset', {email: this.user.email}).then(() => {
          this.resetting = false
          this.resetSent = true
        }).catch(() => {
          this.resetting = false
          this.resetSent = false
          this.$notifications.notify(
            {
              message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
              icon: 'exclamation-triangle',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'danger'
            })
        })
      }
    }
  },
  computed: {
    ...mapGetters([
      'getUserById'
    ])
  }
}
</script>
