import { RentalHistoriesMock } from '~/entities/RentalHistoriesEntity'
import RentalHistoriesTemplate from '~/components/templates/RentalHistoriesTemplate.vue'

export default {
  title: 'templates/RentalHistoriesTemplate',
  component: RentalHistoriesTemplate,
  parameters: {
    docs: {
      description: {
        component:
          '取引履歴一覧ページのテンプレート。<br>storybook上では画面遷移系の処理でエラーになるが一旦放置。',
      },
    },
  },
  argTypes: {
    histories: {
      description: 'APIから受け取る取引一覧データ',
    },
    resultCount: {
      description: 'APIから受け取る取引一覧データの総件数',
    },
    isLoading: {
      description: 'APIのロード状況ステータス',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { RentalHistoriesTemplate },
  template: `<rental-histories-template :histories="histories" :result-count="resultCount" :is-loading='isLoading' :categories='categories'/>`,
  props: Object.keys(argTypes),
})

export const ExistsItems = Template.bind({})
// @ts-ignore
ExistsItems.args = {
  histories: new RentalHistoriesMock().histories,
  resultCount: new RentalHistoriesMock().histories.length,
  isLoading: false,
  categories: {
    category: '取引',
    subCategory: '貸す',
  },
}

export const NotExistsHistories = Template.bind({})
// @ts-ignore
NotExistsHistories.args = {
  histories: [],
  resultCount: 0,
  isLoading: false,
  categories: {
    category: '取引',
    subCategory: '貸す',
  },
}

export const Loading = Template.bind({})
// @ts-ignore
Loading.args = {
  histories: [],
  resultCount: 0,
  isLoading: true,
  categories: {
    category: '取引',
    subCategory: '貸す',
  },
}
