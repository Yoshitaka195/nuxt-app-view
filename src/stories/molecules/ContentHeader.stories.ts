import ContentHeader from '~/components/molecules/ContentHeader.vue'

export default {
  title: 'molecules/ContentHeader',
  component: ContentHeader,
  parameters: {
    docs: {
      description: {
        component:
          'ページのカテゴリを表示するコンポーネント。sb上ではrouter-link周りのエラーがコンソールに出力されてますが一旦放置。',
      },
    },
  },
  argTypes: {
    categories: {
      control: 'object',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { ContentHeader },
  template: `<content-header :categories="categories" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  categories: {
    category: 'アイテム',
    subCategory: '所有アイテム一覧',
  },
}
