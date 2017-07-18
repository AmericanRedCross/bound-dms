<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <div class="user-logo">
        <router-link to="dashboard"><img src="../../assets/logo.png"></router-link>
      </div>
      <b-nav vertical>
        <b-nav-item to="/dashboard"><fa-icon name="pie-chart"></fa-icon>Dashboard</b-nav-item>
        <b-nav-item to="/users"><fa-icon name="user"></fa-icon>Users</b-nav-item>
        <b-nav-item to="/documents/edit/"><fa-icon name="pencil"></fa-icon>WYSIWYG</b-nav-item>
        <b-nav-item>Another Link</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>

export default {

}
</script>
