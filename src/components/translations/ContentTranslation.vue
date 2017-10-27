<template>
  <div class="document-translation">
    <div clsaa="row" align="right">
      <b-button variant="primary" @click="save" :disabled="saving">
        <fa-icon v-show="saving" name="refresh" spin></fa-icon> {{ $t('common.save') }} {{ selectedLanguage.label }}
      </b-button>
    </div>
    <div class="row">
      <div class="col-6" v-if="baseDocReference">
        <b-form-group :label="$t('projects.documents.edit.titlePlaceholder')">
          <b-form-input v-model="baseDocReference.title"></b-form-input>
        </b-form-group>
      </div>
      <div class="col-6" v-if="translationDocTitle !== null">
        <b-form-group :label="$t('projects.documents.edit.titlePlaceholder')">
          <b-form-input v-model="translationDocTitle"></b-form-input>
        </b-form-group>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col">
        <toggle-button :value="viewMd" @change="updateMdView" color="#007bff"/>
        {{ $t('translationWorkflow.previewMarkdown') }}
      </div>
    </div>
    <div class="row" v-if="viewMd">
      <div class="col-6">
        <!-- Base language -->
        <vue-markdown class="markdown-preview mb-2">{{ renderedBaseContent }}</vue-markdown>
      </div>
      <div class="col-6">
        <!-- Selected Language -->
        <vue-markdown class="markdown-preview mb-2">{{ renderedTranslationContent }}</vue-markdown>
      </div>
    </div>
    <div class="row mb-4" v-for="(block, index) in baseBlocks" :key="index" v-else>
      <div class="col-6">
        <!-- Base language -->
        <ContentBlock :block.sync="block" @update:block="updateRender" class="text-left h-100" :disabled="true"></ContentBlock>
      </div>
      <div class="col-6">
        <!-- Selected Language -->
        <ContentBlock :block.sync="translationBlocks[index]" @update:block="updateRender" :placeholder="block" class="text-left h-100"></ContentBlock>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import MarkdownIt from 'markdown-it'
import { mapGetters } from 'vuex'
import TranslationInfo from '@/components/translations/TranslationInfo'
import ContentBlock from '@/components/translations/ContentBlock'

export default {
  name: 'content-translation',
  components: {
    TranslationInfo,
    ContentBlock,
    VueMarkdown
  },
  data () {
    return {
      directory: null,
      baseBlocks: [],
      translationBlocks: [],
      md: new MarkdownIt(),
      renderedBaseContent: '',
      renderedTranslationContent: '',
      viewMd: false,
      baseDocReference: null,
      translationDocReference: null,
      translationDocTitle: '',
      parentDoc: null,
      translationBaseDoc: null,
      translationDoc: null,
      saving: false
    }
  },
  mounted () {
    this.updateDocuments()
  },
  watch: {
    // whenever selected lang changes, this function will run
    selectedLanguage () {
      this.updateDocuments()
    }
  },
  methods: {
    updateDocuments () {
      this.parentDoc = this.$store.state.translations.documentToEdit

      if (this.parentDoc) {
        // Reset any variables
        this.baseBlocks = []
        this.translationBlocks = []

        this.translationBaseDoc = null
        this.translationDoc = null

        this.baseDocReference = this.parentDoc.getDocumentByLangCode(this.baseLanguage.value.code)
        this.translationDocReference = this.parentDoc.getDocumentByLangCode(this.selectedLanguage.value.code)
        if (this.translationDocReference) {
          this.translationDocTitle = this.translationDocReference.title
        }

        this.setContent().then(this.createBlocks)
      } else {
        this.$router.push({name: 'projects'})
      }
    },
    setContent (selectedLangChange = false) {
      // Get Documents
      this.loadingDocuments = true
      let promises = []
      if (!selectedLangChange) {
        promises.push(this.$store.dispatch('GET_DOCUMENT_BY_ID_LANG', {
          documentId: this.parentDoc.id,
          language: this.baseLanguage.value.code,
          isBase: true
        }))
      }

      if (this.translationDocReference) {
        promises.push(this.$store.dispatch('GET_DOCUMENT_BY_ID_LANG', {
          documentId: this.parentDoc.id,
          language: this.selectedLanguage.value.code,
          isBase: false
        }))
      } else {
        this.$store.dispatch('RESET_TRANSLATING_DOCUMENT')
      }

      return Promise.all(promises).then(() => {
        this.loadingDocuments = false
        this.translationBaseDoc = this.$store.state.documents.currentBaseDocument
        this.translationDoc = this.$store.state.documents.currentTranslatingDocument
      }).catch(() => {
        this.loadingDocuments = false
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
    createBlocks () {
      if (this.translationBaseDoc) {
        this.baseBlocks = this.translationBaseDoc.content.split('\n\n').map(block => ({content: block}))
      }
      if (this.translationDoc) {
        this.translationBlocks = this.translationDoc.content.split('\n\n').map(block => ({content: block}))
      } else {
        // Create the blocks we need
        this.baseBlocks.forEach(() => {
          this.translationBlocks = []
          this.translationBlocks.push({content: ''})
        })
      }
      this.updateRender()
    },
    updateMdView (value) {
      this.viewMd = value.value
    },
    updateRender () {
      this.renderedBaseContent = ''
      this.baseBlocks.forEach((block, index) => {
        this.renderedBaseContent += block.content
        if (index !== this.baseBlocks.length - 1) {
          this.renderedBaseContent += '\n\n'
        }
      })

      this.renderedTranslationContent = ''
      this.translationBlocks.forEach((block, index) => {
        this.renderedTranslationContent += block.content
        if (index !== this.translationBlocks.length - 1) {
          this.renderedTranslationContent += '\n\n'
        }
      })
    },
    save () {
      let promises = []
      this.saving = true
      // Uncomment to save the base document as well as the translated document.
      /* promises.push(this.$store.dispatch('UPDATE_DOCUMENT_TRANSLATION', {
        documentId: this.parentDoc.id,
        language: this.baseLanguage.value.code,
        data: {
          title: this.baseDocReference.title,
          content: this.renderedBaseContent
        }
      })) */
      promises.push(this.$store.dispatch('UPDATE_DOCUMENT_TRANSLATION', {
        documentId: this.parentDoc.id,
        language: this.selectedLanguage.value.code,
        data: {
          title: this.translationDocTitle,
          content: this.renderedTranslationContent
        }
      }).then((response) => {
        // Add the document from the response so we know we've created one
        if (!this.translationDocReference) {
          this.parentDoc.addDocument(response.data)
        }
      }))

      Promise.all(promises).then(() => {
        // Finished saving
        this.saving = false
        this.$notifications.notify(
          {
            message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')}`,
            icon: 'info',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            type: 'info'
          })
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
      'getProjectById',
      'getDirectoryById'
    ]),
    selectedLanguage () {
      return this.$store.state.translations.selectedLanguage
    },
    baseLanguage () {
      return this.$store.state.translations.baseLanguage
    }
  }
}
</script>
