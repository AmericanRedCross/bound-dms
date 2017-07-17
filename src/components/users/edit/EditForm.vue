<template>
  <div class="edit-form col-lg-6">
    <b-card class="edit-card" :header="$t('users.edit.editHeader')">
      <div>
        <div class="form-group">
          <b-form-fieldset
            :label="$t('users.edit.firstName')"
            :label-size="1"
            :feedback="!$v.user.firstname.required ? $t('common.validations.required') : '' "
            :state="$v.user.firstname.$error ? 'warning' : ''"
          >
            <b-input-group>
              <b-input-group-addon slot="left">
                <fa-icon name="user-o"></fa-icon>
              </b-input-group-addon>
              <b-form-input
                v-model.trim="user.firstname"
                type="text"
                id="firstname-input"
                v-on:input="$v.user.firstname.$touch">
              </b-form-input>
            </b-input-group>

          </b-form-fieldset>
        </div>

        <div class="form-group">
          <b-form-fieldset
            :label="$t('users.edit.lastName')"
            :label-size="1"
            :feedback="!$v.user.lastname.required ? $t('common.validations.required') : '' "
            :state="$v.user.lastname.$error ? 'warning' : ''"
          >
            <b-input-group>
              <b-input-group-addon slot="left">
                <fa-icon name="user-o"></fa-icon>
              </b-input-group-addon>
              <b-form-input
                v-model.trim="user.lastname"
                type="text"
                id="lastname-input"
                v-on:input="$v.user.lastname.$touch">
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
        <span v-show="saving" class="m-t-5" style="inline-block">
          <fa-icon name="refresh" spin></fa-icon>
        </span>
        <small>{{ this.success }}</small>
      </div>
    </b-card>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { User } from '../../../vuex/modules/user/User'

export default {
  props: {
    user: {
      type: User
    }
  },
  methods: {
    updateUser () {
      if (!this.$v.user.firstname.$error && !this.$v.user.lastname.$error && !this.$v.user.email.$error) {
        this.saving = true
        this.$store.dispatch('UPDATE_USER', this.user).then(() => {
          this.saving = false
          let date = new Date()
          this.success = this._i18n.t('common.saved') + ' ' + date.toDateString() + ' ' + date.toTimeString()
        }).catch(() => {
          this.saving = false
        })
      }
    }
  },
  validations: {
    user: {
      firstname: {
        required
      },
      lastname: {
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
      success: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .col-form-label {
    text-align: left !important;
  }
</style>
