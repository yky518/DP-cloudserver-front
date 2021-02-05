<template>
  <div>
    <Carousel v-model="value1" loop>
        <CarouselItem>
                <Form
            ref="addForm"
            :model="addForm"
            :rules="ruleAdd"
            label-position="top"
            style="padding:20px;"
          >
            <p slot="header">
              <div style="width:100%;text-align:center;margin:5px 0 21px 0;height:33px;line-height:33px;font-size:20px;">添加子用户</div>
            </p>
            <Row :gutter="48">
              <Col span="12">
                <FormItem label="用户名" prop="username">
                  <Input type="text" v-model="addForm.username"></Input>
                  <!-- @{{$store.state.user.name}} -->
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="用户全名(不可修改)" prop="name">
                  <Input type="text" v-model="addForm.name"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="48">
              <Col span="12">
                <FormItem label="邮箱" prop="email">
                  <Input type="text" v-model="addForm.email"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="费用上限" prop="phone">
                  <Input type="text" v-model="addForm.limit"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="48">
              <Col span="12">
                <FormItem label="密码" prop="password">
                  <Input type="password" v-model="addForm.password"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="确认密码" prop="password2">
                  <Input type="password" v-model="addForm.password2"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="48">
              <Col span="12">
                <FormItem label="手机号" prop="phone">
                  <Input type="text" v-model="addForm.phone"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="48">
              <Button @click="value1  = 1;">下一步</Button>
            </Row>
          </Form>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">2</div>
            <Button @click="value1 = 0;">上一步</Button>
        </CarouselItem>
    </Carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 0,
      addForm: {
        username: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        password2: "",
        role_id: "",
      },
      ruleAdd: {
        username: [
          {
            required: true,
            message: "The username cannot be empty",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "The password cannot be empty",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scope>
</style>
