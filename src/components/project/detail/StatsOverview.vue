<template>
    <div class="row">
      <div class="col-md-12">
        <b-card :title="project.name">
          <h1>Project Name</h1><small>Owned by Kevin Borrill</small>
          <div class="row">
            <div class="col-md-3 col-sm-6 m-b-10">
              <StatBox :value="50" type="%" description="A description here" colour="#20A8D8" inverse></StatBox>
            </div>
            <div class="col-md-3 col-sm-6 m-b-10">
              <StatBox :value="30" type="%" description="A description here" colour="#FF7914" inverse></StatBox>
            </div>
            <div class="col-md-3 col-sm-6 m-b-10">
              <StatBox :value="75" type="%" description="A description here" colour="#8ED820"></StatBox>
            </div>
            <div class="col-md-3 col-sm-6 m-b-10">
              <StatBox :value="100" type="%" description="A description here" colour="#D82069" inverse></StatBox>
            </div>
          </div>
        </b-card>
      </div>
    </div>
</template>

<script>
import StatBox from '../../ui/StatBox'
export default {
  name: 'stats-overview',
  props: {
    project: {
      type: Object
    }
  },
  components: {
    StatBox
  }
}
</script>
