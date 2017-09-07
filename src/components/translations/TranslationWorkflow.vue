<template>
    <div class="translation-workflow" align="center">
      <TranslationInfo></TranslationInfo>
      <br />
      <ModuleCard></ModuleCard>
      <div class="subdirectory-cards">
        <SubDirectoryCard></SubDirectoryCard>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModuleCard from '@/components/translations/ModuleCard'
import TranslationInfo from '@/components/translations/TranslationInfo'
import SubDirectoryCard from '@/components/translations/SubDirectoryCard'

export default {
  name: 'translation-workflow',
  components: {
    ModuleCard, TranslationInfo, SubDirectoryCard
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
