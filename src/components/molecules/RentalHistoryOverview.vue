<template>
  <tr class="rental-history-overview" @click="onClickLinkForDetails">
    <td>
      <item-image :img-src="item.imageSource" />
    </td>
    <td @click.self="onClickLinkForDetails">
      <a>{{ item.name }}</a>
    </td>
    <td class="minw140">
      {{ formatDate(period.from) }}〜<br />
      {{ `${formatDate(period.to)}(${dayCount(period.from, period.to)}日)` }}
    </td>
    <td>
      {{ user.name }}
    </td>
    <td class="minw140">
      <status-badge :status="status" />
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import moment from 'moment'
import StatusBadge from '~/components/atoms/StatusBadge'
import ItemImage from '~/components/atoms/ItemImage'
import { RentalHistoryOverviewEntity } from '~/entities/RentalHistoriesEntity'
import { dayCount } from '~/utilities/UtilFunctions'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    history: {
      type: Object as PropType<RentalHistoryOverviewEntity>,
      required: true,
    },
  },
  components: {
    ItemImage,
    StatusBadge,
  },
  setup(
    { history }: { history: RentalHistoryOverviewEntity },
    context: SetupContext
  ) {
    const onClick = () => {
      context.emit('click')
    }

    const onClickLinkForDetails = (): void => {
      context.emit('onClickLinkForDetails')
    }

    const formatDate = (date: string): string =>
      moment(date).format('YYYY年MM月DD日')

    return {
      ...history,
      onClick,
      onClickLinkForDetails,
      formatDate,
      dayCount,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.rental-history-overview {
  background-color: $white;
  box-shadow: 0 0.4rem 2rem 0 rgba(0, 0, 0, 0.05);
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: $body-bg;
  }

  td {
    padding: 1.5rem 1rem;
    vertical-align: middle;

    &:first-child {
      padding: 1.5rem 0 1.5rem 1.5rem;
      border-top-left-radius: 0.6rem;
      border-bottom-left-radius: 0.6rem;
    }
    &:last-child {
      border-top-right-radius: 0.6rem;
      border-bottom-right-radius: 0.6rem;
    }
    &.minw140 {
      min-width: 14rem;
    }
  }
}
</style>
