<template>
  <div class="content-header">
    <div class="title">
      <h2>{{ category }}</h2>
    </div>
    <ol class="breadcrumb">
      <li class="item">
        <a @click="toHome">
          <ion-icon class="ico-home" name="home-outline" />
        </a>
      </li>
      <li class="item">{{ subCategory }}</li>
      <li v-if="categories.smallCategory" class="item">
        {{ smallCategory }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'

export interface Categories {
  category: string
  subCategory: string
  smallCategory?: string
}

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    categories: {
      type: Object as PropType<Categories>,
      required: true,
    },
  },
  setup({ categories }: { categories: Categories }, context: SetupContext) {
    const toHome = (): void => {
      context.root.$router.push('/')
    }
    return {
      ...categories,
      toHome,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.content-header {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  .title {
    padding-right: 2rem;
    margin-right: 2rem;
    border-right: 1px solid #dcdcdc;
  }
  .breadcrumb {
    display: flex;
    height: 2rem;
    padding: 0;
    margin-bottom: 0;
    list-style: none;
    background-color: transparent;
    border-radius: 0;

    .item {
      position: relative;
      padding-right: 2.6rem;

      &::after {
        position: absolute;
        padding: 0 0.6rem;
        font-family: 'Material Icons', sans-serif;
        content: '\e315';
      }
      &:last-child::after {
        content: none;
      }
      &:last-child {
        padding-right: 0;
      }
    }
    .ico-home {
      font-size: 1.8rem;
      color: $main-color;
    }
  }
}
</style>
