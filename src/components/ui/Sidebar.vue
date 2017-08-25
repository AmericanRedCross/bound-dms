<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <b-nav v-if="projectId" vertical>
        <b-nav-item :to="{name: 'project-detail', params: {id: projectId}}"><span class="sidebar-icon"><fa-icon name="pie-chart"></fa-icon></span>{{ $t('sidebar.dashboard')}}</b-nav-item>
        <b-nav-item :to="{name: 'project-structure', params: {id: projectId}}"><span class="sidebar-icon"><fa-icon name="folder" ></fa-icon></span>Directories</b-nav-item>
        <b-nav-item ><span class="sidebar-icon"><fa-icon name="file" ></fa-icon></span>Documents</b-nav-item>
        <b-nav-item v-if="$auth.check(['admin', 'editor'])" :to="{name: 'project-publish'}"><span class="sidebar-icon"><fa-icon name="cloud-upload" ></fa-icon></span>Publish</b-nav-item>
        <b-nav-item v-if="$auth.check('admin')":to="{name: 'settings'}"><span class="sidebar-icon"><fa-icon name="cog" ></fa-icon></span>Settings</b-nav-item>
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
