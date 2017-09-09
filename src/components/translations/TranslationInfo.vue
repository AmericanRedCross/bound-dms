<template>
  <div class="translation-info">
    <div class="visible-toggle" align="center">
      <b-button :pressed.sync="filter.all" variant="outline-primary">{{ $t('translationWorkflow.filters.allContent') }}</b-button>
      <b-button :pressed.sync="filter.needsTranslation" variant="outline-primary">{{ $t('translationWorkflow.filters.needsTranslation') }}</b-button>
      <b-button :pressed.sync="filter.needsRevision" variant="outline-primary">{{ $t('translationWorkflow.filters.needsRevision') }}</b-button>
    </div>
    <br />
    <div class="translation-info" align="center">
      <span>{{ $t('translationWorkflow.baseLanguage') }}</span>
      <span class="ml-auto">
        <b-dropdown class="m-md-2" right text="EN">

        </b-dropdown>
      </span>
      <span>
        <fa-icon name="play"></fa-icon>
      </span>
      <span class="ml-auto">
        <b-dropdown class="m-md-2" right :text="selectedLang" variant="primary">
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
    languageList: {
      type: Array
    }
  },
  data () {
    return {
      translated: 23,
      selectedLang: null
    }
  },
  methods: {
    setLang (code) {
      this.selectedLang = code.toUpperCase()
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
