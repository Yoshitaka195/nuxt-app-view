<template>
  <input
    ref="input"
    type="text"
    class="form-number-input"
    :value="value"
    :maxlength="maxLength"
    :placeholder="placeHolder"
    :disabled="disabled"
    :class="{ short }"
    oninput="value = value.replace(/[^0-9]+/i,'');"
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
      type: [Number, String] as PropType<number | string>,
      required: true,
    },
    maxLength: {
      type: Number as PropType<number>,
      default: 9,
    },
    placeHolder: {
      type: String as PropType<string>,
      default: '',
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    short: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup({ value }: { value: number | string }, context: SetupContext) {
    const input = ref(null)
    const focus = () => {
      input.value.focus({
        preventScroll: true,
      })
    }
    const onInput = (newValue: string) => {
      const casted = typeof value === 'number' ? Number(newValue) : newValue
      context.emit('input', casted)
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

.form-number-input {
  width: 100%;
  padding: 1.2rem 1.5rem;
  box-sizing: border-box;
  border: 0.1rem solid $control-bordr-color;
  border-radius: 0.4rem;

  &.short {
    width: 50%;
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem $sub-color;
  }
}
</style>
