<template>
  <div>
    <b-card align="center" :header="$t('projects.settings.header')">
      <div>
        <b-form-fieldset
          :feedback="!$v.project.name.required ? $t('common.validations.required') : '' "
          :state="$v.project.name.$error ? 'warning' : ''"
        >
          {{ $t('projects.settings.projectName') }}
          <b-form-input
            v-model.trim="project.name"
            type="text"
            :value= "project.name"
            v-on:input="$v.project.name.$touch">
          </b-form-input>
        </b-form-fieldset>
      </div>
      <div>
        <b-form-fieldset
          :feedback="!$v.project.description.required ? $t('common.validations.required') : '' "
          :state="$v.project.description.$error ? 'warning' : ''"
        >
          {{ $t('projects.settings.projectDescription') }}
          <b-form-input
            v-model.trim="project.description"
            type="text"
            textarea
            :value= "project.description"
            v-on:input="$v.project.description.$touch">
          </b-form-input>
        </b-form-fieldset>
      </div>
      <div>
        {{ $t('projects.settings.baseLanguage') }}
        <v-select :options="projectLangOptions"></v-select>
        <br />
        <b-alert variant="danger" show>
          {{ $t('projects.settings.warning') }}
        </b-alert>
      </div>
      <div>
        <b-button variant="success" @click.native="updateProject">
          {{ $t('projects.settings.save') }}
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
  import vSelect from 'vue-select'
  import { languages } from 'countries-list'
  import { required } from 'vuelidate/lib/validators'

  export default {
    components: {vSelect},
    name: 'project-detail',
    props: {
      project: {
        type: Object
      }
    },
    data () {
      return {
        saving: false
      }
    },
    computed: {
      projectLangOptions () {
        return this.project.languages.map((language) => {
          return { label: `${languages[language.code].name} (${language.code})`, value: language.code }
        })
      }
    },
    validations: {
      project: {
        name: {
          required
        },
        description: {
          required
        }
      }
    },
    methods: {
      updateProject () {
        this.$v.project.$touch()
        if (!this.$v.project.$error) {
          this.saving = true
          let action = 'UPDATE_PROJECT'
          this.$store.dispatch(action, this.project).then(() => {
            this.saving = false
            this.$notifications.notify(
              {
                message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.updated')} ${this.project.name}`,
                icon: 'info',
                horizontalAlign: 'right',
                verticalAlign: 'bottom',
                type: 'info'
              })
          }).catch(() => {
            this.saving = false
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
    }
  }
</script>
