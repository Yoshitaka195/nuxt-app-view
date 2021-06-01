<template>
  <div class="sell-content-wrap">
    <main class="content">
      <div id="sell">
        <div class="flex-content">
          <div class="sell-left-wrap">
            <item-edit-form
              ref="form"
              :edit-data="editData"
              :categories="categories"
              :conditions="conditions"
              :prefectures="prefectures"
              :sizes="sizes"
              :delivery-services="deliveryServices"
              :handing-places="handingPlaces"
              :submit-button-label="submitButtonLabel"
              :minimum-rental-fee="minimumRentalFee"
              :is-loading-minimum-rental-fee="isLoadingMinimumRentalFee"
              @publish="publish"
              @unPublish="unPublish"
              @updateImages="updateImages"
              @deleteImage="deleteImage"
              @updateName="updateName"
              @updateCaption="updateCaption"
              @updateDescription="updateDescription"
              @updateCautions="updateCautions"
              @updateLargeCategory="updateLargeCategory"
              @updateMiddleCategory="updateMiddleCategory"
              @updateSmallCategory="updateSmallCategory"
              @updateCondition="updateCondition"
              @updateGuaranteeAmount="updateGuaranteeAmount"
              @enablePurchasing="enablePurchasing"
              @disablePurchasing="disablePurchasing"
              @updatePurchasingAmount="updatePurchasingAmount"
              @enableOwnerChange="enableOwnerChange"
              @disableOwnerChange="disableOwnerChange"
              @updateOwnerChangeAmount="updateOwnerChangeAmount"
              @enableHanding="enableHanding"
              @disableHanding="disableHanding"
              @updateHandingPlaces="updateHandingPlaces"
              @enableDelivery="enableDelivery"
              @disableDelivery="disableDelivery"
              @updateSize="updateSize"
              @updateDeliveryServices="updateDeliveryServices"
              @updateDailyFee="updateDailyFee"
              @updateWeeklyFee="updateWeeklyFee"
              @updateMonthlyFee="updateMonthlyFee"
              @updateShippingArea="updateShippingArea"
              @updateMinimumDays="updateMinimumDays"
              @updateBoughtPrice="updateBoughtPrice"
              @updateGraceDays="updateGraceDays"
              @updateStockingAmount="updateStockingAmount"
              @updateStockingSource="updateStockingSource"
              @updateStockingDate="updateStockingDate"
              @focus="onFocus"
              @blur="onBlur"
              @submit="submit"
              @onBlurGuaranteeAmount="onBlurGuaranteeAmount"
            />
          </div>
          <div class="sell-right-wrap">
            <item-smartphone-view
              ref="spView"
              :edit-data="editData"
              :categories="categories"
              :conditions="conditions"
              :prefectures="prefectures"
              :handing-places="handingPlaces"
              :exhibitor="exhibitor"
              @activated="activated"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  ref,
  SetupContext,
} from '@vue/composition-api'
import ItemEditForm from '~/components/organisms/ItemEditForm'
import ItemSmartphoneView, {
  ActiveKey,
} from '~/components/organisms/ItemSmartphoneView'
import { ImageEntity } from '~/entities/ImageEntity'
import { ItemConditionsEntity } from '~/entities/ItemConditionsEntity'
import { PrefecturesEntity } from '~/entities/PrefecturesEntity'
import { CategoriesEntity } from '~/entities/CategoriesEntity'
import { ItemEditDataEntity } from '~/entities/ItemEditDataEntity'
import { DeliverySizesEntity } from '~/entities/DeliverySizesEntity'
import { DeliveryServicesEntity } from '~/entities/DeliveryServicesEntity'
import { HandingPlacesEntity } from '~/entities/HandingPlacesEntity'
import { ExhibitorEntity } from '~/entities/ExhibitorEntity'
import { MinimumRentalFeeEntity } from '~/entities/MinimumRentalFeeEntity'

interface Props {
  editData: ItemEditDataEntity
  exhibitor: ExhibitorEntity
}

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    ItemEditForm,
    ItemSmartphoneView,
  },
  props: {
    editData: {
      type: Object as PropType<ItemEditDataEntity>,
      required: true,
    },
    categories: {
      type: Object as PropType<CategoriesEntity>,
      required: true,
    },
    conditions: {
      type: Object as PropType<ItemConditionsEntity>,
      required: true,
    },
    prefectures: {
      type: Object as PropType<PrefecturesEntity>,
      required: true,
    },
    sizes: {
      type: Object as PropType<DeliverySizesEntity>,
      required: true,
    },
    deliveryServices: {
      type: Object as PropType<DeliveryServicesEntity>,
      required: true,
    },
    handingPlaces: {
      type: Object as PropType<HandingPlacesEntity>,
      required: true,
    },
    exhibitor: {
      type: Object as PropType<ExhibitorEntity>,
      required: true,
    },
    submitButtonLabel: {
      type: String as PropType<string>,
      required: true,
    },
    minimumRentalFee: {
      type: Object as PropType<MinimumRentalFeeEntity>,
      required: true,
    },
    isLoadingMinimumRentalFee: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props: Props, context: SetupContext) {
    const publish = () => {
      context.emit('publish')
    }
    const unPublish = () => {
      context.emit('unPublish')
    }
    const updateImages = (image: ImageEntity, index: number) => {
      context.emit('updateImages', image, index)
      spView.value.refreshSwiperKey()
    }
    const deleteImage = (index: number) => {
      context.emit('deleteImage', index)
    }
    const updateName = (value: string) => {
      context.emit('updateName', value)
    }
    const updateCaption = (value: string) => {
      context.emit('updateCaption', value)
    }
    const updateDescription = (value: string) => {
      context.emit('updateDescription', value)
    }
    const updateCautions = (value: string) => {
      context.emit('updateCautions', value)
    }
    const updateLargeCategory = (id: number) => {
      context.emit('updateLargeCategory', id)
    }
    const updateMiddleCategory = (id: number, hasSmallCategory: boolean) => {
      context.emit('updateMiddleCategory', id, hasSmallCategory)
    }
    const updateSmallCategory = (id: number) => {
      context.emit('updateSmallCategory', id)
    }
    const updateCondition = (id: number) => {
      context.emit('updateCondition', id)
    }
    const updateGuaranteeAmount = (value: number) => {
      context.emit('updateGuaranteeAmount', value)
    }
    const enablePurchasing = () => {
      context.emit('enablePurchasing')
    }
    const disablePurchasing = () => {
      context.emit('disablePurchasing')
    }
    const updatePurchasingAmount = (value: number) => {
      context.emit('updatePurchasingAmount', value)
    }
    const enableOwnerChange = () => {
      context.emit('enableOwnerChange')
    }
    const disableOwnerChange = () => {
      context.emit('disableOwnerChange')
    }
    const updateOwnerChangeAmount = (value: number) => {
      context.emit('updateOwnerChangeAmount', value)
    }
    const enableHanding = () => {
      context.emit('enableHanding')
    }
    const disableHanding = () => {
      context.emit('disableHanding')
    }
    const updateHandingPlaces = (values: number[]) => {
      context.emit('updateHandingPlaces', values)
    }
    const enableDelivery = () => {
      context.emit('enableDelivery')
    }
    const disableDelivery = () => {
      context.emit('disableDelivery')
    }
    const updateSize = (id: number) => {
      context.emit('updateSize', id)
    }
    const updateDeliveryServices = (values: number[]) => {
      context.emit('updateDeliveryServices', values)
    }
    const updateDailyFee = (value: number) => {
      context.emit('updateDailyFee', value)
    }
    const updateWeeklyFee = (value: number) => {
      context.emit('updateWeeklyFee', value)
    }
    const updateMonthlyFee = (value: number) => {
      context.emit('updateMonthlyFee', value)
    }
    const updateShippingArea = (id: number) => {
      context.emit('updateShippingArea', id)
    }
    const updateMinimumDays = (value: number) => {
      context.emit('updateMinimumDays', value)
    }
    const updateBoughtPrice = (value: number) => {
      context.emit('updateBoughtPrice', value)
    }
    const updateGraceDays = (value: number) => {
      context.emit('updateGraceDays', value)
    }
    const updateStockingAmount = (value: number) => {
      context.emit('updateStockingAmount', value)
    }
    const updateStockingSource = (value: string) => {
      context.emit('updateStockingSource', value)
    }
    const updateStockingDate = (value: string) => {
      context.emit('updateStockingDate', value)
    }

    const form = ref<InstanceType<typeof ItemEditForm>>(null)
    const spView = ref<InstanceType<typeof ItemSmartphoneView>>(null)
    const onFocus = (key: ActiveKey) => {
      spView.value.activateFromForm(key)
    }
    const onBlur = (key: ActiveKey) => {
      spView.value.deactivate(key)
    }
    const activated = (key: ActiveKey) => {
      form.value.focusTo(key)
    }
    const submit = () => {
      if (props.editData.shippingArea === -1) {
        updateShippingArea(props.exhibitor.prefecture)
      }
      context.emit('submit')
    }
    const onBlurGuaranteeAmount = () => {
      context.emit('onBlurGuaranteeAmount')
    }
    onMounted(() => {
      if (props.editData.shippingArea === -1) {
        updateShippingArea(props.exhibitor.prefecture)
      }
    })
    return {
      // entity更新
      publish,
      unPublish,
      updateImages,
      deleteImage,
      updateName,
      updateCaption,
      updateDescription,
      updateCautions,
      updateLargeCategory,
      updateMiddleCategory,
      updateSmallCategory,
      updateCondition,
      updateGuaranteeAmount,
      enablePurchasing,
      disablePurchasing,
      updatePurchasingAmount,
      enableOwnerChange,
      disableOwnerChange,
      updateOwnerChangeAmount,
      enableHanding,
      disableHanding,
      updateHandingPlaces,
      enableDelivery,
      disableDelivery,
      updateSize,
      updateDeliveryServices,
      updateDailyFee,
      updateWeeklyFee,
      updateMonthlyFee,
      updateShippingArea,
      updateMinimumDays,
      updateBoughtPrice,
      updateGraceDays,
      updateStockingAmount,
      updateStockingSource,
      updateStockingDate,
      onFocus,
      onBlur,
      // スマホビュー関連
      form,
      spView,
      activated,
      submit,
      onBlurGuaranteeAmount,
    }
  },
})
</script>
