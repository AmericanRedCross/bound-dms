<template>
  <b-card :title="$t('projects.documents.title')">
    <div class="row">
      <div class="col">
        <b-table striped hover
                :items="metadata"
                :fields="headers"
                :show-empty="true"
                :empty-text="$t('projects.meta.emptystate')"
                id="meta-table"
        >
          <template slot="icon" scope="item">
           <fa-icon name="file-text"></fa-icon>
          </template>

          <template slot="type" scope="item">
            {{ item.valuetype }}
          </template>
        </b-table>
      </div>

    </div>
  </b-card>
</template>

<script>

export default {
  data () {
    return {
      headers: {
        id: {
          label: 'ID'
        },
        thumbnail: {
          label: 'Thumbnail'
        },
        icon: {
          label: ''
        },
        title: {
          label: 'Title'
        },
        description: {
          label: 'Description'
        },
        path: {
          label: 'Path'
        },
        createdAt: {
          label: 'Created at'
        },
        createdBy: {
          label: 'Created by'
        }
      },
      metadata: [
        {id: '1', title: 'Sample doc 1', description: 'A sample doc', path: 'project/sampledocs/1', createdAt: '06/09/17', createdBy: 'user@domain.com'}
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
