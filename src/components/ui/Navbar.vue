<template>
  <b-navbar toggleable variant="success" type="inverse" class="navbar">

    <b-nav-toggle target="nav_collapse"></b-nav-toggle>

    <b-link class="navbar-brand" to="#">
      <span>{{ $t('common.cie') }}</span>
    </b-link>

    <b-collapse is-nav id="nav_collapse">

      <b-nav is-nav-bar>
        <b-nav-item>Nav 1</b-nav-item>
        <b-nav-item>Nav 2</b-nav-item>
        <b-nav-item>Nav 3</b-nav-item>
      </b-nav>

      <b-nav is-nav-bar class="ml-auto">

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown :text="$t('navbar.language')" id="lang-select" right>
          <b-dropdown-item class="lang-item" id="english" v-bind:class="{ selected: isActive('en') }" v-on:click="langChange('en')">English</b-dropdown-item>
          <b-dropdown-item class="lang-item" id="french" v-bind:class="{ selected: isActive('fr') }" v-on:click="langChange('fr')">Français</b-dropdown-item>
          <b-dropdown-item class="lang-item" id="german" v-bind:class="{ selected: isActive('de') }" v-on:click="langChange('de')">Deutsche</b-dropdown-item>
          <b-dropdown-item class="lang-item" id="spanish" v-bind:class="{ selected: isActive('es') }" v-on:click="langChange('es')">Español</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown :text="$t('navbar.user')" right>
          <b-dropdown-item to="#">Profile</b-dropdown-item>
          <b-dropdown-item v-if="$auth.check()" v-on:click="$auth.logout()" to="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>

export default {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .selected {
    background-color: #4aabff;
  }
</style>
