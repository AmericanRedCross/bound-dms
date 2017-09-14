<template>
  <div class="translation-info">
    <div class="visible-toggle mb-3" align="center">
      <b-button :pressed.sync="filter.all" variant="outline-primary">{{ $t('translationWorkflow.filters.allContent') }}</b-button>
      <b-button :pressed.sync="filter.needsTranslation" variant="outline-primary">{{ $t('translationWorkflow.filters.needsTranslation') }}</b-button>
      <b-button :pressed.sync="filter.needsRevision" variant="outline-primary">{{ $t('translationWorkflow.filters.needsRevision') }}</b-button>
    </div>
    <div class="translation-info mb-3" align="center">
      <span>{{ $t('translationWorkflow.baseLanguage') }}</span>
      <span class="ml-auto">
        <b-button variant="primary" class="mr-2">{{ baseLanguage }}</b-button>
      </span>
      <span>
        <fa-icon name="play"></fa-icon>
      </span>
      <span class="ml-auto">
        <b-dropdown class="ml-2" right :text="selectedLanguage" variant="primary">
          <b-dropdown-item-button v-if="languageList" v-for="language in projectLangOptions" :key="language.value" @click="setLang(language.value)">
            {{ language.label }}
          </b-dropdown-item-button>
        </b-dropdown>
      </span>
      <span>{{ $t('translationWorkflow.translationLanguage') }}</span>
    </div>
    <div class="row justify-content-center">
      <div class="translation-progress col-3" align="center">
        <b-progress v-model="translated" :precision="1"></b-progress>
        <small>
          {{ translated }}{{ $t('translationWorkflow.percentTranslated') }}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { languages } from 'countries-list'

export default {
  props: {
    languageList: {
      type: Array
    }
  },
  data () {
    return {
      translated: 23
    }
  },
  methods: {
    setLang (code) {
      this.$store.dispatch('CHANGE_SELECTED_LANGUAGE', code.toUpperCase())
    }
  },
  computed: {
    projectLangOptions () {
      return this.languageList.map((language) => {
        return { label: `${languages[language.code].name} (${language.code.toUpperCase()})`, value: language.code }
      })
    },
    filter () {
      return this.$store.state.translations.filter
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
