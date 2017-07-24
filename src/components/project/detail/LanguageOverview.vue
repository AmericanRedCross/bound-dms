<template>
    <div class="row">
      <div class="col">
        <b-card title="Languages">
          <div class="row">
            <div class="col">
              <b-alert show>
                {{ $t('projects.languages.noLangs') }}
              </b-alert>
            </div>
          </div>
        </b-card>
      </div>
    </div>
</template>

<script>

export default {
  name: 'lanuage-overview',
  props: {
    project: {
      type: Object
    }
  }
}
</script>
