<template>
  <div id="withdrawRecord">
    <div class="date">
      <span class="date_title">{{i18n.申请提现时间}}</span>
      <Date-picker
        type="daterange"
        format="yyyy/MM/dd"
        placeholder="选择日期和时间"
        class="datePicker"
      ></Date-picker>
      <Button class="date_btn">{{i18n.搜索}}</Button>
    </div>
    <Table
      :columns="record"
      :data="recordList"
      :height="(500 / 1080) * screenHeight"
      :no-data-text="defaultUrl(withdrawUrlType)"
    ></Table>
    <Page style="text-align: center; margin-top: 20px"></Page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      withdrawUrlType:1,
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
      record: [
        {
          title: "提现单号",
          key: "recordOrder",
          minWidth: 60,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.提现单号);
          },
        },
        {
          title: "申请提现时间",
          key: "withdrawTime",
          minWidth: 50,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.申请提现时间);
          },
        },
        {
          title: "申请人",
          key: "applicant",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.申请人);
          },
        },
        {
          title: "提现金额",
          key: "amount",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.提现金额);
          },
        },
        {
          title: "操作完成时间",
          key: "completeTime",
          minWidth: 50,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.操作完成时间);
          },
        },
        {
          title: "提现到账账号",
          key: "account",
          align:"center",
          width:160,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.提现到账账号);
          },
        },
        {
          title: "状态",
          key: "state",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.状态);
          },
        },
      ],
      recordList: [
        {
          recordOrder: "300006667783140884",
          withdrawTime: "2021-01-05 19:18:03",
          applicant: "test1234",
          amount: "¥ 2000.00",
          completeTime: "2021-01-05 21:34:12",
          account: "110****403",
          state: "审核中",
        },
        {
          recordOrder: "300006667783140884",
          withdrawTime: "2021-01-05 19:18:03",
          applicant: "test1234",
          amount: "¥ 2000.00",
          completeTime: "2021-01-05 21:34:12",
          account: "110****403",
          state: "审核中",
        },
        {
          recordOrder: "300006667783140884",
          withdrawTime: "2021-01-05 19:18:03",
          applicant: "test1234",
          amount: "¥ 2000.00",
          completeTime: "2021-01-05 21:34:12",
          account: "110****403",
          state: "审核中",
        },
        {
          recordOrder: "300006667783140884",
          withdrawTime: "2021-01-05 19:18:03",
          applicant: "test1234",
          amount: "¥ 2000.00",
          completeTime: "2021-01-05 21:34:12",
          account: "110****403",
          state: "审核中",
        },
        {
          recordOrder: "300006667783140884",
          withdrawTime: "2021-01-05 19:18:03",
          applicant: "test1234",
          amount: "¥ 2000.00",
          completeTime: "2021-01-05 21:34:12",
          account: "110****403",
          state: "审核中",
        },
      ],
    };
  },
  created() {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        this.screenHeight = window.fullHeight; // 高
        this.screenWidth = window.fullWidth; // 宽
      })();
    };
  },
  computed:{
    i18n(){
      return this.$t("index.Withdraw");
    }
  },
  methods: {
    defaultUrl(type) {
      if (type == 1) {
        return `<img class='tipImg' src=${require("../../../assets/img/暂无任务@2x.png")}><div class='tipTxt'>${this.$t("index.Default.暂无任务")}</div>`;
      } else if (type == 2) {
        return `<img class='tipImg' src=${require("../../../assets/img/网络错误@2x.png")}><div class='tipTxt'>${this.$t("index.Default.网络错误")}</div>`;
      } else if (type == 3) {
        return `<img class='tipImg' src=${require("../../../assets/img/无搜索内容@2x.png")}><div class='tipTxt'>${this.$t("index.Default.无搜索结果")}</div>`;
      } else if (type == 4) {
        return `<img class='tipImg' src=${require("../../../assets/img/无权限@2x.png")}><div class='tipTxt'>${this.$t("index.Default.无权限")}</div>`;
      } else if (type == 5) {
        return `<img class='tipImg' src=${require("../../../assets/img/404@2x.png")}><div class='tipTxt'>${this.$t("index.Default.404报错")}</div>`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#withdrawRecord {
  /deep/ .ivu-table-tip {
    .tipImg {
      width: 15%;
    }
    .tipTxt {
      font-size: 12px;
    }
  }
  .date {
    margin-bottom: 10px;
    .date_title {
      vertical-align: middle;
    }
    .datePicker {
      vertical-align: middle;
      display: inline-block;
      /deep/ .ivu-input {
        width: 220px;
        height: 38px;
        border-radius: 20px;
        border: 1px solid #e9e9e9;
      }
    }
    .date_btn {
      width: 120px;
      height: 38px;
      background: #13227a;
      border-radius: 20px;
      color: #ffffff;
      vertical-align: middle;
      display: inline-block;
      margin-left: 15px;
    }
  }
}
</style>