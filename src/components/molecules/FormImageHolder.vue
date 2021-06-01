<template>
  <div class="form-image-holder">
    <transition name="fade" appear>
      <div v-if="isLoading" key="loading" class="loading-wrapper">
        <loading-spinner sub-color />
      </div>
      <div v-else key="content" class="content" @click="onClickContent">
        <ion-icon
          v-if="!imageSource"
          name="camera-outline"
          class="camera-icon"
        />
        <img v-else :src="imageSource" class="item-image" alt="item-image" />
      </div>
    </transition>
    <transition name="fade">
      <span
        v-if="imageSource && !isLoading"
        class="delete-button"
        @click="onClickDeleteButton"
      >
        <ion-icon name="close-outline" class="close-icon" />
      </span>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import LoadingSpinner from '~/components/atoms/LoadingSpinner'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    LoadingSpinner,
  },
  props: {
    isLoading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    imageSource: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(_props, context: SetupContext) {
    const onClickContent = () => {
      context.emit('onClickContent')
    }
    const onClickDeleteButton = () => {
      context.emit('onClickDeleteButton')
    }
    return {
      onClickContent,
      onClickDeleteButton,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.form-image-holder {
  width: 8rem;
  height: 8rem;
  background-color: #fafafa;
  border: dashed 0.1rem #dcdcdc;
  border-radius: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .loading-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .camera-icon {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      font-size: 3rem;
      color: $sub-color;
    }

    .item-image {
      width: 8rem;
      height: 8rem;
      border-radius: 0.6rem;
      object-fit: cover;
    }
  }

  .delete-button {
    position: absolute;
    right: -1rem;
    top: -1rem;

    .close-icon {
      color: $white;
      font-size: 2.5rem;
      background-color: #787878;
      background-size: 2.5rem;
      border-radius: 3rem;
      -webkit-transition: 0.2s;
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        background-color: $main-color;
      }
    }
  }
}
</style>
