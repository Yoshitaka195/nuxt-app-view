import { StockItemsMock } from '~/entities/StockItemsEntity'
import StockTemplate from '~/components/templates/StockTemplate.vue'

export default {
  title: 'templates/StockTemplate',
  component: StockTemplate,
  parameters: {
    docs: {
      description: {
        component:
          '在庫アイテム一覧ページのテンプレート。<br>storybook上では画面遷移系の処理でエラーになるが一旦放置。',
      },
    },
  },
  argTypes: {
    items: {
      description: 'APIから受け取るアイテムデータ',
    },
    resultCount: {
      description: 'APIから受け取るアイテムデータの総件数',
    },
    isLoading: {
      description: 'APIのロード状況ステータス',
    },
    showStatusSettingModal: {
      description: 'ステータス変更モーダルを開く',
      action: 'onClickStatusBtn',
      table: {
        category: 'Events',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { StockTemplate },
  template: `<stock-template :items="items" :result-count="resultCount" :is-loading='isLoading' />`,
  props: Object.keys(argTypes),
})

export const ExistsItems = Template.bind({})
// @ts-ignore
ExistsItems.args = {
  items: new StockItemsMock().items,
  resultCount: new StockItemsMock().items.length,
  isLoading: false,
}

export const NotExistsItems = Template.bind({})
// @ts-ignore
NotExistsItems.args = {
  items: [],
  resultCount: 0,
  isLoading: false,
}

export const Loading = Template.bind({})
// @ts-ignore
Loading.args = {
  items: [],
  resultCount: 0,
  isLoading: true,
}
