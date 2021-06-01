import { RentalHistoryMock } from '~/entities/RentalHistoryEntity'
import OrderDetailTable from '~/components/molecules/OrderDetailTable.vue'

export default {
  title: 'molecules/OrderDetailTable',
  component: OrderDetailTable,
  parameters: {
    docs: {
      description: {
        component: '注文情報を表示するコンポーネント。',
      },
    },
  },
  argTypes: {
    rentalHistory: {
      description: 'APIから受け取る取引履歴データ',
      control: 'object',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { OrderDetailTable },
  template: `<order-detail-table :rental-history="rentalHistory" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  rentalHistory: new RentalHistoryMock(),
}
