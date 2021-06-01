<template>
  <vs-card>
    <div slot="header">
      <CardTitle :card-title="cardTitle" />
    </div>
    <ul class="news">
      <li v-for="info in operationInfos" :key="info.id" class="news__list">
        <time>{{ info.date }}</time>
        <p class="news__list-text">
          <a href="#">{{ info.content }}</a>
        </p>
      </li>
    </ul>
  </vs-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    operationInfos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cardTitle: '運営からのお知らせ',
    }
  },
})
</script>
