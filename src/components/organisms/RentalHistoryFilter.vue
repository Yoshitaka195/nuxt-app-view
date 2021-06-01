<template>
  <div class="stock-filter">
    <p class="head">絞り込み</p>
    <div class="content">
      <div class="item">
        <p class="title">レンタル開始日</p>
        <!--        <client-only>-->
        <div class=".select">
          <date-picker
            v-model="dateFrom"
            format="YYYY-MM-DD"
            placeholder="選択してください"
            input-class="date-selector"
            :editable="false"
            :disabled-date="disabledFrom"
          />
        </div>
        <p class="wavy-line">〜</p>
        <div class=".select">
          <date-picker
            v-model="dateTo"
            format="YYYY-MM-DD"
            placeholder="選択してください"
            input-class="date-selector"
            :editable="false"
            :disabled-date="disabledTo"
          />
        </div>
        <!--        </client-only>-->
      </div>
      <!-- end filter__item -->
      <div class="item">
        <p class="title">ステータス</p>
        <div v-for="item in checkboxItems" :key="item.label" class="mb10">
          <vs-checkbox
            v-model="item.checked"
            color="#1F74FF"
            :class="{ 'nested-checkbox': item.nested }"
          >
            {{ item.label }}
          </vs-checkbox>
        </div>
      </div>
      <!-- end filter__item -->
      <div class="item mb15">
        <p class="title">詳細検索</p>
        <input
          v-model="searchKeyword"
          type="text"
          class="keyword-input"
          maxlength="25"
          placeholder="アイテム名"
          @keydown.enter="onKeydownEnter($event.keyCode)"
        />
      </div>
      <!-- end filter__item -->
      <vs-button
        color="success"
        type="border"
        :disabled="submitBtnDisabled"
        class="full-width-btn mb10"
        @click="onSubmit"
      >
        絞り込み
      </vs-button>
      <vs-button
        color="success"
        type="border"
        :disabled="submitBtnDisabled"
        class="full-width-btn"
        @click="clearParams"
      >
        条件クリア
      </vs-button>
    </div>
    <!-- end filter__content -->
  </div>
  <!-- end filter -->
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  SetupContext,
  toRefs,
  watch,
} from '@vue/composition-api'
import moment from 'moment'
import { RentalHistoryFilterParams } from '~/pages/lend/index'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {},
  props: {
    submitBtnDisabled: {
      type: Boolean,
      required: true,
    },
  },
  setup(
    { submitBtnDisabled }: { submitBtnDisabled: boolean },
    context: SetupContext
  ) {
    const state = reactive({
      dateFrom: '',
      dateTo: '',
      checkboxItems: [
        {
          label: '取引中',
          checked: true,
          nested: false,
        },
        {
          label: 'レンタル申請中',
          checked: true,
          nested: true,
        },
        {
          label: '承認済み',
          checked: true,
          nested: true,
        },
        {
          label: '集荷受付待ち',
          checked: true,
          nested: true,
        },
        {
          label: '集荷受付完了',
          checked: true,
          nested: true,
        },
        {
          label: '配達中',
          checked: true,
          nested: true,
        },
        {
          label: '配達完了',
          checked: true,
          nested: true,
        },
        {
          label: 'レンタル中',
          checked: true,
          nested: true,
        },
        {
          label: '返却集荷受付完了',
          checked: true,
          nested: true,
        },
        {
          label: '返却配達中',
          checked: true,
          nested: true,
        },
        {
          label: '取引キャンセル',
          checked: true,
          nested: true,
        },
        {
          label: 'レンタル終了',
          checked: true,
          nested: false,
        },
      ],
      searchKeyword: '',
    })

    const parentCheckbox = computed(
      (): boolean => state.checkboxItems[0].checked
    )
    watch(parentCheckbox, (parentValue): void => {
      state.checkboxItems.forEach((item) => {
        if (item.nested) item.checked = parentValue
      })
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
      (): RentalHistoryFilterParams => ({
        dateFrom: from.value,
        dateTo: to.value,
        includeApplying: state.checkboxItems[1].checked,
        includeApproved: state.checkboxItems[2].checked,
        includePickup: state.checkboxItems[3].checked,
        includePickupDone: state.checkboxItems[4].checked,
        includeSent: state.checkboxItems[5].checked,
        includeDeliveryDone: state.checkboxItems[6].checked,
        includeBeingRental: state.checkboxItems[7].checked,
        includeReturnPickupDone: state.checkboxItems[8].checked,
        includeReturnSent: state.checkboxItems[9].checked,
        includeRentalCanceled: state.checkboxItems[10].checked,
        includeRentalFinished: state.checkboxItems[11].checked,
        keyword: state.searchKeyword,
      })
    )

    const onKeydownEnter = (keyCode: number): void => {
      if (keyCode !== 13 || submitBtnDisabled) return
      onSubmit()
    }

    const onSubmit = (): void => {
      context.emit('onSubmitFilter', filterParams.value)
    }

    const clearParams = (): void => {
      state.dateFrom = ''
      state.dateTo = ''
      state.checkboxItems.forEach((item) => {
        item.checked = true
      })
      state.searchKeyword = ''
    }

    return {
      ...toRefs(state),
      disabledFrom,
      disabledTo,
      onKeydownEnter,
      onSubmit,
      clearParams,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.stock-filter {
  font-size: 1.2rem;
  margin-right: 3rem;

  .head {
    font-size: 1.2rem;
    font-weight: bold;
    color: #646464;
    padding: 1.5rem 0 1.5rem 0;
  }
  .content {
    background-color: $white;
    box-shadow: 0 0.4rem 2rem 0 rgba(0, 0, 0, 0.05);
    width: 20rem;
    border-radius: 0.6rem;
    padding: 1.5rem;
  }
  .item {
    padding: 1.5rem 0 1.5rem 0;
    border-bottom: solid 0.1rem $border-color;

    .title {
      font-weight: bold;
      color: #646464;
      margin-bottom: 1.5rem;
    }

    &:first-child {
      padding: 0 0 1.5rem 0;
      border-bottom: solid 0.1rem $border-color;
    }

    .nested-checkbox {
      margin-left: 3rem;
    }
  }
  .select {
    position: relative;
    width: 100%;

    &::after {
      position: absolute;
      content: '';
      right: 1.5rem;
      top: 26%;
      font-family: 'Material Icons', sans-serif;
      // content:"\e313";
      font-size: 1.6rem;
      color: $main-text-color;
    }
  }
  // date-pickerのwidth
  .mx-input-wrapper {
    width: 170px;
  }
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
  .wavy-line {
    text-align: center;
    margin: 0.5rem 0 0.5rem 0;
  }
  .keyword-input {
    width: 100%;
    padding: 0.6rem 1rem;
    box-sizing: border-box;
    border: 0.1rem solid $control-bordr-color;
    border-radius: 0.4rem;
  }
}
</style>
