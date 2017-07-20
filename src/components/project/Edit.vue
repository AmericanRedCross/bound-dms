<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <EditForm v-bind:project="project" :newProject="false"></EditForm>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditForm from './edit/EditForm'
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
  },
  beforeMount () {
    // Call vuex to retrieve the current project from the backend. This returns a promise so we know when it's finished.
    this.$store.dispatch('GET_USER', this.$route.params.id).then(() => {
      // Get the project that was just retrieved (the getProjectById getter is from the vuex getter, there's a special helper
      // called 'mapGetters' in the computed section of this component that gets the project from the vuex state.)
      let project = this.getProjectById(parseInt(this.$route.params.id), 10)
      // Set the project so the component can see it
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
