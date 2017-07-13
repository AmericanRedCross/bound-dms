<template>
  <div class="edit-form" align="center">
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

          <b-form-input v-model="user.email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email"></b-form-input>
          <!-- <b-form-input v-model="user.email" :class="{'email': true, 'input is-danger': errors.has('email')}" v-validate="'required|email'" name="email" type="email" id="email-input"></b-form-input> -->
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
</template>

<script>

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
  .input.is-danger {
    border-color: #ff3860;
  }
</style>
