<template>
  <div id="register">
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
    <div id="registerMain">
      <div class="registerMainPadding">
        <h3 class="registerTitle">注册账号</h3>
        <Form
          ref="formCustom"
          :model="formCustom"
          :rules="ruleCustom"
          label-position="right"
          :label-width="80"
          class="registerForm"
        >
          <FormItem prop="username" label="用户名">
            <Input type="text" v-model="formCustom.username"></Input>
          </FormItem>
          <FormItem prop="name" label="真实姓名">
            <Input type="text" v-model="formCustom.name"></Input>
          </FormItem>
          <FormItem prop="email" label="邮箱">
            <Input type="text" v-model="formCustom.email"></Input>
          </FormItem>
          <FormItem prop="passwd" label="密码">
            <Input type="password" v-model="formCustom.passwd"></Input>
          </FormItem>
          <FormItem label="确认密码" prop="passwd2">
            <Input type="password" v-model="formCustom.passwd2"></Input>
          </FormItem>
          <FormItem prop="verify" label="验证">
            <Verify
              @success="success"
              :show-button="false"
              :type="3"
              :bar-size="{ width: '100%', height: '36px' }"
              explain="滑过验证"
              class="registerVerify"
            ></Verify>
          </FormItem>
          <FormItem>
            <Button
              :disabled="!slidePass"
              type="primary"
              long
              @click="handleSubmit('formCustom')"
              class="registerBtn"
              >注册</Button
            >
          </FormItem>
        </Form>
        <div class="login">
          已有帐号?去<router-link to="/account/login">登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Verify from "vue2-verify";
export default {
  name: "Register",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error("Password is not same"));
      } else {
        callback();
      }
    };
    return {
      slidePass: false,
      formCustom: {
        name: "",
        username: "",
        passwd: "",
        passwd2: "",
        email: "",
      },
      ruleCustom: {
        name: [
          { required: true, message: "Name cannot be empty", trigger: "blur" },
        ],
        username: [
          {
            required: true,
            message: "Username cannot be empty",
            trigger: "blur",
          },
        ],
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwd2: [{ validator: validatePass2, trigger: "blur" }],

        email: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
      },
      remPwd: false,
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
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          register({
            username: this.formCustom.username,
            name: this.formCustom.name,
            password: this.formCustom.passwd,
            email: this.formCustom.email,
          }).then((data) => {
            if (data) {
              this.$Message.success("注册成功");
              this.$router.push("/account/login");
            } else {
              this.$Message.error("注册失败");
              // eslint-disable-next-line no-restricted-globals
              location.reload();
            }
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    success() {
      this.slidePass = true;
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
#register {
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
  #registerMain {
    height: 100%;
    flex: 1;
    background: #ffffff;
    border-radius: 20px;
    .registerMainPadding {
      width: 100%;
      height: 100%;
      padding: 5% 20% 0 10%;
      .registerTitle {
        width: 100%;
        height: 56px;
        line-height: 56px;
        text-align: center;
        color: #1f2676;
        font-size: 30px;
        letter-spacing: 4px;
        padding-left: 15%;
      }
      .registerForm {
        /deep/ .ivu-input {
          background: #fafafa;
          border-radius: 30px;
          border: 1px solid #e8e8e8;
        }
        /deep/ .ivu-form-item {
          margin-bottom: 20px;
        }
        .registerVerify {
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
        .registerBtn {
          width: 100%;
          background: #2b3586;
          color: #ffffff;
          border-radius: 30px;
        }
      }
      .login {
        width: 100%;
        text-align: center;
        color: #999999;
        font-size: 8px;
        position: relative;
        top: 3%;
        left: 10%;
        a {
          color: #2b3586;
        }
      }
    }
  }
}
</style>