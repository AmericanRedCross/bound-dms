<template>
  <div class="structure">
    <b-button @click.native="saveRevision" variant="success">Save Revision</b-button>
    <StepComp :step="module1" :isModule="true"></StepComp>
    <StepComp :step="module2" :isModule="true"></StepComp>
  </div>
</template>
<script>
import StepComp from './Step'
import { Step } from '../../vuex/modules/structure/Step'
import { Attachment } from '../../vuex/modules/structure/Attachment'

export default {
  name: 'Structure',
  components: {
    StepComp
  },
  data () {
    return {
      module1: new Step(
        {
          id: 1,
          title: 'Prepare and analyze',
          hierarchy: 1,
          content: '# Markdown Content',
          critical: true,
          attachments: [new Attachment({id: 1, title: 'Attachment', url: 'http://somedocument.pdf', size: 12000, mime: '', featured: true}),
            new Attachment({id: 2, title: 'Another one', url: 'http://somedocument.docx', size: 12000, mime: '', featured: true}),
            new Attachment({id: 3, title: 'Something else', url: 'http://somedocument.md', size: 12000, mime: '', featured: true})],
          steps: [new Step({
            id: 2,
            title: 'Et Harum quidem reprum',
            hierarchy: 1,
            content: '# Some other content',
            attachments: [],
            steps: [new Step({
              id: 3,
              title: 'Et Harum quidem reprum',
              hierarchy: 1,
              content: '# Some other content',
              attachments: []
            }),
              new Step({
                id: 3,
                title: 'Et Harum quidem reprum',
                hierarchy: 2,
                content: '# Some other content',
                attachments: []
              })]
          })]
        }
      ),
      module2: new Step(
        {
          id: 2,
          title: 'Prepare and analyze',
          hierarchy: 2,
          content: '# Markdown Content',
          attachments: [],
          steps: [new Step({
            id: 2,
            title: 'Et Harum quidem reprum',
            hierarchy: 1,
            content: '# Some other content',
            attachments: [],
            steps: [
              new Step({
                id: 3,
                title: 'Et Harum quidem reprum',
                hierarchy: 1,
                content: '# Some other content',
                attachments: []
              }),
              new Step({
                id: 4,
                title: 'Et Harum quidem reprum',
                hierarchy: 2,
                content: '# Some other content',
                attachments: []
              })
            ]
          })]
        }
      )
    }
  },
  methods: {
    saveRevision () {
    }
  },
  props: {
    project: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
ol {

}
</style>
