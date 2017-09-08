<template>
    <div class="translation-workflow" align="center">
      <TranslationInfo></TranslationInfo>
      <DirectoryCard></DirectoryCard>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DirectoryCard from '@/components/translations/DirectoryCard'
import TranslationInfo from '@/components/translations/TranslationInfo'

export default {
  name: 'translation-workflow',
  components: {
    DirectoryCard, TranslationInfo
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
