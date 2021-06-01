<template>
  <div class="transaction-screen">
    <h3 class="header">取引画面</h3>
    <lender-step3
      v-if="transactionInfo.isSent()"
      :slip-id="transactionInfo.slipId"
      :contact-url="transactionInfo.contactUrl"
    />
    <component :is="body" v-else />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'
import StepBar from '~/components/molecules/StepBar'
import LenderStep1 from '~/components/organisms/TransactionScreenBody/LenderStep1'
import LenderStep2 from '~/components/organisms/TransactionScreenBody/LenderStep2'
import LenderStep3 from '~/components/organisms/TransactionScreenBody/LenderStep3'
import LenderStep4 from '~/components/organisms/TransactionScreenBody/LenderStep4'
import LenderStep5 from '~/components/organisms/TransactionScreenBody/LenderStep5'
import LenderStep1Handing from '~/components/organisms/TransactionScreenBody/LenderStep1Handing'
import { TransactionInfoEntity } from '~/entities/TransactionInfoEntity'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    StepBar,
    LenderStep1,
    LenderStep2,
    LenderStep3,
    LenderStep4,
    LenderStep5,
    LenderStep1Handing,
  },
  props: {
    transactionInfo: {
      type: Object as PropType<TransactionInfoEntity>,
      required: true,
    },
  },
  setup(
    { transactionInfo }: { transactionInfo: TransactionInfoEntity },
    _context
  ) {
    const body = computed((): string => {
      // isHanding不要かも？
      if (transactionInfo.isHanding) {
        if (transactionInfo.isApproved()) return 'LenderStep1Handing'
      }
      if (transactionInfo.isApproved()) return 'LenderStep1Handing'

      if (transactionInfo.isAwaitingPickupRequest()) return 'LenderStep1'

      if (transactionInfo.isPickupRequestDone()) return 'LenderStep2'

      // step3はprops必須のためテンプレート内で条件分岐

      if (transactionInfo.isDeliveryDone()) return 'LenderStep4'

      if (transactionInfo.isBeingRental()) return 'LenderStep5'
    })

    return {
      body,
    }
  },
})
</script>

<style lang="scss">
.transaction-screen {
  width: 55rem;
  border-radius: 6px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;

  > .header {
    font-size: 1.8rem;
    padding: 2.5rem;
    height: 6.8rem;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    background-color: #fff;
  }
}
</style>
