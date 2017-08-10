<template>
  <div>
    <b-button variant="primary" @click.native="back">
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
