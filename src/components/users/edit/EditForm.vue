<template>
  <b-card class="edit-card" :header="newUser ? $t('users.edit.newHeader') : $t('users.edit.editHeader')">
    <div>
      <div class="form-group">
        <b-tooltip :content="$t('common.gravatar')" placement="right" :show="showToolTip">
          <a href="https://gravatar.com" target="_blank"><v-gravatar class="img-fluid user-icon m-t-10 m-b-10" :email="user.email" default-img="mm" :size="100"> </v-gravatar></a>
        </b-tooltip>
        <b-form-fieldset
          :label="$t('users.edit.firstName')"
          :label-size="1"
          :feedback="!$v.user.firstName.required ? $t('common.validations.required') : '' "
          :state="$v.user.firstName.$error ? 'warning' : ''"
        >
          <b-input-group>
            <b-input-group-addon slot="left">
              <fa-icon name="user-o"></fa-icon>
            </b-input-group-addon>
            <b-form-input
              v-model.trim="user.firstName"
              type="text"
              id="firstname-input"
              v-on:input="$v.user.firstName.$touch">
            </b-form-input>
          </b-input-group>

        </b-form-fieldset>
      </div>

      <div class="form-group">
        <b-form-fieldset
          :label="$t('users.edit.lastName')"
          :label-size="1"
          :feedback="!$v.user.lastName.required ? $t('common.validations.required') : '' "
          :state="$v.user.lastName.$error ? 'warning' : ''"
        >
          <b-input-group>
            <b-input-group-addon slot="left">
              <fa-icon name="user-o"></fa-icon>
            </b-input-group-addon>
            <b-form-input
              v-model.trim="user.lastName"
              type="text"
              id="lastname-input"
              v-on:input="$v.user.lastName.$touch">
            </b-form-input>
          </b-input-group>
        </b-form-fieldset>
      </div>

      <div class="form-group">
        <b-form-fieldset
          :label="$t('users.edit.email')"
          :label-size="1"
          :feedback="!$v.user.email.required ? $t('common.validations.required') : !$v.user.email.email ? $t('common.validations.email') : '' "
          :state="$v.user.email.$error ? 'warning' : ''"
        >
          <b-input-group>
            <b-input-group-addon slot="left">
              <fa-icon name="at"></fa-icon>
            </b-input-group-addon>
            <b-form-input
              v-model.trim="user.email"
              type="email"
              id="email-input"
              v-on:input="$v.user.email.$touch">
            </b-form-input>
          </b-input-group>
        </b-form-fieldset>
      </div>
    </div>
    <div slot="footer">
      <b-button @click.native="updateUser" variant="primary" :disabled='saving'>{{ $t('users.edit.save') }}</b-button>
      <b-button variant="warning" :disabled='saving' :to="{ name: 'users' }">{{ $t('common.cancel') }}</b-button>
      <span v-show="saving" class="m-t-5" style="inline-block">
        <fa-icon name="refresh" spin></fa-icon>
      </span>
      <small>{{ this.success }}</small>
    </div>
  </b-card>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  props: {
    user: {
      type: Object
    },
    newUser: {
      type: Boolean
    }
  },
  mounted () {
    this.showToolTip = true
  },
  methods: {
    updateUser () {
      this.$v.user.$touch()
      if (!this.$v.user.firstName.$error && !this.$v.user.lastName.$error && !this.$v.user.email.$error) {
        this.saving = true
        let action = this.newUser ? 'CREATE_USER' : 'UPDATE_USER'
        this.$store.dispatch(action, this.user).then(() => {
          this.saving = false
          let date = new Date()
          this.success = this._i18n.t('common.saved') + ' ' + date.toDateString() + ' ' + date.toTimeString()
          if (this.newUser) {
            this.$router.push({ name: 'users' })
          }
        }).catch(() => {
          this.saving = false
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
      }
    }
  },
  data () {
    return {
      selected: null,
      saving: false,
      success: '',
      showToolTip: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .user-icon {
    border-radius: 50%;
  }
</style>
