<template>
  <div class="stock-rental-filter">
    <div class="dialog">
      <div class="dialog__form-wrap mb30">
        <p class="dialog__form-title">レンタル開始日</p>
        <div>
          <date-picker
            v-model="dateFrom"
            format="YYYY-MM-DD"
            placeholder="選択してください"
            input-class="date-selector"
            popup-class="aaa"
            :editable="false"
            :disabled-date="disabledFrom"
          />
        </div>
        <p class="dialog__select-wavyline">〜</p>
        <div>
          <date-picker
            v-model="dateTo"
            format="YYYY-MM-DD"
            placeholder="選択してください"
            input-class="date-selector"
            :editable="false"
            :disabled-date="disabledTo"
          />
        </div>
      </div>
    </div>
    <div class="dialog-btn-wrap dialog-btn-wrap--right">
      <vs-button
        color="gray"
        type="filled"
        class="dialog-btn mr10"
        @click="onClickCancelBtn"
      >
        キャンセル
      </vs-button>
      <vs-button
        color="primary"
        type="filled"
        class="dialog-btn"
        @click="onClickFilterBtn"
      >
        絞り込む
      </vs-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import moment from 'moment'
import { StockRentalHistoryPeriod } from '~/pages/owned_items_list/_id'

export default defineComponent({
  setup(_props, context: SetupContext) {
    const state = reactive({
      dateFrom: '',
      dateTo: '',
    })

    const disabledFrom = (d): boolean => {
      const date = moment(d)
      const today = moment(new Date())
      if (!state.dateTo) {
        return date.isAfter(today)
      }
      return (
        date.isAfter(today) ||
        date.isSameOrAfter(moment(state.dateTo).add(1, 'day'))
      )
    }

    const disabledTo = (d): boolean => {
      const date = moment(d)
      const today = moment(new Date())
      return (
        date.isAfter(today) ||
        date.isSameOrBefore(moment(state.dateFrom).add(-1, 'day'))
      )
    }

    const from = computed((): string =>
      moment(state.dateFrom).isValid()
        ? moment(state.dateFrom).format('YYYY-MM-DD')
        : ''
    )

    const to = computed((): string =>
      moment(state.dateTo).isValid()
        ? moment(state.dateTo).format('YYYY-MM-DD')
        : ''
    )

    const filterParams = computed(
      (): StockRentalHistoryPeriod => {
        return {
          from: from.value,
          to: to.value,
        }
      }
    )

    const onClickCancelBtn = (): void => {
      context.emit('onClickFilterModalBtn')
    }

    const onClickFilterBtn = (): void => {
      context.emit('onClickFilterModalBtn', filterParams.value)
    }

    return {
      ...toRefs(state),
      disabledFrom,
      disabledTo,
      onClickCancelBtn,
      onClickFilterBtn,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';
.stock-rental-filter {
  // date-picker
  .mx-input-wrapper {
    width: 250px;
    .date-selector {
      width: 100%;
      -webkit-appearance: none;
      appearance: none;
      background-color: $white;
      padding: 0.6rem 1rem;
      box-sizing: border-box;
      border: 0.1rem solid $control-bordr-color;
      border-radius: 0.4rem;
    }
  }
}
</style>
