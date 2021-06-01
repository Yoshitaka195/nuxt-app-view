import ItemDescriptionTemplateEditor from '~/components/organisms/ItemDescriptionTemplateEditor.vue'

export default {
  title: 'organisms/ItemDescriptionTemplateEditor',
  component: ItemDescriptionTemplateEditor,
  parameters: {
    docs: {
      description: {
        component: '商品説明のテンプレートのCRUDを担当するコンポーネント',
      },
    },
  },
  argTypes: {
    templates: {
      control: 'array',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { ItemDescriptionTemplateEditor },
  template: `<item-description-template-editor />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {}
