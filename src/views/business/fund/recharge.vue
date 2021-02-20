<template>
  <div id="recharge">
    <div class="balance">
      <div class="balance_title">{{i18n.当前余额}}</div>
      <div class="balance_num">¥{{ userBalance }}</div>
    </div>
    <div class="rechargeMain">
      <div class="recharge_title">{{i18n.充值金额}}</div>
      <Input
        class="recharge_input"
        v-model="rechargeAmount"
        @on-change="amountLimit"
        ref="rechargeInput"
      >
        <Icon type="logo-yen" slot="prefix" />
      </Input>
      <div class="recharge_tip">
        {{i18n.可前往收支明细页面查看}}<a @click="recordJump()">{{i18n.充值记录}}</a>
      </div>
    </div>
    <div class="payment">
      <div
        class="payment_type"
        @click="payment = 'alipay'"
        :style="payment == 'alipay' ? 'background:#F4F6FD;' : ''"
      >
        <img
          src="../../../assets/img/zhifubao@2x.png"
          alt=""
          class="payment_typeImg"
        />
        <div class="payment_typeName">{{i18n.支付宝}}</div>
      </div>
      <div
        class="payment_type"
        @click="payment = 'offline'"
        :style="payment == 'offline' ? 'background:#F4F6FD;' : ''"
      >
        <img
          src="../../../assets/img/xianxiahuikuan@2x.png"
          alt=""
          class="payment_typeImg"
        />
        <div class="payment_typeName">{{i18n.线下汇款}}</div>
      </div>
    </div>
    <div v-if="payment == 'alipay'">
      <div class="tips">
        <span style="color: #333333">{{i18n.温馨提示}}</span> <br />
        {{i18n.不支持信用卡方式充值}}
        <br />
        <span style="color: #ff0000"
          >{{i18n.如您有未结清账单充值后优先抵扣未结清账单}}</span
        ><br />
        {{i18n.充值后请及时对支付账单进行结算以免影响正常服务在您消费后DPCloudserver将基于您的消费进行发票开具}}<br />
      </div>
      <div class="understand">
        <Checkbox v-model="understand" class="understandCheckBox"></Checkbox>
        <span class="understandTip"
          >{{i18n.我已了解充值的款项只可用于DPCloudserver消费如需提现DPCloudserver只支持原路退回至付款账户}}</span
        >
      </div>
      <Button
        :disabled="!understand || rechargeAmount == ''"
        class="understandBtn"
        @click.native="recharge()"
        >{{i18n.充值}}</Button
      >
    </div>
    <div v-if="payment == 'offline'">
      <div class="tips">
        <span style="color: #333333">{{i18n.温馨提示}}</span> <br />
        {{i18n.受银行处理时间影响线下汇款方式会有延误}}<span style="color: #ff0000"
          >{{i18n.强烈建议支付宝到账}}</span
        ><br />
        {{i18n.线下汇款直接向阿里的专属账户汇款}}<a
          >{{i18n.更多详情}}</a
        ><br />
        <span style="color: #ff0000"
          >{{i18n.DPCloudserver只支持原路退回至付款账户请慎重选择充值付款账号}}</span
        ><br />
        {{i18n.请避免北京时间进行汇款否则受银行出账时间影响可能出现延迟一天到账情况}}<br />
      </div>
      <div class="offline">
        <div class="offline_title">
          {{i18n.请您通过网银转账或者自行到银行进行汇款汇款账号如下}}
        </div>
        <div class="accountName">
          <span class="accountName_title" :style="$i18n.locale=='en'?'width:90px;':''">{{i18n.开户名称}}</span>
          <span class="accountName_data">北京深势科技有限公司</span>
        </div>
        <div class="accountBank">
          <span class="accountBank_title" :style="$i18n.locale=='en'?'width:90px;':''">{{i18n.开户银行}}</span>
          <img
            src="../../../assets/img/招商银行logo@2x.png"
            alt=""
            class="accountBank_logo"
          />
          <span class="accountBank_name"
            >招商银行股份有限公司北京西三环支行</span
          >
        </div>
        <div class="remittance">
          <span class="remittance_title">{{i18n.专属汇款账号}}</span>
          <span class="remittance_account">1109 3633 4810 601</span>
        </div>
        <div class="sendAccount">
          <span class="sendAccount_title">
            {{i18n.将以上账号免费发送至您绑定的邮箱}}1124****82@qq.com
          </span>
          <Button class="sendAccount_btn"
            >{{i18n.发送邮件}}</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { walletInfo, walletRecharge } from "@/api/finance";
export default {
  data() {
    return {
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
      payment: "alipay",
      understand: false,
      rechargeAmount: "",
      userBalance: "",
    };
  },
  created() {
    walletInfo().then((res) => {
      this.userBalance = res.u_balance.toFixed(2);
    });
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
      return this.$t("index.Recharge");
    }
  },
  methods: {
    // 充值金额约束
    amountLimit(event) {
      let before = this.$refs.rechargeInput.value;
      setTimeout(() => {
        let after = this.$refs.rechargeInput.value;
        if (after > 100000000) this.rechargeAmount = 100000000.0;
        if ((event.data == "." && /^\d*$/.test(before)) || event.data == null)
          return true;
        var reg = /^\d+(\.\d{1,2})?$/;
        if (reg.test(after + "")) {
          return true;
        } else {
          this.rechargeAmount = before;
        }
      }, 0);
    },
    recordJump() {
      this.$parent.$parent.$parent.switchTab("rechargeRecord");
      this.$router.push("/business/businessModule/fund/rechargeRecord");
    },
    recharge() {
      const data = {
        amount: Number.parseFloat(this.rechargeAmount),
        kind: 1,
        channel: 2,
      };
      walletRecharge(data).then((res) => {
        window.location.href = res.code_url;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#recharge {
  width: 100%;
  height: 100%;
  color: #333333;
  .balance {
    overflow: hidden;
    height: 8%;
    .balance_title {
      float: left;
      font-size: 14px;
      height: 36px;
      line-height: 36px;
      margin-right: 30px;
    }
    .balance_num {
      float: left;
      font-size: 20px;
      color: #13227a;
      height: 36px;
      line-height: 36px;
    }
  }
  .rechargeMain {
    height: 9%;
    overflow: hidden;
    font-size: 14px;
    .recharge_title {
      float: left;
      height: 36px;
      line-height: 36px;
      margin-right: 30px;
    }
    .recharge_input {
      width: 17%;
      float: left;
      height: 36px;
      line-height: 36px;
      margin-right: 30px;
      /deep/ .ivu-input {
        border-radius: 20px;
        height: 100%;
      }
      /deep/ .ivu-input-prefix i {
        font-size: 4px;
      }
    }
    .recharge_tip {
      float: left;
      height: 36px;
      line-height: 36px;
      color: #999999;
      a {
        color: #13227a;
      }
    }
  }
  .payment {
    margin-left: 90px;
    margin-top: 10px;
    height: 15%;
    overflow: hidden;
    .payment_type {
      width: 135px;
      height: 60px;
      border: 1px solid #ebebeb;
      float: left;
      margin-right: 45px;
      .payment_typeImg {
        height: 35px;
        margin-top: 8%;
        margin-left: 16%;
        margin-right: 4%;
        float: left;
      }
      .payment_typeName {
        height: 100%;
        line-height: 61px;
        float: left;
      }
    }
  }
  .tips {
    margin-left: 90px;
    margin-top: 10px;
    width: 72%;
    border: 1px solid #f0f0f0;
    padding: 15px 20px;
    background: #fafafa;
    color: #666666;
    font-size: 12px;
    a {
      color: #13227a;
    }
  }
  .understand {
    margin-left: 90px;
    margin-top: 30px;
    .understandCheckBox {
    }
    .understandTip {
      font-size: 12px;
    }
  }
  .understandBtn {
    margin-top: 15px;
    margin-left: 90px;
    width: 120px;
    height: 38px;
    border-radius: 20px;
    color: #ffffff;
  }
  /deep/ .ivu-btn {
    background: #13227a;
  }
  /deep/ .ivu-btn[disabled] {
    background: #b1b4ca;
  }
  .offline {
    margin-left: 90px;
    margin-top: 0px;
    font-size: 14px;
    color: #333333;
    line-height: 26px;
    .offline_title {
      font-size: 10px;
    }
    .accountName {
      margin-left: 30px;
      .accountName_title {
        display: inline-block;
      }
      .accountName_data {
      }
    }
    .accountBank {
      margin-left: 30px;
      .accountBank_title {
        vertical-align: middle;
        display: inline-block;
      }
      .accountBank_logo {
        vertical-align: middle;
        display: inline-block;
        border: 1px solid #ebebeb;
        width: 12%;
        height: 12%;
        padding: 0.5% 1%;
        margin-right: 2%;
      }
      .accountBank_name {
        vertical-align: middle;
        display: inline-block;
      }
    }
    .remittance {
      margin-left: 30px;
      .remittance_title {
        color: #999999;
      }
      .remittance_account {
      }
    }
    .sendAccount {
      margin-left: 35px;
      .sendAccount_title {
        color: #999999;
      }
      .sendAccount_btn {
        border-radius: 20px;
        color: #ffffff;
      }
      .sendAccount_btn:hover{
        background: #13227A;
      }
      /deep/ .ivu-btn {
        background: #b1b4ca;
      }
    }
  }
}
</style>