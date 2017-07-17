<template>
  <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
</template>

<script>

export default {
  data () {
    return {
      content: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
