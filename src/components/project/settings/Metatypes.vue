<template>
  <div class="row">
    <div class="col">
      <b-table striped hover
              :items="metatypes"
              :fields="headers"
              :show-empty="true"
              :empty-text="$t('projects.meta.metatype.emptystate')"
              id="meta-table"
      >
        <template slot="key" scope="item">
         {{ item.item._key }}
        </template>

        <template slot="type" scope="item">
          {{ item.item._type }}
        </template>
      </b-table>
      <b-btn v-b-modal.addmeta variant="primary"><fa-icon name="plus"></fa-icon> {{ $t('projects.meta.metatype.add') }}</b-btn>
    </div>

    <b-modal id="addmeta" :title="$t('projects.meta.metatype.add')" @ok="addMetatype">
      <b-form>
        <b-form-fieldset :label="$t('projects.meta.metatype.name')">
          <b-form-input
                type="text"
                v-model="newMetatypeForm.key"
                :placeholder="$t('projects.meta.metatype.label')"
          ></b-form-input>
          <small>{{ $t('projects.meta.metatype.example') }}</small>
        </b-form-fieldset>
        <b-form-fieldset :label="$t('projects.meta.metatype.label')">
          <b-form-select v-model="newMetatypeForm.type" :options="typeOptions">
          </b-form-select>
        </b-form-fieldset>
      </b-form>
    </b-modal>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  beforeMount () {
    this.fetchMetatypesForProject()
  },
  methods: {
    fetchMetatypesForProject () {
      this.$store.dispatch('GET_PROJECT_METATYPES', this.$route.params.id).then(() => {
        this.metatypes = this.getMetatypes()
      })
    },
    addMetatype () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('ADD_METATYPE', {
          key: this.newMetatypeForm.key,
          type: this.newMetatypeForm.type,
          projectId: this.$route.params.id
        }).then(() => {
          this.fetchMetatypesForProject()
          this.$notifications.notify(
            {
              message: `<b>${this._i18n.t('common.saved')}</b>`,
              icon: 'info',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'info'
            })
        }).catch(() => {
          this.$notifications.notify(
            {
              message: `<b>${this._i18n.t('common.oops')}</b><br /> ${this._i18n.t('common.error')}`,
              icon: 'exclamation-triangle',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'danger'
            })
        })
      })
    }
  },
  data () {
    return {
      headers: {
        key: {
          label: 'Name'
        },
        type: {
          label: 'Type'
        },
        actions: {
          label: ''
        }
      },
      metatypes: [
      ],
      typeOptions: {
        string: `${this._i18n.t('projects.meta.metatype.types.string')}`,
        boolean: `${this._i18n.t('projects.meta.metatype.types.boolean')}`,
        integer: `${this._i18n.t('projects.meta.metatype.types.integer')}`
      },
      newMetatypeForm: {
        key: '',
        type: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'getMetatypes'
    ])
  }
}
</script>
