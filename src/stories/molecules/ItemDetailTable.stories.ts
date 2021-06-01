import { ItemMock } from '~/entities/ItemEntity'
import ItemDetailTable from '~/components/molecules/ItemDetailTable.vue'

export default {
  title: 'molecules/ItemDetailTable',
  component: ItemDetailTable,
  parameters: {
    docs: {
      description: {
        component: 'アイテムの詳細を表示するコンポーネント。',
      },
    },
  },
  argTypes: {
    item: {
      description: 'APIから受け取るアイテムデータ',
      control: 'object',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { ItemDetailTable },
  template: `<item-detail-table :item="item" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  item: new ItemMock(),
}
