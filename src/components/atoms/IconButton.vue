<template>
  <vs-button
    color="primary"
    type="filled"
    :class="`icon-button${modifier}`"
    :disabled="disabled"
    @click="onClick"
  >
    <ion-icon class="square-btn__ico" :name="iconType" />{{ text }}
  </vs-button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    iconType: {
      type: String as PropType<string>,
      required: true,
    },
    text: {
      type: String as PropType<string>,
      default: '',
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, context) {
    const onClick = () => {
      context.emit('click')
    }
    const modifier = computed((): string => {
      return props.text ? '__text' : '__square'
    })
    return {
      onClick,
      modifier,
    }
  },
})
</script>

<style lang="scss">
.icon-button {
  &__square {
    width: 4rem;
    height: 3.6rem;
  }
  &__text {
    height: 4rem;
    .vs-button--text {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
