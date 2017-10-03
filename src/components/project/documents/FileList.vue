<template>
  <div>
    <b-card :title="$t('files.upload')" class="mb-3" v-if="!picker">
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
                  :fields="headers()"
                  :per-page="perPage"
                  :show-empty="true"
                  :empty-text="$t('files.emptystate')"
                  :filter="filter"
                  id="files-table"
                  @row-clicked="rowSelected"
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

            <template slot="actions" scope="item">
              <b-button @click="showEditFileModal(item.item)"><fa-icon name="pencil"></fa-icon></b-button>
            </template>
          </b-table>
        </div>
      </div>

      <b-pagination align="center" size="md" :total-rows="totalFiles" v-model="currentPage" :per-page="perPage" :limit="10"></b-pagination>
    </b-card>

    <b-modal
      @ok="saveFileData"
      @cancel="selectedFile = null"
      :lazy="true"
      id="filedata-modal"
      class="ignore-drag"
      v-model="openEditFileModal"
      :title="$t('common.edit')"
      size="lg"
    >
      <div v-if="selectedFile">
        <b-form-fieldset>
          {{ $t('projects.files.fields.title') }}
          <b-form-input type="text" v-model="selectedFile._title"></b-form-input>
        </b-form-fieldset>
        <b-form-fieldset>
          {{ $t('projects.files.fields.description') }}
          <b-form-input type="text" v-model="selectedFile._description"></b-form-input>
        </b-form-fieldset>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone'
import { mapGetters } from 'vuex'

export default {
  name: 'file-list',
  props: {
    picker: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object
    }
  },
  components: {
    Dropzone
  },
  methods: {
    saveFileData () {
      this.$store.dispatch('UPDATE_FILE_DETAILS', {
        fileId: this.selectedFile._id,
        title: this.selectedFile._title,
        description: this.selectedFile._description
      }).then(() => {
        this.$swal({
          type: 'success',
          title: this._i18n.t('common.updated')
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
    },
    showEditFileModal (file) {
      this.selectedFile = file
      this.openEditFileModal = true
    },
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
      }
    },
    fetchAllFiles () {
      this.$store.dispatch('GET_ALL_FILES', {
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
      let data = this.getAllFiles()
      this.fileData = data.files
      this.totalFiles = data.total
    }
  },
  beforeMount () {
    if (!this.picker) {
      this.fetchAllFiles()
    } else {
      this.parseFiles()
    }
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
      openEditFileModal: false,
      selectedFile: null,
      projectId: parseInt(this.$route.params.id),
      dropzoneOptions: {
        paramName: 'files',
        headers: {
          'Authorization': 'Bearer ' + this.$auth.token()
        },
        maxNumberOfFiles: 10,
        maxFileSizeInMB: 100,
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
      headers () {
        let headers = {
          thumbnail: {
            label: this._i18n.t('projects.files.fields.thumbnail'),
            sortable: false
          },
          _title: {
            label: this._i18n.t('projects.files.fields.title'),
            sortable: false
          },
          _filename: {
            label: this._i18n.t('projects.files.fields.filename'),
            sortable: false
          },
          createdAt: {
            label: this._i18n.t('common.tableFields.createdAt'),
            sortable: false
          }
        }
        if (!this.picker) {
          headers._description = {
            label: this._i18n.t('projects.files.fields.description'),
            sortable: false
          }
          headers.createdBy = {
            label: this._i18n.t('common.tableFields.createdBy'),
            sortable: false
          }
          headers.actions = {
            label: this._i18n.t('common.tableFields.actions'),
            sortable: false
          }
        }

        return headers
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
