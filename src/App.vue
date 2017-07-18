<template>
  <div id="app">
    <div v-if="$auth.ready()">
      <Sidebar v-if="$auth.check()"></Sidebar>
      <Navbar v-if="$auth.check()"></Navbar>
      <b-alert variant="danger" class="m-t-15 col error-box" dismissible :show="getLocalisedMessage() !== false" @dismissed="clearMessage">
        {{ getLocalisedMessage() }}
      </b-alert>
      <router-view class="main-view container-fluid" :style="$auth.check() ? '' : 'margin-left: 0px'"></router-view>
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
    ])
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
  .main-view {
    margin-left: $sidebar-width;
    padding-top: $sidebar-top-margin + 10px;
  }
  .error-box {
    position: fixed;
    bottom: 0;
    right: 15px;
    width: 500px;
  }
}
</style>
