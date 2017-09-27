<template>
  <div>
    <b-card class="mb-3" v-if="!picker">
      <div class="row">
        <div class="col">
          <b-button :to="{name: 'document-edit'}" variant="primary"><fa-icon name="plus"></fa-icon> {{ $t('projects.documents.create') }}</b-button>
        </div>
      </div>
    </b-card>
    <b-card :title="$t('projects.documents.title')" class="mb-3">
      <div class="row">
        <div class="col">
          <b-table hover
                  :items="fileData"
                  :fields="headers()"
                  :per-page="perPage"
                  :show-empty="true"
                  :empty-text="$t('files.emptystate')"
                  :filter="filter"
                  id="files-table"
                  @row-clicked="rowSelected"
          >
            <template slot="title" scope="item">
              <span v-if="item.item._translations">{{ item.item._translations[0].title }}</span>
            </template>
            <template slot="_createdBy" scope="item">
              {{ item.value.firstname }} {{ item.value.lastname }}
            </template>

            <template slot="_createdAt" scope="item">
              {{ item.value | formatDate }}
            </template>

            <template slot="_translations" scope="item">
              <b-button-group>
                <b-button v-for="translation in item.value" variant="primary" :key="translation.id" @click.stop="editContent(translation)">{{ translation.language }}</b-button>
              </b-button-group>
            </template>

          </b-table>
        </div>
      </div>
      <b-pagination size="md" align="center" :total-rows="totalFiles" v-model="currentPage" :per-page="perPage"></b-pagination>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'document-list',
  props: {
    picker: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object
    }
  },
  methods: {
    showSuccess (file) {
      setTimeout(() => {
        this.$refs.dropzone.removeFile(file)
      }, 1200)

      this.fetchAllFiles()
    },
    rowSelected (doc) {
      // Only use if we're picking
      if (this.picker) {
        this.fileData.forEach((file) => {
          if (file.id === doc._id) {
            file.rowVariant = 'info'
          } else {
            file.rowVariant = ''
          }
        })
        this.$emit('input', doc)
      }
    },
    fetchAllFiles () {
      this.$store.dispatch('GET_ALL_DOCUMENTS', {
        page: this.currentPage,
        limit: this.perPage,
        projectId: parseInt(this.$route.params.id)
      }).then(this.parseFiles).catch(() => {
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
    parseFiles () {
      let data = this.getAllDocuments()
      this.fileData = data.documents
      this.totalFiles = data.total
    },
    editContent (translation) {

    }
  },
  mounted () {
    // As this could be loaded multiple times as a picker we don't fetch files but only parse
    if (!this.picker) {
      this.fetchAllFiles()
    } else {
      this.parseFiles()
    }
  },
  computed: {
    ...mapGetters([
      'getAllDocuments'
    ])
  },
  watch: {
    currentPage: {
      handler: function (val, oldVal) {
        if (val !== oldVal) {
          this.fetchAllFiles()
        }
      },
      deep: true
    }
  },
  data () {
    return {
      headers () {
        let headers = {
          _id: {
            label: 'ID',
            sortable: true
          },
          title: {
            label: 'Title',
            sortable: true
          },
          _createdAt: {
            label: 'Created at',
            sortable: true
          }
        }
        if (!this.picker) {
          headers._id = {
            label: 'ID',
            sortable: true
          }
          headers._createdBy = {
            label: 'Created by',
            sortable: true
          }
          headers._translations = {
            label: 'Translations',
            sortable: false
          }
        }

        return headers
      },
      fileData: [],
      totalFiles: 0,
      perPage: 10,
      currentPage: 1,
      filter: null
    }
  }
}
</script>
