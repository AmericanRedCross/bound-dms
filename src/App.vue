<template>
  <div id="app">
    <div>
      <b-nav pills>
        <b-nav-item id="english" :active="isActive('en')" v-on:click="langChange('en')">English</b-nav-item>
        <b-nav-item id="french" :active="isActive('fr')" v-on:click="langChange('fr')">Français</b-nav-item>
        <b-nav-item id="german" :active="isActive('de')" v-on:click="langChange('de')">Deutsche</b-nav-item>
        <b-nav-item id="spanish" :active="isActive('es')" v-on:click="langChange('es')">Español</b-nav-item>
      </b-nav>
    </div>
    <img src="./assets/logo.png">
    <router-view class="container-fluid"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    langChange: function (lang) {
      this._i18n.locale = lang
    },
    isActive: function (lang) {
      if (this._i18n.locale === lang) {
        return true
      }
      return false
    }
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
  margin-top: 60px;
}
</style>
