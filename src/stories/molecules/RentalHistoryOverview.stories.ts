import RentalHistoryOverview from '~/components/molecules/RentalHistoryOverview.vue'
// @ts-ignore
import img from '~/static/img/sample/sample-01.png'

export default {
  title: 'molecules/RentalHistoryOverview',
  component: RentalHistoryOverview,
  parameters: {
    docs: {
      description: {
        component:
          'APIから受け取った個々の取引履歴概要を表示するコンポーネント。',
      },
    },
  },
  argTypes: {
    history: {
      description: 'APIから受け取る取引データ',
      control: 'object',
    },
    toDetails: {
      description: '取引詳細画面へ遷移する',
      action: 'onClickLinkForDetails',
      table: {
        category: 'Events',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { RentalHistoryOverview },
  template: `<rental-history-overview :history="history" @onClickLinkForDetails="toDetails(history.id)" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  history: {
    id: 1,
    item: {
      id: 1,
      name: 'MacBook',
      imageSource: img,
    },
    period: {
      from: '2020-12-01',
      to: '2020-12-02',
    },
    user: {
      id: 1,
      name: 'ユーザー1',
    },
    status: 4,
  },
}
