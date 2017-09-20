<template>
    <div class="content-block">
      <p>
        -
      </p>
      <b-form-input v-if="block.content && !block.children" type="text" v-model="block.content" @input="$emit('update:block', block)"></b-form-input>
      <ContentBlock v-for="(child, index) in block.children" :block.sync="child" :key="index" class="ml-4"></ContentBlock>
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
