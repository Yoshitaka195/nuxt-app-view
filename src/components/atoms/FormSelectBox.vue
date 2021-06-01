<template>
  <div class="form-select-box">
    <select
      ref="select"
      class="select-box"
      :value="selected"
      :disabled="disabled"
      @change="onChange($event.target.value)"
      @focus="onFocus"
      @blur="onBlur"
    >
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  SetupContext,
} from '@vue/composition-api'

interface Item {
  id: number
  name: string
}

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Item[]>,
      default: () => [],
    },
    selected: {
      type: Number as PropType<number>,
      default: -1,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup({ items }: { items: Item }, context: SetupContext) {
    const initialOption: Item[] = [
      {
        id: -1,
        name: '選択してください',
      },
    ]
    const select = ref(null)
    const focus = () => {
      select.value.focus({
        preventScroll: true,
      })
    }
    const onChange = (value: string) => {
      context.emit('select', value)
    }
    const options = initialOption.concat(items)

    const onFocus = () => {
      context.emit('focus')
    }
    const onBlur = () => {
      context.emit('blur')
    }
    return {
      select,
      focus,
      options,
      onChange,
      onFocus,
      onBlur,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';

.form-select-box {
  position: relative;
  width: 30rem;

  &::after {
    position: absolute;
    right: 1.5rem;
    top: 26%;
    font-family: 'Material Icons', sans-serif;
    content: '\e313';
    font-size: 1.6rem;
    color: $main-text-color;
    pointer-events: none;
  }
  .select-box {
    width: 30rem;
    -webkit-appearance: none;
    appearance: none;
    background-color: $white;
    padding: 1.2rem 1.5rem;
    box-sizing: border-box;
    border: 0.1rem solid $control-bordr-color;
    border-radius: 0.4rem;
    cursor: pointer;

    &:focus {
      box-shadow: 0 0 0 0.2rem $sub-color;
    }
  }
}
</style>
