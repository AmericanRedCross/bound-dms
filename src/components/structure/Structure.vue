<template>
  <div class="structure">
    <StepComp :step="module1" :isModule="true"></StepComp>
    <StepComp :step="module2" :isModule="true"></StepComp>
  </div>
</template>
<script>
import StepComp from './Step'
import { Step } from '../../vuex/modules/structure/Step'

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
          attachments: [],
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
            steps: [new Step({
              id: 3,
              title: 'Et Harum quidem reprum',
              hierarchy: 1,
              content: '# Some other content',
              attachments: []
            })]
          })]
        }
      )
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

</style>
