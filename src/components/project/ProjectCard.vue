<template>
  <div>
    <b-card :title="project.name" class="mb-4" :inverse="true">
      <ul>
        <li>{{ $t('projects.projectcard.languages') }}</li>
        <li>{{ $t('projects.projectcard.published') }}</li>
        <li>{{ $t('projects.projectcard.updated') }}</li>
      </ul>
      <b-button :block="true" :to="{name: 'project-detail', params: { id: project.id }}" variant="primary">{{ $t('projects.projectcard.view') }}</b-button>

    </b-card>
  </div>
</template>

<script>
// import { Project } from '../../vuex/modules/project/Project'

export default {
  name: 'Project-Card',
  props: {
    project: {
      type: Object
    }
  }
}
</script>
<style lang="scss" scoped>
  .card {
    background-color: #20A8D8;
  }
</style>
