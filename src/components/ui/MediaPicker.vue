<template>
  <div class="media-picker">
    <div class="row mb-2">
      <b-tabs ref="tabs" class="pr-2 col-7">
        <b-tab :title="$t('mediaPicker.select')" class="p-2" active>
          <p v-if="type === 'IMAGE'">
            {{ $t('mediaPicker.selectImage') }}
          </p>
          <p v-else>
            {{ $t('mediaPicker.selectFile') }}
          </p>

          <div class="file-picker row" @scroll="onPickerScroll">
            <div class="col-6 p-1 file" v-for="file in fileData" @click="selectFile(file)">
              <b-img center fluid :src="file.path" :key="file.id" v-if="isImage(file)"/>
              <fa-icon v-else scale="3" name="file"></fa-icon>
              <p>
                <i class="file-title">{{ file.title }}</i>
              </p>
            </div>

            <p v-if="loadingMore">
              {{ $t('mediaPicker.loading') }}
            </p>
          </div>
        </b-tab>
        <b-tab :title="$t('mediaPicker.upload')" class="m-2">
            <p v-if="type === 'IMAGE'">
              {{ $t('mediaPicker.uploadImage') }}
            </p>
            <p v-else>
              {{ $t('mediaPicker.uploadFile') }}
            </p>

            <dropzone
              ref="dropzone"
              id="fileUpload"
              url="/api/files"
              class="mb-2"
              v-on:vdropzone-success="imageUploadSuccess"
              :dropzone-options="dropzoneOptions"
              :use-font-awesome="true"
              :use-custom-dropzone-options="true"
            >
            </dropzone>

            <b-form-input disabled v-model="fileRef.url" :placeholder="$t('mediaPicker.fileUrlPlaceholder')"></b-form-input>
        </b-tab>
        <b-tab :title="$t('mediaPicker.url')" class="m-2">
          <div class="row">
            <div class="col mb-2">
              <b-form-group :label="$t('mediaPicker.inputUrl')">
                <b-form-input v-model.trim="fileRef.url" :placeholder="$t('mediaPicker.fileUrlPlaceholder')"></b-form-input>
              </b-form-group>
            </div>
          </div>
        </b-tab>
      </b-tabs>
      <div class="file-preview pl-2 col" v-if="selectedFile">
        <div class="image-preview" v-if="isImage(selectedFile)">
          <p>
            {{ $t('mediaPicker.imagePreview') }} <br>
          </p>
          <b-img center fluid :src="fileRef.url" :alt="fileRef.alt"/>
        </div>
        <div class="file-preview" v-else>
          <p>
            {{ $t('mediaPicker.filePreview') }}
          </p>
          <br>
          <fa-icon scale="4" name="file"></fa-icon>
        </div>
        <p>
          <b>{{ $t('mediaPicker.title') }}</b>
          <span class="file-title">{{ selectedFile.title }}</span>
          <br>
          <b>{{ $t('mediaPicker.description') }}</b>
           {{ selectedFile.description }}
          <br>
          <b>{{ $t('mediaPicker.date') }}</b>
           {{ selectedFile._updatedAt | formatDate }}
          <br>
          <b>{{ $t('mediaPicker.createdBy') }}</b>
          {{ selectedFile.createdBy.firstname }} {{ selectedFile.createdBy.lastname }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col m-2">
        <b-form-group :label="$t('mediaPicker.inputAlt')">
          <b-form-input v-model.trim="fileRef.alt" :placeholder="$t('mediaPicker.fileAltPlaceholder')"></b-form-input>
        </b-form-group>
      </div>
    </div>
  </div>
</template>
<script>
import Dropzone from 'vue2-dropzone'
const uploadsDirectory = '/static/uploads/'
import { mapGetters } from 'vuex'

export default {
  components: {
    Dropzone
  },
  props: {
    type: {
      type: String,
      default: 'ALL'
    },
    fileRef: {
      type: Object,
      default () {
        return {
          url: 'https://lorempixel.com/800/600',
          alt: 'lorem pixel'
        }
      }
    },
    projectId: {
      type: Number
    }
  },
  methods: {
    imageUploadSuccess (file) {
      setTimeout(() => {
        this.$refs.dropzone.removeFile(file)
      }, 1200)

      // Get Url..
      let fileUrl, fileAlt
      let fileResponse = JSON.parse(file.xhr.response)
      if (fileResponse.data[0]) {
        fileUrl = uploadsDirectory + fileResponse.data[0].filename
        fileAlt = fileResponse.data[0].title
      }

      this.fileRef.url = fileUrl
      this.fileRef.alt = fileAlt
    },
    selectFile (file) {
      this.selectedFile = file
      this.fileRef.url = file.path
      this.fileRef.alt = file.title
    },
    fetchAllFiles () {
      if (!this.loadingMore) {
        this.loadingMore = true
        this.$store.dispatch('GET_ALL_FILES', {
          page: this.currentPage,
          limit: this.perPage
        }).then(() => {
          let data = this.getAllFiles()

          this.fileData = [
            ...this.fileData,
            ...data.files
          ]

          this.totalFiles = data.total

          if (this.type === 'IMAGE') {
            this.fileData = this.fileData.filter((file) => {
              return this.isImage(file)
            })
          }

          this.loadingMore = false
        })
      }
    },
    onPickerScroll (e) {
      let target = e.target
      if (target.scrollHeight - target.clientHeight - 100 < target.scrollTop) {
        if (this.currentPage < this.totalPages && !this.loadingMore) {
          // Nearly at bottom of scroll.. load some more...
          this.currentPage += 1
          this.fetchAllFiles()
        }
      }
    }
  },
  data () {
    return {
      uploadsDirectory,
      dropzoneOptions: {
        paramName: 'files',
        headers: {
          'Authorization': 'Bearer ' + this.$auth.token()
        },
        maxNumberOfFiles: 1,
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
      fileData: [],
      totalFiles: 0,
      perPage: 10,
      currentPage: 1,
      loadingMore: false,
      selectedFile: null
    }
  },
  beforeMount () {
    this.fetchAllFiles()
  },
  computed: {
    totalPages () {
      return Math.ceil(this.totalFiles / this.perPage)
    },
    ...mapGetters([
      'getAllFiles'
    ])
  }
}
</script>
<style lang="scss">

</style>
