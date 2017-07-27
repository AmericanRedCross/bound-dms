<template>
  <div class="step">
    <ChevronToggle :value="isOpen" v-on:change="toggleStep" class="chevron mt-3"></ChevronToggle>
    <b-card>
      <div class="d-flex align-items-baseline flex-wrap step-header">
        <h4><span v-if="isModule">{{ $t('projects.modules.module') }}</span> <span v-if="parent">{{ parent }}.</span>{{ step.hierarchy }}</h4>
        <i class="ml-2">{{ step.title }}</i>
        <div class="ml-auto">
          <b-dropdown class="m-md-2 step-actions" right>
            <fa-icon name="cog" slot="text"></fa-icon>
            <b-dropdown-item href="#" class="step-action">
              <fa-icon name="font"></fa-icon>
              {{ $t('common.rename') }}
            </b-dropdown-item>
            <b-dropdown-item href="#" class="step-action">
              <fa-icon name="trash"></fa-icon>
              {{ $t('common.delete') }}
            </b-dropdown-item>
            <b-dropdown-item href="#" class="step-action">
              <fa-icon name="info-circle"></fa-icon>
              {{ $t('common.info') }}
            </b-dropdown-item>
            <b-dropdown-item-button v-if="isModule" @click.native="addStep" class="step-action">
              <fa-icon name="plus-circle"></fa-icon>
              {{ $t('projects.modules.addStep') }}
            </b-dropdown-item-button>
            <b-dropdown-item-button v-else @click.native="addSubStep" class="step-action">
              <fa-icon name="plus-circle"></fa-icon>
              {{ $t('projects.modules.addSubStep') }}
            </b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-header>
              <toggle-button
                :value="step.critical"
                :width="150"
                :labels="{checked: $t('projects.modules.criticalPathOn'), unchecked: $t('projects.modules.criticalPathOff')}"
                @change="updateCritical"
                />
            </b-dropdown-header>
          </b-dropdown>
        </div>
      </div>
    </b-card>

    <transition-group name="step-list">
      <!-- We need to use a key here so vue can keep track of the steps' identities https://vuejs.org/v2/guide/list.html#key -->
      <Step
        v-for="(substep, stepIndex) in step.steps"
        :key="stepIndex"
        :step="substep"
        :parent="parent ? parent + '.' + substep.hierarchy : String(step.hierarchy)"
        :index="index"
        class="sub-step ml-5 step-list-item">
      </Step>
    </transition-group>

  </div>
</template>
<script>
import { Step } from '../../vuex/modules/structure/Step'
import ChevronToggle from '../ui/ChevronToggle'

export default {
  name: 'Step',
  components: {
    ChevronToggle
  },
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
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    addStep () {
      this.step.addStepAtIndex({index: this.index})
    },
    updateCritical (value) {
      this.step.critical = value.value
    },
    addSubStep () {

    },
    toggleStep (value) {
      console.log('recieved')
      this.isOpen = value
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
    .chevron {
      float: left;
    }
    margin-top: 5px;
    clear: both;
    .step-action {
      svg {
        top: 1px;
        position: relative;
        min-width: 25px;
      }
    }
  }

  .step-list-item {
    transition: all 0.5s ease-out;
  }
  .step-list-enter, .step-list-leave-to
  /* .step-list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(30px);
  }
  .step-list-leave-active {
    position: absolute;
  }
</style>
