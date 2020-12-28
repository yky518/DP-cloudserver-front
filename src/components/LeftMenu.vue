<template>
  <div id="left-menu">

    <Menu width="auto" ref="side_menu" :active-name="active" :open-names="openNames"
          :class="menuitemClasses">
      <MenuItem name="/dashboard/infos" to="/dashboard/infos">
        <img src="../assets/img/kongzhitai_icon@2x.png" alt="" class="icon-img">
        总体信息
      </MenuItem>
<!--      <Submenu name="dashboard">
        <template slot="title">
          <img src="../assets/img/Dashboard.png" alt="" class="icon-img">
          <span style="vertical-align: middle">Dashboard</span>
        </template>
        <MenuItem name="/dashboard/infos" to="/dashboard/infos">
          总体信息
        </MenuItem>
      </Submenu>-->

      <Submenu :name="menu.name" v-for="(menu, index) in menus" :key="'menus'+index">
        <template slot="title">
          <img :src="menu.icon" alt="" class="icon-img">
          <span style="vertical-align: middle">{{ menu.title }}</span>
        </template>
        <MenuItem :name="child.path" :to="child.path"
                  v-for="(child, iindex) in menu.children" :key="'subitem'+iindex">
          {{child.title}}
        </MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
import { asyncMenus, parseMenus } from '@/utils/parse';

export default {
  name: 'LeftMenu',
  props: ['is-collapsed'],
  data() {
    return {
      menus: [],
      active: '',
      openNames: [],
    };
  },
  created() {
    // const menus = this.$store.state.routes.routes;
    const menus = ['function', 'cloud', 'create', 'user'];
    console.log(menus);
    this.menus = parseMenus(asyncMenus, menus);
    this.$nextTick(() => {
      this.active = this.$route.path;
      this.openNames = [this.$route.path.split('/')[1]];
    });
  },
  watch: {
    openNames() {
      this.$nextTick(() => {
        this.$refs.side_menu.updateOpened();
        this.$refs.side_menu.updateActiveName();
      });
    },
  },
  computed: {
    menuitemClasses() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : '',
      ];
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
#left-menu{
  //color: #ffffff;
  //left: 0;
  .title{
    .title-img{
      vertical-align: middle;
      width: 30px;
      margin: 5px 5px;
    }
  }

  .ivu-menu.ivu-menu-light{
    background: transparent;

    .icon-img{
      vertical-align: middle;
      margin: 0 10px;
      width: 20px;
    }

    &::after{
      background: transparent;
    }

    .ivu-menu-item{

      a {

        /*&.router-link-active {
          color: #2d8cf0;
        }*/
      }

      &.ivu-menu-item-active:not(.ivu-menu-submenu){
        /*background: #355fff;*/
        //color: #355fff;
        &::after {
          left: 0;
          right: auto;
          width: 5px;
          background: #1F2676;
        }
      }
    }

  }

  .menu-item span{
    display: inline-block;
    overflow: hidden;
    //width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
}
</style>
