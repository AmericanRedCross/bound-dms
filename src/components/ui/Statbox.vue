<template>
  <b-card :style="'background-color:' + colour" :class="{inverse: inverse}">
      <h3 class="language-background">{{ language }}</h3>
      <h4>
        <slot name="value" v-if="type !== 'Number'">{{ roundDown(value) }}{{type}} {{ description }}</slot>
        <span v-else>
          <slot name="value">{{ roundDown(value) }}</slot> <slot name="description">{{ description }}</slot>
        </span>
      </h4>
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
    language: {
      type: String,
      default: ''
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
  },
  methods: {
    roundDown (number, decimals) {
      let int = parseInt(number, 10)
      decimals = decimals || 0
      return (Math.floor(int * Math.pow(10, decimals)) / Math.pow(10, decimals))
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
 .two-lines {
   .middle-centre {
     top: 14px;
   }
 }
 .middle-centre {
   position: relative;
   top: 23px;
   text-align: center;
 }
</style>
