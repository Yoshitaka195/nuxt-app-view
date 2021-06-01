<template>
  <div class="csv-downloader">
    <p>検索結果{{ resultCount }}件</p>
    <vs-button
      v-if="displayDownloadButton"
      color="success"
      type="border"
      class="small-btn"
      @click="onClick"
    >
      CSVダウンロード
    </vs-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    resultCount: {
      type: Number as PropType<number>,
      required: true,
    },
    // 必要なくなったら消す
    displayDownloadButton: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(_props, context: SetupContext) {
    const onClick = (): void => {
      context.emit('click')
    }
    return {
      onClick,
    }
  },
})
</script>

<style lang="scss">
.csv-downloader {
  width: 22rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 0 auto;
}
</style>
