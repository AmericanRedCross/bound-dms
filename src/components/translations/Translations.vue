<template>
  <div class="translations" v-if="currentProject">
    <TranslationInfo :languageList="currentProject.languages"></TranslationInfo>
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
    }
  }
}

</script>
