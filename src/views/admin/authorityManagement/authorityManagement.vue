<template>
  <div id="authority">
    <Breadcrumb separator="-">
      <BreadcrumbItem>{{i18n.用户设置}}</BreadcrumbItem>
      <BreadcrumbItem>{{i18n.信息修改}}</BreadcrumbItem>
    </Breadcrumb>

    <!-- License管理区 -->
    <Row :gutter="24">
      <Col span="12">
        <Card
          :style="{
            height: (400 / 1080) * screenHeight + 'px',
            marginBottom: '20px',
          }"
        >
          <Row :gutter="16">
            <Col span="24">
              <Form :model="license" :disabled="!licenseRevising">
                <Row :gutter="80">
                  <Col span="16">
                    <FormItem prop="licenseManagement" :label="i18n.License管理">
                      <Input
                        type="text"
                        v-model="license.licenseManagement"
                      ></Input>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <div
            style="
              width: 100%;
              position: absolute;
              bottom: 20px;
            "
            class="footerBtn"
          >
            <Button
              shape="circle"
              :disabled="licenseRevising"
              @click.native="licenseRevising = !licenseRevising"
              >{{i18n.修改}}</Button
            >
            <Button
              shape="circle"
              :disabled="!licenseRevising"
              @click.native="licenseRevising = !licenseRevising"
              >{{i18n.保存}}</Button
            >
          </div>
        </Card>
      </Col>
      <Col span="12">
        <Card
          :style="{
            height: (400 / 1080) * screenHeight + 'px',
            marginBottom: '20px',
          }"
        >
          <Form :model="license" :disabled="!noticeRevising">
            <Row :gutter="16">
              <Col span="12">
                <FormItem :label="i18n.集群当前储存上限" prop="name">
                  <Input type="text" v-model="license.cluster">
                    <template slot="suffix">
                      <div style="line-height: 32px">GB</div>
                    </template></Input
                  >
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem :label="i18n.套餐当前储存上限" prop="name">
                  <Input type="text" v-model="license.setMeal">
                    <template slot="suffix">
                      <div style="line-height: 32px">GB</div>
                    </template></Input
                  >
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem
                  prop="notice"
                  :label="i18n.通知+'('+i18n.以下情况通知我+')'"
                  class="checkForm"
                >
                  <i-switch v-model="license.isNotice" />
                  <CheckboxGroup v-model="license.notice" size="small">
                    <Row>
                      <Col span="6">
                        <Checkbox
                          label="notEnough"
                          :disabled="!license.isNotice"
                          >{{i18n.账户余额不足}}</Checkbox
                        >
                      </Col>
                      <Col span="6">
                        <Checkbox label="discount" :disabled="!license.isNotice"
                          >{{i18n.优惠活动}}</Checkbox
                        >
                      </Col>
                      <Col span="6">
                        <Checkbox label="end" :disabled="!license.isNotice"
                          >{{i18n.任务结束}}</Checkbox
                        >
                      </Col>
                      <Col span="6">
                        <Checkbox label="email" :disabled="!license.isNotice"
                          >{{i18n.邮件提醒}}</Checkbox
                        >
                      </Col>
                    </Row>
                    <Row>
                      <Col span="6">
                        <Checkbox label="sms" :disabled="!license.isNotice"
                          >{{i18n.短信提醒}}</Checkbox
                        >
                      </Col>
                      <Col>
                        <Checkbox label="space" :disabled="!license.isNotice"
                          >{{i18n.剩余空间不足}}:</Checkbox
                        >
                        <Input
                          type="text"
                          v-model="license.freeSpace"
                          :disabled="!license.isNotice"
                          style="width: 100px"
                        > 
                          <template slot="suffix">
                            <div style="line-height: 32px">GB</div>
                          </template>
                        </Input>
                      </Col>
                    </Row>
                  </CheckboxGroup>
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div
            style="
              width: 100%;
              position: absolute;
              bottom: 20px;
            "
            class="footerBtn"
          >
            <Button
              shape="circle"
              :disabled="noticeRevising"
              @click.native="noticeRevising = !noticeRevising"
              >{{i18n.修改}}</Button
            >
            <Button
              shape="circle"
              :disabled="!noticeRevising"
              @click.native="noticeRevising = !noticeRevising"
              >{{i18n.保存}}</Button
            >
          </div>
        </Card>
      </Col>
    </Row>
    <Card :style="{ height: (560 / 1080) * screenHeight + 'px' }">
      <p slot="title">{{i18n.发票抬头}}</p>
      <Card
        style="width: 240px; height: 120px; float: left; margin-right: 50px"
        v-for="(item, index) in invoiceList"
        :key="index"
      >
        <Row>
          <Col span="3"
            ><img
              src="../../../assets/img/fapiao_icon@2x.png"
              alt=""
              style="width: 16px; height: 16px"
          /></Col>
          <Col span="21"
            ><div>{{ item.corporateName }}</div></Col
          >
        </Row>
        <div style="margin: 5px 0 0 25px">税号:{{ item.taxNum }}</div>
        <div
          style="
            width: 100%;
            text-align: center;
            margin-top: 30px;
            color: #13227a;
          "
          @click="isShow = true"
        >
          +{{i18n.添加发票抬头}}
        </div>
      </Card>
    </Card>

    <Modal v-model="isShow" title="">
      <template slot="header">
        <div>{{i18n.添加发票抬头}}</div>
      </template>
      <Form
        :model="detail"
        label-position="top"
        style="margin-top: 20px; padding: 0 60px"
        :rules="formRule"
        :disabled="!revising"
      >
        <Row :gutter="24">
          <Col span="12">
            <FormItem prop="invoiceDetails" :label="i18n.抬头类型" class="checkForm">
              <CheckboxGroup v-model="detail.invoiceDetails" size="large">
                <Checkbox label="account">{{i18n.企业单位}}</Checkbox>
                <Checkbox label="finance">{{i18n.个人非个人单位}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem prop="corporateName" :label="i18n.公司名称">
              <Input type="text" v-model="detail.corporateName"></Input>
            </FormItem>
          </Col>
        </Row>

        <Row :gutter="24">
          <Col span="12">
            <FormItem prop="taxNum" :label="i18n.公司税号">
              <Input type="text" v-model="detail.taxNum"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem prop="address" :label="i18n.公司地址+'('+i18n.非必填+')'">
              <Input type="text" v-model="detail.address"></Input>
            </FormItem>
          </Col>
        </Row>

        <Row :gutter="24">
          <Col span="12">
            <FormItem prop="bankOfDeposit" :label="i18n.公司开户行+'('+i18n.非必填+')'">
              <Input type="text" v-model="detail.bankOfDeposit"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem prop="accountNum" :label="i18n.开户行账号+'('+i18n.非必填+')'">
              <Input type="text" v-model="detail.accountNum"></Input>
            </FormItem>
          </Col>
        </Row>

        <Row :gutter="24">
          <Col span="12">
            <FormItem prop="remarks" :label="i18n.备注+'('+i18n.非必填+')'">
              <Input type="text" v-model="detail.remarks"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <template slot="footer">
        <div style="" class="footerBtn">
          <Button
            shape="circle"
            type="primary"
            :disabled="revising"
            @click="revising = true"
            >{{i18n.修改}}</Button
          >
          <Button
            shape="circle"
            type="primary"
            @click="
              isShow = false;
              revising = false;
            "
            :disabled="!revising"
            >{{i18n.保存}}</Button
          >
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "authority",
  components: {},
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      isShow: false,
      licenseRevising: false,
      noticeRevising: false,
      revising: false,
      license: {
        licenseManagement: "",
        certificationBody: "",
        notice: [],
        isNotice: false,
        cluster: "",
        setMeal: "",
        freeSpace: "",
      },
      detail: {
        invoiceDetails: [],
        corporateName: "",
        taxNum: "",
        address: "",
        bankOfDeposit: "",
        accountNum: "",
        remarks: "",
      },
      mechanism: [
        {
          value: "beijingdaxue",
          label: "北京大学",
        },
        {
          value: "qinghuadaxue",
          label: "清华大学",
        },
      ],
      invoiceList: [
        {
          invoiceDetails: ["account"],
          corporateName: "北京深势科技有限公司",
          taxNum: "91110108MA01FUT49",
          address: "北京市海淀区中关村SOHO大厦515室",
          bankOfDeposit: "招商银行股份有限公司北京西三环支行",
          accountNum: "6666666666666",
          remarks: "",
        },
        {
          invoiceDetails: ["finance"],
          corporateName: "北京深势科技有限公司",
          taxNum: "91110108MA01FUT49",
          address: "北京市海淀区中关村SOHO大厦515室",
          bankOfDeposit: "招商银行股份有限公司北京西三环支行",
          accountNum: "6666666666666",
          remarks: "",
        },
      ],
      formRule: {
        invoiceDetails: [
          {
            required: true,
            message: "Head up type cannot be empty",
            trigger: "blur",
          },
        ],
        corporateName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" },
        ],
        taxNum: [{ required: true, message: "税号不能为空", trigger: "blur" }],
      },
    };
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
  },
  computed:{
    i18n(){
      return this.$t("index.ModifyInformation");
    }
  },
  methods: {},
};
</script>

<style scoped lang="scss">
#authority {
  margin: 20px;
  /deep/ .ivu-breadcrumb {
    color: #333333;
    span:last-child {
      color: #13227a;
      font-weight: 700;
    }
  }

  .card-panel {
    margin: 10px 0;
    background-color: #ffffff;
    border: 0;

    h2,
    h3 {
      color: #333333;
    }

    /deep/ .ivu-form .ivu-form-item-label {
      color: #333333;
    }
  }
  .checkForm {
    /deep/ .ivu-checkbox-inner {
    }
    /deep/ .ivu-form-item-label {
      padding-bottom: 0;
    }
  }
}

.footerBtn {
  text-align: center;
  /deep/ .ivu-btn {
    width: 120px;
    margin-right: 20px;
    border-radius: 20px;
    display: inline-block;
    color: #ffffff;
    background: #13227a;
  }
  /deep/ .ivu-btn[disabled] {
    background: #b1b4ca;
  }
}
</style>
