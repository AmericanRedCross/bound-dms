<template>
  <div class="change-password" align="center">
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

          <b-form-input v-validate="'confirmed:confirmResetPassword'" name="newPassword" type="password" v-model="resetPassword" id="new-password-input" data-vv-as="password"></b-form-input>
          <span v-show="errors.has('newPassword')" class="help is-danger" id="new-password-error">{{ errors.first('newPassword') }}</span>

        </b-form-fieldset>
        <b-form-fieldset
            :label="$t('users.edit.confirmPass')"
            :label-size="1"
            >

          <b-form-input name="confirmResetPassword" type="password" v-model="confirmResetPassword" id="confirm-new-password-input"></b-form-input>
          <span v-show="errors.has('confirmResetPassword')" class="help is-danger" id="new-password-error">{{ errors.first('confirmResetPassword') }}</span>

        </b-form-fieldset>
        <b-button @click.native="updatePassword">{{ $t('users.edit.save') }}</b-button>
      </b-card>
  </div>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      currentPassword: '',
      resetPassword: '',
      confirmResetPassword: ''
    }
  },
  methods: {
    updatePassword () {
      // if (this.errors.has('currentPassword') || this.errors.has('newPassword') || this.errors.has('confirmResetPassword')) {

      // } else {
        // save new password if input currentPassword is the same as saved value
        // this.$store.dispatch('UPDATE_USER', this.user)
      // }
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
