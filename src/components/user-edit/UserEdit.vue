<template>
  <div class="user-edit" align="center">
    <div class="row">
      <div class="col-md-6">
        <b-card class="edit-card" :header="$t('users.edit.editHeader')">
          <div>
            <div>
              {{ $t('users.edit.user') }} {{ user.id }}
            </div>
            <b-form-fieldset
              :label="$t('users.edit.firstName')"
              :label-size="1"
              >

              <b-form-input v-model="user.firstname" :class="{'name': true, 'input is-danger': errors.has('name')}" v-validate="'required'" name="name" type="text" id="name-input"></b-form-input>
              <span v-show="errors.has('name')" class="help is-danger" id="name-error">{{ errors.first('name') }}</span>

            </b-form-fieldset>
            <b-form-fieldset
              :label="$t('users.edit.lastName')"
              :label-size="1"
              >

              <b-form-input v-model="user.lastname" :class="{'lastname': true, 'input is-danger': errors.has('lastname')}" v-validate="'required'" name="lastname" type="text" id="lastname-input"></b-form-input>
              <span v-show="errors.has('lastname')" class="help is-danger" id="lastname-error">{{ errors.first('lastname') }}</span>

            </b-form-fieldset>
            <b-form-fieldset
              :label="$t('users.edit.email')"
              :label-size="1"
              >

              <b-form-input v-model="user.email" :class="{'email': true, 'input is-danger': errors.has('email')}" v-validate="'required|email'" name="email" type="email" id="email-input"></b-form-input>
              <span v-show="errors.has('email')" class="help is-danger" id="email-error">{{ errors.first('email') }}</span>

            </b-form-fieldset>
            <div>
              <label>{{ $t('users.edit.role') }}</label>
              <b-form-select v-model="selected" name="roles" :options="options" class="mb-3" v-validate="'in:admin,translator,content_creator'">
              </b-form-select>
              <span v-show="errors.has('roles')" class="help is-danger" id="role-not-selected">{{ errors.first('roles')}}</span>
            </div>

            <b-button @click.native="updateUser">{{ $t('users.edit.save') }}</b-button>
          </div>
        </b-card>
      </div>
      <div class="col-md-6">
        <b-card class="password-card" align="center" :header="$t('users.edit.changePass')">
          <b-form-fieldset
              :label="$t('users.edit.currentPass')"
              :label-size="1"
              >

            <b-form-input name="currentPassword" type="password" v-model="currentPassword" id="current-password-input"></b-form-input>
            <span v-show="errors.has('currentPassword')" class="help is-danger" id="current-password-error">{{ errors.first('currentPassword') }}</span>

          </b-form-fieldset>
          <b-form-fieldset
              :label="$t('users.edit.newPass')"
              :label-size="1"
              >

            <b-form-input v-validate= "'confirmed:confirmResetPassword'" name="newPassword" type="password" v-model="resetPassword" id="new-password-input" data-vv-as="password"></b-form-input>
            <span v-show="errors.has('newPassword')" class="help is-danger" id="new-password-error">{{ errors.first('newPassword') }}</span>

          </b-form-fieldset>
          <b-form-fieldset
              :label="$t('users.edit.confirmPass')"
              :label-size="1"
              >

            <b-form-input name="confirmResetPassword" type="password" v-model="confirmResetPassword" id="confirm-new-password-input"></b-form-input>
            <span v-show="errors.has('confirmResetPassword')" class="help is-danger" id="new-password-error">{{ errors.first('confirmResetPassword') }}</span>

          </b-form-fieldset>
          <b-button @click.native="authenticate">{{ $t('users.edit.save') }}</b-button>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: '',
  data () {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: ''
      },
      msg: 'Edit User',
      currentPassword: '',
      resetPassword: '',
      confirmResetPassword: '',
      selected: null,
      options: [
        {
          // this._i18n.$t('useredit.admin')
          text: this._i18n.t('users.edit.admin'),
          value: 'admin'
        }, {
          text: this._i18n.t('users.edit.translate'),
          value: 'translator'
        }, {
          text: this._i18n.t('users.edit.content'),
          value: 'content_creator'
        }]
    }
  },
  methods: {
    updateUser () {
      if (this.errors.has('name') || this.errors.has('lastname') || this.errors.has('email')) {

      } else {
        this.$store.dispatch('UPDATE_USER', this.user)
      }
    }
  },
  beforeMount () {
    // Call vuex to retrieve the current user from the backend. This returns a promise so we know when it's finished.
    this.$store.dispatch('GET_USER', this.$route.params.id).then(() => {
      // Get the user that was just retrieved (the getUserById getter is from the vuex getter, there's a special helper
      // called 'mapGetters' in the computed section of this component that gets the user from the vuex state.)
      let user = this.getUserById(parseInt(this.$route.params.id), 10)
      // Set the user so the component can see it
      this.user = user
    })
  },
  computed: {
    ...mapGetters([
      'getUserById'
    ]),
    feedback () {
      return this.name.length ? '' : 'Please enter something'
    },
    state () {
      return this.name.length ? 'success' : 'warning'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .card {
    width: 30rem;
  }
  .input.is-danger {
        border-color: #ff3860;
    }
</style>
