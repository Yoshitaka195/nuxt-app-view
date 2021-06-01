import CircleIcon from '~/components/atoms/CircleIcon.vue'
// @ts-ignore
import img from '~/static/img/sample/sample-02.jpg'

export default {
  title: 'atoms/CircleIcon',
  component: CircleIcon,
  parameters: {
    docs: {
      description: {
        component:
          '画像のsrcをpropsで受け取り表示するコンポーネント。propsでサイズを変更できる。',
      },
    },
  },
  argTypes: {
    imgSrc: {
      control: {
        type: 'text',
      },
    },
    bigSize: {
      control: 'boolean',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { CircleIcon },
  template: `<circle-icon :img-src="imgSrc" :big-size='bigSize' />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  imgSrc: img,
  bigSize: false,
}
