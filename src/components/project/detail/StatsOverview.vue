<template>
    <div class="row">
      <div class="col-md-12">
        <b-card :title="project.name">
          <small>Created by: User Name</small>
          <div class="row">
            <div class="col-md-3 col-sm-6 m-b-10">
              <b-card>
                <h2><slot name="value">{{ languageCount }}</slot></h2>
                <small><slot name="description">Languages</slot></small>
              </b-card>
            </div>
            <div class="col-md-3 col-sm-6 m-b-10">
              <Statbox :value="30" type="%" description="A description here" colour="#63c2de" barColour="#54a5bd" inverse></Statbox>
            </div>
            <div class="col-md-3 col-sm-6 m-b-10">
              <Statbox :value="75" type="%" description="A description here" colour="#63c2de" barColour="#54a5bd" inverse></Statbox>
            </div>
            <div class="col-md-3 col-sm-6 m-b-10">
              <Statbox :value="100" type="%" description="A description here" colour="#63c2de" barColour="#54a5bd" inverse></Statbox>
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
