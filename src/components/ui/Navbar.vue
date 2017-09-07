<template>
  <b-navbar toggleable variant="custom" class="navbar">

    <b-nav-toggle target="nav_collapse"></b-nav-toggle>

    <b-link class="navbar-brand" :to="{ name: 'projects' }">
      <span>{{ $t('common.system') }}</span>
    </b-link>

    <b-collapse is-nav id="nav_collapse">

      <b-nav is-nav-bar>
        <b-nav-item-dropdown :text="$t('navbar.projects')">
          <b-dropdown-item v-for="project in projects" :key="project.id" :to="{name: 'project-detail', params: {id: project.id}}">{{ project.name }}</b-dropdown-item>
          <div v-if="$auth.check('admin')" class="dropdown-divider"></div>
          <b-dropdown-item v-if="$auth.check('admin')" :to="{name: 'project-new'}"><fa-icon name="plus"></fa-icon> New Project</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item v-if="$auth.check('admin')" :to="{name: 'users'}">{{ $t('navbar.users') }}</b-nav-item>
      </b-nav>

      <b-nav is-nav-bar class="ml-auto">
        <b-nav-item-dropdown right>
          <span slot="text">
            <v-gravatar v-if="$auth.check()" class="img-fluid user-icon m-l-10 m-r-10" :email="$auth.user().email ? $auth.user().email : ''" default-img="mm" :size="100"></v-gravatar>
            {{ $auth.user().email }}
          </span>
          <b-dropdown-item to="/account/profile">{{ $t('navbar.profile') }}</b-dropdown-item>
          <b-dropdown-item v-if="$auth.check()" v-on:click="$auth.logout()" to="#">{{ $t('navbar.signout') }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <!-- Navbar dropdowns -->
        <b-nav-item-dropdown :text="$t('navbar.language')" id="lang-select" right>
          <b-dropdown-item class="lang-item" id="english" v-bind:class="{ selected: isActive('en') }" v-on:click="langChange('en')">English</b-dropdown-item>
          <b-dropdown-item class="lang-item" id="french" v-bind:class="{ selected: isActive('fr') }" v-on:click="langChange('fr')">Français</b-dropdown-item>
          <b-dropdown-item class="lang-item" id="german" v-bind:class="{ selected: isActive('de') }" v-on:click="langChange('de')">Deutsche</b-dropdown-item>
          <b-dropdown-item class="lang-item" id="spanish" v-bind:class="{ selected: isActive('es') }" v-on:click="langChange('es')">Español</b-dropdown-item>
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
  },
  created () {
    this.$store.dispatch('GET_PROJECTS').catch(() => {
      this.$notifications.notify(
        {
          message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
          icon: 'exclamation-triangle',
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          type: 'danger'
        })
    })
  },
  computed: {
    projects () {
      return this.$store.state.projects.projects
    }
  }
}
</script>
