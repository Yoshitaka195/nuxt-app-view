<template>
  <div class="message-set">
    <div :class="['user', { self }]">
      <circle-icon :img-src="img" />
      <span class="name">借りるティン</span>
    </div>
    <message-balloon class="balloon-layout" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import MessageBalloon from '~/components/atoms/MessageBallon'
import CircleIcon from '~/components/atoms/CircleIcon'
import img from '~/static/img/sample/sample-02.jpg'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    MessageBalloon,
    CircleIcon,
  },
  props: {
    self: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup() {
    return {
      img,
    }
  },
})
</script>

<style lang="scss">
.message-set {
  > .user {
    display: flex;
    align-items: center;

    &.self {
      flex-direction: row-reverse;
    }

    > .name {
      margin: 0 1rem;
    }
  }

  > .balloon-layout {
    width: calc(100% - 10rem);
    margin: 0 5rem;
  }
}
</style>
