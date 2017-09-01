<template>
  <div class="structure">
    <div class="row">
      <div class="col-4">
        <v-select v-if="this.project" :value.sync="selected" :options="getLangOptions"></v-select>
      </div>
      <div class="col-md-8" align="right">
        <b-button @click.native="saveRevision" variant="success">Save Revision</b-button>
        <b-button v-if="$auth.check(['admin', 'editor'])" @click.native="addModule" variant="primary">Add Module</b-button>
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
      project: new Project({}),
      draggableOptions: {
        filter: '.ignore-drag'
      },
      selected: 'English (en)'
    }
  },
  mounted () {
    this.$store.dispatch('GET_STRUCTURE', this.$route.params.id).then(() => {
      console.log(this.$store.state)
    }).catch((e) => {
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
  beforeMount () {
    // Call vuex to retrieve the current project from the backend. This returns a promise so we know when it's finished.
    this.$store.dispatch('GET_PROJECT', this.$route.params.id).then(() => {
     // Get the project that was just retrieved (the getProjectById getter is from the vuex getter, there's a special helper
     // called 'mapGetters' in the computed section of this component that gets the project from the vuex state.)
      let project = this.getProjectById(parseInt(this.$route.params.id), 10)
    // Set the project so the component can see it
      this.project = project
    })
  },
  methods: {
    saveRevision () {
    },
    addModule () {
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
      return this.getProjectLangOptions(this.project.id) || []
    }
  }
}
</script>
