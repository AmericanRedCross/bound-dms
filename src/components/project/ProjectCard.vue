<template>
  <div>
    <b-card :title="project.name" class="mb-4" :inverse="true">
      <ul>
        <li>Languages: 3</li>
        <li>Published: 20/4/17 12:34</li>
      </ul>
      <b-button :block="true" href="">View</b-button>

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
  .image {
    width: 100%;
    height: 200px;
    background-image: url('http://thecatapi.com/api/images/get?format=src&type=jpg');
    background-size: cover;
  }
</style>
