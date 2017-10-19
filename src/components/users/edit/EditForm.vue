<template>
  <b-card class="edit-card" :header="newUser ? $t('users.edit.newHeader') : $t('users.edit.editHeader')" v-if="user">
    <div>
      <v-gravatar v-if="!$v.user.email.$error" class="img-fluid rounded-circle m-t-10 m-b-10" :email="user.email" default-img="mm" :size="100"> </v-gravatar>
      <p>
        <small v-if="!$v.user.email.$error">{{ $t('common.gravatar') }}</small>
      </p>
      <b-form-group
          :label="$t('users.edit.firstName')"
          :feedback="fNameFeedback"
          :state="fNameState"
      >
        <b-form-input :state="fNameState" v-model.trim="user.firstName"></b-form-input>
      </b-form-group>
      <b-form-group
          :label="$t('users.edit.lastName')"
          :feedback="lNameFeedback"
          :state="lNameState"
      >
        <b-form-input :state="lNameState" v-model.trim="user.lastName"></b-form-input>
      </b-form-group>
      <b-form-group
          :label="$t('users.edit.email')"
          :feedback="emailFeedback"
          :state="emailState"
      >
        <b-form-input :state="emailState" v-model.trim="user.email" v-on:input="$v.user.email.$touch"></b-form-input>
      </b-form-group>

      <b-form-fieldset
        label="Role"
        :label-cols="3"
        :feedback="!$v.user.role.required ? $t('common.validations.required') : !$v.user.role.required ? $t('common.validations.required') : '' "
        :state="$v.user.role.$error ? 'warning' : ''">
        <b-form-select v-model="user.role" :options="roleOptions" class="mb-3">
        </b-form-select>
      </b-form-fieldset>

      <b-form-fieldset
        label="Status"
        :label-cols="3">
        <b-form-select v-model="user.isActive" :options="activeOptions" class="mb-3">
        </b-form-select>
      </b-form-fieldset>

    </div>
    <div slot="footer">
      <b-button @click="updateUser" variant="primary" :disabled='saving'><fa-icon name="refresh" spin  v-show="saving"></fa-icon> {{ $t('users.edit.save') }}</b-button>
      <b-button variant="danger" :disabled='saving' :to="{ name: 'users' }">{{ $t('common.cancel') }}</b-button>
      <small>{{ this.success }}</small>
    </div>
  </b-card>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { User } from '../../../vuex/modules/user/User'

export default {
  props: {
    theUser: {
      type: Object
    },
    newUser: {
      type: Boolean
    }
  },
  methods: {
    updateUser () {
      this.$v.user.$touch()
      if (!this.$v.user.$error) {
        this.saving = true
        let action = this.newUser ? 'CREATE_USER' : 'UPDATE_USER'
        this.$store.dispatch(action, this.user).then(() => {
          this.saving = false
          let date = new Date()
          this.success = this._i18n.t('common.saved') + ' ' + date.toDateString() + ' ' + date.toTimeString()
          this.$notifications.notify(
            {
              message: `<b>${this._i18n.t('common.saved')}</b><br />  ${this.newUser ? this._i18n.t('users.newSaved') : this._i18n.t('users.currentSaved')}`,
              icon: 'info',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'info'
            })
          if (this.newUser) {
            this.$router.push({ name: 'users' })
          }
        }).catch(() => {
          this.saving = false
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
    }
  },
  validations: {
    user: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      role: {
        required
      }
    }
  },
  mounted () {
    if (!this.newUser) {
      this.user = this.theUser
    }
  },
  data () {
    return {
      user: new User({}),
      selected: null,
      saving: false,
      test: '',
      success: '',
      activeOptions: [
        {text: 'Active', value: true},
        {text: 'Inactive', value: false}
      ]
    }
  },
  computed: {
    roleOptions () {
      let options = [{text: 'Please select a role', value: null, disabled: true}]
      this.$store.getters.allRoles.forEach((role) => {
        options.push({text: role.title, value: role.key})
      })

      return options
    },
    fNameFeedback () {
      return this.user.firstName.length > 0 ? '' : this.$t('common.validations.required')
    },
    fNameState () {
      return this.user.firstName.length > 0 ? 'valid' : 'invalid'
    },
    lNameFeedback () {
      return this.user.lastName.length > 0 ? '' : this.$t('common.validations.required')
    },
    lNameState () {
      return this.user.lastName.length > 0 ? 'valid' : 'invalid'
    },
    emailFeedback () {
      return !this.$v.user.email.required ? this.$t('common.validations.required') : !this.$v.user.email.email ? this.$t('common.validations.email') : ''
    },
    emailState () {
      return this.$v.user.email.$error ? 'invalid' : 'valid'
    }
  }
}
</script>
