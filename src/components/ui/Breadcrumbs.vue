<template>
  <div class="breadcrumbs">
    <ul>
      <breadcrumb
        v-for="(theRoute, index) in matchedRoute"
        v-if="theRoute.meta.breadcrumb || theRoute.meta.dynamicBc"
        :route="theRoute" :key="theRoute.path"></breadcrumb>
    </ul>
  </div>
</template>
<script>
import Breadcrumb from './Breadcrumb.vue'
export default {
  components: {
    Breadcrumb
  },
  name: 'breadcrumbs',
  computed: {
    matchedRoute () {
      return this.$route.matched
    }
  }
}
</script>
