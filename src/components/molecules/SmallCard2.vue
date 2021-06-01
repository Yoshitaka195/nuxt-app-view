<template>
  <vs-card>
    <div class="statistic">
      <SquareIcon :icon-type="'gift-outline'" />
      <div class="statistic__text-wrap statistic__text-wrap--flex">
        <div class="statistic__text">
          <p>貸した</p>
          <p class="statistic__number">{{ lendNumber }}</p>
        </div>
        <div class="statistic__vertical-line"></div>
        <div class="statistic__text">
          <p>借りた</p>
          <p class="statistic__number">{{ borrowNumber }}</p>
        </div>
      </div>
    </div>
  </vs-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    lendNumber: {
      type: Number,
      default: 0,
    },
    borrowNumber: {
      type: Number,
      default: 0,
    },
  },
})
</script>
