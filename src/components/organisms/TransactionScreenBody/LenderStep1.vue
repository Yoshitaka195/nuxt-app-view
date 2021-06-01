<template>
  <div class="transaction-screen-body">
    <div class="message-area">
      <p class="title">集荷依頼をしてください</p>
      <p class="content">
        明日の集荷には本日16時50分までの集荷依頼が必要です。
      </p>
    </div>
    <vs-button class="action-button" @click="toPickupRequest"
      >集荷依頼</vs-button
    >
    <h3 class="steps-title">配送状況</h3>
    <div class="sb-wrap">
      <step-bar
        :step="1"
        :step-names="['集荷受付待ち', '集荷受付完了', '配達中', '配達完了']"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import StepBar from '~/components/molecules/StepBar'

export default defineComponent({
  components: {
    StepBar,
  },
  setup(_props, context: SetupContext) {
    const toPickupRequest = () => {
      const id = context.root.$router.currentRoute.params.id
      context.root.$router.push(`/lend/${id}/pickup_request`)
    }

    return {
      toPickupRequest,
    }
  },
})
</script>
