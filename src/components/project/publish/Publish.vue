<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <b-card :title="$t('projects.publish.title')">
          <div class="col-4">
            <b-form-select v-model="selectedLang" :options="langOptions" class="mb-3">
            </b-form-select>
          </div>

          <hr />

          <div class="col-4">
            <b-button @click="doPublish" variant="success" :block="true" class="publish"><fa-icon name="send" ></fa-icon>{{ $t('projects.publish.publish') }}
            </b-button>
          </div>
          <!-- <LangPublishCard></LangPublishCard> -->
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
import LangPublishCard from './PublishStats'
import PublishList from './PublishList'

export default {
  components: {
    LangPublishCard,
    PublishList
  },
  data () {
    return {
      selectedLang: null,
      projectId: parseInt(this.$route.params.id),
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
      // Confirm and Create publish for selected language
      this.$store.dispatch('CREATE_PUBLISH', {
        projectId: this.projectId,
        data: {type: 'bundleArchive', language: this.selectedLang}
      }).then(() => {
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
      })
    }
  }
}
</script>
