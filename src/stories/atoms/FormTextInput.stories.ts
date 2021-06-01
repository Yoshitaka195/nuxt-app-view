import FormTextInput from '~/components/atoms/FormTextInput.vue'

export default {
  title: 'atoms/FormTextInput',
  component: FormTextInput,
  parameters: {
    docs: {
      description: {
        component: 'フォームで使用するテキスト用のinput',
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
    short: {
      control: {
        type: 'boolean',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { FormTextInput },
  template: `<form-text-input :value="value" :maxLength="maxLength" :placeHolder="placeHolder" :short="short" :disabled="disabled" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  value: '',
  maxLength: 25,
  placeHolder: '25文字以内',
  short: false,
  disabled: false,
}
