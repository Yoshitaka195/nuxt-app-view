<template>
  <a class="status-badge" @click="onClick">
    <vs-chip :color="vm.color" :class="{ clickable: vm.clickable }">
      {{ vm.text }}
      <ion-icon v-if="vm.clickable" name="caret-down-outline"></ion-icon>
    </vs-chip>
  </a>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@vue/composition-api'

export const STATUS_VARIATION = {
  PRIVATE: 0,
  PUBLIC: 1,
  BEING_RENTAL: 2,
  RENTAL_FINISHED: 3,
  APPLYING: 4,
  APPROVED: 5,
  AWAITING_PICKUP_REQUEST: 6,
  PICKUP_REQUEST_DONE: 7,
  SENT: 8,
  DELIVERY_DONE: 9,
  AWAITING_RETURN_PICKUP: 10,
  RETURN_SENT: 11,
  RENTAL_CANCELED: 12,
} as const
export type STATUS_VARIATION = typeof STATUS_VARIATION[keyof typeof STATUS_VARIATION]

type ViewModel = {
  text: string
  clickable: boolean
  color: string
}

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    status: {
      type: Number as PropType<STATUS_VARIATION>,
      required: true,
    },
  },
  setup({ status }, context) {
    const onClick = () => {
      if (status !== 0 && status !== 1) return
      context.emit('click')
    }
    const vm = computed(
      (): ViewModel => {
        switch (status as STATUS_VARIATION) {
          case STATUS_VARIATION.PRIVATE:
            return {
              text: '非公開',
              clickable: true,
              color: 'dark',
            }
          case STATUS_VARIATION.PUBLIC:
            return {
              text: '公開中',
              clickable: true,
              color: '#42B388',
            }
          case STATUS_VARIATION.BEING_RENTAL:
            return {
              text: 'レンタル中',
              clickable: false,
              color: 'success',
            }
          case STATUS_VARIATION.RENTAL_FINISHED:
            return {
              text: 'レンタル終了',
              clickable: false,
              color: 'dark',
            }
          case STATUS_VARIATION.APPLYING:
            return {
              text: 'レンタル申請中',
              clickable: false,
              color: 'primary',
            }
          case STATUS_VARIATION.APPROVED:
            return {
              text: '承認済み',
              clickable: false,
              color: 'primary',
            }
          case STATUS_VARIATION.AWAITING_PICKUP_REQUEST:
            return {
              text: '集荷受付待ち',
              clickable: false,
              color: 'primary',
            }
          case STATUS_VARIATION.PICKUP_REQUEST_DONE:
            return {
              text: '集荷受付完了',
              clickable: false,
              color: 'primary',
            }
          case STATUS_VARIATION.SENT:
            return {
              text: '配達中',
              clickable: false,
              color: 'primary',
            }
          case STATUS_VARIATION.DELIVERY_DONE:
            return {
              text: '配達完了',
              clickable: false,
              color: 'primary',
            }
          case STATUS_VARIATION.AWAITING_RETURN_PICKUP:
            return {
              text: '返却集荷受付完了',
              clickable: false,
              color: 'primary',
            }
          case STATUS_VARIATION.RETURN_SENT:
            return {
              text: '返却配達中',
              clickable: false,
              color: 'primary',
            }
          case STATUS_VARIATION.RENTAL_CANCELED:
            return {
              text: '取引キャンセル',
              clickable: false,
              color: 'primary',
            }
        }
      }
    )
    return {
      onClick,
      vm,
    }
  },
})
</script>

<style lang="scss">
.status-badge {
  .clickable {
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
