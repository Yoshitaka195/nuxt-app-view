<template>
  <div class="evaluation-grade">
    <span v-if="!numberOnly" class="grade" :class="classOfGrade"></span>
    <span v-if="!iconOnly" class="number">{{ grade }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

type Grade = 0 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5

// noinspection TypeScriptValidateTypes
export default defineComponent({
  props: {
    grade: {
      type: Number as PropType<Grade>,
      required: true,
    },
    iconOnly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    numberOnly: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup({ grade }: { grade: Grade }) {
    const classOfGrade = computed((): string => {
      return `g${String(grade).replace(/\./g, '')}`
    })
    return {
      classOfGrade,
    }
  },
})
</script>

<style lang="scss">
@import '~/assets/style/app.scss';
.evaluation-grade {
  .grade {
    display: inline-block;
    font-size: 1.6rem;
    vertical-align: -0.3rem;

    &::before {
      color: $star-color;
      font-family: 'Material Icons', sans-serif;
    }
    &::after {
      color: $star-color;
      font-family: 'Material Icons', sans-serif;
    }

    &.g0 {
      &::before {
        content: '\e83a\e83a\e83a\e83a\e83a';
      }
    }
    &.g1 {
      &::before {
        content: '\e838';
      }
      &::after {
        content: '\e83a\e83a\e83a\e83a';
      }
    }
    &.g15 {
      &::before {
        content: '\e838\e839';
      }
      &::after {
        content: '\e83a\e83a\e83a';
      }
    }
    &.g2 {
      &::before {
        content: '\e838\e838';
      }
      &::after {
        content: '\e83a\e83a\e83a';
      }
    }
    &.g25 {
      &::before {
        content: '\e838\e838\e839';
      }
      &::after {
        content: '\e83a\e83a';
      }
    }
    &.g3 {
      &::before {
        content: '\e838\e838\e838';
      }
      &::after {
        content: '\e83a\e83a';
      }
    }
    &.g35 {
      &::before {
        content: '\e838\e838\e838\e839';
      }
      &::after {
        content: '\e83a';
      }
    }
    &.g4 {
      &::before {
        content: '\e838\e838\e838\e838';
      }
      &::after {
        content: '\e83a';
      }
    }
    &.g45 {
      &::before {
        content: '\e838\e838\e838\e838\e839';
      }
    }
    &.g5 {
      &::before {
        content: '\e838\e838\e838\e838\e838';
      }
    }
  }
  .number {
    font-weight: bold;
    color: $star-color;
    margin-left: 0.5rem;
  }
}
</style>
