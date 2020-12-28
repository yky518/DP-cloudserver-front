<template>
  <div id="user">
    <div class="main-panel">

      <div class="flex">
        <div class="img-col">
          <img class="login-img" src="@/assets/img/login.png" alt="">
        </div>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>

<style scoped lang="scss">
#user {
  background-color: #4174FF;
  padding: 100px 300px;
  min-height: 100vh;

  .main-panel {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(3, 0, 43, 1);
    border-radius: 20px;
    overflow: hidden;

    .flex {
      display: flex;

      .img-col {
        display: flex;
        align-items: center;
        width: 57%;
        background: #466cfa;

        .login-img {
          width: 90%;
          margin-left: 5%;
          /*height: 100%;*/
        }
      }
    }
  }
}
</style>
