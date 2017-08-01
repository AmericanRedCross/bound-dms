<template>
  <div>
    <h1 id="changeText" class="text-center">{{ $t('projects.header') }}</h1>
      <div class="row">
        <div class="col-md-4" v-for="project in projects.projects">
          <ProjectCard :project="project"></ProjectCard>
        </div>
        <div class="col-md-4">
          <b-card class="new-project mb-4">
            <b-button :block="true" :to="{name: 'project-new'}">{{ $t('projects.edit.new') }}</b-button>
          </b-card>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ProjectCard from './ProjectCard'
export default {
  components: {
    ProjectCard
  },
  mounted () {
    this.$store.dispatch('GET_PROJECTS')
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ]),
    ...mapState([
      'projects'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .project-icon {
    border-radius: 50%;
    height: 40px;
  }
</style>
