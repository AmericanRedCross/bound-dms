<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <b-nav v-if="projectId" vertical>
        <b-nav-item :to="{name: 'project-detail', params: {id: projectId}}"><span class="sidebar-icon"><fa-icon name="pie-chart"></fa-icon></span>{{ $t('sidebar.dashboard') }}</b-nav-item>
        <b-nav-item :to="{name: 'project-structure', params: {id: projectId}}"><span class="sidebar-icon"><fa-icon name="folder" ></fa-icon></span>{{ $t('sidebar.directories') }}</b-nav-item>
        <b-nav-item :to="{name: 'project-files', params: {id: projectId}}"><span class="sidebar-icon"><fa-icon name="file" ></fa-icon></span>{{ $t('sidebar.files') }}</b-nav-item>
        <b-nav-item :to="{name: 'project-documents', params: {id: projectId}}"><span class="sidebar-icon"><fa-icon name="file-text" ></fa-icon></span>{{ $t('sidebar.documents') }}</b-nav-item>
        <b-nav-item v-if="$auth.check(['admin', 'editor'])" :to="{name: 'project-publish'}"><span class="sidebar-icon"><fa-icon name="cloud-upload" ></fa-icon></span>{{ $t('sidebar.publish') }}</b-nav-item>
        <b-nav-item v-if="$auth.check('admin')":to="{name: 'settings'}"><span class="sidebar-icon"><fa-icon name="cog" ></fa-icon></span>{{ $t('sidebar.settings') }}</b-nav-item>
        <b-nav-item v-if="project" v-b-toggle.translations><span class="sidebar-icon"><fa-icon name="globe" ></fa-icon></span>{{ $t('sidebar.translations') }}</b-nav-item>
        <b-collapse v-if="project" id="translations" class="mt-2">
          <b-nav-item v-if="project.baseLanguage !== lang.code" class="pl-2" v-for="lang in project.languages" @click="editTranslation(lang)">{{ languages[lang.code].name }} ({{lang.code}})</b-nav-item>
        </b-collapse>
      </b-nav>
    </div>
  </div>
</template>

<script>
import { languages } from 'countries-list'

export default {
  props: {
    projectId: {
      default: null,
      type: Number
    },
    project: {
      type: Object
    }
  },
  data () {
    return {
      languages
    }
  },
  methods: {
    editTranslation (item) {
      this.$store.dispatch('CHANGE_SELECTED_LANGUAGE', this.getLanguage(item.code))
      this.$router.push({name: 'translation-workflow'})
    },
    getLanguage (code) {
      return {
        label: `${languages[code].name} (${code.toUpperCase()})`,
        value: {
          code
        }
      }
    }
  }
}
</script>
