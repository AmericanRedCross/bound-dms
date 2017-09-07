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
            {{ this.modules }} {{ $t('projects.dashboard.modules') }} | {{ this.directories }} {{ $t('projects.dashboard.directories') }} | {{ this.subDirectories }} {{ $t('projects.dashboard.subDirectories') }} | {{ this.tools }} {{ $t('projects.dashboard.tools') }}
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
      directories: 100,
      subDirectories: 500,
      tools: 600
    }
  }
}
</script>
