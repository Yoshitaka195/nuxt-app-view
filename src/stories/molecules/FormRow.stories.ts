import FormRow from '~/components/molecules/FormRow.vue'

export default {
  title: 'molecules/FormRow',
  component: FormRow,
  parameters: {
    docs: {
      description: {
        component:
          'フォームの各行のレイアウト用コンポーネント。ラベルとコンテンツはslotで渡す。',
      },
    },
  },
  argTypes: {
    required: {
      description: 'APIから受け取るアイテムの取引概要データ',
      control: 'boolean',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { FormRow },
  template: `
    <form-row :required="required">
      <template v-slot:label>公開状態</template>
      <template v-slot:content>コンテンツ</template>
    </form-row>`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  required: true,
}
