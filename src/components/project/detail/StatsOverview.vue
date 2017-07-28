<template>
    <div class="row">
      <div class="col-md-12">
        <b-card :title="project.name">
          <small>Owned by Kevin Borrill</small>
          <div class="row">
            <div class="col-md-3 col-sm-6 m-b-10">
              <Statbox :value="50" type="%" description="A description here" colour="#63c2de" barColour="#54a5bd" inverse></Statbox>
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
  }
}
</script>
