<template>
  <textarea
    ref="input"
    class="form-text-area"
    :value="value"
    :maxlength="maxLength"
    :rows="rows"
    :placeholder="placeHolder"
    :disabled="disabled"
    @input="onInput($event.target.value)"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  SetupContext,
} from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    maxLength: {
      type: Number as PropType<number>,
      required: true,
    },
    rows: {
      type: Number as PropType<number>,
      default: 2,
    },
    placeHolder: {
      type: String as PropType<string>,
      default: '',
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(_props, context: SetupContext) {
    const input = ref(null)
    const focus = () => {
      input.value.focus({
        preventScroll: true,
      })
    }
    const onInput = (value) => {
      context.emit('input', value)
    }
    const onFocus = () => {
      context.emit('focus')
    }
    const onBlur = () => {
      context.emit('blur')
    }
    return {
      input,
      focus,
      onInput,
      onFocus,
      onBlur,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.form-text-area {
  display: block;
  width: 100%;
  padding: 1.2rem 1.5rem;
  box-sizing: border-box;
  border: 0.1rem solid $control-bordr-color;
  border-radius: 0.4rem;

  &:focus {
    box-shadow: 0 0 0 0.2rem $sub-color;
  }
}
</style>
