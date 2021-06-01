<template>
  <main class="content">
    <div class="rental-approval">
      <content-header
        :categories="{ category: '取引', subCategory: '取引画面' }"
      />
      <div class="wrap">
        <rental-approval-screen
          :rental-request-info="rentalRequestInfo"
          @approve="approve"
        />
        <message-screen />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import RentalApprovalScreen from '~/components/organisms/RentalApprovalScreen'
import MessageScreen from '~/components/organisms/MessageScreen'
import { RentalRequestInfoEntity } from '~/entities/RentalRequestInfoEntity'
import ContentHeader, { Categories } from '~/components/molecules/ContentHeader'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    RentalApprovalScreen,
    MessageScreen,
    ContentHeader,
  },
  props: {
    rentalRequestInfo: {
      type: Object as PropType<RentalRequestInfoEntity>,
      required: true,
    },
  },
  setup(_props, context: SetupContext) {
    const approve = (id: number) => {
      context.emit('approve', id)
    }

    return {
      approve,
    }
  },
})
</script>

<style lang="scss">
.rental-approval {
  > .wrap {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    > :first-child {
      margin-right: 3rem;
      min-width: 70rem;
    }

    > :last-child {
      min-width: 40rem;
    }
  }
}
</style>
