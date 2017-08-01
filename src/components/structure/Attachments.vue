<template>
  <div class="step-attachments">
    <hr />
    <b-list-group>
      <b-list-group-item v-for="attachment in attachments">
        {{ attachment.title }}
      </b-list-group-item>
    </b-list-group>
    <hr />
    <b-button @click.native="modalVisibility = !modalVisibility"><fa-icon name="plus"></fa-icon> {{ $t('projects.attachments.add') }} </b-button>

    <b-modal id="docmodal" class="ignore-drag" v-model="modalVisibility" :title="$t('projects.attachments.add')" :hide-footer="true">
      <div class="createDoc" align="center">
        <fa-icon name="edit"></fa-icon>
        <p>{{ $t('projects.attachments.create') }}</p>
        <small>{{ $t('projects.attachments.createSub') }}</small>
        <br />
        <b-button variant="primary" :to="{name: 'Document Editor'}">{{ $t('common.create') }}</b-button>
        <hr />
        <fa-icon name="upload"></fa-icon>
        <p>{{ $t('projects.attachments.upload') }}</p>
        <small>{{ $t('projects.attachments.uploadSub') }}</small>
        <br />
        <b-button variant="primary">{{ $t('common.upload') }}</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Step-Attachments',
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
