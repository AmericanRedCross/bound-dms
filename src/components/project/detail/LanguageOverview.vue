<template>
    <div class="row">
      <div class="col">
        <b-card title="Languages">
          <div class="row">
            <div class="col">
              <b-alert show>
                {{ $t('projects.languages.noLangs') }}
              </b-alert>
              <b-btn v-b-toggle.addLanguage>{{ $t('projects.languages.add') }}</b-btn>
            </div>
          </div>
          <br />
          <b-collapse id="addLanguage" class="alert-info">
            <div class="addLanguagePadding">
              <div class="d-flex addInputForm">
                <label>{{ $t('projects.languages.add') }}</label>
                <v-select :value.sync="selected" :options="options" :placeholder="$t('projects.languages.select')"></v-select>
                <b-btn variant="primary">{{ $t('common.add') }}</b-btn>
              </div>
            </div>
          </b-collapse>
          <br />
          <div class="row">
            <!-- Language Table -->
          </div>
        </b-card>
      </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
  components: {vSelect},
  name: 'lanuage-overview',
  props: {
    project: {
      type: Object
    }
  },
  data () {
    return {
      selected: null,
      options: [
        {label: 'English (UK)', value: 'eng_gb'},
        {label: 'English (US)', value: 'eng_us'},
        {label: 'Spanish', value: 'esp'}
      ]
    }
  }
}
</script>
