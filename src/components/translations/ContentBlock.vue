<template>
    <div class="content-block">
      <b-input-group class="h-100">
        <b-form-textarea v-model="block.content" :placeholder="placeholder.content" @input="$emit('update:block', block)" :disabled="disabled" :class="rtl ? 'text-rtl' : ''"></b-form-textarea>
      </b-input-group>
    </div>
</template>

<script>

export default {
  name: 'ContentBlock',
  props: {
    block: {
      type: Object,
      default () {
        return {
          content: ''
        }
      }
    },
    placeholder: {
      type: Object,
      default () {
        return {
          content: ''
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    }
  }
}
</script>
