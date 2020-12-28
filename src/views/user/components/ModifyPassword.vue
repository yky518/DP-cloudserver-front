<template>
  <div class="modify-password">
    <div class="title">
      <div class="line"></div>
      <h2>修改密码</h2>
    </div>

    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" label-position="top">
      <FormItem prop="password">
        <Input type="password" v-model="formCustom.password" placeholder="旧密码"></Input>
      </FormItem>
      <FormItem prop="new_password">
        <Input type="password" v-model="formCustom.new_password" placeholder="新密码"></Input>
      </FormItem>
      <FormItem prop="passwd2">
        <Input type="password" v-model="formCustom.passwd2" placeholder="确认密码"></Input>
      </FormItem>
      <FormItem prop="verify">
        <Verify @success="success" @error="alert('error')" :show-button="false"
                :type="3" :bar-size="{width: '100%',height:'40px'}"></Verify>
      </FormItem>
      <FormItem>
        <Button :disabled="!slidePass"
                type="primary" long @click="handleSubmit('formCustom')">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import Verify from 'vue2-verify';
import { passwordModify } from '@/api/user';

export default {
  name: 'ModifyPassword',
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'));
      } else if (value !== this.formCustom.new_password) {
        callback(new Error('Password is not same'));
      } else {
        callback();
      }
    };

    return {
      slidePass: false,
      formCustom: {
        password: '',
        new_password: '',
        passwd2: '',
      },
      ruleCustom: {
        password: [
          { required: true, message: 'Password cannot be empty' },
        ],
        new_password: [
          { required: true, message: 'Password cannot be empty' },
        ],
        passwd2: [
          { validator: validatePass2, trigger: 'blur' },
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
          passwordModify({
            password: this.formCustom.password,
            new_password: this.formCustom.new_password,
          }).then((res) => {
            if (res) {
              this.$Message.success('修改密码成功');
              this.$store.dispatch('user/logout').then(() => {
                this.$router.push('/account/login');
              });
            } else {
              this.$Message.error('提交失败');
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
.modify-password{
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
