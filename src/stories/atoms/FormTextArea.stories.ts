import FormTextArea from '~/components/atoms/FormTextArea.vue'

export default {
  title: 'atoms/FormTextArea',
  component: FormTextArea,
  parameters: {
    docs: {
      description: {
        component: 'フォームで使用するtextarea',
      },
    },
  },
  argTypes: {
    value: {
      control: {
        type: 'text',
      },
    },
    maxLength: {
      control: {
        type: 'number',
      },
    },
    rows: {
      control: {
        type: 'number',
      },
    },
    placeHolder: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { FormTextArea },
  template: `<form-text-area :value="value" :maxLength="maxLength" :rows="rows" :placeHolder="placeHolder" :disabled="disabled" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  value: '',
  maxLength: 50,
  rows: 2,
  placeHolder: '50文字以内',
  disabled: false,
}
