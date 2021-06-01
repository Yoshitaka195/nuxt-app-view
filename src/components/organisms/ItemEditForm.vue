<template>
  <div class="item-edit-form">
    <div class="main-bg">
      <!--      {{ editData }}-->
      <form-row :required="true">
        <template v-slot:label>公開状態</template>
        <template v-slot:content>
          <toggle-switch
            :value="editData.isPublic"
            @onClickTrue="publish"
            @onClickFalse="unPublish"
          >
            <template v-slot:label-true>公開</template>
            <template v-slot:label-false>非公開</template>
          </toggle-switch>
        </template>
      </form-row>
      <form-row :required="true">
        <template v-slot:label>アイテム写真</template>
        <template v-slot:content>
          <item-image-selector
            :images="editData.images"
            @updateImages="updateImages"
            @deleteImage="deleteImage"
          />
          <p v-if="noImageError" class="validation-error">{{ noImageError }}</p>
        </template>
      </form-row>
      <form-row :required="true">
        <template v-slot:label>商品名</template>
        <template v-slot:content>
          <form-text-input
            ref="name"
            :value="editData.name"
            :max-length="25"
            :place-holder="'25文字以内'"
            @input="updateName"
            @focus="onFocus('name')"
            @blur="
              onBlur('name')
              hasBeenBlurredName = true
            "
          />
          <p v-if="nameError" class="validation-error">{{ nameError }}</p>
        </template>
      </form-row>
      <form-row :required="false">
        <template v-slot:label>アイテム見出し文</template>
        <template v-slot:content>
          <form-text-area
            ref="caption"
            :value="editData.caption"
            :max-length="50"
            :place-holder="'50文字以内'"
            @input="updateCaption"
            @focus="onFocus('caption')"
            @blur="onBlur('caption')"
          />
        </template>
      </form-row>
      <form-row :required="true">
        <template v-slot:label>商品説明</template>
        <template v-slot:content>
          <item-description-template-editor
            @insert="insertDescriptionTemplate"
          />
          <form-text-area
            ref="description"
            :value="editData.description"
            :max-length="1000"
            :rows="8"
            :place-holder="'1000文字以内'"
            @input="updateDescription"
            @focus="onFocus('description')"
            @blur="
              onBlur('description')
              hasBeenBlurredDescription = true
            "
          />
          <p v-if="descriptionError" class="validation-error">
            {{ descriptionError }}
          </p>
        </template>
      </form-row>
      <form-row :required="false">
        <template v-slot:label>注意事項</template>
        <template v-slot:content>
          <form-text-area
            ref="cautions"
            :value="editData.cautions"
            :max-length="100"
            :place-holder="'100文字以内'"
            @input="updateCautions"
            @focus="onFocus('cautions')"
            @blur="onBlur('cautions')"
          />
        </template>
      </form-row>
      <form-row :required="true">
        <template v-slot:label>カテゴリー</template>
        <template v-slot:content>
          <form-select-box
            ref="category"
            :items="categories.large"
            :selected="editData.category.large"
            @select="updateLargeCategory"
            @focus="onFocus('category')"
            @blur="onBlur('category')"
          />
          <transition name="slide-left" mode="out-in" appear>
            <div v-if="editData.category.large !== -1" class="mt20">
              <form-select-box
                :key="editData.category.large"
                :items="getCategories('middle', editData.category.large)"
                :selected="editData.category.middle"
                @select="updateMiddleCategory"
                @focus="onFocus('category')"
                @blur="onBlur('category')"
              />
            </div>
          </transition>
          <transition name="slide-left" mode="out-in" appear>
            <div
              v-if="
                editData.category.large !== -1 &&
                editData.category.middle !== -1 &&
                getCategories('small', editData.category.middle).length
              "
              class="mt20"
            >
              <form-select-box
                :key="editData.category.middle"
                :items="getCategories('small', editData.category.middle)"
                :selected="editData.category.small"
                @select="updateSmallCategory"
                @focus="onFocus('category')"
                @blur="
                  onBlur('category')
                  hasBeenChangedSmallCategory = true
                "
              />
            </div>
          </transition>
          <p v-if="categoryError" class="validation-error">
            {{ categoryError }}
          </p>
        </template>
      </form-row>
      <form-row :required="true">
        <template v-slot:label>状態</template>
        <template v-slot:content>
          <form-select-box
            ref="condition"
            :items="conditions.conditions"
            :selected="editData.condition"
            @select="updateCondition"
            @focus="onFocus('condition')"
            @blur="
              onBlur('condition')
              hasBeenBlurredCondition = true
            "
          />
          <p v-if="conditionError" class="validation-error">
            {{ conditionError }}
          </p>
        </template>
      </form-row>
      <form-row :required="true">
        <template v-slot:label>補償希望額</template>
        <template v-slot:content>
          <form-number-input
            ref="purchasing"
            :value="editData.guaranteeAmount"
            :max-length="7"
            place-holder="3000円以上"
            @input="updateGuaranteeAmount"
            @blur="onBlurGuaranteeAmount"
          />
          <p v-if="guaranteeAmountAlert" class="validation-error">
            {{ guaranteeAmountAlert }}
          </p>
        </template>
      </form-row>
      <form-row :required="true">
        <template v-slot:label>買い切り</template>
        <template v-slot:content>
          <toggle-switch
            :value="editData.purchasing.availability"
            @onClickTrue="enablePurchasing"
            @onClickFalse="
              disablePurchasing()
              hasBeenBlurredBoughtPrice = false
            "
          />
        </template>
      </form-row>
      <transition name="slide-left" mode="out-in" appear>
        <form-row v-if="editData.purchasing.availability" :required="true">
          <template v-slot:label>販売価格</template>
          <template v-slot:content>
            <form-number-input
              ref="purchasing"
              :value="editData.purchasing.amount"
              :max-length="7"
              place-holder="0円"
              @input="updatePurchasingAmount"
              @focus="onFocus('purchasing')"
              @blur="onBlur('purchasing')"
            />
          </template>
        </form-row>
      </transition>
      <form-row :required="true">
        <template v-slot:label>オーナーチェンジ</template>
        <template v-slot:content>
          <toggle-switch
            :value="editData.ownerChange.availability"
            @onClickTrue="enableOwnerChange"
            @onClickFalse="
              disableOwnerChange()
              hasBeenBlurredOwnerChangeAmount = false
            "
          />
        </template>
      </form-row>
      <transition name="slide-left" mode="out-in" appear>
        <form-row v-if="editData.ownerChange.availability" :required="true">
          <template v-slot:label>下限価格</template>
          <template v-slot:content>
            <form-number-input
              :value="editData.ownerChange.amount"
              :max-length="7"
              place-holder="50円以上"
              @input="updateOwnerChangeAmount"
              @blur="hasBeenBlurredOwnerChangeAmount = true"
            />
            <p v-if="ownerChangeAmountError" class="validation-error">
              {{ ownerChangeAmountError }}
            </p>
          </template>
        </form-row>
      </transition>
      <form-row :required="true">
        <template v-slot:label>受け渡し方法</template>
        <template v-slot:content>
          <form-row-content>
            <template v-slot:label>手渡し</template>
            <template v-slot:content>
              <toggle-switch
                :value="editData.availableHanding"
                @onClickTrue="enableHanding"
                @onClickFalse="
                  disableHanding()
                  hasBeenChangedHandingPlaces = false
                "
              />
            </template>
          </form-row-content>
          <div class="mt20 mb20">
            <transition name="slide-left" mode="out-in" appear>
              <form-row-content v-if="editData.availableHanding">
                <template v-slot:label>受け渡し場所</template>
                <template v-slot:content>
                  <form-check-boxes
                    :key="editData.availableHanding"
                    :items="handingPlaces.places"
                    :selected="editData.handingPlaces"
                    @change="updateHandingPlaces"
                  />
                  <p v-if="handingPlacesError" class="validation-error">
                    {{ handingPlacesError }}
                  </p>
                </template>
              </form-row-content>
            </transition>
          </div>
          <form-row-content>
            <template v-slot:label>配送</template>
            <template v-slot:content>
              <toggle-switch
                :value="editData.availableDelivery"
                @onClickTrue="enableDelivery"
                @onClickFalse="
                  disableDelivery()
                  hasBeenChangedDeliveryServices = false
                "
              />
            </template>
          </form-row-content>
          <div class="mt20 mb20">
            <transition name="slide-left" mode="out-in" appear>
              <form-row-content v-if="editData.availableDelivery">
                <template v-slot:label>サイズ</template>
                <template v-slot:content>
                  <form-radio-button
                    :items="sizes.sizes"
                    :name="'size'"
                    :selected="editData.size"
                    @change="updateSize"
                  />
                </template>
              </form-row-content>
            </transition>
          </div>
          <transition name="slide-left" mode="out-in" appear>
            <form-row-content
              v-if="editData.availableDelivery && editData.size !== -1"
            >
              <template v-slot:label>サービス</template>
              <template v-slot:content>
                <form-check-boxes
                  v-if="availableDeliveryServices.length"
                  :key="editData.size"
                  :items="availableDeliveryServices"
                  :selected="editData.deliveryServices"
                  @change="updateDeliveryServices"
                />
                <p v-if="noDeliveryServicesError" class="validation-error">
                  {{ noDeliveryServicesError }}<br />
                  配送は"対応しない"を選択してください。
                </p>
              </template>
            </form-row-content>
          </transition>
          <p v-if="deliveryServicesError" class="validation-error">
            {{ deliveryServicesError }}
          </p>
          <p v-if="noDeliverMethodsError" class="validation-error">
            {{ noDeliverMethodsError }}
          </p>
        </template>
      </form-row>
      <form-row :required="true">
        <template v-slot:label>貸し出し金額</template>
        <template v-slot:content>
          <form-row-content>
            <template v-slot:label>
              <p>1日</p>
              <p>
                [{{
                  isLoadingMinimumRentalFee
                    ? '計算中...'
                    : `${minimumRentalFee.daily}円以上`
                }}]
              </p>
            </template>
            <template v-slot:content>
              <form-number-input
                ref="dailyFee"
                :value="editData.rentalFee.daily"
                :max-length="6"
                @input="updateDailyFee"
                @focus="onFocus('dailyFee')"
                @blur="
                  onBlur('dailyFee')
                  hasBeenBlurredDailyFee = true
                "
              />
              <p v-if="dailyFeeError" class="validation-error">
                {{ dailyFeeError }}
              </p>
            </template>
          </form-row-content>
          <div class="mb20 mt20">
            <form-row-content>
              <template v-slot:label>
                <p>1週間(7日)</p>
                <p>
                  [{{
                    isLoadingMinimumRentalFee
                      ? '計算中...'
                      : `${minimumRentalFee.weekly}円以上`
                  }}]
                </p>
              </template>
              <template v-slot:content>
                <form-number-input
                  ref="weeklyFee"
                  :value="editData.rentalFee.weekly"
                  :max-length="7"
                  @input="updateWeeklyFee"
                  @focus="onFocus('weeklyFee')"
                  @blur="
                    onBlur('weeklyFee')
                    hasBeenBlurredWeeklyFee = true
                  "
                />
                <p v-if="weeklyFeeError" class="validation-error">
                  {{ weeklyFeeError }}
                </p>
              </template>
            </form-row-content>
          </div>
          <form-row-content>
            <template v-slot:label>
              <p>1ヶ月(30日)</p>
              <p>
                [{{
                  isLoadingMinimumRentalFee
                    ? '計算中...'
                    : `${minimumRentalFee.monthly}円以上`
                }}]
              </p>
            </template>
            <template v-slot:content>
              <form-number-input
                ref="monthlyFee"
                :value="editData.rentalFee.monthly"
                :max-length="7"
                @input="updateMonthlyFee"
                @focus="onFocus('monthlyFee')"
                @blur="
                  onBlur('monthlyFee')
                  hasBeenBlurredMonthlyFee = true
                "
              />
              <p v-if="monthlyFeeError" class="validation-error">
                {{ monthlyFeeError }}
              </p>
            </template>
          </form-row-content>
        </template>
      </form-row>
      <form-row :required="false">
        <template v-slot:label>発送地域</template>
        <template v-slot:content>
          <form-select-box
            ref="shippingArea"
            :items="prefectures.prefectures"
            :selected="editData.shippingArea"
            @select="updateShippingArea"
            @focus="onFocus('shippingArea')"
            @blur="onBlur('shippingArea')"
          />
        </template>
      </form-row>
      <form-row :required="false">
        <template v-slot:label>レンタル日数</template>
        <template v-slot:content>
          <form-number-input
            ref="minimumDays"
            :value="editData.minimumDays"
            :place-holder="'0日'"
            @input="updateMinimumDays"
            @focus="onFocus('minimumDays')"
            @blur="
              onBlur('minimumDays')
              hasBeenBlurredMinimumDays = true
            "
          />
          <p v-if="minimumDaysError" class="validation-error">
            {{ minimumDaysError }}
          </p>
        </template>
      </form-row>
      <form-row :required="false">
        <template v-slot:label>購入時の金額</template>
        <template v-slot:content>
          <form-number-input
            ref="boughtPrice"
            :value="editData.boughtPrice"
            :place-holder="'0円'"
            :max-length="8"
            @input="updateBoughtPrice"
            @focus="onFocus('boughtPrice')"
            @blur="
              onBlur('boughtPrice')
              hasBeenBlurredBoughtPrice = true
            "
          />
          <p v-if="boughtPriceError" class="validation-error">
            {{ boughtPriceError }}
          </p>
        </template>
      </form-row>
      <form-row :required="false">
        <template v-slot:label>次回レンタル猶予日数</template>
        <template v-slot:content>
          <form-number-input
            :value="editData.graceDays"
            :place-holder="'0日'"
            :max-length="2"
            @input="updateGraceDays"
            @blur="hasBeenBlurredGraceDays = true"
          />
          <p v-if="graceDaysError" class="validation-error">
            {{ graceDaysError }}
          </p>
        </template>
      </form-row>
      <form-row :required="false">
        <template v-slot:label>仕入額</template>
        <template v-slot:content>
          <form-number-input
            :value="editData.stocking.amount"
            :place-holder="'0円'"
            :max-length="8"
            @input="updateStockingAmount"
            @blur="hasBeenBlurredStockingAmount = true"
          />
          <p v-if="stockingAmountError" class="validation-error">
            {{ stockingAmountError }}
          </p>
        </template>
      </form-row>
      <form-row :required="false">
        <template v-slot:label>仕入元</template>
        <template v-slot:content>
          <form-text-input
            :value="editData.stocking.source"
            :max-length="50"
            :place-holder="'例）あまたす商店'"
            @input="updateStockingSource"
          />
        </template>
      </form-row>
      <form-row :required="false">
        <template v-slot:label>仕入日</template>
        <template v-slot:content>
          <form-date-picker
            :value="editData.stocking.date"
            :disabled-date="disabledDate"
            @change="updateStockingDate"
          />
        </template>
      </form-row>
      <div class="submit-button-wrap">
        <vs-button
          :disabled="isPosting || isLoadingMinimumRentalFee"
          color="primary"
          type="filled"
          class="submit-button"
          @click="onClickSubmitButton"
        >
          {{ submitButtonLabel }}
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import moment from 'moment'
import LoadingSpinner from '~/components/atoms/LoadingSpinner.vue'
import FormRow from '~/components/molecules/FormRow'
import FormRowContent from '~/components/molecules/FormRowContent'
import ToggleSwitch from '~/components/atoms/ToggleSwitch'
import FormTextInput from '~/components/atoms/FormTextInput'
import FormNumberInput from '~/components/atoms/FormNumberInput'
import FormTextArea from '~/components/atoms/FormTextArea'
import FormSelectBox from '~/components/atoms/FormSelectBox'
import FormRadioButton from '~/components/atoms/FormRadioButton'
import FormCheckBoxes from '~/components/atoms/FormCheckBoxes'
import FormDatePicker from '~/components/atoms/FormDatePicker'
import ItemImageSelector from '~/components/organisms/ItemImageSelector'
import ItemDescriptionTemplateEditor from '~/components/organisms/ItemDescriptionTemplateEditor'
import { ItemEditDataEntity } from '~/entities/ItemEditDataEntity'
import { CategoriesEntity } from '~/entities/CategoriesEntity'
import { ItemConditionsEntity } from '~/entities/ItemConditionsEntity'
import { PrefecturesEntity } from '~/entities/PrefecturesEntity'
import { DeliverySizesEntity } from '~/entities/DeliverySizesEntity'
import { DeliveryServicesEntity } from '~/entities/DeliveryServicesEntity'
import { HandingPlacesEntity } from '~/entities/HandingPlacesEntity'
import { Active, ActiveKey } from '~/components/organisms/ItemSmartphoneView'
import { MinimumRentalFeeEntity } from '~/entities/MinimumRentalFeeEntity'

interface Props {
  editData: ItemEditDataEntity
  categories: CategoriesEntity
  sizes: DeliverySizesEntity
  deliveryServices: DeliveryServicesEntity
  minimumRentalFee: MinimumRentalFeeEntity
}

export type Refs = { [key: Active]: {} }

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    LoadingSpinner,
    FormRow,
    FormRowContent,
    ToggleSwitch,
    FormTextInput,
    FormNumberInput,
    FormTextArea,
    FormSelectBox,
    FormRadioButton,
    FormCheckBoxes,
    FormDatePicker,
    ItemImageSelector,
    ItemDescriptionTemplateEditor,
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
    const state = reactive({
      hasBeenChangedImages: false,
      hasBeenBlurredName: false,
      hasBeenBlurredDescription: false,
      hasBeenChangedSmallCategory: false,
      hasBeenBlurredCondition: false,
      hasBeenBlurredGuaranteeAmount: false,
      hasBeenBlurredBoughtPrice: false,
      hasBeenBlurredOwnerChangeAmount: false,
      hasBeenChangedHandingPlaces: false,
      hasBeenChangedDeliveryServices: false,
      hasBeenBlurredDailyFee: false,
      hasBeenBlurredWeeklyFee: false,
      hasBeenBlurredMonthlyFee: false,
      hasBeenBlurredMinimumDays: false,
      hasBeenBlurredGraceDays: false,
      hasBeenBlurredStockingAmount: false,
      isPosting: false,
    })

    const noImageError = computed(() =>
      state.hasBeenChangedImages && !props.editData.images.length
        ? '画像を一枚以上選択してください。'
        : ''
    )

    const nameError = computed(() =>
      state.hasBeenBlurredName && !props.editData.name
        ? '商品名は必須項目です。'
        : ''
    )

    const descriptionError = computed(() =>
      state.hasBeenBlurredDescription && !props.editData.description
        ? '商品説明は必須項目です。'
        : ''
    )

    const categoryError = computed(() =>
      state.hasBeenChangedSmallCategory &&
      props.editData.category.small === -1 &&
      getCategories('small', props.editData.category.middle).length
        ? 'カテゴリーを最後まで選択してください。'
        : ''
    )

    const conditionError = computed(() =>
      state.hasBeenBlurredCondition && props.editData.condition === -1
        ? '状態は必須項目です。'
        : ''
    )

    const guaranteeAmountAlert = computed(() =>
      state.hasBeenBlurredGuaranteeAmount &&
      props.editData.guaranteeAmount < 3000
        ? 'SUUTA保険の免責金額は3,000円です'
        : ''
    )

    const boughtPriceError = computed(() =>
      state.hasBeenBlurredBoughtPrice && props.editData.boughtPrice > 10000000
        ? '10,000,000円以下を指定してください。'
        : ''
    )

    const ownerChangeAmountError = computed(() =>
      state.hasBeenBlurredOwnerChangeAmount &&
      props.editData.ownerChange.availability &&
      props.editData.ownerChange.amount < 50
        ? '50円以上を指定してください。'
        : ''
    )

    const handingPlacesError = computed(() =>
      state.hasBeenChangedHandingPlaces &&
      props.editData.availableHanding &&
      props.editData.handingPlaces.length === 0
        ? '1つ以上選択してください。'
        : ''
    )

    const noDeliveryServicesError = computed(() =>
      props.editData.size !== -1 && availableDeliveryServices.value.length === 0
        ? '対応可能なサービスがありません。'
        : ''
    )

    const deliveryServicesError = computed(() =>
      props.editData.availableDelivery &&
      state.hasBeenChangedDeliveryServices &&
      (props.editData.size === -1 ||
        props.editData.deliveryServices.length === 0)
        ? '配送サービスまで選択してください。'
        : ''
    )

    const noDeliverMethodsError = computed(() =>
      (state.hasBeenChangedHandingPlaces ||
        state.hasBeenChangedDeliveryServices) &&
      !props.editData.availableHanding &&
      !props.editData.availableDelivery
        ? '受け渡し方法を一つ以上選択してください。'
        : ''
    )

    const dailyFeeError = computed(() =>
      state.hasBeenBlurredDailyFee &&
      (props.editData.rentalFee.daily < props.minimumRentalFee.daily ||
        props.editData.rentalFee.daily > 300000)
        ? `${props.minimumRentalFee.daily.toLocaleString()}円以上300,000円以下を指定してください。`
        : ''
    )

    const weeklyFeeError = computed(() =>
      state.hasBeenBlurredWeeklyFee &&
      (props.editData.rentalFee.weekly < props.minimumRentalFee.weekly ||
        props.editData.rentalFee.weekly > 1500000)
        ? `${props.minimumRentalFee.weekly.toLocaleString()}円以上1,500,000円以下を指定してください。`
        : ''
    )

    const monthlyFeeError = computed(() =>
      state.hasBeenBlurredMonthlyFee &&
      (props.editData.rentalFee.monthly < props.minimumRentalFee.monthly ||
        props.editData.rentalFee.monthly > 9000000)
        ? `${props.minimumRentalFee.monthly.toLocaleString()}円以上9,000,000円以下を指定してください。`
        : ''
    )

    const minimumDaysError = computed(() =>
      state.hasBeenBlurredMinimumDays && props.editData.minimumDays > 365
        ? '365日を超える設定はできません。'
        : ''
    )

    const graceDaysError = computed(() =>
      state.hasBeenBlurredGraceDays &&
      (props.editData.graceDays < 1 || props.editData.graceDays > 10)
        ? '1日〜10日の範囲で設定してください。'
        : ''
    )

    const stockingAmountError = computed(() =>
      state.hasBeenBlurredStockingAmount &&
      props.editData.stocking.amount > 10000000
        ? '10,000,000円以下を指定してください。'
        : ''
    )

    const existsError = computed(
      (): boolean =>
        !!noImageError.value ||
        !!nameError.value ||
        !!descriptionError.value ||
        !!categoryError.value ||
        !!conditionError.value ||
        // アラートは出すがバリデーションしない
        // !!guaranteeAmountAlert.value ||
        !!boughtPriceError.value ||
        !!ownerChangeAmountError.value ||
        !!handingPlacesError.value ||
        !!noDeliveryServicesError.value ||
        !!noDeliverMethodsError.value ||
        !!deliveryServicesError.value ||
        !!dailyFeeError.value ||
        !!weeklyFeeError.value ||
        !!monthlyFeeError.value ||
        !!minimumDaysError.value ||
        !!graceDaysError.value ||
        !!stockingAmountError.value
    )

    type Category = 'middle' | 'small'
    const getCategories = (category: Category, parentId: number) => {
      return props.categories[category].filter(
        (category) => category.parentId === parentId
      )
    }

    const availableDeliveryServices = computed(() => {
      const selectedSize = props.sizes.sizes.find(
        (size) => size.id === props.editData.size
      ).size
      return props.deliveryServices.services.filter(
        (service) => service.limitSize >= selectedSize
      )
    })

    const publish = () => {
      context.emit('publish')
    }
    const unPublish = () => {
      context.emit('unPublish')
    }
    const updateImages = (dataUrl: string, index: number) => {
      state.hasBeenChangedImages = true
      context.emit('updateImages', dataUrl, index)
    }
    const deleteImage = (index: number) => {
      state.hasBeenChangedImages = true
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
    const insertDescriptionTemplate = (value: string) => {
      context.emit('updateDescription', props.editData.description + value)
    }
    const updateCautions = (value: string) => {
      context.emit('updateCautions', value)
    }
    const updateLargeCategory = (id: string) => {
      context.emit('updateLargeCategory', Number(id))
    }
    const updateMiddleCategory = (id: string) => {
      state.hasBeenChangedSmallCategory = false
      const hasSmallCategory = !!getCategories('small', Number(id)).length
      context.emit('updateMiddleCategory', Number(id), hasSmallCategory)
    }
    const updateSmallCategory = (id: string) => {
      context.emit('updateSmallCategory', Number(id))
    }
    const updateCondition = (id: string) => {
      context.emit('updateCondition', Number(id))
    }
    const updateGuaranteeAmount = (value: number) => {
      context.emit('updateGuaranteeAmount', value)
    }
    const enablePurchasing = () => {
      context.emit('enablePurchasing')
    }
    const disablePurchasing = () => {
      updatePurchasingAmount(0)
      context.emit('disablePurchasing')
    }
    const updatePurchasingAmount = (value: number) => {
      context.emit('updatePurchasingAmount', value)
    }
    const enableOwnerChange = () => {
      context.emit('enableOwnerChange')
    }
    const disableOwnerChange = () => {
      updateOwnerChangeAmount(0)
      context.emit('disableOwnerChange')
    }
    const updateOwnerChangeAmount = (value: number) => {
      context.emit('updateOwnerChangeAmount', value)
    }
    const enableHanding = () => {
      context.emit('enableHanding')
    }
    const disableHanding = () => {
      updateHandingPlaces([])
      context.emit('disableHanding')
    }
    const updateHandingPlaces = (values: number[]) => {
      state.hasBeenChangedHandingPlaces = true
      context.emit('updateHandingPlaces', values)
    }
    const enableDelivery = () => {
      context.emit('enableDelivery')
    }
    const disableDelivery = () => {
      updateSize(-1)
      context.emit('disableDelivery')
    }
    const updateSize = (id: number) => {
      updateDeliveryServices([])
      if (!deliveryServicesError) state.hasBeenChangedDeliveryServices = false
      context.emit('updateSize', id)
    }
    const updateDeliveryServices = (values: number[]) => {
      state.hasBeenChangedDeliveryServices = true
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
    const updateShippingArea = (id: string) => {
      context.emit('updateShippingArea', Number(id))
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

    const onFocus = (key: ActiveKey) => {
      context.emit('focus', key)
    }
    const onBlur = (key: ActiveKey) => {
      context.emit('blur', key)
    }
    const refs: Refs = {
      name: ref(null),
      caption: ref(null),
      description: ref(null),
      cautions: ref(null),
      category: ref(null),
      purchasing: ref(null),
      condition: ref(null),
      shippingArea: ref(null),
      minimumDays: ref(null),
      boughtPrice: ref(null),
      dailyFee: ref(null),
      weeklyFee: ref(null),
      monthlyFee: ref(null),
    }
    const focusTo = (ref: ActiveKey) => {
      refs[ref].value.focus()
      refs[ref].value.$el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }

    const onClickSubmitButton = () => {
      const keys = Object.keys(state)
      keys.forEach((key) => {
        state[key] = true
      })
      // console.log(
      //   noImageError.value,
      //   nameError.value,
      //   descriptionError.value,
      //   categoryError.value,
      //   conditionError.value,
      //   guaranteeAmountError.value,
      //   purchasingAmountError.value,
      //   ownerChangeAmountError.value,
      //   handingPlacesError.value,
      //   noDeliveryServicesError.value,
      //   noDeliverMethodsError.value,
      //   deliveryServicesError.value,
      //   dailyFeeError.value,
      //   weeklyFeeError.value,
      //   monthlyFeeError.value
      // )
      if (existsError.value) {
        alert('正しく入力されていない項目があります。')
        state.isPosting = false
        return
      }
      context.emit('submit')
      keys.forEach((key) => {
        state[key] = false
      })
    }

    const onBlurGuaranteeAmount = () => {
      state.hasBeenBlurredGuaranteeAmount = true
      if (guaranteeAmountAlert.value) return
      context.emit('onBlurGuaranteeAmount')
    }

    const disabledDate = (d): boolean => {
      const date = moment(d)
      const today = moment(new Date())
      return date.isAfter(today)
    }

    return {
      ...toRefs(state),
      noImageError,
      nameError,
      descriptionError,
      categoryError,
      conditionError,
      guaranteeAmountAlert,
      boughtPriceError,
      ownerChangeAmountError,
      handingPlacesError,
      noDeliveryServicesError,
      deliveryServicesError,
      noDeliverMethodsError,
      dailyFeeError,
      weeklyFeeError,
      monthlyFeeError,
      minimumDaysError,
      graceDaysError,
      stockingAmountError,
      getCategories,
      availableDeliveryServices,
      publish,
      unPublish,
      updateImages,
      deleteImage,
      updateName,
      updateCaption,
      updateDescription,
      insertDescriptionTemplate,
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
      ...refs,
      focusTo,
      onClickSubmitButton,
      onBlurGuaranteeAmount,
      disabledDate,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.item-edit-form {
  width: 82rem;
  padding: 8rem 2rem 8rem 2rem;
  position: fixed;
  max-height: 100vh;
  overflow: hidden auto;
  -ms-overflow-style: none; /* IE, Edge 対応 */
  scrollbar-width: none; /* Firefox 対応 */

  &::-webkit-scrollbar {
    /* Chrome, Safari 対応 */
    display: none;
  }

  .main-bg {
    background-color: $white;
    box-shadow: 0 0.4rem 2rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.8rem;
    padding: 2.5rem;
  }

  .submit-button-wrap {
    padding-top: 3rem;
    text-align: center;

    .submit-button {
      width: 20rem;
    }
  }

  .validation-error {
    padding-top: 1rem;
    color: $main-color;
  }
}
</style>
