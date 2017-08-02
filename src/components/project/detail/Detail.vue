<template>
    <div class="project-detail">
      <StatsOverview v-if="project" :project="project" class="mb-3"></StatsOverview>
      <b-card :title="$t('projects.dashboard.languages')">
        <LanguageTable v-if="project" :project="project" class="mb-3"></LanguageTable>
      </b-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StatsOverview from './StatsOverview'
import LanguageTable from './LanguageTable'

export default {
  name: 'project-detail',
  components: {
    StatsOverview,
    LanguageTable
  },
  data () {
    return {
      project: null
    }
  },
  mounted () {
    // Call vuex to retrieve the current user from the backend. This returns a promise so we know when it's finished.
    this.$store.dispatch('GET_PROJECT', this.$route.params.id).then(() => {
      let project = this.getProjectById(parseInt(this.$route.params.id))
      // Set the user so the component can see it
      this.project = project
    })
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ])
  }
}
</script>
