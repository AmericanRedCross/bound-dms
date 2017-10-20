<template>
  <b-card>
    <slot name="title">
      <b-row class="title ml-1 mr-1" align-h="between" align-v="center">
        <span class="col">{{ $t('projects.header') }}</span>
        <div class="col text-right">
          <b-button
            v-if="$auth.check('admin')"
            :to="{name: 'project-new'}"
            variant="primary"
            size="sm"><fa-icon name="plus" class="mr-1"></fa-icon> {{ $t('projects.edit.new') }}</b-button>
        </div>
      </b-row>
    </slot>
    <div class="row">
      <div class="col-md-6 col-lg-4" v-for="project, index in projects.projects">
        <ProjectCard :project="project" :imageNumber="index % 4"></ProjectCard>
      </div>
    </div>
  </b-card>
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

  .title {
    span {
      font-size: 2rem;
      font-weight: 500;
    }
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: rgb(236, 235, 239) 2px solid;
  }
</style>
