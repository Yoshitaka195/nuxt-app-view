import ItemImage from '~/components/atoms/ItemImage.vue'
// @ts-ignore
import img from '~/static/img/sample/sample-01.png'

export default {
  title: 'atoms/ItemImage',
  component: ItemImage,
  parameters: {
    docs: {
      description: {
        component: '画像のsrcをpropsで受け取り表示するコンポーネント。',
      },
    },
  },
  argTypes: {
    imgSrc: {
      control: {
        type: 'text',
      },
    },
    onClick: {
      action: 'click',
      table: {
        category: 'Events',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { ItemImage },
  template: `<item-image :img-src="imgSrc" @click="onClick" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  imgSrc: img,
}
