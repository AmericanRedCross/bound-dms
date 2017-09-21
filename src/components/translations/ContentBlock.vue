<template>
    <div class="content-block">
      <b-input-group>
        <b-input-group-addon class="white-icon">
          <fa-icon :name="'flag'" :class="'text-danger'"></fa-icon>
        </b-input-group-addon>
        <b-form-textarea v-model="block.content" @input="$emit('update:block', block)"></b-form-textarea>
      </b-input-group>
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
