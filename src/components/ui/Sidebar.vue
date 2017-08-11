<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <!-- <div class="user-logo">
        <router-link to="dashboard"><img src="../../assets/logo.png"></router-link>
      </div> -->
      <b-nav v-if="projectId" vertical>
        <b-nav-item :to="{name: 'project-detail', params: {id: projectId}}"><span class="sidebar-icon"><fa-icon name="pie-chart"></fa-icon></span>{{ $t('sidebar.dashboard')}}</b-nav-item>
        <b-nav-item to="/projects"><span class="sidebar-icon"><fa-icon name="folder" ></fa-icon></span>Directories</b-nav-item>
        <b-nav-item to="/projects"><span class="sidebar-icon"><fa-icon name="file" ></fa-icon></span>Documents</b-nav-item>
        <b-nav-item v-if="$auth.check(['admin', 'editor'])" to="/projects/projectId"><span class="sidebar-icon"><fa-icon name="cloud-upload" ></fa-icon></span>Publish</b-nav-item>
        <b-nav-item v-if="$auth.check('admin')" to="/projects/projectId"><span class="sidebar-icon"><fa-icon name="cog" ></fa-icon></span>Settings</b-nav-item>
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
