<template>
  <div>
    <b-card class="mb-3" v-if="!picker">
      <div class="row">
        <div class="col">
          <b-button :to="{name: 'document-edit'}" variant="primary"><fa-icon name="plus"></fa-icon> {{ $t('projects.documents.create') }}</b-button>
        </div>
      </div>
    </b-card>
    <b-card :title="$t('projects.documents.title')" class="mb-3">
      <div class="row">
        <div class="col">
          <b-table hover
                  :items="fileData"
                  :fields="headers()"
                  :per-page="perPage"
                  :show-empty="true"
                  :empty-text="$t('projects.documents.emptystate')"
                  :filter="filter"
                  id="files-table"
                  @row-clicked="rowSelected"
          >
            <template slot="title" scope="item">
              <span v-if="item.item._translations"
                v-b-tooltip.hover.auto
                :title="item.item._translations[0].title.length >= 30 ? item.item._translations[0].title : ''">
                {{ getDocumentTitle(item.item) | truncate(30) }}
              </span>
            </template>
            <template slot="_createdBy" scope="item">
              {{ item.value.firstname }} {{ item.value.lastname }}
            </template>

            <template slot="_createdAt" scope="item">
              {{ item.value | formatDate }}
            </template>

            <template slot="_translations" scope="item">
                <span
                  v-for="translation in item.value"
                  v-if="baseLanguage !== translation.language"> {{ translation.language }}
                </span>
            </template>

          </b-table>
        </div>
      </div>
      <b-pagination size="md" align="center" :total-rows="totalFiles" v-model="currentPage" :per-page="perPage" :limit="10"></b-pagination>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'document-list',
  props: {
    picker: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object
    }
  },
  methods: {
    showSuccess (file) {
      setTimeout(() => {
        this.$refs.dropzone.removeFile(file)
      }, 1200)

      this.fetchAllFiles()
    },
    rowSelected (doc) {
      // Only use if we're picking
      if (this.picker) {
        this.fileData.forEach((file) => {
          if (file.id === doc._id) {
            file.rowVariant = 'info'
          } else {
            file.rowVariant = ''
          }
        })
        this.$emit('input', doc)
      } else {
        this.$router.push({
          name: 'document-edit-id',
          params: {
            docId: doc._id,
            lang: this.getProjectById(this.projectId).baseLanguage
          }
        })
      }
    },
    fetchAllFiles () {
      this.$store.dispatch('GET_ALL_DOCUMENTS', {
        page: this.currentPage,
        limit: this.perPage,
        projectId: this.projectId
      }).then(this.parseFiles).catch(() => {
        this.$notifications.notify(
          {
            message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
            icon: 'exclamation-triangle',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            type: 'danger'
          })
      })
    },
    parseFiles () {
      let data = this.getAllDocuments()
      this.fileData = data.documents
      this.totalFiles = data.total
    },
    getDocumentTitle (file) {
      let project = this.getProjectById(parseInt(this.$route.params.id))
      if (project) {
        let baseLanguage = project.baseLanguage
        if (baseLanguage) {
          let translation = file._translations.find(translation => translation.language === baseLanguage)
          if (translation) {
            return translation.title
          }
        }
      }
      if (file._translations.length >= 1) {
        return file._translations[0]._title
      }
      return ''
    }
  },
  mounted () {
    // As this could be loaded multiple times as a picker we don't fetch files but only parse
    if (!this.picker) {
      this.fetchAllFiles()
    } else {
      this.parseFiles()
    }
    this.baseLanguage = this.getProjectById(this.projectId).baseLanguage
  },
  computed: {
    ...mapGetters([
      'getAllDocuments',
      'getProjectById'
    ])
  },
  watch: {
    currentPage: {
      handler: function (val, oldVal) {
        if (val !== oldVal) {
          this.fetchAllFiles()
        }
      },
      deep: true
    }
  },
  data () {
    return {
      headers () {
        let headers = {
          _id: {
            label: this._i18n.t('common.tableFields.id'),
            sortable: true
          },
          title: {
            label: this._i18n.t('projects.documents.fields.title'),
            sortable: true
          },
          _createdAt: {
            label: this._i18n.t('common.tableFields.createdAt'),
            sortable: true
          }
        }
        if (!this.picker) {
          headers._createdBy = {
            label: this._i18n.t('common.tableFields.createdBy'),
            sortable: true
          }
          headers._translations = {
            label: this._i18n.t('projects.documents.fields.translations'),
            sortable: false
          }
        }

        return headers
      },
      fileData: [],
      totalFiles: 0,
      perPage: 10,
      currentPage: 1,
      baseLanguage: '',
      projectId: parseInt(this.$route.params.id),
      filter: null
    }
  }
}
</script>
