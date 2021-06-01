<template>
  <ul class="form-radio-button">
    <li v-for="item in items" :key="item.id">
      <vs-radio
        color="#1F74FF"
        :value="selected"
        :vs-value="item.id"
        :vs-name="name"
        :disabled="disabled"
        @change="onChange(item.id)"
      >
        {{ item.name }}
      </vs-radio>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'

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
    name: {
      type: String as PropType<string>,
      required: true,
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
  setup(_props, context: SetupContext) {
    const onChange = (value: number) => {
      context.emit('change', value)
    }
    return {
      onChange,
    }
  },
})
</script>
