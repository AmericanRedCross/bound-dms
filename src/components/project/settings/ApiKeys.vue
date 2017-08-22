<template>
  <div class="row">
    <div class="col">
      <b-table striped hover
              :items="keyData"
              :fields="headers"
              :show-empty="true"
              empty-text="There are no Api Keys assigned to this project"
              id="apikey-table"
      >
        <template slot="name" scope="item">
          {{ item.value }}
        </template>

        <template slot="details" scope="item">
          <b-button v-b-modal.viewkey variant="primary"><fa-icon name="key" label="Key"></fa-icon> View Key</b-button>
          <b-button variant="danger" @click="deleteClick"><fa-icon name="trash" label="Delete"></fa-icon> Delete</b-button>
        </template>
      </b-table>
      <b-btn v-b-modal.addkey variant="primary"><fa-icon name="plus"></fa-icon> Add API Key</b-btn>
    </div>

    <b-modal id="addkey" title="Add an API Key">
      <b-form>
        <b-form-fieldset label="Key Name">
          <b-form-input
                type="text"
                placeholder="API Key"
          ></b-form-input>
          <small>e.g. iOS App</small>
        </b-form-fieldset>
      </b-form>
    </b-modal>

    <b-modal id="viewkey" title="API Key">
      <b-form>
        <b-form-input
              type="text"
              placeholder="f54gegsdver46-3sdnec-wsTRFesdwcCwc"
              readonly
        ></b-form-input>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
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
      keyData: [
        {name: 'iOS App'},
        {name: 'Android App'}
      ]
    }
  },
  methods: {
    deleteClick (e) {
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
        allowOutsideClick: false
      }).then(() => {
        this.$swal({
          type: 'success',
          title: this._i18n.t('common.deleted')
        })
      })
    }
  }
}
</script>
