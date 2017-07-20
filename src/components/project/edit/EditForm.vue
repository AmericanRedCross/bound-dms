<template>
  <b-card class="edit-card" :header="newProject ? $t('projects.edit.newHeader') : $t('projects.edit.editHeader')">
    <div>
      <div class="form-group">
        <b-tooltip :content="$t('common.gravatar')" placement="right" :show="showToolTip">
          <a href="https://gravatar.com" target="_blank"><v-gravatar class="img-fluid project-icon m-t-10 m-b-10" :email="project.email" default-img="mm" :size="100"> </v-gravatar></a>
        </b-tooltip>
        <b-form-fieldset
          :label="$t('projects.edit.firstName')"
          :label-size="1"
          :feedback="!$v.project.firstName.required ? $t('common.validations.required') : '' "
          :state="$v.project.firstName.$error ? 'warning' : ''"
        >
          <b-input-group>
            <b-input-group-addon slot="left">
              <fa-icon name="project-o"></fa-icon>
            </b-input-group-addon>
            <b-form-input
              v-model.trim="project.firstName"
              type="text"
              id="firstname-input"
              v-on:input="$v.project.firstName.$touch">
            </b-form-input>
          </b-input-group>

        </b-form-fieldset>
      </div>

      <div class="form-group">
        <b-form-fieldset
          :label="$t('projects.edit.lastName')"
          :label-size="1"
          :feedback="!$v.project.lastName.required ? $t('common.validations.required') : '' "
          :state="$v.project.lastName.$error ? 'warning' : ''"
        >
          <b-input-group>
            <b-input-group-addon slot="left">
              <fa-icon name="project-o"></fa-icon>
            </b-input-group-addon>
            <b-form-input
              v-model.trim="project.lastName"
              type="text"
              id="lastname-input"
              v-on:input="$v.project.lastName.$touch">
            </b-form-input>
          </b-input-group>
        </b-form-fieldset>
      </div>

      <div class="form-group">
        <b-form-fieldset
          :label="$t('projects.edit.email')"
          :label-size="1"
          :feedback="!$v.project.email.required ? $t('common.validations.required') : !$v.project.email.email ? $t('common.validations.email') : '' "
          :state="$v.project.email.$error ? 'warning' : ''"
        >
          <b-input-group>
            <b-input-group-addon slot="left">
              <fa-icon name="at"></fa-icon>
            </b-input-group-addon>
            <b-form-input
              v-model.trim="project.email"
              type="email"
              id="email-input"
              v-on:input="$v.project.email.$touch">
            </b-form-input>
          </b-input-group>
        </b-form-fieldset>
      </div>
    </div>
    <div slot="footer">
      <b-button @click.native="updateProject" variant="primary" :disabled='saving'>{{ $t('projects.edit.save') }}</b-button>
      <b-button variant="warning" :disabled='saving' :to="{ name: 'projects' }">{{ $t('common.cancel') }}</b-button>
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
    project: {
      type: Object
    },
    newProject: {
      type: Boolean
    }
  },
  mounted () {
    this.showToolTip = true
  },
  methods: {
    updateProject () {
      this.$v.project.$touch()
      if (!this.$v.project.firstName.$error && !this.$v.project.lastName.$error && !this.$v.project.email.$error) {
        this.saving = true
        let action = this.newProject ? 'CREATE_USER' : 'UPDATE_USER'
        this.$store.dispatch(action, this.project).then(() => {
          this.saving = false
          let date = new Date()
          this.success = this._i18n.t('common.saved') + ' ' + date.toDateString() + ' ' + date.toTimeString()
          if (this.newProject) {
            this.$router.push({ name: 'Projects' })
          }
        }).catch(() => {
          this.saving = false
        })
      }
    }
  },
  validations: {
    project: {
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
  .project-icon {
    border-radius: 50%;
  }
</style>
