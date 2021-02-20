<template>
  <div id="left-menu">
    <div class="logo">
      <img
        src="../assets/img/DP-cloudserver_logo@2x.png"
        style="vertical-align: middle; width: 30px; margin: 0 6px"
        alt=""
      />
      <span style="font-size: 20px; color: #333333; vertical-align: middle"
        >DP-Cloudserver</span
      >
    </div>
    <Menu
      width="auto"
      ref="side_menu"
      :active-name="active"
      :open-names="openNames"
      :class="menuitemClasses"
      accordion
    >
      <Submenu
        :name="menu.name"
        v-for="(menu, index) in menus"
        :key="'menus' + index"
      >
        <template slot="title">
          <img :src="menu.icon" alt="" class="icon-img" />
          <span style="vertical-align: middle">{{$t("index.LeftMenu."+menu.title)}}</span>
        </template>
        <MenuItem
          :name="child.path"
          :to="child.path"
          v-for="(child, iindex) in menu.children"
          :key="'subitem' + iindex"
        >
          {{ $t("index.LeftMenu."+child.title) }}
        </MenuItem>
      </Submenu>
    </Menu>
    <div style="height: 75px; width: 200px; display: inline=block"></div>
    <Card class="userCard">
      <div style="overflow: hidden">
        <p @click="$router.push('/user/modify')" class="userInfo">
          <img src="../assets/img/yonghutouxiang@2x.png" alt="" />
          <span class="item-text">{{ $store.state.user.name }}</span>
        </p>
        <Dropdown class="languageDropDown" transfer>
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
        <p @click="isShow = true" class="quit">
          <img src="../assets/img/icon_tuichu.png" alt="" />
          <span>{{$t("index.LeftMenu.退出")}}</span>
        </p>
      </div>
    </Card>
    <Modal v-model="isShow" class="quitModal">
      <div class="quitContent">确定要退出吗?</div>
      <template slot="footer" style="text-align: center">
        <Button @click.native="isShow = false" class="quitBtn">取消</Button>
        <Button @click.native="quit()" class="quitBtn">确定</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { asyncMenus, parseMenus } from "@/utils/parse";

export default {
  name: "LeftMenu",
  props: ["is-collapsed"],
  data() {
    return {
      menus: [],
      active: "",
      openNames: [],
      isShow: false,
      language:'',
    };
  },
  created() {
    // const menus = this.$store.state.routes.routes;
    const menus = [
      "Infos",
      "function",
      "cloud",
      "create",
      "user",
      "authority",
      "task",
      "server",
      "file",
      "businessModule",
    ];
    this.menus = parseMenus(asyncMenus, menus);
    console.log(this.menus)
    this.$nextTick(() => {
      this.active = this.$route.path;
      this.openNames = [this.$route.path.split("/")[1]];
    });
    this.language = localStorage.getItem("lang");
  },
  watch: {
    openNames() {
      this.$nextTick(() => {
        this.$refs.side_menu.updateOpened();
        this.$refs.side_menu.updateActiveName();
      });
    },
  },
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
  },
  methods: {
    quit() {
      this.$store.dispatch("user/logout").then(() => {
        this.$Message.success("退出登录");
        this.$router.push("/account/login");
      });
    },
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
#left-menu {
  //color: #ffffff;
  //left: 0;
  margin-bottom: 200px;
  .logo {
    margin: 10px 0;
  }
  .title {
    .title-img {
      vertical-align: middle;
      width: 30px;
      margin: 5px 5px;
    }
  }

  .ivu-menu.ivu-menu-light {
    background: transparent;

    .icon-img {
      vertical-align: middle;
      margin: 0 10px;
      width: 20px;
    }

    &::after {
      background: transparent;
    }

    .ivu-menu-item {
      a {
        /*&.router-link-active {
          color: #2d8cf0;
        }*/
      }

      &.ivu-menu-item-active:not(.ivu-menu-submenu) {
        /*background: #355fff;*/
        //color: #355fff;
        &::after {
          left: 0;
          right: auto;
          width: 5px;
          background: #1f2676;
        }
      }
    }
  }

  .menu-item {
    width: 200px !important;
    height: calc(100vh-125px) !important;
    display: inline-block;
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    //width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
  }
  .menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
  }
  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .userCard {
    width: 200px;
    height: 75px;
    position: absolute;
    bottom: 0;
    background: #ffffff;
    padding-top: 3px;
    /deep/ .ivu-card-body{
      padding-bottom: 0;
    }
    .userInfo {
      height: 30px;
      line-height: 30px;
      float: left;
      font-size: 16px;
      img {
        vertical-align: middle;
        width: 30px;
        margin: 0 6px;
      }
      span {
        color: #333333;
        vertical-align: middle;
      }
    }
    .languageDropDown{
      float: right;
    }
    .quit {
      height: 30px;
      line-height: 30px;
      float: right;
      font-size: 13px;
      img {
        vertical-align: middle;
        width: 14px;
        margin: 0 6px;
      }
      span {
        vertical-align: middle;
        color: #999999;
      }
    }
  }
}
.quitModal {
  /deep/ .ivu-modal {
    width: 300px !important;
  }
  /deep/ .ivu-modal-content {
    text-align: center;
  }
  /deep/ .ivu-modal-body {
    height: 100px !important;
  }
  /deep/ .ivu-modal-close {
    display: none;
  }
  .quitContent {
    display: inline-block;
    text-align: center;
    margin-top: 24px;
    font-size: 20px;
  }
  .quitBtn {
  }
}
::-webkit-scrollbar {
  width: 0 !important;
}
</style>
