<template>
  <div class="topmenu">
    <img
      src="../assets/img/DP-cloudserver_logo@2x.png"
      class="icon-cloud"
      alt=""
    />
    <span style="font-size: 24px; color: #333333; vertical-align: middle"
      >DP-Cloudserver</span
    >
    <Icon
      @click.native="collapsedSider"
      :class="rotateIcon"
      :style="{ margin: '0 10px', lineHeight: '60px', float: 'right' }"
      type="md-menu"
      size="24"
    ></Icon>
    <Dropdown :style="{ float: 'right' }">
      <a href="javascript:void(0)">
        <img
          src="../assets/img/yonghutouxiang@2x.png"
          class="icon-img"
          alt=""
        />
        <span class="item-text">{{ $store.state.user.name }}</span>
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem
          @click.native="
            $router.push('/user/userinfo/' + $store.state.user.name)
          "
        >
          <img src="../assets/img/gerenzhongxin.png" class="icon-img" alt="" />
          <span class="item-text">个人中心</span>
        </DropdownItem>
        <DropdownItem @click.native="$router.push('/account/modify_password')">
          <img src="../assets/img/gerenzhongxin.png" class="icon-img" alt="" />
          <span class="item-text">修改密码</span>
        </DropdownItem>
        <DropdownItem @click.native="showModal = true">
          <img src="../assets/img/gerenzhongxin.png" class="icon-img" alt="" />
          <span class="item-text">联系我们</span>
        </DropdownItem>
        <DropdownItem @click.native="quit">
          <p>
            <img src="../assets/img/icon_tuichu.png" class="icon-img" alt="" />
            <span class="item-text">退出</span>
          </p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Badge
      dot
      style="
        line-height: 24px;
        vertical-align: middle;
        float: right;
        margin: 22px 5px 0 0;
      "
    >
      <Icon type="ios-notifications-outline" size="24"></Icon>
    </Badge>
    <Modal v-model="showModal" footer-hide width="30rem" id="contactUs">
      <h3 style="text-align: center">联系我们</h3>
      <Form ref="formInline" :model="formContact" style="padding: 0px 60px">
        <FormItem prop="email" label="邮箱">
          <Input type="text" v-model="formContact.email" placeholder="Username">
            <Icon type="ios-mail" slot="prefix" style="color: #13227a" />
          </Input>
        </FormItem>
        <FormItem prop="weixin" label="微信">
          <Input
            type="text"
            v-model="formContact.weixin"
            placeholder="Password"
          >
            <!-- <Icon custom="iconfont icon-wechat" slot="prefix" style="color: #13227a;width: 20px;height: 15px;"/> -->
          </Input>
        </FormItem>
        <FormItem prop="phone" label="电话">
          <Input type="text" v-model="formContact.phone" placeholder="Password">
            <!-- <Icon custom="iconfont icon-landline" slot="prefix" style="color: #13227a;width: 20px;height: 15px;"/> -->
            
          </Input>
        </FormItem>
        <FormItem prop="question" label="请描述你的问题">
          <Input
            v-model="formContact.question"
            type="textarea"
            placeholder="请把你的问题写在这里"
            :row="4"
            :autosize="{ minRows: 4, maxRows: 4 }"
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            long
            class="contact-button"
            @click="contactSubmit()"
            >提交</Button
          >
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
// import '../assets/iconfont/iconfont.css'
export default {
  name: "TopMenu",
  props: ["is-collapsed"],
  data() {
    return {
      activeName: "",
      routeList: [],
      showModal: false,
      formContact: {
        email: "",
        weixin: "",
        phone: "",
        question: "",
      },
    };
  },
  created() {
    this.routeList = this.$route.path.slice(1).split("/");
    if (this.$route.path.indexOf("userinfo") >= 0) {
      this.activeName = "1";
    }
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
  },
  methods: {
    quit() {
      this.$store.dispatch("user/logout").then(() => {
        this.$Message.success("退出登录");
        this.$router.push("/account/login");
      });
    },
    collapsedSider() {
      this.$emit("toggle-collapse");
    },
    contactSubmit() {
      console.log(this.formContact);
    },
  },
};
</script>

<style scoped lang="scss">
.topmenu {
  right: 0;
  background: #ffffff;
  color: #666666;
  &::after {
    background: transparent;
  }

  .icon-img {
    vertical-align: middle;
    width: 18px;
    margin: 0 6px;
  }

  .icon-cloud {
    vertical-align: middle;

    width: 40px;
    margin: 0 6px;
  }

  .item-text {
    vertical-align: middle;
  }

  .menu-icon {
    transition: all 0.3s;
  }
  .rotate-icon {
    transform: rotate(-90deg);
  }
  // #contactUs{
  //    .ivu-modal-wrap >.ivu-modal>.ivu-modal-content>.ivu-modal-body> .ivu-form >.ivu-form-item{

  //       margin-bottom: 0;

  //   }
  // }
  #contactUs >>> .ivu-form-item {
    margin-bottom: 0;
  }


  .icon-landline:before {
    content: "\e622";
  }
}
.contact-button {
  width: 310px;
  height: 40px;
  background: #13227a !important;
  border-radius: 11px;
}
</style>
