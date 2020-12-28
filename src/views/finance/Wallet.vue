<template>
<div>
<h2>钱包信息</h2>
  <p><strong>组织ID:</strong>{{info.organization_bid}}</p>
  <p><strong>账户余额:</strong>{{info.u_ballance}}</p>
  <p><strong>虚拟账户余额:</strong>{{info.v_ballance}}</p>
  <p><strong>储值卡余额:</strong>{{info.c_ballance}}</p>
<Button @click="modal = true">充值</Button>
  <Modal
      v-model="modal"
      @on-ok="handleSubmit('formCustom')"
      title="充值">
    <!--  :rules="ruleCustom"-->
    <Form ref="formCustom" :model="formCustom" :label-width="100">
      <FormItem label="订单金额" prop="amount">
        <Input type="text" v-model="formCustom.amount" ></Input>
      </FormItem>
      <FormItem label="kind" prop="kind">
        <Select v-model="formCustom.kind">
          <Option :value="1">账户余额</Option>
          <Option :value="2">储值卡</Option>
        </Select>
      </FormItem>
      <FormItem label="channel" prop="channel">
        <Select v-model="formCustom.channel">
          <Option :value="1">微信</Option>
          <Option :value="2">支付宝</Option>
          <Option :value="3">线下银行打款</Option>
        </Select>
      </FormItem>
      <Button long @click="recharge">提交</Button>
    </Form>
    <div v-if="showCode">
      <p>展示二维码图片</p>
      <div style="width: 100px;height:100px;background-color: #42b983"></div>
    </div>
  </Modal>
<!--  开票信息-->
  <div id="invoice">
    <Button @click="addModal = true">添加</Button>
    <Button>批量删除</Button>
    <Table ref="invoice_table" :columns="invoiceColumns" :data="invoiceData">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small"
                style="margin-right: 5px" @click="showDrawer(index)">编辑</Button>
      </template>
    </Table>
    <Page :total="100" style="text-align: center"/>
    <Drawer title="修改开票信息" :closable="false" v-model="ifShowDrawer">
      <Form ref="editForm" :model="editForm" :rules="editRule" label-position="top">
        <FormItem label="抬头" prop="title">
          <Input type="text" v-model="editForm.title" ></Input>
        </FormItem>
        <FormItem label="数量" prop="num">
          <Input type="number" v-model="editForm.num"></Input>
        </FormItem>
        <FormItem label="金额" prop="amount">
          <InputNumber :max="100000" :min="0" v-model="editForm.amount"></InputNumber>
          <!--      <Input type="number" v-model="addForm.num"></Input>-->
        </FormItem>
        <FormItem label="Express" prop="express">
          <Input type="text" v-model="editForm.express"></Input>
          <!--      <Input type="number" v-model="addForm.num"></Input>-->
        </FormItem>
        <FormItem label="Remark" prop="remark">
          <Input type="text" v-model="editForm.remark"></Input>
          <!--      <Input type="number" v-model="addForm.num"></Input>-->
        </FormItem>
      </Form>
      <Button long @click="editSubmit">确定</Button>

    </Drawer>
    <Modal
        v-model="addModal"
        @on-ok="handleSubmit('addForm')"
        title="添加">
      <Form ref="addForm" :model="addForm" :rules="addRule" label-position="top">
        <FormItem label="抬头" prop="title">
          <Input type="text" v-model="addForm.title" ></Input>
        </FormItem>
        <FormItem label="数量" prop="num">
          <InputNumber :max="1000" :min="0" v-model="addForm.num"></InputNumber>
          <!--      <Input type="number" v-model="addForm.num"></Input>-->
        </FormItem>
        <FormItem label="金额" prop="amount">
          <InputNumber :max="100000" :min="0" v-model="addForm.amount"></InputNumber>
          <!--      <Input type="number" v-model="addForm.num"></Input>-->
        </FormItem>
      </Form>
    </Modal>
  </div>
</div>
</template>

<script>
import {
  getInvoices, walletRecharge, addInvoices, modifyInvoices,
} from '@/api/finance';

export default {
  name: 'Wallet',
  data() {
    return {
      ifShowDrawer: false,
      invoiceColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        }, {
          title: 'Title',
          key: 'title',
        }, {
          title: 'Num',
          key: 'num',
        },
        {
          title: 'Amount',
          key: 'amount',
        },
        {
          title: 'Express',
          key: 'express',
        },
        {
          title: 'Remark',
          key: 'remark',
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center',
        },
      ],
      invoiceData: [],
      addModal: false,
      editModal: false,
      editForm: {
        title: '',
        num: 0,
        amount: 0,
        express: '',
        remark: '',
      },
      addForm: {
        title: '',
        num: 0,
        amount: 0,
      },

      editRule: {
        title: [
          { required: true, message: 'Title cannot be empty', trigger: 'blur' },
        ],
        num: [
          {
            required: true, type: 'number', message: 'Num cannot be empty', trigger: 'blur',
          },
        ],
        amount: [
          {
            required: true, type: 'number', message: 'Amount cannot be empty', trigger: 'blur',
          },
        ],
      },
      addRule: {
        title: [
          { required: true, message: 'Title cannot be empty', trigger: 'blur' },
        ],
        num: [
          {
            required: true, type: 'number', message: 'Num cannot be empty', trigger: 'blur',
          },
        ],
        amount: [
          {
            required: true, type: 'number', message: 'Amount cannot be empty', trigger: 'blur',
          },
        ],
      },
      modal: false,
      info: {},
      showCode: false,
      formCustom: {
        amount: 0,
        kind: 1,
        channel: 1,
      },
    };
  },
  created() {
    /*    walletInfo().then((res) => {
      console.log(res);
      this.info = res;
    }); */
    this.info = {
      organization_bid: '83814924712',
      u_ballance: 122,
      v_ballance: 100,
      c_ballance: 23,
    };
    getInvoices({
      page: 1,
      per_page: 10,
    }).then((res) => {
      console.log(res);
      this.invoiceData = res.items;
    });
  },
  methods: {
    handleSubmit(name) {
      console.log(name);
      addInvoices(this.addForm).then((res) => {
        console.log(res);
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    recharge() {
      walletRecharge(this.formCustom).then((res) => {
        console.log(res);
        if (res) {
          this.showCode = true;
        }
      });
    },
    editSubmit() {
      this.$refs.editForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          modifyInvoices(this.editForm).then((res) => {
            console.log(res);
            this.$Message.success('修改成功');
            // window.location.reload();
          });
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    showDrawer(index) {
      this.ifShowDrawer = true;
      this.$set(this.editForm, 'title', this.invoiceData[index].title);
      this.$set(this.editForm, 'num', this.invoiceData[index].num);
      this.$set(this.editForm, 'amount', this.invoiceData[index].amount);
      this.$set(this.editForm, 'express', this.invoiceData[index].express);
      this.$set(this.editForm, 'remark', this.invoiceData[index].remark);
      console.log(this.editForm);
    },
  },
};
</script>

<style scoped>

</style>
