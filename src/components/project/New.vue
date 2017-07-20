<template>
    <div class="row">
      <div class="col-lg-8">
        <b-card class="edit-card" :header="$t('projects.edit.newHeader')">
          <b-form-fieldset
            label="Project Name"
            description="This field is required."
            :label-cols="3">
             <b-form-input v-model.trim="project.name"></b-form-input>
          </b-form-fieldset>

          <b-form-fieldset
            label="Description"
            description="Optional"
            :label-cols="3">
             <b-form-input :textarea="true" v-model.trim="project.description"></b-form-input>
          </b-form-fieldset>

          <div slot="footer">
            <b-button variant="primary">{{ $t('projects.edit.new') }}</b-button>
            <b-button variant="warning" :to="{ name: 'projects' }">{{ $t('common.cancel') }}</b-button>
          </div>

        </b-card>
      </div>
      <div class="col-lg-4">
        <b-card :inverse="true" variant="info">
          Enter the details of your new document project. You can assign additional languages later on.
        </b-card>
      </div>
    </div>
</template>

<script>
import { Project } from '../../vuex/modules/project/Project'

export default {
  data () {
    return {
      project: new Project()
    }
  },
  methods: {
    save (e) {
      this.$store.commit('updateMessage', e.target.value)

      this.$store.dispatch(action, this.user).then(() => {
        this.saving = false
        let date = new Date()
        this.success = this._i18n.t('common.saved') + ' ' + date.toDateString() + ' ' + date.toTimeString()
        if (this.newUser) {
          this.$router.push({ name: 'Users' })
        }
      }).catch(() => {
        this.saving = false
      })
    }
}
}
</script>
