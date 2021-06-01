<template>
  <div class="rental-rejection-screen">
    <h3 class="header">非承認</h3>
    <div class="main-contents">
      <form-row :required="true">
        <template v-slot:label>非承認理由</template>
        <template v-slot:content>
          <form-select-box
            :items="rejectionReasons.reasons"
            @select="updateReason"
          />
        </template>
      </form-row>
      <vs-button
        class="reject-button"
        :disabled="rejectButtonDisabled"
        @click="reject"
      >
        非承認を確定する
      </vs-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  SetupContext,
  toRefs,
} from '@vue/composition-api'
import { RejectionReasonsEntity } from '~/entities/RejectionReasonsEntity'
import FormRow from '~/components/molecules/FormRow'
import FormSelectBox from '~/components/atoms/FormSelectBox'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    FormRow,
    FormSelectBox,
  },
  props: {
    rejectionReasons: {
      type: Object as PropType<RejectionReasonsEntity>,
      required: true,
    },
  },
  setup(_props, context: SetupContext) {
    const state = reactive({
      selectedReason: -1,
      rejectButtonDisabled: false,
    })

    const updateReason = (id: number) => {
      state.selectedReason = id
    }

    const reject = () => {
      if (state.selectedReason === -1) {
        alert('非承認理由を選択してください。')
        return
      }

      state.rejectButtonDisabled = true
      context.emit('reject', state.selectedReason)
    }

    return {
      ...toRefs(state),
      updateReason,
      reject,
    }
  },
})
</script>

<style lang="scss">
.rental-rejection-screen {
  width: 70rem;
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

  > .main-contents {
    padding: 0 3rem;

    > .reject-button {
      width: 20rem;
      height: 4rem;
      margin: 4rem 22.5rem 2.5rem;
    }
  }
}
</style>
