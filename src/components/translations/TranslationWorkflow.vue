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
      },
      set (value) {
        this.$store.dispatch('UPDATE_STRUCTURE', value)
      }
    }
  }
}
</script>
