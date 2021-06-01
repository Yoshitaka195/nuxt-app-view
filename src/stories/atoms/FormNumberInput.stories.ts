import FormNumberInput from '~/components/atoms/FormNumberInput.vue'

export default {
  title: 'atoms/FormNumberInput',
  component: FormNumberInput,
  parameters: {
    docs: {
      description: {
        component: 'フォームで使用する数値用のinput',
      },
    },
  },
  argTypes: {
    value: {
      control: {
        type: 'number',
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
  components: { FormNumberInput },
  template: `<form-number-input :value="value" :max-length="maxLength" :placeHolder="placeHolder" :short="short" :disabled="disabled" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  value: 0,
  maxLength: 9,
  placeHolder: '0円',
  short: false,
  disabled: false,
}
