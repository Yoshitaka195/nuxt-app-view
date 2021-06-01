<template>
  <vs-card class="stock-detail-table">
    <h3 class="mb25">アイテム情報</h3>
    <table class="default-table">
      <tbody>
        <tr class="default-table__tr">
          <th class="default-table__th">アイテムID</th>
          <td class="default-table__td">I-{{ id }}</td>
        </tr>
        <tr v-if="item.favoriteCount != null" class="default-table__tr">
          <th class="default-table__th">お気に入り数</th>
          <td class="default-table__td">{{ favoriteCount }}</td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">カテゴリー</th>
          <td class="default-table__td">
            {{ category.large }} > {{ category.middle }}
            <template v-if="category.small"> > {{ category.small }} </template>
          </td>
        </tr>
        <tr v-if="item.caption != null" class="default-table__tr">
          <th class="default-table__th">見出し</th>
          <td class="default-table__td">{{ caption }}</td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">商品説明</th>
          <td class="default-table__td">
            {{ description }}
          </td>
        </tr>
        <tr v-if="item.cautions != null" class="default-table__tr">
          <th class="default-table__th">注意事項</th>
          <td class="default-table__td">{{ cautions }}</td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">状態</th>
          <td class="default-table__td">
            {{ condition }}
          </td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">補償希望額</th>
          <td class="default-table__td">
            {{ formatNumber(guaranteeAmount) }}円
          </td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">買い切り</th>
          <td class="default-table__td">
            {{
              purchasing.availability
                ? `対応する（${formatNumber(purchasing.amount)}円）`
                : '対応しない'
            }}
          </td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">オーナーチェンジ</th>
          <td class="default-table__td">
            {{
              ownerChange.availability
                ? `対応する（${formatNumber(ownerChange.amount)}円）`
                : '対応しない'
            }}
          </td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">受け渡し方法</th>
          <td class="default-table__td">
            <p v-for="method in deliveryMethods" :key="method">{{ method }}</p>
          </td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">レンタル料金</th>
          <td class="default-table__td">
            <template v-if="rentalFee.daily">
              日：{{ formatNumber(rentalFee.daily) }}円<br />
            </template>
            <template v-if="rentalFee.weekly">
              週：{{ formatNumber(rentalFee.weekly) }}円<br />
            </template>
            <template v-if="rentalFee.monthly">
              月：{{ formatNumber(rentalFee.monthly) }}円
            </template>
          </td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">購入時の金額</th>
          <td class="default-table__td">{{ formatNumber(boughtPrice) }}円</td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">レンタル日数</th>
          <td class="default-table__td">
            {{ minimumDays === 0 ? '制限なし' : `${minimumDays}日` }}
          </td>
        </tr>
        <tr class="default-table__tr">
          <th class="default-table__th">発送地域</th>
          <td class="default-table__td">
            {{ shippingArea }}
          </td>
        </tr>
        <template v-if="item.stocking != null">
          <tr class="default-table__tr">
            <th class="default-table__th">仕入額</th>
            <td class="default-table__td">
              {{ formatNumber(stocking.amount) }}円
            </td>
          </tr>
          <tr class="default-table__tr">
            <th class="default-table__th">仕入元</th>
            <td class="default-table__td">{{ stocking.source }}</td>
          </tr>
          <tr class="default-table__tr">
            <th class="default-table__th">仕入日</th>
            <td class="default-table__td">{{ formatDate(stocking.date) }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </vs-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import moment from 'moment'
import { ItemEntity } from '~/entities/ItemEntity'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ItemEntity>,
      default: () => {},
    },
  },
  setup({ item }: { item: ItemEntity }) {
    const formatNumber = (num: number): string => num.toLocaleString()
    const deliveryMethods = item.deliveryMethod.split(',')

    const formatDate = (date: string): string => {
      if (!moment(date).isValid()) return ''
      return moment(date).format('YYYY年MM月DD日')
    }

    return {
      ...item,
      deliveryMethods,
      formatNumber,
      formatDate,
    }
  },
})
</script>

<style lang="scss">
.stock-detail-table {
  // 汎用スタイルが当たっているためOK?
}
</style>
