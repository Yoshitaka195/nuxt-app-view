import StockOverview from '~/components/molecules/StockOverview.vue'
// @ts-ignore
import img from '~/static/img/sample/sample-01.png'

export default {
  title: 'molecules/StockOverview',
  component: StockOverview,
  parameters: {
    docs: {
      description: {
        component: 'APIから受け取った個々のアイテムを表示するコンポーネント。',
      },
    },
  },
  argTypes: {
    item: {
      description: 'APIから受け取るアイテムデータ',
      control: 'object',
    },
    toDetails: {
      description: 'アイテム詳細画面へ遷移する',
      action: 'onClickLinkForDetails',
      table: {
        category: 'Events',
      },
    },
    onClickStatusBtn: {
      description: 'ステータス変更モーダルを開く',
      action: 'onClickStatusBtn',
      table: {
        category: 'Events',
      },
    },
    toEdit: {
      description: 'アイテム編集画面へ遷移する',
      action: 'onClickEditBtn',
      table: {
        category: 'Events',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { StockOverview },
  template: `<stock-overview :item="item" @onClickLinkForDetails="toDetails(item.id)" @onClickStatusBtn="onClickStatusBtn(item)" @onClickEditBtn="toEdit(item.id)" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  item: {
    id: 1,
    imageSource: img,
    name: 'MacBook Pro 16インチモデル',
    status: 0,
    listingDate: '2020年12月22日',
    rentalCount: 12,
  },
}
