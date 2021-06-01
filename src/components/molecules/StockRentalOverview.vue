<template>
  <tr class="stock-rental-overview">
    <td class="stock-rental-overview__td">
      <circle-icon :img-src="user.imageSource" />
      <p class="user-name">
        <!--<a class="link" @click="onClickUserLink">{{ user.name }}</a>-->
        <!--ユーザー画面への遷移はまだやらない-->
        <a>{{ user.name }}</a>
      </p>
    </td>
    <td class="stock-rental-overview__td stock-rental-overview__td--minw180">
      {{ formatDate(period.from) }}〜{{ formatDate(period.to) }}
    </td>
    <td class="stock-rental-overview__td stock-rental-overview__td--minw110">
      <status-badge :status="status" />
    </td>
    <td
      class="stock-rental-overview__td stock-rental-overview__td--minw110"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
    >
      <evaluation-grade :grade="evaluation" />
      <transition name="tooltip">
        <div v-show="tooltipVisible && comment" class="tooltip-txt">
          {{ comment }}
        </div>
      </transition>
    </td>
    <td class="stock-rental-overview__td stock-rental-overview__td--minw90">
      <icon-button :icon-type="'reader-outline'" @click="onClickDetailBtn" />
    </td>
  </tr>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import moment from 'moment'
import { StockRentalHistory } from '~/entities/StockRentalHistoriesEntity'
import CircleIcon from '~/components/atoms/CircleIcon'
import StatusBadge from '~/components/atoms/StatusBadge'
import EvaluationGrade from '~/components/atoms/EvaluationGrade'
import IconButton from '~/components/atoms/IconButton'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    CircleIcon,
    StatusBadge,
    EvaluationGrade,
    IconButton,
  },
  props: {
    history: {
      type: Object as PropType<StockRentalHistory>,
      required: true,
    },
  },
  setup({ history }: { history: StockRentalHistory }, context: SetupContext) {
    const state = reactive({
      tooltipVisible: false,
    })

    const showTooltip = (): void => {
      state.tooltipVisible = true
    }

    const hideTooltip = (): void => {
      state.tooltipVisible = false
    }

    const formatDate = (date: string): string => {
      return moment(date).format('YYYY年MM月DD日')
    }

    const onClickDetailBtn = (): void => {
      context.emit('onClickDetailBtn')
    }

    const onClickUserLink = (): void => {
      context.emit('onClickUserLink')
    }

    return {
      ...history,
      ...toRefs(state),
      formatDate,
      showTooltip,
      hideTooltip,
      onClickUserLink,
      onClickDetailBtn,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.stock-rental-overview {
  border-top: solid 0.1rem $border-color;
  border-bottom: solid 0.1rem $border-color;

  .user-name {
    margin-left: 1rem;

    .link {
      color: $sub-color;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__td {
    padding: 1.2rem 1.5rem 1.2rem 0;
    vertical-align: middle;

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
    .tooltip-txt {
      font-size: 1.2rem;
      width: 22rem;
      position: absolute;
      padding: 1.5rem;
      border-radius: 0.6rem;
      background-color: $white;
      box-shadow: 0 0.4rem 2rem 0 rgba(0, 0, 0, 0.05);
      z-index: 1;
      -webkit-transition: 0.2s;
      transition: all 0.2s;
      word-break: break-all;
    }
    .tooltip-enter-active,
    .tooltip-leave-active {
      transition: opacity 0.2s;
    }

    .tooltip-enter,
    .tooltip-leave-to {
      opacity: 0;
    }
  }
}
</style>
