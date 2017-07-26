<template>
  <div class="structure">
    <Module></Module>
  </div>
</template>
<script>
import Module from './Module'

export default {
  name: 'Structure',
  components: {
    Module
  },
  props: {
    project: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
