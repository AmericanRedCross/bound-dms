<template>
  <div>
    <b-card :title="$t('projects.publish.recent')">
      <div class="col-md-3 col-sm-6 m-b-10">
        <b-button variant="success" class="publish" v-b-modal.publishAll>{{ $t('projects.publish.publishAll') }}</b-button>
      </div>
      <hr />
      <!--Base Language Card-->
      {{ $t('projects.publish.base') }}
      <LangPublishCard></LangPublishCard>
      <hr />
      <!--For lang in languages, not including base language, create:-->
      <!--Remember to add key to for loop (so LangPublishCards are unique)-->
      {{ $t('projects.publish.translate') }}
    </b-card>
    <b-card :title="$t('projects.publish.previous')">
    </b-card>
    <div>
      <b-modal id="publishAll" :title="$t('projects.publish.publishAll')" no-auto-focus>
        <h1>Publish All</h1>
      </b-modal>
    </div>
  </div>
</template>

<script>
import LangPublishCard from './PublishStats'

export default {
  components: {
    LangPublishCard
  }
}
</script>

<style>
.container {
  display: flex
}
.publish {
  height: 100%
}
</style>
