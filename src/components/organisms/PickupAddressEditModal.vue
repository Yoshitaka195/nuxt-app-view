<template>
  <div class="pickup-address-edit-modal">
    <form-row :required="true">
      <template v-slot:label>お名前</template>
      <template v-slot:content>
        <form-text-input
          :value="pickupInfo.name"
          :max-length="120"
          place-holder="例）田中太郎"
          @input="updateName"
        />
      </template>
    </form-row>
    <form-row :required="true">
      <template v-slot:label>電話番号</template>
      <template v-slot:content>
        <form-number-input
          :value="pickupInfo.telNumber"
          :max-length="9"
          place-holder="09012345678"
          @input="updateTelNumber"
        />
      </template>
    </form-row>
    <form-row :required="true">
      <template v-slot:label>住所</template>
      <template v-slot:content>
        <div class="address-row">
          <p class="item">〒郵便番号（自動で住所が入力されます）</p>
          <form-number-input
            :value="pickupInfo.postalCode"
            place-holder="1234567"
            :max-length="7"
            @input="updatePostalCode"
          />
        </div>
        <div class="address-row">
          <p class="item">都道府県</p>
          <form-text-input
            :value="pickupInfo.prefecture.name"
            :max-length="10"
            disabled
          />
        </div>
        <div class="address-row">
          <p class="item">住所１</p>
          <form-text-input
            :value="pickupInfo.cityName"
            place-holder="例）港区"
            :max-length="30"
            disabled
          />
        </div>
        <div class="address-row">
          <p class="item">住所２</p>
          <form-text-input
            :value="pickupInfo.address"
            place-holder="例）六本木○-○-○"
            :max-length="30"
            @input="updateAddress"
          />
        </div>
        <div class="address-row">
          <p class="item">建物名など（任意）</p>
          <form-text-input
            :value="pickupInfo.streetAddress"
            place-holder="例）建物名○○○号"
            :max-length="20"
            @input="updateStreetAddress"
          />
        </div>
      </template>
    </form-row>
    <p class="tips">
      集荷先情報を変更してもユーザー登録情報は変更されません。<br />
      この取引のみで有効な集荷先情報として登録されます。
    </p>
    <div class="button-area">
      <vs-button
        class="submit-button"
        :disabled="submitButtonDisabled"
        @click="submit"
      >
        変更する
      </vs-button>
    </div>
  </div>
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
import FormRow from '~/components/molecules/FormRow'
import FormTextInput from '~/components/atoms/FormTextInput'
import FormNumberInput from '~/components/atoms/FormNumberInput'
import { PickupInfoEditDataEntity } from '~/entities/PickupInfoEditDataEntity'
import { getAddressByZipCode } from '~/utilities/UtilFunctions'
import { PrefectureEntity } from '~/entities/PrefecturesEntity'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    FormRow,
    FormTextInput,
    FormNumberInput,
  },
  props: {
    editData: {
      type: Object as PropType<PickupInfoEditDataEntity>,
      required: true,
    },
    prefectures: {
      type: Array as PropType<PrefectureEntity[]>,
      required: true,
    },
  },
  setup(
    {
      editData,
      prefectures,
    }: { editData: PickupInfoEditDataEntity; prefectures: PrefectureEntity[] },
    context: SetupContext
  ) {
    const state = reactive({
      pickupInfo: {
        name: editData.pickupInfo.name,
        telNumber: editData.pickupInfo.telNumber,
        postalCode: editData.pickupInfo.postalCode,
        prefecture: editData.pickupInfo.prefecture,
        cityName: editData.pickupInfo.cityName,
        address: editData.pickupInfo.address,
        streetAddress: editData.pickupInfo.streetAddress,
      } as PickupInfoEditDataEntity['pickupInfo'],
      isChanged: {
        name: false,
        telNumber: false,
        postalCode: false,
        prefecture: false,
        cityName: false,
        address: false,
        streetAddress: false,
      } as { [key: keyof PickupInfoEditDataEntity['pickupInfo']]: boolean },
    })

    const updateChangeStatus = (
      key: keyof PickupInfoEditDataEntity['pickupInfo']
    ) => {
      if (key === 'prefecture') {
        if (editData.pickupInfo[key].id === state.pickupInfo[key].id) {
          state.isChanged[key] = false
        } else {
          state.isChanged[key] = true
        }
        return
      }

      if (editData.pickupInfo[key] === state.pickupInfo[key]) {
        state.isChanged[key] = false
        return
      }
      state.isChanged[key] = true
    }

    const updateName = (value: string) => {
      state.pickupInfo.name = value
      updateChangeStatus('name')
    }

    const updateTelNumber = (value: string) => {
      state.pickupInfo.telNumber = value
      updateChangeStatus('telNumber')
    }

    const updatePostalCode = (value: string) => {
      state.pickupInfo.postalCode = value
      updateChangeStatus('postalCode')
      fetchAddress(value)
    }

    const updatePrefecture = (id: number) => {
      state.pickupInfo.prefecture = prefectures.find(
        (prefecture) => prefecture.id === id
      )
      updateChangeStatus('prefecture')
    }

    const updateCityName = (value: string) => {
      state.pickupInfo.cityName = value
      updateChangeStatus('cityName')
    }

    const updateAddress = (value: string) => {
      state.pickupInfo.address = value
      updateChangeStatus('address')
    }

    const updateStreetAddress = (value: string) => {
      state.pickupInfo.streetAddress = value
      updateChangeStatus('streetAddress')
    }

    const submitButtonDisabled = computed(
      () =>
        Object.keys(state.isChanged).every((key) => !state.isChanged[key]) ||
        !state.pickupInfo.name ||
        !state.pickupInfo.telNumber ||
        !state.pickupInfo.postalCode.match(/^\d{7}$/) ||
        !state.pickupInfo.address
    )

    const fetchAddress = async (zipcode: string) => {
      if (zipcode.match(/^\d{7}$/)) {
        const response = await getAddressByZipCode(zipcode)

        if (!response.data.results) return

        const address = response.data.results[0]
        updatePrefecture(+address.prefcode)
        updateCityName(address.address2)
        updateAddress(address.address3)
        updateStreetAddress('')
      }
    }

    const submit = () => {
      editData.updatePickupInfo(state.pickupInfo)
      context.emit('submit')
    }

    return {
      ...toRefs(state),
      updateName,
      updateTelNumber,
      updatePostalCode,
      updateAddress,
      updateStreetAddress,
      submitButtonDisabled,
      submit,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.pickup-address-edit-modal {
  .address-row {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    > .item {
      margin-bottom: 1rem;
    }
  }

  > .tips {
    color: $light-text-color;
    padding: 2rem 0;
  }

  > .button-area {
    display: flex;
    justify-content: center;

    > .submit-button {
      width: 20rem;
    }
  }
}
</style>
