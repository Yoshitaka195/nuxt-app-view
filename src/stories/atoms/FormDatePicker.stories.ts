import FormDatePicker from '~/components/atoms/FormDatePicker.vue'

export default {
  title: 'atoms/FormDatePicker',
  component: FormDatePicker,
  parameters: {
    docs: {
      description: {
        component: 'フォームで使用する日付選択用のinput',
      },
    },
  },
  argTypes: {
    value: {
      control: {
        type: 'text',
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
  components: { FormDatePicker },
  template: `<form-date-picker :value="value" :place-holder="placeHolder" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  value: '2020-01-01',
  placeHolder: '選択してください',
  disabled: false,
}
