<template>
  <main class="content">
    <div id="owned_items_list_detail">
      <content-header :categories="categories" />
      <vs-row style="width: auto">
        <vs-col type="flex" vs-w="12">
          <item-info
            :id="id"
            :img-src="imageSource"
            :name="name"
            :evaluation="evaluation"
          />
        </vs-col>
      </vs-row>
      <vs-row style="width: auto">
        <vs-col type="flex" vs-w="12">
          <stock-rental-histories
            :histories="rentalHistories"
            :is-loading="isLoadingHistories"
            @showFilterModal="showFilterModal"
          />
        </vs-col>
      </vs-row>
      <vs-row style="width: auto">
        <vs-col type="flex" vs-w="12">
          <item-detail-table :item="item" />
        </vs-col>
      </vs-row>
      <!-- 絞り込みポップアップ -->
      <vs-popup
        class="dialog__filter"
        title="絞り込み"
        :active.sync="filterModalVisible"
      >
        <stock-rental-filter-modal
          @onClickFilterModalBtn="onClickFilterModalBtn"
        />
      </vs-popup>
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
import ItemInfo from '~/components/molecules/ItemInfo.vue'
import ItemDetailTable from '~/components/molecules/ItemDetailTable'
import { ItemEntity } from '~/entities/ItemEntity'
import { StockRentalHistory } from '~/api/types/response/StockRentalHistory'
import StockRentalHistories from '~/components/organisms/StockRentalHistories'
import ContentHeader, { Categories } from '~/components/molecules/ContentHeader'
import StockRentalFilterModal from '~/components/molecules/StockRentalFilterModal'
interface Props {
  item: ItemEntity
  rentalHistories: StockRentalHistory[]
}

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    ContentHeader,
    ItemInfo,
    StockRentalHistories,
    ItemDetailTable,
    StockRentalFilterModal,
  },
  props: {
    item: {
      type: Object as PropType<ItemEntity>,
      required: true,
    },
    rentalHistories: {
      type: Array as PropType<StockRentalHistory[]>,
      default: () => [],
    },
    isLoadingHistories: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },

  setup({ item }: { item: ItemEntity }, context: SetupContext) {
    const state = reactive({
      filterModalVisible: false,
    })

    const categories: Categories = {
      category: '所有アイテム',
      subCategory: '一覧',
      smallCategory: '詳細',
    }

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
      categories,
      showFilterModal,
      onClickFilterModalBtn,
    }
  },
})
</script>

<style lang="scss">
// スタイル未着手
</style>
