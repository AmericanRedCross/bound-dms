<template>
    <div class="row">
      <div class="col-lg-8">
        <b-card class="edit-card" :header="$t('projects.edit.newHeader')">
          <b-form v-on:submit.prevent="onSubmit">
            <b-form-fieldset
              :label="$t('projects.new.name')"
              :feedback="!$v.project.name.required ? $t('common.validations.required') : ''"
              :state="$v.project.name.$error ? 'warning' : ''"
              :label-cols="3">
               <b-form-input v-model.trim="project.name" v-on:input="$v.project.name.$touch"></b-form-input>
            </b-form-fieldset>

            <b-form-fieldset
              :label="$t('projects.new.description')"
              :label-cols="3">
               <b-form-input :textarea="true" :rows="6" v-model.trim="project.description"></b-form-input>
            </b-form-fieldset>

            <b-form-fieldset
              :label="$t('projects.new.selectBaseLanguage')"
              :label-cols="3">
              <form>
                <b-form-select :options="langOptions" :placeholder="$t('projects.languages.select')" v-model="project.baseLanguage"></b-form-select>
              </form>
            </b-form-fieldset>

            <b-button type="submit" variant="primary">{{ $t('projects.edit.new') }}</b-button>
            <b-button variant="warning" :to="{ name: 'projects' }">{{ $t('common.cancel') }}</b-button>
          </b-form>
        </b-card>
      </div>
      <div class="col-lg-4">
        <b-card :inverse="true" variant="info">
          {{ $t('projects.new.details') }}
        </b-card>
      </div>
    </div>
</template>

<script>
import { Project } from '../../vuex/modules/project/Project'
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import { languages } from 'countries-list'

export default {
  validations: {
    project: {
      name: {
        required
      }
    }
  },
  data () {
    return {
      project: new Project({ baseLanguage: 'en' })
    }
  },
  computed: {
    ...mapGetters([
      'getLatestProject'
    ]),
    langOptions () {
      return Object.keys(languages).map((key) => {
        if (key === 'en') {
          this.selectedLang = key
        }
        return { text: `${languages[key].name} (${key})`, value: key }
      })
    }
  },
  methods: {
    onSubmit (e) {
      this.$v.$touch()
      if (!this.$v.project.$error) {
        this.$store.dispatch('CREATE_PROJECT', this.project).then(() => {
          let project = this.getLatestProject()
          this.$router.push({ name: 'project-detail', params: { id: project.id } })
          this.$notifications.notify(
            {
              message: `<b>${this._i18n.t('common.saved')}</b><br /> ${this._i18n.t('common.created')} ${this.project.name}`,
              icon: 'info',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'info'
            })
        }).catch((e) => {
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
