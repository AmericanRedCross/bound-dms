<template>
  <div class="translation-info">
    <div class="visible-toggle mb-2" align="center">
      <b-button :pressed.sync="filter.all" variant="outline-primary">{{ $t('translationWorkflow.filters.allContent') }}</b-button>
      <b-button :pressed.sync="filter.needsTranslation" variant="outline-primary">{{ $t('translationWorkflow.filters.needsTranslation') }}</b-button>
      <b-button :pressed.sync="filter.needsRevision" variant="outline-primary">{{ $t('translationWorkflow.filters.needsRevision') }}</b-button>
    </div>
    <div class="translation-info mb-2" align="center">
      <span>{{ $t('translationWorkflow.baseLanguage') }}</span>
      <span class="ml-auto">
        <b-button variant="primary" class="mr-2">{{ languageOptions.baseLanguage }}</b-button>
      </span>
      <span>
        <fa-icon name="play"></fa-icon>
      </span>
      <span class="ml-auto">
        <b-dropdown class="ml-2" right :text="languageOptions.selectedLang" variant="primary">
          <b-dropdown-item-button v-if="languageList" v-for="language in projectLangOptions" :key="language.value" @click="setLang(language.value)">
            {{ language.label }}
          </b-dropdown-item-button>
        </b-dropdown>
      </span>
      <span>{{ $t('translationWorkflow.translationLanguage') }}</span>
    </div>
    <div class="translation-progress col-md-3" align="center">
      <b-progress v-model="translated" :precision="1"></b-progress>
      <small>
        {{ translated }}{{ $t('translationWorkflow.percentTranslated') }}
      </small>
    </div>
  </div>
</template>

<script>
import { languages } from 'countries-list'

export default {
  props: {
    filter: {
      type: Object,
      default () {
        return {
          all: true,
          needsTranslation: false,
          needsRevision: false
        }
      }
    },
    languageOptions: {
      type: Object,
      default: {
        selectedLang: 'FR',
        baseLanguage: 'EN'
      }
    },
    languageList: {
      type: Array
    }
  },
  data () {
    return {
      translated: 23,
      selectedLang: null,
      baseLanguage: 'EN'
    }
  },
  methods: {
    setLang (code) {
      this.languageOptions.selectedLang = code.toUpperCase()
    }
  },
  computed: {
    projectLangOptions () {
      return this.languageList.map((language) => {
        return { label: `${languages[language.code].name} (${language.code.toUpperCase()})`, value: language.code }
      })
    }
  }
}
</script>
