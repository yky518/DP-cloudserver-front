<template>
  <div id="role">
    <Button
      @click="addModal = true"
      shape="circle"
      style="margin-right: 15px; background: #13227a; color: #ffffff"
      >添加角色</Button
    >
    <Button shape="circle" :disabled="multiselect">批量删除</Button>
    <Table
      ref="menu_table"
      :columns="menuColumns"
      :data="roleData"
      @on-selection-change="multiSelect"
      style="border-top: 1px solid #f4f4f4; padding-top: 20px; margin: 12px 0"
    >
      <template slot-scope="{ row }" slot="permissions">
        {{ parsePermissions(row.permissions) }}
      </template>
      <template slot-scope="{ row }" slot="menus">
        {{ parseTitle(row.menu) }}
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="text"
          size="large"
          style="margin-right: 5px;color: #13227a;"
          @click="showDrawer(index)"
          icon="md-create"
          ></Button
        >
        <Button
          type="text"
          size="large"
          style="margin-right: 5px;color: #13227a;"
          @click="delRole(row.id)"
          icon="ios-trash-outline"
          ></Button
        >
      </template>
    </Table>
    <Page
      :total="totalRole"
      style="text-align: center"
      @on-change="changePage"
    />
    <Drawer title="角色信息修改" :closable="false" v-model="ifShowDrawer">
      <Form ref="editForm" :model="editForm" label-position="top">
        <FormItem label="ID" prop="id">
          <Input type="text" v-model="editForm.id"></Input>
        </FormItem>
        <FormItem label="角色名" prop="name">
          <Input type="text" v-model="editForm.name"></Input>
        </FormItem>
        <Tree
          :data="treeData"
          show-checkbox
          multiple
          check-directly
          @on-check-change="changeTree"
        >
        </Tree>
        <!-- <FormItem label="api权限" prop="apiPermission">
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
            <Checkbox label="dpkit">Dpkit</Checkbox>
            <Checkbox label="vasp">Vasp</Checkbox>
            <Checkbox label="user">用户管理</Checkbox>
            <Checkbox label="role">角色管理</Checkbox>
          </CheckboxGroup>
        </FormItem> -->
        <Button long @click="editSubmit">确定</Button>
      </Form>
    </Drawer>
    <Modal
      v-model="addModal"
      @on-ok="handleSubmit('addForm')"
      width="500"
      class="createRole"
    >
      <p
        slot="header"
        style="widht: 100%; text-align: center; font-weight: 500"
      >
        添加角色
      </p>
      <!--  :rules="ruleCustom"-->
      <Form
        ref="addForm"
        :model="addForm"
        label-position="top"
        style="padding: 0 50px"
      >
        <FormItem label="角色名" prop="name">
          <Input
            type="text"
            v-model="addForm.name"
            style="width: 340px"
          ></Input>
        </FormItem>
        <FormItem label="API权限" prop="apiPermission">
          <CheckboxGroup v-model="addForm.apiPermissions">
            <Row>
              <Col span="8">
                <Checkbox label="account">账户</Checkbox>
              </Col>
              <Col span="8">
                <Checkbox label="finance">财务</Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>
        </FormItem>

        <FormItem label="菜单权限" prop="menuPermission">
          <CheckboxGroup v-model="addForm.menuPermissions" size="large">
            <Row>
              <Col span="8">
                <Checkbox label="create" size="large">开机</Checkbox></Col
              >
              <Col span="8"><Checkbox label="cp2k">Cp2k</Checkbox></Col>
              <Col span="8"><Checkbox label="lammps">Lammps</Checkbox></Col>
            </Row>
            <Row>
              <Col span="8"><Checkbox label="iter">Iter</Checkbox></Col>
              <!--          <Checkbox label="lcurve">Lcurve</Checkbox>-->
              <Col span="8"><Checkbox label="dpkit">Dpkit</Checkbox></Col>
              <Col span="8"><Checkbox label="vasp">Vasp</Checkbox></Col>
            </Row>
            <Row>
              <Col span="8"><Checkbox label="user">用户管理</Checkbox></Col>
              <Col span="8"><Checkbox label="role">角色管理</Checkbox></Col>
            </Row>
          </CheckboxGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          size="large"
          @click="handleSubmit('addForm')"
          style="
            width: 340px;
            height: 40px;
            background: #13227a;
            border-radius: 11px;
            margin-right: 62px;
          "
          >确定</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import path from "@/utils/permission";
import { roleModify, roleList, roleDel } from "@/api/user";

import { asyncMenus, parseMenusToTitle } from "@/utils/parse";
import { forEach } from "jszip";

export default {
  name: "RoleManagement",
  data() {
    return {
      multiselect: true,
      totalRole: 0,
      menuColumns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "用户名",
          key: "name",
        },
        {
          title: "菜单权限",
          slot: "menus",
        },
        {
          title: "api权限",
          slot: "permissions",
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center",
        },
      ],
      roleData: [],
      modal: false,
      ifShowDrawer: false,
      addModal: false,
      addForm: {
        name: "",
        menuPermissions: [],
        apiPermissions: [],
      },
      editForm: {
        id: "",
        name: "",
        menuPermissions: [],
        apiPermissions: [],
      },
      treeData: [
        {
          title: "API权限",
          expand: true,
          checked: false,
          children: [
            {
              title: "账号",
              expand: true,
              checked: false,
            },
            {
              title: "财务",
              expand: true,
              checked: false,
            },
          ],
        },
        {
          title: "菜单权限",
          expand: true,
          checked: false,
          children: [
            {
              title: "开机",
              expand: true,
              checked: false,
              value: "create",
            },
            {
              title: "Cp2k",
              expand: true,
              checked: false,
              value: "cp2k",
            },
            {
              title: "Lampps",
              expand: true,
              checked: false,
              value: "lampps",
            },
            {
              title: "Iter",
              expand: true,
              checked: false,
              value: "iter",
            },
            {
              title: "Dpkit",
              expand: true,
              checked: false,
              value: "dpkit",
            },
            {
              title: "Vasp",
              expand: true,
              checked: false,
              value: "vasp",
            },
            {
              title: "用户管理",
              expand: true,
              checked: false,
              value: "user",
            },
            {
              title: "角色管理",
              expand: true,
              checked: false,
              value: "role",
            },
          ],
        },
      ],
    };
  },
  created() {
    roleList({
      page: 1,
      per_page: 10,
    }).then((res) => {
      this.totalRole = res.total;
      this.roleData = res.items;
    });
  },
  methods: {
    changeTree(data) {
      let menu = [];
      let api = [];
      data.forEach((item) => {
        if (item.title == "账号" && item.checked && !item.children)
          api.push("account");
        if (item.title == "财务" && item.checked && !item.children)
          api.push("finance");
        if (
          item.checked &&
          !item.children &&
          item.title != "账号" &&
          item.title != "财务"
        ) {
          menu.push(item.value);
        }
      });
      this.$set(this.editForm, "menuPermissions", menu);
      this.$set(this.editForm, "apiPermissions", api);
    },
    showDrawer(index) {
      this.ifShowDrawer = true;
      this.$set(this.editForm, "name", this.roleData[index].name);
      this.$set(this.editForm, "id", this.roleData[index].id);
      this.$set(this.editForm, "menuPermissions", this.roleData[index].menu);
      this.treeData[1].checked = false;
      this.treeData[1].children[0].checked =
        this.roleData[index].menu.indexOf("create") >= 0 ? true : false;
      this.treeData[1].children[1].checked =
        this.roleData[index].menu.indexOf("cp2k") >= 0 ? true : false;
      this.treeData[1].children[2].checked =
        this.roleData[index].menu.indexOf("lampps") >= 0 ? true : false;
      this.treeData[1].children[3].checked =
        this.roleData[index].menu.indexOf("iter") >= 0 ? true : false;
      this.treeData[1].children[4].checked =
        this.roleData[index].menu.indexOf("dpkit") >= 0 ? true : false;
      this.treeData[1].children[5].checked =
        this.roleData[index].menu.indexOf("vasp") >= 0 ? true : false;
      this.treeData[1].children[6].checked =
        this.roleData[index].menu.indexOf("user") >= 0 ? true : false;
      this.treeData[1].children[7].checked =
        this.roleData[index].menu.indexOf("role") >= 0 ? true : false;

      const { permissions } = this.roleData[index];
      const api = [];
      this.treeData[0].checked = false;
      this.treeData[0].children[0].checked =
        permissions.indexOf("/account/password/modify") >= 0 ? true : false;
      this.treeData[0].children[1].checked =
        permissions.indexOf("/finance/trades") >= 0 ? true : false;
      if (permissions.indexOf("/account/password/modify") >= 0) {
        api.push("account");
      }
      if (permissions.indexOf("/finance/trades") >= 0) {
        api.push("finance");
      }
      this.$set(this.editForm, "apiPermissions", api);
    },
    parsePermissions(permissions) {
      const api = [];
      if (permissions.indexOf("/account/password/modify") >= 0) {
        api.push("账号");
      }
      if (permissions.indexOf("/finance/trades") >= 0) {
        api.push("财务");
      }
      return api.join(",");
    },

    parseTitle(menus) {
      const titles = parseMenusToTitle(asyncMenus, menus);
      return titles.join(",");
    },
    changePage(page) {
      this.roleData = [];
      roleList({
        page,
        per_page: 10,
      }).then((res) => {
        for (const items of res.items) {
          this.roleData.push(items);
        }
      });
    },
    delRole(id) {
      roleDel({
        id,
      }).then((res) => {
        this.$Message.success("成功删除角色");
        window.location.reload();
      });
    },
    handleSubmit(name) {
      let permissions = [];
      for (const item of this.addForm.apiPermissions) {
        permissions = permissions.concat(path[item]);
      }
      const data = {
        name: this.addForm.name,
        menu: this.addForm.menuPermissions.join(","),
        permissions,
      };

      roleModify(data).then((res) => {
        window.location.reload();
      });
    },
    editSubmit() {
      let permissions = [];
      for (const item of this.editForm.apiPermissions) {
        permissions = permissions.concat(path[item]);
      }

      const data = {
        id: this.editForm.id,
        name: this.editForm.name,
        menu: this.editForm.menuPermissions.join(","),
        permissions,
      };
      roleModify(data).then((res) => {
        this.$Message.success("修改成功");
        window.location.reload();
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    success() {
      this.slidePass = true;
    },
    multiSelect(selection) {
      this.multiselect = selection.length == 0 ? true : false;
    },
  },
};
</script>

<style scoped lang="scss">
#role {
  // background-color: #fff;
}
.createRole {
  /deep/ .ivu-form .ivu-form-item-label {
    font-weight: 500;
  }
}
</style>
