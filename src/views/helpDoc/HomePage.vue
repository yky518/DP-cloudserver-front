<template>
  <div class="homepage">
    <div @click="doc('resultDoc')">rusultDoc</div>
    <div @click="doc('infoDoc')">infoDoc</div>
  </div>
</template>

<script>
export default {

  methods: {
    doc(name) {
      this.$parent.jump(name);
    },
  },
};
</script>

<style lang="scss" scoped>
.homepage{
  overflow: hidden;
   word-wrap: break-word;
    word-break: normal;
}
</style>