<template>
  <b-card :style="'background-color:' + colour" :class="{inverse: inverse}">
    <h2><slot name="value">{{ value }}{{type}}</slot></h2>
    <small><slot name="description">{{ description }}</slot></small>
    <!-- <b-progress v-model="value" :precision="1"></b-progress> -->
    <div class="progress">
      <div class="progress-bar" role="progressbar" :style="'background-color:' + barColour + '; width: ' + value + '%'" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </b-card>
</template>
<script>

export default {
  name: 'stat-box',
  props: {
    value: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: '%'
    },
    description: {
      type: String
    },
    colour: {
      type: String,
      default: '#FFF'
    },
    barColour: {
      type: String,
      default: '#000'
    },
    inverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/sass/utilities/mixins.scss";
 .inverse {
   color: white;
 }
 .card {
   border: none;
   @include no-select();
 }
</style>
