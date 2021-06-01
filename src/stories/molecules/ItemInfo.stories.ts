import ItemInfo from '~/components/molecules/ItemInfo.vue'
// @ts-ignore
import img from '~/static/img/sample/sample-01.png'

export default {
  title: 'molecules/ItemInfo',
  component: ItemInfo,
  parameters: {
    docs: {
      description: {
        component:
          'アイテムのインフォメーションを表示するコンポーネント。編集ボタンの表示はpropsで操作できる。',
      },
    },
  },
  argTypes: {
    id: {
      control: 'number',
    },
    imgSrc: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    evaluation: {
      control: {
        type: 'inline-radio',
        options: [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      },
    },
    omitEditButton: {
      control: 'boolean',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { ItemInfo },
  template: `<item-info :id="id" :name="name" :img-src="imgSrc" :evaluation="evaluation" :key="evaluation" :omit-edit-button="omitEditButton" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  id: 1,
  name: 'MacBook',
  imgSrc: img,
  evaluation: 4.5,
  omitEditButton: false,
}
