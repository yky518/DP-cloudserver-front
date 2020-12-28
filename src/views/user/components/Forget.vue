<template>
  <div class="forget">
    <div class="title">
      <div class="line"></div>
      <h2>忘记密码</h2>
    </div>

    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" label-position="top">
      <FormItem prop="username">
        <Input type="text" v-model="formCustom.username" placeholder="用户名"></Input>
      </FormItem>
      <FormItem prop="email">
        <Input type="text" v-model="formCustom.email" placeholder="邮箱"></Input>
      </FormItem>
      <FormItem prop="verify">
        <!--     <Verify @success="success" @error="alert('error')" :show-button="false"
                     :type="3" :bar-size="{width: '100%',height:'40px'}"></Verify>-->
        <Input type="text" v-model="formCustom.code"  placeholder="验证码" style="width: 55%"></Input>
        <Button v-if="showGetCode" :disabled="!formCustom.username||!formCustom.email"
                style="width: 40%;margin-left: 5%"
                @click="getCode">Get Code</Button>
        <Button v-else disabled
                style="width: 40%;margin-left: 5%">{{codeTimer}}</Button>
      </FormItem>
      <FormItem prop="passwd">
        <Input type="password" v-model="formCustom.passwd" placeholder="密码"></Input>
      </FormItem>
      <FormItem prop="passwd2">
        <Input type="password" v-model="formCustom.passwd2" placeholder="确认密码"></Input>
      </FormItem>
      <FormItem label="验证" prop="verify">
        <Verify @success="success" @error="alert('error')" :show-button="false"
                :type="3" :bar-size="{width: '100%',height:'40px'}"></Verify>
      </FormItem>
      <FormItem>
        <Button :disabled="!slidePass"
                type="primary" long @click="handleSubmit('formCustom')">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Verify from 'vue2-verify';
import { passwordForget, verify } from '@/api/user';

export default {
  name: 'Modify',
  data() {
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
      codeTimer: 60,
      showGetCode: true,
      formCustom: {
        username: '',
        passwd: '',
        passwd2: '',
        code: '',
        email: '',
      },
      ruleCustom: {
        username: [
          { required: true, message: 'Name cannot be empty', trigger: 'blur' },
        ],
        passwd: [
          { required: true, message: 'Password cannot be empty', trigger: 'blur' },
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
    async getCode() {
      let emailValidate = false;
      let nameValidate = false;
      await this.$refs.formCustom.validateField('email', (err) => {
        if (!err) {
          emailValidate = true;
        }
      });
      await this.$refs.formCustom.validateField('username', (err) => {
        if (!err) {
          nameValidate = true;
        }
      });
      console.log(emailValidate);
      console.log(nameValidate);
      if (emailValidate && nameValidate) {
        const data = {
          username: this.formCustom.username,
          email: this.formCustom.email,
        };
        passwordForget(data).then((res) => {
          console.log(res);
        });
      }
      this.codeTimer = 60;
      this.showGetCode = false;

      const timer = setInterval(() => {
        if (this.codeTimer >= 0) {
          this.codeTimer -= 1;
        } else {
          clearInterval(timer);
          this.showGetCode = true;
        }
      }, 1000);
    },
    handleSubmit(name) {
      console.log(name);
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          verify({
            username: this.formCustom.username,
            password: this.formCustom.passwd,
            code: this.formCustom.code,
            email: this.formCustom.email,
          }).then((res) => {
            console.log(res);
            this.$Message.success('修改成功');
            this.$router.push('/account/login');
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
.forget{
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
}
</style>
