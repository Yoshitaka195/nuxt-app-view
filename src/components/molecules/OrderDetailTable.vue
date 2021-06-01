<template>
  <vs-card class="order-detail-table">
    <h3 class="mb25">注文情報</h3>
    <table class="default-table">
      <tbody>
        <tr class="default-table__tr">
          <th class="default-table__th">注文番号</th>
          <td class="default-table__td">{{ contactId }}</td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">レンタル期間</th>
          <td class="default-table__td">
            {{ `${formatDate(period.from)}〜` }}<br />
            {{
              `${formatDate(period.to)}(${dayCount(period.from, period.to)}日)`
            }}
          </td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">受け渡し方法</th>
          <td class="default-table__td">
            {{ deliveryMethod }}
          </td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">支払い方法</th>
          <td class="default-table__td">
            {{ paymentMethod }}
          </td>
        </tr>
      </tbody>
    </table>
  </vs-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import moment from 'moment'
import { RentalHistoryEntity } from '~/entities/RentalHistoryEntity'
import { dayCount } from '~/utilities/UtilFunctions'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    rentalHistory: {
      type: Object as PropType<RentalHistoryEntity>,
      default: () => {},
    },
  },
  setup({ rentalHistory }: { rentalHistory: RentalHistoryEntity }) {
    const formatDate = (d: string): string => moment(d).format('YYYY年MM月DD日')

    return {
      ...rentalHistory,
      formatDate,
      dayCount,
    }
  },
})
</script>

<style lang="scss">
.order-detail-table {
  .default-table__th {
    min-width: 14rem;
  }
}
</style>
