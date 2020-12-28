<template>
  <div class="topmenu">

    <img src="../assets/img/DP-cloudserver_logo@2x.png" class="icon-cloud" alt="">
    <span style="font-size: 24px;color: #333333;vertical-align: middle;">DP-Cloudserver</span>
    <Icon @click.native="collapsedSider" :class="rotateIcon"
          :style="{margin: '0 10px',lineHeight: '60px', float: 'right'}"
          type="md-menu" size="24"></Icon>
    <Dropdown :style="{float: 'right'}">
      <a href="javascript:void(0)">
        <img src="../assets/img/yonghutouxiang@2x.png" class="icon-img" alt="">
        <span class="item-text">{{ $store.state.user.name }}</span>
        <Icon type="ios-arrow-down"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem @click.native="$router.push('/user/userinfo/' + $store.state.user.name)">
          <img src="../assets/img/gerenzhongxin.png" class="icon-img" alt="">
          <span class="item-text">个人中心</span>
        </DropdownItem>
        <DropdownItem @click.native="$router.push('/account/modify_password')">
          <img src="../assets/img/gerenzhongxin.png" class="icon-img" alt="">
          <span class="item-text">修改密码</span>
        </DropdownItem>
        <DropdownItem @click.native="showModal = true">
          <img src="../assets/img/gerenzhongxin.png" class="icon-img" alt="">
          <span class="item-text">联系我们</span>
        </DropdownItem>
        <DropdownItem @click.native="quit">
          <p>
            <img src="../assets/img/icon_tuichu.png" class="icon-img" alt="">
            <span class="item-text">退出</span>
          </p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Badge dot style="line-height: 24px;vertical-align: middle;float: right;
      margin: 22px 5px 0 0">
      <Icon type="ios-notifications-outline" size="24"></Icon>
    </Badge>
    <Modal v-model="showModal" footer-hide width="30rem">
      <h3 style="text-align: center">联系我们</h3>
      <Form ref="formInline" :model="formContact">
        <FormItem prop="email" label="邮箱">
          <Input type="text" v-model="formContact.email" placeholder="Username">
            <Icon type="ios-mail" slot="prepend"/>
          </Input>
        </FormItem>
        <FormItem prop="weixin" label="微信">
          <Input type="text" v-model="formContact.weixin" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="phone" label="电话">
          <Input type="text" v-model="formContact.phone" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="question" label="请描述你的问题">
          <Input v-model="formContact.question" type="textarea" placeholder="请把你的问题写在这里" />
        </FormItem>
        <FormItem>
          <Button type="primary" long
                  class="contact-button" @click="contactSubmit()">Signin</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'TopMenu',
  props: ['is-collapsed'],
  data() {
    return {
      activeName: '',
      routeList: [],
      showModal: false,
      formContact: {
        email: '',
        weixin: '',
        phone: '',
        question: '',
      },
    };
  },
  created() {
    console.log(this.$route);
    this.routeList = this.$route.path.slice(1).split('/');
    console.log(this.routeList);
    if (this.$route.path.indexOf('userinfo') >= 0) {
      this.activeName = '1';
    }
  },
  computed: {
    rotateIcon() {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : '',
      ];
    },
  },
  methods: {
    quit() {
      console.log('dfasdf');
      this.$store.dispatch('user/logout').then(() => {
        this.$Message.success('退出登录');
        this.$router.push('/account/login');
      });
    },
    collapsedSider() {
      this.$emit('toggle-collapse');
    },
    contactSubmit() {
      console.log(this.formContact);
    },
  },
};
</script>

<style scoped lang="scss">
.topmenu{
  right: 0;
  background: #FFFFFF;
  color: #666666;
  &::after{
    background: transparent;
  }

  .icon-img{
    vertical-align: middle;
    width: 18px;
    margin: 0 6px;
  }

  .icon-cloud{
    vertical-align: middle;

    width: 40px;
    margin: 0 6px;
  }

  .item-text{
    vertical-align: middle;

  }

  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }

}
  .contact-button{

    background: #13227A!important;
    border-radius: 20px;
  }
</style>
