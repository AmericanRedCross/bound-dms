<template>
  <b-jumbotron>
    <h3>Module Info</h3>
    <div class="row" align="center">
      <div class="col">
          <div class="row">
            <div class="col-md-6">
              <b-card>
                <div class="center-card">
                  Module Title: English Title
                </div>
              </b-card>
              <b-card>
                <fa-icon name="file"></fa-icon> Module Roadmap
              </b-card>
            </div>
            <div class="col-md-6">
              <b-card :border-variant="getBorderStatus">
                <b-input-group>
                  <b-tooltip :content="getContent">
                    <b-input-group-addon>
                      <fa-icon :name="getIcon" :class="getIconStatus"></fa-icon>
                    </b-input-group-addon>
                  </b-tooltip>
                  <b-form-input type="text" placeholder="Translated Module Name"></b-form-input>
                </b-input-group>
              </b-card>
              <b-card :border-variant="getBorderStatus">
                <b-input-group>
                  <b-tooltip :content="getContent">
                    <b-input-group-addon>
                      <fa-icon :name="getIcon" :class="getIconStatus"></fa-icon>
                    </b-input-group-addon>
                  </b-tooltip>
                  <b-form-file></b-form-file>
                </b-input-group>
              </b-card>
            </div>
          </div>
      </div>
    </div>
  </b-jumbotron>
</template>

<script>
export default {
  data () {
    return {
      untranslated: true,
      isUpdated: false,
      isNew: false
    }
  },
  computed: {
    getBorderStatus () {
      let status = ''
      if (this.isUpdated) {
        status = 'warning'
      }
      if (this.isNew) {
        status = 'danger'
      }
      return status
    },
    getIcon () {
      let icon = ''
      if (this.isUpdated || this.isNew) {
        icon = 'flag'
      } else {
        icon = 'check'
      }
      return icon
    },
    getIconStatus () {
      let iconStatus = ''
      if (this.isUpdated) {
        iconStatus = 'text-warning'
      } else if (this.isNew) {
        iconStatus = 'text-danger'
      } else {
        iconStatus = 'text-success'
      }
      return iconStatus
    },
    getContent () {
      let content = ''
      if (this.isUpdated) {
        content = 'Updated in the base language'
      } else if (this.isNew) {
        content = 'New to the base language'
      } else {
        content = 'Up to date!'
      }
      return content
    }
  }
}
</script>

<style>
.input-group-addon {
  background-color: #ffffff;
}
</style>
