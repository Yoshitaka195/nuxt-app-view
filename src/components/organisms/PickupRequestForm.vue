<template>
  <div class="pickup-request-form">
    <div class="scrollable-area">
      <h3 class="header">集荷依頼（{{ editData.deliveryServiceName }}）</h3>
      <div class="main-contents">
        <p class="description">
          集荷用情報を入力して下さい。{{
            editData.deliveryServiceName
          }}のドライバーが発送元住所へアイテムを受け取りに伺いますので発送手続きをして下さい。<br />
          <span class="caution">※集荷までに必ず梱包を済ませてください。</span>
        </p>
        <h3 class="heading">
          レンタル開始日は{{ formatDate(editData.rentalStartAt) }}です
        </h3>
        <p>レンタル開始日の3日前までに集荷完了してください。</p>
        <h3 class="heading">集荷お伺い先情報</h3>
        <div class="pickup-address">
          <p>お名前：{{ editData.pickupInfo.name }}</p>
          <p>電話番号：{{ editData.pickupInfo.telNumber }}</p>
          <p>〒{{ editData.pickupInfo.postalCode }}</p>
          <p>
            {{
              `${editData.pickupInfo.prefecture.name}${editData.pickupInfo.cityName}${editData.pickupInfo.address}${editData.pickupInfo.streetAddress}`
            }}
          </p>
          <icon-button
            class="address-edit-button"
            icon-type="create-outline"
            text="編集する"
            @click="showAddressEditModal"
          />
          <!--住所変更モーダル -->
          <vs-popup
            class="address-edit-modal"
            title="集荷お伺い先情報変更"
            :active.sync="addressEditModalVisible"
          >
            <pickup-address-edit-modal
              :key="modalRenderKey"
              :edit-data="editData"
              :prefectures="prefectures"
              @submit="submittedAddressEditModal"
            />
          </vs-popup>
        </div>
        <form-row :required="true">
          <template v-slot:label>希望返却先住所</template>
          <template v-slot:content>
            <form-radio-button
              :items="returnAddressItems"
              :name="'preferredReturnAddress'"
              :selected="editData.preferredReturnAddress"
              :disabled="!hasBeenChangedAddress"
              @change="updatePreferredReturnAddress"
            />
          </template>
        </form-row>
        <form-row :required="true">
          <template v-slot:label>集荷希望日</template>
          <template v-slot:content>
            <form-date-picker
              class="w30"
              :value="editData.preferredDate"
              @change="updatePreferredDate"
            />
          </template>
        </form-row>
        <form-row :required="true">
          <template v-slot:label>希望時間帯</template>
          <template v-slot:content>
            <form-select-box
              :items="editData.timeRangeDefs"
              :selected="editData.preferredTimeRange"
              @select="updatePreferredTimeRange"
            />
          </template>
        </form-row>
        <form-row :required="true">
          <template v-slot:label>サイズ</template>
          <template v-slot:content>
            <p>{{ editData.size }}</p>
          </template>
        </form-row>
        <vs-button
          class="submit-button"
          :disabled="submitButtonDisabled"
          @click="submit"
        >
          {{ editData.deliveryServiceName }}へ集荷依頼する
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import { PickupInfoEditDataEntity } from '~/entities/PickupInfoEditDataEntity'
import FormRow from '~/components/molecules/FormRow'
import FormSelectBox from '~/components/atoms/FormSelectBox'
import FormDatePicker from '~/components/atoms/FormDatePicker'
import FormRadioButton from '~/components/atoms/FormRadioButton'
import IconButton from '~/components/atoms/IconButton'
import { formatDate } from '~/utilities/UtilFunctions'
import { CommonDefinitionRepository } from '~/repositories/CommonDefinitionRepository'
import { PrefectureEntity } from '~/entities/PrefecturesEntity'
import PickupAddressEditModal from '~/components/organisms/PickupAddressEditModal'
import ApiRequestParams from '~/utilities/ApiRequestParams'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    FormRow,
    FormSelectBox,
    FormDatePicker,
    FormRadioButton,
    IconButton,
    PickupAddressEditModal,
  },
  props: {
    editData: {
      type: Object as PropType<PickupInfoEditDataEntity>,
      required: true,
    },
  },
  setup(
    { editData }: { editData: PickupInfoEditDataEntity },
    context: SetupContext
  ) {
    const state = reactive({
      submitButtonDisabled: false,
      prefectures: [] as PrefectureEntity[],
      addressEditModalVisible: false,
      modalRenderKey: 0,
      hasBeenChangedAddress: false,
    })

    const returnAddressItems = [
      {
        id: 0,
        name: 'ユーザー情報に登録されている住所',
      },
      {
        id: 1,
        name: '今回の取引の集荷先住所',
      },
    ]

    const showAddressEditModal = () => {
      state.modalRenderKey = Math.random()
      state.addressEditModalVisible = true
    }

    const submittedAddressEditModal = () => {
      state.hasBeenChangedAddress = true
      editData.updatePreferredReturnAddress(1)
      state.addressEditModalVisible = false
    }

    const updatePreferredDate = (date: string) => {
      editData.updatePreferredDate(date)
    }

    const updatePreferredTimeRange = (id: string) => {
      editData.updatePreferredTimeRange(+id)
    }

    const updatePreferredReturnAddress = (id: string) => {
      editData.updatePreferredReturnAddress(+id)
    }

    const commonDefRepo = new CommonDefinitionRepository()
    onMounted(async () => {
      const prefecturesEntity = await commonDefRepo.getPrefectures({
        user_token: ApiRequestParams.USER_TOKEN(),
      })
      state.prefectures = prefecturesEntity.prefectures
      state.modalRenderKey = Math.random()
    })

    const submit = () => {
      if (!editData.preferredDate || editData.preferredTimeRange === -1) {
        alert('未入力の項目があります。')
        return
      }

      context.emit('submit')
    }

    return {
      ...toRefs(state),
      returnAddressItems,
      showAddressEditModal,
      submittedAddressEditModal,
      updatePreferredDate,
      updatePreferredTimeRange,
      updatePreferredReturnAddress,
      submit,
      formatDate,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.pickup-request-form {
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

      > .description {
        margin-top: 2.5rem;

        > .caution {
          color: #f26c5a;
        }
      }

      > .heading {
        margin: 5rem 0 2.5rem 0;
      }

      > .pickup-address {
        border: solid 0.1rem $border-color;
        padding: 2.5rem;
        position: relative;

        > .address-edit-button {
          width: 10rem;
          position: absolute;
          right: 2.5rem;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .w30 {
        width: 30rem;
      }
      > .submit-button {
        width: 20rem;
        height: 4rem;
        margin: 4rem 22.5rem 2.5rem;
      }
    }
  }
}
</style>
