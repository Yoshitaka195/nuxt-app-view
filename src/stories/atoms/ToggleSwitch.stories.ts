import ToggleSwitch from '~/components/atoms/ToggleSwitch.vue'

export default {
  title: 'atoms/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    docs: {
      description: {
        component:
          '真偽値を受け取って表示するコンポーネント。表示する文言はslotで指定できる。',
      },
    },
  },
  argTypes: {
    value: {
      control: {
        type: 'boolean',
      },
    },
  },
}

const args = {
  value: true,
}

const Template = (_args: any, { argTypes }: { argTypes: any }) => ({
  components: { ToggleSwitch },
  template: `
    <toggle-switch :value="value" >
      <template v-slot:label-true>公開</template>
      <template v-slot:label-false>非公開</template>
    </toggle-switch>
  `,
  props: Object.keys(argTypes),
})

export const Sample = Template.bind({})
// @ts-ignore
Sample.args = args
