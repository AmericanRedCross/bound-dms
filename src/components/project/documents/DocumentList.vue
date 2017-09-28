<template>
  <div>
    <b-card class="mb-3">
      <div class="row">
        <div class="col">
          <b-button :to="{name: 'document-edit'}" variant="primary"><fa-icon name="plus"></fa-icon> {{ $t('projects.documents.create') }}</b-button>
        </div>
      </div>
    </b-card>
    <b-card :title="$t('projects.documents.title')" class="mb-3">
      <div class="row">
        <div class="col">
          <b-table striped hover
                  :items="fileData"
                  :fields="headers"
                  :per-page="perPage"
                  :show-empty="true"
                  :empty-text="$t('files.emptystate')"
                  :filter="filter"
                  id="files-table"
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
                <b-button v-for="translation in item.value" variant="primary" :key="translation.id" @click="editContent(translation)">{{ translation.language }}</b-button>
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
  methods: {
    showSuccess (file) {
      setTimeout(() => {
        this.$refs.dropzone.removeFile(file)
      }, 1200)

      this.fetchAllFiles()
    },
    fetchAllFiles () {
      this.$store.dispatch('GET_ALL_DOCUMENTS', {
        page: this.currentPage,
        limit: this.perPage,
        projectId: parseInt(this.$route.params.id)
      }).then(() => {
        let data = this.getAllDocuments()
        this.fileData = data.documents
        this.totalFiles = data.total
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
    },
    editContent (translation) {

    }
  },
  beforeMount () {
    this.fetchAllFiles()
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
      headers: {
        _id: {
          label: 'ID',
          sortable: false
        },
        title: {
          label: 'Title',
          sortable: false
        },
        _createdAt: {
          label: 'Created at',
          sortable: false
        },
        _createdBy: {
          label: 'Created by',
          sortable: false
        },
        _translations: {
          label: 'Translations',
          sortable: false
        }
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
