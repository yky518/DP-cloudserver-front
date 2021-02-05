<template>
<div>
  <Table ref="invoice_table" :columns="invoiceColumns" :data="tradesData"></Table>
  <Page :total="100" style="text-align: center"/>
</div>
</template>

<script>
import { getTrades } from '@/api/finance';

export default {
  name: 'Trades',
  data() {
    return {
      invoiceColumns: [{
        type: 'selection',
        width: 60,
        align: 'center',
      }, {
        title: 'ID',
        key: 'out_order_id',
      }, {
        title: '组织',
        key: 'organization_name',
      }, {
        title: 'creator',
        key: 'creator',
      }, {
        title: 'channel',
        key: 'channel',
      }, {
        title: '交易ID',
        key: 'transaction_id',
      }, {
        title: '总量',
        key: 'pay_amount',
      }, {
        title: 'info',
        key: 'info',
      },
      {
        title: 'status',
        key: 'status',
      },
      ],
      tradesData: [],
      modal: false,
    };
  },
  created() {
    getTrades({
      page: 1,
      per_page: 10,
    }).then((res) => {
      this.tradesData = res;
    });
    /* this.tradesData = [
        {
      out_order_id: '49375',
      organization_name: 'test',
      creator: 'test',
      channel: '1',
      transaction_id: '2352',
      pay_amount: 324,
      info: 'dfsaf',
      status: 1,
    },
    {
      out_order_id: '43325',
      organization_name: 'test2',
      creator: 'test2',
      channel: '1',
      transaction_id: '4551',
      pay_amount: 234,
      info: 'sdgasg',
      status: 2,
    }]; */
  },
};
</script>

<style scoped>

</style>
