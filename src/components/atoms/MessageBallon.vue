<template>
  <div class="message-balloon">
    <p class="text">
      メッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージメッセージ
    </p>
    <p class="date-time">2021年3月30日 18:00</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  // a
})
</script>

<style lang="scss">
.message-balloon {
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: #f0f0f0;

  > .text {
    font-size: 1.4rem;
    line-height: 1.43;
    margin-bottom: 1rem;
  }

  > .date-time {
    font-size: 1.2rem;
    line-height: 1.58;
    color: #787878;
  }
}
</style>
