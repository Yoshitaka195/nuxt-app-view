<template>
  <tr class="default-table__tr">
    <td class="default-table__td">{{ formatDate(date) }}</td>
    <td class="default-table__td">{{ formatNumber(amount) }}円</td>
    <td class="default-table__td">
      <ion-icon
        v-if="paid"
        class="ion-icon--checkmark"
        name="checkmark-circle-outline"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import moment from 'moment'
import { PaymentScheduleEntity } from '~/entities/PaymentSchedulesEntity'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    schedule: {
      type: Object as PropType<PaymentScheduleEntity>,
      required: true,
    },
  },
  setup({ schedule }: { schedule: PaymentScheduleEntity }) {
    const formatNumber = (num: number): string => num.toLocaleString()
    const formatDate = (d: string): string => moment(d).format('YYYY年MM月DD日')
    return {
      ...schedule,
      formatNumber,
      formatDate,
    }
  },
})
</script>
