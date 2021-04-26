<template>
  <div id="voucher">
    <div class="date">
      <span class="date_title">{{i18n.激活时间}}</span>
      <Date-picker
        type="daterange"
        format="yyyy/MM/dd"
        placeholder="选择日期和时间"
        class="datePicker"
      ></Date-picker>
      <Button class="date_btn">{{i18n.搜索}}</Button>
    </div>
    <Table
      :columns="voucher"
      :data="voucherList"
      :height="(750 / 1080) * screenHeight"
      ref="voucherTable"
      class="voucherTable"
      :no-data-text="defaultUrl(voucherUrlType)"
    >
      <template slot="action">
        <div style="text-align: center; color: #13227a">使用明细</div>
      </template>
    </Table>
    <Page style="text-align: center; margin-top: 20px"></Page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      voucherUrlType:1,
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
      editIndex: -1,
      voucher: [
        {
          title: "代金券编号",
          key: "voucherNum",
          width: 140,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.代金券编号);
          },
        },
        {
          title: "面值",
          key: "value",
          width: 100,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.面值);
          },
        },
        {
          title: "余额",
          key: "balance",
          width: 100,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.余额);
          },
        },
        {
          title: "使用产品",
          key: "produce",
          width: 100,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.使用产品);
          },
        },
        {
          title: "适用范围",
          key: "scope",
          minWidth: 200,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.适用范围);
          },
        },
        {
          title: "订单类型",
          key: "type",
          width: 150,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.订单类型);
          },
        },
        {
          title: "金额限制",
          key: "limit",
          render: (h, params) => {
            return h("div", {}, "满¥" + params.row.limit + "可用");
          },
          width: 120,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.金额限制);
          },
        },
        {
          title: "状态",
          key: "state",
          width: 80,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.状态);
          },
        },
        {
          title: "生效时间/失效时间",
          key: "time",
          render: (h, params) => {
            return h("div", {}, [
              h("div", {}, params.row.effective_time),
              h("div", {}, params.row.expiration_time),
            ]);
          },
          width: 180,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.生效时间失效时间);
          },
        },
        {
          title: "备注",
          width: 150,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.备注);
          },
          render: (h, params) => {
            let text = params.row.remarks;
            let toolText = text;
            let a = (100 / 1536) * this.screenWidth;
            if (!params.row.remarks) {
              text = "添加备注信息";
              toolText = "";
            }
            if (this.editIndex != params.index) {
              if (!params.row.remarks) {
                return h(
                  "div",
                  {
                    style: {
                      color: "#999999",
                      fontSize: "12px",
                    },
                    on: {
                      dblclick: () => {
                        if (
                          !this.$refs.voucherTable.objData[params.index]
                            ._isDisabled
                        ) {
                          this.editIndex = params.index;
                        }
                      },
                    },
                  },
                  text
                );
              }
              return h("div", [
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "top",
                      transfer: true,
                    },
                  },
                  [
                    //这个中括号表示是Tooltip标签的子标签
                    //表格列显示文字
                    h(
                      "div",
                      {
                        style: {
                          width: a + "px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box", //作为弹性伸缩盒子模型显示。
                          webkitBoxOrient: "vertical", //设置伸缩盒子的子元素排列方式--从上到下垂直排列
                          webkitLineClamp: 2, //显示的行
                        },
                        on: {
                          dblclick: () => {
                            if (
                              !this.$refs.voucherTable.objData[params.index]
                                ._isDisabled
                            ) {
                              this.editIndex = params.index;
                            }
                          },
                        },
                      },
                      text
                    ),
                    h(
                      "div",
                      {
                        slot: "content",
                        style: {
                          width: a*2 + "px",
                          whiteSpace: "normal",
                          wordBreak: "break-all",
                        },
                      },
                      toolText //整个的信息即气泡内文字)
                    ),
                  ]
                ),
              ]);
            } else {
              this.$nextTick(() => {
                this.$refs.editInput.focus();
              });
              return this.$createElement(
                "Input",
                {
                  ref: "editInput",
                  props: {
                    type: "text",
                    size: "small",
                    value: params.row.remarks,
                  },
                  on: {
                    "on-enter": (e) => {
                      this.voucherList[params.index].remarks = e.target.value;
                      this.editIndex = -1;
                    },
                    "on-blur": (e) => {
                      this.voucherList[params.index].remarks = e.target.value;
                      this.editIndex = -1;
                    },
                  },
                },
                text
              );
            }
          },
        },
        {
          title: "操作",
          slot: "action",
          minWidth: 100,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.操作);
          },
        },
      ],
      voucherList: [
        {
          voucherNum: "Q-1db1af673a3",
          value: "¥ 5000.00",
          balance: "¥ 5000.00",
          produce: "部分产品",
          scope: "官网产品（不含域名、主机、网站产品）",
          type: "云新购，云升级",
          limit: "2500",
          state: "审核中",
          effective_time: "2020-11-09 00:00:00",
          expiration_time: "2020-11-12 00:00:00",
          remarks: "",
        },
        {
          voucherNum: "Q-1db1af673a3",
          value: "¥ 500.00",
          balance: "¥ 500.00",
          produce: "部分产品",
          scope: "官网产品（不含域名、主机、网站产品）",
          type: "云新购",
          limit: "2500",
          state: "审核中",
          effective_time: "2020-11-09 00:00:00",
          expiration_time: "2020-11-12 00:00:00",
          remarks: "",
        },
        {
          voucherNum: "Q-1db1af673a3",
          value: "¥ 500.00",
          balance: "¥ 500.00",
          produce: "部分产品",
          scope: "官网产品（不含域名、主机、网站产品）",
          type: "云新购",
          limit: "2500",
          state: "审核中",
          effective_time: "2020-11-09 00:00:00",
          expiration_time: "2020-11-12 00:00:00",
          remarks: "",
        },
        {
          voucherNum: "Q-1db1af673a3",
          value: "¥ 500.00",
          balance: "¥ 500.00",
          produce: "部分产品",
          scope: "官网产品（不含域名、主机、网站产品）",
          type: "云新购",
          limit: "2500",
          state: "审核中",
          effective_time: "2020-11-09 00:00:00",
          expiration_time: "2020-11-12 00:00:00",
          remarks: "",
        },
        {
          voucherNum: "Q-1db1af673a3",
          value: "¥ 500.00",
          balance: "¥ 500.00",
          produce: "部分产品",
          scope: "官网产品（不含域名、主机、网站产品）",
          type: "云新购",
          limit: "2500",
          state: "审核中",
          effective_time: "2020-11-09 00:00:00",
          expiration_time: "2020-11-12 00:00:00",
          remarks: "",
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
      return this.$t("index.Voucher");
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
#voucher {
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
      margin-left: 20px;
      background: #13227a;
      border-radius: 20px;
      color: #ffffff;
      vertical-align: middle;
      display: inline-block;
    }
  }
  .voucherTable {
    width: 100%;
    /deep/ .ivu-table-cell {
      font-size: 12px;
    }
  }
}
</style>