<template>
  <div class="transaction-screen-body">
    <div class="message-area">
      <p class="title">配達が完了しました</p>
      <p class="content">借主が確認後にレンタル開始されます</p>
    </div>
    <h3 class="steps-title mt50">配送状況</h3>
    <div class="sb-wrap">
      <step-bar
        :step="4"
        :step-names="['集荷受付待ち', '集荷受付完了', '配達中', '配達完了']"
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
