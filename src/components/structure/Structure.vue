<template>
  <div class="structure">
    <b-button @click.native="saveRevision" variant="success">Save Revision</b-button>
    <draggable v-model="structure">
      <StepComp v-for="module in structure" :key="module.id" :step="module" :isModule="true"></StepComp>
    </draggable>
  </div>
</template>
<script>
import StepComp from './Step'
import draggable from 'vuedraggable'

export default {
  name: 'Structure',
  components: {
    StepComp,
    draggable
  },
  mounted () {
    // Call vuex to retrieve the current user from the backend. This returns a promise so we know when it's finished.
    this.$store.dispatch('GET_STRUCTURE', this.$route.params.id)
  },
  methods: {
    saveRevision () {
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
    }
  },
  props: {
    project: {
      type: Object
    }
  }
}
</script>
