<template>
  <div>
    <h1>
      关于任务 {{ this.id }} 的迭代统计信息，
      构型为 {{ this.$route.query.structure||'All' }}
      <Button
      size="large"
      type="primary"
      @click='go_statistics'>
        回到 statistics
      </Button>
    </h1>
    <div ref="chart_1"
      style="width:100%;height: 500px">
    </div>
    <Card>
      <h1 slot="title">构型信息</h1>
      <Button
        type="primary"
        @click="exportData0()"
        slot="extra">
        <Icon type="ios-download-outline"></Icon> Export data as csv
      </Button>
      <Table
        :columns="columns_sys_configs"
        :data="sys_configs_data"
        :loading='false'
        @on-row-click="go_iter"
        ref='table_sys_configs'
      ></Table>
    </Card>
    <br>
<!--    <Card>
      <h1 slot="title">测试误差信息</h1>
      <p>
        <router-link
          v-for="item in test_data"
          tag='a'
          :to="{ path: '/test_data', query:{element:element, structure:item[0] }}"
          :key="item[0]"
          target='_blank'
          style="padding-right:25px"
        >{{item[0]}}</router-link>
      </p>
    </Card>-->
    <Card>
      <h1 slot="title">迭代详情信息 </h1>
      <Button
        type="primary"
        @click="exportData1()"
        slot="extra"
      >
        <Icon type="ios-download-outline"></Icon> Export data as csv
      </Button>
      <Table
        :columns="columns_iter"
        :data="iter_data"
        :loading='false'
        @on-row-click="go_lcurve"
        ref='table_iter'
      ></Table>
    </Card>

  </div>
</template>

<script>
import {getIterData} from '../../../api/info';

export default {
  name: 'Iter',
  props: ['id'],
  data() {
    return {
      columns_iter: [
        {
          title: 'iter',
          key: 'iter',
          align: 'center',
          sortType: 'asc',
        },
        {
          title: 'energy_raw',
          key: 'energy_raw',
          align: 'center',
        }, {
          title: 'candidate',
          key: 'candidate',
          align: 'center',
        },
        {
          title: 'rest_accurate',
          key: 'rest_accurate',
          align: 'center',
        },
        {
          title: 'rest_failed',
          key: 'rest_failed',
          align: 'center',
        },
        {
          title: 'tatal',
          key: 'total',
          align: 'center',
        },
        {
          title: 'candidate_per',
          key: 'candidate_per',
          align: 'center',
        },
        {
          title: 'accurate_per',
          key: 'rest_accurate_per',
          align: 'center',
        },
        {
          title: 'failed_per',
          key: 'rest_failed_per',
          align: 'center',
        },
      ],
      columns_sys_configs: [
        {
          title: 'sys_configs',
          key: 'sys_configs',
          align: 'center',
        }, {
          title: 'energy_raw',
          key: 'energy_raw',
          align: 'center',
        },
        {
          title: 'candidate',
          key: 'candidate',
          align: 'center',
        },
        {
          title: 'rest_accurate',
          key: 'rest_accurate',
          align: 'center',
        },
        {
          title: 'rest_failed',
          key: 'rest_failed',
          align: 'center',
        },
        {
          title: 'tatal',
          key: 'total',
          align: 'center',
        },
        {
          title: 'candidate_per',
          key: 'candidate_per',
          align: 'center',
        },
        {
          title: 'accurate_per',
          key: 'rest_accurate_per',
          align: 'center',
        },
        {
          title: 'failed_per',
          key: 'rest_failed_per',
          align: 'center',
        },
      ],
      dic_per: {},
      iter_data: [],
      sys_configs_data: [],
      test_data: [],
      element: '',

    };
  },
  created() {
    console.log(this.$route.path);
    getIterData({ // 还可以直接把参数拼接在url后边
      job_id: this.id,
      sys_configs: this.$route.query.structure || '',
    }).then((res) => {
      console.log(res);
      this.iter_data = res.iter_data;
      for (const item of this.iter_data) {
        item.candidate_per = item.candidate_per.toFixed(4);
        item.rest_accurate_per = item.rest_accurate_per.toFixed(4);
        item.rest_failed_per = item.rest_failed_per.toFixed(4);
      }

      this.sys_configs_data = res.sys_configs_data;

      for (const item of this.sys_configs_data) {
        item.candidate_per = item.candidate_per.toFixed(4);
        item.rest_accurate_per = item.rest_accurate_per.toFixed(4);
        item.rest_failed_per = item.rest_failed_per.toFixed(4);
      }

      this.dic_per = res.dic_per;
      for (const index in this.dic_per.candidate_per) {
        this.dic_per.candidate_per[index] = this.dic_per.candidate_per[index].toFixed(4);
      }
      for (const index in this.dic_per.rest_accurate_per) {
        this.dic_per.rest_accurate_per[index] = this.dic_per.rest_accurate_per[index].toFixed(4);
      }
      for (const index in this.dic_per.rest_failed_per) {
        this.dic_per.rest_failed_per[index] = this.dic_per.rest_failed_per[index].toFixed(4);
      }
      console.log(this.dic_per);

      // this.test_data = res.data.result.test_data;
    }).catch((error) => {
      console.log(error);
    });
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.$router.go(0);
    },
    dic_per() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.chart_1);
      // 绘制图表
      const len = this.dic_per.candidate_per.length;
      myChart.setOption({
        title: { text: 'DP 综合统计信息' },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['candidate_per', 'accurate_per', 'failed_per'],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },

        xAxis: {
          name: 'iteration',
          nameLocation: 'middle',
          boundaryGap: false,
          data: Array.from(Array(len), (v, k) => k),
        },
        yAxis: { type: 'value', max: 1 },
        series: [{
          name: 'candidate_per',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: this.dic_per.candidate_per,
        }, {
          name: 'failed_per',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: this.dic_per.rest_failed_per,
        }, {
          name: 'accurate_per',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: this.dic_per.rest_accurate_per,
        }],
      });
    },
  },
  methods: {
    go_iter(data) {
      const routeUrl = this.$router.resolve({
        path: this.$route.path, query: { structure: data.sys_configs },
      });
      window.open(routeUrl.href, '_self');
    },
    go_lcurve(data) {
      const routeUrl = this.$router.resolve({ path: '/lcurve', query: { id: this.id, iter: data.iter } });
      window.open(routeUrl.href, '_blank');
    },
    go_statistics(data) {
      const routeUrl = this.$router.resolve({ path: this.$route.path });
      window.open(routeUrl.href, '_blank');
    },
    exportData1() {
      this.$refs.table_iter.exportCsv({
        filename: 'table_iter',
      });
    },
    exportData0() {
      this.$refs.table_sys_configs.exportCsv({
        filename: 'table_sys_configs.',
      });
    },
  },

};
</script>

<style scoped>

</style>
