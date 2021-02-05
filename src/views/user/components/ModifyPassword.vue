<template>
  <div id="login">
    <div id="bg">
      <div class="header">
        <div class="logo">
          <img src="../../../assets/img/logo@2x.png" alt="" />
        </div>
        <div class="companyName">DP-Cloudserver</div>
      </div>
      <div class="slogan">
        <div
          class="sloganCN"
          :style="'font-size:' + (36 / 1519) * screenWidth + 'px'"
        >
          分子模拟未来
        </div>
        <div
          class="sloganEN"
          :style="'font-size:' + (22 / 1519) * screenWidth + 'px'"
        >
          Molecule Simulates The Future
        </div>
      </div>
    </div>
    <div id="loginMain">
      <div class="loginMainPadding">
        <h3 class="loginTitle">修改密码</h3>
        <Form
          ref="formCustom"
          :model="formCustom"
          :rules="ruleCustom"
          label-position="top"
          class="loginForm"
        >
          <FormItem label="原密码" prop="passwd">
            <Input type="text" v-model="formCustom.passwd"></Input>
          </FormItem>
          <FormItem label="新密码" prop="passwd2">
            <Input type="password" v-model="formCustom.passwd2"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="passwd3">
            <Input type="password" v-model="formCustom.passwd3"></Input>
          </FormItem>
          <FormItem label="验证" prop="verify">
            <Verify
              @success="success"
              @error="alert('error')"
              :show-button="false"
              :type="3"
              :bar-size="{ width: '100%', height: '36px' }"
              explain="滑过验证"
              class="loginVerify"
            ></Verify>
          </FormItem>
          <FormItem>
            <Button
              :disabled="!slidePass||!samePwd"
              type="primary"
              long
              @click="handleSubmit('formCustom')"
              class="loginBtn"
              >修改密码</Button
            >
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import Verify from "vue2-verify";
import { passwordForget, accountModify } from "@/api/user";

export default {
  name: "Modify",
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formCustom.passwd2) {
        callback(new Error("Password is not same"));
      } else {
        this.samePwd = true;
        callback();
      }
    };
    return {
      slidePass: false,
      samePwd:false,
      formCustom: {
        passwd: "",
        passwd2: "",
        passwd3: "",
      },
      ruleCustom: {
        passwd: [
          {
            required: true,
            message: "Password cannot be empty",
            trigger: "blur",
          },
        ],
        passwd2: [
          {
            required: true,
            message: "Password cannot be empty",
            trigger: "blur",
          },
        ],
        passwd3: [{ validator: validatePass2, trigger: "blur" }],
      },
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
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
  methods: {
    success() {
      this.slidePass = true;
    },
    handleSubmit() {
      accountModify({
        password: this.formCustom.passwd,
        new_password: this.formCustom.passwd2,
      }).then((res) => {
        console.log(res);
        this.$Message.success("修改成功");
        this.$router.push("/account/login");
      }).catch((err)=>{
        console.log(err)
        this.$Message.error("修改失败")
        location.reload()
      })
    },
  },
  components: {
    Verify,
  },
};
</script>

<style lang="scss" scope>
html,
body,
#main {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #f0f2f5;

  font-family: PingFangSC-Semibold, PingFang SC;
}
#login {
  width: 100%;
  height: 100%;
  display: flex;
  background: #ffffff;
  border-radius: 20px;
  #bg {
    // flex: 1;
    width: 57%;
    height: 100%;
    background: url("../../../assets/img/背景@2x.png") no-repeat;
    background-size: 100% 100%;
    // float: left;
    color: #ffffff;
    .header {
      position: absolute;
      top: 4%;
      left: 2%;
      .logo {
        float: left;
        width: 36px;
        height: 36px;
        background: #ffffff;
        border-radius: 10px;
        position: relative;
        img {
          width: 20px;
          height: 18px;
          position: absolute;
          margin: auto;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
      }
      .companyName {
        height: 36px;
        line-height: 36px;
        float: left;
        font-size: 20px;
        margin-left: 16px;
      }
    }
    .slogan {
      position: absolute;
      top: 44%;
      left: 5%;
      .sloganCN {
        font-size: 32px;
        font-weight: 500;
      }
      .sloganEN {
        margin-top: 5px;
        font-size: 18px;
      }
    }
  }
  #loginMain {
    height: 100%;
    flex: 1;
    // padding: 120px 180px 0 180px;
    .loginMainPadding {
      width: 100%;
      height: 100%;
      padding: 8% 15% 0 15%;
      .loginTitle {
        width: 100%;
        height: 56px;
        line-height: 56px;
        text-align: center;
        color: #1f2676;
        font-size: 30px;
        letter-spacing: 4px;
      }
      .loginForm {
        /deep/ .ivu-input {
          background: #fafafa;
          border-radius: 30px;
          border: 1px solid #e8e8e8;
        }
        .loginVerify {
          width: 100%;
          /deep/ .verify-bar-area {
            background: #fafafa;
            border-radius: 30px;
            border: 1px solid #e8e8e8;
            /deep/ .verify-msg {
              color: #999999;
            }
            /deep/ .verify-left-bar,
            .verify-move-block {
              background: #fafafa;
              border-radius: 30px;
              border: 1px solid #e8e8e8;
            }
          }
        }
        .pwd .ivu-col a,
        .pwd .ivu-col /deep/.ivu-checkbox-wrapper {
          color: #666666 !important;
          font-size: 8px;
        }
        .loginBtn {
          width: 100%;
          background: #2b3586;
          color: #ffffff;
          border-radius: 30px;
        }
      }
      .register {
        width: 100%;
        text-align: center;
        color: #999999;
        font-size: 8px;

        a {
          color: #2b3586;
        }
      }
    }
  }
}
.test {
  position: absolute;
  top: 4%;
  left: 2%;
  .test1 {
    float: left;
    width: 48px;
    height: 48px;
    background: #ffffff;
    border-radius: 10px;
    position: relative;
    img {
      width: 30px;
      height: 28px;
      position: absolute;
      margin: auto;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  .test2 {
    height: 48px;
    line-height: 48px;
    float: left;
    font-size: 28px;
    margin-left: 20px;
  }
}
</style>
