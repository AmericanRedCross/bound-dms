<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <EditSettings v-bind:project="currentProject" :newProject="false"></EditSettings>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditSettings from './settings/ProjectSettings'

export default {
  name: '',
  components: {
    EditSettings
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ]),
    currentProject () {
      return this.getProjectById(parseInt(this.$route.params.id))
    }
  }
}
</script>
