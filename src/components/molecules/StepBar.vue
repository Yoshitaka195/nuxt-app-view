<template>
  <div
    class="step-bar"
    :style="'max-width:' + width + 'px; max-height:' + 60 + 'px;'"
  >
    <div class="svg-wrapper">
      <!--      <client-only>-->
      <svg :width="width" :height="100" :viewBox="'0 0 ' + width + ' 80'">
        <circle
          v-for="(s, index) in steps"
          :key="`first-${index}`"
          :cx="getPoint(index)"
          cy="20"
          r="20"
          :fill="s"
        />
        <line
          v-for="index of borderCount"
          :key="`second-${index}`"
          :x1="baseWidth * (index - 1) + oneMargin + 20"
          y1="20"
          :x2="baseWidth * index + oneMargin - 10"
          y2="20"
          :stroke="steps[index]"
          stroke-width="8px"
        />
        <text
          v-for="(sn, index) in stepNames"
          :key="`third-${index}`"
          :x="getPoint(index)"
          :y="75"
          font-size="20"
          font-weight="bold"
          text-anchor="middle"
          :fill="steps[index]"
        >
          {{ sn }}
        </text>
      </svg>
      <!--      </client-only>-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

// noinspection TypeScriptValidateTypes
export default defineComponent({
  name: 'StepBar',
  props: {
    step: {
      type: Number,
      required: true,
    },
    stepNames: {
      type: Array,
      required: true,
    },
    width: {
      type: Number,
      default: 800,
    },
    margin: {
      type: Number,
      default: 150,
    },
  },
  data() {
    return {
      circleCount: 0,

      baseWidth: 0,
      steps: [],
      borderCount: 0,
      gray: '#ccc',
      red: '#f26c5a',
      oneMargin: 0,
    }
  },
  beforeMount() {
    this.draw()
  },
  beforeUpdate() {
    this.steps = []
    this.draw()
  },
  methods: {
    getPoint(index) {
      return this.baseWidth * index + this.oneMargin
    },
    draw() {
      this.circleCount = this.stepNames.length
      // circleCountを元にBoolean型の配列を作成する
      for (let i = 0; i < this.circleCount; i++) {
        if (this.step - 1 < i) {
          this.steps.push(this.gray)
        } else {
          this.steps.push(this.red)
        }
      }

      // 文字の分左右にゆとりをもたせる
      this.baseWidth = (this.width - this.margin) / (this.circleCount - 1)
      this.borderCount = this.circleCount - 1

      this.oneMargin = this.margin / 2
    },
  },
})
</script>

<style lang="scss" scoped>
.step-bar {
  margin: auto;
}
.svg-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%;
}
.svg-wrapper svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
}
</style>
