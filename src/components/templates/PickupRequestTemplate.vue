<template>
  <main class="content">
    <div class="pickup-request">
      <ion-icon
        class="close-button"
        name="close-outline"
        @click="toTransaction"
      />
      <pickup-request-form
        class="center"
        :edit-data="editData"
        @submit="submit"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import PickupRequestForm from '~/components/organisms/PickupRequestForm'
import { PickupInfoEditDataEntity } from '~/entities/PickupInfoEditDataEntity'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  components: {
    PickupRequestForm,
  },
  props: {
    editData: {
      type: Object as PropType<PickupInfoEditDataEntity>,
      required: true,
    },
  },
  setup(
    { editData }: { editData: PickupInfoEditDataEntity },
    context: SetupContext
  ) {
    const toTransaction = () => {
      const id = editData.id
      context.root.$router.push(`/lend/${id}/transaction`)
    }

    const submit = () => {
      context.emit('submit')
    }

    return {
      toTransaction,
      submit,
    }
  },
})
</script>

<style lang="scss">
.pickup-request {
  > .close-button {
    width: 3.2rem;
    height: 3.2rem;
    margin: 3rem 0 0 3rem;
    position: fixed;
    cursor: pointer;
  }

  > .center {
    margin: 0 auto;
  }
}
</style>
