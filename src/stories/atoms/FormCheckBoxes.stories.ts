import FormCheckBoxes from '~/components/atoms/FormCheckBoxes.vue'
import { HandingPlacesMock } from '~/entities/HandingPlacesEntity'

export default {
  title: 'atoms/FormCheckBoxes',
  component: FormCheckBoxes,
  parameters: {
    docs: {
      description: {
        component: 'フォームで使用するチェックボックス',
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
        type: 'array',
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
  components: { FormCheckBoxes },
  template: `<form-check-boxes :items="items" :selected="selected" :disabled="disabled" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  items: new HandingPlacesMock().places,
  selected: [1, 2],
  disabled: false,
}
