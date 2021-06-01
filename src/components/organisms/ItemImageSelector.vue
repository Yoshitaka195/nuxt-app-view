<template>
  <div class="item-image-selector">
    <form-image-holder
      v-for="n of 10"
      :key="n"
      :image-source="n - 1 < images.length ? images[n - 1] : ''"
      @onClickContent="onClickContent(n - 1)"
      @onClickDeleteButton="onClickDeleteButton(n - 1)"
    />
    <vs-popup title="画像選択" :active.sync="modalVisible">
      <div class="image-cropper-modal">
        <p>
          下の枠をクリックして画像を選択するか、画像をドラッグ&ドロップしてください。<br />
          画像選択後: ドラッグで位置調整、マウスホイールでズーム （最大1MB）
        </p>
        <div class="cropper-wrap">
          <croppa
            :key="currentImage"
            ref="Croppa"
            v-model="croppa"
            :width="250"
            :height="250"
            :quality="4"
            :placeholder="'画像を選択してください。'"
            :placeholder-font-size="16"
            :file-size-limit="1048576"
            accept="image/png,image/jpeg"
            show-loading
            prevent-white-space
            @new-image-drawn="updateDataUrl"
            @image-remove="removeDataUrl"
            @file-size-exceed="onFileSizeExceed"
          >
            <img
              v-if="initialImage"
              slot="initial"
              :src="initialImage"
              alt="item-image"
            />
          </croppa>
        </div>
        <div class="button-wrap">
          <vs-button
            :disabled="uploadButtonDisabled"
            color="success"
            type="filled"
            class="btn"
            @click.native="updateImage"
          >
            決定
          </vs-button>
          <icon-button
            icon-type="reload-outline"
            :disabled="!dataUrl"
            @click="croppa.rotate()"
          />
        </div>
      </div>
    </vs-popup>
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
  watch,
} from '@vue/composition-api'
import FormImageHolder from '~/components/molecules/FormImageHolder'
import IconButton from '~/components/atoms/IconButton'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    FormImageHolder,
    IconButton,
  },
  props: {
    images: {
      type: Array as PropType<String[]>,
      required: true,
    },
  },
  setup({ images }: { images: string[] }, context: SetupContext) {
    const state = reactive({
      modalVisible: false,
      currentImage: -1,
      initialImage: '',
      dataUrl: '',
      croppa: {},
    })

    const Croppa = ref(null)
    const uploadButtonDisabled = computed(() => !state.dataUrl)
    watch(
      computed(() => state.modalVisible),
      (modalVisible) => {
        if (!modalVisible) {
          state.dataUrl = ''
          state.initialImage = ''
        }
        Croppa.value.refresh()
      }
    )

    const updateImage = () => {
      updateDataUrl()
      context.emit('updateImages', state.dataUrl, state.currentImage)
      removeDataUrl()
      state.modalVisible = false
    }

    const onClickContent = (index: number) => {
      state.currentImage = index
      state.initialImage = index < images.length ? images[index] : ''
      state.modalVisible = true
    }
    const onClickDeleteButton = (index: number) => {
      context.emit('deleteImage', index)
    }
    const updateDataUrl = () => {
      state.dataUrl = Croppa.value.generateDataUrl('image/png', 0.7)
    }
    const removeDataUrl = () => {
      state.dataUrl = ''
    }
    const onFileSizeExceed = () => {
      alert('ファイルサイズが大きすぎます。\n1MB以下の画像を選択してください。')
    }
    return {
      Croppa,
      ...toRefs(state),
      // initialImage,
      uploadButtonDisabled,
      onClickContent,
      onClickDeleteButton,
      updateImage,
      updateDataUrl,
      removeDataUrl,
      onFileSizeExceed,
    }
  },
})
</script>

<style lang="scss">
.item-image-selector {
  width: 100%;
  max-width: 47rem;
  height: 17.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
}
.image-cropper-modal {
  width: 100%;
  height: 38rem;

  .cropper-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 2rem;
    border-bottom: 0.1rem solid #f0f0f0;
  }

  .button-wrap {
    padding-top: 2rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;

    .btn {
      width: 14rem;
    }
  }
}
</style>
