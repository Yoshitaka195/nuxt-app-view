import BusinessPartnerInfo from '~/components/molecules/BusinessPartnerInfo.vue'
// @ts-ignore
import img from '~/static/img/sample/sample-02.jpg'

export default {
  title: 'molecules/BusinessPartnerInfo',
  component: BusinessPartnerInfo,
  parameters: {
    docs: {
      description: {
        component: '取引相手のインフォメーションを表示するコンポーネント。',
      },
    },
  },
  argTypes: {
    user: {
      control: 'Object',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { BusinessPartnerInfo },
  template: `<business-partner-info :user="user" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  user: {
    id: 1,
    name: 'ゆーざー',
    imageSource: img,
  },
}
