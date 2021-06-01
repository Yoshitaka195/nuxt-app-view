<template>
  <div class="message-screen">
    <h3 class="header">メッセージ</h3>
    <div class="message-area">
      <message-set />
      <message-set />
      <message-set self />
      <message-set self />
      <message-set />
    </div>
    <form-text-area
      class="text-area"
      :value="''"
      :max-length="100"
      :rows="4"
      :place-holder="'取引相手とメッセージのやりとりができます。'"
    />
    <vs-button class="send-button">取引メッセージを送る</vs-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import FormTextArea from '~/components/atoms/FormTextArea'
import MessageSet from '~/components/molecules/MessageSet'

export default defineComponent({
  components: {
    FormTextArea,
    MessageSet,
  },
})
</script>

<style lang="scss">
.message-screen {
  width: 55rem;
  border-radius: 6px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;

  > .header {
    font-size: 1.8rem;
    padding: 2.5rem;
    height: 6.8rem;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    background-color: #fff;
  }

  > .message-area {
    height: 51rem;
    padding: 2.5rem;
    border-bottom: 0.1rem #f0f0f0 solid;
    overflow: scroll;

    > * {
      margin-bottom: 2rem;
    }
  }

  > .text-area {
    width: calc(100% - 5rem);
    margin: 2.5rem 2.5rem 0 2.5rem;
  }

  > .send-button {
    width: calc(100% - 5rem);
    margin: 2.5rem;
  }
}
</style>
