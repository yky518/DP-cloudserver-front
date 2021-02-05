<template>
  <div id="voucher">
    <div class="date">
      <span class="date_title">激活时间：</span>
      <Date-picker
        type="daterange"
        format="yyyy/MM/dd"
        placeholder="选择日期和时间"
        class="datePicker"
      ></Date-picker>
      <Button class="date_btn">搜索</Button>
    </div>
    <Table
      :columns="voucher"
      :data="voucherList"
      :height="(500 / 1080) * screenHeight"
      ref="voucherTable"
      class="voucherTable"
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
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
      editIndex: -1,
      voucher: [
        {
          title: "代金券编号",
          key: "voucherNum",
          width: 140,
          align: "center",
        },
        {
          title: "面值",
          key: "value",
          width: 100,
          align: "center",
        },
        {
          title: "余额",
          key: "balance",
          width: 100,
          align: "center",
        },
        {
          title: "使用产品",
          key: "produce",
          width: 100,
          align: "center",
        },
        {
          title: "适用范围",
          key: "scope",
          minWidth: 200,
          align: "center",
        },
        {
          title: "订单类型",
          key: "type",
          width: 150,
          align: "center",
        },
        {
          title: "金额限制",
          key: "limit",
          render: (h, params) => {
            return h("div", {}, "满¥" + params.row.limit + "可用");
          },
          width: 120,
          align: "center",
        },
        {
          title: "状态",
          key: "state",
          width: 80,
          align: "center",
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
        },
        {
          title: "备注",
          width: 150,
          align: "center",
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
};
</script>

<style lang="scss" scoped>
#voucher {
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