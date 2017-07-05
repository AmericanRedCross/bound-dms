<template>
  <div id="app">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <img src="./assets/logo.png">
    <router-view class="container-fluid"></router-view>
  </div>
</template>

<script>
import Navbar from './components/ui/Navbar.vue'
export default {
  name: 'app',
  components: {
    Navbar
  },
  methods: {

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
