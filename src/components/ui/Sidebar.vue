<template>
  <div v-bind:class="{ sidebar: true, 'sidebar-hidden': isHidden }">
    <div class="sidebar-wrapper">
      <!-- <div class="user-logo">
        <router-link to="dashboard"><img src="../../assets/logo.png"></router-link>
      </div> -->
      <b-nav vertical>
        <b-nav-item to="/dashboard"><span class="sidebar-icon"><fa-icon name="pie-chart"></fa-icon></span>{{ $t('sidebar.dashboard')}}</b-nav-item>
        <b-nav-item to="/documents/edit/"><span class="sidebar-icon"><fa-icon name="pencil"></fa-icon></span>{{ $t('sidebar.wys')}}</b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    isHidden () {
      if (this.$route.name === 'project-detail') {
        return false
      }
      return true
    }
  }
}
</script>

<style>
.sidebar-hidden {
  display: none
}
</style>
