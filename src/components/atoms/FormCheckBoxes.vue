<template>
  <ul class="form-check-boxes">
    <li
      v-for="(item, index) in items"
      :key="item.id"
      :class="{ mb10: index !== items.length - 1 }"
    >
      <vs-checkbox
        v-model="checked"
        color="#1F74FF"
        :vs-value="item.id"
        @change="onChange"
      >
        {{ item.name }}
      </vs-checkbox>
    </li>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  SetupContext,
  toRefs,
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
      type: Array as PropType<number[]>,
      default: () => [],
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props: { selected: number[] }, context: SetupContext) {
    const state = reactive({
      checked: props.selected.concat(),
    })
    const onChange = (values: number[]) => {
      context.emit('change', values)
    }
    return {
      ...toRefs(state),
      onChange,
    }
  },
})
</script>
