<template>
  <div class="item-smartphone-view">
    <div class="main-bg">
      <div class="button-mock-wrap">
        <div class="item">
          <img src="/img/ico/ico-pre-other-btn.svg" />
        </div>
        <div class="item">
          <img src="/img/ico/ico-pre-favorite-btn.svg" />
          <p class="item">0</p>
        </div>
      </div>
      <div class="swiper-wrap">
        <div v-if="!editData.images.length" class="no-images">
          <span class="placeholder">画像を選択してください</span>
        </div>
        <template v-else>
          <swiper :key="swiperKey" :options="swiperOption">
            <swiper-slide
              v-for="(source, index) in editData.images"
              :key="index"
            >
              <img class="swipe-image" :src="source" />
            </swiper-slide>
            <div slot="pagination" class="swiper-pagination"></div>
          </swiper>
        </template>
      </div>
      <smartphone-view-row>
        <span v-if="editData.availableHanding" class="chip-item">手渡し</span>
        <span v-if="editData.purchasing.availability" class="chip-item">
          買い切り
        </span>
        <span v-if="editData.availableDelivery" class="chip-item">配送</span>
      </smartphone-view-row>
      <!-- 項目をクリックしたらclassの「preview__bg-floating」を付与していただけますと幸いです（全項目） -->
      <!-- 他の項目をクリックしたら元々の「preview__bg-floating」は外れるイメージです -->
      <smartphone-view-row
        ref="name"
        :active="active.name"
        floatable
        @click="onClickRow('name')"
      >
        <p class="item-name">
          <template v-if="editData.name">{{ editData.name }}</template>
          <span v-else class="placeholder">商品名</span>
        </p>
      </smartphone-view-row>
      <smartphone-view-row>
        <evaluation-grade :grade="editData.evaluation" />
      </smartphone-view-row>
      <smartphone-view-row
        :active="active.dailyFee"
        floatable
        @click="onClickRow('dailyFee')"
      >
        <p class="daily-fee">
          {{ formatNumber(editData.rentalFee.daily) }}円<span class="small"
            >/日</span
          >
        </p>
      </smartphone-view-row>
      <smartphone-view-row v-if="editData.ownerChange.availability">
        <div class="owner-change">
          <div class="owner-change-btn">オーナーチェンジ</div>
        </div>
      </smartphone-view-row>
      <p class="section-title">商品の説明</p>
      <smartphone-view-row
        ref="caption"
        :active="active.caption"
        floatable
        @click="onClickRow('caption')"
      >
        <div class="caption-wrap">
          <p
            v-if="editData.caption"
            class="caption"
            v-text="editData.caption"
          />
          <span v-else class="placeholder">アイテム見出し文</span>
        </div>
      </smartphone-view-row>
      <smartphone-view-row
        ref="description"
        :active="active.description"
        floatable
        @click="onClickRow('description')"
      >
        <div class="description-wrap">
          <p
            v-if="editData.description"
            class="description"
            v-text="editData.description"
          />
          <span v-else class="placeholder">商品説明</span>
        </div>
      </smartphone-view-row>
      <smartphone-view-row
        ref="cautions"
        :active="active.cautions"
        floatable
        @click="onClickRow('cautions')"
      >
        <div class="cautions-wrap">
          <p
            v-if="editData.cautions"
            class="cautions"
            v-text="editData.cautions"
          />
          <span v-else class="placeholder">注意事項</span>
        </div>
      </smartphone-view-row>
      <p class="section-title">商品の概要</p>
      <smartphone-view-row
        ref="category"
        :active="active.category"
        floatable
        underline
        @click="onClickRow('category')"
      >
        <smartphone-view-row-content>
          <template v-slot:title>カテゴリー</template>
          <template v-slot:content>
            <template v-if="editData.category.large !== -1">
              {{ getCategoryName('large', editData.category.large) }}<br />
            </template>
            <template v-if="editData.category.middle !== -1">
              >{{ getCategoryName('middle', editData.category.middle) }}<br />
            </template>
            <template
              v-if="
                editData.category.small !== -1 &&
                editData.category.small != null
              "
            >
              >{{ getCategoryName('small', editData.category.small) }}
            </template>
          </template>
        </smartphone-view-row-content>
      </smartphone-view-row>
      <smartphone-view-row
        v-if="editData.purchasing.availability"
        ref="purchasing"
        :active="active.purchasing"
        floatable
        underline
        @click="onClickRow('purchasing')"
      >
        <smartphone-view-row-content>
          <template v-slot:title>買い切り価格</template>
          <template v-slot:content>
            {{ formatNumber(editData.purchasing.amount) }}円
          </template>
        </smartphone-view-row-content>
      </smartphone-view-row>
      <smartphone-view-row
        ref="condition"
        :active="active.condition"
        floatable
        underline
        @click="onClickRow('condition')"
      >
        <smartphone-view-row-content>
          <template v-slot:title>状態</template>
          <template v-if="editData.condition !== -1" v-slot:content>
            {{ getConditionName(editData.condition) }}
          </template>
        </smartphone-view-row-content>
      </smartphone-view-row>
      <smartphone-view-row
        ref="shippingArea"
        :active="active.shippingArea"
        floatable
        underline
        @click="onClickRow('shippingArea')"
      >
        <smartphone-view-row-content>
          <template v-slot:title>発送地域</template>
          <template v-slot:content>
            {{
              editData.shippingArea === -1
                ? getPrefectureName(exhibitor.prefecture)
                : getPrefectureName(editData.shippingArea)
            }}
          </template>
        </smartphone-view-row-content>
      </smartphone-view-row>
      <smartphone-view-row
        ref="minimumDays"
        :active="active.minimumDays"
        :underline="!!editData.boughtPrice"
        floatable
        @click="onClickRow('minimumDays')"
      >
        <smartphone-view-row-content>
          <template v-slot:title>レンタル日数</template>
          <template v-slot:content>
            {{
              editData.minimumDays
                ? `${editData.minimumDays}日以上`
                : '制限なし'
            }}
          </template>
        </smartphone-view-row-content>
      </smartphone-view-row>
      <smartphone-view-row
        v-show="editData.boughtPrice"
        ref="boughtPrice"
        :active="active.boughtPrice"
        floatable
        @click="onClickRow('boughtPrice')"
      >
        <smartphone-view-row-content>
          <template v-slot:title>購入時の金額</template>
          <template v-slot:content>
            {{ formatNumber(editData.boughtPrice) }}円
          </template>
        </smartphone-view-row-content>
      </smartphone-view-row>
      <p class="section-title">レンタル料金</p>
      <smartphone-view-row
        ref="dailyFee"
        :active="active.dailyFee"
        floatable
        underline
        @click="onClickRow('dailyFee')"
      >
        <smartphone-view-row-content>
          <template v-slot:title>日（1日）</template>
          <template v-slot:content>
            {{ formatNumber(editData.rentalFee.daily) }}円
          </template>
        </smartphone-view-row-content>
      </smartphone-view-row>
      <smartphone-view-row
        ref="weeklyFee"
        :active="active.weeklyFee"
        floatable
        underline
        @click="onClickRow('weeklyFee')"
      >
        <smartphone-view-row-content>
          <template v-slot:title>週（7日）</template>
          <template v-slot:content>
            {{ formatNumber(editData.rentalFee.weekly) }}円
          </template>
        </smartphone-view-row-content>
      </smartphone-view-row>
      <smartphone-view-row
        ref="monthlyFee"
        :active="active.monthlyFee"
        floatable
        @click="onClickRow('monthlyFee')"
      >
        <smartphone-view-row-content>
          <template v-slot:title>月（30日）</template>
          <template v-slot:content>
            {{ formatNumber(editData.rentalFee.monthly) }}円
          </template>
        </smartphone-view-row-content>
      </smartphone-view-row>
      <template v-if="editData.handingPlaces.length">
        <p class="section-title">受け渡し場所</p>
        <smartphone-view-row floatable>
          <swiper>
            <swiper-slide
              v-for="(place, index) in handingPlaces.places"
              v-show="editData.handingPlaces.includes(place.id)"
              :key="place.id"
            >
              <div class="map-wrap">
                <div class="map">
                  <iframe
                    :src="mapUrls[index]"
                    width="100%"
                    height="auto"
                    frameborder="0"
                    style="border: 0"
                    allowfullscreen=""
                    aria-hidden="false"
                    tabindex="0"
                  />
                </div>
                <p class="title">{{ place.name }}</p>
                <p class="txt">
                  {{ place.description }}
                </p>
              </div>
            </swiper-slide>
          </swiper>
        </smartphone-view-row>
      </template>
      <p class="section-title">出品者情報</p>
      <smartphone-view-row>
        <div class="exhibitor-wrap">
          <circle-icon :img-src="exhibitor.imageSource" />
          <div class="user-data">
            <p class="nickname">{{ exhibitor.nickname }}</p>
            <ul class="user-grade">
              <li class="icon good">
                {{ exhibitor.evaluation.good }}
              </li>
              <li class="icon normal">
                {{ exhibitor.evaluation.normal }}
              </li>
              <li class="icon bad">
                {{ exhibitor.evaluation.bad }}
              </li>
            </ul>
          </div>
        </div>
      </smartphone-view-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import axios from 'axios'
import { HandingPlacesEntity } from '~/entities/HandingPlacesEntity'
import { ItemEditDataEntity } from '~/entities/ItemEditDataEntity'
import SmartphoneViewRow from '~/components/molecules/SmartphoneViewRow'
import SmartphoneViewRowContent from '~/components/molecules/SmartphoneViewRowContent'
import EvaluationGrade from '~/components/atoms/EvaluationGrade'
import CircleIcon from '~/components/atoms/CircleIcon'
import { Refs } from '~/components/organisms/ItemEditForm'
import { CategoriesEntity } from '~/entities/CategoriesEntity'
import { ItemConditionsEntity } from '~/entities/ItemConditionsEntity'
import { PrefecturesEntity } from '~/entities/PrefecturesEntity'
import { ExhibitorEntity } from '~/entities/ExhibitorEntity'
import { GOOGLE_MAP_CONST } from '~/utilities/GoogleMapConst'

export interface Active {
  name: boolean
  caption: boolean
  description: boolean
  cautions: boolean
  category: boolean
  purchasing: boolean
  condition: boolean
  shippingArea: boolean
  minimumDays: boolean
  boughtPrice: boolean
  dailyFee: boolean
  weeklyFee: boolean
  monthlyFee: boolean
}
export type ActiveKey = keyof Active

interface Props {
  editData: ItemEditDataEntity
  categories: CategoriesEntity
  conditions: ItemConditionsEntity
  prefectures: PrefecturesEntity
  handingPlaces: HandingPlacesEntity
}

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    SmartphoneViewRow,
    SmartphoneViewRowContent,
    EvaluationGrade,
    CircleIcon,
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
    handingPlaces: {
      type: Object as PropType<HandingPlacesEntity>,
      required: true,
    },
    exhibitor: {
      type: Object as PropType<ExhibitorEntity>,
      required: true,
    },
  },
  setup(props: Props, context: SetupContext) {
    const state = reactive({
      active: {
        name: false,
        caption: false,
        description: false,
        cautions: false,
        category: false,
        purchasing: false,
        condition: false,
        shippingArea: false,
        minimumDays: false,
        boughtPrice: false,
        dailyFee: false,
        weeklyFee: false,
        monthlyFee: false,
      } as Active,
      swiperKey: 0,
      mapUrls: [] as string[],
    })
    const swiperOption = {
      pagination: {
        // ページネーション設定
        el: '.swiper-pagination',
        clickable: true,
      },
    }

    const refreshSwiperKey = () => {
      state.swiperKey = Math.random()
    }

    const onClickRow = (key: ActiveKey) => {
      if (state.active[key]) {
        deactivate(key)
        return
      }
      activate(key)
    }

    const activate = (key: ActiveKey) => {
      deactivateAll()
      state.active[key] = true
      context.emit('activated', key)
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

    const activateFromForm = (key: ActiveKey) => {
      deactivateAll()
      state.active[key] = true
      refs[key].value.$el.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }

    const deactivate = (key: ActiveKey) => {
      state.active[key] = false
    }

    const deactivateAll = () => {
      Object.keys(state.active).forEach((key) => {
        state.active[key] = false
      })
    }

    const formatNumber = (num: number): string => num.toLocaleString()

    type CategoryKey = 'large' | 'middle' | 'small'
    const getCategoryName = (key: CategoryKey, id: number) => {
      return props.categories[key].find((category) => category.id === id).name
    }

    const getConditionName = (id: number) => {
      return props.conditions.conditions.find(
        (condition) => condition.id === id
      ).name
    }

    const getPrefectureName = (id: number) => {
      return props.prefectures.prefectures.find(
        (prefecture) => prefecture.id === id
      ).name
    }

    const getMapUrl = async (address: string) => {
      const url =
        GOOGLE_MAP_CONST.GEOCODE_URL +
        address +
        '&key=' +
        GOOGLE_MAP_CONST.API_KEY
      /* eslint-disable camelcase */
      const response: {
        data: {
          results: {
            formatted_address: string
            geometry: {
              location: {
                lat: number
                lng: number
              }
              location_type: string
              place_id: string
            }
          }[]
        }
      } = await axios.get(url)
      const lat = response.data.results[0].geometry.location.lat
      const lng = response.data.results[0].geometry.location.lng
      const formattedAddress = response.data.results[0].formatted_address
      return `https://www.google.com/maps?output=embed&z=15&ll=${lat},${lng}&q=${formattedAddress}`
    }

    onMounted(async () => {
      state.mapUrls = await Promise.all(
        props.handingPlaces.places.map((place) => getMapUrl(place.address))
      )
    })

    return {
      ...toRefs(state),
      ...refs,
      swiperOption,
      onClickRow,
      activateFromForm,
      deactivate,
      refreshSwiperKey,
      formatNumber,
      getCategoryName,
      getConditionName,
      getPrefectureName,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.item-smartphone-view {
  font-size: 1.3rem;
  width: 36rem;
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
    background-color: #f5f5f5;
    box-shadow: 0 0.4rem 2rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.8rem;
    padding-bottom: 3rem;
    position: relative;

    .button-mock-wrap {
      position: absolute;
      z-index: 2;
      top: 1.6rem;
      right: 1.6rem;
      display: flex;

      > .item {
        color: $white;
        text-align: center;
        font-size: 1.1rem;
        -webkit-filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.4));
        -moz-filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.4));
        -ms-filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.4));
        filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.4));

        &:first-child {
          margin-right: 1.6rem;
        }
      }
    }

    .swiper-wrap {
      &:hover {
        border-radius: 0.8rem;
        box-shadow: 0 0.1rem 0.6rem 0 rgba(0, 0, 0, 0.2);
        background-color: $border-color;
        cursor: pointer;
      }

      .no-images {
        width: 32rem;
        height: 32rem;
        border-radius: 0.8rem 0.8rem 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .swipe-image {
        width: 32rem;
        height: 32rem;
        object-fit: cover;
        border-radius: 0.8rem 0.8rem 0 0;
      }
      .swiper-pagination-bullet-active {
        background: $main-color;
      }
    }

    .chip-item {
      display: inline-block;
      font-size: 1.1rem;
      font-weight: 700;
      color: #787878;
      border: solid 0.1rem #787878;
      border-radius: 2rem;
      padding: 0.1rem 0.6rem 0.1rem 0.6rem;
      margin-right: 0.4rem;
      text-align: center;
    }

    .item-name {
      font-size: 1.6rem;
      font-weight: 700;
    }

    .daily-fee {
      font-size: 2.4rem;
      font-weight: 700;

      > .small {
        font-size: 1.3rem;
        font-weight: normal;
      }
    }
    .owner-change {
      padding-right: 1.6rem;

      > .owner-change-btn {
        border: solid 0.1rem $sub-color;
        border-radius: 0.4rem;
        background-color: $white;
        color: $sub-color;
        text-align: center;
        padding: 0.6rem;
      }
    }

    .section-title {
      font-size: 1.2rem;
      color: #787878;
      padding: 2.7rem 1.6rem 0.8rem 1.6rem;
    }

    .caption-wrap {
      > .caption {
        font-weight: bold;
        white-space: pre-wrap;
      }
    }

    .description-wrap {
      padding: 0.8rem 0;

      > .description {
        white-space: pre-wrap;
      }
    }

    .cautions-wrap {
      padding: 0.8rem 0;

      > .cautions {
        border: solid 0.1rem $main-color;
        background-color: #fff9f9;
        padding: 1.4rem;
        white-space: pre-wrap;
      }
    }

    &__map {
      padding: 1.6rem 0;
      background-color: $white;

      &:hover {
        border-radius: 0.8rem;
        box-shadow: 0 0.1rem 0.6rem 0 rgba(0, 0, 0, 0.2);
        background-color: $border-color;
        position: relative;
        cursor: pointer;
      }
    }
    .map-wrap {
      border: solid 0.1rem #d2d2d2;
      border-radius: 0.4rem;
      width: 25.6rem;
      margin: 1.6rem auto;

      > .map {
        height: 0;
        overflow: hidden;
        padding-bottom: 56.25%;
        position: relative;

        iframe {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
        }
      }

      > .title {
        font-weight: 700;
        padding: 1.6rem 1.6rem 0.8rem 1.6rem;
      }
      > .txt {
        padding: 0 1.6rem 1.6rem 1.6rem;
      }
    }

    .exhibitor-wrap {
      display: flex;
      padding: 0.4rem 0;

      > .user-data {
        padding-left: 0.8rem;

        > .nickname {
          font-weight: bold;
        }
        > .user-grade {
          display: flex;

          > .icon {
            margin-right: 0.8rem;

            &:last-child {
              margin-right: 0;
            }

            &::before {
              content: '';
              display: inline-block;
              width: 1.3rem;
              height: 1.3rem;
              background-size: contain;
              background-position: center center;
              background-repeat: no-repeat;
              vertical-align: -0.2rem;
            }

            &.good {
              &::before {
                background-image: url('/img/ico/ico-grade-good.svg');
              }
            }
            &.normal {
              &::before {
                background-image: url('/img/ico/ico-grade-usually.svg');
              }
            }
            &.bad {
              &::before {
                background-image: url('/img/ico/ico-grade-bad.svg');
              }
            }
          }
        }
      }
    }

    .placeholder {
      color: #b4b4b4;
    }
  }
}
</style>
