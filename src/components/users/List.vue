<template>
  <div class="users" align="center">
    <h1 id="changeText">{{ $t('users.header') }}</h1>
      <div class="row justify-content-md-center">
        <div class="col">
          <b-card id="userList" :header="$t('users.list')">
            <!-- Main table element -->
            <b-table striped hover
                     :items="users.users"
                     :fields="headers"
            >
            <template slot="picture" scope="user">
              <v-gravatar class="user-icon" :email="user.item.email" default-img="mm" :size="80"> </v-gravatar>
            </template>
              <template slot="name" scope="user">
                {{ user.item.firstname }} {{ user.item.lastname }}
              </template>
              <template slot="actions" scope="item">
                <b-btn size="sm">Edit</b-btn>
                <b-btn size="sm">Delete</b-btn>
              </template>
            </b-table>
          </b-card>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
        name: {
          label: 'Name',
          sortable: true
        },
        email: {
          label: 'Email',
          sortable: true
        },
        actions: {
          label: 'Actions'
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('GET_USERS')
  },
  methods: {

  },
  computed: mapState([
    'users'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .user-icon {
    border-radius: 50%;
    height: 40px;
  }
</style>
