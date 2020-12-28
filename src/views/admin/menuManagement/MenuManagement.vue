<template>
<div>
  <Table ref="menu_table" :columns="menuColumns" :data="menuData">
    <template slot-scope="{ row, index }" slot="action">
      <Button type="primary" size="small"
              style="margin-right: 5px" @click="showDrawer(index)">是否隐藏</Button>
      <Button type="primary" size="small"
              style="margin-right: 5px" @click="show(index)">删除</Button>
    </template>
  </Table>
  <Page :total="100" style="text-align: center"/>
</div>
</template>

<script>
export default {
  name: 'MenuManagement',
  data() {
    return {
      menuColumns: [{
        type: 'selection',
        width: 60,
        align: 'center',
      }, {
        title: '菜单',
        key: 'uri',
      },
      {
        title: '是否隐藏',
        key: 'hidden',
      },
      {
        title: 'Action',
        slot: 'action',
        width: 150,
        align: 'center',
      },
      ],
      menuData: [],
      modal: false,
    };
  },
  created() {
    /*    getTrades({
      page: 1,
      per_page: 10,
    }).then((res) => {
      console.log(res);
      this.tradesData = res;
    }); */
    this.menuData = [{
      uri: '/account',
      hidden: '是',
    },
    {
      uri: '/business',
      hidden: '否',

    },
    {
      uri: '/finance',
      hidden: '否',
    },
    ];
  },
};
</script>

<style scoped>

</style>
