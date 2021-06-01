<template>
  <div class="transaction-screen-body">
    <div class="message-area">
      <p class="title">集荷されるまでお待ちください</p>
      <p class="content">
        配達員が集荷依頼日時に商品を引き取りに伺います。<br />
        集荷日までお待ちください。
      </p>
    </div>
    <vs-button class="action-button" @click="toPickupInfo">
      集荷依頼確認
    </vs-button>
    <h3 class="steps-title">配送状況</h3>
    <div class="sb-wrap">
      <step-bar
        :step="2"
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
    const toPickupInfo = () => {
      const id = context.root.$router.currentRoute.params.id
      context.root.$router.push(`/lend/${id}/pickup_info`)
    }

    return {
      toPickupInfo,
    }
  },
})
</script>
