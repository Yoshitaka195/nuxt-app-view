<template>
  <footer :class="classes">
    <!-- <p>
      <span>COPYRIGHT &copy;</span>
      <span>{{ new Date().getFullYear() }} </span>
      <a href="https://about.appre-marche.com/" target="_blank" rel="nofollow"
        >AppreInc</a
      >
      <span class="hidden sm:inline-block">, All rights Reserved</span>
    </p> -->
  </footer>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: '',
    },
  },
}
</script>
