<template>
  <b-card>
    <div slot="header">
      <b-nav v-if="currentProject" tabs class="card-header-tabs">
        <b-nav-item :to="{name: 'settings', params: {id: currentProject.id}}">Project Settings</b-nav-item>
        <b-nav-item :to="{name: 'project-apikeys', params: {id: currentProject.id}}">Api Keys</b-nav-item>
        <b-nav-item :to="{name: 'project-metatypes', params: {id: currentProject.id}}">Metadata Configuration</b-nav-item>
      </b-nav>
    </div>
    <router-view v-if="currentProject" :project="currentProject"></router-view>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'settings-container',
  data () {
    return {
      project: null
    }
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
