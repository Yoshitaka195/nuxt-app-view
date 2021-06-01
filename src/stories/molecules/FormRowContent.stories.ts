import FormRowContent from '~/components/molecules/FormRowContent.vue'

export default {
  title: 'molecules/FormRowContent',
  component: FormRowContent,
  parameters: {
    docs: {
      description: {
        component:
          'フォームの行がネストする際のレイアウト用コンポーネント。ラベルとコンテンツはslotで渡す。',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { FormRowContent },
  template: `
    <form-row-content>
      <template v-slot:label>ラベル</template>
      <template v-slot:content>コンテンツ</template>
    </form-row-content>`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {}
