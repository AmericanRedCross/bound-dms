import axios from 'axios'
import { languages } from 'countries-list'

// This module handles the global store and requests for the Translations endpoint + some frontend bits
const translations = {
  state: {
    baseLanguage: null,
    selectedLanguage: null,
    languages: null,
    filter: {
      all: true,
      needsTranslation: false,
      needsRevision: false
    },
    contentIdToEdit: ''
  },
  mutations: {
    SET_BASE_LANGUAGE: (state, baseLanguage) => {
      state.baseLanguage = {
        label: `${languages[baseLanguage.code].name} (${baseLanguage.code.toUpperCase()})`,
        value: baseLanguage
      }
    },
    SET_LANGUAGES: (state, languageList) => {
      state.languages = []
      console.log(state)

      languageList.forEach((lang) => {
        if (lang.code !== state.baseLanguage.value.code) {
          console.log('pushing', lang)
          state.languages.push({
            label: `${languages[lang.code].name} (${lang.code.toUpperCase()})`,
            value: lang
          })
        }
      })
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
    CHANGE_AVAILABLE_LANGUAGES: ({commit, state}, languages) => {
      commit('SET_LANGUAGES', languages)
    },
    CHANGE_SELECTED_LANGUAGE: ({ commit }, selectedLanguage) => {
      commit('SET_SELECTED_LANGUAGE', selectedLanguage)
    },
    CHANGE_TRANSLATION_FILTER: ({ commit }, filter) => {
      commit('SET_TRANSLATION_FILTER', filter)
    },
    CHANGE_EDIT_CONTENT_ID: ({ commit }, id) => {
      commit('SET_CONTENT_ID', id)
    },
    UPDATE_DIRECTORY_TITLE: ({ commit }, options) => {
      // /api/directories/:id/translations/:lang
      return axios.put('directories/' + options.directoryId + '/translations/' + options.lang, {
        title: options.title
      }).catch(err => {
        commit('SET_MESSAGE', { message: err })
        throw err
      })
    }
  }
}

export default translations
