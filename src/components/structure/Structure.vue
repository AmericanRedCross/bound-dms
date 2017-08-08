<template>
  <div class="structure">
    <v-select :options="projectLangOptions"></v-select>
    <b-button @click.native="saveRevision" variant="success">Save Revision</b-button>
    <draggable v-model="structure" @update="updateDraggable">
      <StepComp v-for="module in structure" :key="module.id" :step="module" :isModule="true"></StepComp>
    </draggable>
  </div>
</template>
<script>
/** TODO: Refactor this (along with steps) so that we don't have duplicated update code, i.e. setting the structure + hierarchies on drag. */
import StepComp from './Step'
import draggable from 'vuedraggable'
import { languages } from 'countries-list'
import vSelect from 'vue-select'

export default {
  name: 'Structure',
  components: {
    StepComp,
    draggable,
    vSelect
  },
  props: {
    project: {
      type: Object
    }
  },
  mounted () {
    this.$store.dispatch('GET_STRUCTURE', this.$route.params.id)
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
    projectLangOptions () {
      return this.project.languages.map((language) => {
        return { label: `${languages[language.code].name} (${language.code})`, value: language.code }
      })
    }
  }
}
</script>
