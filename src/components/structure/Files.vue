<template>
  <div class="directory-files mt-3">
    <b-list-group>
      <b-list-group-item v-for="file in files" :key="file.id" class="clearfix" v-if="!file.hidden">
        <span v-if="documents"><b>{{ getDocumentTitle(file) }}</b></span>
        <span v-else><b>{{ file.title }}</b> | {{ file.filename }} | {{ file.mimeType }}</span>
        <b-button
          size="sm"
          variant="outline-danger"
          class="float-right"
          @click="remove(file)">
            <fa-icon name="times"></fa-icon>
        </b-button>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
