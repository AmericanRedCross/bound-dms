<template>
  <div class="translations" v-if="currentProject">
    <TranslationInfo :languageList="currentProject.languages"></TranslationInfo>
    <div class="row mt-1 mb-1">
      <div class="col font-weight-bold">
        {{ baseLanguage }}
      </div>
      <div class="col font-weight-bold">
        {{ selectedLanguage }}
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
  data () {
    return {

    }
  },
  methods: {

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
