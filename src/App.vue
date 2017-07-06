<template>
  <div id="app">
    <Sidebar></Sidebar>
    <Navbar></Navbar>
    <router-view class="main-view container-fluid"></router-view>
  </div>
</template>

<script>
import Navbar from './components/ui/Navbar.vue'
import Sidebar from './components/ui/Sidebar.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar
  },
  methods: {

  }
}
</script>

<style lang="scss">
@import "./assets/sass/main";
#app {
  font-family: $helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  .main-view {
    margin-left: $sidebar-width;
    margin-top: $sidebar-top-margin / 2;
  }
}
</style>
