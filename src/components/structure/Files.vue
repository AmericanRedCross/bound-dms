<template>
  <div class="directory-files mt-3">
    <b-list-group>
      <b-list-group-item v-for="file in files" :key="file.id" class="clearfix" v-if="!file.hidden">
        <b-button
          size="sm"
          variant="outline-danger"
          class="float-right"
          @click="remove(file)">
          <fa-icon name="times"></fa-icon>
        </b-button>
        <span v-if="documents"><b>{{ getDocumentTitle(file) }}</b></span>
        <span v-else>
          <div class="row">
            <div class="col-md-4">
              <b>{{ file.title }}</b>
            </div>
            <div class="col-md-4">
              <p>{{ file.filename }}</p>
            </div>
            <div class="col-md-4">
               <b-badge>{{ getLanguageName(file.code) }}</b-badge> <b-badge>{{ file.mimeType }}</b-badge>
            </div>
          </div>
        </span>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { languages } from 'countries-list'

export default {
  components: {},
  name: 'Directory-Files',
  props: {
    files: {
      type: Array,
      default: []
    },
    documents: {
      type: Boolean,
      default: false
    },
    directoryId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      modalVisibility: false
    }
  },
  methods: {
    getLanguageName (code) {
      let language = languages[code]
      if (language) {
        return `${language.name} (${code})`
      } else {
        return code
      }
    },
    remove (file) {
      let action = this.documents ? 'UNLINK_DOCUMENT_DIRECTORY' : 'UNLINK_FILE_DIRECTORY'
      this.$store.dispatch(action, { fileId: file.id }).then(() => {
        this.$notifications.notify(
          {
            message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')}`,
            icon: 'info',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            type: 'info'
          })
          // We can't reload the structure as there might be unsaved changes, for now hide it...
        file.hidden = true
        let documentIndex = this.files.indexOf(file)
        if (documentIndex >= 0) {
          this.files.splice(documentIndex, 1)
        }
        if (this.files.length === 0) {
          this.$emit('close')
        }
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
  computed: {
    ...mapGetters([
      'getProjectById'
    ])
  }
}
</script>
