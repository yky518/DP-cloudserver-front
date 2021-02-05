<template>
  <div id="admin">
    <Breadcrumb separator="-">
      <BreadcrumbItem>用户设置</BreadcrumbItem>
      <BreadcrumbItem>{{ title }}</BreadcrumbItem>
    </Breadcrumb>
    <div class="function-sider">
      <Menu theme="light" style="width: 215px" active-name="子用户管理">
        <MenuItem
          v-for="(item, index) in list"
          :key="index"
          @click.native="jump(item)"
          class="function-item"
          :name="item.title"
        >{{item.title}}</MenuItem>
      </Menu>
      <!-- <List style="width: 215px">
        <ListItem
          v-for="(item, index) in list"
          :key="index"
          @click.native="jump(item)"
          class="function-item"
        >
          <ListItemMeta :title="item.title" />
        </ListItem>
      </List> -->
    </div>
    <main style="margin-left: 240px">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { parseFunctions } from "../../utils/parse";

export default {
  name: "user",
  data: () => ({
    list: [],
    title: "子用户管理",
  }),
  created() {
    const functionList = ["user_management"];
    this.list = parseFunctions(functionList);
  },
  methods: {
    jump(item) {
      this.title = item.title;
      this.$router.push(item.path);
    },
  },
};
</script>

<style scoped lang="scss">
#admin {
  margin: 20px;
  /deep/ .ivu-breadcrumb {
    color: #333333;
    margin-left: 5px;
    span:last-child {
      color: #13227a;
      font-weight: 700;
    }
  }
  .ivu-list-item {
    justify-content: space-between;
  }

  .function-sider {
    background-color: #ffffff;
    padding: 5px;
    position: fixed;
    margin-top: 10px;
    margin-left: 5px;
    height: calc(100vh - 75px);
  }
  .function-item {
    cursor: pointer;
    border-bottom: 1px solid #F4F4F4;
  }
}
</style>
