<template>
  <div class="form-row">
    <div class="label-wrapper">
      <requirement-badge :required="required" />
      <span class="label"><slot name="label"></slot></span>
    </div>
    <div class="content-wrapper">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import RequirementBadge from '~/components/atoms/RequirementBadge'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    RequirementBadge,
  },
  props: {
    required: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.form-row {
  width: 100%;
  border-bottom: 1px solid $border-color;
  display: flex;

  > .label-wrapper {
    width: 20%;
    min-width: 26rem;
    display: flex;
    align-items: center;

    .label {
      font-weight: bold;
    }
  }
  > .content-wrapper {
    width: 80%;
    padding: 3rem 0;
  }
}
</style>
