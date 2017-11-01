<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <b-card :title="$t('projects.publish.title')">
          <div class="row">
            <div class="col-6">
              <b-input-group>
                <b-form-select v-model="selectedLang" :options="languageOptions" value-field="code" text-field="label">
                </b-form-select>
                <b-input-group-button slot="right">
                  <b-button
                    @click="doPublish"
                    variant="success"
                    :block="true"
                    :disabled="selectedLang === null || publishing"
                    class="publish">
                    <fa-icon v-if="publishing" name="refresh" spin></fa-icon>
                    <fa-icon v-else name="send"></fa-icon>{{ $t('projects.publish.publish') }}
                  </b-button>
                </b-input-group-button>
              </b-input-group>
            </div>
          </div>
        </b-card>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <PublishList :projectId="this.projectId"/>
      </div>
    </div>
  </div>
</template>

<script>
import PublishList from './PublishList'
import { mapGetters } from 'vuex'
import { languages } from 'countries-list'

export default {
  components: {
    PublishList
  },
  data () {
    return {
      selectedLang: null,
      projectId: parseInt(this.$route.params.id),
      publishing: false,
      langOptions: [
        { value: null, text: 'Please select a language to publish' },
        { value: 'en', text: 'English' }
      ]
    }
  },
  methods: {
    doPublish () {
      if (this.selectedLang === null) {
        return
      }

      this.$swal({
        title: this._i18n.t('common.areYouSure'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6200ff',
        cancelButtonColor: '#f85e78',
        confirmButtonText: this._i18n.t('projects.publish.publish'),
        allowOutsideClick: false
      }).then(() => {
        this.publishing = true
        // Confirm and Create publish for selected language
        this.$store.dispatch('CREATE_PUBLISH', {
          projectId: this.projectId,
          data: {type: 'bundleArchive', language: this.selectedLang}
        }).then(() => {
          this.publishing = false
          this.$notifications.notify({
            message: `<b>
              ${this._i18n.t('common.saved')}</b><br />
              ${this._i18n.t('common.created')}
              New Publish`,
            icon: 'info',
            horizontalAlign: 'right',
            verticalAlign: 'bottom',
            type: 'info'
          })
        }).catch(() => {
          this.publishing = false
          this.$notifications.notify(
            {
              message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
              icon: 'exclamation-triangle',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'danger'
            })
        })
      }).catch(this.$swal.noop)
    }
  },
  computed: {
    ...mapGetters([
      'getProjectById'
    ]),
    currentProject () {
      return this.getProjectById(this.projectId)
    },
    languageOptions () {
      let langs = [{label: this._i18n.t('common.pleaseSelect'), code: null, disabled: true}]
      if (this.currentProject) {
        this.currentProject.languages.forEach((lang) => {
          langs.push({
            label: `${languages[lang.code].name} (${lang.code})`,
            code: lang.code
          })
        })
      }
      return langs
    }
  }
}
</script>
