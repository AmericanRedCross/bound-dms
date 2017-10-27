<template>
    <div class="content-block">
      <b-input-group class="h-100">
        <b-input-group-addon class="white-icon" v-if="!disabled">
          <fa-icon :name="block.content.length === 0 ? 'flag' : 'check'" :class="block.content.length === 0 ? 'text-danger' : 'text-success'"></fa-icon>
        </b-input-group-addon>
        <b-form-textarea v-model="block.content" :placeholder="placeholder.content" @input="$emit('update:block', block)" :disabled="disabled"></b-form-textarea>
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
    }
  }
}
</script>
