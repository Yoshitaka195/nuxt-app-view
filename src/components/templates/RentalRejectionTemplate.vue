<template>
  <main class="content">
    <div class="rental-rejection">
      <ion-icon class="close-button" name="close-outline" @click="toApproval" />
      <rental-rejection-screen
        class="center"
        :rejection-reasons="rejectionReasons"
        @reject="reject"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import { RejectionReasonsEntity } from '~/entities/RejectionReasonsEntity'
import RentalRejectionScreen from '~/components/organisms/RentalRejectionScreen'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    RentalRejectionScreen,
  },
  props: {
    rejectionReasons: {
      type: Object as PropType<RejectionReasonsEntity>,
      required: true,
    },
  },
  setup(_props, context: SetupContext) {
    const toApproval = () => {
      const id = context.root.$router.currentRoute.params.id
      context.root.$router.push(`/lend/${id}/approval`)
    }

    const reject = (id: number) => {
      context.emit('reject', id)
    }

    return {
      toApproval,
      reject,
    }
  },
})
</script>

<style lang="scss">
.rental-rejection {
  > .close-button {
    width: 3.2rem;
    height: 3.2rem;
    margin: 3rem 0 0 3rem;
    cursor: pointer;
  }

  > .center {
    margin: 0 auto;
  }
}
</style>
