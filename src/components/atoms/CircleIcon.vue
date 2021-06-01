<template>
  <img
    :class="`circle-icon${bigSize ? '__big' : ''}`"
    :src="imgSrc"
    alt="アイコン"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    imgSrc: {
      type: String as PropType<string>,
      required: true,
    },
    bigSize: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.circle-icon {
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 4rem;
  &__big {
    width: 6rem;
    height: 6rem;
    object-fit: cover;
    border-radius: 7rem;
  }
}
</style>
