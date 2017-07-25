<template>
  <div class="account-password">
    <div class="row">
      <div class="col-lg-8">
        <b-card class="password-card" :header="$t('users.edit.changePass')">
          <b-form v-on:submit.native.prevent="onSubmit">

            <b-form-fieldset
              :label="$t('users.edit.currentPass')"
              :label-cols="3"
              :feedback="!$v.currentPassword.$error ? $t('common.validations.required') : ''"
              :state="$v.currentPassword.$error ? 'warning' : ''">
              <b-form-input name="currentPassword" type="password" v-model="currentPassword" @input="$v.currentPassword.$touch()"></b-form-input>
            </b-form-fieldset>

            <b-form-fieldset
                :label="$t('users.edit.newPass')"
                :label-cols="3"
                :feedback="!$v.newPassword.required ? $t('common.validations.required') : ''"
                :state="$v.newPassword.$error ? 'warning' : ''">
              <b-form-input name="newPassword" type="password" v-model="newPassword" @input="$v.newPassword.$touch()"></b-form-input>
            </b-form-fieldset>

            <b-form-fieldset
                :label="$t('users.edit.confirmPass')"
                :label-cols="3"
                :feedback="!$v.confirmPassword.sameAsNewPassword ? $t('common.validations.sameAsNewPassword') : ''"
                :state="$v.confirmPassword.$error ? 'warning' : ''">
              <b-form-input name="confirmPassword" type="password" v-model="confirmPassword" @input="$v.confirmPassword.$touch()"></b-form-input>
            </b-form-fieldset>
            <b-button type="submit" variant="primary">{{ $t('users.edit.save') }}</b-button>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      currentPassword: null,
      newPassword: null,
      confirmPassword: null,
      userId: parseInt(this.$auth.user().id, 10)
    }
  },
  validations: {
    currentPassword: {
      required
    },
    newPassword: {
      required,
      minLength: minLength(8)
    },
    confirmPassword: {
      sameAsPassword: sameAs('newPassword')
    }
  },
  onSubmit () {

  },
  computed: {
    ...mapGetters([
      'getUserById'
    ])
  }
}
</script>
