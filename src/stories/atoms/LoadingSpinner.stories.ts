import LoadingSpinner from '~/components/atoms/LoadingSpinner.vue'
// @ts-ignore

export default {
  title: 'atoms/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    docs: {
      description: {
        component: 'ローディング中に表示するコンポーネント。',
      },
    },
  },
}

const Template = (_args: any) => ({
  components: { LoadingSpinner },
  template: `<loading-spinner />`,
})

export const Sample = Template.bind({})
