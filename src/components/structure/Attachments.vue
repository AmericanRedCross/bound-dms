<template>
  <div class="directory-attachments">
    <hr />
    <b-list-group>
      <b-list-group-item v-for="attachment in attachments" :key="attachment.id">
        {{ attachment.title }} | {{ attachment.filename }} | {{ attachment.mimeType }}
      </b-list-group-item>
    </b-list-group>
    <hr />

    <!-- <b-modal id="docmodal" class="ignore-drag" v-model="modalVisibility" :title="$t('projects.attachments.add')" :hide-footer="true">
      <div class="createDoc" align="center">
        <fa-icon name="edit"></fa-icon>
        <p>{{ $t('projects.attachments.create') }}</p>
        <small>{{ $t('projects.attachments.createSub') }}</small>
        <br />
        <b-button variant="primary" :to="{name: 'document-edit'}">{{ $t('common.create') }}</b-button>
        <hr />
        <fa-icon name="upload"></fa-icon>
        <p>{{ $t('projects.attachments.upload') }}</p>
        <small>{{ $t('projects.attachments.uploadSub') }}</small>
        <br />
        <b-button variant="primary">{{ $t('common.upload') }}</b-button>
      </div>
    </b-modal> -->
  </div>
</template>

<script>
export default {
  name: 'Directory-Attachments',
  props: {
    attachments: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      modalVisibility: false
    }
  },
  methods: {

  }
}
</script>
