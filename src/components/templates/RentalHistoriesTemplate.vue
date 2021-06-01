<template>
  <main class="content">
    <div id="RentalHistories">
      <content-header :categories="categories" />
      <div class="csv-downloader-wrapper">
        <transition name="fade">
          <csv-downloader
            v-if="resultCount"
            :result-count="resultCount"
            :display-download-button="false"
            @click="onClickCsvDownload"
          />
        </transition>
      </div>
      <div class="flex-content">
        <rental-history-filter
          :submit-btn-disabled="isLoading"
          @onSubmitFilter="onSubmitFilter"
        />
        <transition name="fade" mode="out-in">
          <div v-if="isLoading" class="loading-wrapper">
            <loading-spinner />
          </div>
          <template v-else>
            <rental-histories
              v-if="histories.length"
              :histories="histories"
              @onClickRefreshButton="onClickRefreshButton"
            />
            <p v-else class="not-exists-items">取引履歴がありません。</p>
          </template>
        </transition>
      </div>
      <div class="item-table-footer">
        <transition name="fade">
          <div>
            <vs-pagination
              v-if="(histories.length && !isLoading) || currentPage.value !== 1"
              v-model="currentPage"
              :total="totalPage"
              style="justify-content: center; display: flex; width: auto"
            />
          </div>
        </transition>
      </div>
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
import UserInfo from '~/utilities/UserInfo'
import { scrollToTop } from '~/utilities/UtilFunctions'
import { ItemOverviewEntity } from '~/entities/StockItemsEntity'
import ApiRequestParams from '~/utilities/ApiRequestParams'
import ContentHeader, { Categories } from '~/components/molecules/ContentHeader'
import CsvDownloader from '~/components/molecules/CsvDownloader'
import RentalHistoryFilter from '~/components/organisms/RentalHistoryFilter'
import RentalHistories from '~/components/organisms/RentalHistories'
import LoadingSpinner from '~/components/atoms/LoadingSpinner'
import { RentalHistoryOverviewEntity } from '~/entities/RentalHistoriesEntity'

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
    RentalHistoryFilter,
    RentalHistories,
    LoadingSpinner,
  },
  props: {
    histories: {
      type: Array as PropType<RentalHistoryOverviewEntity[]>,
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
    categories: {
      type: Object as PropType<Categories>,
      required: true,
    },
  },
  setup(props: Props, context: SetupContext) {
    const state = reactive({
      currentPage: 1,
      userInfo: UserInfo,
    })

    const onSubmitFilter = (params): void => {
      context.emit('fetchHistories', params)
    }

    watch(
      computed(() => state.currentPage),
      scrollToTop
    )

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
#RentalHistories {
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
