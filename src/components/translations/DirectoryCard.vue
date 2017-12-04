<template>
  <div>
    <div>
      <h3 class="text-left directory-header mb-2">
        <span v-if="directoryNumbers.length === 0">{{ $t('projects.modules.module') }}</span>
        <span :class="'ml-' + directoryNumbers.length">
          <span>{{ getHierarchy }}: <i>{{ currentBaseTitle.title }}</i></span>
        </span>
      </h3>
      <div class="row">
        <div class="col">
          <div class="row">
              <!-- Title -->
              <b-card class="col ml-3 m-2">
                <div class="center-card text-left">
                  <small>{{ getHierarchy }} {{ $t('translationWorkflow.translations.directoryTitle') }}</small>
                  <!-- change `@click="editTitle = false"` to `@click="editTitle = true"` to enable base title editing -->
                  <div v-if="currentBaseTitle.title && !editTitle" class="font-weight-bold title-wrapper" @click="editTitle = false">
                    <!-- <fa-icon name="check" class="text-success"></fa-icon> -->
                    {{ currentBaseTitle.title }}
                  </div>
                  <div v-else>
                    <!-- change `@click="editTitle = false"` to `@click="editTitle = true"` to enable base title editing -->
                    <span v-if="!editTitle" @click="editTitle = false" class="font-weight-bold title-wrapper">
                      <fa-icon name="flag" class="text-danger"></fa-icon> {{ $t('translationWorkflow.translations.noTitle') }}
                    </span>
                    <b-input-group v-else>
                      <b-input-group-addon class="white-icon">
                        <fa-icon
                          :name="currentBaseTitle.title ? 'check' : 'flag'"
                          :class="currentBaseTitle.title ? 'text-success' : 'text-danger'">
                        </fa-icon>
                      </b-input-group-addon>

                      <b-form-textarea
                        v-model.trim="currentBaseTitle.title"
                        :placeholder="$t('translationWorkflow.translations.titlePlaceholder')">
                      </b-form-textarea>

                      <b-input-group-button slot="right">
                        <b-button class="title-confirm-button" @click="updateTitle(currentBaseTitle)" variant="outline-primary"><fa-icon name="check-circle"></fa-icon></b-button>
                      </b-input-group-button>
                    </b-input-group>
                  </div>
                </div>
              </b-card>
              <b-card class="col mr-3 m-2" v-if="currentTranslationTitle.language">
                <b-input-group class="check-circle">
                  <b-input-group-addon class="white-icon">
                    <fa-icon
                      :name="isTranslated('title') ? 'check' : 'flag'"
                      :class="isTranslated('title') ? 'text-success' : 'text-danger'">
                    </fa-icon>
                  </b-input-group-addon>
                  <b-form-textarea
                    @input="requiresSave = true"
                    v-model.trim="currentTranslationTitle.title"
                    :placeholder="$t('translationWorkflow.translations.titlePlaceholder')"
                    :class="rtl ? 'text-rtl' : ''">
                  </b-form-textarea>
                  <b-input-group-button slot="right">
                    <b-button class="title-confirm-button" variant="outline-primary" @click="updateTitle(currentTranslationTitle)"><fa-icon name="check-circle"></fa-icon></b-button>
                  </b-input-group-button>
                </b-input-group>
              </b-card>
            </div>
            <div class="row" v-for="doc in directory.documents" :key="doc.id">
              <!-- Content -->
              <b-card class="col ml-3 m-2 text-left">
                <small>{{ getHierarchy }} {{ $t('translationWorkflow.translations.directoryContent') }}</small>

                <pre v-if="doc" class="font-weight-bold">
                  <fa-icon name="check" class="text-success"></fa-icon>
                  {{ getDocumentTitle(doc, baseLanguage) | truncate('30') }}
                </pre>
                <div v-else class="font-weight-bold title-wrapper">
                  <fa-icon name="flag" class="text-danger"></fa-icon> {{ $t('translationWorkflow.translations.noContent') }}
                </div>
              </b-card>
              <b-card class="col mr-3 m-2"
                v-if="currentTranslationTitle.language">
                <i v-if="needsTranslation(doc, selectedLanguage)"> Revision required </i>
                <b-button
                  v-if="doc"
                  :variant="needsTranslation(doc, selectedLanguage) ? 'outline-danger' : 'outline-primary'"
                  class="w-100"
                  :disabled="false"
                  @click="setContentEditId(doc)">
                  {{ $t('common.edit') }} <b>{{ getDocumentTitle(doc, selectedLanguage) | truncate('30') }}</b>
                </b-button>
              </b-card>
            </div>
            <div class="row" v-if="false">
              <!-- Attachements -->
              <b-card class="col ml-3 m-2 text-left">
                <fa-icon name="file"></fa-icon> Module Roadmap
              </b-card>
              <b-card class="col mr-3 m-2" v-if="currentTranslationTitle.language">
                <b-input-group>
                  <b-input-group-addon class="white-icon">
                    <fa-icon :name="isTranslated ? 'check' : 'flag'" :class="isTranslated ? 'text-success' : 'text-danger'"></fa-icon>
                  </b-input-group-addon>
                  <b-form-file id="file_input1" v-model="file" class="w-100"></b-form-file>
                </b-input-group>
              </b-card>
            </div>
        </div>
      </div>
      <b-button
        @click="isOpen = !isOpen"
        v-if="directory.directories.length !== 0"
        variant="outline-primary"
        class="mb-2">
        <span v-if="!isOpen">{{ $t('translationWorkflow.translations.loadDirectories') }}</span>
        <span v-else>{{ $t('translationWorkflow.translations.closeDirectories') }}</span>
      </b-button>
    </div>
    <b-collapse :visible="isOpen" id="collapse-extra-card-content">
      <DirectoryCard
        v-if="isOpen"
        v-for="subdirectory in directory.directories"
        :key="directory.id" :directory="subdirectory"
        :directoryNumbers="getDirectories()">
      </DirectoryCard>
    </b-collapse>
  </div>
</template>

<script>
import { Directory } from '../../vuex/modules/structure/Directory'
import { languages } from 'countries-list'

export default {
  name: 'DirectoryCard',
  props: {
    directory: {
      type: Object,
      default: new Directory({})
    },
    directoryNumbers: {
      type: Array,
      default: () => [] // Use a function to return an array/object https://github.com/vuejs/vue/issues/1032
    }
  },
  data () {
    return {
      file: null,
      editTitle: false,
      isOpen: false,
      requiresSave: false,
      currentTranslationTitle: {
        title: '',
        language: ''
      },
      rtl: false
    }
  },
  methods: {
    getDirectories () {
      return [...this.directoryNumbers, this.directory.order]
    },
    isTranslated (type) {
      switch (type) {
        case 'title':
          if (this.currentBaseTitle.revision !== this.currentTranslationTitle.revision) {
            return false
          } else if (this.requiresSave || this.currentTranslationTitle.title === '') {
            return false
          }
          return true
        case 'file':

          break
      }
      return false
    },
    setContentEditId (doc) {
      this.$store.dispatch('CHANGE_EDIT_DOCUMENT', doc)
      this.$router.push({ name: 'content-translation' })
    },
    updateTitle (translation) {
      this.editTitle = false
      this.$store.dispatch('UPDATE_DIRECTORY_TITLE', {
        directoryId: this.directory.id,
        lang: translation.language,
        title: translation.title,
        revision: this.currentBaseTitle.revision
      }).then(() => {
        this.requiresSave = false
        translation.revision += 1
        this.$notifications.notify(
          {
            message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')}`,
            icon: 'info',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            type: 'info'
          })
        translation.revision = this.currentBaseTitle.revision
        this.directory.updateTranslation(translation)
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
    getDocumentTitle (doc, language) {
      if (doc && language) {
        let docLang = doc.getDocumentByLangCode(language.value.code)
        if (docLang) {
          return docLang.title
        }
      }
      return ''
    },
    needsTranslation (doc, language) {
      if (doc && language) {
        let docLang = doc.getDocumentByLangCode(language.value.code)
        let baseDoc = doc.getDocumentByLangCode(this.baseLanguage.value.code)
        if (docLang && baseDoc) {
          if (docLang.revision !== baseDoc.revision) {
            return true
          }
        }
      }
      return false
    },
    setRtl () {
      if (this.selectedLanguage) {
        let lang = languages[this.selectedLanguage.value.code]
        if (lang) {
          this.rtl = lang.rtl === 1
        }
      }
    }
  },
  mounted () {
    this.currentTranslationTitle = this.directory.getTitleByLangCode(this.selectedLanguage.value.code)
    this.setRtl()
  },
  watch: {
    // whenever selected lang changes, this function will run
    selectedLanguage: function () {
      this.currentTranslationTitle = this.directory.getTitleByLangCode(this.selectedLanguage.value.code)
      this.setRtl()
    }
  },
  computed: {
    getHierarchy () {
      let hierarchy = ''
      this.directoryNumbers.forEach((number) => {
        hierarchy += number + 1 + '.'
      })
      hierarchy += this.directory.order + 1
      return hierarchy
    },
    selectedLanguage () {
      return this.$store.state.translations.selectedLanguage
    },
    languageList () {
      return this.$store.state.translations.languages
    },
    baseLanguage () {
      return this.$store.state.translations.baseLanguage
    },
    currentBaseTitle () {
      if (this.baseLanguage) {
        return this.directory.getTitleByLangCode(this.baseLanguage.value.code)
      }
      return {}
    }
  }
}
</script>
