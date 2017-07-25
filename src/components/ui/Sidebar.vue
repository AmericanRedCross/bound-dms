<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <!-- <div class="user-logo">
        <router-link to="dashboard"><img src="../../assets/logo.png"></router-link>
      </div> -->
      <b-nav vertical>
        <b-nav-item to="/dashboard"><span class="sidebar-icon"><fa-icon name="pie-chart"></fa-icon></span>Dashboard</b-nav-item>
        <b-nav-item to="/documents/edit/"><span class="sidebar-icon"><fa-icon name="pencil"></fa-icon></span>WYSIWYG</b-nav-item>
      </b-nav>
    </div>
  </div>
</template>

<script>

export default {

}
</script>
