<template>
    <div class="document-translation" align="center">
      <TranslationInfo></TranslationInfo>
      <br />

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TranslationInfo from '@/components/translations/TranslationInfo'

export default {
  name: 'translation-workflow',
  components: {
    TranslationInfo
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
