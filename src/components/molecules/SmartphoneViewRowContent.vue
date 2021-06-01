<template>
  <div
    class="smartphone-view-row-content"
    :class="{ active, floating }"
    @click="onClick"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
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

.smartphone-view-row-content {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;

  > .title {
    font-weight: bold;
    width: 13rem;
    padding: 1.4rem 0.8rem 1.4rem 0;
  }
  > .content {
    padding: 1.4rem 1.6rem 1.4rem 0;
  }
}
</style>
