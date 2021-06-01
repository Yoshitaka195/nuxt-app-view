<template>
  <h3>{{ cardTitle }}</h3>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    cardTitle: {
      type: String,
      required: true,
    },
  },
})
</script>
