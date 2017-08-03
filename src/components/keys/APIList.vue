<template>
  <div class="key-list">
    <div class="row justify-content-md-center">
      <div class="col">
        <b-card header="API Key List">
          <b-button variant="success" v-b-modal.addkey>Add API Key</b-button>
          <br />
          <br />
          <b-form-input v-model="filter" :placeholder="$t('users.listview.type')" id="userSearch"></b-form-input>
          <!-- Main table element -->
          <b-table striped hover
                  :items="projects.projects"
                  :fields="headers"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filter"
                  id="userTable"
          >
          <template slot="name" scope="item">
            {{ item.value }}
          </template>

          <template slot="details" scope="item">
            <b-button v-b-modal.viewkey variant="primary"><fa-icon name="key" label="Key"></fa-icon> View Key</b-button>
            <b-button variant="danger" @click.native="deleteClick"><fa-icon name="trash" label="Delete"></fa-icon> Delete</b-button>
          </template>
          </b-table>
        </b-card>

        <b-modal id="addkey" title="Add an API Key">
          <b-form>
            <h5>Project:</h5>
            <b-form-select v-model="selected" :options="getNames" class="mb-3">
            </b-form-select>
            <b-form-input
                  type="text"
                  placeholder="API Key"
            ></b-form-input>
          </b-form>
        </b-modal>

        <b-modal id="viewkey" title="View API Key">
          <b-form>
            <h5>Project:</h5>
            <b-form-input
                  type="text"
                  placeholder="API Key"
                  readonly
            ></b-form-input>
          </b-form>
        </b-modal>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      headers: {
        name: {
          label: 'Project Name',
          sortable: true
        },
        key: {
          label: 'API Key'
        },
        details: {
          label: ''
        }
      },
      perPage: 10,
      currentPage: 1,
      filter: null,
      selected: null
    }
  },
  mounted () {
    this.$store.dispatch('GET_PROJECTS')
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ]),
    ...mapState([
      'projects'
    ]),
    getNames () {
      let names = []
      this.projects.projects.forEach((project) => {
        names.push(project.name)
      })
      return names
    }
  },
  methods: {
    deleteClick (e) {
      // Call the swal confirm dialog
      this.$swal({
        title: this._i18n.t('common.areYouSure'),
        text: this._i18n.t('common.noRevert'),
        type: 'warning',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this._i18n.t('common.deleteIt'),
        allowOutsideClick: false
      }).then(() => {
        this.$swal({
          type: 'success',
          title: this._i18n.t('common.deleted')
        })
      })
    }
  }
}
</script>
