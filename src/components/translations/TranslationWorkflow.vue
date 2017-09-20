<template>
    <div class="translation-workflow" align="center">
      <DirectoryCard v-for="directory in structure" :key="directory.id" :directory="directory"></DirectoryCard>
    </div>
</template>

<script>
import DirectoryCard from '@/components/translations/DirectoryCard'

export default {
  name: 'translation-workflow',
  components: {
    DirectoryCard
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
    structure: {
      get () {
        return this.$store.state.structure.structure
      }
    },
    filter () {
      return this.$store.state.translations.filter
    }
  }
}
</script>
