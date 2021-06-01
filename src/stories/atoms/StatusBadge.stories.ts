import StatusBadge from '~/components/atoms/StatusBadge.vue'

export default {
  title: 'atoms/StatusBadge',
  component: StatusBadge,
  parameters: {
    docs: {
      description: {
        component:
          'アイテムや取引のステータスを表示するコンポーネント。<br>' +
          'propsで受け取った0~12の数値に応じて表示や処理が切り替わる。',
      },
    },
  },
  argTypes: {
    status: {
      control: {
        // type: 'inline-radio',
        // options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        type: 'range',
        min: 0,
        max: 12,
      },
    },
    onClick: {
      description: '公開 or 非公開であればクリック可能',
      action: 'onClick',
      table: {
        category: 'Events',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { StatusBadge },
  template: `<status-badge :status="status" @click="onClick" :key="status" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  status: 0,
}
