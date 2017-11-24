<template>
  <div class="translation-info">
    <div class="visible-toggle mb-3" align="center">
      <!-- <b-button :pressed.sync="filter.needsRevision" variant="outline-primary" @click="setFilter">{{ $t('translationWorkflow.filters.needsRevision') }}</b-button> -->
    </div>
    <div class="translation-info mb-3" align="center">
      <span>{{ $t('translationWorkflow.baseLanguage') }}</span>
      <span class="ml-auto">
        <b-button variant="primary" class="mr-2" v-if="baseLanguage" >{{ baseLanguage.label }}</b-button>
      </span>
      <span>
        <fa-icon name="play"></fa-icon>
      </span>
      <span class="ml-auto">
        <b-dropdown class="ml-2" right
          :text="selectedLanguage.value.code ? selectedLanguage.label : $t('translationWorkflow.selectedLanguage')"
          variant="primary">
          <b-dropdown-item-button v-if="languageList" v-for="language in languageList" :key="language.value.code" @click="setLang(language)">
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
export default {
  data () {
    return {
      translated: 23
    }
  },
  methods: {
    setLang (language) {
      this.$store.dispatch('CHANGE_SELECTED_LANGUAGE', language)
    },
    setFilter () {
      this.$store.dispatch('UPDATE_TRANSLATION_FILTER', this.filter)
    }
  },
  computed: {
    filter () {
      return this.$store.state.translations.filter
    },
    selectedLanguage () {
      return this.$store.state.translations.selectedLanguage
    },
    languageList () {
      return this.$store.state.translations.languages
    },
    baseLanguage () {
      return this.$store.state.translations.baseLanguage
    }
  }
}
</script>
