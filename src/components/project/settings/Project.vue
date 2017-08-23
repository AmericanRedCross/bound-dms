<template>
  <div class="row">
    <div class="col-8">
      <b-form v-on:submit.prevent="onSubmit">
        <b-form-fieldset
          :feedback="!$v.project.name.required ? $t('common.validations.required') : '' "
          :state="$v.project.name.$error ? 'warning' : ''"
          :label="$t('projects.new.name')"
        >
          <b-form-input
            v-model.trim="project.name"
            type="text"
            :value= "project.name"
            v-on:input="$v.project.name.$touch">
          </b-form-input>
        </b-form-fieldset>
        <b-form-fieldset
          :feedback="!$v.project.description.required ? $t('common.validations.required') : '' "
          :state="$v.project.description.$error ? 'warning' : ''"
          :label="$t('projects.new.description')"
        >
          <b-form-input
            :label-cols="3"
            v-model.trim="project.description"
            :textarea="true" :rows="6"
            :value= "project.description"
            v-on:input="$v.project.description.$touch">
          </b-form-input>
        </b-form-fieldset>
        <b-form-fieldset label="Base language">
          <b-form-select v-model="selectedLang" :options="projectLangOptions" class="mb-3"></b-form-select>
          <b-alert variant="danger" show>
            Warning: Only change the base language if 100% of content is translated to this language - otherwise content will be lost.
          </b-alert>
        </b-form-fieldset>
        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </div>
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
      selectedLang: 'en',
      saving: false
    }
  },
  computed: {
    projectLangOptions () {
      return this.project.languages.map((language) => {
        return { text: `${languages[language.code].name} (${language.code})`, value: language.code }
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
    onSubmit (e) {
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
          // TODO error
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
