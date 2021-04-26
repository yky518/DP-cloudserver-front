<template>
  <div id="business">
    <Breadcrumb separator="-" class="businessBread">
      <BreadcrumbItem>{{ i18n.财务分析 }}</BreadcrumbItem>
      <BreadcrumbItem>{{ i18n.财务模块 }}</BreadcrumbItem>
      <BreadcrumbItem v-show="title1 != ''">{{ title1 }}</BreadcrumbItem>
      <BreadcrumbItem v-show="title2 != ''">{{ title2 }}</BreadcrumbItem>
    </Breadcrumb>
    <div
      :style="{
        height: '40px',
        width: '100%',
        zIndex: '13',
        position: 'fixed',
        top: '0px',
        background: '#F5F7F9',
      }"
    ></div>
    <!-- userInfo -->
    <Card class="userInfo">
      <div class="userHead">
        <div class="head" @click="$router.push('/user/modify')">
          <img
            src="../../assets/img/yonghutouxiang@2x.png"
            alt=""
            class="headImg"
          />
        </div>
        <div class="username">HAN LAB</div>
      </div>
      <div class="balance_active">
        <Button
          class="balance_btn"
          style="background: #13227a; color: #ffffff; margin-right: 5px"
          @click.native="recharge()"
          >{{ i18n.充值 }}</Button
        >
        <Button
          class="balance_btn"
          style="border: 1px solid #13227a; color: #13227a; margin-left: 5px"
          @click.native="withdraw()"
          >{{ i18n.提现 }}</Button
        >
      </div>
    </Card>
    <!-- 左侧菜单 -->
    <div class="function-sider">
      <Menu
        ref="financialMenu"
        theme="light"
        style="width: 215px"
        :active-name="title2"
      >
        <Submenu v-for="(item, index) in list" :key="index" :name="item.title">
          <template slot="title">{{ item.title }}</template>
          <MenuItem
            v-for="(item1, index1) in item.children"
            :key="index1"
            @click.native="jump(item.title, item1)"
            class="function-item"
            :name="item1.title"
            >{{ item1.title }}</MenuItem
          >
        </Submenu>
      </Menu>
    </div>
    <main
      :style="{
        marginLeft: '240px',
        overflow: 'hidden',
      }"
      id="moduleMain"
    >
      <!-- 用户信息 -->
      <!-- <Card
        id="accountInf"
        :style="{
          height: (220 / 1080) * screenHeight + 'px',
          padding:
            (26 / 1080) * screenHeight +
            'px ' +
            (60 / 1080) * screenHeight +
            'px',
          left: '460px',
        }"
      >
        <div class="userInfo" @click="$router.push('/user/modify')">
          <div class="head">
            <img
              src="../../assets/img/yonghutouxiang@2x.png"
              alt=""
              class="headImg"
            />
          </div>
          <div class="username">HAN LAB</div>
        </div>
        <div class="balance">
          <div class="balance_title">{{ i18n.账户余额 }}</div>
          <div class="balance_num">¥{{ userBalance }}</div>
          <div class="balance_active">
            <Button
              class="balance_btn"
              style="background: #13227a; color: #ffffff"
              @click.native="recharge()"
              >{{ i18n.充值 }}</Button
            >
            <Button
              class="balance_btn"
              style="border: 1px solid #13227a; color: #13227a"
              @click.native="withdraw()"
              >{{ i18n.提现 }}</Button
            >
          </div>
        </div>
        <div class="remind">
          <div class="remind_title">{{ i18n.财务提醒 }}</div>
          <div class="remind_main">
            <div class="remind_block" @click="invoice()">
              <div class="remind_block_title">{{ i18n.可索取发票 }}</div>
              <div class="remind_block_info">¥3000.00</div>
            </div>
            <div class="remind_block" @click="voucher()">
              <div class="remind_block_title">{{ i18n.代金券数量 }}</div>
              <div class="remind_block_info">2张</div>
            </div>
          </div>
        </div>
      </Card> -->
      <Card
        ref="businessRouter"
        id="businessRouter"
        :style="{
          height: (985 / 1080) * screenHeight + 'px',
        }"
      >
        <div
          slot="title"
          v-show="title2 != i18n.提现 && title2 != i18n.充值"
          class="cardTitle"
        >
          {{ getRouterTitle() }}
          <div v-show="title2 == i18n.导出记录" class="refresh">
            <img src="../../assets/img/shuaxin_icon@2x.png" alt="" />
          </div>
        </div>
        <div slot="title" v-show="title2 == i18n.充值">
          <Tabs
            :value="rechargeTab"
            ref="rechargeTab"
            class="withdrawTab"
            @on-click="fundJump"
          >
            <TabPane :label="i18n.充值" name="recharge"></TabPane>
            <TabPane :label="i18n.充值记录" name="rechargeRecord"></TabPane>
          </Tabs>
        </div>
        <div slot="title" v-show="title2 == i18n.提现">
          <Tabs
            :value="withdrawTab"
            ref="withdrawTab"
            class="withdrawTab"
            @on-click="fundJump"
          >
            <TabPane :label="i18n.提现" name="withdraw"></TabPane>
            <TabPane :label="i18n.提现记录" name="withdrawRecord"></TabPane>
          </Tabs>
        </div>

        <router-view
          :style="{
            width: '100%',
            height: '100%',
            padding: '16px 23px',
          }"
        ></router-view>
      </Card>
    </main>
  </div>
</template>

<script>
import { parseFunctions } from "../../utils/parse";
import { walletInfo } from "@/api/finance";
export default {
  name: "businessModule",
  data: () => ({
    list: [],
    title1: "",
    title2: "",
    withdrawTab: "withdraw",
    rechargeTab: "recharge",
    screenHeight: document.documentElement.clientHeight,
    screenWidth: document.documentElement.clientWidth,
    userBalance: "",
  }),
  computed: {
    i18n() {
      return this.$t("index.Finance");
    },
  },
  watch: {
    title2: {
      handler(newVal, oldVal) {
        if (
          document.getElementById("businessRouter") &&
          document.getElementById("moduleMain")
        ) {
          if (newVal == this.i18n.费用账单) {
            document.getElementById("businessRouter").style.height =
              (1630 / 1080) * this.screenHeight + "px";
            document.getElementById("moduleMain").style.height =
              (1630 / 1080) * this.screenHeight + "px";
            // document.getElementById("accountInf").style.width =
            //   this.$refs.businessRouter.$el.clientWidth + "px";
          } else {
            document.getElementById("businessRouter").style.height =
              (985 / 1080) * this.screenHeight + "px";
            document.getElementById("moduleMain").style.height = "";
          }
          // if (oldVal == this.i18n.费用账单) {
          //   document.getElementById("accountInf").style.width =
          //     this.$refs.businessRouter.$el.clientWidth + 16 + "px";
          // }
        }
        let url = this.$route.path.split("/");
        if (url[4] == "recharge") this.rechargeTab = "recharge";
        else if (url[4] == "rechargeRecord")
          this.rechargeTab = "rechargeRecord";
        else if (url[4] == "withdraw") this.withdrawTab == "withdraw";
        else if (url[4] == "withdrawRecord")
          this.withdrawTab = "withdrawRecord";
      },
      immediate: true,
    },
  },
  mounted() {
    walletInfo().then((res) => {
      this.userBalance = res.u_balance.toFixed(2);
    });
    // 获取左侧菜单
    const functionList = ["fund", "bill", "invoice", "charging"];
    this.list = parseFunctions(functionList);
    console.log(this.list);
    console.log("mounted");
    console.log(this.$refs.businessRouter.$el.clientWidth);
    // if (this.$refs.businessRouter.$el.clientWidth != 0)
    //   document.getElementById("accountInf").style.width =
    //     this.$refs.businessRouter.$el.clientWidth + 16 + "px";
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        this.screenHeight = window.fullHeight; // 高
        this.screenWidth = window.fullWidth; // 宽
      })();
    };
    let url = this.$route.path.split("/");
    if (url[3] != "businessHome") {
      this.searchTitle(url[3] + "/" + url[4], this.list);
      let path = "/business/businessModule/" + url[3] + "/" + url[4];
      if (url[3] == "invoice") path = "/business/businessModule/invoice";
      if (url[4] == "expense") {
        this.$nextTick(() => {
          document.getElementById("businessRouter").style.height =
            (1630 / 1080) * this.screenHeight + "px";
          document.getElementById("moduleMain").style.height =
            (1630 / 1080) * this.screenHeight + "px";
        });
      }
      this.$router.push(path);
      return;
    }
    document.getElementById("businessRouter").style.height =
      (1630 / 1080) * this.screenHeight + "px";
    document.getElementById("moduleMain").style.height =
      (1630 / 1080) * this.screenHeight + "px";
    // document.getElementById("moduleMain").style.height = "";
    this.$router.push("/business/businessModule/businessHome");
  },
  beforeUpdate() {
    let url = this.$route.path.split("/");
    if (url[3] == "businessHome") {
      document.getElementById("businessRouter").style.height =
        (1630 / 1080) * this.screenHeight + "px";
      document.getElementById("moduleMain").style.height = "";
      this.title1 = "";
      this.title2 = "";
    }
  },
  methods: {
    searchTitle(url, list) {
      let x = url.split("/");
      if (x[0] == "withdrawRecord") {
        x[0] = "withdraw";
        this.withdrawTab = "withdrawRecord";
      } else if (x[0] == "rechargeRecord") {
        x[0] = "recharge";
        this.rechargeTab = "rechargeRecord";
      } else if (x[0] == "invoice") {
        this.title2 = this.i18n.发票管理;
        this.$nextTick(() => {
          this.$set(this.$refs.financialMenu, "activeName", this.i18n.发票管理);
          this.$set(
            this.$refs.financialMenu.openedNames,
            0,
            this.i18n.发票管理
          );
          this.$nextTick(() => {
            this.$refs.financialMenu.updateOpened();
            this.$refs.financialMenu.updateActiveName();
            this.title1 = "";
          });
        });
      }
      for (let i in list) {
        if (x[0] == list[i].name) {
          if (list[i].children) {
            this.title1 = list[i].title;
            this.searchTitle(x[1], list[i].children);
          } else {
            this.title2 = list[i].title;
            this.$nextTick(() => {
              this.$set(this.$refs.financialMenu, "activeName", this.title2);
              this.$set(this.$refs.financialMenu.openedNames, 0, this.title1);
              this.$nextTick(() => {
                this.$refs.financialMenu.updateOpened();
                this.$refs.financialMenu.updateActiveName();
              });
            });
            return;
          }
        }
      }
    },
    jump(title, item) {
      this.title1 = title;
      this.title2 = item.title;
      this.$router.push(item.path);
    },
    recharge() {
      this.title1 = this.i18n.资金管理;
      this.title2 = this.i18n.充值;
      this.$router.push("/business/businessModule/fund/recharge");
      this.rechargeTab = "recharge";
      this.refreshMenu();
    },
    withdraw() {
      this.title1 = this.i18n.资金管理;
      this.title2 = this.i18n.提现;
      this.$router.push("/business/businessModule/fund/withdraw");
      this.withdrawTab = "withdraw";
      this.refreshMenu();
    },
    invoice() {
      this.title1 = this.i18n.发票管理;
      this.title2 = this.i18n.发票管理;
      this.$router.push("/business/businessModule/invoice");
      this.refreshMenu();
    },
    voucher() {
      this.title1 = this.i18n.资金管理;
      this.title2 = this.i18n.代金券管理;
      this.$router.push("/business/businessModule/fund/voucher");
      this.refreshMenu();
    },
    fundJump(name) {
      let path = "/business/businessModule/fund/" + name;
      this.$router.push(path);
    },
    getRouterTitle() {
      console.log(this.title2);
      if (this.title2 == "") return this.i18n.近12个月消费趋势;
      return this.title2;
    },
    switchTab() {
      this.rechargeTab = "rechargeRecord";
      this.$refs.rechargeTab.activeKey = "rechargeRecord";
      this.$router.push("/business/businessModule/fund/rechargeRecord");
    },
    jumpToexport() {
      this.title1 = this.i18n.账单管理;
      this.title2 = this.i18n.导出记录;
      this.$router.push("/business/businessModule/bill/export");
    },
    refreshMenu() {
      this.$nextTick(() => {
        this.$set(this.$refs.financialMenu, "activeName", this.title2);
        this.$set(this.$refs.financialMenu.openedNames, 0, this.title1);
        this.$nextTick(() => {
          this.$refs.financialMenu.updateOpened();
          this.$refs.financialMenu.updateActiveName();
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
#business {
  margin: 20px;
  margin-top: 40px;
  .businessBread {
    width: 100%;
    position: fixed;
    top: 20px;
    z-index: 20;
  }
  /deep/ .ivu-breadcrumb {
    color: #333333;
    position: fixed;
    top: 5px;
    margin-left: 5px;
    span:last-child {
      color: #13227a;
      font-weight: 700;
    }
  }
  .ivu-list-item {
    justify-content: space-between;
  }

  .userInfo {
    position: fixed;
    top: 40px;
    margin: 0 0 20px 5px;
    width: 225px;
    height: 150px;
    background: #fff;
    .userHead {
      text-align: center;
      .head {
        .headImg {
          width: 65px;
          border-radius: 100%;
        }
      }
      .username {
      }
    }
    .balance_active {
      text-align: center;
    }
  }

  .function-sider {
    background-color: #ffffff;
    padding: 5px;
    position: fixed;
    top: 210px;
    margin-left: 5px;
    height: calc(100vh - 240px);
    .function-item {
      cursor: pointer;
      border-bottom: 1px solid #f4f4f4;
    }
    /deep/
      .ivu-menu
      .ivu-menu-submenu
      .ivu-menu-submenu-title
      .ivu-icon-ios-arrow-down:before {
      content: "\F102";
      font-size: 24px;
    }
  }
  #accountInf {
    // width: 68.8%;
    position: fixed;
    top: 40px;
    z-index: 11;
    color: #333333;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-color: #eee;
    /deep/ .ivu-card-body {
      padding: 0;
      overflow: hidden;
    }
    // .userInfo {
    //   float: left;
    //   width: 18%;
    //   border-right: 1px solid #ebebeb;
    //   .head {
    //     width: 100%;
    //     text-align: center;
    //     border-radius: 100%;
    //     .headImg {
    //     }
    //   }
    //   .username {
    //     width: 100%;
    //     text-align: center;
    //     color: #333333;
    //     font-size: 16px;
    //   }
    // }
    .balance {
      float: left;
      width: 35%;
      border-right: 1px solid #ebebeb;
      padding-left: 5%;
      .balance_title {
        margin-bottom: 1.5%;
      }
      .balance_num {
        color: #1f2676;
        font-size: 32px;
      }
      .balance_active {
        .balance_btn {
          width: 35%;
          border-radius: 20px;
          font-size: 14px;
          margin-right: 8%;
        }
      }
    }
    .remind {
      float: left;
      width: 47%;
      padding-left: 7%;
      .remind_title {
        margin-bottom: 5%;
      }
      .remind_main {
        overflow: hidden;
        .remind_block {
          float: left;
          margin-right: 20%;
          .remind_block_title {
            color: #999999;
            margin-bottom: 4%;
            font-size: 12px;
          }
          .remind_block_info {
            color: #1f2676;
            font-size: 16px;
          }
        }
      }
    }
  }
  #businessRouter {
    position: relative;
    /deep/ .ivu-card-head {
      padding: 0;
    }
    .refresh {
      float: right;
      img {
        height: 16px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
    .cardTitle {
      padding: 14px 16px;
    }
    .withdrawTab {
      height: 42px;
      z-index: 11;
      /deep/ .ivu-tabs-bar {
        margin-bottom: 0;
        border: 0;
        height: 100%;

        /deep/ .ivu-tabs-tab-active {
          color: #13227a;
        }
        /deep/ .ivu-tabs-ink-bar {
          background-color: #13227a;
        }
      }
    }
    /deep/ .ivu-card-body {
      padding: 0;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      padding-top: 45px;
    }
  }
  /deep/ .ivu-table-cell {
    font-size: 12px;
  }
  /deep/ .ivu-tabs-nav-container {
    height: 100%;
  }
  /deep/ .ivu-tabs-nav {
    height: 100%;
  }
  /deep/ .ivu-tabs-tab {
    height: 43px;
    /deep/ .ivu-tabs-nav {
      height: 100%;
    }
  }
}
</style>
