<template>
  <div class="edit-form col-lg-6">
    <b-card class="edit-card" :header="$t('users.edit.editHeader')">
      <div>
        <div class="form-group" v-bind:class="{error: $v.user.firstname.$error}">
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

        <div class="form-group" v-bind:class="{error: $v.user.lastname.$error}">
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

        <div class="form-group" v-bind:class="{error: $v.user.email.$error}">
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
        <b-button @click.native="updateUser" variant="primary">{{ $t('users.edit.save') }}</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  props: {
    user: {
      type: Object
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .col-form-label {
    text-align: left !important;
  }
</style>
