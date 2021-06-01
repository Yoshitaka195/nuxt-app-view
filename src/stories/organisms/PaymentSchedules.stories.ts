import { PaymentSchedulesMock } from '~/entities/PaymentSchedulesEntity'
import PaymentSchedules from '~/components/organisms/PaymentSchedules.vue'

export default {
  title: 'organisms/PaymentSchedules',
  component: PaymentSchedules,
  parameters: {
    docs: {
      description: {
        component:
          'APIから受け取った支払いスケジュール一覧を表示するコンポーネント。',
      },
    },
  },
  argTypes: {
    schedules: {
      description: 'APIから受け取る支払いスケジュール一覧データ',
      control: 'array',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { PaymentSchedules },
  template: `<payment-schedules :schedules="schedules" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  schedules: new PaymentSchedulesMock().schedules,
}
