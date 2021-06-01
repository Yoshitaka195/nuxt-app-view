import PaymentSchedule from '~/components/molecules/PaymentSchedule.vue'

export default {
  title: 'molecules/PaymentSchedule',
  component: PaymentSchedule,
  parameters: {
    docs: {
      description: {
        component:
          'APIから受け取った個々の支払いスケジュールを表示するコンポーネント。',
      },
    },
  },
  argTypes: {
    schedule: {
      description: 'APIから受け取る支払いスケジュールデータ',
      control: 'object',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { PaymentSchedule },
  template: `<payment-schedule :schedule="schedule" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  schedule: {
    id: 1,
    date: '2020-12-01',
    amount: '5000',
    paid: true,
  },
}
