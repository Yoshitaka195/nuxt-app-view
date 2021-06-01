<template>
  <div class="status-setting">
    <p>{{ description }}</p>
    <vs-button
      :color="btnColor"
      type="filled"
      class="approve-btn"
      @click="onClick"
    >
      {{ btnText }}
    </vs-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from '@vue/composition-api'

type Status = 0 | 1
type Item = {
  id: number
  imgSrc: string
  name: string
  status: Status
  listingDate: string
  rentals: number
}

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup({ item }: Item, context: SetupContext) {
    const description = computed((): string => {
      const toBe = item.status === 0 ? '公開' : '非公開に'
      return `${item.name}を${toBe}しますか？`
    })

    const btnText = computed((): string =>
      item.status === 0 ? '公開' : '非公開'
    )

    const btnColor = computed((): string =>
      item.status === 0 ? 'primary' : 'dark'
    )

    const onClick = (): void => {
      context.emit('submitStatus')
    }

    return {
      description,
      btnText,
      btnColor,
      onClick,
    }
  },
})
</script>

<style lang="scss">
.status-setting {
  .approve-btn {
    width: 100%;
  }
}
</style>
