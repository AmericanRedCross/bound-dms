<template>
    <div class="document-translation" align="center">
      <div class="row mt-1 mb-1">
        <div class="col font-weight-bold">
        </div>
        <div class="col font-weight-bold">
        </div>
      </div>
      <div class="row">
        <div class="col">
          <!-- Base language -->
        </div>
        <div class="col">
          <!-- Selected Language -->
        </div>
      </div>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { mapGetters } from 'vuex'
import TranslationInfo from '@/components/translations/TranslationInfo'

export default {
  name: 'content-translation',
  components: {
    TranslationInfo,
    VueMarkdown
  },
  data () {
    return {
      project: null
    }
  },
  mounted () {
    console.log(this.VueMarkdown)
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ])
  }
}
</script>
