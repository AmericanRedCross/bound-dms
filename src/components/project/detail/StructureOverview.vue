<template>
    <div class="row">
      <div class="col">
        <h5>{{ $t('projects.dashboard.setcontent') }}</h5>
        <div class="container">
          <div class="column-center" align="left">
            <h3><b-badge>
              {{ $t('projects.dashboard.lang') }}
            </b-badge></h3>
          </div>
          <div class="column-left" align="left">
            {{ this.modules }} {{ $t('projects.dashboard.modules') }} | {{ this.steps }} {{ $t('projects.dashboard.steps') }} | {{ this.substeps }} {{ $t('projects.dashboard.substeps') }} | {{ this.tools }} {{ $t('projects.dashboard.tools') }}
          </div>
          <div class="column-right" align="right">
            <b-button>{{ $t('projects.dashboard.edit') }}</b-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'structure-overview',
  components: {

  },
  data () {
    return {
      modules: 5,
      steps: 100,
      substeps: 500,
      tools: 600
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  white-space: nowrap;
  max-width: calc(80vw);
}
.column-left{ float: left; width: 33%; }
.column-right{ float: right; width: 33%; }
.column-center{ float: left; width: 33%; }

</style>
