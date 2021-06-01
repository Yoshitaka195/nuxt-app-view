<template>
  <div class="rental-approval-screen">
    <h3 class="header">取引画面</h3>
    <div class="message-area">
      <p class="title">レンタル申請が届いています</p>
      <p class="content">レンタル申請内容の確認をしてください</p>
    </div>
    <div class="main-contents">
      <h3 class="section-title">アイテム情報</h3>
      <div class="item-info section-content">
        <div class="inner">
          <item-image :img-src="rentalRequestInfo.item.imageSource" />
          <div class="text">
            <h3>{{ rentalRequestInfo.item.name }}</h3>
            <evaluation-grade :grade="rentalRequestInfo.item.evaluation" />
          </div>
        </div>
      </div>
      <h3 class="section-title">レンタル申請情報</h3>
      <table class="default-table section-content">
        <tbody>
          <tr class="default-table__tr">
            <th class="default-table__th">注文番号</th>
            <td class="default-table__td">
              {{ rentalRequestInfo.orderNumber }}
            </td>
          </tr>
          <tr class="default-table__tr">
            <th class="default-table__th">レンタル希望期間</th>
            <td class="default-table__td">
              {{
                `${formatDate(rentalRequestInfo.period.from)}〜${formatDate(
                  rentalRequestInfo.period.to
                )}(${dayCount(
                  rentalRequestInfo.period.from,
                  rentalRequestInfo.period.to
                )}日)`
              }}
            </td>
          </tr>
          <tr class="default-table__tr">
            <th class="default-table__th">申請ユーザー</th>
            <td class="default-table__td">
              {{ rentalRequestInfo.user.nickname }}
            </td>
          </tr>
          <tr class="default-table__tr">
            <th class="default-table__th">受け渡し方法</th>
            <td class="default-table__td">
              {{ rentalRequestInfo.deliveryMethod }}
            </td>
          </tr>
          <tr class="default-table__tr">
            <th class="default-table__th">お支払い方法</th>
            <td class="default-table__td">
              {{ rentalRequestInfo.paymentMethod }}
            </td>
          </tr>
        </tbody>
      </table>
      <h3 class="section-title">売上予定表</h3>
      <table class="default-table section-content">
        <tbody>
          <tr
            v-for="(plan, index) in rentalRequestInfo.paymentPlans"
            :key="index"
            class="default-table__tr"
          >
            <th class="default-table__th">{{ formatDate(plan.date) }}</th>
            <td class="default-table__td">
              {{ comma(plan.amount) }}円 (手数料{{
                index === 0 && rentalRequestInfo.deliveryMethod !== '手渡し'
                  ? ' + 配送料'
                  : ''
              }}：{{ comma(plan.fee) }}円)
            </td>
          </tr>
        </tbody>
      </table>
      <h3 class="section-title">売上総額</h3>
      <div class="summaries section-content">
        <div class="detail">
          <h4 class="title">レンタル料金</h4>
          <span>+{{ comma(rentalRequestInfo.rentalAmount) }}円</span>
        </div>
        <div class="detail">
          <h4 class="title">手数料</h4>
          <span>-{{ comma(rentalRequestInfo.rentalFee) }}円</span>
        </div>
        <div class="detail">
          <h4 class="title">配送料（往路）</h4>
          <span>-{{ comma(rentalRequestInfo.shippingAmount) }}円</span>
        </div>
        <div class="result">
          <h4 class="title">売上金額</h4>
          <p>
            <span>{{ comma(rentalRequestInfo.salesAmount) }}</span
            >円
          </p>
        </div>
      </div>
      <vs-button
        class="action-button"
        :disabled="buttonDisabled"
        @click="approve(rentalRequestInfo.id)"
      >
        承認
      </vs-button>
      <vs-button
        class="action-button"
        color="#969696"
        type="border"
        :disabled="buttonDisabled"
        @click="toRejection(rentalRequestInfo.id)"
      >
        非承認
      </vs-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import { RentalRequestInfoEntity } from '~/entities/RentalRequestInfoEntity'
import ItemImage from '~/components/atoms/ItemImage'
import EvaluationGrade from '~/components/atoms/EvaluationGrade'
import { formatDate, dayCount, comma } from '~/utilities/UtilFunctions'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    ItemImage,
    EvaluationGrade,
  },
  props: {
    rentalRequestInfo: {
      type: Object as PropType<RentalRequestInfoEntity>,
      required: true,
    },
  },
  setup(_props, context: SetupContext) {
    const state = reactive({
      buttonDisabled: false,
    })

    const toRejection = (id: number) => {
      state.buttonDisabled = true
      context.root.$router.push(`/lend/${id}/rejection`)
    }

    const approve = (id: number) => {
      state.buttonDisabled = true
      context.emit('approve', id)
    }

    return {
      ...toRefs(state),
      formatDate,
      dayCount,
      comma,
      toRejection,
      approve,
    }
  },
})
</script>

<style lang="scss">
.rental-approval-screen {
  width: 55rem;
  border-radius: 6px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;

  > .header {
    font-size: 1.8rem;
    padding: 2.5rem;
    height: 6.8rem;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    background-color: #fff;
  }

  > .message-area {
    //height: 12.5rem;
    padding: 2.5rem;
    background-color: #fff5e6;

    > .title {
      font-size: 1.6rem;
      font-weight: bold;
      text-align: center;
      margin: 0 auto;
    }

    > .content {
      font-size: 1.4rem;
      padding-top: 2.5rem;
      text-align: center;
    }
  }

  > .main-contents {
    padding: 2.5rem;

    > .section-title {
      font-size: 1.8rem;
      margin-bottom: 2.5rem;
    }

    > .section-content {
      margin-bottom: 5rem;
    }

    > .item-info {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;

      > .inner {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        > .text {
          line-height: 1.45;
          margin-left: 20px;
        }
      }
    }

    > .summaries {
      padding: 2.5rem;
      border: 1px #f0f0f0 solid;

      > .detail,
      > .result {
        display: flex;
        justify-content: space-between;
        align-items: center;

        > .title {
          font-size: 1.4rem;
          font-weight: bold;
        }
      }

      > .result {
        margin-top: 2rem;
        border-top: 1px #f0f0f0 solid;
        padding-top: 1rem;
        > p {
          > span {
            font-size: 2.4rem;
            font-weight: bold;
          }
        }
      }
    }

    > .action-button {
      width: 100%;
    }

    > :last-child {
      margin-top: 2.5rem;
    }
  }
}
</style>
