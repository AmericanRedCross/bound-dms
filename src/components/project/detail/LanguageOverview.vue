<template>
    <div class="row">
      <div class="col">
        <b-card title="Languages">
          <div class="row m-b-10">
            <div class="col">
              <b-btn v-b-toggle.add-language><fa-icon name="plus"></fa-icon> {{ $t('projects.languages.add') }}</b-btn>
            </div>
            <div class="col-10">
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

                  <template slot="actions" scope="project">

                  </template>
                  <template slot="actions" scope="project">
                    <b-btn size="sm" variant="danger" class="m-t-5" @click.native="deleteClick" :data-id="project.item.id"><fa-icon name="trash" label="Delete"></fa-icon> Delete</b-btn>
                  </template>
                </b-table>
                <div v-if="languages.length > 10" class="row justify-content-center" slot="footer">
                  <b-pagination size="md" :total-rows="languages.languages.length" :per-page="perPage" v-model="currentPage" />
                </div>
            </div>
          </div>

        </b-card>
      </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
  components: {vSelect},
  name: 'lanuage-overview',
  props: {
    project: {
      type: Object
    }
  },
  data () {
    return {
      languages: [],
      selectedLang: null,
      options: [
        {label: 'English (UK)', value: 'eng_gb'},
        {label: 'English (US)', value: 'eng_us'},
        {label: 'Spanish', value: 'esp'}
      ],
      languageHeaders: {
        id: {
          label: 'ID',
          sortable: true
        },
        label: {
          label: 'Language',
          sortable: true
        },
        value: {
          label: 'Code',
          sortable: true
        },
        complete: {
          label: '% Complete',
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
    }
  }
}
</script>
