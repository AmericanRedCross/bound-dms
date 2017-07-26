<template>
  <b-card>
    Module
  </b-card>
</template>
<script>
import { Step } from '../../vuex/modules/structure/Step'

export default {
  name: 'module',
  props: {
    module: {
      type: Object,
      default: new Step({})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
