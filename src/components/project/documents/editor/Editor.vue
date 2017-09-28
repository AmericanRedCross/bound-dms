<template>
  <div>
    <b-card class="mb-3">
      <div class="row mb-2">
        <div class="col">
          <b-button variant="primary" @click="back">
            <fa-icon name="arrow-left"></fa-icon>
             {{ $t('common.back') }}
          </b-button>
          <b-button variant="success" @click="save" :disabled="!needsSaving || saving">
            <fa-icon v-if="saving" name="refresh" spin></fa-icon>
            <fa-icon v-else name="save"></fa-icon>
             {{ $t('common.save') }}
          </b-button>
          <span v-if="importingDocument"><fa-icon name="refresh" spin></fa-icon> {{ $t('projects.documents.edit.importingDocument') }}</span>
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

    <markdown-editor :disabled="true" v-model="content" ref="markdownEditor" :configs="simplemdeConfig"></markdown-editor>

    <b-modal ref="imagePicker"
      :title="$t('projects.documents.edit.pickImage')"
      @ok="injectImage({url: image.url, alt: image.alt})"
      size="lg">
      <MediaPicker type="IMAGE" :fileRef.sync="image"></MediaPicker>
    </b-modal>
    <input ref="file-import-input" type="file" v-show="false" accept=".docx" @change="onFileChange">
  </div>
</template>

<script>
import toolbar from './toolbarOptions'
import MediaPicker from '@/components/ui/MediaPicker'
import markdownEditor from 'vue-simplemde/markdown-editor'
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
      saving: false,
      image: {
        url: 'http://',
        alt: ''
      },
      imageUrl: 'http://',
      imageAlt: '',
      simplemdeConfig: {
        toolbar: toolbar
      }
    }
  },
  mounted () {
    this.contentCopy = this.content
    this.titleCopy = this.title
  },
  methods: {
    back () {
      if (this.needsSaving || this.contentCopy !== this.content) {
        this.$swal({
          title: this._i18n.t('common.areYouSure'),
          text: this._i18n.t('common.changesMade'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this._i18n.t('common.goBack'),
          allowOutsideClick: false
        }).then(() => {
          this.$router.push({name: 'project-documents', params: {id: parseInt(this.$route.params.id)}})
        }).catch(this.$swal.noop)
      } else {
        this.$router.push({name: 'project-documents', params: {id: parseInt(this.$route.params.id)}})
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
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
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
    save () {
      this.saving = true
      let projectId = parseInt(this.$route.params.id)
      let saveData = {
        language: this.getProjectById(projectId).baseLanguage,
        title: this.title,
        content: this.content
      }

      this.$store.dispatch('CREATE_DOCUMENT', {
        projectId,
        data: saveData
      }).then(() => {
        this.saving = false
        this.$notifications.notify(
          {
            message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.created')} ${this.title}`,
            icon: 'info',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            type: 'info'
          })
        this.$router.push({name: 'project-documents', params: {id: parseInt(this.$route.params.id)}})
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
    }
  }
}
</script>
