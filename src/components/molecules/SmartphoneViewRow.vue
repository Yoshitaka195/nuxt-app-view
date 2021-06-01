<template>
  <div
    class="smartphone-view-row"
    :class="{ active, floating, underline }"
    @click="onClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    active: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    floatable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    underline: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup({ floatable }: { floatable: boolean }, context: SetupContext) {
    const state = reactive({
      floating: false,
    })
    const onClick = () => {
      context.emit('click')
    }
    const onMouseEnter = () => {
      if (floatable) state.floating = true
    }
    const onMouseLeave = () => {
      if (floatable) state.floating = false
    }
    return {
      ...toRefs(state),
      onClick,
      onMouseEnter,
      onMouseLeave,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.smartphone-view-row {
  width: 100%;
  padding: 0.4rem 1.6rem;
  background-color: $white;

  &.floating {
    border-radius: 0.8rem;
    box-shadow: 0 0.1rem 0.6rem 0 rgba(0, 0, 0, 0.2);
    background-color: $border-color;
    position: relative;
    cursor: pointer;
  }
  &.active {
    border-radius: 0.8rem;
    box-shadow: 0 0.1rem 0.6rem 0 rgba(0, 0, 0, 0.2);
    background-color: $white;
    position: relative;
    cursor: pointer;
  }
  &.underline {
    border-bottom: 0.1rem solid #d2d2d2;
  }
}
</style>
