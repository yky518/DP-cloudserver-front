<template>
  <div id="expense">
    <Row>
      <Col span="14">
        <div
          id="trend"
          ref="trend"
          :style="{ height: (400 / 1080) * screenHeight + 'px' }"
        ></div>
      </Col>
      <Col span="10">
        <div
          id="distribution"
          ref="distribution"
          :style="{ height: (400 / 1080) * screenHeight + 'px' }"
        ></div>
      </Col>
    </Row>
    <div class="table">
      <div
        class="table_title"
        :style="{ margin: (20 / 1080) * screenHeight + 'px 0' }"
      >
        <div style="float: left; height: 38px; padding-top: 6px">
          {{i18n.账户消费汇总}}
        </div>

        <div class="filter">
          <span class="period">{{i18n.账期}}:</span>
          <Date-picker
            type="month"
            format="yyyy-MM"
            placeholder="选择日期"
            class="period_datePicker"
          ></Date-picker>
          <Button class="searchBtn">{{i18n.搜索}}</Button>
          <Button class="exportBtn" @click.native="isShow = true">
            <img src="../../../assets/img/daochu_按钮@2x.png" alt="" />
            {{i18n.导出月度账单}}
          </Button>
        </div>
      </div>
      <Table
        :columns="subConsume"
        :data="subConsumeList"
        :height="(400 / 1080) * screenHeight"
        :no-data-text="defaultUrl(subUrlType)"
      ></Table>
    </div>
    <div class="table">
      <div
        class="table_title"
        :style="{ margin: (20 / 1080) * screenHeight + 'px 0' }"
      >
        {{i18n.产品消费汇总}}
      </div>
      <Table
        :columns="product"
        :data="productList"
        :height="(400 / 1080) * screenHeight"
        :no-data-text="defaultUrl(productUrlType)"
      ></Table>
    </div>
    <Page style="text-align: center; margin-top: 20px"></Page>
    <Modal v-model="isShow" class="expenseModal">
      <template slot="header">
        <div
          style="
            font-size: 24px;
            text-align: center;
            height: 32px;
            line-height: 32px;
          "
        >
          {{i18n.导出月度账单}}
        </div>
      </template>
      <div class="modal_tip">
        <img src="../../../assets/img/tishi_icon@2x.png" alt="" />
        <span>{{i18n.提示您导出的账单为详细账单请在导出记录中下载}}</span>
      </div>
      <Form label-position="right" :label-width="80" class="modal_form">
        <FormItem :label="i18n.账期+':'">
          <Date-picker
            type="month"
            format="yyyy/MM"
            :placeholder="i18n.选择月份"
          ></Date-picker>
        </FormItem>
        <FormItem :label="i18n.验证码">
          <Verify
            :type="1"
            :codeLength="4"
            @ready="verifyReady()"
            class="expense_Verify"
            ref="expense_verify"
          ></Verify>
        </FormItem>
      </Form>
      <template slot="footer">
        <Button @click.native="submit()" class="confirmBtn"> {{i18n.确定}} </Button>
      </template>
    </Modal>

    <Modal v-model="exportSuccess" title="" class="exportResult" width="450">
      <template slot="header">
        <div class="resultHeader">{{i18n.导出成功}}</div>
      </template>
      <div class="resultStatu">
        <img
          src="../../../assets/img/chenggong@2x.png"
          alt=""
          class="resultImg"
        />
      </div>
      <div class="resultTxt">
        {{i18n.费用账单导出成功文件导出后暂存在平台上7天后自动删除快去导出记录里下载吧}}
      </div>
      <div slot="footer" style="text-align: center">
        <Button class="resultBtn" @click.native="download()">{{i18n.去下载}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
import Verify from "vue2-verify";
import { getTrades, getBills} from "@/api/finance";
export default {
  data() {
    return {
      subUrlType:1,
      productUrlType:1,
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
      testData: [
        [620, 732, 701, 734, 1090, 1130],
        [120, 132, 101, 134, 290, 230],
        [60, 72, 71, 74, 190, 130],
        [62, 82, 91, 84, 33, 110],
        [120, 82, 91, 84, 56, 110],
        [62, 23, 91, 84, 67, 110],
        [0, 0, 0, 0, 0, 0],
      ],
      isShow: false,
      exportSuccess: false,
      subConsume: [
        {
          title: "账期",
          key: "period",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.账期);
          },
        },
        {
          title: "账号",
          key: "account",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.账号);
          },
        },
        {
          title: "账户名称",
          key: "subAccount",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.账户名称);
          },
        },
        {
          title: "原价",
          key: "original_price",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.原价);
          },
        },
        {
          title: "优惠金额",
          key: "discounted_price",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.优惠金额);
          },
        },
        {
          title: "应付金额",
          key: "amounts_payable",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.应付金额);
          },
        },
        {
          title: "现金支付",
          key: "cash_payment",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.现金支付);
          },
        },
        {
          title: "代金券支付",
          key: "voucher_payment",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.代金券支付);
          },
        },
        {
          title: "欠费金额",
          key: "arrears",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.欠费金额);
          },
        },
      ],
      subConsumeList: [
        {
          period: "2020-12",
          account: "admin",
          subAccount: "test1234",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          subAccount: "test1234",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          subAccount: "test1234",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          subAccount: "test1234",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          subAccount: "test1234",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          subAccount: "test1234",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          subAccount: "test1234",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
      ],
      product: [
        {
          title: "账期",
          key: "period",
          width: 90,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.账期);
          },
        },
        {
          title: "账号",
          key: "account",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.账号);
          },
        },
        {
          title: "产品明细",
          key: "details",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.产品明细);
          },
        },
        {
          title: "原价",
          key: "original_price",
          minWidth: 30,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.原价);
          },
        },
        {
          title: "优惠金额",
          key: "discounted_price",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.优惠金额);
          },
        },
        {
          title: "应付金额",
          key: "amounts_payable",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.应付金额);
          },
        },
        {
          title: "现金支付",
          key: "cash_payment",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.现金支付);
          },
        },
        {
          title: "代金券支付",
          key: "voucher_payment",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.代金券支付);
          },
        },
        {
          title: "欠费金额",
          key: "arrears",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.欠费金额);
          },
        },
      ],
      productList: [
        {
          period: "2020-12",
          account: "admin",
          details: "CPU",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          details: "GPU",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          details: "套餐存储",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          details: "超算存储",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          details: "超额流量",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          details: "云超算服务",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
        {
          period: "2020-12",
          account: "admin",
          details: "CPU",
          original_price: "¥ 200020.00",
          discounted_price: "¥ 20000.00",
          amounts_payable: "¥ 20000.00",
          cash_payment: "¥ 20000.00",
          voucher_payment: "¥ 0.00",
          arrears: "¥ 0.00",
        },
      ],
      totelAmount: [1200, 1500, 1500, 1500, 2300, 2200],
    };
  },
  computed:{
    i18n(){
      return this.$t("index.Expense");
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        this.screenHeight = window.fullHeight; // 高
        this.screenWidth = window.fullWidth; // 宽
      })();
    };

    for (let i = 0; i < 6; i++) {
      this.testData[6][i] = 0;
      for (let j = 0; j < 6; j++) {
        this.testData[6][i] += this.testData[j][i];
      }
    }
    const trend = this.$echarts.init(document.getElementById("trend"));
    const trendOption = {
      title: {
        text: this.i18n.消费趋势近6个月,
        top: 0,
        left: 0,
        textStyle: {
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        data: [
          "CPU",
          "GPU",
          "套餐存储",
          "超算存储",
          "超额流量",
          "云超算服务",
        ],
        bottom: "0%",
        itemHeight: 6,
        itemWidth: 10,
      },
      grid: {
        top: "13%",
        left: "3%",
        right: "4%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "2020-08",
            "2020-09",
            "2020-10",
            "2020-11",
            "2020-12",
            "2021-01",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel:{formatter:'¥{value} '},
          // data: ["¥0", "¥100,000", "¥200,000", "¥300,000", "¥400,000"],
          splitLine: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
        },
      ],

      series: [
        // 接口对接好之后,要实时计算总消费,当用户通过legend更改显示数据时,通过legendselectchanged同步修改总消费
        {
          name: "总消费",
          type: "bar",
          barGap: "-100%",
          barWidth: 24,
          color: "#FFFFFF",
          label: {
            normal: {
              show: true,
              position: "top",
              formatter: "¥{c}",
              textStyle: {
                color: "#000000",
              },
            },
          },
          itemStyle: {
            normal: {
              color: "rgba(255, 255, 255, 1)",
            },
          },
          data: this.testData[6],
        },
        {
          name: "CPU",
          type: "bar",
          barWidth: 24,
          color: "#1D2C82",
          stack: "消费趋势",
          data: this.testData[0],
        },
        {
          name: "GPU",
          type: "bar",
          barWidth: 24,
          stack: "消费趋势",
          color: "#E98686",
          data: this.testData[1],
        },
        {
          name: "套餐存储",
          type: "bar",
          barWidth: 24,
          stack: "消费趋势",
          color: "#F2E479",
          data: this.testData[2],
        },
        {
          name: "超算存储",
          type: "bar",
          barWidth: 24,
          stack: "消费趋势",
          color: "#C0D792",
          data: this.testData[3],
        },
        {
          name: "超额流量",
          type: "bar",
          barWidth: 24,
          stack: "消费趋势",
          color: "#6BE5D1",
          data: this.testData[4],
        },
        {
          name: "云超算服务",
          type: "bar",
          barWidth: 24,
          stack: "消费趋势",
          color: "#EF6BA8",
          data: this.testData[5],
        },
      ],
    };
    trend.setOption(trendOption);
    let that = this;
    trend.on("legendselectchanged", function (obj) {
      // 有真实数据之后将对总价值的数值修改变为真实状态(通过obj.selected[obj.name]判断legend变化)
      console.log(obj);
      let list = [];
      for (let item in obj.selected) {
        list.push(item);
      }
      console.log(list);
      for (let item = 0; item < 6; item++) {
        that.testData[6][item] = 0;
        for (let i = 0; i < 6; i++) {
          if (obj.selected[list[i]]) {
            that.testData[6][item] += that.testData[i][item];
          }
        }
      }
      console.log(that.testData[6]);
      trendOption.series[0].data = that.testData[6];
      trendOption.legend.selected = obj.selected;
      trend.setOption(trendOption, true);
    });
    const distribution = this.$echarts.init(
      document.getElementById("distribution")
    );
    const distributionOption = {
      title: {
        text: this.i18n.产品消费分布+"（2021-01）",
        top: 0,
        left: 0,
        textStyle: {
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: "item",
        formatter(params) {
          return `<span style="color:${params.color}">${params.name}<br/>${params.percent}%： ¥${params.value}`;
        },
        extraCssText:
          "background:#FFFFFF;box-shadow: 0px 0px 5px 0px rgba(229, 229, 229, 0.5);",
      },
      legend: {
        orient: "horizontal",
        bottom: 0,
        itemHeight: 6,
        itemWidth: 10,
        data: [
          { name: "CPU", icon: "roundRect" },
          { name: "GPU", icon: "roundRect" },
          { name: "套餐存储", icon: "roundRect" },
          { name: "超算存储", icon: "roundRect" },
          { name: "超额流量", icon: "roundRect" },
          { name: "云超算服务", icon: "roundRect" },
        ],
      },
      color: [
        "#FFC081",
        "#E98686",
        "#F2E479",
        "#C0D792",
        "#6BE5D1",
        "#EF6BA8",
      ],
      series: [
        {
          name: "产品消费分布",
          type: "pie",
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          labelLine: {
            show: false,
          },
          radius: ["45%", "65%"],
          center: ["45%", "45%"], //距离左右，上下距离的百分比
          data: [
            { value: 335, name: "CPU" },
            { value: 310, name: "GPU" },
            { value: 234, name: "套餐存储" },
            { value: 135, name: "超算存储" },
            { value: 1548, name: "超额流量" },
            { value: 1548, name: "云超算服务" },
          ],
        },
      ],
    };
    distribution.setOption(distributionOption);
  },
  components: {
    Verify,
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
    verifyReady() {
      this.$nextTick(() => {
        document.getElementsByClassName("verify-change-code")[0].innerHTML =
          this.i18n.看不清换一张;
      });
    },
    submit() {
      if (
        this.$refs.expense_verify.$children[0].codeChose.toUpperCase() ==
        this.$refs.expense_verify.$children[0].inputValue.toUpperCase()
      ) {
        this.isShow = false;
        this.exportSuccess = true;
        this.$refs.expense_verify.refresh();
      } else {
        // 验证码输入错误,刷新下验证码
        this.$Message.error(this.i18n.验证码错误);
        this.$refs.expense_verify.refresh();
      }
    },
    download() {
      this.exportSuccess = false;
      this.$parent.$parent.$parent.jumpToexport();
    },
  },
};
</script>

<style lang="scss" scoped>
#expense {
  height: 100%;
  /deep/ .ivu-table-tip {
    .tipImg {
      width: 15%;
    }
    .tipTxt {
      font-size: 12px;
    }
  }
  .table {
    margin-top: 20px;
    .table_title {
      overflow: hidden;
      font-size: 16px;
      color: #333333;
      font-weight: 700;

      .filter {
        float: right;
        font-size: 14px;
        font-weight: 500;
        display: inline-block;
        vertical-align: middle;
        .period {
          vertical-align: middle;
        }
        .period_datePicker {
          display: inline-block;
          vertical-align: middle;
          /deep/ .ivu-input {
            width: 160px;
            height: 38px;
            border-radius: 20px;
            border: 1px solid #e9e9e9;
          }
        }
        .account {
          vertical-align: middle;
          margin-left: 20px;
        }
        .account_select {
          width: 160px;
          display: inline-block;
          vertical-align: middle;
          /deep/ .ivu-select-selection {
            width: 160px;
            height: 38px;
            border-radius: 20px;
            border: 1px solid #e9e9e9;
            /deep/ .ivu-select-placeholder {
              height: 38px;
              line-height: 38px;
            }
          }
          /deep/ .ivu-select-dropdown {
            width: 160px;
          }
        }
        .searchBtn {
          display: inline-block;
          vertical-align: middle;
          width: 90px;
          height: 35px;
          font-size: 16px;
          background: #13227a;
          color: #ffffff;
          border-radius: 20px;
          margin-left: 20px;
        }
        .exportBtn {
          img {
            width: 16px;
          }
          width: 150px;
          height: 35px;
          background: #13227a;
          color: #ffffff;
          border-radius: 20px;
          display: inline-block;
          vertical-align: middle;
          margin-left: 40px;
        }
      }
    }
  }
}
.expenseModal {
  /deep/ .ivu-modal {
    width: 480px !important;
    margin-top: 100px;
  }
  /deep/ .ivu-modal-header {
    border: 0;
    height: 60px;
  }
  /deep/ .ivu-modal-close .ivu-icon {
    font-size: 40px;
  }
  .modal_tip {
    border: 1px solid #ffb201;
    border-radius: 8px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff5e1;
    color: #ffb201;
    img {
      height: 16px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  .modal_form {
    padding-top: 20px;
    padding-left: 25px;
    /deep/ .ivu-date-picker-rel {
      width: 200px;
    }
  }
  /deep/ .ivu-modal-body {
    padding-bottom: 0;
  }
  /deep/ .ivu-modal-footer {
    padding-top: 0;
    border: 0;
    text-align: center;
    .confirmBtn {
      width: 120px;
      height: 40px;
      background: #13227a;
      color: #ffffff;
      border-radius: 20px;
      display: inline-block;
    }
  }
}
.expense_Verify {
  /deep/ .verify-code {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px !important;
    width: 100px !important;
    height: 32px !important;
    line-height: 32px !important;
    position: relative;
    right: 125px;
  }
  /deep/ .verify-code-area {
    display: inline-block;
    vertical-align: middle;
    width: 240px !important;
    /deep/ .varify-input-code {
      width: 80%;
      height: 32px;
      line-height: 1.5;
      padding: 4px 7px;
      font-size: 14px;
      border: 1px solid #dcdee2;
      border-radius: 4px;
    }
    /deep/ .verify-change-area {
      position: relative;
      left: 80px;
      font-size: 12px;
      color: #999999;
    }
  }
  /deep/ .verify-btn {
    display: none;
  }
}
.exportResult {
  /deep/ .ivu-modal-header {
    border: 0;
  }
  /deep/ .ivu-modal-body {
    padding: 16px 64px;
  }
  /deep/ .ivu-modal-footer {
    border: 0;
  }
  .resultHeader {
    font-size: 20px;
    text-align: center;
  }
  .resultStatu {
    text-align: center;
    margin-bottom: 24px;
    .resultImg {
      width: 70px;
    }
  }
  .resultTxt {
  }
  .resultBtn {
    width: 90px;
    height: 35px;
    font-size: 16px;
    background: #13227a;
    color: #ffffff;
    border-radius: 20px;
  }
}
</style>