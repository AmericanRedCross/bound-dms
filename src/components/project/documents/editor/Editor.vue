<template>
  <div>
    <b-card class="mb-3">
      <div class="row mb-2">
        <div class="col">
          <b-button variant="danger" @click="back" class="m-1">
            <fa-icon name="arrow-left"></fa-icon>
             {{ $t('common.back') }}
          </b-button>
          <b-button variant="primary" @click="attachImage" class="m-1">
            <fa-icon name="photo"></fa-icon>
             {{ $t('projects.documents.edit.uploadImage') }}
          </b-button>
          <b-button variant="primary" @click="importDocument" class="m-1">
            <fa-icon name="file-text"></fa-icon>
             {{ $t('projects.documents.edit.importDocument') }}
          </b-button>
          <span v-if="importingDocument"><fa-icon name="refresh" spin></fa-icon> {{ $t('projects.documents.edit.importingDocument') }}</span>
          <span v-if="loadingDocument"><fa-icon name="refresh" spin></fa-icon> {{ $t('projects.documents.edit.loadingDocument') }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <b-form-group
              :label="$t('projects.documents.edit.titlePlaceholder')"
              :feedback="$t('projects.documents.edit.titleNeeded')"
              :state="titleState"
          >
            <b-form-input id="input1" :state="titleState" v-model.trim="title"></b-form-input>
          </b-form-group>
        </div>
      </div>
    </b-card>
    <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
    <b-dropdown :text="$t('common.save')" variant="success" class="float-right" :disabled="!needsSaving || saving" right>
      <span slot="text">
        <fa-icon v-if="saving" name="refresh" spin></fa-icon>
        <fa-icon v-else name="save"></fa-icon>
         {{ $t('common.save') }}
      </span>
      <b-dropdown-item @click="save(true)">{{ $t('common.saveWrevision') }}</b-dropdown-item>
      <b-dropdown-item @click="save(false)">{{ $t('common.save') }}</b-dropdown-item>
    </b-dropdown>

    <b-modal ref="imagePicker"
      :title="$t('projects.documents.edit.pickImage')"
      @ok="injectImage({url: image.url, alt: image.alt})"
      size="lg">
      <MediaPicker type="IMAGE" :fileRef.sync="image" :currentProject="currentProject" :projectId="projectId"></MediaPicker>
    </b-modal>
    <input ref="file-import-input" type="file" v-show="false" accept=".docx" @change="onFileChange">
  </div>
</template>

<style>
  @import '~simplemde/dist/simplemde.min.css';
</style>

<script>
import toolbar from './toolbarOptions'
import MediaPicker from '@/components/ui/MediaPicker'
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  components: {
    MediaPicker,
    markdownEditor
  },
  data () {
    // Setup simplemde toolbar
    // Replace image and import button with our own actions.
    toolbar.forEach((btn) => {
      if (btn !== '|') {
        switch (btn.name) {
          case 'image':
            btn.action = this.attachImage
            break
          case 'import':
            btn.action = this.importDocument
            break
        }
      }
    })
    return {
      content: '',
      title: '',
      contentCopy: '',
      titleCopy: '',
      importingDocument: false,
      loadingDocument: false,
      saving: false,
      image: {
        url: 'http://',
        alt: ''
      },
      imageUrl: 'http://',
      imageAlt: '',
      documentId: null,
      projectId: parseInt(this.$route.params.id),
      editingDocument: (!Number.isNaN(this.documentId) && this.$route.params.lang),
      translations: []
    }
  },
  watch: {
    content: 'contentChange'
  },
  mounted () {
    // Fix for content sometimes not loading in the editor https://github.com/sparksuite/simplemde-markdown-editor/issues/344
    this.contentCopy = this.content
    this.titleCopy = this.title
    this.documentId = parseInt(this.$route.params.docId)
    if (this.editingDocument) {
      this.loadingDocument = true
      // Get the document...
      this.$store.dispatch('GET_DOCUMENT_BY_ID_LANG', {
        documentId: this.documentId,
        language: this.$route.params.lang,
        isBase: true
      }).then(() => {
        this.loadingDocument = false
        let currentDoc = this.$store.state.documents.currentBaseDocument
        this.content = this.contentCopy = currentDoc.content
        this.title = this.titleCopy = currentDoc.title
        this.$store.dispatch('GET_DOCUMENT_TRANSLATIONS', { documentId: currentDoc.documentId, projectId: this.projectId })
        .then(() => {
          this.$store.dispatch('GET_CURRENT_DOCUMENT_TRANSLATIONS', { projectId: this.projectId }).then(this.setupTranslations)
          setTimeout(() => {
            this.simplemde.codemirror.refresh()
          }, 500)
        })
      }).catch(() => {
        this.loadingDocument = false
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
  methods: {
    contentChange (newContent, oldContent) {
      let newContentBlocks = newContent.split('\n\n')
      let oldContentBlocks = oldContent.split('\n\n')
      let cursorStart = this.simplemde.codemirror.getCursor('start')
      let cursorEnd = this.simplemde.codemirror.getCursor('end')
      let baseLanguage = this.getProjectById(this.projectId).baseLanguage
      if (cursorEnd.line === cursorStart.line) {
        // Same line
        if (newContentBlocks.length > oldContentBlocks.length) {
          // We've added a new line/s
          let numberToAdd = newContentBlocks.length - oldContentBlocks.length
          this.translations.forEach(translation => {
            if (translation.language !== baseLanguage) {
              for (let i = 0; i < numberToAdd; i++) {
                translation.blocks.splice(Math.floor(cursorStart.line / 2), 0, '')
              }
            }
          })
        } else if (newContentBlocks.length < oldContentBlocks.length) {
          // We've removed a line (only need to remove one here because of the start and end lines matching)
          let numberToRemove = oldContentBlocks.length - newContentBlocks.length
          this.translations.forEach(translation => {
            if (translation.language !== baseLanguage) {
              translation.blocks.splice(Math.floor(cursorStart.line / 2), numberToRemove)
            }
          })
        }
      }
    },
    setupTranslations () {
      this.translations = this.$store.state.documents.editTranslations
      this.translations.forEach(translation => {
        translation.blocks = translation.content.split('\n\n')
      })
    },
    back () {
      if (this.needsSaving || this.contentCopy !== this.content) {
        this.$swal({
          title: this._i18n.t('common.areYouSure'),
          text: this._i18n.t('common.changesMade'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#6200ff',
          cancelButtonColor: '#f85e78',
          confirmButtonText: this._i18n.t('common.goBack'),
          allowOutsideClick: false
        }).then(() => {
          this.$router.push({name: 'project-documents', params: {id: this.projectId}})
        }).catch(this.$swal.noop)
      } else {
        this.$router.push({name: 'project-documents', params: {id: this.projectId}})
      }
    },
    attachImage () {
      this.$refs.imagePicker.show()
    },
    injectImage (options) {
      this.image.url = 'http://'
      this.image.alt = ''
      // Attach an md link `![](http://)` with a url injected from the image uploader
      let url = options.url || 'http://'
      let alt = options.alt || ''
      let cm = this.simplemde.codemirror
      let mdeOptions = this.simplemde.options

      let start = mdeOptions.insertTexts.image[0]
      start = start.replace('[]', '[' + alt + ']')
      let end = mdeOptions.insertTexts.image[1]
      // Get where the cursor is
      let startPoint = cm.getCursor('start')

      end = end.replace('#url#', url)

      cm.replaceRange(start + end, {
        line: startPoint.line,
        ch: startPoint.ch
      })
    },
    importDocument () {
      this.$refs['file-import-input'].click()
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.sendFile(files[0])
    },
    sendFile (file) {
      let formData = new FormData()
      formData.append('file', file)
      if (this.content.length > 0) {
        this.$swal({
          title: this._i18n.t('common.areYouSure'),
          text: this._i18n.t('projects.documents.edit.overwrite'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#6200ff',
          cancelButtonColor: '#f85e78',
          confirmButtonText: this._i18n.t('common.goBack'),
          allowOutsideClick: false
        }).then(() => {
          this.postFile(formData)
        }).catch(this.$swal.noop)
      } else {
        this.postFile(formData)
      }
    },
    postFile (formData) {
      this.importingDocument = true
      axios.post('/documents/convert', formData).then((response) => {
        this.content = response.data
        this.importingDocument = false
      }).catch(() => {
        this.importingDocument = false
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
    save (newRevision) {
      this.saving = true
      let saveData = {
        language: this.getProjectById(this.projectId).baseLanguage,
        title: this.title,
        content: this.content,
        newRevision: newRevision
      }
      let baseLanguage = this.getProjectById(this.projectId).baseLanguage

      this.translations.forEach(translation => {
        if (translation.language !== baseLanguage) {
          let content = ''
          translation.blocks.forEach((block, index) => {
            content += block
            if (index !== translation.blocks.length - 1) {
              content += '\n\n'
            }
          })
          translation.content = content
        }
      })
      let promises = []

      if (this.editingDocument) {
        promises.push(this.$store.dispatch('UPDATE_DOCUMENT_TRANSLATION', {
          documentId: this.documentId,
          language: this.$route.params.lang,
          data: saveData
        }))

        this.translations.forEach(translation => {
          if (translation.language !== baseLanguage) {
            promises.push(this.$store.dispatch('UPDATE_DOCUMENT_TRANSLATION', {
              documentId: this.documentId,
              language: translation.language,
              data: {
                language: translation.language,
                title: translation.title,
                content: translation.content,
                newRevision: false
              }
            }))
          }
        })
      } else {
        promises.push(this.$store.dispatch('CREATE_DOCUMENT', {
          projectId: this.projectId,
          data: saveData
        }))
      }

      Promise.all(promises).then(() => {
        this.saving = false
        this.$notifications.notify(
          {
            message: `<b>
              ${this._i18n.t('common.saved')}</b><br />
              ${this._i18n.t(this.editingDocument ? 'common.updated' : 'common.created')}
              ${this.title}`,
            icon: 'info',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            type: 'info'
          })
        this.$router.push({name: 'project-documents', params: {id: this.projectId}})
      }).catch(() => {
        this.saving = false
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
  computed: {
    ...mapGetters([
      'getProjectById'
    ]),
    titleState () {
      return this.title.length > 0 ? null : false
    },
    simplemde () {
      return this.$refs.markdownEditor.simplemde
    },
    needsSaving () {
      if ((this.contentCopy !== this.content || this.titleCopy !== this.title) && this.title.length > 0) {
        return true
      }
      return false
    },
    currentProject () {
      return this.getProjectById(this.projectId)
    }
  }
}
</script>
