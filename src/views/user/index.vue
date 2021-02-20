<template>
  <div style="width: 100%; height: 100%" id="user">
    <Dropdown class="languageDropDown">
      <div>
        {{ language == "zh" ? "简体中文" : "English" }}
        <Icon type="ios-arrow-down"></Icon>
      </div>
      <DropdownMenu slot="list">
        <DropdownItem @click.native="changeLanguage()">
          {{ language == "zh" ? "English" : "简体中文" }}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <router-view class="userRouterView"></router-view>
    <div class="icp">网络许可版权 ICP备案等</div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      language: "",
    };
  },
  mounted() {
    this.language = localStorage.getItem("lang");
  },
  methods: {
    changeLanguage() {
      if (this.language == "zh") {
        this.$i18n.locale = "en";
        localStorage.setItem("lang", "en");
      }else{
        this.$i18n.locale = "zh";
        localStorage.setItem("lang", "zh");
      }
      location.reload();
    },
  },
};
</script>

<style scoped lang="scss">
#user {
  width: 100%;
  height: 100%;
  position: relative;
  .languageDropDown {
    position: absolute;
    top: 10%;
    right: 16%;
    border: 1px solid #d9dde2;
    color: #7d7e80;
    z-index: 100;
  }
  .userRouterView {
    width: 68%;
    height: 68%;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .icp {
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
