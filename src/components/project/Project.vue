<template>
  <div class="project">
    <router-view v-show="!fetchingProject"></router-view>
    <b-row class="loading" align-h="center" v-show="fetchingProject">
      <b-col class="text-center">
        <b-card>
          <div class="skeleton" style="width: 200px; height: 20px"></div>
          <br>
          <div class="skeleton mt-1" style="width: 300px; height: 10px"></div>
          <div class="skeleton mt-1" style="width: 400px; height: 10px"></div>
          <div class="skeleton mt-1" style="width: 200px; height: 10px"></div>
          <div class="skeleton mt-1" style="width: 300px; height: 10px"></div>
          <div class="skeleton mt-2" style="width: 50px; height: 50px"></div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'project-container',
  data () {
    return {
      project: null,
      fetchingProject: false
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
      this.fetchingProject = true
      this.$store.dispatch('GET_PROJECT', this.$route.params.id).then(() => {
        this.project = this.getProjectById(parseInt(this.$route.params.id))
        let baseLang = this.project.languages.find(lang => lang.code === this.project.baseLanguage)
        if (baseLang) {
          this.$store.dispatch('CHANGE_BASE_LANGUAGE', baseLang)
        }
        this.$store.dispatch('CHANGE_AVAILABLE_LANGUAGES', this.project.languages)
        this.fetchingProject = false
      }).catch(() => {
        this.fetchingProject = false
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
