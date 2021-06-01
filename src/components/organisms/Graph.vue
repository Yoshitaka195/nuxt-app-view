<template>
  <vs-card>
    <div slot="header">
      <CardTitle :card-title="cardTitle" />
    </div>
    <div>
      <span>{{ graph }}</span>
    </div>
  </vs-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    graph: {
      type: String,
      required: true,
      default: 'グラフが入る予定です。',
    },
  },
  data() {
    return {
      cardTitle: '売上グラフ',
    }
  },
})
</script>
