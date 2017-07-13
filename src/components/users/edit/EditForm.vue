<template>
  <div class="edit-form" align="center">
    <b-card class="edit-card" :header="$t('users.edit.editHeader')">
      <div>
        <div>
          {{ $t('users.edit.user') }} {{ user.id }}
        </div>
        <div class="form-group" v-bind:class="{error: $v.firstname.$error}">
          <b-form-fieldset
            :label="$t('users.edit.firstName')"
            :label-size="1">

            <b-form-input
              v-model="user.firstname"
              type="text"
              id="name-input"
              v-on:input="$v.firstname.$touch"
              v-bind:class="{error: $v.firstname.$error, valid: $v.firstname.$dirty && !$v.firstname.$invalid}">
            </b-form-input>

            <span class="form-group__message" v-if="!$v.firstname.required">Field is required</span>
            <pre>{{ $v }}</pre>

          </b-form-fieldset>
        </div>
        <div class="form-group" v-bind:class="{error: $v.lastname.$error}">
          <b-form-fieldset
            :label="$t('users.edit.lastName')"
            :label-size="1"
            >

            <b-form-input
              v-model="user.lastname"
              type="text"
              id="lastname-input"
              v-on:input="$v.lastname.$touch"
              v-bind:class="{error: $v.lastname.$error, valid: $v.lastname.$dirty && !$v.lastname.$invalid}">
            </b-form-input>

            <span class="form-group__message" v-if="!$v.lastname.required">Field is required</span>

          </b-form-fieldset>
        </div>
        <div class="form-group" v-bind:class="{error: $v.email.$error}">
          <b-form-fieldset
            :label="$t('users.edit.email')"
            :label-size="1"
            >

            <b-form-input
              v-model="user.email"
              type="email"
              id="email-input"
              v-on:input="$v.email.$touch"
              v-bind:class="{error: $v.email.$error, valid: $v.email.$dirty && !$v.email.$invalid}">
            </b-form-input>

            <span class="form-group__message" v-if="!$v.email.required">Field is required</span>
          </b-form-fieldset>
        </div>
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
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    updateUser () {
      // if (this.errors.has('name') || this.errors.has('lastname') || this.errors.has('email')) {

      // } else {
      //   this.$store.dispatch('UPDATE_USER', this.user)
      // }
    }
  },
  validations: {
    firstname: {
      required
    },
    lastname: {
      required
    },
    email: {
      required
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
  .card {
    width: 30rem;
  }
  .error {
    border-color: #ff3860;
  }
</style>
