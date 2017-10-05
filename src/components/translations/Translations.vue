<template>
  <div class="translations" v-if="currentProject">
    <TranslationInfo :languageList="currentProject.languages"></TranslationInfo>
    <div class="row mt-1 mb-1">
      <div class="col font-weight-bold" v-if="baseLanguage">
        {{ baseLanguage.label }}
      </div>
      <div class="col font-weight-bold" v-if="selectedLanguage">
        {{ selectedLanguage.label }}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import TranslationInfo from '@/components/translations/TranslationInfo'
import { mapGetters } from 'vuex'

export default {
  name: 'translation-container',
  components: {
    TranslationInfo
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ]),
    currentProject () {
      return this.getProjectById(parseInt(this.$route.params.id))
    },
    selectedLanguage () {
      return this.$store.state.translations.selectedLanguage
    },
    baseLanguage () {
      return this.$store.state.translations.baseLanguage
    }
  }
}

</script>
