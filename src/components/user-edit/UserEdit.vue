<template>
  <div class="user-edit">
    <h1 id="changeText">{{ msg }}</h1>
    <div>
      <div>
        User: {{ $route.params.id }}
      </div>
      <b-form-fieldset
        label="Name"
        :label-size="1"
        >

        <b-form-input v-model="name" class="name" v-validate="'required|name'" name="name" type="text" id="name-input"></b-form-input>
        <span v-show="errors.has('name')" class="help is-danger" id="name-error">{{ errors.first('name') }}</span>

      </b-form-fieldset>
      <b-form-fieldset
        label="Email"
        :label-size="1"
        >

        <b-form-input v-model="email" class="email" v-validate="'required|email'" name="email" type="email" id="email-input"></b-form-input>
        <span v-show="errors.has('email')" class="help is-danger" id="email-error">{{ errors.first('email') }}</span>

      </b-form-fieldset>
      <div>
        <label>Please select a role</label>
        <b-form-select v-model="selected" name="roles" :options="options" class="mb-3" v-validate="'in:admin,translator,content_creator'">
        </b-form-select>
        <span v-show="errors.has('roles')" class="help is-danger" id="role-not-selected">{{ errors.first('roles')}}</span>
      </div>
      <b-form-fieldset
          label="Current Password"
          :label-size="1"
          >

        <b-form-input name="currentPassword" type="password" v-model="password" id="current-password-input"></b-form-input>
        <span v-show="errors.has('currentPassword')" class="help is-danger" id="current-password-error">{{ errors.first('currentPassword') }}</span>

      </b-form-fieldset>
      <b-form-fieldset
          label="New Password"
          :label-size="1"
          >

        <b-form-input v-validate= "'confirmed:confirmResetPassword'" name="newPassword" type="password" v-model="resetPassword" id="new-password-input" data-vv-as="password"></b-form-input>
        <span v-show="errors.has('newPassword')" class="help is-danger" id="new-password-error">{{ errors.first('newPassword') }}</span>

      </b-form-fieldset>
      <b-form-fieldset
          label="Confirm New Password"
          :label-size="1"
          >

        <b-form-input name="confirmResetPassword" type="password" v-model="confirmResetPassword" id="confirm-new-password-input"></b-form-input>
        <span v-show="errors.has('confirmResetPassword')" class="help is-danger" id="new-password-error">{{ errors.first('confirmResetPassword') }}</span>

      </b-form-fieldset>
      <b-button @click.native="authenticate">Save</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      msg: 'Edit User',
      name: '',
      email: '',
      currentPassword: '',
      resetPassword: '',
      confirmPesetPassword: '',
      selected: null,
      options: [
        {
          text: 'Admin',
          value: 'admin'
        }, {
          text: 'Translator',
          value: 'translator'
        }, {
          text: 'Content Creator',
          value: 'content_creator'
        }]
    }
  },

  computed: {
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

</style>
