import { ItemMock } from '~/entities/ItemEntity'
import TransactionTemplate from '~/components/templates/TransactionTemplate.vue'
import { RentalHistoryMock } from '~/entities/RentalHistoryEntity'
import { PaymentSchedulesMock } from '~/entities/PaymentSchedulesEntity'

export default {
  title: 'templates/TransactionTemplate',
  component: TransactionTemplate,
  parameters: {
    docs: {
      description: {
        component: '進行中取引ページのテンプレート。',
      },
    },
  },
  argTypes: {
    categories: {
      description: 'ContentHeaderコンポーネントに表示するデータ',
    },
    rentalHistory: {
      description: 'APIから受け取る取引履歴詳細データ',
    },
    item: {
      description: 'APIから受け取るアイテムスナップショットデータ',
    },
    businessPartner: {
      description: 'APIから受け取る取引ユーザーデータ',
    },
    paymentSchedules: {
      description: 'APIから受け取る決済情報データ',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { TransactionTemplate },
  template: `<transaction-template :categories="categories" :rental-history="rentalHistory" :item="item" :business-partner="businessPartner" :payment-schedules="paymentSchedules" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  categories: {
    category: '取引',
    subCategory: '貸す',
    smallCategory: '詳細',
  },
  rentalHistory: new RentalHistoryMock(),
  item: new ItemMock(),
  businessPartner: new RentalHistoryMock().borrower,
  paymentSchedules: new PaymentSchedulesMock().schedules,
}
