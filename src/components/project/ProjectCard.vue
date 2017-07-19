<template>
  <div>
    <b-card :header="project.name">
      <div class="image" slot="img">

      </div>
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
  .image {
    width: 100%;
    height: 200px;
    background-image: url('http://thecatapi.com/api/images/get?format=src&type=jpg');
    background-size: cover;
  }
</style>
