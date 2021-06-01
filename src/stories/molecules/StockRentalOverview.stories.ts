import { StockRentalHistoriesMock } from '~/entities/StockRentalHistoriesEntity'
import StockRentalOverview from '~/components/molecules/StockRentalOverview.vue'

export default {
  title: 'molecules/StockRentalOverview',
  component: StockRentalOverview,
  parameters: {
    docs: {
      description: {
        component:
          'APIから受け取った個々の所有アイテムの取引概要を表示するコンポーネント。',
      },
    },
  },
  argTypes: {
    history: {
      description: 'APIから受け取るアイテムの取引概要データ',
      control: 'object',
    },
    onClickUserLink: {
      description: 'ユーザー画面へ遷移する',
      action: 'onClickUserLink',
      table: {
        category: 'Events',
      },
    },
    onClickDetailBtn: {
      description: '取引詳細画面へ遷移する',
      action: 'onClickDetailBtn',
      table: {
        category: 'Events',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { StockRentalOverview },
  template: `<stock-rental-overview :history="history" @onClickUserLink="onClickUserLink" @onClickDetailBtn="onClickDetailBtn"/>`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  history: new StockRentalHistoriesMock().histories[0],
}
