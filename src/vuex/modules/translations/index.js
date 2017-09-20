// This module handles the global store and requests for the Translations endpoint + some frontend bits
const translations = {
  state: {
    baseLanguage: 'EN',
    selectedLanguage: 'FR',
    filter: {
      all: true,
      needsTranslation: false,
      needsRevision: false
    },
    contentIdToEdit: ''
  },
  mutations: {
    SET_BASE_LANGUAGE: (state, baseLanguage) => {
      state.baseLanguage = baseLanguage
    },
    SET_SELECTED_LANGUAGE: (state, selectedLanguage) => {
      state.selectedLanguage = selectedLanguage
    },
    SET_TRANSLATION_FILTER: (state, filter) => {
      state.filter.all = filter.all
      state.filter.needsTranslation = filter.needsTranslation
      state.filter.needsRevision = filter.needsRevision
    },
    SET_CONTENT_ID: (state, id) => {
      state.contentIdToEdit = id
    }
  },
  actions: {
    CHANGE_BASE_LANGUAGE: ({ commit }, baseLanguage) => {
      commit('SET_BASE_LANGUAGE', baseLanguage)
    },
    CHANGE_SELECTED_LANGUAGE: ({ commit }, selectedLanguage) => {
      commit('SET_SELECTED_LANGUAGE', selectedLanguage)
    },
    CHANGE_TRANSLATION_FILTER: ({ commit }, filter) => {
      commit('SET_TRANSLATION_FILTER', filter)
    },
    CHANGE_EDIT_CONTENT_ID: ({ commit }, id) => {
      commit('SET_CONTENT_ID', id)
    }
  }
}

export default translations
