<template>
  <vs-card class="stock-rental-histories">
    <div slot="header" class="header__flex">
      <h3>取引履歴</h3>
      <p class="header__filter" @click="onClickFilterButton">
        <ion-icon name="options-outline" class="header__filter-ico" />
        絞り込み
      </p>
    </div>
    <div class="stock-rental-history">
      <transition name="fade" mode="out-in">
        <div v-if="isLoading" class="loading-wrapper">
          <loading-spinner />
        </div>
        <template v-else>
          <table v-if="histories.length" class="stock-rental-history__table">
            <thead class="stock-rental-history__thead">
              <tr>
                <th
                  v-for="column in columns"
                  :key="column"
                  class="stock-rental-history__thead-th"
                >
                  {{ column }}
                </th>
              </tr>
            </thead>
            <tbody class="stock-rental-history__tbody">
              <template v-for="(history, idx) in histories">
                <stock-rental-overview
                  v-if="showAll || idx < maxDisplay"
                  :key="history.id"
                  :history="history"
                  @onClickUserLink="toUserPage(history.user.id)"
                  @onClickDetailBtn="toHistoryDetail(history.id)"
                />
              </template>
            </tbody>
          </table>
          <p v-else class="not-exists-history">取引履歴がありません。</p>
        </template>
      </transition>
    </div>
    <div slot="footer">
      <p>
        <transition name="fade">
          <span
            v-if="toggleBtnVisible && !isLoading"
            class="display-toggle-btn"
            @click="toggleShowMode"
          >
            {{ toggleBtnText }}
          </span>
        </transition>
      </p>
    </div>
  </vs-card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import { StockRentalHistory } from '~/entities/StockRentalHistoriesEntity'
import StockRentalOverview from '~/components/molecules/StockRentalOverview'
import LoadingSpinner from '~/components/atoms/LoadingSpinner'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: { StockRentalOverview, LoadingSpinner },
  props: {
    histories: {
      type: Array as PropType<StockRentalHistory[]>,
      default: () => [],
    },
    isLoading: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(
    { histories }: { histories: StockRentalHistory[] },
    context: SetupContext
  ) {
    const state = reactive({
      showAll: false,
    })
    const maxDisplay = 3
    const toggleShowMode = (): void => {
      state.showAll = !state.showAll
    }

    const toggleBtnVisible = computed((): boolean => {
      return !!histories.length && histories.length > maxDisplay
    })
    const toggleBtnText = computed((): string => {
      return state.showAll ? '表示を少なくする' : 'もっと見る'
    })

    const columns = [
      'ユーザー',
      'レンタル期間',
      'ステータス',
      '評価',
      '取引詳細',
    ]

    const onClickFilterButton = (): void => {
      context.emit('showFilterModal')
    }

    const toUserPage = (id: number): void => {
      console.log(`ユーザーID${id}のユーザー画面へ遷移する`)
      // context.root.$router.push()
    }

    const toHistoryDetail = (id): void => {
      context.root.$router.push(`/lend/${id}`)
    }

    return {
      ...toRefs(state),
      maxDisplay,
      toggleShowMode,
      toggleBtnVisible,
      toggleBtnText,
      columns,
      onClickFilterButton,
      toUserPage,
      toHistoryDetail,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.stock-rental-histories {
  .header {
    &__flex {
      display: flex;
      justify-content: space-between;
    }
    &__filter {
      color: $sub-color;
      cursor: pointer;
    }
    &__filter-ico {
      font-size: 2rem;
      vertical-align: -0.5rem;
      margin-right: 0.2rem;
    }
  }
  .stock-rental-history {
    margin-top: -2.5rem;

    .loading-wrapper {
      width: 100%;
      //min-height: 100px;
      //padding-top: 50px;
      padding-top: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__table {
      width: 100%;
    }
    &__thead {
      margin-bottom: 1rem;
    }
    &__thead-th {
      font-size: 1.2rem;
      color: #646464;
      padding: 2.5rem 1.5rem 1.2rem 0;
    }
    &__tbody {
      max-height: 20rem;
      overflow-y: scroll;
    }
    &__tr {
      border-top: solid 0.1rem $border-color;
      border-bottom: solid 0.1rem $border-color;
    }
    &__td {
      padding: 1.2rem 1.5rem 1.2rem 0;

      &:first-child {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
      }
      &--minw90 {
        min-width: 9rem;
      }
      &--minw110 {
        min-width: 11rem;
      }
      &--minw180 {
        min-width: 24rem;
      }
    }
    &__img {
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
      object-fit: cover;
      border-radius: 4rem;
    }
  }
  .display-toggle-btn {
    color: $sub-color;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
  .not-exists-history {
    padding-top: 3rem;
    text-align: center;
  }
}
</style>
