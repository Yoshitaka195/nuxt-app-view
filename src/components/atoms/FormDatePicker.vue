<template>
  <div class="form-date-picker">
    <date-picker
      format="YYYY-MM-DD"
      input-class="date-selector"
      :value-type="'YYYY-MM-DD'"
      :value="value"
      :placeholder="placeHolder"
      :editable="false"
      :disabled="disabled"
      :disabled-date="disabledDate"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    placeHolder: {
      type: String as PropType<string>,
      default: '選択してください',
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    disabledDate: {
      type: Function as PropType<() => boolean>,
      default: () => false,
    },
  },
  setup(_props, context: SetupContext) {
    const onChange = (value: string) => {
      context.emit('change', value || '')
    }
    return {
      onChange,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.form-date-picker {
  .mx-datepicker {
    width: 100%;

    .date-selector {
      width: 100%;
      padding: 1.2rem 1.5rem;
      box-sizing: border-box;
      border: 0.1rem solid $control-bordr-color;
      border-radius: 0.4rem;
    }
  }
}
</style>
