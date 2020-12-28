<template>
<div id="role">
  <Button @click="addModal = true">添加</Button>
  <Table ref="menu_table" :columns="menuColumns" :data="roleData">
    <template slot-scope="{ row }" slot="permissions">
      {{parsePermissions(row.permissions)}}
    </template>
    <template slot-scope="{ row }" slot="menus">
      {{parseTitle(row.menu)}}
    </template>
    <template slot-scope="{ row, index }" slot="action">
      <Button type="primary" size="small"
              style="margin-right: 5px" @click="showDrawer(index)">编辑</Button>
      <Button type="primary" size="small"
              style="margin-right: 5px" @click="delRole(row.id)">删除</Button>
    </template>
  </Table>
  <Page :total="totalRole" style="text-align: center" @on-change="changePage"/>
  <Drawer title="角色信息修改" :closable="false" v-model="ifShowDrawer">
    <Form ref="editForm" :model="editForm" label-position="top">
      <FormItem label="ID" prop="id">
        <Input type="text" v-model="editForm.id" ></Input>
      </FormItem>
      <FormItem label="角色名" prop="name">
        <Input type="text" v-model="editForm.name" ></Input>
      </FormItem>
      <FormItem label="api权限" prop="apiPermission">
        <CheckboxGroup v-model="editForm.apiPermissions">
          <Checkbox label="account">账号</Checkbox>
          <Checkbox label="business">Business</Checkbox>
          <Checkbox label="finance">财务</Checkbox>
        </CheckboxGroup>
      </FormItem>

      <FormItem label="菜单权限" prop="menuPermission">
        <CheckboxGroup v-model="editForm.menuPermissions">
          <Checkbox label="create">开机</Checkbox>
          <Checkbox label="cp2k">Cp2k</Checkbox>
          <Checkbox label="lammps">Lammps</Checkbox>
          <Checkbox label="iter">Iter</Checkbox>
          <!--          <Checkbox label="lcurve">Lcurve</Checkbox>-->
          <Checkbox label="dpkit">Dpkit</Checkbox>
          <Checkbox label="vasp">Vasp</Checkbox>
          <Checkbox label="user">用户管理</Checkbox>
          <Checkbox label="role">角色管理</Checkbox>
        </CheckboxGroup>
      </FormItem>
      <Button long @click="editSubmit">确定</Button>
    </Form>

  </Drawer>
  <Modal
      v-model="addModal"
      @on-ok="handleSubmit('addForm')"
      title="添加">
    <!--  :rules="ruleCustom"-->
    <Form ref="addForm" :model="addForm">
      <FormItem label="角色名" prop="name">
        <Input type="text" v-model="addForm.name" ></Input>
      </FormItem>
      <FormItem label="api权限" prop="apiPermission">
        <CheckboxGroup v-model="addForm.apiPermissions">
          <Checkbox label="account">账号</Checkbox>
          <Checkbox label="finance">财务</Checkbox>
        </CheckboxGroup>
      </FormItem>

      <FormItem label="菜单权限" prop="menuPermission">
        <CheckboxGroup v-model="addForm.menuPermissions">
          <Checkbox label="create">开机</Checkbox>
          <Checkbox label="cp2k">Cp2k</Checkbox>
          <Checkbox label="lammps">Lammps</Checkbox>
          <Checkbox label="iter">Iter</Checkbox>
<!--          <Checkbox label="lcurve">Lcurve</Checkbox>-->
          <Checkbox label="dpkit">Dpkit</Checkbox>
          <Checkbox label="vasp">Vasp</Checkbox>
          <Checkbox label="user">用户管理</Checkbox>
          <Checkbox label="role">角色管理</Checkbox>
        </CheckboxGroup>
      </FormItem>

    </Form>
  </Modal>
</div>
</template>

<script>
import path from '@/utils/permission';
import {
  roleModify, roleList, roleDel,
} from '@/api/user';

import { asyncMenus, parseMenusToTitle } from '@/utils/parse';

export default {
  name: 'RoleManagement',
  data() {
    return {
      totalRole: 0,
      menuColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        }, {
          title: 'ID',
          key: 'id',
        }, {
          title: '用户名',
          key: 'name',
        }, {
          title: '菜单权限',
          slot: 'menus',
        }, {
          title: 'api权限',
          slot: 'permissions',
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center',
        },
      ],
      roleData: [],
      modal: false,
      ifShowDrawer: false,
      addModal: false,
      addForm: {
        name: '',
        menuPermissions: [],
        apiPermissions: [],
      },
      editForm: {
        id: '',
        name: '',
        menuPermissions: [],
        apiPermissions: [],
      },
    };
  },
  created() {
    roleList({
      page: 1,
      per_page: 10,
    }).then((res) => {
      console.log(res);
      this.totalRole = res.total;
      this.roleData = res.items;
    });
  },
  methods: {
    showDrawer(index) {
      this.ifShowDrawer = true;
      console.log(this.roleData[index]);
      this.$set(this.editForm, 'name', this.roleData[index].name);
      this.$set(this.editForm, 'id', this.roleData[index].id);
      this.$set(this.editForm, 'menuPermissions', this.roleData[index].menu);
      const { permissions } = this.roleData[index];
      const api = [];
      if (permissions.indexOf('/account/password/modify') >= 0) {
        api.push('account');
      }
      if (permissions.indexOf('/finance/trades') >= 0) {
        api.push('finance');
      }
      this.$set(this.editForm, 'apiPermissions', api);
    },
    parsePermissions(permissions) {
      const api = [];
      if (permissions.indexOf('/account/password/modify') >= 0) {
        api.push('账号');
      }
      if (permissions.indexOf('/finance/trades') >= 0) {
        api.push('财务');
      }
      return api.join(',');
    },

    parseTitle(menus) {
      const titles = parseMenusToTitle(asyncMenus, menus);
      return titles.join(',');
    },
    changePage(page) {
      console.log(page);
      this.roleData = [];
      roleList({
        page,
        per_page: 10,
      }).then((res) => {
        console.log(res);
        for (const items of res.items) {
          this.roleData.push(items);
        }
      });
    },
    delRole(id) {
      roleDel({
        id,
      }).then((res) => {
        console.log(res);
        this.$Message.success('成功删除角色');
        window.location.reload();
      });
    },
    handleSubmit(name) {
      console.log(name);
      let permissions = [];
      console.log(this.addForm.apiPermissions);
      for (const item of this.addForm.apiPermissions) {
        console.log(path[item]);
        permissions = permissions.concat(path[item]);
      }
      const data = {
        name: this.addForm.name,
        menu: this.addForm.menuPermissions.join(','),
        permissions,
      };

      roleModify(data).then((res) => {
        console.log(res);
        window.location.reload();
      });
    },
    editSubmit() {
      let permissions = [];
      console.log(this.editForm.apiPermissions);
      for (const item of this.editForm.apiPermissions) {
        console.log(path[item]);
        permissions = permissions.concat(path[item]);
      }
      const data = {
        id: this.editForm.id,
        name: this.editForm.name,
        menu: this.editForm.menuPermissions.join(','),
        permissions,

      };

      roleModify(data).then((res) => {
        console.log(res);
        this.$Message.success('修改成功');
        window.location.reload();
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    success() {
      this.slidePass = true;
    },
  },
};
</script>

<style scoped>
  #role{
    background-color: #fff;
  }
</style>
