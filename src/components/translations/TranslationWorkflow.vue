<template>
    <div class="translation-workflow" align="center">
      <TranslationInfo></TranslationInfo>
      <br />
      <ModuleCard></ModuleCard>
      <div class="substep-cards">
        <SubstepCard></SubstepCard>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModuleCard from '@/components/translations/ModuleCard'
import TranslationInfo from '@/components/translations/TranslationInfo'
import SubstepCard from '@/components/translations/SubstepCard'

export default {
  name: 'translation-workflow',
  components: {
    ModuleCard, TranslationInfo, SubstepCard
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
