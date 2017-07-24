<template>
    <div class="project-detail">
      <StatsOverview v-if="project" :project="project" class="mb-3"></StatsOverview>
      <LanguageOverview v-if="project" :project="project" class="mb-3"></LanguageOverview>
      <StructureOverview v-if="project" :project="project" class="mb-3"></StructureOverview>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LanguageOverview from './LanguageOverview'
import StatsOverview from './StatsOverview'
import StructureOverview from './StructureOverview'

export default {
  name: 'project-detail',
  components: {
    LanguageOverview,
    StatsOverview,
    StructureOverview
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
