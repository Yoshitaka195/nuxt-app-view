<template>
  <div class="transaction-screen-body">
    <div class="message-area">
      <p class="title">レンタル中です</p>
      <p class="content">延長や早期返却の申請が届いたら処理しましょう。</p>
    </div>
    <h3 class="steps-title mt50">レンタル状況</h3>
    <div class="sb-wrap">
      <step-bar
        :step="1"
        :step-names="[
          'レンタル中',
          '返却集荷受付完了',
          '返却配達中',
          'レンタル終了',
        ]"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import StepBar from '~/components/molecules/StepBar'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    StepBar,
  },
})
</script>
