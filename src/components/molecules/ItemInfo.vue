<template>
  <vs-card class="stock-detail-info">
    <div class="wrap">
      <div class="inner">
        <item-image :img-src="imgSrc" />
        <div class="text">
          <h3>{{ name }}</h3>
          <evaluation-grade :grade="evaluation" />
        </div>
      </div>
      <div v-if="!omitEditButton" class="button-wrapper">
        <icon-button
          icon-type="create-outline"
          text="アイテム編集"
          @click="toEdit"
        />
      </div>
    </div>
  </vs-card>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import IconButton from '~/components/atoms/IconButton.vue'
import ItemImage from '~/components/atoms/ItemImage.vue'
import EvaluationGrade from '~/components/atoms/EvaluationGrade.vue'

type Props = {
  id: number
  imgSrc: string
  name: string
  evaluation: number
}

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    IconButton,
    ItemImage,
    EvaluationGrade,
  },
  props: {
    id: {
      type: Number as PropType<number>,
      required: true,
    },
    imgSrc: {
      type: String as PropType<string>,
      required: true,
    },
    name: {
      type: String as PropType<string>,
      required: true,
    },
    evaluation: {
      type: Number as PropType<number>,
      required: true,
    },
    omitEditButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props: Props, context: SetupContext) {
    const toEdit = (): void => {
      // URLは仮
      context.root.$router.push(`/owned_items_list/edit/${props.id}`)
    }
    return {
      toEdit,
    }
  },
})
</script>

<style lang="scss">
.stock-detail-info {
  .vs-card--content {
    height: 120px;
  }
  .wrap {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    .inner {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .text {
        line-height: 1.45;
        margin-left: 20px;
      }
    }
  }
}
</style>
