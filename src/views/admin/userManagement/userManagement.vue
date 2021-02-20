<template>
  <div id="userManagement">
    <Breadcrumb separator="-">
      <BreadcrumbItem>{{i18n.用户设置}}</BreadcrumbItem>
      <BreadcrumbItem>{{i18n.子用户管理}}</BreadcrumbItem>
    </Breadcrumb>
    <Button @click="addModal = true" type="primary" shape="circle" style="margin-right:15px;background:#13227A;color:#FFFFFF;">{{i18n.添加子用户}}</Button>
    <Table
      ref="userTable"
      :columns="userColumns"
      :data="userData"
      @on-selection-change="userIsSelect"
      style="border-top:1px solid #F4F4F4;margin:12px 0;"
      :no-data-text="defaultUrl(userUrlType)"
      :height="(860/1080)*screenHeight"
    >
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="text"
          size="large"
          style="margin-right: 5px;color: #13227a;"
          @click="showDrawer(index)"
          :disabled="$refs.userTable.objData[index]._isDisabled"
          ><img
              src="../../../assets/img/bianjiIcon.png"
              alt=""
              style="width: 18px; height: 18px"
            /></Button
        >
        <!-- @click="accountDel(row.bid)" -->
        <Button
          type="text"
          size="large"
          style="margin-right: 5px;color: #13227a;"
          @click="deleteUser(row, index)"
          :disabled="$refs.userTable.objData[index]._isDisabled"
          ><img
              src="../../../assets/img/shanchuIcon.png"
              alt=""
              style="width: 18px; height: 18px"
            /></Button
        >
      </template>
      <template slot-scope="{ row }" slot="role">
        {{ parseRole(row.role_id) }}
      </template>
      <div slot="footer">
        <div class="footer">
          <Checkbox
              style="display: inline-block"
              @on-change="selectAllUser"
              v-model="userIsAllSelectd"
              >{{i18n.全选}}</Checkbox
            >
          <Button
            class="userBtn setAuthority"
            :disabled="!userIsSelectd"
            @click.native="ifShowAuthModal = true;">{{i18n.批量设置权限}}</Button>
          <Button
            class="userBtn Del"
            :disabled="!userIsSelectd"
            @click.native="deleteAllUser()">{{i18n.批量删除}}</Button>
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
        <MenuItem name="1">{{i18n.信息设置}}</MenuItem>
        <MenuItem name="2">{{i18n.权限设置}}</MenuItem>
        <MenuItem name="3">{{i18n.隐私设置}}</MenuItem>
      </Menu>
      <Form v-if="formList[0]" label-position="top" ref="editForm" class="editForm">
        <FormItem :label="i18n.用户名" prop="username">
          <Input type="text" v-model="editForm.username"></Input>
        </FormItem>
        <FormItem :label="i18n.用户全名+'('+i18n.不可修改+')'" prop="name">
          <Input type="text" v-model="editForm.name"></Input>
        </FormItem>
        <FormItem :label="i18n.费用上限" prop="costLimit">
          <Input type="text" v-model="editForm.costLimit"></Input>
        </FormItem>
        <FormItem style="text-align: center">
          <Button>{{i18n.确定}}</Button>
        </FormItem>
      </Form>

      <Form v-if="formList[1]" label-position="top" class="editForm">
        <FormItem :label="i18n.API权限" prop="apiPermission">
          <CheckboxGroup v-model="apiPermissions">
            <Row>
              <Col span="8">
                <Checkbox label="account">{{i18n.账户}}</Checkbox>
              </Col>
              <Col span="8">
                <Checkbox label="finance">{{i18n.财务}}</Checkbox>
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
      <Form v-if="formList[2]" label-position="top" class="editForm">
        <FormItem :label="i18n.邮箱" prop="email">
          <Input type="text" v-model="editForm.email"></Input>
        </FormItem>
        <FormItem :label="i18n.旧密码" prop="password">
          <Input type="password" v-model="editForm.password"></Input>
        </FormItem>
        <FormItem style="text-align: center">
          <Button>{{i18n.去邮箱修改}}</Button>
        </FormItem>
      </Form>
      <p slot="footer"></p>
    </Modal>

    <Modal v-model="addModal" width="550" class="addUser">
      <Carousel v-model="value1" dots="none" arrow="never" v-if="addModal">
         <CarouselItem>
          <Form
            ref="addForm"
            :model="addForm"
            :rules="ruleAdd"
            label-position="top"
            style="padding:20px;"
          >
            <p slot="header">
              <div style="width:100%;text-align:center;margin:5px 0 21px 0;height:33px;line-height:33px;font-size:20px;">{{i18n.添加子用户}}</div>
            </p>
            <Row :gutter="48">
              <Col span="12">
                <FormItem :label="i18n.用户名" prop="username">
                  <Input type="text" v-model="addForm.username"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem :label="i18n.用户全名+'('+i18n.不可修改+')'" prop="name">
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
          <Form label-position="top" style="padding:20px;padding-left:60px;">
            <p slot="header">
              <Icon type="md-arrow-round-back"/>
              <div style="width:100%;text-align:center;margin:5px 0 21px 0;height:33px;line-height:33px;font-size:20px;">{{i18n.添加子用户}}</div>
            </p>
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
          </Form>
        </CarouselItem>
      </Carousel>
      <div slot="footer" style="text-align:center;">
        <Button
          type="primary"
          size="large"
          @click="addSubmit()"
          style="width: 310px;height: 40px;background: #13227A;border-radius: 11px;display:inline-block;"
          >{{value1 == 0?i18n.下一步:i18n.提交}}</Button
        >
      </div>
    </Modal>

    <Modal
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
              <!--          <Checkbox label="lcurve">Lcurve</Checkbox>-->
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
    </Modal>
  </div>
</template>

<script>
import {
  accountList,
  accountModify,
  roleList,
  subAdd,
  accountDel,
} from "@/api/user";

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
      userUrlType:1,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      value1: 0,
      userIsSelectd: false,
      userIsAllSelectd: false,
      userChosenNum: 0,
      ifShowModal: false,
      formList: [true, false, false],
      ifShowAuthModal: false,
      // ifShowDrawer: false,
      selectBids: [],
      userColumns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        // {
        //   title: "BID",
        //   key: "bid",
        // },
        {
          title: "用户名",
          key: "username",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.用户名);
          },
        },
        {
          title: "隶属管理员",
          key: "organization_name",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.隶属管理员);
          },
        },
        {
          title: "全名",
          key: "name",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.全名);
          },
        },
        {
          title: "邮箱",
          key: "email",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.邮箱);
          },
        },
        {
          title: "电话",
          key: "phone",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.电话);
          },
        },
        {
          title: "费用上限",
          key: "",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.费用上限);
          },
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.操作);
          },
        },
      ],
      userData: [],
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
  computed:{
    i18n(){
      return this.$t("index.UserManagement");
    }
  },
  created() {
    accountList({
      page: 1,
      per_page: 10,
    }).then((res) => {
      this.userData = res.items;
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
        return `<img class='tipImg' src=${require("../../../assets/img/暂无任务@2x.png")}><div class='tipTxt'>${this.$t("index.Default.暂无任务")}</div>`;
      } else if (type == 2) {
        return `<img class='tipImg' src=${require("../../../assets/img/网络错误@2x.png")}><div class='tipTxt'>${this.$t("index.Default.网络错误")}</div>`;
      } else if (type == 3) {
        return `<img class='tipImg' src=${require("../../../assets/img/无搜索内容@2x.png")}><div class='tipTxt'>${this.$t("index.Default.无搜索结果")}</div>`;
      } else if (type == 4) {
        return `<img class='tipImg' src=${require("../../../assets/img/无权限@2x.png")}><div class='tipTxt'>${this.$t("index.Default.无权限")}</div>`;
      } else if (type == 5) {
        return `<img class='tipImg' src=${require("../../../assets/img/404@2x.png")}><div class='tipTxt'>${this.$t("index.Default.404报错")}</div>`;
      }
    },
    deleteUser(row, index) {
      //删除
      if (confirm(this.i18n.确认要删除吗)) {
        if (this.$refs.userTable.objData[index]._isChecked)
          this.userChosenNum--;
        this.$refs.userTable.objData[index]._isDisabled = true;
        this.$refs.userTable.objData[index]._isChecked = false;
        this.accountDel(row.bid);
      }
    },
    deleteAllUser() {
      //删除选中
      if (confirm(this.i18n.accountList确认要删除吗)) {
        for (let item in this.$refs.userTable.objData) {
          if (this.$refs.userTable.objData[item]._isChecked) {
            this.$refs.userTable.objData[item]._isChecked = false;
            this.$refs.userTable.objData[item]._isDisabled = true;
            this.accountDel(this.$refs.userTable.objData[item].bid);
          }
        }
        this.userChosenNum = 0;
        this.userIsSelectd = false;
        this.userIsAllSelectd = false;
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
      this.userChosenNum = state ? num : 0;
    },
    userIsSelect(selection) {
      //单选时操作
      let item,
        num = 0;
      for (item in this.$refs.userTable.objData) {
        if (!this.$refs.userTable.objData[item]._isDisabled) num++;
      }
      this.userChosenNum = selection.length;
      this.userIsSelectd = selection.length ? true : false;
      this.userIsAllSelectd = selection.length == num ? true : false;
    },

    selectMenu(name) {
      this.formList = [false, false, false];
      this.formList[name - 1] = true;
    },
    parseRole(roleId) {
      for (const item of this.roleData) {
        if (roleId === item.id) {
          return item.name;
        }
      }
      return "null";
    },
    changePage(page) {
      this.userData = [];
      roleList({
        page,
        per_page: 10,
      }).then((res) => {
        for (const items of res.items) {
          this.userData.push(items);
        }
      });
    },
    multiSelect(selection) {
      const bids = selection.map((value) => value.bid);
      this.selectBids = bids;
      this.multiselect = selection.length == 0 ? true : false;
    },
    showDrawer(index) {
      this.ifShowDrawer = true;
      this.ifShowModal = true;
      this.$set(this.editForm, "bid", this.userData[index].bid);
      this.$set(this.editForm, "name", this.userData[index].name);
      this.$set(this.editForm, "password", this.userData[index].username);
      this.$set(this.editForm, "phone", this.userData[index].phone);
      this.$set(this.editForm, "email", this.userData[index].email);
      this.$set(this.editForm, "role_id", this.userData[index].role_id);
    },
    showModal(index) {
      this.addForm = this.userData[index];
      this.addModal = true;
    },
    addSubmit() {
      if (this.value1 == 0) {
        this.value1 = 1;
        return;
      }
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          const params = {
            username: `${this.addForm.username}@${this.$store.state.user.name}`,
            name: this.addForm.name,
            phone: this.addForm.phone,
            email: this.addForm.email,
            password: this.addForm.password,
            role_id: this.addForm.role_id,
          };
          subAdd(params).then((res) => {
            this.$Message.success(this.i18n.添加成功);
            window.location.reload();
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    editSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          accountModify(this.editForm).then((res) => {
            this.$Message.success(this.i18n.修改成功);
            window.location.reload();
          });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    accountDel(bid) {
      accountDel({
        bids: [bid],
      }).then((res) => {
        this.$Message.success(this.i18n.账号删除成功);
        window.location.reload();
      });
    },
    getUserUrl(index, name) {
      let url = name + "Icon";
      if (this.$refs.userTable.objData[index]._isDisabled) url += "Del";
      url += ".png";
      return require("../../../assets/img/" + url);
    },
  },
};
</script>

<style lang="scss">
#userManagement {
  margin: 20px;
  /deep/ .ivu-breadcrumb {
    color: #333333;
    margin-left: 5px;
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
      font-size: 12px;
    }
  }
  .deleteIcon {
    position: absolute;
    width: 30px;
    height: 30px;
    float: right;
    right: 0;
    top: 0;
  }
  .footer {
    position: relative;
    .userBtn {
      float: right;
      border-radius: 20px;
      margin-left: 24px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .setAuthority {
      right: 20px;
    }
    .Del {
      right: 150px;
    }
    .ivu-checkbox-wrapper {
      margin-left: 9px;
    }
  }
  .setAuth {
    /deep/ .ivu-modal-body {
      overflow: hidden;
    }
    /deep/ .ivu-form {
      float: left;
      width: 520px !important;
      margin: 10px 0 0 8px;
    }
    /deep/ .ivu-btn {
      display: inline-block;
      width: 280px;
      height: 40px;
      background: #13227a;
      border-radius: 20px;
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
    /deep/ .ivu-modal-body {
      overflow: hidden;
    }
    /deep/ .ivu-modal-footer{
      border: 0;
      padding: 0;
    }
    .editMenu {
      float: left;
      width: 120px !important;
      height: 310px;
      // height: 310px;
      margin-right: 20px;
    }
    .editForm {
      float: left;
    }
    /deep/ .ivu-btn {
      display: inline-block;
      width: 280px;
      height: 40px;
      background: #13227a;
      border-radius: 20px;
      color: #ffffff;
    }
  }
  /deep/ .ivu-btn-text:hover {
    background-color: #ebf7ff;
  }
</style>
