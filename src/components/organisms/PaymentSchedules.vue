<template>
  <vs-card class="payment-schedules">
    <h3 class="mb25">支払い予定表・決済履歴</h3>
    <div class="default-table__payment-schedule">
      <table class="default-table">
        <thead class="default-table__thead">
          <tr>
            <th
              v-for="column in columns"
              :key="column"
              class="default-table__thead-th"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <payment-schedule
            v-for="schedule in schedules"
            :key="schedule.id"
            :schedule="schedule"
          />
        </tbody>
      </table>
    </div>
  </vs-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import PaymentSchedule from '~/components/molecules/PaymentSchedule'
import { PaymentScheduleEntity } from '~/entities/PaymentSchedulesEntity'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    PaymentSchedule,
  },
  props: {
    schedules: {
      type: Array as PropType<PaymentScheduleEntity[]>,
      required: true,
    },
  },
  setup() {
    const columns = ['支払日', '金額', '決済済み']

    return {
      columns,
    }
  },
})
</script>
