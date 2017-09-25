<template>
  <div>
    <b-button variant="primary" @click="back">
      <fa-icon name="arrow-left"></fa-icon>
       Back
    </b-button>
    <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
  </div>
</template>

<script>

export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    back () {
      this.$router.push(window.history.back())
    }
  }
}
</script>
