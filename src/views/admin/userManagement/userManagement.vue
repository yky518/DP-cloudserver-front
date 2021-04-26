<template>
  <div id="userManagement">
    <Breadcrumb separator="-">
      <BreadcrumbItem>{{ i18n.用户设置 }}</BreadcrumbItem>
      <BreadcrumbItem>{{ i18n.子用户管理 }}</BreadcrumbItem>
    </Breadcrumb>
    <Button
      @click="addModal = true"
      type="primary"
      shape="circle"
      style="margin-right: 0.9375rem; background: #13227a; color: #ffffff"
      >{{ i18n.添加子用户 }}</Button
    >
    <Table
      ref="userTable"
      :columns="userColumns"
      :data="userList"
      @on-selection-change="userIsSelect"
      style="border-top: 0.0625rem solid #f4f4f4; margin: 0.75rem 0"
      :no-data-text="defaultUrl(userUrlType)"
      :height="(860 / 1080) * screenHeight"
    >
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="text"
          size="large"
          style="margin-right: 0.3125rem; color: #13227a"
          @click="showModal(index)"
          ><img
            src="../../../assets/img/bianjiIcon.png"
            alt=""
            style="width: 1.125rem; height: 1.125rem"
        /></Button>
        <Button
          type="text"
          size="large"
          style="margin-right: 0.3125rem; color: #13227a"
          @click="showDrawer(index)"
        >
          <img
            src="../../../assets/img/tuodong_icon@2x.png"
            alt=""
            style="width: 1.125rem; height: 1.125rem"
        /></Button>
        <Button
          type="text"
          size="large"
          style="margin-right: 0.3125rem; color: #13227a"
          @click="deleteUser(row, index)"
          ><img
            src="../../../assets/img/shanchuIcon.png"
            alt=""
            style="width: 1.125rem; height: 1.125rem"
        /></Button>
      </template>
      <div slot="footer">
        <div class="footer">
          <Checkbox
            style="display: inline-block"
            @on-change="selectAllUser"
            v-model="userIsAllSelectd"
            >{{ i18n.全选 }}</Checkbox
          >
          <!-- <Button
            class="userBtn setAuthority"
            :disabled="!userIsSelectd"
            @click.native="ifShowAuthModal = true;">{{i18n.批量设置权限}}</Button> -->
          <Button
            class="userBtn Del"
            :disabled="!userIsSelectd"
            @click.native="deleteAllUser()"
            >{{ i18n.批量删除 }}</Button
          >
        </div>
      </div>
    </Table>
    <Page
      :total="totalUser"
      style="text-align: center"
      @on-change="changePage"
    />
    <Modal v-model="ifShowModal" id="edit">
      <Menu @on-select="selectMenu" active-name="1" class="editMenu">
        <MenuItem name="1">{{ i18n.信息设置 }}</MenuItem>
        <!-- <MenuItem name="2">{{ i18n.权限设置 }}</MenuItem> -->
        <MenuItem name="3">{{ i18n.隐私设置 }}</MenuItem>
      </Menu>
      <Form
        v-if="formList[0]"
        label-position="top"
        ref="editForm"
        class="editForm"
      >
        <FormItem :label="i18n.用户名" prop="username">
          <Input type="text" v-model="editForm.username"></Input>
        </FormItem>
        <FormItem
          :label="i18n.用户全名 + '(' + i18n.不可修改 + ')'"
          prop="name"
        >
          <Input type="text" v-model="editForm.name" disabled></Input>
        </FormItem>
        <FormItem :label="i18n.费用上限" prop="costLimit">
          <Input type="text" v-model="editForm.costLimit"></Input>
        </FormItem>
        <FormItem style="text-align: center">
          <Button @click.native="submitUserInfo()">{{ i18n.确定 }}</Button>
        </FormItem>
      </Form>

      <Form v-if="formList[1]" label-position="top" class="editForm">
        <FormItem :label="i18n.API权限" prop="apiPermission">
          <CheckboxGroup v-model="apiPermissions">
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

        <FormItem :label="i18n.菜单权限" prop="menuPermission">
          <CheckboxGroup v-model="menuPermissions" size="large">
            <Row>
              <Col span="8">
                <Checkbox label="create" size="large">开机</Checkbox></Col
              >
              <Col span="8"><Checkbox label="cp2k">Cp2k</Checkbox></Col>
              <Col span="8"><Checkbox label="lammps">Lammps</Checkbox></Col>
            </Row>
            <Row>
              <Col span="8"><Checkbox label="iter">Iter</Checkbox></Col>
              <Col span="8"><Checkbox label="dpkit">Dpkit</Checkbox></Col>
              <Col span="8"><Checkbox label="vasp">Vasp</Checkbox></Col>
            </Row>
            <Row>
              <Col span="8"><Checkbox label="scc">云超算</Checkbox></Col>
              <Col span="8"><Checkbox label="user">用户管理</Checkbox></Col>
              <Col span="8"
                ><Checkbox label="authority">信息修改</Checkbox></Col
              >
            </Row>
            <Row>
              <Col span="8"><Checkbox label="task">任务总览</Checkbox></Col>
              <Col span="8"><Checkbox label="server">服务器总览</Checkbox></Col>
              <Col span="8"><Checkbox label="file">文件总览</Checkbox></Col>
            </Row>
            <!-- <Row>
              <Col span="8"
                ><Checkbox
                  label="businessModule,fund,bill,invoice,charging,businessHome,recharge,rechargeRecord,withdraw,withdrawRecord,voucher,expense,export"
                  >财务分析</Checkbox
                ></Col
              >
            </Row> -->
          </CheckboxGroup>
        </FormItem>
        <FormItem style="text-align: center">
          <Button>{{ i18n.确定 }}</Button>
        </FormItem>
      </Form>
      <Form v-if="formList[2]" label-position="top" class="editForm">
        <FormItem :label="i18n.邮箱" prop="email">
          <Input type="text" v-model="editForm.email"></Input>
        </FormItem>
        <FormItem :label="i18n.旧密码" prop="password">
          <Input type="password" v-model="editForm.password" disabled></Input>
        </FormItem>
        <FormItem style="text-align: center">
          <Button>{{ i18n.去邮箱修改 }}</Button>
        </FormItem>
      </Form>
      <p slot="footer"></p>
    </Modal>

    <Modal v-model="addModal" width="550" class="addUser">
      <template slot="header">
        <Icon
          v-if="backIcon == 1"
          type="md-arrow-round-back"
          @click="backIcon = 0"
          style="position: absolute; top: 20px; left: 20px; font-size: 20px"
        />
        <div
          style="
            width: 100%;
            text-align: center;
            margin: 0.3125rem 0 1.3125rem 0;
            height: 2.0625rem;
            line-height: 2.0625rem;
            font-size: 1.25rem;
          "
        >
          {{ i18n.添加子用户 }}
        </div>
      </template>
      <Carousel v-model="backIcon" dots="none" arrow="never" v-if="addModal">
        <CarouselItem>
          <Form
            ref="addForm"
            :model="addForm"
            :rules="ruleAdd"
            label-position="top"
            style="padding: 1.25rem"
          >
            <Row :gutter="48">
              <Col span="12">
                <FormItem :label="i18n.用户名" prop="username">
                  <Input type="text" v-model="addForm.username"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem
                  :label="i18n.用户全名 + '(' + i18n.不可修改 + ')'"
                  prop="name"
                >
                  <Input type="text" v-model="addForm.name"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="48">
              <Col span="12">
                <FormItem :label="i18n.邮箱" prop="email">
                  <Input type="text" v-model="addForm.email"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem :label="i18n.费用上限" prop="phone">
                  <Input type="text" v-model="addForm.limit"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="48">
              <Col span="12">
                <FormItem :label="i18n.密码" prop="password">
                  <Input type="password" v-model="addForm.password"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem :label="i18n.确认密码" prop="password2">
                  <Input type="password" v-model="addForm.password2"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="48">
              <Col span="12">
                <FormItem :label="i18n.电话" prop="phone">
                  <Input type="text" v-model="addForm.phone"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </CarouselItem>
        <CarouselItem>
          <Form
            label-position="top"
            style="padding: 1.25rem; padding-left: 3.75rem"
          >
            <FormItem :label="i18n.API权限" prop="apiPermission">
              <CheckboxGroup v-model="apiPermissions">
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

            <FormItem :label="i18n.菜单权限" prop="menuPermission">
              <CheckboxGroup v-model="menuPermissions" size="large">
                <Row>
                  <Col span="8">
                    <Checkbox label="create" size="large">开机</Checkbox></Col
                  >
                  <Col span="8"><Checkbox label="cp2k">Cp2k</Checkbox></Col>
                  <Col span="8"><Checkbox label="lammps">Lammps</Checkbox></Col>
                </Row>
                <Row>
                  <Col span="8"><Checkbox label="iter">Iter</Checkbox></Col>
                  <Col span="8"><Checkbox label="dpkit">Dpkit</Checkbox></Col>
                  <Col span="8"><Checkbox label="vasp">Vasp</Checkbox></Col>
                </Row>
                <Row>
                  <Col span="8"><Checkbox label="scc">云超算</Checkbox></Col>
                  <Col span="8"><Checkbox label="user">用户管理</Checkbox></Col>
                  <Col span="8"
                    ><Checkbox label="authority">信息修改</Checkbox></Col
                  >
                </Row>
                <Row>
                  <Col span="8"><Checkbox label="task">任务总览</Checkbox></Col>
                  <Col span="8"
                    ><Checkbox label="server">服务器总览</Checkbox></Col
                  >
                  <Col span="8"><Checkbox label="file">文件总览</Checkbox></Col>
                </Row>
                <!-- <Row>
                  <Col span="8"
                    ><Checkbox
                      label="businessModule,fund,bill,invoice,charging,businessHome,recharge,rechargeRecord,withdraw,withdrawRecord,voucher,expense,export"
                      >财务分析</Checkbox
                    ></Col
                  >
                </Row> -->
              </CheckboxGroup>
            </FormItem>
          </Form>
        </CarouselItem>
      </Carousel>
      <div slot="footer" style="text-align: center">
        <Button
          type="primary"
          size="large"
          @click="addUser()"
          style="
            width: 19.375rem;
            height: 2.5rem;
            background: #13227a;
            border-radius: 0.6875rem;
            display: inline-block;
          "
          >{{ backIcon == 0 ? i18n.下一步 : i18n.提交 }}</Button
        >
      </div>
    </Modal>

    <Drawer title="角色信息修改" :closable="false" v-model="ifShowDrawer">
      <Form label-position="top">
        <Tree
          :data="treeData"
          show-checkbox
          multiple
          check-directly
          @on-check-change="roleTreeChange"
          ref="roleTree"
        >
        </Tree>
        <Button long @click.native="submitRoleInfo()">确定</Button>
      </Form>
    </Drawer>

    <!-- <Modal
      v-model="ifShowAuthModal"
      :title="i18n.批量设置权限"
      class="setAuth"
      >
      <Form label-position="top">
        <FormItem :label="i18n.API权限" prop="apiPermission">
          <CheckboxGroup v-model="apiPermissions">
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

        <FormItem :label="i18n.菜单权限" prop="menuPermission">
          <CheckboxGroup v-model="menuPermissions" size="large">
            <Row>
              <Col span="8">
                <Checkbox label="create" size="large">开机</Checkbox></Col
              >
              <Col span="8"><Checkbox label="cp2k">Cp2k</Checkbox></Col>
              <Col span="8"><Checkbox label="lammps">Lammps</Checkbox></Col>
            </Row>
            <Row>
              <Col span="8"><Checkbox label="iter">Iter</Checkbox></Col>
              <Col span="8"><Checkbox label="dpkit">Dpkit</Checkbox></Col>
              <Col span="8"><Checkbox label="vasp">Vasp</Checkbox></Col>
            </Row>
            <Row>
              <Col span="8"><Checkbox label="user">用户管理</Checkbox></Col>
            </Row>
          </CheckboxGroup>
        </FormItem>
        <FormItem style="text-align: center">
          <Button>{{i18n.确定}}</Button>
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal> -->
  </div>
</template>

<script>
import {
  accountList,
  accountModify,
  roleList,
  subAdd,
  accountDel,
  roleModify,
  Role,
} from "@/api/user";
const treeData = [
  {
    title: "API权限",
    expand: true,
    checked: false,
    children: [
      {
        title: "账号",
        expand: true,
        checked: false,
        value: {
          path: "account",
          method: "post",
        },
      },
      {
        title: "财务",
        expand: true,
        checked: false,
        value: {
          path: "finance",
          method: "post",
        },
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
        title: "云超算",
        expand: true,
        checked: false,
        value: "scc",
      },
      {
        title: "用户管理",
        expand: true,
        checked: false,
        value: "user",
      },
      {
        title: "信息修改",
        expand: true,
        checked: false,
        value: "authority",
      },
      {
        title: "任务总览",
        expand: true,
        checked: false,
        value: "task",
      },
      {
        title: "服务器总览",
        expand: true,
        checked: false,
        value: "server",
      },
      {
        title: "文件总览",
        expand: true,
        checked: false,
        value: "file",
      },
      // {
      //   title: "财务分析",
      //   expand: true,
      //   checked: false,
      //   value:
      //     "businessModule,fund,bill,invoice,charging,businessHome,recharge,rechargeRecord,withdraw,withdrawRecord,voucher,expense,export",
      // },
    ],
  },
];
const apilist = [
  { path: "/account/role/list", method: "get" },
  { path: "/account/role/modify", method: "post" },
  { path: "/account/del", method: "post" },
  { path: "/account/sub/add", method: "post" },
  { path: "/account/organization/list", method: "get" },
  { path: "/account/organization/modify", method: "post" },
  { path: "/account/role/del", method: "post" },
  { path: "/account/list", method: "get" },
  { path: "/data/file/:id/del", method: "get" },
  { path: "/data/file/:id/remark", method: "get" },
  { path: "/data/files", method: "get" },
  { path: "/data/job/:id/del", method: "post" },
  { path: "/data/job/:id/remark", method: "post" },
  { path: "/data/job/:id/star", method: "post" },
  { path: "/data/job/:id/stop", method: "post" },
  { path: "/data/job/:id/tasks", method: "get" },
  { path: "/data/job/create", method: "post" },
  { path: "/data/jobs", method: "get" },
  { path: "/data/machine/:id/del", method: "post" },
  { path: "/data/machine/create", method: "post" },
  { path: "/data/statistics/fee", method: "get" },
  { path: "/data/statistics/fee_change", method: "get" },
  { path: "/data/statistics/job", method: "get" },
  { path: "/data/statistics/machine", method: "get" },
  { path: "/data/statistics/overview", method: "get" },
  { path: "/data/task/:id/log", method: "get" },
  { path: "/finance/invoices", method: "get" },
  { path: "/finance/invoice/add", method: "post" },
  { path: "/finance/invoice/modify", method: "post" },
  { path: "/finance/bills", method: "get" },
  { path: "/finance/wallet/info", method: "get" },
  { path: "/finance/trades", method: "get" },
  { path: "/finance/trade/status", method: "get" },
];
export default {
  name: "UserManagement",
  data() {
    const validatePassAdd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.addForm.password) {
        callback(new Error("Password is not same"));
      } else {
        callback();
      }
    };
    const validatePassEdit = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.editForm.password) {
        callback(new Error("Password is not same"));
      } else {
        callback();
      }
    };
    return {
      treeData,
      apilist,
      userUrlType: 1,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      backIcon: 0,
      userIsSelectd: false,
      userIsAllSelectd: false,
      ifShowModal: false,
      formList: [true, false, false],
      // ifShowAuthModal: false,
      ifShowDrawer: false,
      selectBids: [],
      userColumns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "用户名",
          key: "username",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.用户名);
          },
        },
        {
          title: "隶属管理员",
          key: "organization_name",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.隶属管理员);
          },
        },
        {
          title: "全名",
          key: "name",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.全名);
          },
        },
        {
          title: "邮箱",
          key: "email",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.邮箱);
          },
        },
        {
          title: "电话",
          key: "phone",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.电话);
          },
        },
        {
          title: "费用上限",
          key: "",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.费用上限);
          },
        },
        {
          title: "操作",
          slot: "action",
          width: 210,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.操作);
          },
        },
      ],
      userList: [],
      totalUser: 0,
      modal: false,
      addModal: false,
      addForm: {
        username: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        password2: "",
        role_id: "",
      },
      editForm: {
        bid: "",
        username: "",
        name: "",
        phone: "",
        email: "",
        role_id: "",
      },
      roleForm: {
        menu: "",
        permissions: [],
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
        password2: [{ validator: validatePassAdd, trigger: "blur" }],
        email: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
      },
      ruleEdit: {
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
        passwd2: [{ validator: validatePassEdit, trigger: "blur" }],
        email: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur",
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" },
        ],
      },
      apiPermissions: [],
      menuPermissions: [],
    };
  },
  computed: {
    i18n() {
      return this.$t("index.UserManagement");
    },
  },
  created() {
    accountList({
      page: 1,
      per_page: 100,
    }).then((res) => {
      this.userList = res.items;
    });
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        this.screenHeight = window.fullHeight; // 高
        this.screenWidth = window.fullWidth; // 宽
      })();
    };
  },
  methods: {
    defaultUrl(type) {
      if (type == 1) {
        return `<img class='tipImg' src=${require("../../../assets/img/暂无任务@2x.png")}><div class='tipTxt'>${this.$t(
          "index.Default.暂无任务"
        )}</div>`;
      } else if (type == 2) {
        return `<img class='tipImg' src=${require("../../../assets/img/网络错误@2x.png")}><div class='tipTxt'>${this.$t(
          "index.Default.网络错误"
        )}</div>`;
      } else if (type == 3) {
        return `<img class='tipImg' src=${require("../../../assets/img/无搜索内容@2x.png")}><div class='tipTxt'>${this.$t(
          "index.Default.无搜索结果"
        )}</div>`;
      } else if (type == 4) {
        return `<img class='tipImg' src=${require("../../../assets/img/无权限@2x.png")}><div class='tipTxt'>${this.$t(
          "index.Default.无权限"
        )}</div>`;
      } else if (type == 5) {
        return `<img class='tipImg' src=${require("../../../assets/img/404@2x.png")}><div class='tipTxt'>${this.$t(
          "index.Default.404报错"
        )}</div>`;
      }
    },
    deleteUser(row, index) {
      //删除
      if (confirm(this.i18n.确认要删除吗)) {
        this.$refs.userTable.objData[index]._isChecked = false;
        this.accountDel(row.bid);
        window.location.reload();
      }
    },
    deleteAllUser() {
      //删除选中
      if (confirm(this.i18n.确认要删除吗)) {
        for (let item in this.$refs.userTable.objData) {
          if (this.$refs.userTable.objData[item]._isChecked) {
            this.$refs.userTable.objData[item]._isChecked = false;
            this.$refs.userTable.objData[item]._isDisabled = true;
            this.accountDel(this.$refs.userTable.objData[item].bid);
          }
        }
        this.userIsSelectd = false;
        this.userIsAllSelectd = false;
        window.location.reload();
      }
    },
    selectAllUser(state) {
      //全选
      let num = 0;
      for (let item in this.$refs.userTable.objData) {
        if (!this.$refs.userTable.objData[item]._isDisabled) {
          this.$refs.userTable.objData[item]._isChecked = state;
          num++;
        }
      }
      this.userIsSelectd = num != 0 ? state : 0;
    },
    userIsSelect(selection) {
      //单选时操作
      let item,
        num = 0;
      for (item in this.$refs.userTable.objData) {
        if (!this.$refs.userTable.objData[item]._isDisabled) num++;
      }
      this.userIsSelectd = selection.length ? true : false;
      this.userIsAllSelectd = selection.length == num ? true : false;
    },

    selectMenu(name) {
      this.formList = [false, false, false];
      this.formList[name - 1] = true;
    },
    changePage(page) {
      this.userList = [];
      roleList({
        page,
        per_page: 10,
      }).then((res) => {
        for (const items of res.items) {
          this.userList.push(items);
        }
      });
    },
    accountDel(bid) {
      accountDel({
        bids: [bid],
      }).then((res) => {
        this.$Message.success(this.i18n.账号删除成功);
      });
    },

    addUser() {
      if (this.backIcon == 0) {
        this.backIcon = 1;
        return;
      }
      if (this.addForm.password != this.addForm.password2) {
        this.$message.error(
          "Your confirmed password and new password do not match."
        );
        return;
      }
      let menu = "";
      this.menuPermissions.forEach((item, index) => {
        menu += item;
        if (index < this.menuPermissions.length - 1) menu += ",";
      });
      // menu = "cp2k,iter,lammps,user,dpkit,vasp,create,authority,task,server,file,businessModule,fund,bill,invoice,charging,businessHome,recharge,rechargeRecord,withdraw,withdrawRecord,voucher,expense,export,scc"

      //建立api列表,选中父元素后将子元素一起拉入数组
      let permissions = [...this.apilist.slice(8, 26)];
      this.apiPermissions.forEach((item) => {
        // 0-7 account
        // 8-25 data
        // 26-32 finance
        if (item == "account")
          permissions = [...permissions, ...this.apilist.slice(0, 8)];
        else if (item == "finance")
          permissions = [...permissions, ...this.apilist.slice(26)];
      });
      let data = {
        username: this.addForm.username,
        name: this.addForm.name,
        phone: this.addForm.phone,
        email: this.addForm.email,
        password: this.addForm.password,
        menu: menu,
        permissions: permissions,
      };
      subAdd(data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    showModal(index) {
      this.ifShowModal = true;
      this.$set(this.editForm, "bid", this.userList[index].bid);
      this.$set(this.editForm, "username", this.userList[index].username);
      this.$set(this.editForm, "name", this.userList[index].name);
      this.$set(this.editForm, "phone", this.userList[index].phone);
      this.$set(this.editForm, "email", this.userList[index].email);
      this.$set(this.editForm, "role_id", this.userList[index].role_id);
    },
    submitUserInfo() {
      accountModify(this.editForm)
        .then((res) => {
          console.log(res);
          this.ifShowModal = false;
          this.$Message("修改成功");
        })
        .catch((err) => {
          console.log(err);
          this.$Message("修改失败");
        });
    },
    // 权限修改侧边栏
    showDrawer(index) {
      this.$refs.roleTree.data[0].children.forEach((item) => {
        item.checked = false;
      });
      this.$refs.roleTree.data[1].children.forEach((item) => {
        item.checked = false;
      });
      Role(this.userList[index].role_id)
        .then((res) => {
          let menu = "";
          res.menu.forEach((item, index) => {
            this.$refs.roleTree.data[1].children.forEach((item1) => {
              if (item1.value == item) item1.checked = true;
            });
            menu += item;
            if (index < res.menu.length - 1) menu += ",";
          });
          res.permissions.forEach((item) => {
            if (item.indexOf("account")!=-1)
              this.$refs.roleTree.data[0].children[0].checked = true;
            if (item.indexOf("finance")!=-1)
              this.$refs.roleTree.data[0].children[1].checked = true;
          });
          this.ifShowDrawer = true;
          this.$set(this.roleForm, "id", this.userList[index].role_id);
          this.$set(this.roleForm, "name", this.userList[index].role_name);
          this.$set(this.roleForm, "menu", menu);
          this.$set(this.roleForm, "permissions", res.permissions);
          this.$set(this.roleForm, "state", 1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    roleTreeChange(data) {
      this.roleForm.menu = "";
      this.roleForm.permissions = [...this.apilist.slice(8, 26)];
      data.forEach((item, index) => {
        if (!item.children) {
          if (item.nodeKey == 1 || item.nodeKey == 2) {
            if (item.nodeKey == 1)
              this.roleForm.permissions = [
                ...this.roleForm.permissions,
                ...this.apilist.slice(0, 8),
              ];
            else if (item.nodeKey == 2)
              this.roleForm.permissions = [
                ...this.roleForm.permissions,
                ...this.apilist.slice(26),
              ];
          } else {
            this.roleForm.menu += item.value;
            if (index < data.length - 1) this.roleForm.menu += ",";
          }
        }
      });
    },
    submitRoleInfo() {
      roleModify(this.roleForm)
        .then((res) => {
          this.ifShowDrawer == false;
          this.$Message("修改成功");
          console.log(res);
        })
        .catch((err) => {
          this.ifShowDrawer == false;
          this.$Message("修改失败");
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
#userManagement {
  margin: 1.25rem;
  /deep/ .ivu-breadcrumb {
    color: #333333;
    margin-left: 0.3125rem;
    span:last-child {
      color: #13227a;
      font-weight: 700;
    }
  }
  .ivu-table .disabled td {
    color: #d8d8d8 !important;
    position: relative;
    .ivu-table-cell div {
      color: #d8d8d8 !important;
    }
  }
  /deep/ .ivu-table-tip {
    .tipImg {
      width: 15%;
    }
    .tipTxt {
      font-size: 0.75rem;
    }
  }
  .deleteIcon {
    position: absolute;
    width: 1.875rem;
    height: 1.875rem;
    float: right;
    right: 0;
    top: 0;
  }
  .footer {
    position: relative;
    .userBtn {
      float: right;
      border-radius: 1.25rem;
      margin-left: 1.5rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .setAuthority {
      right: 1.25rem;
    }
    .Del {
      right: 1.25rem;
    }
    .ivu-checkbox-wrapper {
      margin-left: 0.5625rem;
    }
  }
  .setAuth {
    /deep/ .ivu-modal-body {
      overflow: hidden;
    }
    /deep/ .ivu-form {
      float: left;
      width: 32.5rem !important;
      margin: 0.625rem 0 0 0.5rem;
    }
    /deep/ .ivu-btn {
      display: inline-block;
      width: 17.5rem;
      height: 2.5rem;
      background: #13227a;
      border-radius: 1.25rem;
      color: #ffffff;
    }
  }
  .addUser {
    /deep/ .ivu-modal-body {
      padding: 0;
    }
  }
}
#edit {
  .ivu-modal-footer {
    border: 0;
    padding: 0;
  }
  .ivu-modal-body {
    overflow: hidden;
  }
  .editMenu {
    float: left;
    width: 7.5rem !important;
    height: 19.375rem;
    // height: 19.375rem;
    margin-right: 1.25rem;
  }
  .editForm {
    float: left;
  }
  .ivu-btn {
    display: inline-block;
    width: 17.5rem;
    height: 2.5rem;
    background: #13227a;
    border-radius: 1.25rem;
    color: #ffffff;
  }
}
/deep/ .ivu-btn-text:hover {
  background-color: #ebf7ff;
}
</style>