<template>
  <div>
    <b-card :title="$t('projects.documents.title')">
        <div class="row">
          <div class="col"><div>
            <dropzone
              ref="dropzone"
              id="fileUpload"
              url="/api/files"
              v-on:vdropzone-success="showSuccess"
              :dropzone-options="dropzoneOptions"
              :use-font-awesome="true"
              :use-custom-dropzone-options="true"
            >
            </dropzone>
          </div>
        </div>
      </div>
    </b-card>
    <b-card :title="$t('projects.documents.title')" class="mb-3">
      <div class="row">
        <div class="col">
          <b-table striped hover
                  :items="fileData"
                  :fields="headers"
                  :per-page="perPage"
                  :show-empty="true"
                  :empty-text="$t('files.emptystate')"
                  :filter="filter"
                  id="files-table"
          >
            <template slot="thumbnail" scope="item">
             <img v-if="item.item._thumbnail" :src="item.item._thumbnail._path">
              <fa-icon v-else name="file-text"></fa-icon>
            </template><template slot="createdBy" scope="item">
              {{ item.item._createdBy.firstname }} {{ item.item._createdBy.lastname }}
            </template>

            <template slot="createdAt" scope="item">
              {{ formatDate(item.item._createdAt) }}
            </template>

            <template slot="type" scope="item">
              {{ item.valuetype }}
            </template>
          </b-table>
        </div>
      </div>
    </b-card>
    <div>
      <h6>Default</h6>
      <b-pagination size="md" :total-rows="totalFiles" v-model="currentPage" :per-page="perPage" @change="fetchAllFiles">
      </b-pagination>
    </div>
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: {
    Dropzone
  },
  methods: {
    showSuccess: function (file) {
      setTimeout(() => {
        this.$refs.dropzone.removeFile(file)
      }, 1200)

      this.fetchAllFiles()
    },
    fetchAllFiles () {
      this.$store.dispatch('GET_ALL_FILES', {
        page: this.currentPage,
        limit: this.perPage
      }).then(() => {
        let data = this.getAllFiles()
        this.fileData = data.files
        this.totalFiles = data.total
      })
    },
    formatDate (dateString) {
      if (dateString) {
        return moment(String(dateString)).format('MM/DD/YYYY hh:mm')
      }
    }
  },
  beforeMount () {
    this.fetchAllFiles()
  },
  computed: {
    ...mapGetters([
      'getAllFiles'
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
      dropzoneOptions: {
        paramName: 'files',
        headers: {
          'Authorization': 'Bearer ' + this.$auth.token()
        },
        maxNumberOfFiles: 10,
        language: {
          dictDefaultMessage: this._i18n.t('projects.documents.dropzone.dictDefaultMessage'),
          dictFallbackMessage: this._i18n.t('projects.documents.dropzone.dictFallbackMessage'),
          dictFallbackText: this._i18n.t('projects.documents.dropzone.dictFallbackText'),
          dictFileTooBig: this._i18n.t('projects.documents.dropzone.dictFileTooBig'),
          dictInvalidFileType: this._i18n.t('projects.documents.dropzone.dictInvalidFileType'),
          dictResponseError: this._i18n.t('projects.documents.dropzone.dictResponseError'),
          dictCancelUpload: this._i18n.t('projects.documents.dropzone.dictCancelUpload'),
          dictCancelUploadConfirmation: this._i18n.t('projects.documents.dropzone.dictCancelUploadConfirmation'),
          dictRemoveFile: this._i18n.t('projects.documents.dropzone.dictRemoveFile'),
          dictMaxFilesExceeded: this._i18n.t('projects.documents.dropzone.dictMaxFilesExceeded'),
          dictFileSizeUnits: {
            tb: this._i18n.t('projects.documents.dropzone.dictFileSizeUnits.tb'),
            gb: this._i18n.t('projects.documents.dropzone.dictFileSizeUnits.gb'),
            mb: this._i18n.t('projects.documents.dropzone.dictFileSizeUnits.mb'),
            kb: this._i18n.t('projects.documents.dropzone.dictFileSizeUnits.kb'),
            b: this._i18n.t('projects.documents.dropzone.dictFileSizeUnits.b')}
        },
        showRemoveLink: false
      },
      headers: {
        _id: {
          label: 'ID',
          sortable: true
        },
        thumbnail: {
          label: 'Thumbnail',
          sortable: false
        },
        _title: {
          label: 'Title',
          sortable: true
        },
        _description: {
          label: 'Description',
          sortable: false
        },
        _filename: {
          label: 'Filename',
          sortable: true
        },
        createdAt: {
          label: 'Created at',
          sortable: true
        },
        createdBy: {
          label: 'Created by',
          sortable: true
        }
      },
      fileData: [
        {
          id: '1',
          title: 'Sample doc 1',
          description: 'A sample doc',
          filename: 'project/sampledocs/1',
          createdAt: '06/09/17',
          _thumbnail: {},
          _createdBy: {}
        }
      ],
      totalFiles: 0,
      selectedKey: '',
      selected: null,
      typeOptions: [
        'String',
        'Boolean',
        'Number'
      ],
      perPage: 10,
      currentPage: 1,
      filter: null
    }
  }
}
</script>
