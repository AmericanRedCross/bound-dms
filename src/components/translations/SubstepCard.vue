<template>
  <b-jumbotron>
    <h3>1.1</h3>
    <div class="row" align="center">
      <div class="col">
          <div class="row">
            <div class="col-md-6">
              <b-card>
                <div class="center-card">
                  Substep Title: English Title
                </div>
              </b-card>
              <b-card>
                <fa-icon name="file"></fa-icon> Substep Sample Document
              </b-card>
            </div>
            <div class="col-md-6">
              <b-card>
                <b-input-group>
                  <b-tooltip :content="getContent">
                    <b-input-group-addon class="white-icon">
                      <fa-icon :name="getIcon" :class="getIconStatus"></fa-icon>
                    </b-input-group-addon>
                  </b-tooltip>
                  <b-form-input type="text" placeholder="Translated Module Name"></b-form-input>
                </b-input-group>
              </b-card>
              <b-card>
                <b-input-group>
                  <b-tooltip :content="getContent">
                    <b-input-group-addon class="white-icon">
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
      isNew: true
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
.white-icon {
  background-color: #ffffff;
}
</style>
