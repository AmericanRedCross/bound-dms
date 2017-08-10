<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <!-- <div class="user-logo">
        <router-link to="dashboard"><img src="../../assets/logo.png"></router-link>
      </div> -->
      <b-nav v-if="projectId" vertical>
        <b-nav-item to="/dashboard"><span class="sidebar-icon"><fa-icon name="pie-chart"></fa-icon></span>{{ $t('sidebar.dashboard')}}</b-nav-item>
        <b-nav-item to="/documents/edit/"><span class="sidebar-icon"><fa-icon name="pencil"></fa-icon></span>{{ $t('sidebar.wys')}}</b-nav-item>
        <b-nav-item to="/projects"><span class="sidebar-icon"><fa-icon name="lock" ></fa-icon></span>Structure</b-nav-item>
        <b-nav-item to="/projects"><span class="sidebar-icon"><fa-icon name="lock" ></fa-icon></span>Documents</b-nav-item>
        <b-nav-item to="/projects"><span class="sidebar-icon"><fa-icon name="lock" ></fa-icon></span>Api keys</b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    projectId: {
      default: null,
      type: Number
    }
  }
}
</script>
