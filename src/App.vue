<template>
  <div id="app" :style="appBackground">
    <div v-if="$auth.ready()">
      <Sidebar v-if="$auth.check() && $route.meta.showSidebar === true" :projectId="currentProjectId" :project="project"></Sidebar>
      <Navbar v-if="$auth.check()"></Navbar>
      <div v-bind:class="{ 'content-wrapper': true, 'show-sidebar': hasSidebar }">
        <notifications>

        </notifications>
        <div class="breadcrumb-wrapper">
          <breadcrumbs></breadcrumbs>
        </div>
        <router-view class="main-view container-fluid" :style="($auth.check() && $route.meta.showSidebar === true) ? '' : 'margin-left: 0px'"></router-view>
      </div>
    </div>
    <div v-if="!$auth.ready()">
        Loading...
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from './components/ui/Navbar.vue'
import Sidebar from './components/ui/Sidebar.vue'
import Breadcrumbs from './components/ui/Breadcrumbs.vue'
import PaperNotification from './components/ui/NotificationPlugin/Notification.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar,
    PaperNotification,
    Breadcrumbs
  },
  data () {
    return {
      type: ['', 'info', 'success', 'warning', 'danger'],
      currentRoute: ''
    }
  },
  methods: {
    clearMessage () {
      this.$store.dispatch('CLEAR_MESSAGE')
    },
    setCurrentRoute () {
      this.currentRoute = this.$router.history.current
    }
  },
  watch: {
    '$route': 'setCurrentRoute'
  },
  mounted () {
    this.setCurrentRoute()
  },
  computed: {
    ...mapGetters([
      'friendlyHTTPMessage',
      'getProjectById'
    ]),
    hasSidebar () {
      if (this.$route.meta.showSidebar === true) {
        return true
      }
      return false
    },
    currentProjectId () {
      return parseInt(this.$route.params.id) || null
    },
    project () {
      return this.getProjectById(this.currentProjectId)
    },
    appBackground () {
      return (this.currentRoute.name === 'Login' || this.currentRoute.name === 'Reset')
        ? 'background-color: transparent' : 'background-color: #f0f2ff'
    }
  }
}
</script>

<style lang="scss">
@import "./assets/sass/main";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font-color;
  min-height: 100vh;
  .content-wrapper {
    position: relative;
    top: $sidebar-top-margin - 1px;
    &.show-sidebar {
      margin-left: $sidebar-width;
    }
    .main-view {
      margin-top: 10px;
    }
  }
}
</style>
