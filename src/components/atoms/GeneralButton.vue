<template>
  <div class="general-button" @click="onClick">{{ text }}</div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  setup(_props, context: SetupContext) {
    const onClick = () => {
      context.emit('click')
    }
    return {
      onClick,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.general-button {
  color: $sub-color;
  display: inline-block;
  border: solid 0.1rem $sub-color;
  border-radius: 0.4rem;
  padding: 0.6rem 1rem;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: $white;
    background-color: $sub-color;
  }
}
</style>
