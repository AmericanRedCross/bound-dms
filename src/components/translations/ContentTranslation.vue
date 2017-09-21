<template>
  <div class="document-translation">
    <div class="row">
      <div class="col">
        <toggle-button :value="viewMd" @change="updateMdView" color="#007bff"/>
        {{ $t('translationWorkflow.previewMarkdown') }}
      </div>
    </div>
    <div class="row" v-if="viewMd">
      <div class="col-6">
        <!-- Base language -->
        <vue-markdown class="markdown-preview mb-2">{{ renderedContent }}</vue-markdown>
      </div>
      <div class="col-6">
        <!-- Selected Language -->
        <vue-markdown class="markdown-preview mb-2">{{ renderedContent }}</vue-markdown>
      </div>
    </div>
    <div class="row mb-4" v-for="(block, index) in blocks" :key="index" v-else>
      <div class="col-6">
        <!-- Base language -->
        <ContentBlock :block.sync="block" @update:block="updateRender" class="text-left h-100"></ContentBlock>
      </div>
      <div class="col-6">
        <!-- Selected Language -->
        <ContentBlock :block.sync="block" class="text-left h-100"></ContentBlock>
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
      blocks: [],
      translationBlocks: [],
      md: new MarkdownIt(),
      renderedContent: '',
      viewMd: false
    }
  },
  mounted () {
    let directoryId = this.$store.state.translations.contentIdToEdit
    if (directoryId) {
      // Get directory content to edit...
      this.directory = this.getDirectoryById(directoryId)
      // this.tokens = this.md.parse(this.directory.content, {})
      this.blocks = this.directory.content.split('\n\n').map(block => ({content: block}))
      this.updateRender()
    } else {
      this.$router.push({name: 'projects'})
    }
  },
  methods: {
    updateMdView (value) {
      this.viewMd = value.value
    },
    updateRender () {
      this.renderedContent = ''
      this.blocks.forEach(block => {
        this.renderedContent += block.content + '\n\n'
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
