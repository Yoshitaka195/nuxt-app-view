<template>
  <vs-button :color="color" :type="type">{{ text }}</vs-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    color: {
      type: String as PropType<string>,
      required: false,
    },
    type: {
      type: String as PropType<string>,
      required: false,
    },
    text: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup() {},
})
</script>
