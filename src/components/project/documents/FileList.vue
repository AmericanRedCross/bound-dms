<template>
  <div>
    <b-card :title="$t('files.upload')" class="mb-3">
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
              <input type="hidden" name="projectId" :value="projectId">
            </dropzone>
          </div>
        </div>
      </div>
    </b-card>
    <b-card :title="$t('files.title')" class="mb-3">
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
            <template slot="_title" scope="item">
              <span v-if="item.value"
                v-b-tooltip.hover.auto
                :title="item.value.length >= 30 ? item.value : ''">
                {{ item.value | truncate(30) }}
              </span>
            </template>
            <template slot="_description" scope="item">
              <span v-if="item.value"
                v-b-tooltip.hover.auto
                :title="item.value.length >= 30 ? item.value : ''">
                {{ item.value | truncate(30) }}
              </span>
            </template>
            <template slot="_filename" scope="item">
              <span v-if="item.value"
                v-b-tooltip.hover.auto
                :title="item.value.length >= 30 ? item.value : ''">
                {{ item.value | truncate(30) }}
              </span>
            </template>
            <template slot="thumbnail" scope="item">
             <img v-if="item.item._thumbnail" :src="item.item._thumbnail._path">
              <fa-icon v-else name="file-text"></fa-icon>
            </template><template slot="createdBy" scope="item">
              {{ item.item._createdBy.firstname }} {{ item.item._createdBy.lastname }}
            </template>

            <template slot="createdAt" scope="item">
              {{ item.item._createdAt | formatDate }}
            </template>

            <template slot="type" scope="item">
              {{ item.valuetype }}
            </template>
          </b-table>
        </div>
      </div>

      <b-pagination align="center" size="md" :total-rows="totalFiles" v-model="currentPage" :per-page="perPage"></b-pagination>
    </b-card>
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone'
import { mapGetters } from 'vuex'

export default {
  components: {
    Dropzone
  },
  methods: {
    showSuccess (file) {
      setTimeout(() => {
        this.$refs.dropzone.removeFile(file)
      }, 1200)

      this.fetchAllFiles()
    },
    fetchAllFiles () {
      this.$store.dispatch('GET_ALL_FILES', {
        page: this.currentPage,
        limit: this.perPage,
        projectId: this.projectId
      }).then(() => {
        let data = this.getAllFiles()
        this.fileData = data.files
        this.totalFiles = data.total
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
      projectId: parseInt(this.$route.params.id),
      dropzoneOptions: {
        paramName: 'files',
        headers: {
          'Authorization': 'Bearer ' + this.$auth.token()
        },
        maxNumberOfFiles: 10,
        language: {
          dictDefaultMessage: this._i18n.t('dropzone.files.dictDefaultMessage'),
          dictFallbackMessage: this._i18n.t('dropzone.files.dictFallbackMessage'),
          dictFallbackText: this._i18n.t('dropzone.files.dictFallbackText'),
          dictFileTooBig: this._i18n.t('dropzone.files.dictFileTooBig'),
          dictInvalidFileType: this._i18n.t('dropzone.files.dictInvalidFileType'),
          dictResponseError: this._i18n.t('dropzone.files.dictResponseError'),
          dictCancelUpload: this._i18n.t('dropzone.files.dictCancelUpload'),
          dictCancelUploadConfirmation: this._i18n.t('dropzone.files.dictCancelUploadConfirmation'),
          dictRemoveFile: this._i18n.t('dropzone.files.dictRemoveFile'),
          dictMaxFilesExceeded: this._i18n.t('dropzone.files.dictMaxFilesExceeded'),
          dictFileSizeUnits: {
            tb: this._i18n.t('dropzone.dictFileSizeUnits.tb'),
            gb: this._i18n.t('dropzone.dictFileSizeUnits.gb'),
            mb: this._i18n.t('dropzone.dictFileSizeUnits.mb'),
            kb: this._i18n.t('dropzone.dictFileSizeUnits.kb'),
            b: this._i18n.t('dropzone.dictFileSizeUnits.b')}
        },
        showRemoveLink: false
      },
      headers: {
        _id: {
          label: 'ID',
          sortable: false
        },
        thumbnail: {
          label: 'Thumbnail',
          sortable: false
        },
        _title: {
          label: 'Title',
          sortable: false
        },
        _description: {
          label: 'Description',
          sortable: false
        },
        _filename: {
          label: 'Filename',
          sortable: false
        },
        createdAt: {
          label: 'Created at',
          sortable: false
        },
        createdBy: {
          label: 'Created by',
          sortable: false
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
