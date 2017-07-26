<template>
    <div class="row">
      <div class="col">
        <h5>{{ $t('projects.dashboard.translations') }}</h5>
        <div class="row m-b-10" id="language-title-wrapper">
          <div class="col">
            <b-btn v-b-toggle.add-language><fa-icon name="plus"></fa-icon> {{ $t('projects.languages.add') }}</b-btn>
          </div>
          <div class="col-12" align="center">
            <br />
            <b-alert :show="languages.length === 0" class="m-b-0">
              {{ $t('projects.languages.noLangs') }}
            </b-alert>
          </div>
        </div>
        <b-collapse id="add-language" class="alert-info">
          <div class="add-language-padding">
            <div class="d-flex add-input-form">
              <label>{{ $t('projects.languages.add') }}</label>
              <v-select :on-change="changeSelected" :options="options" :placeholder="$t('projects.languages.select')"></v-select>
              <b-btn variant="primary" @click.native="addLanguage" :disabled="selectedLang === null">{{ $t('common.add') }}</b-btn>
            </div>
          </div>
        </b-collapse>
        <br />
        <div class="row">
          <div class="col">
          <!-- Language Table -->
              <b-form-input v-model="filter" v-if="languages.length" placeholder="Type to Search"></b-form-input>
              <!-- Main table element -->
              <b-table striped hover
                      :items="languages"
                      :fields="languageHeaders"
                      :current-page="currentPage"
                      :per-page="perPage"
                      :filter="filter"
                      id="language-table"
                      v-if="languages.length"
              >
                <template slot="complete" scope="project">
                    <b-progress
                    v-if= "progress === 100"
                    v-model="progress"
                    show-progress
                    striped
                    variant="success">
                  </b-progress>
                  <b-progress
                  v-else
                  v-model="progress"
                  show-progress
                  striped>
                </b-progress>
                </template>
                <template slot="actions" scope="project">
                  <b-btn size="sm" variant="danger" class="m-t-5" @click.native="deleteClick"><fa-icon name="trash" label="Delete"></fa-icon> Delete</b-btn>
                </template>
                <template slot="value" scope="project">
                  <b-badge>
                    
                  </b-badge>
                </template>
              </b-table>
              <div v-if="languages.length > 10" class="row justify-content-center" slot="footer">
                <b-pagination size="md" :total-rows="languages.length" :per-page="perPage" v-model="currentPage" />
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
      progress: 100,
      languages: [
        {
          value: 'ENG_GB',
          label: 'English (UK)'
        }
      ],
      selectedLang: null,
      options: [
        {label: 'English (UK)', value: 'eng_gb'},
        {label: 'English (US)', value: 'eng_us'},
        {label: 'Spanish', value: 'esp'}
      ],
      languageHeaders: {
        value: {
          label: null,
          sortable: true
        },
        label: {
          label: 'Language',
          sortable: true
        },
        complete: {
          label: '% Translated',
          sortable: true
        },
        actions: {
          label: 'Actions'
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
        this.languages.push(this.selectedLang)
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
    }
  }
}
</script>
