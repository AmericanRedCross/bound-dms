<template>
  <div class="step">
    <!-- Chevron toggle for expanding sub items (See #collapse-steps for the actual collapsable area) -->
    <chevron-toggle :value="isExpanded" v-on:change="toggleStep" v-if="step.steps.length" class="chevron mt-3"></chevron-toggle>
    <b-card :class="{noToggle: !step.steps.length}">

      <!-- Module Header (The bit that's not hidden) -->
      <div class="d-flex align-items-baseline flex-wrap step-header content">
        <h4><span v-if="isModule">{{ $t('projects.modules.module') }}</span> <span v-if="parent">{{ parent }}.</span><span id="hierarchy">{{ step.hierarchy }}</span></h4>
        <i v-if="!editTitle" class="ml-2">{{ step.title }}</i>

        <span class="title-input ml-2" v-else>
          <b-input-group>
            <b-form-input v-model="step.title"
                    type="text"
                    placeholder="Enter a title">
            </b-form-input>

            <!-- Attach Right button -->
            <b-input-group-button slot="right" >
              <b-button @click.native="editTitle = false"><fa-icon name="check"></fa-icon></b-button>
            </b-input-group-button>

          </b-input-group>
        </span>
        <!-- Push this stuff right-->
        <div class="ml-auto">
          <fa-icon v-if="step.critical" scale="2" name="star" class="critical-icon"></fa-icon>

          <b-button @click.native="isOpen = !isOpen"><fa-icon name="file-text"></fa-icon></b-button>

          <b-dropdown class="m-md-2 step-actions ignore-drag" right>
            <fa-icon name="cog" slot="text"></fa-icon>

            <b-dropdown-item-button @click.native="editTitle = true" class="step-action">
              <fa-icon name="font"></fa-icon>
              {{ $t('common.rename') }}
            </b-dropdown-item-button>

            <b-dropdown-item href="#" class="step-action">
              <fa-icon name="trash"></fa-icon>
              {{ $t('common.delete') }}
            </b-dropdown-item>

            <b-dropdown-item href="#" class="step-action" @click.native="infoShow = !infoShow">
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

      <!-- Here's where we want our attachment area -->
      <b-collapse :visible="isOpen" id="collapse-exta-content">
        <Attachments :attachments="step.attachments"></Attachments>
      </b-collapse>
    </b-card>

    <!-- Here's the collapsable area with the steps, uses vue draggable https://github.com/SortableJS/Vue.Draggable -->
    <b-collapse :visible="isExpanded" id="collapse-steps">
      <draggable v-model="step.steps" :options="draggableOptions">
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
      </draggable>
    </b-collapse>

    <b-modal id="infomodal" class="ignore-drag" v-model="infoShow" title="Module Translations">
      <div class="info" align="center">
        <b-table striped hover
                   :items="items"
                   :fields="fields"
        >
          <template slot="actions" scope="item">
            <b-btn size="sm" @click="details(item.item)">Edit</b-btn>
          </template>
        </b-table>
      </div>
    </b-modal>

  </div>
</template>
<script>
import { Step } from '../../vuex/modules/structure/Step'
import ChevronToggle from '../ui/ChevronToggle'
import draggable from 'vuedraggable'
import Attachments from './Attachments'

export default {
  name: 'Step',
  components: {
    Attachments,
    ChevronToggle,
    draggable
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
      isOpen: false, // Is the Step itself open?
      isExpanded: false, // Are the child steps viewable?
      editTitle: false,
      modalShow: false,
      infoShow: false,
      draggableOptions: {
        filter: '.ignore-drag'
      },
      items: [
        {code: 'ESP', name: 'Spanish', translated: 47}
      ],
      fields: {
        code: {
          label: '',
          sortable: true
        },
        name: {
          label: 'Language',
          sortable: true
        },
        translated: {
          label: '% Translated',
          sortable: true
        },
        actions: {
          label: ''
        }
      }
    }
  },
  methods: {
    addStep () {
      this.isExpanded = true
      this.step.addStepAtIndex({index: this.index})
    },
    updateCritical (value) {
      this.step.critical = value.value
    },
    addSubStep () {
      // TODO: Logic for adding new substeps
    },
    removeStep () {
      // TODO: Logic for removing substeps
    },
    toggleStep (value) {
      this.isExpanded = value
    }
  }
}
</script>
