import StockFilter from '~/components/organisms/StockFilter.vue'

export default {
  title: 'organisms/StockFilter',
  component: StockFilter,
  parameters: {
    docs: {
      description: {
        component:
          '所有アイテム一覧の絞り込み検索の条件を指定するするコンポーネント。',
      },
    },
  },
  argTypes: {
    submitBtnDisabled: {
      control: 'boolean',
    },
    fetchItems: {
      description: 'アイテム一覧取得を叩く',
      action: 'onSubmitFilter',
      table: {
        category: 'Events',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { StockFilter },
  template: `<stock-filter @onSubmitFilter="fetchItems" :submit-btn-disabled="submitBtnDisabled" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  submitBtnDisabled: false,
}
