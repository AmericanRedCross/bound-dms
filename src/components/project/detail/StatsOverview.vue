<template>
    <div class="row">
      <div class="col-md-12">
        <b-card :title="project.name"><small>Owned by Kevin Borrill</small></b-card>
        <div class="row">
          <div class="col-md-3">

          </div>
          <div class="col-md-3">

          </div>
          <div class="col-md-3">

          </div>
          <div class="col-md-3">

          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'stats-overview',
  props: {
    project: {
      type: Object
    }
  }
}
</script>
