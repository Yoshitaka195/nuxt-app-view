<template>
  <div class="rental-history-list">
    <general-button
      class="refresh-button"
      :text="'更新'"
      @click="onClickRefreshButton"
    />
    <table class="rental-history-list-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.label" class="thead-th">
            {{ column }}
          </th>
          <td></td>
        </tr>
      </thead>
      <tbody class="tbody">
        <rental-history-overview
          v-for="history in histories"
          :key="history.id"
          :history="history"
          @onClickLinkForDetails="toDetails(history.id, history.status)"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import RentalHistoryOverview from '~/components/molecules/RentalHistoryOverview'
import { RentalHistoryOverviewEntity } from '~/entities/RentalHistoriesEntity'
import { STATUS_VARIATION } from '~/components/atoms/StatusBadge.vue'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    RentalHistoryOverview,
  },
  props: {
    histories: {
      type: Array as PropType<RentalHistoryOverviewEntity[]>,
      default: () => [],
    },
  },

  setup(_props, context: SetupContext) {
    const columns: string[] = [
      'イメージ',
      'アイテム名',
      'レンタル期間',
      '取引ユーザー',
      'ステータス',
    ]

    const toDetails = (id: number, status: STATUS_VARIATION): void => {
      const path = context.root.$router.currentRoute.path
      const url = `${path}/${id}`

      if (status === STATUS_VARIATION.APPLYING && path === '/lend') {
        context.root.$router.push(`${url}/approval`)
        return
      }

      if (status !== STATUS_VARIATION.RENTAL_FINISHED && path === '/lend') {
        context.root.$router.push(`${url}/transaction`)
        return
      }

      context.root.$router.push(url)
    }

    const onClickRefreshButton = (): void => {
      context.emit('onClickRefreshButton')
    }

    return {
      columns,
      toDetails,
      onClickRefreshButton,
    }
  },
})
</script>

<style lang="scss">
.rental-history-list {
  position: relative;
  width: 100%;

  .refresh-button {
    position: absolute;
    top: 0.5rem;
    right: 0;
  }

  &-table {
    width: 100%;
    margin: 0;
    border-collapse: separate;
    border-spacing: 0 1.5rem;

    .thead-th {
      padding: 0 1rem;
      font-size: 1.2rem;
      color: #646464;
    }
  }
}
</style>
