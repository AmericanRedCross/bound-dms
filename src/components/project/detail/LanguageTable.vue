<template>
  <div>
    <h4>{{ $t('projects.dashboard.translations') }} <span class="float-right"><b-badge variant="primary">{{ $t('translationWorkflow.baseLanguage') }}</b-badge> {{ countryList[project.baseLanguage].name }} ({{ project.baseLanguage}})</span></h4>
    <b-table striped hover
      :items="project.languages"
      :fields="languageHeaders"
      :show-empty="true"
      :empty-text="$t('projects.languages.noLangs')"
      :filter = "(item) => item.code !== project.baseLanguage"
      class="table-responsive"
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
        <span v-if="project.baseLanguage !== item.item.code">
          <b-btn size="sm" variant="outline-primary" @click="editClick(item.item)"><fa-icon name="edit" label="Edit"></fa-icon> {{ $t('projects.detail.edit') }}</b-btn>
          <b-btn size="sm" variant="outline-danger" v-if="$auth.check(['admin', 'editor'])" @click="deleteClick(item.item)"><fa-icon name="trash" label="Delete"></fa-icon> {{ $t('projects.detail.delete') }}</b-btn>
        </span>
      </template>
    </b-table>
    <b-btn sie="lg" variant="outline-primary" v-if="$auth.check(['admin', 'editor'])" v-b-modal.add-language><fa-icon name="plus"></fa-icon> {{ $t('projects.languages.add') }}</b-btn>
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
import { languages } from 'countries-list'
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
      countryList: languages,
      languageHeaders: {
        language: {
          label: 'Language'
        },
        // complete: {
        //   label: '% Translated',
        //   class: 'align-middle'
        // },
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
          this.selectedLang = null
          this.$notifications.notify(
            {
              message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')} ${this.project.name}`,
              icon: 'info',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'info'
            })
        }).catch(() => {
          this.$notifications.notify(
            {
              message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
              icon: 'exclamation-triangle',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'danger'
            })
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
        confirmButtonColor: '#6200ff',
        cancelButtonColor: '#f85e78',
        confirmButtonText: this._i18n.t('common.deleteIt'),
        // Pre confirm it. Used for async requests. Close the dialoag when this is finished
        preConfirm: () => {
          return new Promise((resolve, reject) => {
            this.$store.dispatch('DELETE_LANGUAGE', {
              id: this.project.id,
              code: language.code
            }).then(resolve)
            .catch(() => {
              this.$notifications.notify(
                {
                  message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
                  icon: 'exclamation-triangle',
                  horizontalAlign: 'right',
                  verticalAlign: 'bottom',
                  type: 'danger'
                })
            })
          })
        },
        allowOutsideClick: false
      }).then(() => {
        this.$swal({
          type: 'success',
          confirmButtonColor: '#6200ff',
          title: this._i18n.t('common.deleted')
        })
      }).catch(this.$swal.noop)
    },
    editClick (item) {
      this.$store.dispatch('CHANGE_SELECTED_LANGUAGE', this.getLanguage(item.code))
      this.$router.push({name: 'translation-workflow'})
    },
    getLanguageName (code) {
      return `${languages[code].name} (${code})`
    },
    getLanguage (code) {
      return {
        label: `${languages[code].name} (${code})`,
        value: {
          code
        }
      }
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
    },
    projectLangOptions () {
      return this.project.languages.map((language) => {
        return { label: `${languages[language.code].name} (${language.code})`, value: language.code }
      })
    }
  }
}
</script>

<style scoped>
.table-progress {
  background-color: #a0a0a0;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
