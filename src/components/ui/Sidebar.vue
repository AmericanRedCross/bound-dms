<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <div class="user-logo">
        <router-link to="dashboard"><img src="../../assets/logo.png"></router-link>
      </div>
      <b-nav vertical>
        <b-nav-item to="/dashboard"><fa-icon name="pie-chart"></fa-icon>Dashboard</b-nav-item>
        <b-nav-item to="/users"><fa-icon name="user-o"></fa-icon>Users</b-nav-item>
        <b-nav-item>Link</b-nav-item>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../../assets/sass/main";
  .sidebar {
    position: absolute;
    overflow: hidden;
    overflow-y: hidden;
    max-height: 100%;
    height: 100%;
    margin-top: $sidebar-top-margin;
    .sidebar-wrapper {
      position: relative;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      width: $sidebar-width;
      z-index: 4;
      box-shadow: inset -1px 0px 0px 0px #DDDDDD;
      background-color: $sidebar-background;
      line-height: 30px;
      font-weight: 600;
      .user-logo {
        margin: 10px auto;
        background-color: white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        text-align: center;
        img {
          margin-top: 12px;
          max-height: 30px;
        }
      }
      .nav {
        .nav-item {
          text-align: left;
          .nav-link {
            color: $sidebar-link;
            opacity: 0.7;
            &.active {
              color: $sidebar-active-link;
            }
            svg {
              position: relative;
              top: 1px;
              margin-right: 10px;
            }
          }

        }
      }
    }
  }
</style>
