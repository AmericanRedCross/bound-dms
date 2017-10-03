<template>
  <div class="structure">
    <div class="row">
      <div class="col-4">
        <v-select v-show="false" v-if="currentProject" :value.sync="selected" :options="getLangOptions"></v-select>
      </div>
      <div class="col-md-8" align="right">
        <b-button @click="saveStructure" variant="success">{{ $t('common.save')}}</b-button>
        <b-button v-if="$auth.check(['admin', 'editor'])" @click="addModule" variant="primary">{{ $t('projects.modules.addTopDirectory')}}</b-button>
      </div>
    </div>
    <draggable v-model="structure" @update="updateDraggable" :options="draggableOptions">
      <DirectoryComp v-for="module in structure" :key="module.id" :directory="module" :isModule="true"></DirectoryComp>
    </draggable>

    <b-modal
      @ok="saveMetadata"
      @cancel="selectMetadataShow = null"
      :lazy="true"
      id="metadata-modal"
      class="ignore-drag"
      v-model="selectMetadataShow"
      title="Metadata"
      size="lg"
    >
      <div v-for="meta in selectedMetadata" v-if="selectedMetadata[0]">
        <h5>{{ meta.key }}</h5>
        <b-form-select v-if="meta.type === 'boolean'" v-model="meta.value" :options="booleanValues">
        </b-form-select>
        <b-form-input  v-else-if="meta.type === 'integer'"
                       type="number"
                       v-model="meta.value"
        ></b-form-input>
        <b-form-input v-else
                      type="text"
                      v-model="meta.value"
        ></b-form-input>
      </div>
    </b-modal>

    <b-modal
      :lazy="true"
      id="file-modal"
      class="ignore-drag"
      v-model="selectFileShow"
      :title="$t('projects.modules.selectFile')"
      size="lg"
      @cancel="selectedFile = null"
      @ok="linkFile">
        <file-list v-if='getAllFiles().files.length' v-model="selectedFile" :picker="true"></file-list>
        <p v-else>
        {{ $t('common.loading') }}
        </p>
    </b-modal>

    <b-modal
      :lazy="true"
      id="doc-modal"
      class="ignore-drag"
      v-model="selectDocShow"
      :title="$t('projects.modules.selectDoc')"
      size="lg"
      @cancel="selectedDocument = null"
      @ok="linkDocument">
      <b-card title="Linked documents" class="mb-2" v-if="selectedDirectory">
        <span v-if="selectedDirectory.documents.length === 0">{{ $t('projects.modules.noDocs') }}</span>
        <Files :files="selectedDirectory.documents" :documents="true"></Files>
      </b-card>
      <document-list v-if='getAllDocuments().documents.length' v-model="selectedDocument" :picker="true"></document-list>
      <p v-else>
        {{ $t('common.loading') }}
      </p>
    </b-modal>

  </div>

</template>
<script>
/** TODO: Refactor this (along with directories) so that we don't have duplicated update code, i.e. setting the structure + hierarchies on drag. */
import DirectoryComp from './Directory'
import draggable from 'vuedraggable'
import vSelect from 'vue-select'
import FileList from '../project/documents/FileList'
import DocumentList from '../project/documents/DocumentList'
import Files from './Files'
import { File } from '../../vuex/modules/file/File'
import { Project } from '../../vuex/modules/project/Project'
import { mapGetters } from 'vuex'
import { Document } from '../../vuex/modules/document/Document'

export default {
  name: 'Structure',
  components: {
    Files,
    DirectoryComp,
    DocumentList,
    draggable,
    vSelect,
    FileList
  },
  data () {
    return {
      booleanValues: [
        {value: null, text: `${this._i18n.t('common.void')}`},
        {value: true, text: `${this._i18n.t('common.true')}`},
        {value: false, text: `${this._i18n.t('common.false')}`}
      ],
      selectedDirectoryId: null,
      selectedMetadata: null,
      metatypes: [],
      selectedDirectory: null,
      selectMetadataShow: false,
      selectFileShow: false,
      selectedFile: null,
      selectDocShow: false,
      selectedDocument: null,
      draggableOptions: {
        filter: '.ignore-drag',
        animation: 150
      },
      selected: 'English (en)'
    }
  },
  created () {
    this.$root.$on('openMetadataModal', ({directoryId, metadata}) => {
      this.selectedDirectoryId = directoryId
      this.selectedMetadata = []
      this.metatypes.forEach((metatype) => {
        this.selectedMetadata.push({
          key: metatype.key,
          value: (typeof metadata[metatype.key] !== 'undefined') ? metadata[metatype.key] : null,
          type: metatype.type
        })
      })
      this.selectMetadataShow = true
    })

    this.$root.$on('openFileSelectModal', (directory) => {
      this.selectedDirectory = directory
      this.selectFileShow = true
    })

    this.$root.$on('openDocumentSelectModal', (directory) => {
      this.selectedDirectory = directory
      this.selectDocShow = true
    })
  },
  beforeMount () {
    this.$store.dispatch('GET_STRUCTURE', this.$route.params.id).catch(() => {
      this.$notifications.notify(
        {
          message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
          icon: 'exclamation-triangle',
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          type: 'danger'
        })
    })
    this.$store.dispatch('GET_ALL_DOCUMENTS', {
      page: 1,
      limit: 10,
      projectId: parseInt(this.$route.params.id)
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
    this.$store.dispatch('GET_ALL_FILES', {
      page: 1,
      limit: 10,
      projectId: parseInt(this.$route.params.id)
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
    this.$store.dispatch('GET_PROJECT_METATYPES', this.$route.params.id).then(() => {
      this.metatypes = this.getMetatypes()
    })
  },
  methods: {
    saveMetadata () {
      let metadataToSave = {}
      this.selectedMetadata.forEach((metadata) => {
        if (metadata.type === 'integer') {
          metadata.value = Number(metadata.value)
        }
        metadataToSave[metadata.key] = metadata.value
      })
      this.$store.dispatch('UPDATE_DIRECTORY_METADATA', {
        directoryId: this.selectedDirectoryId,
        metadata: metadataToSave
      }).then(() => {
        this.$notifications.notify(
          {
            message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')}`,
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
    },
    saveStructure () {
      this.$store.dispatch('SAVE_STRUCTURE', this.currentProject.id).then(() => {
        this.$notifications.notify(
          {
            message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')}`,
            icon: 'info',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            type: 'info'
          })
        this.$store.dispatch('GET_STRUCTURE', this.currentProject.id)
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
    addModule () {
      this.$store.dispatch('ADD_TOP_LEVEL_DIRECTORY', { options: {} })
    },
    updateDraggable (e) {
      // get new and old index
      let newIndex = e.newIndex
      let oldIndex = e.oldIndex

      // Update Order
      this.$store.dispatch('UPDATE_ORDER', {newIndex, oldIndex})
    },
    linkFile () {
      if (this.selectedFile) {
        this.$store.dispatch('LINK_FILE_DIRECTORY', { directoryId: this.selectedDirectory.id, fileId: this.selectedFile._id }).then(() => {
          this.$notifications.notify(
            {
              message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')}`,
              icon: 'info',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'info'
            })
          // Add it to the model so we can see it without reloading
          this.selectedDirectory.addFile(new File({
            id: this.selectedFile._id,
            title: this.selectedFile._title,
            filename: this.selectedFile._filename,
            mimeType: this.selectedFile._mimeType
          }))
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
    linkDocument () {
      if (this.selectedDocument) {
        this.$store.dispatch('LINK_DOCUMENT_DIRECTORY', { directoryId: this.selectedDirectory.id, documentId: this.selectedDocument._id }).then(() => {
          this.$notifications.notify(
            {
              message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')}`,
              icon: 'info',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'info'
            })
          // Add it to the model so we can see it without reloading
          this.selectedDirectory.addDocument(new Document({
            id: this.selectedDocument._id,
            translations: this.selectedDocument._translations
          }))
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
    }
  },
  computed: {
    // This is a special layout that vue draggable uses to interact with vuex
    structure: {
      get () {
        return this.$store.state.structure.structure
      },
      set (value) {
        this.$store.dispatch('UPDATE_STRUCTURE', value)
      }
    },
    ...mapGetters([
      'getProjectById',
      'getProjectLangOptions',
      'getMetatypes',
      'getAllFiles',
      'getAllDocuments'
    ]),
    getLangOptions () {
      return this.getProjectLangOptions(this.currentProject.id) || []
    },
    currentProject () {
      return this.getProjectById(parseInt(this.$route.params.id)) || new Project({})
    }
  }
}
</script>
