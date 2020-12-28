<template>
  <Layout :style="{minHeight: '100vh'}">
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',
      position: 'fixed', paddingLeft: '0', width: '100%', zIndex: '100'}">
        <TopMenu :is-collapsed="isCollapsed" @toggle-collapse="$refs.sider.toggleCollapse()">
        </TopMenu>
      </Header>
    <layout style="margin-top: 70px">
      <Sider ref="sider" hide-trigger class="sider"
             collapsible :collapsed-width="0" v-model="isCollapsed"
             :style="{ weight: '200px', position: 'fixed',top: '70px',
            left: 0, overflow: 'auto', backgroundColor: '#fff',zIndex: '10'}">
        <LeftMenu :is-collapsed="isCollapsed"></LeftMenu>
      </Sider>
      <Content :style="{marginLeft: '200px'}">
        <router-view></router-view>
      </Content>
    </layout>

  </Layout>
</template>

<script>
import TopMenu from '@/components/TopMenu.vue';
import LeftMenu from '@/components/LeftMenu.vue';

export default {
  name: 'MyLayout',
  created() {
    console.log('layoout');
  },
  data() {
    return {
      isCollapsed: false,
    };
  },
  computed: {
    menuitemClasses() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : '',
      ];
    },
  },
  components: {
    LeftMenu,
    TopMenu,
  },

};
</script>

<style scoped lang="scss">
  .sider {
    height: calc(100vh - 75px);
  }
</style>
