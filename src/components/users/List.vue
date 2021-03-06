<template>
  <div class="users">
    <div class="row justify-content-md-center">
      <div class="col">
        <b-card id="userList">
          <div slot="header">
            <p>
              {{ $t('users.header') }}
              <b-button variant="primary" :to="{ name: 'user-new' }" class="float-right"><fa-icon name="plus" class="mr-1"></fa-icon> {{ $t('common.add') }}</b-button>
            </p>
          </div>

          <b-form-input v-model="filter" :placeholder="$t('users.listview.type')" id="userSearch" class="mb-2"></b-form-input>
          <!-- Main table element -->
          <b-table striped hover
                  :items="users.users"
                  :fields="headers"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :filter="filterFunction"
                  @filtered="onFiltered"
                  id="userTable"
                  class="table-responsive"
          >
          <template slot="picture" scope="user">
            <v-gravatar class="user-icon" :email="user.item.email" default-img="mm" :size="80"> </v-gravatar>
          </template>
          <template slot="actions" scope="user">
            <b-btn size="sm" variant="outline-primary" :to="{ name: 'user-profile', params: { id: user.item.id }}" class="m-t-5"><fa-icon name="user" label="View"></fa-icon> {{ $t('common.view') }}</b-btn>
            <b-btn size="sm" variant="outline-primary" :to="{ name: 'user-edit', params: { id: user.item.id }}" class="m-t-5"><fa-icon name="edit" label="Edit"></fa-icon> {{ $t('users.listview.edit') }}</b-btn>
            <b-btn size="sm"
              variant="outline-danger"
              class="m-t-5"
              @click="deleteClick"
              :data-id="user.item.id"
              v-if="$auth.user().id !== user.item.id">
                <fa-icon name="trash" label="Delete"></fa-icon> {{ $t('users.listview.delete') }}
            </b-btn>
          </template>
          </b-table>
          <div class="row justify-content-center" slot="footer">
            <b-pagination size="md" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" />
          </div>
        </b-card>
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
        picture: {
          label: ''
        },
        id: {
          label: 'ID',
          sortable: true
        },
        firstName: {
          label: 'First name',
          sortable: true
        },
        lastName: {
          label: 'Last name',
          sortable: true
        },
        role: {
          label: 'Role'
        },
        actions: {
          label: 'Actions'
        }
      },
      perPage: 10,
      currentPage: 1,
      totalRows: this.users ? this.users.length : 0,
      filter: null
    }
  },
  mounted () {
    this.$store.dispatch('GET_USERS')
    .catch(() => {
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
  methods: {
    deleteClick (e) {
      // Call the swal confirm dialog
      this.$swal({
        title: this._i18n.t('common.areYouSure'),
        text: this._i18n.t('common.noRevert'),
        type: 'warning',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonColor: '#6200ff',
        cancelButtonColor: '#f85e78',
        confirmButtonText: this._i18n.t('common.deleteIt'),
        // Pre confirm it. Used for async requests. Close the dialoag when this is finished
        preConfirm: () => {
          return new Promise((resolve, reject) => {
            let user = this.getUserById(parseInt(e.target.dataset.id, 10))
            if (user) {
              // If the user exists then call the delete
              this.$store.dispatch('DELETE_USER', parseInt(e.target.dataset.id, 10)).then(resolve).catch(() => {
                this.$notifications.notify(
                  {
                    message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
                    icon: 'exclamation-triangle',
                    horizontalAlign: 'right',
                    verticalAlign: 'bottom',
                    type: 'danger'
                  })
              })
            } else {
              reject(this._i18n.t('users.couldNotFind'))
            }
          })
        },
        allowOutsideClick: false
      }).then(() => {
        this.$swal({
          type: 'success',
          confirmButtonColor: '#6200ff',
          title: this._i18n.t('common.deleted')
        })
      }).catch(this.$swal.noop)
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    rowClicked (user) {
      this.$router.push({ name: 'user-profile', params: { id: user.id } })
    },
    filterFunction (user) {
      if (this.filter === null) {
        return true
      }
      let filter = this.filter.toLowerCase()
      if (user.firstName.toLowerCase().includes(filter) || user.lastName.toLowerCase().includes(filter)) {
        return true
      }
      return false
    }
  },
  computed: {
    ...mapGetters([
      'getUserById'
    ]),
    ...mapState([
      'users'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .user-icon {
    border-radius: 50%;
    height: 40px;
  }

  tr{
    cursor: hand;
  }
</style>
