<template>
    <div class="project-detail">
      <StatsOverview></StatsOverview>
      <LanguageOverview></LanguageOverview>
      <StructureOverview></StructureOverview>
    </div>
</template>

<script>
// import { Project } from '../../vuex/modules/project/Project'
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
  // data () {
  //   return {
  //     project: new Project()
  //   }
  // },
  created () {
    // // Call vuex to retrieve the current project from the backend. This returns a promise so we know when it's finished.
    // this.$store.dispatch('GET_PROJECT', this.$route.params.id).then(() => {
    //   // Get the project that was just retrieved (the getProjectById getter is from the vuex getter, there's a special helper
    //   // called 'mapGetters' in the computed section of this component that gets the project from the vuex state.)
    //   let project = this.getProjectById(parseInt(this.$route.params.id), 10)
    //   // Set the project so the component can see it
    //   this.project = project
    // })
  }
}
</script>
