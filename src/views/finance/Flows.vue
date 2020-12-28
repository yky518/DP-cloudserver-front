<template>
<div>
  <Table ref="flows_table" :columns="flowsColumns" :data="flowsData"></Table>
  <Page :total="100" style="text-align: center"/>
</div>
</template>

<script>
import { getFlows } from '@/api/finance';

export default {
  name: 'Flows',
  data() {
    return {
      flowsColumns: [{
        type: 'selection',
        width: 60,
        align: 'center',
      }, {
        title: 'ID',
        key: 'task_id',
      }, {
        title: '组织',
        key: 'organization_name',
      }, {
        title: 'kind',
        key: 'kind',
      }, {
        title: 'amount',
        key: 'amount',
      }, {
        title: '总金额',
        key: 'pay_amount',
      }, {
        title: 'discount',
        key: 'discount',
      }, {
        title: 'u_pay',
        key: 'u_pay',
      },
      {
        title: 'v_pay',
        key: 'v_pay',
      },
      {
        title: 'c_pay',
        key: 'c_pay',
      },
      {
        title: 'u_snapshot',
        key: 'u_snapshot',
      }, {
        title: 'v_snapshot',
        key: 'v_snapshot',
      }, {
        title: 'c_snapshot',
        key: 'c_snapshot',
      },
      {
        title: 'info',
        key: 'info',
      },
      {
        title: 'start_time',
        key: 'start_time',
      },

      ],
      flowsData: [],
      modal: false,
    };
  },
  created() {
    /*    getFlows({
      page: 1,
      per_page: 10,
    }).then((res) => {
      console.log(res);
      this.flowsData = res;
    }); */
    this.flowsData = [{
      task_id: '43325',
      organization_name: 'test2',
      kind: 1,
      amount: 543,
      pay_amount: 234,
      discount: 'sdgasg',
      u_pay: 2,
      v_pay: 3,
      c_pay: 2,
      u_snapshot: '32432',
      v_snapshot: '432',
      c_snapshot: '4325',
      info: 'dfasfa',
      start_time: '2020-10-1',
    }];
  },
};
</script>

<style scoped>

</style>
