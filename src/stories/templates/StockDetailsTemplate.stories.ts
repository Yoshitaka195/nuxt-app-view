import { ItemMock } from '~/entities/ItemEntity'
import { StockRentalHistoriesMock } from '~/entities/StockRentalHistoriesEntity'
import StockDetailsTemplate from '~/components/templates/StockDetailsTemplate.vue'

export default {
  title: 'templates/StockDetailsTemplate',
  component: StockDetailsTemplate,
  parameters: {
    docs: {
      description: {
        component: '在庫アイテム詳細ページのテンプレート。',
      },
    },
  },
  argTypes: {
    item: {
      description: 'APIから受け取るアイテムデータ',
    },
    rentalHistories: {
      description: 'APIから受け取る取引履歴データ',
    },
    isLoadingHistories: {
      description: '取引履歴取得APIのローディング状況',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { StockDetailsTemplate },
  template: `<stock-details-template :item="item" :rental-histories="rentalHistories" :is-loading-histories="isLoadingHistories" />`,
  props: Object.keys(argTypes),
})

export const ExistsRentalHistories = Template.bind({})
// @ts-ignore
ExistsRentalHistories.args = {
  item: new ItemMock(),
  rentalHistories: new StockRentalHistoriesMock().histories,
  isLoadingHistories: false,
}

export const NotExistsRentalHistories = Template.bind({})
// @ts-ignore
NotExistsRentalHistories.args = {
  item: new ItemMock(),
  rentalHistories: [],
  isLoadingHistories: false,
}

export const Exists3RentalHistories = Template.bind({})
// @ts-ignore
Exists3RentalHistories.args = {
  item: new ItemMock(),
  rentalHistories: new StockRentalHistoriesMock().histories.filter(
    (_history, idx) => idx < 3
  ),
  isLoadingHistories: false,
}

export const Loading = Template.bind({})
// @ts-ignore
Loading.args = {
  item: new ItemMock(),
  rentalHistories: [],
  isLoadingHistories: true,
}
