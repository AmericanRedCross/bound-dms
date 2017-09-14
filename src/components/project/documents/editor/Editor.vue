<template>
  <div>
    <b-card class="mb-3">
      <div class="row mb-2">
        <div class="col">
          <b-button variant="primary" @click="back">
            <fa-icon name="arrow-left"></fa-icon>
             {{ $t('common.back') }}
          </b-button>
          <b-button variant="success" @click="save" :disabled="needsSaving">
            <fa-icon name="save"></fa-icon>
             {{ $t('common.save') }}
          </b-button>
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

    <markdown-editor v-model="content" ref="markdownEditor" :configs="simplemdeConfig"></markdown-editor>

    <b-modal ref="imagePicker"
      :title="$t('projects.documents.edit.pickImage')"
      @ok="injectImage({url: image.url, alt: image.alt})"
      size="lg">
      <MediaPicker type="IMAGE" :fileRef.sync="image"></MediaPicker>
    </b-modal>
  </div>
</template>

<script>
import toolbar from './toolbarOptions'
import MediaPicker from '@/components/ui/MediaPicker'
import markdownEditor from 'vue-simplemde/markdown-editor'

export default {
  components: {
    MediaPicker,
    markdownEditor
  },
  data () {
    // Setup simplemde toolbar
    // Replace image button with our own..
    let imageButton = {
      action: this.attachImage,
      className: 'fa fa-picture-o',
      default: true,
      name: 'image',
      title: 'Insert Local Image'
    }
    let buttonIndex = toolbar.findIndex((btn) => {
      if (btn !== '|') {
        return btn.name === 'image'
      }
    })

    if (buttonIndex > -1) {
      toolbar[buttonIndex].action = this.attachImage
    } else {
      toolbar.push(imageButton)
    }

    return {
      content: '',
      title: '',
      contentCopy: '',
      titleCopy: '',
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
      this.$router.push(window.history.back())
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
    save () {
      let saveData = {
        language: 'en',
        title: this.title,
        content: this.content
      }

      this.$store.dispatch('CREATE_DOCUMENT', {
        projectId: parseInt(this.$route.params.id),
        data: saveData
      }).then(() => {
        this.$notifications.notify(
          {
            message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.created')} ${this.title}`,
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
    }
  },
  computed: {
    titleState () {
      return this.title.length > 0 ? null : false
    },
    simplemde () {
      return this.$refs.markdownEditor.simplemde
    },
    needsSaving () {
      if ((this.contentCopy !== this.content || this.titleCopy !== this.title) && this.title.length > 0) {
        return false
      }
      return true
    }
  }
}
</script>
