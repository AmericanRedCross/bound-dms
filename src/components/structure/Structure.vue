<template>
  <div class="structure">
    <div class="row">
      <div class="col-md-2">
        <v-select v-if="this.project" :options="getLangOptions"></v-select>
      </div>
      <b-button @click.native="saveRevision" variant="success">Save Revision</b-button>
    </div>
    <draggable v-model="structure" @update="updateDraggable">
      <StepComp v-for="module in structure" :key="module.id" :step="module" :isModule="true"></StepComp>
    </draggable>
  </div>
</template>
<script>
/** TODO: Refactor this (along with steps) so that we don't have duplicated update code, i.e. setting the structure + hierarchies on drag. */
import StepComp from './Step'
import draggable from 'vuedraggable'
import vSelect from 'vue-select'
import { Project } from '../../vuex/modules/project/Project'
import { mapGetters } from 'vuex'

export default {
  name: 'Structure',
  components: {
    StepComp,
    draggable,
    vSelect
  },
  data () {
    return {
      project: new Project({})
    }
  },
  mounted () {
    this.$store.dispatch('GET_STRUCTURE', this.$route.params.id)
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
    updateDraggable (e) {
      // get new and old index
      let newIndex = e.newIndex
      let oldIndex = e.oldIndex

      // Update Hierarchy
      this.$store.dispatch('UPDATE_HIERARCHY', {newIndex, oldIndex})
    }
  },
  computed: {
    // This is a special layout that vue draggable uses to interact with vuex
    structure: {
      get () {
        return this.$store.state.structure.steps
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
