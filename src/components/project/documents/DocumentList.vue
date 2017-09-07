<template>
  <div>
    <b-card :title="$t('projects.documents.upload')" class="mb-3">
      <div class="row">
        <div class="col">
          <dropzone id="fileUpload" url="https://httpbin.org/post" v-on:vdropzone-success="showSuccess">
              <!-- Optional parameters if any! -->
              <input type="hidden" name="token" value="xxx">
          </dropzone>
        </div>
      </div>
    </b-card>
    <b-card :title="$t('projects.documents.title')" class="mb-3">
      <div class="row">
        <div class="col">
          <b-form-input v-model="filter" :placeholder="$t('users.listview.type')" id="userSearch"></b-form-input>
          <b-table striped hover
                  :items="metadata"
                  :fields="headers"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :show-empty="true"
                  :empty-text="$t('projects.meta.emptystate')"
                  :filter="filter"
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
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone'

export default {
  components: {
    Dropzone
  },
  methods: {
    'showSuccess': function (file) {
      console.log('A file was successfully uploaded')
    }
  },
  data () {
    return {
      headers: {
        id: {
          label: 'ID',
          sortable: true
        },
        thumbnail: {
          label: 'Thumbnail'
        },
        icon: {
          label: '',
          sortable: true
        },
        title: {
          label: 'Title',
          sortable: true
        },
        description: {
          label: 'Description'
        },
        path: {
          label: 'Path',
          sortable: true
        },
        createdAt: {
          label: 'Created at',
          sortable: true
        },
        createdBy: {
          label: 'Created by',
          sortable: true
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
      ],
      perPage: 10,
      currentPage: 1,
      filter: null
    }
  }
}
</script>
