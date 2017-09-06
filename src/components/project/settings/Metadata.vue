<template>
  <div class="row">
    <div class="col">
      <b-table striped hover
              :items="metadata"
              :fields="headers"
              :show-empty="true"
              :empty-text="$t('projects.meta.emptystate')"
              id="meta-table"
      >
        <template slot="name" scope="item">
         {{ item.value }}
        </template>

        <template slot="type" scope="item">
          {{ item.valuetype }}
        </template>
      </b-table>
      <b-btn v-b-modal.addmeta variant="primary"><fa-icon name="plus"></fa-icon> {{ $t('projects.meta.add') }}</b-btn>
    </div>

    <b-modal id="addmeta" :title="$t('projects.meta.add')">
      <b-form>
        <b-form-fieldset :label="$t('projects.meta.name')">
          <b-form-input
                type="text"
                :placeholder="$t('projects.meta.meta')"
          ></b-form-input>
          <small>{{ $t('projects.meta.example') }}</small>
          <b-form-select v-model="selected" :options="typeOptions">
          </b-form-select>
        </b-form-fieldset>
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
        valuetype: {
          label: 'Value Type'
        },
        actions: {
          label: ''
        }
      },
      metadata: [
        {name: 'hierarchy', valuetype: 'String'},
        {name: 'tool', valuetype: 'Boolean'}
      ],
      selectedKey: '',
      selected: null,
      typeOptions: [
        'String',
        'Boolean',
        'Number'
      ]
    }
  }
}
</script>
