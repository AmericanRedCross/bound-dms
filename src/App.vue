<template>
  <div id="app">
    <div v-if="$auth.ready()">
      <Sidebar v-if="$auth.check() && $route.meta.showSidebar === true" :projectId="currentProject"></Sidebar>
      <Navbar v-if="$auth.check()"></Navbar>
      <div v-bind:class="{ 'content-wrapper': true, 'show-sidebar': hasSidebar }">
        <div class="breadcrumb-wrapper">
          <breadcrumbs></breadcrumbs>
        </div>
        <b-alert variant="danger" class="m-t-15 col error-box" dismissible :show="getLocalisedMessage() !== false" @dismissed="clearMessage">
          {{ getLocalisedMessage() }}
        </b-alert>
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

export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar
  },
  methods: {
    getLocalisedMessage () {
      let localisationString = this.friendlyHTTPMessage
      if (localisationString !== false) {
        let message = this._i18n.t(localisationString)
        if (message === localisationString) {
          message = this._i18n.t('http.generic') + ': ' + this.$store.state.message.message
        }
        return message
      }
      return false
    },
    clearMessage () {
      this.$store.dispatch('CLEAR_MESSAGE')
    }
  },
  computed: {
    ...mapGetters([
      'friendlyHTTPMessage'
    ]),
    hasSidebar () {
      if (this.$route.meta.showSidebar === true) {
        return true
      }
      return false
    },
    currentProject () {
      return parseInt(this.$route.params.id) || null
    }
  }
}
</script>

<style lang="scss">
@import "./assets/sass/main";
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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

  .error-box {
    position: fixed;
    bottom: 0;
    right: 15px;
    width: 500px;
  }
}
</style>
