<template>
  <div style="width:100%;height:100%" id="user">
    <router-view class="userRouterView"></router-view>
    <div class="icp">网络许可版权 ICP备案等</div>
  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>

<style scoped lang="scss">
#user{
  width: 100%;
  height: 100%;
  position: relative;
  .userRouterView{
    width: 68%;
    height: 68%;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .icp{
    width: 100%;
    height: 21px;
    text-align: center;
    position: absolute;
    bottom: 5%;
    font-size: 14px;
    color: #999999;
  }
}
</style>
