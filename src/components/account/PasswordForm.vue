<template>
  <div class="account-password">
    <div class="row">
      <div class="col-lg-8">
        <b-card class="password-card" :header="$t('users.edit.changePass')">
          <b-form v-on:submit.native.prevent="onSubmit">

            <b-form-fieldset
              :label="$t('users.edit.currentPass')"
              :label-cols="3"
              :feedback="!$v.password.$error ? $t('common.validations.required') : ''"
              :state="$v.password.$error ? 'warning' : ''">
              <b-form-input name="password" type="password" v-model="password" @input="$v.password.$touch()"></b-form-input>
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
      password: null,
      newPassword: null,
      confirmPassword: null
    }
  },
  validations: {
    password: {
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
  methods: {
    onSubmit (e) {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.$store.dispatch('UPDATE_USER_PASSWORD', {
          password: this.password,
          newPassword: this.newPassword
        })
        .then(this.$auth.refresh())
        .then(this.$router.push({ name: 'profile' }))
        .catch((error) => {
          console.log(error)
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
  computed: {
    ...mapGetters([
      'getUserById'
    ])
  }
}
</script>
