<template>
  <div class="directory">
    <!-- Chevron toggle for expanding sub items (See #collapse-directories for the actual collapsable area) -->
    <chevron-toggle :value="isExpanded" v-on:change="toggleDirectory" v-if="directory.directories.length" class="chevron mt-3"></chevron-toggle>
    <b-card :class="{ noToggle: !directory.directories.length }">

      <!-- Module Header (The bit that's not hidden) -->
      <div class="d-flex align-items-baseline flex-wrap content">
        <h4><span v-if="isModule">{{ $t('projects.modules.module') }}</span> <span v-for="number in directoryNumbers">{{ number + 1}}.</span><span>{{ directory.order + 1}}</span></h4>

        <i v-if="!editTitle" class="ml-2">{{ directory.title }}</i>
        <span class="title-input ml-2" v-else>
          <b-input-group>
            <b-form-input v-model="directory.title"
                    type="text"
                    placeholder="Enter a title">
            </b-form-input>

            <!-- Attach Right button -->
            <b-input-group-button slot="right">
              <b-button @click="editTitle = false"><fa-icon name="check"></fa-icon></b-button>
            </b-input-group-button>

          </b-input-group>
        </span>

        <!-- Push this stuff right-->
        <div class="ml-auto">
          <b-badge variant="danger" :visible="untranslated">Untranslated</b-badge>

          <fa-icon v-if="directory.critical" scale="2" name="star" class="critical-icon"></fa-icon>

          <b-button @click="isOpen = !isOpen"><fa-icon name="file-text"></fa-icon></b-button>

          <!-- https://bootstrap-vue.js.org/docs/components/dropdown - alignment is not working at the moment -->
          <b-dropdown right no-flip class="m-md-2 directory-actions ignore-drag">
            <fa-icon name="cog" slot="text"></fa-icon>

            <b-dropdown-item-button @click="editTitle = true" class="directory-action">
              <fa-icon name="font"></fa-icon>
              {{ $t('common.rename') }}
            </b-dropdown-item-button>

            <b-dropdown-item href="#" class="directory-action" @click="infoShow = !infoShow">
              <fa-icon name="info-circle"></fa-icon>
              {{ $t('common.info') }}
            </b-dropdown-item>

            <b-dropdown-item href="#" class="directory-action" @click="selectDocShow = !selectDocShow" :disabled="directory.id === null">
              <fa-icon name="plus-circle"></fa-icon>
              Select doc
            </b-dropdown-item>

            <b-dropdown-item-button v-if="isShown" @click="addDirectory" class="directory-action" :disabled="directory.id === null">
              <fa-icon name="plus-circle"></fa-icon>
              {{ $t('projects.modules.addDirectory') }}
            </b-dropdown-item-button>

            <b-dropdown-item-button v-else-if="$auth.check(['admin', 'editor'])" @click="addDirectory" class="directory-action" :disabled="directory.id === null">
              <fa-icon name="plus-circle"></fa-icon>
              {{ $t('projects.modules.addSubDirectory') }}
            </b-dropdown-item-button>

            <b-dropdown-divider v-if="$auth.check(['admin'])"></b-dropdown-divider>

            <b-dropdown-header>
              <toggle-button
                v-if="$auth.check(['admin'])"
                :value="directory.critical"
                :width="150"
                :labels="{checked: $t('projects.modules.criticalPathOn'), unchecked: $t('projects.modules.criticalPathOff')}"
                @change="updateCritical"
                />
            </b-dropdown-header>

            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item-btn href="#" class="directory-action" @click="removeDirectory">
              <fa-icon name="trash"></fa-icon>
              {{ $t('common.delete') }}
            </b-dropdown-item-btn>

          </b-dropdown>
        </div>
      </div>

      <!-- Here's where we want our attachment area -->
      <b-collapse :visible="isOpen" id="collapse-exta-content">
        <Attachments :attachments="directory.attachments"></Attachments>
      </b-collapse>
    </b-card>

    <!-- Here's the collapsable area with the directories, uses vue draggable https://github.com/SortableJS/Vue.Draggable -->
    <b-collapse :visible="isExpanded" id="collapse-directories">
      <draggable v-model="directory.directories" @update="updateDraggable" :options="draggableOptions">
        <transition-group name="directory-list">
          <!-- We need to use a key here so vue can keep track of the directories' identities https://vuejs.org/v2/guide/list.html#key -->
          <Directory
            v-for="(subdirectory, directoryIndex) in directory.directories"
            :key="directoryIndex"
            :directory="subdirectory"
            :directoryNumbers="getDirectories()"
            :index="index"
            class="sub-directory ml-5 directory-list-item">
          </Directory>
        </transition-group>
      </draggable>
    </b-collapse>

    <b-modal :lazy="true" id="infomodal" class="ignore-drag" v-model="infoShow" title="Module Translations">
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

    <b-modal
      :lazy="true"
      id="infomodal"
      class="ignore-drag"
      v-model="selectDocShow"
      title="Select Document"
      size="lg"
      @cancel="selectedDocument = null"
      @ok="linkDocument">
      <document-list v-if='getAllDocuments().documents.length' v-model="selectedDocument" :picker="true"></document-list>
      <p v-else>
        {{ $t('common.loading') }}
      </p>
    </b-modal>

  </div>
</template>
<script>
import { Directory } from '../../vuex/modules/structure/Directory'
import { mapGetters } from 'vuex'
import ChevronToggle from '../ui/ChevronToggle'
import DocumentList from '../project/documents/DocumentList'
import draggable from 'vuedraggable'
import Attachments from './Attachments'

export default {
  name: 'Directory',
  components: {
    Attachments,
    ChevronToggle,
    DocumentList,
    draggable
  },
  props: {
    directory: {
      type: Object,
      default: new Directory({})
    },
    directoryNumbers: {
      type: Array,
      default: () => [] // Use a function to return an array/object https://github.com/vuejs/vue/issues/1032
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
      isOpen: false, // Is the Directory itself open?
      isExpanded: false, // Are the child directories viewable?
      editTitle: false,
      infoShow: false,
      selectDocShow: false,
      untranslated: true,
      selectedDocument: null,
      draggableOptions: {
        filter: '.ignore-drag',
        animation: 150
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
    addDirectory () {
      if (this.directory.id !== null) {
        this.isExpanded = true
        this.directory.addDirectoryAtIndex({index: this.index})
        this.$store.dispatch('SET_FLAT_STRUCTURE')
      }
    },
    updateCritical (value) {
      this.directory.critical = value.value
    },
    updateDraggable (e) {
      let newIndex = e.newIndex
      let oldIndex = e.oldIndex

      this.$store.dispatch('UPDATE_ORDER', {newIndex, oldIndex, directoryNumbers: this.getDirectories()})
    },
    linkDocument () {
      if (this.selectedDocument) {
        console.log(this.selectedDocument)
        this.$store.dispatch('LINK_DIRECTORY', { directoryId: this.directory.id, documentId: this.selectedDocument._id }).then(() => {
          this.$notifications.notify(
            {
              message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')}`,
              icon: 'info',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'info'
            })
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
      }
    },
    removeDirectory () {
      // this.directory.removeDirectoryById(this.directory.id)
      if (this.$auth.check(['admin', 'editor'])) {
        this.$swal({
          title: this._i18n.t('common.areYouSure'),
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this._i18n.t('common.deleteIt'),
          allowOutsideClick: false
        }).then(() => {
          this.$store.dispatch('REMOVE_DIRECTORY', {directoryNumbers: this.directoryNumbers, directory: this.directory})
          this.isExpanded = false
        })
      } else {
        this.$swal({
          title: this._i18n.t('common.oops'),
          text: this._i18n.t('common.noPermission'),
          type: 'info'
        })
      }
    },
    toggleDirectory (value) {
      this.isExpanded = value
    },
    getDirectories () {
      return [...this.directoryNumbers, this.directory.order]
    }
  },
  computed: {
    isShown () {
      if (this.isModule && this.$auth.check(['admin', 'editor'])) {
        return true
      }
      return false
    },
    ...mapGetters([
      'getAllDocuments'
    ])
  }
}
</script>
