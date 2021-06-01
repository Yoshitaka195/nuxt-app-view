import { DeliverySizesMock } from '~/entities/DeliverySizesEntity'
import FormRadioButton from '~/components/atoms/FormRadioButton.vue'

export default {
  title: 'atoms/FormRadioButton',
  component: FormRadioButton,
  parameters: {
    docs: {
      description: {
        component: 'フォームで使用するラジオボタン',
      },
    },
  },
  argTypes: {
    items: {
      control: {
        type: 'array',
      },
    },
    selected: {
      control: {
        type: 'number',
      },
    },
    name: {
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
  components: { FormRadioButton },
  template: `<form-radio-button :items="items" :selected="selected" :name="name" :disabled="disabled" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  items: new DeliverySizesMock().sizes,
  selected: -1,
  name: 'itemSize',
  disabled: false,
}
