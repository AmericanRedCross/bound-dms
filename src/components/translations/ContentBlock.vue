<template>
    <div class="content-block">
      <b-form-textarea v-model="block.content" @input="$emit('update:block', block)"></b-form-textarea>
    </div>
</template>

<script>

export default {
  name: 'ContentBlock',
  props: {
    block: {
      type: Object
    }
  }
}
</script>
