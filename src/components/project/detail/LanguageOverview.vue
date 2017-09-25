<template>
    <div class="row">
      <div class="col">
        <h5>{{ $t('projects.dashboard.translations') }}</h5>
        <div class="row m-b-10" id="language-title-wrapper">
          <div class="col">
            <b-btn v-b-toggle.add-language variant="success"><fa-icon name="plus"></fa-icon> {{ $t('projects.languages.add') }}</b-btn>
          </div>
          <div class="col-12" align="center">
          </br >
            <b-alert :show="project.languages.length === 0" class="m-b-0">
              {{ $t('projects.languages.noLangs') }}
            </b-alert>
          </div>
        </div>
        <b-collapse id="add-language" class="alert-info">
          <div class="add-language-padding">
            <div class="d-flex justify-content-center align-items-center add-input-form">
              <label>{{ $t('projects.languages.add') }}</label>
              <v-select :on-change="changeSelected" :options="options" :placeholder="$t('projects.languages.select')"></v-select>
              <b-btn variant="primary" @click="addLanguage" :disabled="selectedLang === null">{{ $t('common.add') }}</b-btn>
            </div>
          </div>
        </b-collapse>
        <br />
        <div class="row">
          <div class="col">
          <!-- Language Table -->
              <b-form-input v-model="filter" v-if="project.languages.length" placeholder="Type to Search"></b-form-input>
              <br />
              <!-- Main table element -->
              <b-table striped hover
                      :items="project.languages"
                      :fields="languageHeaders"
                      :current-page="currentPage"
                      :per-page="perPage"
                      :filter="filter"
                      id="language-table"
                      v-if="project.languages.length"
              >
                <template slot="value" scope="item">
                  <b-badge>{{ item.value }}</b-badge>
                </template>
                <template slot="complete" scope="item">
                  <b-progress
                    v-model="item.value"
                    show-progress
                    striped
                    :variant="item.value === 100 ? 'success' : ''">
                  </b-progress>
                </template>
                <template slot="actions">
                  <b-btn size="sm" variant="danger" class="m-t-5" @click="deleteClick"><fa-icon name="trash" label="Delete"></fa-icon> Delete</b-btn>
                  <b-btn size="sm" variant="success" class="m-t-5" @click="editClick"><fa-icon name="edit" label="Edit"></fa-icon> Edit</b-btn>
                </template>
              </b-table>
              <div v-if="project.languages.length > 10" class="row justify-content-center" slot="footer">
                <b-pagination size="md" :total-rows="project.languages.length" :per-page="perPage" v-model="currentPage" />
              </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
  components: {vSelect},
  name: 'language-overview',
  props: {
    project: {
      type: Object
    }
  },
  data () {
    return {
      selectedLang: null,
      options: [
        {label: 'English (UK)', value: 'eng_gb'},
        {label: 'English (US)', value: 'eng_us'},
        {label: 'Spanish', value: 'esp'}
      ],
      languageHeaders: {
        value: {
          label: null,
          sortable: true,
          class: 'align-middle text-uppercase h3'
          // tdClass: 'badge badge-default text-uppercase h3'
        },
        label: {
          label: 'Language',
          sortable: true,
          class: 'align-middle'
        },
        complete: {
          label: '% Translated',
          sortable: true,
          class: 'align-middle'
        },
        actions: {
          label: 'Actions',
          class: 'align-middle'
        }
      },
      perPage: 10,
      currentPage: 1,
      filter: null
    }
  },
  methods: {
    addLanguage () {
      if (this.selectedLang) {
        this.project.languages.push(this.selectedLang)
      }
      this.$notifications.notify(
        {
          message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')} ${this.project.name}`,
          icon: 'info',
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          type: 'info'
        })
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
