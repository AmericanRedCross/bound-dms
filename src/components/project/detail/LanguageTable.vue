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
          :variant="item.value === 100 ? 'success' : ''"
          class="table-progress">
        </b-progress>
      </template>

      <template slot="actions" scope="item">
        <b-btn size="sm" variant="primary" @click="editClick(item.item)"><fa-icon name="edit" label="Edit"></fa-icon> {{ $t('projects.detail.edit') }}</b-btn>
        <b-btn size="sm" variant="danger" @click="deleteClick(item.item)"><fa-icon name="trash" label="Delete"></fa-icon> {{ $t('projects.detail.delete') }}</b-btn>
      </template>
    </b-table>
    <b-btn v-b-modal.add-language variant="primary"><fa-icon name="plus"></fa-icon> {{ $t('projects.languages.add') }}</b-btn>
    <b-modal id="add-language" :title="$t('projects.languages.add')" @ok="addLanguage" @cancel="wipe" no-auto-focus>
      <form @submit.stop.prevent="addLanguage">
          <v-select :on-change="changeSelected" :options="langOptions" :placeholder="$t('projects.languages.select')" :value.sync="selectedLang"></v-select>
      </form>
      <small>{{ $t('projects.detail.newLang') }}</small>
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
    wipe () {
      this.selectedLang = null
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
      this.$swal({
        title: this._i18n.t('common.areYouSure'),
        text: 'All related translations will be deleted',
        type: 'warning',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this._i18n.t('common.deleteIt'),
        // Pre confirm it. Used for async requests. Close the dialoag when this is finished
        preConfirm: () => {
          return new Promise((resolve, reject) => {
            this.$store.dispatch('DELETE_LANGUAGE', {
              id: this.project.id,
              code: language.code
            }).then(resolve)
          })
        },
        allowOutsideClick: false
      }).then(() => {
        this.$swal({
          type: 'success',
          title: this._i18n.t('common.deleted')
        })
      })
    },
    editClick (item) {
      this.$router.push({name: 'project-structure'})
    },
    getLanguageName (code) {
      return `${languages[code].name} (${code})`
    }
  },
  computed: {
    langOptions () {
      return Object.keys(languages).filter((key) => {
        // Filter out languages that have already been selected first
        let found = false

        this.project.languages.forEach((element) => {
          if (element.code === key) {
            found = true
          }
        })

        return !found
      }).map((key) => {
        // Then map them to an object
        return { label: `${languages[key].name} (${key})`, value: key }
      })
    }
  }
}
</script>

<style>
.table-progress {
  background-color: #a0a0a0;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
