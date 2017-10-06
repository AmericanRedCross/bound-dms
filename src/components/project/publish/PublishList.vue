<template>
  <div>
    <b-card :title="$t('projects.publish.history')" class="mb-3">
      <div class="row">
        <div class="col">
          <b-table hover
                  :items="publish.publishes"
                  :fields="headers()"
                  :per-page="perPage"
                  :show-empty="true"
                  :empty-text="$t('projects.publish.emptystate')"
                  id="publish-table"
          >
            <template slot="createdBy" scope="item">
               {{ item.item.createdBy ? [item.item.createdBy.firstname, item.item.createdBy.lastname].join(' ') : 'System' }}
            </template>
            <template slot="createdAt" scope="item">
              {{ item.value | formatDate }}
            </template>
            <template slot="download" scope="item">
              <b-button href=""><fa-icon name="download"></fa-icon></b-button>
            </template>
          </b-table>
        </div>
      </div>
      <b-pagination size="md" align="center" :total-rows="total" v-model="currentPage" :per-page="perPage" :limit="10"></b-pagination>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'publish-list',
  props: {
    projectId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      headers () {
        return {
          id: {
            label: this._i18n.t('common.tableFields.id'),
            sortable: true
          },
          language: {
            label: this._i18n.t('projects.publish.fields.language'),
            sortable: true
          },
          type: {
            label: this._i18n.t('projects.publish.fields.type'),
            sortable: true
          },
          createdBy: {
            label: this._i18n.t('common.tableFields.createdBy'),
            sortable: true
          },
          createdAt: {
            label: this._i18n.t('common.tableFields.createdAt'),
            sortable: true
          },
          download: {
            label: this._i18n.t('projects.publish.fields.download'),
            sortable: false
          }
        }
      },
      publishData: [],
      total: 0,
      perPage: 10,
      currentPage: 1
    }
  },
  methods: {
    fetchAllPublishes () {
      this.$store.dispatch('GET_ALL_PUBLISHES', {
        page: this.currentPage,
        limit: this.perPage,
        projectId: this.projectId
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
  mounted () {
    this.fetchAllPublishes()
  },
  computed: {
    ...mapState([
      'publish'
    ])
  },
  watch: {
    currentPage: {
      handler: function (val, oldVal) {
        if (val !== oldVal) {
          this.fetchAllPublishes()
        }
      },
      deep: true
    }
  }
}
</script>