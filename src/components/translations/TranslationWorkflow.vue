<template>
    <div class="translation-workflow" align="center" v-if="currentProject">
      <TranslationInfo :languageList="currentProject.languages" :languageOptions="languageOptions" :filter="filter"></TranslationInfo>
      <div class="row mt-1 mb-1">
        <div class="col font-weight-bold">
          {{ languageOptions.baseLanguage }}
        </div>
        <div class="col font-weight-bold">
          {{ languageOptions.selectedLang }}
        </div>
      </div>
      <DirectoryCard v-for="directory in structure" :key="directory.id" :directory="directory"></DirectoryCard>
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
      languageOptions: {
        selectedLang: 'FR',
        baseLanguage: 'EN'
      },
      filter: {
        all: true,
        needsTranslation: false,
        needsRevision: false
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_STRUCTURE', this.$route.params.id).catch(() => {
      this.$notifications.notify(
        {
          message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
          icon: 'exclamation-triangle',
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          type: 'danger'
        })
    })
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ]),
    structure: {
      get () {
        return this.$store.state.structure.structure
      }
    },
    currentProject () {
      return this.getProjectById(parseInt(this.$route.params.id))
    }
  }
}
</script>
