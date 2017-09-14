<template>
  <div>
    <div>
      <h3 class="text-left directory-header mb-2">
        <span v-if="directoryNumbers.length === 0">{{ $t('projects.modules.module') }} </span>
        <span :class="'ml-' + directoryNumbers.length">
          <span>{{ getHierarchy }}</span>
        </span>
      </h3>
      <div class="row">
        <div class="col">
          <div class="row">
              <!-- Title -->
              <b-card class="col ml-3 m-2">
                <div class="center-card text-left">
                  <small>{{ getHierarchy }} {{ $t('translationWorkflow.translations.directoryTitle') }}</small>
                  <div v-if="directory.title && !editTitle" class="font-weight-bold title-wrapper" @click="editTitle = true">
                    <fa-icon name="check" class="text-success"></fa-icon>
                    {{ directory.title }}
                  </div>
                  <div v-else>
                    <span v-if="!editTitle" @click="editTitle = true" class="font-weight-bold title-wrapper">
                      <fa-icon name="flag" class="text-danger"></fa-icon> {{ $t('translationWorkflow.translations.noTitle') }}
                    </span>
                    <b-input-group v-else>
                      <b-input-group-addon class="white-icon">
                        <fa-icon :name="directory.title ? 'check' : 'flag'" :class="directory.title ? 'text-success' : 'text-danger'"></fa-icon>
                      </b-input-group-addon>
                      <b-form-input type="text" v-model="directory.title" :placeholder="$t('translationWorkflow.translations.titlePlaceholder')"></b-form-input>

                      <b-input-group-button slot="right">
                        <b-button @click="editTitle = false"><fa-icon name="check"></fa-icon></b-button>
                      </b-input-group-button>
                    </b-input-group>
                  </div>
                </div>
              </b-card>
              <b-card class="col mr-3 m-2">
                <b-input-group>
                  <b-input-group-addon class="white-icon">
                    <fa-icon :name="isTranslated ? 'check' : 'flag'" :class="isTranslated ? 'text-success' : 'text-danger'"></fa-icon>
                  </b-input-group-addon>
                  <b-form-input type="text" :placeholder="$t('translationWorkflow.translations.titlePlaceholder')"></b-form-input>
                </b-input-group>
              </b-card>
            </div>
            <div class="row">
              <!-- Content -->
              <b-card class="col ml-3 m-2 text-left">
                <small>{{ getHierarchy }} {{ $t('translationWorkflow.translations.directoryContent') }}</small>

                <pre v-if="directory.content" class="font-weight-bold">
                  <fa-icon name="check" class="text-success"></fa-icon>
                  {{ directory.content | truncate('30') }}
                </pre>
                <div v-else class="font-weight-bold title-wrapper">
                  <fa-icon name="flag" class="text-danger"></fa-icon> {{ $t('translationWorkflow.translations.noContent') }}
                </div>
              </b-card>
              <b-card class="col mr-3 m-2" v-b-tooltip.bottom="directory.content ? '' : 'No content to set'">
                  <b-button
                    variant="outline-primary"
                    class="w-100"
                    :disabled="directory.content ? false : true"
                    :to="{ name: 'content-translation', params: { content: directory.content }}">
                    Edit
                  </b-button>
              </b-card>
            </div>
            <div class="row">
              <!-- Attachements -->
              <b-card class="col ml-3 m-2 text-left">
                <fa-icon name="file"></fa-icon> Module Roadmap
              </b-card>
              <b-card class="col mr-3 m-2">
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
    </div>
    <DirectoryCard
      v-for="subdirectory in directory.directories"
      :key="directory.id" :directory="subdirectory"
      :directoryNumbers="getDirectories()">
    </DirectoryCard>
  </div>
</template>

<script>
import { Directory } from '../../vuex/modules/structure/Directory'

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
      editTitle: false
    }
  },
  methods: {
    getDirectories () {
      return [...this.directoryNumbers, this.directory.order]
    },
    isTranslated ({ isTitle }) {
      return true
    }
  },
  computed: {
    getHierarchy () {
      let hierarchy = ''
      this.directoryNumbers.forEach((number) => {
        hierarchy += number + '.'
      })
      hierarchy += this.directory.order
      return hierarchy
    }
  }
}
</script>
