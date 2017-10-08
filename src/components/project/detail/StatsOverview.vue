<template>
    <div class="row">
      <div class="col-md-12">
        <b-card :title="project.name">
          <small>{{ $t('projects.dashboard.createdby')}} {{ project.createdBy.firstname }} {{ project.createdBy.lastname }}</small>
          <div class="row mt-4">
            <div class="col-md-3 col-sm-6 m-b-10">
              <Statbox :value="languageCount" type="Number" :description="$t('projects.detail.languages')" colour="#4a3b61" barColour="#a966ff" inverse>
                <slot name="value">{{ languageCount }}</slot>
              </Statbox>
            </div>
            <div class="col-md-3 col-sm-6 m-b-10">
              <Statbox :value="30" type="%" :description="$t('projects.detail.description')" colour="#4a3b61" barColour="#a966ff" inverse></Statbox>
            </div>
            <div class="col-md-3 col-sm-6 m-b-10">
              <Statbox :value="75" type="%" :description="$t('projects.detail.description')" colour="#4a3b61" barColour="#a966ff" inverse></Statbox>
            </div>
            <div class="col-md-3 col-sm-6 m-b-10">
              <Statbox :value="100" type="%" :description="$t('projects.detail.description')" colour="#4a3b61" barColour="#a966ff" inverse></Statbox>
            </div>
          </div>
        </b-card>
      </div>
    </div>
</template>

<script>
import Statbox from '../../ui/Statbox'

export default {
  name: 'stats-overview',
  props: {
    project: {
      type: Object
    }
  },
  components: {
    Statbox
  },
  computed: {
    languageCount () {
      return this.project.languages.length
    }
  }
}
</script>
