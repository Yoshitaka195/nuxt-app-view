<template>
  <main class="content">
    <div id="lend_detail">
      <content-header :categories="categories" />
      <vs-row style="width: auto">
        <vs-col type="flex" vs-w="6">
          <item-info
            :id="id"
            :img-src="imageSource"
            :name="name"
            :evaluation="evaluation"
            omit-edit-button
          />
        </vs-col>
        <vs-col type="flex" vs-w="6">
          <business-partner-info :user="businessPartner" />
        </vs-col>
      </vs-row>

      <vs-row style="width: auto">
        <vs-col type="flex" vs-w="6">
          <order-detail-table :rental-history="rentalHistory" />
        </vs-col>
        <vs-col type="flex" vs-w="6">
          <payment-schedules :schedules="paymentSchedules" />
        </vs-col>
      </vs-row>

      <vs-row style="width: auto">
        <vs-col type="flex" vs-w="12">
          <item-detail-table :item="item" />
        </vs-col>
      </vs-row>
    </div>
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import { PaymentScheduleEntity } from '~/entities/PaymentSchedulesEntity'
import { RentalHistoryEntity } from '~/entities/RentalHistoryEntity'
import ItemInfo from '~/components/molecules/ItemInfo'
import PaymentSchedules from '~/components/organisms/PaymentSchedules'
import BusinessPartnerInfo, {
  User,
} from '~/components/molecules/BusinessPartnerInfo'
import OrderDetailTable from '~/components/molecules/OrderDetailTable'
import { ItemEntity } from '~/entities/ItemEntity'
import ItemDetailTable from '~/components/molecules/ItemDetailTable'
import ContentHeader, { Categories } from '~/components/molecules/ContentHeader'
// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    ContentHeader,
    ItemInfo,
    BusinessPartnerInfo,
    OrderDetailTable,
    PaymentSchedules,
    ItemDetailTable,
  },
  props: {
    categories: {
      type: Object as PropType<Categories>,
      required: true,
    },
    rentalHistory: {
      type: Object as PropType<RentalHistoryEntity>,
      required: true,
    },
    businessPartner: {
      type: Object as PropType<User>,
      required: true,
    },
    paymentSchedules: {
      type: Array as PropType<PaymentScheduleEntity[]>,
      required: true,
    },
    item: {
      type: Object as PropType<ItemEntity>,
      required: true,
    },
  },
  setup({ item }: { item: ItemEntity }, context: SetupContext) {
    const state = reactive({
      filterModalVisible: false,
    })
    const showFilterModal = (): void => {
      state.filterModalVisible = true
    }
    const onClickFilterModalBtn = (params?: object): void => {
      state.filterModalVisible = false
      if (params != null) {
        context.emit('fetchRentalHistories', params)
      }
    }
    return {
      ...item,
      ...toRefs(state),
      showFilterModal,
      onClickFilterModalBtn,
    }
  },
})
</script>

<style lang="scss">
// スタイル未着手
</style>
