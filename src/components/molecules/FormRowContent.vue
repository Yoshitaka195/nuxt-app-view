<template>
  <div class="form-row-content">
    <div class="label-wrapper">
      <slot name="label"></slot>
    </div>
    <div class="content-wrapper">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  // /
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.form-row-content {
  width: 100%;
  display: flex;

  .label-wrapper {
    width: 16rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .content-wrapper {
    width: 30rem;
    display: flex;
    flex-direction: column;
  }
}
</style>
