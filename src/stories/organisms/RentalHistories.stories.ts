import { RentalHistoriesMock } from '~/entities/RentalHistoriesEntity'
import RentalHistories from '~/components/organisms/RentalHistories.vue'

export default {
  title: 'organisms/RentalHistories',
  component: RentalHistories,
  parameters: {
    docs: {
      description: {
        component:
          'APIから受け取った取引履歴一覧を表示するコンポーネント。画面遷移系の処理は現在storybook上ではエラーになるが一旦放置。',
      },
    },
  },
  argTypes: {
    histories: {
      description: 'APIから受け取る取引一覧データ',
      control: 'array',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { RentalHistories },
  template: `<RentalHistories :histories="histories" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  histories: new RentalHistoriesMock().histories,
}
