import { RentalRequestInfoMock } from '~/entities/RentalRequestInfoEntity'
import RentalApprovalTemplate from '~/components/templates/RentalApprovalTemplate.vue'

export default {
  title: 'templates/RentalApprovalTemplate',
  component: RentalApprovalTemplate,
  parameters: {
    docs: {
      description: {
        component: '取引履歴詳細ページのテンプレート。',
      },
    },
  },
  argTypes: {
    rentalRequestInfo: {
      description: 'APIから受け取るレンタル申請情報データ',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { RentalApprovalTemplate },
  template: `<rental-approval-template :rental-request-info="rentalRequestInfo" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  rentalRequestInfo: new RentalRequestInfoMock(),
}
