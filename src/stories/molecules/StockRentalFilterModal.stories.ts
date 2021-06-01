import StockRentalFilterModal from '~/components/molecules/StockRentalFilterModal.vue'

export default {
  title: 'molecules/StockRentalFilterModal',
  component: StockRentalFilterModal,
  parameters: {
    docs: {
      description: {
        component:
          '所有アイテムの取引履歴を絞り込むモーダルの中に表示するコンポーネント。実際はvs-popupモーダルの中に表示される。',
      },
    },
  },
  argTypes: {
    onClickFilterModalBtn: {
      description: 'どちらかのボタンをクリックする',
      action: 'onClickFilterModalBtn',
      table: {
        category: 'Events',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { StockRentalFilterModal },
  template: `<stock-rental-filter-modal @onClickFilterModalBtn="onClickFilterModalBtn" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {}
