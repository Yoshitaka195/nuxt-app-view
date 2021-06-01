// Button.stories.js

import AtomButton from '~/components/atoms/Button.vue'

export default {
  title: 'atoms/AtomButton',
  component: AtomButton,
  parameters: {
    docs: {
      description: {
        component: 'シンプルにボタン',
      },
    },
  },
  argTypes: {
    color: {
      control: {
        type: 'text',
      },
    },
    type: {
      control: {
        type: 'text',
      },
    },
    text: {
      description: '表示するテキスト',
      control: {
        type: 'text',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { AtomButton },
  template: '<atom-button :text = "text" />',
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  text: 'ボタンです',
}
