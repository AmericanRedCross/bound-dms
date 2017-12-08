<template>
    <div class="row">
      <div class="col-md-12">
        <b-card :title="project.name">
          <small>{{ $t('projects.dashboard.createdby')}} {{ project.createdBy.firstname }} {{ project.createdBy.lastname }}</small>
          <div class="row mt-4" v-if="stats">
            <div class="col-lg-3 col-md-6 m-b-10">
              <Statbox :value="languageCount" type="Number" :description="$t('projects.detail.languages')" colour="#4a3b61" barColour="#a966ff" inverse>
                <slot name="value">{{ languageCount }}</slot>
              </Statbox>
            </div>

            <div v-for="percentage in stats.translationPercentages" class="col-lg-3 col-md-6 m-b-10">
              <Statbox :value="percentage.percentage" type="%" :description="getLanguageName(percentage.language) + ' ' + $t('projects.detail.translated')"
                      colour="#4a3b61"
                      barColour="#a966ff" inverse></Statbox>
            </div>

            <div v-for="percentage in stats.outdatedTranslations" class="col-lg-3 col-md-6 m-b-10">
              <Statbox :value="percentage.translations" type="Number" :language="getLanguageName(percentage.language)" :description="$t('projects.detail.outdatedTranslations')"
                      colour="#4a3b61"
                      barColour="#a966ff" inverse>
                      <slot name="value">{{ percentage.translations }}</slot>
              </Statbox>
            </div>

            <div v-for="percentage in stats.untranslatedDocs" class="col-lg-3 col-md-6 m-b-10">
              <Statbox class="two-lines"
                      :value="percentage.translations" type="Number"
                      :language="getLanguageName(percentage.language)"
                      :description="$t('projects.detail.untranslatedDocs')"
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
