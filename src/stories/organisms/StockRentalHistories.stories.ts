import { StockRentalHistoriesMock } from '~/entities/StockRentalHistoriesEntity'
import StockRentalHistories from '~/components/organisms/StockRentalHistories.vue'

export default {
  title: 'organisms/StockRentalHistories',
  component: StockRentalHistories,
  parameters: {
    docs: {
      description: {
        component:
          'APIから受け取った所有アイテムの取引履歴一覧を表示するコンポーネント。',
      },
    },
  },
  argTypes: {
    histories: {
      description: 'APIから受け取るアイテムデータ',
      control: 'array',
    },
    isLoading: {
      description: '取引履歴取得APIのローディング状況',
      control: 'boolean',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { StockRentalHistories },
  template: `<stock-rental-histories :histories="histories" :is-loading="isLoading"/>`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  histories: new StockRentalHistoriesMock().histories,
  isLoading: false,
}
