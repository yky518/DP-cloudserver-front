<template>
  <div id="withdraw">
    <div class="totleAmount">
      <span class="totleAmount_title">{{i18n.可提现总金额为}}</span>
      <span class="totleAmount_num">¥8000.00</span>
      <Tooltip
        theme="light"
        placement="right"
        :content="i18n.账户可提现金额现金余额欠票金额"
        class="totleAmount_tooltip"
      >
        <img src="../../../assets/img/wenti_icon@2x.png" alt="" />
      </Tooltip>
    </div>
    <div class="tableTitle">
      {{i18n.请从以下充值订单中选择进行提现}}<span style="color: #13227a"
        >{{i18n.充值金额先充值先使用已消费使用金额不可通过充值订单提现}}</span
      >
    </div>
    <Table
      class="withdrawTable"
      :columns="topUpOrder"
      :data="topUpOrderList"
      :height="(480 / 1080) * screenHeight"
    >
      <template slot="action" slot-scope="{ row, index }">
        <div style="color: #13227a" @click="withdraw(row, index)">{{i18n.提现}}</div>
      </template>
    </Table>
    <Page class="orderPage" :current="page"></Page>

    <Modal class="withdrawModal" v-model="isShow">
      <template slot="header">
        <div class="withdrawModal_title">{{i18n.提现}}</div>
      </template>
      <Form
        class="withdrawForm"
        label-position="right"
        :label-width="100"
        :model="formData"
      >
        <FormItem :label="i18n.提现金额modal" class="form_item">
          <Input class="form_input short" v-model="formData.amount" ref="withdrawAmount" @on-change="withdrawLimit">
            <Icon type="logo-yen" slot="prefix" />
          </Input>
          <span class="form_tip" style="margin-left: 20px"
            >{{i18n.提现金额不得超过}}¥2000.00</span
          >
        </FormItem>
        <FormItem :label="i18n.提现到账号" class="form_item">
          <Input class="form_input long" v-model="formData.account" disabled></Input>
        </FormItem>
        <FormItem :label="i18n.收款人名称" class="form_item">
          <div>{{ formData.payeeName }}</div>
        </FormItem>
        <FormItem :label="i18n.开户银行" class="form_item">
          <Input class="form_input long" v-model="formData.bank" disabled></Input>
          <div class="form_tip">
            {{i18n.请补全提现的银行账号信息提现只可返回到原充值时的付款账号}}
          </div>
        </FormItem>
        <FormItem :label="i18n.验证码" class="form_item">
          <Input class="form_input short" v-model="formData.code"></Input>
          <Button class="form_btn short">{{i18n.发送验证码}}</Button>
          <div class="form_tip">验证码将发送至您绑定的手机：152****0783</div>
        </FormItem>
      </Form>
      <template slot="footer">
        <Button class="cancelBtn" @click.native="cancel()">{{i18n.取消}}</Button>
        <Button class="confirmBtn" @click.native="confirm()">{{i18n.确认}}</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
      formData: {
        amount: "",
        account: "",
        payeeName: "张三三",
        bank: "",
        code: "",
      },
      page: 1,
      isShow: false,
      topUpOrder: [
        {
          title: "充值订单号",
          key: "rechargeOrder",
          minWidth: 80,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.充值订单号);
          },
        },
        {
          title: "充值时间",
          key: "rechargeTime",
          width: 160,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.充值时间);
          },
        },
        {
          title: "充值金额",
          key: "rechargeAmount",
          width:160,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.充值金额);
          },
        },
        {
          title: "可提现金额",
          key: "withdrawable",
          width:160,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.可提现金额);
          },
        },
        {
          title: "提现渠道",
          key: "channel",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.提现渠道);
          },
        },
        {
          title: "提现到账账号",
          key: "account",
          width:160,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.提现到账账号);
          },
          render:(h,parmas)=>{
            return h("div",{},parmas.row.account.substring(0,3)+"****"+parmas.row.account.substring(12))
          }
        },
        {
          title: "操作",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.操作);
          },
          slot: "action",
        },
      ],
      topUpOrderList: [
        {
          rechargeOrder: "300006667783140884",
          rechargeTime: "2021-01-05 19:18:03",
          rechargeAmount: "¥ 2000.00",
          withdrawable: "¥ 2000.00",
          channel: "银行卡",
          account: "110936334810601",
        },
        {
          rechargeOrder: "300006667783140884",
          rechargeTime: "2021-01-05 19:18:03",
          rechargeAmount: "¥ 2000.00",
          withdrawable: "¥ 2000.00",
          channel: "银行卡",
          account: "110936334810601",
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
    withdraw(row, index) {
      this.isShow = true;
      this.formData.account = row.account
    },
    cancel() {
      this.isShow = false;
      this.formData = {
        amount: "",
        account: "",
        payeeName: "",
        bank: "",
        code: "",
      };
    },
    confirm() {
      this.isShow = false;
      this.formData = {
        amount: "",
        account: "",
        payeeName: "",
        bank: "",
        code: "",
      };
    },
    // 提现金额约束
    withdrawLimit(event){
      let before = this.$refs.withdrawAmount.value;
      setTimeout(()=>{
        let after = this.$refs.withdrawAmount.value;
        if(after>2000)
          this.formData.amount = 2000.00;
        if(event.data == '.'&&/^\d*$/.test(before)||event.data == null)
          return true;
        var reg=  /^\d+(\.\d{1,2})?$/;
        if(reg.test(after+'')){
          return true;
        }else{
          this.formData.amount = before
        }
      },0)
    }
  },
};
</script>

<style lang="scss" scoped>
#withdraw {
  color: #333333;
  .totleAmount {
    overflow: hidden;
    .totleAmount_title {
      vertical-align: middle;
      display: inline-block;
      font-size: 14px;
    }
    .totleAmount_num {
      vertical-align: middle;
      display: inline-block;
      color: #13227a;
      font-size: 20px;
    }
    .totleAmount_tooltip {
      vertical-align: middle;
      display: inline-block;
      margin-left: 30px;
      width: 14px;
      height: 14px;
      /deep/ .ivu-tooltip-inner{
        max-width: 500px;
      }
      /deep/ .ivu-tooltip-rel img {
        width: 14px;
        height: 14px;
      }
    }
  }
  .tableTitle {
    font-size: 12px;
    margin: 8px 0 5px 0;
  }

  .orderPage {
    text-align: center;
    margin-top: 20px;
  }
}
.withdrawModal {
  color: #333333;
  /deep/ .ivu-modal-header {
    border: 0;
  }
  .withdrawModal_title {
    text-align: center;
    font-size: 24px;
  }
  .withdrawForm {
    padding: 0 0 0 30px;
    /deep/ .ivu-form-item {
      margin-bottom: 16px;
    }
    .form_item {
      .form_input {
        /deep/ .ivu-input-prefix i {
          font-size: 4px;
        }
      }
      .form_tip {
        color: #999999;
        font-size: 12px;
      }
      .form_btn {
        margin-left: 20px;
        font-size: 12px;
        border: 1px solid #13227a;
        color: #13227a;
      }
      .short {
        width: 40%;
      }
      .long {
        width: 70%;
      }
    }
  }
  /deep/ .ivu-modal-footer {
    text-align: center;
  }
  .cancelBtn {
    width: 120px;
    height: 40px;
    background: #eaebef;
    color: #999999;
    border-radius: 20px;
    display: inline-block;
  }
  .confirmBtn {
    width: 120px;
    height: 40px;
    background: #13227a;
    color: #ffffff;
    border-radius: 20px;
    display: inline-block;
  }
}
</style>