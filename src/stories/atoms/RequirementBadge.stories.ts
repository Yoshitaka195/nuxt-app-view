import RequirementBadge from '~/components/atoms/RequirementBadge.vue'

export default {
  title: 'atoms/RequirementBadge',
  component: RequirementBadge,
  parameters: {
    docs: {
      description: {
        component: 'フォームの項目が任意か必須かを表示するコンポーネント',
      },
    },
  },
  argTypes: {
    required: {
      control: {
        type: 'boolean',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { RequirementBadge },
  template: `<requirement-badge :required='required' :key="required" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  required: true,
}
