<template>
  <div class="register">
    <div class="title">
      <div class="line"></div>
      <h2>注册</h2>
    </div>

    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" label-position="top">
      <FormItem prop="username">
        <Input type="text" v-model="formCustom.username" placeholder="登录账号"></Input>
      </FormItem>
      <FormItem prop="name">
        <Input type="text" v-model="formCustom.name" placeholder="真实姓名"></Input>
      </FormItem>
      <FormItem prop="email">
        <Input type="text" v-model="formCustom.email" placeholder="邮箱"></Input>
      </FormItem>
      <FormItem prop="passwd">
        <Input type="password" v-model="formCustom.passwd" placeholder="密码"></Input>
      </FormItem>
      <FormItem prop="passwd2">
        <Input type="password" v-model="formCustom.passwd2" placeholder="确认密码"></Input>
      </FormItem>
      <FormItem prop="verify">
        <Verify @success="success" :show-button="false"
                :type="3" :bar-size="{width: '100%',height:'40px'}"></Verify>
      </FormItem>
      <FormItem>
        <Button :disabled="!slidePass"
                type="primary" long @click="handleSubmit('formCustom')">注册</Button>
      </FormItem>
      <p class="bottom-text">已有账号？
        <router-link to="/account/login" class="login-link">登录</router-link>
      </p>
    </Form>
  </div>
</template>

<script>
import Verify from 'vue2-verify';
import { register } from '@/api/user';

export default {
  name: 'Register',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password'));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'));
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('Password is not same'));
      } else {
        callback();
      }
    };
    return {
      slidePass: false,
      formCustom: {
        name: '',
        username: '',
        passwd: '',
        passwd2: '',
        email: '',
      },
      ruleCustom: {
        name: [
          { required: true, message: 'Name cannot be empty', trigger: 'blur' },
        ],
        username: [
          { required: true, message: 'Username cannot be empty', trigger: 'blur' },
        ],
        passwd: [
          { validator: validatePass, trigger: 'blur' },
        ],
        passwd2: [
          { validator: validatePass2, trigger: 'blur' },
        ],

        email: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' },
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
          register({
            username: this.formCustom.username,
            name: this.formCustom.name,
            password: this.formCustom.passwd,
            email: this.formCustom.email,
          }).then((data) => {
            if (data) {
              this.$Message.success('注册成功');
              this.$router.push('/account/login');
            } else {
              this.$Message.error('注册失败');
              // eslint-disable-next-line no-restricted-globals
              location.reload();
            }
          });
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
.register{
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
      margin-top: 20px;
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
  .bottom-text {
    font-size: 14px;
    float: right;
    .login-link {

      color:#2b85e4;
      cursor: pointer;
    }
  }
}
</style>
