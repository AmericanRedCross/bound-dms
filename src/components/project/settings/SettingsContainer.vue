<template>
  <b-card>
    <div slot="header">
      <b-nav v-if="project" tabs class="card-header-tabs">
        <b-nav-item :to="{name: 'settings', params: {id: project.id}}">Project Settings</b-nav-item>
        <b-nav-item :to="{name: 'project-apikeys', params: {id: project.id}}">Api Keys</b-nav-item>
      </b-nav>
    </div>
    <router-view v-if="project" :project="project"></router-view>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'settings-container',
  data () {
    return {
      project: null
    }
  },
  watch: {
    // call again if the route changes
    '$route': 'fetchProject'
  },
  beforeMount () {
    this.fetchProject()
  },
  methods: {
    fetchProject () {
      this.$store.dispatch('GET_PROJECT', this.$route.params.id).then(() => {
        let project = this.getProjectById(parseInt(this.$route.params.id))
        this.project = project
        this.$notifications.notify(
          {
            message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')} ${this.project.name}`,
            icon: 'info',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            type: 'info'
          })
      }).catch(() => {
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
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ])
  }
}
</script>
