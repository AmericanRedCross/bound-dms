<template>
  <div>
    <div class="row container">
      <div class="col-md-3 col-sm-6 m-b-10">
        <b-card class="publish" align="center">
          <h2><slot name="value">{{ language }}</slot></h2>
        </b-card>
      </div>
      <div class="col-md-3 col-sm-6 m-b-10">
        <b-button :block="true" class="publish" v-b-modal.structure>
          <h2><slot name="structure">{{ structure }}</slot></h2>
          <small>{{ $t('projects.publish.structure') }}</small>
        </b-button>
      </div>
      <div class="col-md-3 col-sm-6 m-b-10">
        <b-button :block="true" class="publish" v-b-modal.content>
          <h2><slot name="structure">{{ content }}</slot></h2>
          <small>{{ $t('projects.publish.content') }}</small>
        </b-button>
      </div>
      <div class="col-md-3 col-sm-6 m-b-10 align-publish">
        <b-button variant="success" :block="true" class="publish" v-b-modal.publishThese><fa-icon name="send" ></fa-icon>{{ $t('projects.publish.publish') }}
        </b-button>
      </div>
    </div>
    <div>
      <b-modal id="structure" :title="$t('projects.publish.structure')" no-auto-focus>
        <h1>Hello Structure</h1>
      </b-modal>
      <b-modal id="content" :title="$t('projects.publish.content')">
        <h1>Hello content</h1>
      </b-modal>
      <b-modal id="publishThese" :title="$t('projects.publish.publish')">
        <h1>Publish These Changes</h1>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Statbox from '../../ui/Statbox'

export default {
  components: {
    Statbox
  },
  data () {
    return {
      language: 'ENG',
      structure: 8,
      content: 5
    }
  }
}
</script>

<style>
.align-publish {
  display: flex;
}
</style>
