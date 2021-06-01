import CsvDownloader from '~/components/molecules/CsvDownloader.vue'

export default {
  title: 'molecules/CsvDownloader',
  component: CsvDownloader,
  parameters: {
    docs: {
      description: {
        component:
          '一覧系画面からCSVをダウンロードするためのコンポーネント。propsで検索件数を受け取る。',
      },
    },
  },
  argTypes: {
    resultCount: {
      control: {
        type: 'number',
        min: 1,
        step: 1,
      },
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { CsvDownloader },
  template: `<csv-downloader :result-count="resultCount" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  resultCount: 3,
}
