<template>
  <div class="step">
    <b-card>
      <div class="d-flex align-items-baseline flex-wrap step-header">
        <h4><span v-if="isModule">{{ $t('projects.modules.module') }}</span> <span v-if="parent">{{ parent }}.</span>{{ step.hierarchy }}</h4>
        <i class="ml-2">{{ step.title }}</i>
        <div class="ml-auto">
          <b-button>{{ $t('common.rename') }}</b-button>
          <b-button>{{ $t('common.delete') }}</b-button>
          <b-button>{{ $t('common.info') }}</b-button>
        </div>
      </div>
    </b-card>
    <Step
      v-for="substep in step.steps"
      :key="substep.id" :step="substep"
      :parent="parent ? parent + '.' + substep.hierarchy : String(step.hierarchy)"
      class="sub-step ml-5"
      >
    </Step>
    <!-- We need to use a key here so vue can keep track of the steps' identities https://vuejs.org/v2/guide/list.html#key -->
  </div>
</template>
<script>
import { Step } from '../../vuex/modules/structure/Step'

export default {
  name: 'Step',
  props: {
    step: {
      type: Object,
      default: new Step({})
    },
    parent: {
      type: String
    },
    isModule: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getMargin () {
      return 20
    }
  }
}
</script>

<style lang="scss" scoped>
  .step-header {
    i {
      text-transform: uppercase;
    }
  }
  .step {
    margin-top: 5px;
  }
</style>
