<template>
  <div class="row">
    <div class="col">
      <b-table striped hover
              :items="keyData"
              :fields="headers"
              :show-empty="true"
              :empty-text="$t('projects.keys.emptystate')"
              id="apikey-table"
      >
        <template slot="name" scope="item">
         {{ item.value }}
        </template>

        <template slot="details" scope="item">
          <b-button v-b-modal.viewkey variant="primary" @click="selectKey(item)"><fa-icon name="key" :label="$t('projects.keys.key')"></fa-icon> {{ $t('projects.keys.view') }}</b-button>
          <b-button variant="danger" @click="deleteClick(item.item.id)"><fa-icon name="trash" :label="$t('common.delete')"></fa-icon> {{ $t('common.delete') }} </b-button>
        </template>
      </b-table>
      <b-btn v-b-modal.addkey variant="primary"><fa-icon name="plus"></fa-icon> {{ $t('projects.keys.add') }}</b-btn>
    </div>

    <b-modal id="addkey" :title="$t('projects.keys.add')" @ok="addKey">
      <b-form>
        <b-form-fieldset :label="$t('projects.keys.name')">
          <b-form-input
                type="text"
                :placeholder="$t('projects.keys.key')"
                v-model="newKeyForm.name"
          ></b-form-input>
          <small>{{ $t('projects.keys.example') }}</small>
        </b-form-fieldset>
      </b-form>
    </b-modal>

    <b-modal id="viewkey" :title="$t('projects.keys.key')">
      <b-form>
        <b-form-input
              type="text"
              :placeholder="selectedKey.key"
              readonly
        ></b-form-input>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      headers: {
        name: {
          label: 'Key'
        },
        details: {
          label: ''
        }
      },
      keyData: [],
      selectedKey: '',
      newKeyForm: {
        name: ''
      }
    }
  },
  beforeMount () {
    this.fetchKeysForProject()
  },
  methods: {
    selectKey (item) {
      this.selectedKey = item.item
    },
    fetchKeysForProject () {
      this.$store.dispatch('GET_PROJECT_KEYS', this.$route.params.id).then(() => {
        this.keyData = this.getKeys()
      })
    },
    addKey () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('ADD_KEY', {name: this.newKeyForm.name, projectId: this.$route.params.id}).then(resolve)
      })
    },
    deleteClick (keyId) {
      // Call the swal confirm dialog
      this.$swal({
        title: this._i18n.t('common.areYouSure'),
        text: this._i18n.t('common.noRevert'),
        type: 'warning',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this._i18n.t('common.deleteIt'),
        allowOutsideClick: false,
        preConfirm: () => {
          return new Promise((resolve, reject) => {
            this.$store.dispatch('DELETE_KEY', keyId)
              .then(resolve)
              .catch(reject(this._i18n.t('common.error')))
          })
        }
      }).then(() => {
        this.$swal({
          type: 'success',
          title: this._i18n.t('common.deleted')
        })
      })
    }
  },
  computed: {
    ...mapGetters([
      'getKeys'
    ])
  }
}
</script>
