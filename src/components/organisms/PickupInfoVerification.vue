<template>
  <div class="pickup-info-verification">
    <div class="scrollable-area">
      <h3 class="header">集荷依頼（{{ pickupInfo.deliveryService.name }}）</h3>
      <div class="main-contents">
        <p class="caution">
          ※集荷までに必ず梱包を済ませてください。送り状は{{
            pickupInfo.deliveryService.name
          }}が準備するため不要です。
        </p>
        <h3 class="heading">集荷お伺い先情報</h3>
        <div class="pickup-address">
          <p>お名前：{{ pickupInfo.pickupInfo.name }}</p>
          <p>電話番号：{{ pickupInfo.pickupInfo.telNumber }}</p>
          <p>〒{{ pickupInfo.pickupInfo.postalCode }}</p>
          <p>
            {{
              `${pickupInfo.pickupInfo.prefecture}${pickupInfo.pickupInfo.cityName}${pickupInfo.pickupInfo.address}${pickupInfo.pickupInfo.streetAddress}`
            }}
          </p>
        </div>
        <h3 class="heading">集荷用情報</h3>
        <table class="default-table">
          <tbody>
            <tr class="default-table__tr">
              <th class="default-table__th">希望集荷日</th>
              <td class="default-table__td">
                {{ formatDate(pickupInfo.date) }}
              </td>
            </tr>
            <tr class="default-table__tr">
              <th class="default-table__th">希望時間帯</th>
              <td class="default-table__td">
                {{ pickupInfo.timeRange }}
              </td>
            </tr>
            <tr class="default-table__tr">
              <th class="default-table__th">サイズ</th>
              <td class="default-table__td">
                {{ pickupInfo.size }}
              </td>
            </tr>
          </tbody>
        </table>
        <h3 class="heading">お問い合わせ</h3>
        <p class="description">
          集荷依頼情報は送信されていますが、問い合わせ可能になるまで時間がかかる場合があります。<br />
          ガイド >
          <a
            href="https://suuta.zendesk.com/hc/ja/articles/900003043946--%E4%BD%90%E5%B7%9D%E6%80%A5%E4%BE%BF-%E9%9B%86%E8%8D%B7%E4%BE%9D%E9%A0%BC%E3%82%92%E9%96%93%E9%81%95%E3%81%A3%E3%81%A6%E9%80%81%E4%BF%A1%E3%81%97%E3%81%A6%E3%81%97%E3%81%BE%E3%81%A3%E3%81%9F-%E4%BE%9D%E9%A0%BC%E5%86%85%E5%AE%B9%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%97%E3%81%9F%E3%81%84"
            target="_blank"
            rel="noopener noreferrer"
            >集荷依頼を間違って送信してしまった</a
          >
        </p>
        <div class="contact">
          <span class="heading">お問い合わせ番号</span>
          <span class="slip-number">{{ pickupInfo.slipNumber }}</span>
          <a
            class="delivery-service-search-button"
            :href="pickupInfo.deliveryService.contactUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <general-button
              :text="`${pickupInfo.deliveryService.name} 営業店検索`"
            />
          </a>
        </div>
        <p class="tips">
          集荷依頼を出した「集荷店」を検索し、お問い合わせください。
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import { PickupInfoEntity } from '~/entities/PickupInfoEntity'
import GeneralButton from '~/components/atoms/GeneralButton'
import { formatDate } from '~/utilities/UtilFunctions'
import PickupAddressEditModal from '~/components/organisms/PickupAddressEditModal'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    GeneralButton,
    PickupAddressEditModal,
  },
  props: {
    pickupInfo: {
      type: Object as PropType<PickupInfoEntity>,
      required: true,
    },
  },
  setup(_props, _context: SetupContext) {
    return {
      formatDate,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.pickup-info-verification {
  width: 74rem;
  padding: 8rem 2rem 8rem 2rem;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  max-height: 100vh;
  overflow: hidden auto;
  -ms-overflow-style: none; /* IE, Edge 対応 */
  scrollbar-width: none; /* Firefox 対応 */

  &::-webkit-scrollbar {
    /* Chrome, Safari 対応 */
    display: none;
  }

  > .scrollable-area {
    border-radius: 6px;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    overflow: hidden;

    > .header {
      font-size: 1.8rem;
      padding: 2.5rem;
      height: 6.8rem;
      box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
      position: relative;
      background-color: #fff;
    }

    > .main-contents {
      padding: 0 3rem;

      > .caution {
        margin-top: 2.5rem;
        color: #f26c5a;
      }

      > .heading {
        margin: 5rem 0 2.5rem 0;
      }

      > .pickup-address,
      > .contact {
        border: solid 0.1rem $border-color;
        padding: 2.5rem;
      }

      > .contact {
        position: relative;
        display: flex;
        align-items: center;

        > .heading {
          font-size: 1.4rem;
          font-weight: bold;
          margin-right: 20rem;
        }
        > .delivery-service-search-button {
          position: absolute;
          top: 50%;
          right: 2.5rem;
          transform: translateY(-50%);
        }
      }

      > .description {
        margin-bottom: 2.5rem;
      }

      > .tips {
        color: $light-text-color;
        padding: 1rem 0 2.5rem 0;
      }
    }
  }
}
</style>
