<template>
  <div id="scc">
    <img src="../../assets/img/暂无任务@2x.png" alt="" class="empty" />
    <span class="emptyTxt">{{$t("index.Default.暂不开放")}}</span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
html,
body,
#main {
  width: 100%;
  height: 100%;
}
#scc {
  width: 100%;
  height: 100%;
  position: relative;
  .empty {
    width: 20%;
    display: inline-block;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .emptyTxt {
    width: 20%;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    margin-top: 35%;
    font-size: 16px;
  }
}
</style>