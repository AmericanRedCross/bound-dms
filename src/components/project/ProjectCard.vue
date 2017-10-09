<template>
  <div>
    <b-card
      class="mb-4"
      :inverse="true"
      @click="$router.push({
        name: 'project-detail',
        params: { id: project.id }
      })"
      img-fluid
      img-top>
      <div class="custom-image-header" align-v="center" :style="`background-image: url(${getBackgroundImage});`">
        <h4 class="text-center project-title">{{ project.name }}</h4>
      </div>
      <div class="row mt-4 mb-3" align="center">
        <div class="col">
          <small>{{ $t('projects.dashboard.languages') }}</small><br >
          <span v-for="lang, index in project.languages">{{ lang.code }}{{ index < project.languages.length - 1 ? ',' : '' }} </span>
        </div>
        <div class="col">
          <small>{{ $t('projects.dashboard.createdBy') }}</small><br >
          <span>{{ project.createdBy.firstname }} {{ project.createdBy.lastname }}</span>
        </div>
        <div class="col">
          <small>{{ $t('projects.dashboard.lastUpdated') }}</small><br >
          <span>{{ project.updatedAt | formatDate }}</span>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Project-Card',
  props: {
    project: {
      type: Object
    },
    imageNumber: {
      type: Number,
      default: 1
    }
  },
  computed: {
    getBackgroundImage () {
      // Todo.. require the correct images when we have the right ones
      switch (this.imageNumber) {
        case 0:
          return require('../../assets/img/patterns@3x.png')
        case 1:
          return require('../../assets/img/patterns@3x.png')
        case 2:
          return require('../../assets/img/patterns@3x.png')
        case 3:
          return require('../../assets/img/patterns@3x.png')
        default:
          return 'http://lorempixel.com/400/204'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/sass/variables";

  .card {
    background-color: $primary-dark;
    color: white;
    cursor: pointer;
    transition: box-shadow 0.2s ease-in;
    &:hover {
      box-shadow: 0 0.2rem 0.4rem 0.1rem rgba(74, 59, 97, 0.2);
    }
  }
  .custom-image-header {
    height: 140px;
    margin: -21px -21px 0 -21px;
    border-radius: 0.8rem 0.8rem 0 0;
    position: relative;
    color: white;
    .project-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
