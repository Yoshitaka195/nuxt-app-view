<template>
  <img class="item-image" :src="imgSrc" alt="アイテム画像" @click="onClick" />
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'

type Props = {
  imgSrc: string
}

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    imgSrc: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(_props: Props, context: SetupContext) {
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
.item-image {
  width: 7rem;
  height: 7rem;
  object-fit: cover;
  border-radius: 0.6rem;
}
</style>
