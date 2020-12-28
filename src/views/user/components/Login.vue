<template>
  <div class="login-part">
    <div class="title">
      <div class="line"></div>
      <h2>
        登录
      </h2>
    </div>

    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" label-position="top">
      <FormItem prop="name">
        <Input type="text" v-model="formCustom.name" placeholder="用户名"></Input>
      </FormItem>
      <FormItem prop="passwd">
        <Input type="password" v-model="formCustom.passwd" placeholder="密码"></Input>
      </FormItem>
      <FormItem prop="verify">
        <Verify @success="success" @error="alert('error')" :show-button="false"
                :type="3" :bar-size="{width: '100%',height:'40px'}"></Verify>
      </FormItem>
      <FormItem>
        <Button :disabled="!slidePass"
                type="primary" long @click="handleSubmit('formCustom')">登录</Button>
      </FormItem>
      <router-link to="/account/forget" class="forget-link">忘记密码</router-link>
      <router-link to="/account/register" class="register-link">注册</router-link>
    </Form>
  </div>
</template>

<script>
import Verify from 'vue2-verify';

export default {
  name: 'Login',
  data() {
    return {
      slidePass: false,
      formCustom: {
        name: '',
        passwd: '',
      },
      ruleCustom: {
        name: [
          { required: true, message: 'Name cannot be empty', trigger: 'blur' },
        ],
        passwd: [
          { required: true, message: 'Password cannot be empty', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      console.log(name);
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.$store.dispatch('user/login', {
            username: this.formCustom.name,
            password: this.formCustom.passwd,
          }).then(() => {
            /*            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push('/infos');
            } */
            this.$router.push('/dashboard/infos');
          }).catch((err) => {
            console.log(err);
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
          this.$Message.error('Fail!');
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

<style scoped lang="scss">
.login-part{
  width: 43%;
  padding: 40px;
  h2, h3 {
    color: #333333;
  }
  h2{
    font-size: 28px;
  }
  .title{
    display: flex;
    .line{
      width:6px;
      background:rgba(46,91,255,1);
      border-radius:5px;
      margin-right: 10px;
    }
  }
  /deep/ .ivu-form {
    .ivu-form-item{
      margin: 20px 0 0;
      .ivu-form-item-label {
        color: #333333;
        font-size: 20px;
      }

      .ivu-input{
        height: 40px;
      }
      /*          .ivu-btn-primary{
                  background-color: #2E5BFF;
                }
                .ivu-btn-primary[disabled]{
                  color: #c5c8ce;
                  background-color: #f7f7f7;
                  border-color: #dcdee2;
                }*/

      .ivu-btn{
        height: 40px;
      }
      .ivu-btn-primary:hover{
        //background-color: #57a3f3;
      }
    }
  }
  .register-link {
    font-size: 14px;
    float: right;
    color:#2b85e4;
    cursor: pointer;
  }
  .forget-link {
    font-size: 14px;
    float: left;
    color:#2b85e4;
    cursor: pointer;
  }
}
</style>
