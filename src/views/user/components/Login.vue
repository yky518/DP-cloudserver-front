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
        <h3 class="loginTitle">欢迎登陆</h3>
        <Form
          ref="formCustom"
          :model="formCustom"
          :rules="ruleCustom"
          label-position="right"
          :label-width="80"
          class="loginForm"
        >
          <FormItem label="账号" prop="name">
            <Input type="text" v-model="formCustom.name"></Input>
          </FormItem>
          <FormItem label="密码" prop="passwd">
            <Input type="password" v-model="formCustom.passwd"></Input>
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
            <Row class="pwd">
              <Col span="12">
                <router-link to="/account/forget" style="float: left"
                  >忘记密码?</router-link
                >
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button
              :disabled="!slidePass"
              type="primary"
              long
              @click="handleSubmit('formCustom')"
              class="loginBtn"
              >登录</Button
            >
          </FormItem>
        </Form>
        <div class="register">
          还没有帐号,去<router-link to="/account/register">注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Verify from "vue2-verify";
export default {
  data() {
    return {
      slidePass: false,
      formCustom: {
        name: "",
        passwd: "",
      },
      ruleCustom: {
        name: [
          { required: true, message: "Name cannot be empty", trigger: "blur" },
        ],
        passwd: [
          {
            required: true,
            message: "Password cannot be empty",
            trigger: "blur",
          },
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
        console.log(valid);
        if (valid) {
          this.$store
            .dispatch("user/login", {
              username: this.formCustom.name,
              password: this.formCustom.passwd,
            })
            .then(() => {
              /*            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push('/infos');
            } */
              this.$router.push("/dashboard/infos");
            })
            .catch((err) => {
              console.log(err);
              location.reload();
            });
          /* this.$axios.post('/login', {
            username: this.formCustom.name,
            password: this.formCustom.passwd,
          }).then((res) => {
            if (res.data.result === 1) {
              this.$Message.success('登录成功');
              this.$store.commit('login', this.formCustom.name);
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect);
              } else {
                this.$router.push('/infos');
              }
            } else {
              this.$Message.error('登录失败');
              // eslint-disable-next-line no-restricted-globals
              location.reload();
            }
          }); */
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
      padding: 8% 20% 0 10%;
      .loginTitle {
        width: 100%;
        height: 56px;
        line-height: 56px;
        text-align: center;
        color: #1f2676;
        font-size: 30px;
        letter-spacing: 4px;
        padding-left: 15%;
        margin-bottom: 10%;
      }
      .loginForm {
        /deep/ .ivu-input {
          background: #fafafa;
          border-radius: 30px;
          border: 1px solid #e8e8e8;
        }
        /deep/ .ivu-form-item{
          margin-bottom:25px;
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