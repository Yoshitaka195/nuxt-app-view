<template>
  <span class="requirement-badge" :class="{ optional: !required }">
    {{ required ? '必須' : '任意' }}
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
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

.requirement-badge {
  background-color: $main-color;
  color: $white;
  display: inline-block;
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 0.6rem;
  padding: 0.1rem 0.4rem;
  border-radius: 0.4rem;

  &.optional {
    background-color: #f5f5f5;
    color: $main-text-color;
  }
}
</style>
