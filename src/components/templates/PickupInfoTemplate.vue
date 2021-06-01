<template>
  <main class="content">
    <div class="pickup-info">
      <ion-icon
        class="close-button"
        name="close-outline"
        @click="toTransaction"
      />
      <pickup-info-verification class="center" :pickup-info="pickupInfo" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import PickupInfoVerification from '~/components/organisms/PickupInfoVerification'
import { PickupInfoEntity } from '~/entities/PickupInfoEntity'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    PickupInfoVerification,
  },
  props: {
    pickupInfo: {
      type: Object as PropType<PickupInfoEntity>,
      required: true,
    },
  },
  setup(
    { pickupInfo }: { pickupInfo: PickupInfoEntity },
    context: SetupContext
  ) {
    const toTransaction = () => {
      const id = String(pickupInfo.id)
      context.root.$router.push(`/lend/${id}/transaction`)
    }

    return {
      toTransaction,
    }
  },
})
</script>

<style lang="scss">
.pickup-info {
  > .close-button {
    width: 3.2rem;
    height: 3.2rem;
    margin: 3rem 0 0 3rem;
    position: fixed;
    cursor: pointer;
  }

  > .center {
    margin: 0 auto;
  }
}
</style>
