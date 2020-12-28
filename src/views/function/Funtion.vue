<template>
    <div>
<!--        <Breadcrumb separator="-">
            <BreadcrumbItem>功能模块</BreadcrumbItem>
            <BreadcrumbItem>算法模块</BreadcrumbItem>
        </Breadcrumb>-->
        <div class="function-sider">
            <List>
                <template slot="header">
                    <Input prefix="ios-search" placeholder="Enter text" style="width: auto" />
                </template>
                <ListItem v-for="(item, index) in list" :key="index"
                          @click.native="$router.push(item.path)"
                          class="function-item">
                    <ListItemMeta :title="item.title" />
                    <template slot="extra">
                        <Icon type="ios-list" style="font-size: 24px"/>
                    </template>
                </ListItem>
            </List>
        </div>
        <main style="margin-left: 210px">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import { parseFunctions } from '../../utils/parse';

export default {
  name: 'Funtion',
  data: () => ({
    list: [],
  }),
  created() {
    const functionList = ['cp2k', 'dpkit', 'lammps', 'vasp'];
    this.list = parseFunctions(functionList);
    console.log(this.list);
  },
};
</script>

<style scoped>
    .ivu-list-item{
        justify-content: space-between;
    }

    .function-sider{
        background-color: #ffffff;
        padding: 5px;
        position: fixed;
        margin-left: 5px;
        height: calc(100vh - 75px);
    }
    .function-item{
        cursor:pointer;
    }

</style>
