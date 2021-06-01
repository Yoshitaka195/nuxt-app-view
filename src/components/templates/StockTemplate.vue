<template>
  <main class="content">
    <div id="stock">
      <content-header :categories="categories" />
      <div class="csv-downloader-wrapper">
        <transition name="fade">
          <csv-downloader
            v-if="resultCount"
            :result-count="resultCount"
            @click="onClickCsvDownload"
          />
        </transition>
      </div>
      <div class="flex-content">
        <stock-filter
          :submit-btn-disabled="isLoading"
          @onSubmitFilter="onSubmitFilter"
        />
        <transition name="fade" mode="out-in">
          <div v-if="isLoading" class="loading-wrapper">
            <loading-spinner />
          </div>
          <template v-else>
            <stock-list
              v-if="items.length"
              :items="items"
              @onClickStatusBtn="showStatusSettingModal"
              @onClickRefreshButton="onClickRefreshButton"
            />
            <p v-else class="not-exists-items">所有アイテムがありません。</p>
          </template>
        </transition>
      </div>
      <div class="item-table-footer">
        <transition name="fade">
          <div>
            <vs-pagination
              v-if="(items.length && !isLoading) || currentPage.value !== 1"
              v-model="currentPage"
              :total="totalPage"
              style="justify-content: center; display: flex; width: auto"
            />
          </div>
        </transition>
      </div>
      <!-- 公開・非公開ポップアップ -->
      <vs-popup
        class="dialog__status"
        title="ステータス"
        :active.sync="statusSettingModalVisible"
      >
        <!--ステータス更新の度にkeyを設定して必ずコンポーネントの再描画を促す。やらないと更新されない。-->
        <status-setting
          :key="`${statusSettingTarget.id}${statusSettingTarget.status}`"
          :item="statusSettingTarget"
          @submitStatus="updateStatus"
        />
      </vs-popup>
      <ListingButton v-if="userInfo.statusIsApproved()" />
    </div>
  </main>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  SetupContext,
  toRefs,
  watch,
} from '@vue/composition-api'
import { scrollToTop } from '~/utilities/UtilFunctions'
import { ItemOverviewEntity } from '~/entities/StockItemsEntity'
import ApiRequestParams from '~/utilities/ApiRequestParams'
import ContentHeader, { Categories } from '~/components/molecules/ContentHeader'
import CsvDownloader from '~/components/molecules/CsvDownloader'
import StockFilter from '~/components/organisms/StockFilter'
import StockList from '~/components/organisms/StockList'
import StatusSetting from '~/components/molecules/StatusSetting'
import LoadingSpinner from '~/components/atoms/LoadingSpinner'
import UserInfo from '~/utilities/UserInfo'

interface Props {
  items: ItemOverviewEntity[]
  resultCount: number
  isLoading: boolean
}

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    ContentHeader,
    CsvDownloader,
    StockFilter,
    StockList,
    StatusSetting,
    LoadingSpinner,
  },
  props: {
    items: {
      type: Array as PropType<ItemOverviewEntity[]>,
      default: () => [],
    },
    resultCount: {
      type: Number as PropType<number>,
      default: 0,
    },
    isLoading: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props: Props, context: SetupContext) {
    const state = reactive({
      statusSettingModalVisible: false,
      statusSettingTarget: {} as ItemOverviewEntity,
      currentPage: 1,
      userInfo: UserInfo,
    })

    const categories = computed(
      (): Categories => ({
        category: '所有アイテム',
        subCategory: '一覧',
      })
    )

    watch(
      computed(() => state.currentPage),
      scrollToTop
    )

    const showStatusSettingModal = (item) => {
      state.statusSettingModalVisible = true
      state.statusSettingTarget = item
    }

    const updateStatus = (): void => {
      state.statusSettingModalVisible = false
      context.emit('updateStatus', state.statusSettingTarget)
    }

    const onSubmitFilter = (params): void => {
      context.emit('fetchItems', params)
    }

    const onClickCsvDownload = (): void => {
      context.emit('downloadCsv')
    }

    const targetPage = computed((): number => {
      return state.currentPage
    })
    watch(targetPage, (targetPage): void => {
      context.emit('paginate', targetPage)
    })

    const totalPage = computed((): number =>
      Math.ceil(props.resultCount / ApiRequestParams.PER_PAGE)
    )

    const onClickRefreshButton = (): void => {
      context.emit('onClickRefreshButton')
    }

    return {
      ...toRefs(state),
      categories,
      showStatusSettingModal,
      updateStatus,
      onSubmitFilter,
      onClickCsvDownload,
      targetPage,
      totalPage,
      onClickRefreshButton,
    }
  },
})
</script>

<style lang="scss">
// スタイル未着手
#stock {
  .csv-downloader-wrapper {
    height: 30px;
  }

  .loading-wrapper,
  .not-exists-items {
    width: 100%;
    min-height: 400px;
    padding-top: 200px;
    display: flex;
    justify-content: center;
  }
}
</style>
