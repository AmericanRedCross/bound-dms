<template>
  <b-card :style="'background-color:' + colour" :class="{inverse: inverse}">
    <h2>
      <slot name="value" v-if="type !== 'Number'">{{ value }}{{type}}</slot>
      <slot name="value" v-else>{{ value }}</slot>
    </h2>
    <small v-if="type !== 'Number'"><slot name="description">{{ description }}</slot></small>
    <h3 v-else><slot name="description">{{ description }}</slot></h3>

    <div class="progress" v-if="type === '%'">
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
   min-height: 123px;
 }
 .progress {
    margin-left: -20px;
    margin-right: -20px;
    border-radius: 0px;
 }
</style>
