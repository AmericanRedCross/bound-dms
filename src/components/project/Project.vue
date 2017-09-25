<template>
  <div class="project">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'project-container',
  data () {
    return {
      project: null
    }
  },
  watch: {
    // call again if the route changes
    '$route': 'fetchProject'
  },
  created () {
    this.fetchProject()
  },
  methods: {
    fetchProject () {
      this.$store.dispatch('GET_PROJECT', this.$route.params.id).then(() => {
        this.project = this.getProjectById(parseInt(this.$route.params.id))
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
