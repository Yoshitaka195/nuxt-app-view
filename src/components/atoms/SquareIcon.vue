<template>
  <div class="statistic__icon">
    <ion-icon class="ion-icon" :name="iconType" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    iconType: {
      type: String,
      required: true,
    },
  },
})
</script>
