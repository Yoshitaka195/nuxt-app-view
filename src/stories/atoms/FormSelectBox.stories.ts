import { ItemConditionsMock } from '~/entities/ItemConditionsEntity'
import FormSelectBox from '~/components/atoms/FormSelectBox.vue'

export default {
  title: 'atoms/FormSelectBox',
  component: FormSelectBox,
  parameters: {
    docs: {
      description: {
        component: 'フォームで使用するセレクトボックス',
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
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { FormSelectBox },
  template: `<form-select-box :items="items" :selected="selected" :disabled="disabled" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  items: new ItemConditionsMock().conditions,
  selected: -1,
  disabled: false,
}
