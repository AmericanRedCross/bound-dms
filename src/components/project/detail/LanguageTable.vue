<template>
  <div>
    <b-table striped hover
      :items="project.languages"
      :fields="languageHeaders"
      :show-empty="true"
      :empty-text="$t('projects.languages.noLangs')"
      id="language-table">

      <template slot="complete" scope="item">
        <b-progress
          v-model="item.value"
          show-progress
          striped
          :variant="item.value === 100 ? 'success' : ''">
        </b-progress>
      </template>

      <template slot="actions" scope="item">
        <b-btn size="sm" variant="primary" @click.native="editClick"><fa-icon name="edit" label="Edit"></fa-icon> Edit</b-btn>
        <b-btn size="sm" variant="danger" @click.native="deleteClick"><fa-icon name="trash" label="Delete"></fa-icon> Delete</b-btn>
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
      langOptions: [
        {label: 'English', value: 'en'},
        {label: 'English (United Kingdom)', value: 'en_GB'},
        {label: 'English (United States)', value: 'en_US'},
        {label: 'French', value: 'fr'},
        {label: 'French (France)', value: 'fr_FR'},
        {label: 'French (Canadian)', value: 'fr_CA'}
      ],
      languageHeaders: {
        label: {
          label: 'Language'
        },
        value: {
          label: 'Code'
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
        this.project.languages.push(this.selectedLang)
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
    deleteClick () {
      if (this.selectedLang) {
        this.project.languages.pop(this.selectedLang)
      }
    },
    editClick () {
    }
  }
}
</script>
