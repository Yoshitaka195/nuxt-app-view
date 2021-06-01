import StatusSetting from '~/components/molecules/StatusSetting.vue'

export default {
  title: 'molecules/StatusSetting',
  component: StatusSetting,
  parameters: {
    docs: {
      description: {
        component:
          'アイテムの公開・非公開を切り替えるモーダルの中に表示するコンポーネント。実際はvs-popupモーダルの中に表示される。',
      },
    },
  },
  argTypes: {
    item: {
      description: 'APIから受け取るアイテムデータ',
      control: {
        type: 'inline-radio',
        options: {
          PrivateItem: {
            id: 1,
            image_source: '',
            name: '非公開アイテム',
            status: 0,
            listingDate: '',
            rental_count: 0,
          },
          PublicItem: {
            id: 2,
            image_source: '',
            name: '公開アイテム',
            status: 1,
            listingDate: '',
            rental_count: 0,
          },
        },
      },
    },
    patchStatus: {
      description: 'ステータス更新APIを叩く',
      action: 'submitStatus',
      table: {
        category: 'Events',
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { StatusSetting },
  template: `<status-setting :key="item.id" :item="item" @submitStatus="patchStatus(item)" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  item: {
    id: 1,
    imgSrc: '',
    name: '非公開アイテム',
    status: 0,
    listingDate: '',
    rentals: 0,
  },
}
