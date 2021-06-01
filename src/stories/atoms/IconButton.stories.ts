import IconButton from '~/components/atoms/IconButton.vue'

export default {
  title: 'atoms/IconButton',
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          'ion-iconのicon-typeをpropsで受け取り表示するボタン。<br>textを渡せばラベルにも対応可能',
      },
    },
  },
  argTypes: {
    iconType: {
      description: '表示するion-icon',
      control: {
        type: 'inline-radio',
        options: ['create-outline', 'reader-outline'],
      },
    },
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
  components: { IconButton },
  template:
    '<icon-button :icon-type="iconType" :text="text" @click="onClick" />',
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  iconType: 'create-outline',
  text: '',
}
