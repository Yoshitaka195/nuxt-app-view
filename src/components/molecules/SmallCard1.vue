<template>
  <vs-card>
    <div class="statistic">
      <SquareIcon :icon-type="'bar-chart-outline'" />
      <div class="statistic__text-wrap">
        <p>{{ infoTitle }}</p>
        <p class="statistic__number">
          {{ infoNumber }}<span class="statistic__number--fw-normal">円</span>
        </p>
      </div>
    </div>
  </vs-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    infoTitle: {
      type: String,
      required: true,
      default: 'タイトルです。',
    },
    infoNumber: {
      type: Number,
      required: true,
      default: 0,
    },
  },
})
</script>
