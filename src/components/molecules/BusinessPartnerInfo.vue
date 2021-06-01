<template>
  <vs-card class="business-partner-info">
    <div class="wrap">
      <div class="inner">
        <circle-icon :img-src="imageSource" big-size />
        <div class="text">
          <p class="bold">取引ユーザー</p>
          <p>{{ name }}</p>
        </div>
      </div>
    </div>
  </vs-card>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import CircleIcon from '~/components/atoms/CircleIcon'
import { RentalHistoryEntity } from '~/entities/RentalHistoryEntity'

export type User =
  | typeof RentalHistoryEntity['owner']
  | typeof RentalHistoryEntity['borrower']

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: { CircleIcon },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  setup({ user }: { user: User }, _context: SetupContext) {
    return {
      ...user,
    }
  },
})
</script>

<style lang="scss">
.business-partner-info {
  .vs-card--content {
    height: 120px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .wrap {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    .inner {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .text {
        line-height: 1.45;
        margin-left: 20px;
        .bold {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
