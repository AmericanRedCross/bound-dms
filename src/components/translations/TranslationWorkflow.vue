<template>
    <div class="translation-workflow">
      <div class="visible-toggle" align="center">
        <b-button>All Content</b-button>
        <b-button>Needs Translation</b-button>
        <b-button>Needs Revision</b-button>
      </div>
      <br />
      <div class="translation-info" align="center">
        <span>Base Language</span>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'translation-workflow',
  components: {
  },
  data () {
    return {
      project: null
    }
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ])
  }
}
</script>
