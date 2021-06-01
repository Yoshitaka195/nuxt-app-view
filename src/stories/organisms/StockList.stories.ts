import { StockItemsMock } from '~/entities/StockItemsEntity'
import StockList from '~/components/organisms/StockList.vue'

export default {
  title: 'organisms/StockList',
  component: StockList,
  parameters: {
    docs: {
      description: {
        component:
          'APIから受け取ったアイテム一覧を表示するコンポーネント。画面遷移系の処理は現在storybook上ではエラーになるが一旦放置。',
      },
    },
  },
  argTypes: {
    items: {
      description: 'APIから受け取るアイテムデータ',
      control: 'array',
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
  components: { StockList },
  template: `<stock-list :items="items" @onClickStatusBtn="showStatusSettingModal" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  items: new StockItemsMock().items,
}
