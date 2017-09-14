// This module handles the global store and requests for the Translations endpoint + some frontend bits
const translations = {
  state: {
    baseLanguage: '',
    selectedLanguage: '',
    filter: {
      all: true,
      needsTranslation: false,
      needsRevision: false
    }
  },
  mutations: {
    SET_BASE_LANGUAGE: (state, baseLanguage) => {
      state.baseLanguage = baseLanguage
    },
    SET_SELECTED_LANGUAGE: (state, selectedLanguage) => {
      state.selectedLanguage = selectedLanguage
    },
    CHANGE_TRANSLATION_FILTER: (state, filter) => {
      state.filter.all = filter.all
      state.filter.needsTranslation = filter.needsTranslation
      state.filter.needsRevision = filter.needsRevision
    }
  },
  actions: {
    CHANGE_BASE_LANGUAGE: function ({ commit }, baseLanguage) {
      commit('SET_BASE_LANGUAGE', baseLanguage)
    },
    CHANGE_SELECTED_LANGUAGE: function ({ commit }, selectedLanguage) {
      commit('SET_SELECTED_LANGUAGE', selectedLanguage)
    },
    CHANGE_TRANSLATION_FILTER: function ({ commit }, filter) {
      commit('SET_TRANSLATION_FILTER', filter)
    }
  }
}

export default translations
