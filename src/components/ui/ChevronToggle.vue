<template>
  <div :class="{chevronToggle: true, chevronChecked: isOpen}" v-on:click="change">
    <div class="top"></div>
    <div class="bottom"></div>
  </div>
</template>
<script>

export default {
  name: 'chevron-toggle',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  mounted () {
    Object.assign(this.isOpen, this.value)
  },
  methods: {
    change () {
      this.isOpen = !this.isOpen
      this.$emit('change', this.isOpen)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/sass/variables.scss";
.chevronToggle {
  transition: all 0.2s ease-out;
  width: 40px;
  height: 40px;
  cursor: pointer;
  .top, .bottom {
    margin: 0 auto;
    width: 3px;
    height: 20px;
    background-color: $light-blue;
    border-radius: 2px;
  }

  .top {
    transform: translateY(4px) rotate(-45deg);
  }

  .bottom {
    transform: translateY(-4px) rotate(45deg);
  }

  &:hover {
     transform: rotate(45deg);
  }
}

.chevronChecked {
   transform: rotate(90deg);
   &:hover {
      transform: rotate(90deg);
   }
}
</style>
