import RentalHistoryFilter from '~/components/organisms/RentalHistoryFilter.vue'

export default {
  title: 'organisms/RentalHistoryFilter',
  component: RentalHistoryFilter,
  parameters: {
    docs: {
      description: {
        component:
          '取引履歴一覧の絞り込み検索の条件を指定するするコンポーネント。',
      },
    },
  },
  argTypes: {
    submitBtnDisabled: {
      control: 'boolean',
    },
    fetchHistories: {
      description: '取引履歴一覧取得を叩く',
      action: 'onSubmitFilter',
      table: {
        category: 'Events',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { RentalHistoryFilter },
  template: `<rental-history-filter @onSubmitFilter="fetchHistories" :submit-btn-disabled="submitBtnDisabled" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  submitBtnDisabled: false,
}
