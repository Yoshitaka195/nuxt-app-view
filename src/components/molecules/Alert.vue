<template>
  <vs-alert>
    <ion-icon class="ion-icon--alert" name="alert-circle-outline" />
    <span v-text="message" />
  </vs-alert>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed, PropType } from '@vue/composition-api'
import { AUTH_STATUS } from '~/entities/AuthStatusEntity'

// noinspection TypeScriptValidateTypes
export default Vue.extend({
  props: {
    authStatus: {
      type: Number as PropType<AUTH_STATUS>,
      required: true,
    },
  },
  setup({ authStatus }: { authStatus: AUTH_STATUS }) {
    const message = computed(() => {
      switch (authStatus as AUTH_STATUS) {
        case AUTH_STATUS.UNAPPROVED:
          return 'レンタル開始に必要な情報が登録されていません。ユーザー基本情報登録、携帯電話認証、身分証認証を行って下さい。'
        case AUTH_STATUS.APPLYING:
          return 'レンタル開始に必要な情報が登録されていません。ユーザー基本情報登録、携帯電話認証、身分証認証を行って下さい。'
      }
      return 'アイテムを出品してみましょう！'
    })
    return {
      message,
    }
  },
})
</script>
