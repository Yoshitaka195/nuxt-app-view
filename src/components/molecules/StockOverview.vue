<template>
  <tr class="stock-overview" @click.self="onClickLinkForDetails">
    <td @click.self="onClickLinkForDetails">
      <item-image :img-src="imageSource" @click="onClickLinkForDetails" />
    </td>
    <td @click.self="onClickLinkForDetails">
      <a @click="onClickLinkForDetails">{{ name }}</a>
    </td>
    <td class="minw110" @click.self="onClickLinkForDetails">
      <status-badge :status="status" @click="onClickStatusBtn" />
    </td>
    <td class="minw130" @click.self="onClickLinkForDetails">
      {{ formattedDate }}
    </td>
    <td class="minw100" @click.self="onClickLinkForDetails">
      {{ rentalCount }}回
    </td>
    <td class="minw120" @click.self="onClickLinkForDetails">
      <icon-button icon-type="create-outline" @click="onClickEditBtn" />
    </td>
  </tr>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  SetupContext,
} from '@vue/composition-api'
import moment from 'moment'
import StatusBadge from '~/components/atoms/StatusBadge'
import IconButton from '~/components/atoms/IconButton'
import ItemImage from '~/components/atoms/ItemImage'
import { ItemOverviewEntity } from '~/entities/StockItemsEntity'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ItemOverviewEntity>,
      required: true,
    },
  },
  components: {
    IconButton,
    ItemImage,
    StatusBadge,
  },
  setup({ item }: { item: ItemOverviewEntity }, context: SetupContext) {
    const onClick = () => {
      context.emit('click')
    }

    const onClickLinkForDetails = (): void => {
      context.emit('onClickLinkForDetails')
    }

    const onClickStatusBtn = (): void => {
      context.emit('onClickStatusBtn')
    }

    const onClickEditBtn = (): void => {
      context.emit('onClickEditBtn')
    }

    const formattedDate = computed((): string =>
      moment(item.listingDate).format('YYYY年MM月DD日')
    )

    return {
      ...item,
      onClick,
      onClickLinkForDetails,
      onClickStatusBtn,
      onClickEditBtn,
      formattedDate,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.stock-overview {
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
    &.minw100 {
      min-width: 10rem;
    }
    &.minw110 {
      min-width: 11rem;
    }
    &.minw120 {
      min-width: 12rem;
    }
    &.minw130 {
      min-width: 13rem;
    }
  }
}
</style>
