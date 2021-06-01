import EvaluationGrade from '~/components/atoms/EvaluationGrade.vue'

export default {
  title: 'atoms/EvaluationGrade',
  component: EvaluationGrade,
  parameters: {
    docs: {
      description: {
        component:
          'アイテムや取引の評価値を表示するコンポーネント。propsでアイコンや数字の表示・非表示を切替可能。',
      },
    },
  },
  argTypes: {
    grade: {
      control: {
        type: 'inline-radio',
        options: [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      },
    },
    iconOnly: {
      type: 'boolean',
    },
    numberOnly: {
      type: 'boolean',
    },
  },
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { EvaluationGrade },
  template: `<evaluation-grade :grade="grade" :icon-only="iconOnly" :numberOnly="numberOnly" :key="grade" />`,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = {
  grade: 3,
}
