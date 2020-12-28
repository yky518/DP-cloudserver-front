<template>
<div>
  <Button @click="addModal = true">添加</Button>
  <Button @click="multiDel">批量删除</Button>
  <Table ref="user_table" :columns="userColumns" :data="userData"
         @on-selection-change="multiSelect">
    <template slot-scope="{ row, index }" slot="action">
      <Button type="primary" size="small"
              style="margin-right: 5px" @click="showDrawer(index)">编辑</Button>
      <Button type="primary" size="small"
              style="margin-right: 5px" @click="accountDel(row.bid)">删除</Button>
    </template>
    <template slot-scope="{ row }" slot="role">
      {{parseRole(row.role_id)}}
    </template>
  </Table>
  <Page :total="totalUser" style="text-align: center" @on-change="changePage"/>
  <Drawer title="账号信息修改" :closable="false" v-model="ifShowDrawer">
    <Form ref="editForm" :model="editForm" :rules="ruleEdit" :label-width="80">
      <FormItem label="登陆账号" prop="username">
        <Input type="text" v-model="editForm.username" disabled></Input>
      </FormItem>
      <FormItem label="真实姓名" prop="name">
        <Input type="text" v-model="editForm.name" ></Input>
      </FormItem>
      <FormItem label="手机号" prop="phone">
        <Input type="text" v-model="editForm.phone" ></Input>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input type="text" v-model="editForm.email" ></Input>
      </FormItem>
      <FormItem label="角色" prop="role_id">
        <Select v-model="editForm.role_id">
          <Option v-for="item in roleData"
                  :key="'edit' + item.name" :value="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="editForm.password" ></Input>
      </FormItem>
      <FormItem label="确认密码" prop="password2">
        <Input type="password" v-model="editForm.password2" ></Input>
      </FormItem>
    </Form>
    <Button long @click="editSubmit">确定</Button>

  </Drawer>
  <Modal
      v-model="addModal"
      @on-ok="addSubmit()"
      title="添加">
    <!--  :rules="ruleCustom"-->
    <Form ref="addForm" :model="addForm" :rules="ruleAdd" :label-width="80">
      <FormItem label="登陆账号" prop="username">
        <Input type="text" v-model="addForm.username" ></Input>
        @{{$store.state.user.name}}
      </FormItem>
      <FormItem label="真实姓名" prop="name">
        <Input type="text" v-model="addForm.name" ></Input>
      </FormItem>
      、<FormItem label="手机号" prop="phone">
      <Input type="text" v-model="addForm.phone" ></Input>
    </FormItem>
      <FormItem label="邮箱" prop="email">
        <Input type="text" v-model="addForm.email" ></Input>
      </FormItem>
      <FormItem label="角色" prop="role_id">
        <Select v-model="addForm.role_id">
          <Option v-for="item in roleData"
                  :key="'add' + item.name" :value="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input type="password" v-model="addForm.password" ></Input>
      </FormItem>
      <FormItem label="确认密码" prop="password2">
        <Input type="password" v-model="addForm.password2" ></Input>
      </FormItem>
    </Form>
  </Modal>
</div>
</template>

<script>
import {
  accountList, accountModify, roleList, subAdd, accountDel,
} from '@/api/user';

export default {
  name: 'UserManagement',
  data() {
    const validatePassAdd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'));
      } else if (value !== this.addForm.password) {
        callback(new Error('Password is not same'));
      } else {
        callback();
      }
    };
    const validatePassEdit = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your password again'));
      } else if (value !== this.editForm.password) {
        callback(new Error('Password is not same'));
      } else {
        callback();
      }
    };
    return {
      ifShowDrawer: false,
      selectBids: [],
      userColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        }, {
          title: 'BID',
          key: 'bid',
        }, {
          title: '昵称',
          key: 'username',
        }, {
          title: '用户名',
          key: 'name',
        },
        {
          title: '邮箱',
          key: 'email',
        },
        {
          title: '手机号',
          key: 'phone',
        },
        {
          title: '角色',
          // key: 'role_id',
          slot: 'role',
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center',
        },
      ],
      userData: [],
      totalUser: 0,
      modal: false,
      addModal: false,
      addForm: {
        username: '',
        name: '',
        phone: '',
        email: '',
        password: '',
        password2: '',
        role_id: '',
      },
      editForm: {
        bid: '',
        username: '',
        name: '',
        phone: '',
        email: '',
        role_id: '',
      },
      roleData: [],
      ruleAdd: {
        username: [
          { required: true, message: 'The username cannot be empty', trigger: 'blur' },
        ],
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'The password cannot be empty', trigger: 'blur' },
        ],
        password2: [
          { validator: validatePassAdd, trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' },
        ],
      },
      ruleEdit: {
        username: [
          { required: true, message: 'The username cannot be empty', trigger: 'blur' },
        ],
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' },
        ],
        passwd2: [
          { validator: validatePassEdit, trigger: 'blur' },
        ],
        email: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    accountList({
      page: 1,
      per_page: 10,
    }).then((res) => {
      console.log(res);
      this.userData = res.items;
    });

    roleList({
      page: 1,
      per_page: 10,
    }).then((res) => {
      console.log(res);
      this.roleData = res.items;
    });
  },
  methods: {
    parseRole(roleId) {
      for (const item of this.roleData) {
        if (roleId === item.id) {
          return item.name;
        }
      }
      return 'null';
    },
    changePage(page) {
      console.log(page);
      this.userData = [];
      roleList({
        page,
        per_page: 10,
      }).then((res) => {
        console.log(res);
        for (const items of res.items) {
          this.userData.push(items);
        }
      });
    },
    multiSelect(selection) {
      const bids = selection.map((value) => value.bid);
      this.selectBids = bids;
    },
    showDrawer(index) {
      this.ifShowDrawer = true;
      this.$set(this.editForm, 'bid', this.userData[index].bid);
      this.$set(this.editForm, 'name', this.userData[index].name);
      this.$set(this.editForm, 'password', this.userData[index].username);
      this.$set(this.editForm, 'phone', this.userData[index].phone);
      this.$set(this.editForm, 'email', this.userData[index].email);
      this.$set(this.editForm, 'role_id', this.userData[index].role_id);

      console.log(this.editForm);
    },
    showModal(index) {
      console.log(index);
      this.addForm = this.userData[index];
      this.addModal = true;
    },
    addSubmit() {
      this.$refs.addForm.validate((valid) => {
        console.log(valid);
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
            console.log(res);
            this.$Message.success('添加成功');
            window.location.reload();
          });
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    editSubmit() {
      this.$refs.editForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          accountModify(this.editForm).then((res) => {
            console.log(res);
            this.$Message.success('修改成功');
            window.location.reload();
          });
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    accountDel(bid) {
      accountDel({
        bids: [bid],
      }).then((res) => {
        console.log(res);
        this.$Message.success('账号删除成功');
        window.location.reload();
      });
    },
    multiDel() {
      if (this.selectBids.length > 0) {
        accountDel({
          bids: this.selectBids,
        }).then((res) => {
          console.log(res);
          this.$Message.success('批量删除成功');
          window.location.reload();
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
