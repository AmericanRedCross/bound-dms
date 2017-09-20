<template>
    <div class="document-translation" align="center">
      <div class="row mt-1 mb-1">
        <div class="col font-weight-bold">
        </div>
        <div class="col font-weight-bold">
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <!-- Base language -->
          <ContentBlock v-for="(token, index) in tokens" :key="index" :block.sync="token" class="text-left"></ContentBlock>
        </div>
        <div class="col-6">

          <div class="text-left" v-html="renderedContent">

          </div>
          <!-- Selected Language -->

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
      tokens: [],
      md: new MarkdownIt(),
      rendered: ''
    }
  },
  mounted () {
    let directoryId = this.$store.state.translations.contentIdToEdit
    if (directoryId) {
      // Get directory content to edit...
      this.directory = this.getDirectoryById(directoryId)
      this.tokens = this.md.parse(this.directory.content, {})
    } else {
      this.$router.push({name: 'projects'})
    }
  },
  methods: {

  },
  computed: {
    ...mapGetters([
      'getProjectById',
      'getDirectoryById'
    ]),
    renderedContent () {
      return this.md.renderer.render(this.tokens, this.md.options, {})
    }
  }
}
</script>
