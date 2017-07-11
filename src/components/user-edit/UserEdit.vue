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
        <b-form-select v-model="selected" :options="options" class="mb-3">
        </b-form-select>
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
          text: 'Please select a role',
          value: null
        },
        {
          text: 'Example Role 1',
          value: 'a'
        }, {
          text: 'Example Role 2',
          value: 'b'
        }, {
          text: 'Example Role 3',
          value: 'c'
        }, {
          text: 'Example Role 4',
          value: 'd'
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
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
