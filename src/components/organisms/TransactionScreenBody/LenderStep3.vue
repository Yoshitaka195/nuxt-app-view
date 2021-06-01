<template>
  <div class="transaction-screen-body">
    <div class="message-area">
      <p class="title">配達されるまでお待ちください</p>
      <p class="content">借主にアイテムが配達されるまでお待ちください</p>
    </div>
    <p class="contact">
      伝票番号：<a
        :href="contactUrl"
        target="_blank"
        rel="noopener noreferrer"
        >{{ slipId }}</a
      >
    </p>
    <h3 class="steps-title">配送状況</h3>
    <div class="sb-wrap">
      <step-bar
        :step="3"
        :step-names="['集荷受付待ち', '集荷受付完了', '配達中', '配達完了']"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import StepBar from '~/components/molecules/StepBar'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    StepBar,
  },
  props: {
    slipId: {
      type: String as PropType<string>,
      required: true,
    },
    contactUrl: {
      type: String as PropType<string>,
      required: true,
    },
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
