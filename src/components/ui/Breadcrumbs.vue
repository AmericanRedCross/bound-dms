<template>
  <ul>
    <li v-for="route in matchedRoute" v-if="route.meta.breadcrumb || route.meta.dynamicBc">
       <span v-if="route.meta.breadcrumb">{{ route.meta.breadcrumb }}</span>
       <span v-else-if="route.meta.dynamicBc">Dynamic link here...</span>
    </li>
  </ul>
</template>
<script>

export default {
  name: 'breadcrumbs',
  computed: {
    matchedRoute () {
      return this.$route.matched
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
