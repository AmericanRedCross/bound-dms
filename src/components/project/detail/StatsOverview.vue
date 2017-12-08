<template>
    <div class="row">
      <div class="col-md-12">
        <b-card :title="project.name">
          <small>{{ $t('projects.dashboard.createdby')}} {{ project.createdBy.firstname }} {{ project.createdBy.lastname }}</small>
          <div class="row mt-4" v-if="stats">
            <div class="col-xl-3 col-lg-6 m-b-10">
              <Statbox :value="languageCount" type="Number"
                       :description="languageCount > 1 ? $t('projects.detail.languages') : $t('projects.detail.language')"
                        colour="#4a3b61" barColour="#a966ff" inverse>
                <slot name="value">{{ languageCount }}</slot>
              </Statbox>
            </div>

            <div v-for="percentage in stats.translationPercentages" class="col-xl-3 col-lg-6 m-b-10" v-if="percentage.percentage >= 0">
              <Statbox :value="percentage.percentage" type="%" :language="getLanguageName(percentage.language)" :description="$t('projects.detail.translated')"
                      colour="#4a3b61"
                      barColour="#a966ff" inverse></Statbox>
            </div>

            <div v-for="percentage in stats.outdatedTranslations" class="col-xl-3 col-lg-6 m-b-10" v-if="percentage.translations >= 0">
              <Statbox :value="percentage.translations" type="Number"
                      :language="getLanguageName(percentage.language)"
                      :description="percentage.translations > 1 ?  $t('projects.detail.outdatedTranslations') : $t('projects.detail.outdatedTranslation')"
                      colour="#4a3b61"
                      barColour="#a966ff" inverse>
                      <slot name="value">{{ percentage.translations }}</slot>
              </Statbox>
            </div>

            <div v-for="percentage in stats.untranslatedDocs" class="col-xl-3 col-lg-6 m-b-10" v-if="percentage.translations >= 0">
              <Statbox class="two-lines"
                      :value="percentage.translations" type="Number"
                      :language="getLanguageName(percentage.language)"
                      :description="percentage.translations > 1 ? $t('projects.detail.untranslatedDocs') : $t('projects.detail.untranslatedDoc')"
                      colour="#4a3b61"
                      barColour="#a966ff" inverse>
                      <slot name="value">{{ percentage.translations }}</slot>
              </Statbox>
            </div>
          </div>
        </b-card>
      </div>
    </div>
</template>

<script>
import Statbox from '../../ui/Statbox'
import { mapGetters } from 'vuex'
import { languages } from 'countries-list'

export default {
  name: 'stats-overview',
  props: {
    project: {
      type: Object
    }
  },
  components: {
    Statbox
  },
  methods: {
    getLanguageName (code) {
      return `${languages[code].name} (${code})`
    }
  },
  computed: {
    languageCount () {
      return this.project.languages.length
    },
    ...mapGetters([
      'getStatsById',
      'getStats'
    ]),
    stats () {
      return this.getStats
    }
  }
}
</script>
