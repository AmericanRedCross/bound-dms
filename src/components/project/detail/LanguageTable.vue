<template>
  <div>
    <b-table striped hover
      :items="project.languages"
      :fields="languageHeaders"
      :show-empty="true"
      :empty-text="$t('projects.languages.noLangs')"
      id="language-table">

      <template slot="language" scope="item">
        {{ getLanguageName(item.item.code) }}
      </template>

      <template slot="complete" scope="item">
        <b-progress
          v-model="item.value"
          show-progress
          striped
          :variant="item.value === 100 ? 'success' : ''">
        </b-progress>
      </template>

      <template slot="actions" scope="item">
        <b-btn size="sm" variant="primary" @click="editClick(item.item)"><fa-icon name="edit" label="Edit"></fa-icon> Edit</b-btn>
        <b-btn size="sm" variant="danger" @click="deleteClick(item.item)"><fa-icon name="trash" label="Delete"></fa-icon> Delete</b-btn>
      </template>
    </b-table>
    <b-btn v-b-modal.add-language variant="primary"><fa-icon name="plus"></fa-icon> {{ $t('projects.languages.add') }}</b-btn>
    <b-modal id="add-language" :title="$t('projects.languages.add')" @ok="addLanguage" no-auto-focus>
      <form @submit.stop.prevent="addLanguage">
          <v-select :on-change="changeSelected" :options="langOptions" :placeholder="$t('projects.languages.select')"></v-select>
      </form>
      <small>Adding a new language will update translation statistics for this project</small>
    </b-modal>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import {languages} from 'countries-list'
export default {
  components: {vSelect},
  name: 'language-table',
  props: {
    project: {
      type: Object
    }
  },
  data () {
    return {
      selectedLang: null,
      languageHeaders: {
        language: {
          label: 'Language'
        },
        complete: {
          label: '% Translated',
          class: 'align-middle'
        },
        actions: {
          label: 'Actions'
        }
      }
    }
  },
  methods: {
    addLanguage () {
      if (this.selectedLang) {
        this.$store.dispatch('ADD_LANGUAGE', {
          id: this.project.id,
          code: this.selectedLang.value
        }).then(() => {
          //
        }).catch(() => {
          // TODO error
        })
      }
    },
    changeSelected (val) {
      this.selectedLang = val
    },
    isDone () {
      if (this.progress === 100) {
        return true
      }
    },
    isProgress () {
      if (this.progress > 0 && this.progress < 100) {
        return true
      }
    },
    isNew () {
      if (this.progress === 0) {
        return true
      }
    },
    deleteClick (language) {
      this.$store.dispatch('DELETE_LANGUAGE', {
        id: this.project.id,
        code: language.code
      }).then(() => {
        //
      }).catch(() => {
        // TODO error
      })
    },
    editClick (item) {
    },
    getLanguageName (code) {
      return `${languages[code].name} (${code})`
    }
  },
  computed: {
    langOptions () {
      return Object.keys(languages).map((key) => {
        return { label: `${languages[key].name} (${key})`, value: key }
      })
    }
  }
}
</script>
