<template>
  <div class="structure">
    <div class="row">
      <div class="col-4">
        <v-select v-show="false" v-if="currentProject" :value.sync="selected" :options="getLangOptions"></v-select>
      </div>
      <div class="col-md-8" align="right">
        <b-button @click="save" variant="success">{{ $t('common.save')}}</b-button>
        <b-button v-if="$auth.check(['admin', 'editor'])" @click="addModule" variant="primary">{{ $t('projects.modules.addTopDirectory')}}</b-button>
      </div>
    </div>
    <draggable v-model="structure" @update="updateDraggable" :options="draggableOptions">
      <DirectoryComp v-for="module in structure" :key="module.id" :directory="module" :isModule="true"></DirectoryComp>
    </draggable>
  </div>

</template>
<script>
/** TODO: Refactor this (along with directories) so that we don't have duplicated update code, i.e. setting the structure + hierarchies on drag. */
import DirectoryComp from './Directory'
import draggable from 'vuedraggable'
import vSelect from 'vue-select'
import { Project } from '../../vuex/modules/project/Project'
import { mapGetters } from 'vuex'

export default {
  name: 'Structure',
  components: {
    DirectoryComp,
    draggable,
    vSelect
  },
  data () {
    return {
      draggableOptions: {
        filter: '.ignore-drag',
        animation: 150
      },
      selected: 'English (en)'
    }
  },
  beforeMount () {
    this.$store.dispatch('GET_STRUCTURE', this.$route.params.id).catch(() => {
      this.$notifications.notify(
        {
          message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
          icon: 'exclamation-triangle',
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          type: 'danger'
        })
    })
    this.$store.dispatch('GET_ALL_DOCUMENTS', {
      page: 1,
      limit: 10,
      projectId: parseInt(this.$route.params.id)
    }).catch(() => {
      this.$notifications.notify(
        {
          message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
          icon: 'exclamation-triangle',
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          type: 'danger'
        })
    })
    this.$store.dispatch('GET_ALL_FILES', {
      page: 1,
      limit: 10,
      projectId: parseInt(this.$route.params.id)
    }).catch(() => {
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
  methods: {
    save () {
      this.$store.dispatch('SAVE_STRUCTURE', this.currentProject.id).then(() => {
        this.$notifications.notify(
          {
            message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')}`,
            icon: 'info',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            type: 'info'
          })
        this.$store.dispatch('GET_STRUCTURE', this.currentProject.id)
      }).catch(() => {
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
    addModule () {
      this.$store.dispatch('ADD_TOP_LEVEL_DIRECTORY', { options: {} })
    },
    updateDraggable (e) {
      // get new and old index
      let newIndex = e.newIndex
      let oldIndex = e.oldIndex

      // Update Order
      this.$store.dispatch('UPDATE_ORDER', {newIndex, oldIndex})
    }
  },
  computed: {
    // This is a special layout that vue draggable uses to interact with vuex
    structure: {
      get () {
        return this.$store.state.structure.structure
      },
      set (value) {
        this.$store.dispatch('UPDATE_STRUCTURE', value)
      }
    },
    ...mapGetters([
      'getProjectById',
      'getProjectLangOptions'
    ]),
    getLangOptions () {
      return this.getProjectLangOptions(this.currentProject.id) || []
    },
    currentProject () {
      return this.getProjectById(parseInt(this.$route.params.id)) || new Project({})
    }
  }
}
</script>
