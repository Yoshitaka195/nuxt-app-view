<template>
  <div class="stock-list">
    <general-button
      class="refresh-button"
      :text="'更新'"
      @click="onClickRefreshButton"
    />
    <table class="stock-list-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.label" class="thead-th">
            {{ column }}
          </th>
          <!--        <td class="refresh-button">-->
          <!--        </td>-->
        </tr>
      </thead>
      <tbody class="tbody">
        <stock-overview
          v-for="item in items"
          :key="item.id"
          :item="item"
          @onClickLinkForDetails="toDetails(item.id)"
          @onClickStatusBtn="onClickStatusBtn(item)"
          @onClickEditBtn="toEdit(item.id)"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import StockOverview from '~/components/molecules/StockOverview'
import { ItemOverviewEntity } from '~/entities/StockItemsEntity'
import GeneralButton from '~/components/atoms/GeneralButton.vue'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    GeneralButton,
    StockOverview,
  },
  props: {
    items: {
      type: Array as PropType<ItemOverviewEntity[]>,
      default: () => [],
    },
  },

  setup(_props, context: SetupContext) {
    const columns: string[] = [
      'イメージ',
      'アイテム名',
      'ステータス',
      '出品日',
      'レンタル回数',
      '編集',
    ]

    const toDetails = (id: number): void => {
      context.root.$router.push(`/owned_items_list/${id}`)
    }
    const onClickStatusBtn = (item): void => {
      context.emit('onClickStatusBtn', item)
    }
    const toEdit = (id: number): void => {
      context.root.$router.push(`/owned_items_list/edit/${id}`)
    }
    const onClickRefreshButton = (): void => {
      context.emit('onClickRefreshButton')
    }

    return {
      columns,
      toDetails,
      onClickStatusBtn,
      toEdit,
      onClickRefreshButton,
    }
  },
})
</script>

<style lang="scss">
.stock-list {
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
