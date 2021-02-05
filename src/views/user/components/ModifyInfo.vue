<template>
  <div class="modify-info">
  <div class="title">
    <div class="line"></div>
    <h2>修改用户信息</h2>
  </div>

  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" label-position="top">
    <FormItem prop="username">
      <Input type="text" v-model="formCustom.username" placeholder="用户名"></Input>
    </FormItem>
    <FormItem prop="name">
      <Input type="text" v-model="formCustom.name" placeholder="真实姓名"></Input>
    </FormItem>
    <FormItem prop="email">
      <Input type="text" v-model="formCustom.email" placeholder="邮箱"></Input>
    </FormItem>
    <FormItem prop="verify">
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
import { accountModify } from '@/api/user';

export default {
  name: 'ModifyInfo',
  data() {
    return {
      slidePass: false,
      formCustom: {
        name: '',
        username: '',
        email: '',
      },
      ruleCustom: {
        name: [
          {
            required: true,
            message: 'Name cannot be empty',
            trigger: 'blur',
          },
        ],
        username: [
          {
            required: true,
            message: 'Username cannot be empty',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'Mailbox cannot be empty',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Incorrect email format',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          accountModify({
            username: this.formCustom.username,
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
.modify-info{
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
