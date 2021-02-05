<template>
  <div>
    <Card>
      <h1>关于{{ job_id }}的iteration为 {{ iteration }} 的误差统计信息</h1>
      <Spin
        size="large"
        fix
        v-if="spin0"
      ><h1>加载中 稍等一下</h1> </Spin>
      <Collapse v-model="value_collapse">
        <div
          v-for="(item, index) in lcurve_data"
          :key="index"
        >
          <Panel :name='index.toString()'>

            {{index }}的误差信息
            <div slot="content">
              <h2> 关于{{ job_id }}的iteration为 {{ iteration }}, dir_path为{{ index }}的误差信息</h2>
              <div
                :ref='"chart_"+index'
                :id='"chart_"+index'
                :style='"width:"+ screenwidth * 0.9 +"px;height:376px"'
              ></div>
              <Table
                :columns="columns_lcurve_data"
                :data='item.lcurve_out'
                :loading='false'
              ></Table>
            </div>
          </Panel>
        </div>
      </Collapse>
    </Card>
  </div>
</template>

<script>

import { getLcurveData } from '@/api/jobs';

export default {
  name: 'Lcurve',
  created() {
    getLcurveData({
      job_id: this.$route.query.id,
      iter: this.$route.query.iter,
    }).then((res) => {
      console.log(res);
      this.lcurve_data = res.lcurve_data;
    }).catch((error) => {
      console.log(error);
    });
  },
  mounted() {
  },
  data() {
    return {
      columns_lcurve_data: [
        {
          title: 'index',
          key: 'batch',
          align: 'center',
        },
        {
          title: 'l2_tst',
          key: 'l2_tst',
          align: 'center',
        }, {
          title: 'l2_trn',
          key: 'l2_trn',
          align: 'center',
        },
        {
          title: 'l2_e_tst',
          key: 'l2_e_tst',
          align: 'center',
        },
        {
          title: 'l2_e_trn',
          key: 'l2_e_trn',
          align: 'center',
        },
        {
          title: 'l2_f_tst',
          key: 'l2_f_tst',
          align: 'center',
        },
        {
          title: 'l2_f_trn',
          key: 'l2_f_trn',
          align: 'center',
        },
        {
          title: 'lr',
          key: 'lr',
          align: 'center',
        },
      ],
      job_id: this.$route.query.job_id,
      iteration: this.$route.query.iter,
      lcurve_data: {},
      value_collapse: '',
      screenwidth: document.body.clientWidth,
      spin0: true,
    };
  },
  watch: {
    lcurve_data() {
      this.$nextTick(function () {
        this.drawLine();
        this.spin0 = false;
      });
    },
    // console.log(this.$refs)
  },
  methods: {
    drawLine() {
      // eslint-disable-next-line guard-for-in
      for (const i in this.lcurve_data) {
        const chartname = `chart_${i}`;
        // 基于准备好的dom，初始化echarts实例
        const myChart = this.$echarts.init(document.getElementById(chartname));
        // 绘制图表
        myChart.setOption({
          title: { text: '误差曲线' },
          xAxis: {
            data: this.lcurve_data[i].lcurve_out.map((x) => x.batch),
          },
          legend: {
            data: ['l2_tst', 'l2_trn', 'l2_e_tst', 'l2_e_trn', 'l2_f_tst',
              'l2_f_trn', 'lr'],
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          yAxis: {},
          series: [{
            name: 'l2_tst',
            type: 'line',
            data: this.lcurve_data[i].lcurve_out.map((x) => Math.log10(x.l2_tst)),
          }, {
            name: 'l2_trn',
            type: 'line',
            data: this.lcurve_data[i].lcurve_out.map((x) => Math.log10(x.l2_trn)),
          }, {
            name: 'l2_e_tst',
            type: 'line',
            data: this.lcurve_data[i].lcurve_out.map((x) => Math.log10(x.l2_e_tst)),
          }, {
            name: 'l2_f_tst',
            type: 'line',
            data: this.lcurve_data[i].lcurve_out.map((x) => Math.log10(x.l2_f_tst)),
          }, {
            name: 'l2_f_trn',
            type: 'line',
            data: this.lcurve_data[i].lcurve_out.map((x) => Math.log10(x.l2_f_trn)),
          }, {
            name: 'lr',
            type: 'line',
            data: this.lcurve_data[i].lcurve_out.map((x) => Math.log10(x.lr)),
          }],
        });
      }
    },

    test(data) {
      console.log(data);
      this.$router.push('http://www.baidu.com');
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
