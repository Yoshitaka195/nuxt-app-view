<template>
  <div class="transaction-screen-body">
    <div class="message-area">
      <p class="title">明日までに受け渡しをしてください</p>
      <p class="content">
        明日までに受け渡しが行われない場合、取引はキャンセルされます。<br />
        受け渡しの際には、取引画面から必ず手渡しの処理を行なってください。
      </p>
    </div>
    <p class="text-bold margin">
      手渡しの取引はスマートフォンからお願いいたします。
    </p>
    <h3 class="steps-title">配送状況</h3>
    <div class="sb-wrap">
      <step-bar
        :step="1"
        :step-names="['申請承認済み', 'レンタル中', 'レンタル終了']"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import StepBar from '~/components/molecules/StepBar'

export default defineComponent({
  components: {
    StepBar,
  },
})
</script>

<style scoped lang="scss">
.margin {
  margin: 5rem 0;
}
</style>
