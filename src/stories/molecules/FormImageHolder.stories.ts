import FormImageHolder from '~/components/molecules/FormImageHolder.vue'
// @ts-ignore
import img from '~/static/img/sample/sample-01.png'

export default {
  title: 'molecules/FormImageHolder',
  component: FormImageHolder,
  parameters: {
    docs: {
      description: {
        component: 'フォームで画像を表示するコンポーネント',
      },
    },
  },
  argTypes: {
    isLoading: {
      description: 'ロード情報',
      control: 'boolean',
    },
    imageSource: {
      description: '画像のソース',
      control: 'text',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { FormImageHolder },
  template: `<form-image-holder :is-loading="isLoading" :image-source="imageSource" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  isLoading: false,
  imageSource: img,
}
