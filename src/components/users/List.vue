<template>
  <div class="users">
    <h1 id="changeText" class="text-center">{{ $t('users.header') }}</h1>
      <div class="row justify-content-md-center">
        <div class="col">
          <b-card id="userList" :header="$t('users.list')">
            <b-form-input v-model="filter" placeholder="Type to Search" id="userSearch"></b-form-input>
            <!-- Main table element -->
            <b-table striped hover
                    :items="users.users"
                    :fields="headers"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :filter="filter"
                    id="userTable"
            >
            <template slot="firstname" scope="user">
              {{ user.item.firstName }}
            </template>
            <template slot="picture" scope="user">
              <v-gravatar class="user-icon" :email="user.item.email" default-img="mm" :size="80"> </v-gravatar>
            </template>
            <template slot="actions" scope="user">
              <b-btn size="sm" variant="primary" :to="{ name: 'user-edit', params: { id: user.item.id }}" class="m-t-5"><fa-icon name="edit" label="Edit"></fa-icon> Edit</b-btn>
              <b-btn size="sm" variant="danger" class="m-t-5" @click.native="deleteClick" :data-id="user.item.id"><fa-icon name="trash" label="Delete"></fa-icon> Delete</b-btn>
            </template>
            </b-table>
            <div v-if="users.users.length > 10" class="row justify-content-center" slot="footer">
              <b-pagination size="md" :total-rows="users.users.length" :per-page="perPage" v-model="currentPage" />
            </div>
            <div slot="footer">
              <b-button variant="primary" :to="{ name: 'user-new' }">{{ $t('common.add') }}</b-button>
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
        firstname: {
          label: 'First name',
          sortable: true
        },
        lastName: {
          label: 'Last name',
          sortable: true
        },
        email: {
          label: 'Email',
          sortable: true
        },
        actions: {
          label: 'Actions'
        }
      },
      perPage: 10,
      currentPage: 1,
      filter: null
    }
  },
  mounted () {
    this.$store.dispatch('GET_USERS')
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
        // Pre confirm it. Used for async requests. Close the dialoag when this is finished
        preConfirm: () => {
          return new Promise((resolve, reject) => {
            console.log(e.target)
            let user = this.getUserById(parseInt(e.target.dataset.id, 10))
            if (user) {
              // If the user exists then call the delete
              this.$store.dispatch('DELETE_USER', parseInt(e.target.dataset.id, 10)).then(resolve)
            } else {
              reject(this._i18n.t('users.couldNotFind'))
            }
          })
        },
        allowOutsideClick: false
      }).then(() => {
        this.$swal({
          type: 'success',
          title: this._i18n.t('common.deleted')
        })
      })
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
</style>
