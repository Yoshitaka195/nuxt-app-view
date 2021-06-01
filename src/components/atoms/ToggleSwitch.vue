<template>
  <div class="toggle-switch">
    <div class="label" :class="{ selected: value }" @click="onClickTrue">
      <slot name="label-true">対応する</slot>
    </div>
    <div class="label" :class="{ selected: !value }" @click="onClickFalse">
      <slot name="label-false">対応しない</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    value: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props: { value: boolean }, context: SetupContext) {
    const onClickTrue = () => {
      context.emit('onClickTrue')
    }
    const onClickFalse = () => {
      context.emit('onClickFalse')
    }
    return {
      onClickTrue,
      onClickFalse,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.toggle-switch {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  .label {
    display: block;
    cursor: pointer;
    width: 15rem;
    padding: 1.2rem;
    background: $control-bordr-color;
    color: $white;
    text-align: center;

    &:first-of-type {
      border-radius: 0.6rem 0 0 0.6rem;
    }
    &:last-of-type {
      border-radius: 0 0.6rem 0.6rem 0;
    }
  }
  .selected {
    background-color: $main-color;
  }
}
</style>
