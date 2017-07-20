<template>
  <div class="row">
    <div class="col-md-8 col-lg-6">
      <EditForm v-bind:project="project" v-bind:newProject="true"></EditForm>
    </div>
  </div>
</template>

<script>
import EditForm from '@/components/project/edit/EditForm'
import { Project } from '../../vuex/modules/project/Project'

export default {
  name: '',
  components: {
    EditForm
  },
  data () {
    return {
      project: new Project()
    }
  }
}
</script>
