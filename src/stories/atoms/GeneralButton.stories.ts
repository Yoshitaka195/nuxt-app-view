import GeneralButton from '~/components/atoms/GeneralButton.vue'

export default {
  title: 'atoms/GeneralButton',
  component: GeneralButton,
  parameters: {
    docs: {
      description: {
        component: '表示テキストをpropsで受け取り表示する汎用ボタン。',
      },
    },
  },
  argTypes: {
    text: {
      description: '表示するテキスト',
      control: {
        type: 'text',
      },
    },
    onClick: {
      action: 'onClick',
      table: {
        category: 'Events',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { GeneralButton },
  template: `<general-button :text="text" @click="onClick" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  text: 'テキスト',
}
