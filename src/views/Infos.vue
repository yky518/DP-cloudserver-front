<template>
  <div id="infos">
    <Breadcrumb separator="-">
      <BreadcrumbItem>总体信息</BreadcrumbItem>
    </Breadcrumb>

    <Card class="col-card" style="margin: 20px auto;">
      <Row>
        <Col span="4">
          <div class="top-col"
               :style="{ 'backgroundImage':'url('+ require('../assets/img/账户余额@2x.png') +')'}">
            <p class="col-p">
              账户余额
            </p>
            <h2 class="col-h2">{{all_user}}</h2>
          </div>

        </Col>
        <Col span="4">
          <div  class="top-col"
                :style="{ 'backgroundImage':'url('+ require('../assets/img/子用户数量@2x.png') +')' }">
            <p class="col-p">
              子用户数量

            </p>
            <h2 class="col-h2">{{cost}}元</h2>

          </div>

        </Col>
        <Col span="4">
          <div  class="top-col"
                :style="{ 'backgroundImage':'url('+ require('../assets/img/当前任务数@2x.png') +')' }">
            <p class="col-p">
              当前任务数
            </p>
            <h2 class="col-h2">{{all_job}}</h2>
          </div>

        </Col>
        <Col span="4">
          <div  class="top-col"
                :style="{ 'backgroundImage':'url('+ require('../assets/img/当前服务器数@2x.png') +')' }">

            <p class="col-p">
              当前服务器数

            </p>
            <h2 class="col-h2">{{all_task}}</h2>
          </div>

        </Col>
        <Col span="4">
          <div  class="top-col"
                :style="{ 'backgroundImage':'url('+ require('../assets/img/集群储存量@2x.png') +')' }">

            <p class="col-p">
              集群当前存储用量
            </p>
            <h2 class="col-h2">{{all_task}}</h2>
          </div>

        </Col>
        <Col span="4">
          <div  class="top-col"
                :style="{ 'backgroundImage':'url('+ require('../assets/img/套餐储存量@2x.png') +')' }">

            <p class="col-p">
              套餐当前存储用量

            </p>
            <h2 class="col-h2">{{all_task}}</h2>
          </div>

        </Col>
      </Row>
    </Card>
    <Row :gutter="16">

      <Col span="10">
        <Card class="col-card">
          <h2 slot="title">
            费用统计
            <RadioGroup v-model="timeChosen" type="button" style="float: right">
              <Radio label="今日"></Radio>
              <Radio label="本周"></Radio>
              <Radio label="本月"></Radio>
            </RadioGroup>
          </h2>
          <div id="myPie" ref="myPie" :style="{ height: '300px',width: '360px'}"></div>
        </Card>

      </Col>
      <Col span="14">
        <Card class="col-card">
          <h2 slot="title">消费统计</h2>
          <div id="consume-line" :style="{ height: '300px',width: '360px'}"></div>
        </Card>

      </Col>
    </Row>

    <Card class="col-card">
      <h2 slot="title">机器统计</h2>
      <Row :gutter="16">
        <Col :span="10">
          <RadioGroup v-model="machine_info_type" type="button"
                      @on-change="machineTimeChange">
            <Radio label="一天"></Radio>
            <Radio label="一周"></Radio>
            <Radio label="一月"></Radio>
          </RadioGroup>
          <Row :gutter="16">
            <Col span="12">
              <div class="machine-info " :style="{backgroundImage:
                    'url('+ require('../assets/img/当前运行机器.png') + ')'}">
                <h3 class="machine-desc">当前机器数</h3>
                <p class="machine-number">{{ machine_count }}</p>
              </div>
            </Col>
            <Col span="12">
              <div class="machine-info" :style="{backgroundImage:
                    'url('+ require('../assets/img/CPU服务器.png') + ')'}">
                <h3 class="machine-desc">CPU服务器</h3>
                <p class="machine-number">{{cpu}}</p>
              </div>

            </Col>
            <Col span="12">
              <div class="machine-info" :style="{backgroundImage:
                    'url('+ require('../assets/img/GPU服务器.png') + ')'}">
                <h3 class="machine-desc">GPU服务器</h3>
                <p class="machine-number">{{gpu}}</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col :span="14">

        </Col>
      </Row>
      <Row>
        <Col span="24" style="text-align: center">
          <Table :columns="columns2" :data="tableData2">
          </Table>
          <Page class="page" :total="all_machine" :page-size="4" @on-change="changePage2"/>
        </Col>
      </Row>
    </Card>

    <Row :gutter="16">
      <Col span="10">
        <Card lass="col-card">
          <h2 slot="title">服务器概览</h2>
          <div id="myLine" ref="myLine" :style="{ height: '360px',width: '100%'}"></div>
        </Card>
      </Col>
      <Col span="14">
<!--        <Card class="col-card">
          <h2 slot="title">任务详情</h2>
          &lt;!&ndash;          @on-row-click="toUser"&ndash;&gt;

          <Table :columns="columns1" :data="tableData1">
            <template slot-scope="{ row }" slot="spend_time">
              {{parseTime(row.spend_time)}}
            </template>
          </Table>
          <Page class="page" :total="all_job" :page-size="4" @on-change="changePage1"/>
        </Card>-->
        <Card class="col-card">
          <h2 slot="title">用户统计</h2>
          <Table :columns="columns3" :data="tableData3">
          </Table>
          <Page class="page" :total="all_user" :page-size="4" @on-change="changePage3"/>

        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>

import { getJobSummary, getMachineSummary, getUserSummary } from '@/api/info';

export default {
  name: 'Infos',
  data() {
    return {
      timeChosen: '',
      all_job: 0,
      all_user: 0,
      all_machine: 0,
      spend_time: 0,
      cost: 0,
      all_task: 0,
      machine_info_type: '一周',
      cpu: 0,
      gpu: 0,
      machine_count: 0,
      machine_data: {
        machines_1_day: {},
        machines_7_day: {},
        machines_30_day: {},
      },
      columns1: [
        {
          title: '任务ID',
          key: 'id',
          sortable: true,
        },
        {
          title: '任务类型',
          key: 'type',
          sortable: true,
        },
        {
          title: '用户名',
          key: 'username',
        },
        {
          title: '子任务数',
          key: 'all_task',
        },
        {
          title: '已完成',
          key: 'finished_task',
        },
        {
          title: '排队',
          key: 'pending_task',
        },
        {
          title: '计算',
          key: 'working_task',
        },
        {
          title: '失败',
          key: 'failed_task',
        },
        {
          title: '创建时间',
          key: 'create_time',
        },
        {
          title: '费用',
          key: 'cost',
          sortable: true,
        },
      ],
      data1: [],
      tableData1: [],
      columns2: [
        {
          title: '机器ID',
          key: 'machine_id',
        },
        {
          title: '核数',
          key: 'cpu_core',
        },

        {
          title: '内存',
          key: 'memory',
        },
        {
          title: '显卡类型',
          key: 'gpu',
        },
        {
          title: '任务类型',
          key: 'job_type',
        },
        {
          title: '用户名称',
          key: 'username',
        },
        {
          title: 'CPU负载',
          key: 'cpu_ratio',
        },
        {
          title: '创建时间',
          key: 'create_time',
        },
      ],
      tableData2: [],
      columns3: [
        {
          title: '用户名',
          key: 'username',
        },
        {
          title: '任务数',
          key: 'all_job',
        },
        {
          title: '子任务数',
          key: 'all_task',
        },
        {
          title: '费用',
          key: 'cost',
        },
        {
          title: '最后提交时间',
          key: 'create_time',
          sortable: true,
        },
      ],
      tableData3: [],
      columns4: [
        {
          title: '消耗',
          key: 'cost',
        },
        {
          title: '一天',
          key: 'day',
        },
        {
          title: '一周',
          key: 'week',
        },
        {
          title: '一月',
          key: 'mouth',
        },
      ],
      tableData4: [],
    };
  },
  mounted() {
    console.log(document.getElementById('myChart'));
    // 任务
    getJobSummary().then((res) => {
      console.log(res);
      const { data } = res;
      const all = res.all_summary;
      this.all_job = all.all_job;
      this.spend_time = all.spend_time;
      this.cost = all.cost.toFixed(2);
      this.all_task = all.all_task;
      this.all_task = all.failed_task;
      this.finished_task = all.finished_task;
      this.pending_task = all.pending_task;
      this.working_task = all.working_task;
      const myPie = this.$echarts.init(document.getElementById('myPie'));
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        /* legend: {
          orient: 'vertical',
          icon: 'circle',
          right: 20,
          top: 110,
          data: ['完成', '排队', '计算中', '失败'],
        }, */
        color: ['#08B489', '#F8AD13', '#831ADF', '#008BF4'],
        series: [
          {
            startAngle: 180,
            name: '子任务数量',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['54%', '50%'],
            avoidLabelOverlap: true,
            label: {
              show: true,
              // position: 'center',
              formatter: '{b}: {c}\n({d}%)',
            },
            emphasis: {
              label: {
                show: true,
                // fontSize: '30',
                // fontWeight: 'bold',
              },
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: this.finished_task, name: '完成' },
              { value: this.pending_task, name: '排队' },
              { value: this.working_task, name: '计算中' },
              { value: this.failed_task, name: '失败' },

            ],
          },
        ],
      };
      myPie.setOption(option);

      const consumeLine = this.$echarts.init(document.getElementById('consume-line'));
      const consumeLineOption = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        }],
      };
      consumeLine.setOption(consumeLineOption);
      // Table1
      this.data1 = data;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 4; i++) {
        this.tableData1.push({
          id: data[i].job_id,
          type: data[i].job_type,
          username: data[i].username,
          all_task: data[i].all_task,
          finished_task: data[i].finished_task,
          pending_task: data[i].pending_task,
          working_task: data[i].working_task,
          failed_task: data[i].failed_task,
          create_time: data[i].create_time,
          cost: `${data[i].cost.toFixed(2)}元`,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
    // 机器
    getMachineSummary().then((data) => {
      this.all_machine = data.alive_machines.length;

      this.machine_data = {
        machines_1_day: data.machines_1_day,
        machines_7_day: data.machines_7_day,
        machines_30_day: data.machines_30_day,
      };
      this.machine_count = data.machines_7_day.count;
      this.cpu = data.machines_7_day.cpu;
      this.gpu = data.machines_7_day.gpu;

      console.log(this.machine_data);

      // Table2
      this.data2 = data.alive_machines;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < Math.min(4, this.all_machine); i++) {
        this.tableData2.push({
          machine_id: data.alive_machines[i].machine_id.substring(0, 6),
          cpu_core: data.alive_machines[i].cpu_core,
          memory: data.alive_machines[i].memory,
          gpu: data.alive_machines[i].gpu,
          job_type: data.alive_machines[i].job_type,
          username: data.alive_machines[i].username,
          cpu_ratio: data.alive_machines[i].cpu_ratio,
          create_time: data.alive_machines[i].create_time,

        });
      }
      console.log(data.history);
      const xData = [];
      const cpuData = [];
      const gpuData = [];
      // eslint-disable-next-line guard-for-in
      for (const key in data.history) {
        xData.push(key.split(' ')[1]);
        cpuData.push(data.history[key].cpu);
        gpuData.push(data.history[key].gpu);
      }
      console.log(this.tableData2);
      const myLine = this.$echarts.init(document.getElementById('myLine'));
      const lineOptions = {
        title: {
          text: '过去12小时',
          left: 30,
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            const item = params;
            console.log(item);
            return `
                CPU：${item[0].data}
                GPU：${item[1].data}
               `;
          },
        },
        legend: {
          data: ['CPU', 'GPU'],
          right: 100,
        },
        color: ['#FD3C05', '#2E5BFF'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          // show: false,
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: 'CPU',
            type: 'line',
            data: cpuData,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#FD3C05',
                },
              },
            },
          },
          {
            name: 'GPU',
            type: 'line',
            data: gpuData,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' },
              ],
            },
            itemStyle: {
              normal: {
                lineStyle: {
                  color: '#2E5BFF',
                },
              },
            },
          },
        ],
      };
      myLine.setOption(lineOptions);
    }).catch((err) => {
      console.log(err);
    });
    // 用户
    getUserSummary().then((data) => {
      console.log(data);
      this.all_user = data.length;

      // Table3
      this.data3 = data;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 4; i++) {
        this.tableData3.push({
          username: data[i].username,
          all_job: data[i].all_job,
          all_task: data[i].all_task,
          cost: `${data[i].cost.toFixed(2)}元`,
          create_time: data[i].create_time,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  },
  methods: {
    toJob(data) {
      console.log(data);
      this.$router.push(`/job/${data.id}`);
    },
    toMachine(data) {
      console.log(data);
      this.$router.push(`/machine/${data.machine_id}`);
    },
    toUser(data) {
      console.log(data);
      this.$router.push(`/user/${data.username}`);
    },
    changePage1(page) {
      console.log(page);
      this.tableData1 = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < Math.min(4, this.all_job - page * 4 + 4); i++) {
        this.$set(this.tableData1, i, {
          id: this.data1[page * 4 - 4 + i].job_id,
          type: this.data1[page * 4 - 4 + i].job_type,
          username: this.data1[page * 4 - 4 + i].username,
          all_task: this.data1[page * 4 - 4 + i].all_task,
          finished_task: this.data1[page * 4 - 4 + i].finished_task,
          pending_task: this.data1[page * 4 - 4 + i].pending_task,
          working_task: this.data1[page * 4 - 4 + i].working_task,
          failed_task: this.data1[page * 4 - 4 + i].failed_task,
          create_time: this.data1[page * 4 - 4 + i].create_time,
          cost: `${this.data1[page * 4 - 4 + i].cost.toFixed(2)}元`,
        });
      }
    },
    changePage2(page) {
      console.log(page);
      this.tableData2 = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < Math.min(4, this.all_machine - page * 4 + 4); i++) {
        this.$set(this.tableData2, i, {
          machine_id: this.data2[page * 4 - 4 + i].machine_id.substring(0, 6),
          cpu_core: this.data2[page * 4 - 4 + i].cpu_core,
          memory: this.data2[page * 4 - 4 + i].memory,
          gpu: this.data2[page * 4 - 4 + i].gpu,
          job_type: this.data2[page * 4 - 4 + i].job_type,
          username: this.data2[page * 4 - 4 + i].username,
          cpu_ratio: this.data2[page * 4 - 4 + i].cpu_ratio,
          create_time: this.data2[page * 4 - 4 + i].create_time,
        });
      }
    },
    changePage3(page) {
      console.log(page);
      this.tableData3 = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < Math.min(4, this.all_user - page * 4 + 4); i++) {
        this.$set(this.tableData3, i, {
          username: this.data3[page * 4 - 4 + i].username,
          all_job: this.data3[page * 4 - 4 + i].all_job,
          all_task: this.data3[page * 4 - 4 + i].all_task,
          cost: `${this.data3[page * 4 - 4 + i].cost.toFixed(2)}元`,
          create_time: this.data3[page * 4 - 4 + i].create_time,

        });
      }
    },
    parseTime(time) {
      console.log(time);
      let timeString = '';
      if (Math.floor(time / 86400) > 0) {
        timeString += `${Math.floor(time / 86400)}天`;
      }
      if (Math.floor((time % 86400) / 3600) > 0) {
        timeString += `${Math.floor((time % 86400) / 3600)}小时`;
      }
      if (Math.floor((time % 3600) / 60) > 0) {
        timeString += `${Math.floor((time % 3600) / 60)}分`;
      } else {
        timeString += `${Math.floor(time % 60)}秒`;
      }

      return timeString;
    },
    machineTimeChange(value) {
      console.log(value);
      if (value === '一天') {
        this.machine_count = this.machine_data.machines_1_day.count;
        this.cpu = this.machine_data.machines_1_day.cpu;
        this.gpu = this.machine_data.machines_1_day.gpu;
      } else if (value === '一周') {
        this.machine_count = this.machine_data.machines_7_day.count;
        this.cpu = this.machine_data.machines_7_day.cpu;
        this.gpu = this.machine_data.machines_7_day.gpu;
      } else if (value === '一月') {
        this.machine_count = this.machine_data.machines_30_day.count;
        this.cpu = this.machine_data.machines_30_day.cpu;
        this.gpu = this.machine_data.machines_30_day.gpu;
      }
    },
  },
};
</script>

<style scoped lang="scss">
#infos{
  margin: 20px;

  /deep/ .ivu-breadcrumb{
    color: #999999;
    font-size: 20px;
    span:last-child{
      color: #2E5BFF;
      font-weight: 700;
    }
  }

  .top-col{
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
    height: 4.5rem;
    width: 9rem;
    .col-p{
      text-align: right;
      font-size: 12px;
      color: #999999;
    }
    .col-h2{
      text-align: right;
      font-size: 16px;
    }
  }

  .row-panel {
    margin: 10px 0;
    border: 0;
    background: #FFFFFF;
    box-shadow: 0px 0px 12px 2px #F8F8F8;
    border-radius: 10px;

    .col-card{

      &:hover{
        border: 1px solid #2E5BFF;
      }

      .job-row{
        margin: 20px 0;
      }

      min-height: 400px;

      .machine-number{
        margin-top: 24px;
        color: #333333;
        font-size: 22px;
      }

      .machine-desc{
        font-size: 20px;
        color: #b4b4b4;
      }

      .machine-info{
        margin: 10px 0;
        padding-top: 15px;
        padding-left: 15px;
        background-size: 100% 100%;
        width:100%;
        height: 120px;
        box-shadow: 5px 5px 5px #888888;
      }

      .page{
        margin-top: 10px;
        text-align: center;
        .ivu-page-next, .ivu-page-prev, .ivu-page-item {
          background-color: transparent;
          border: 1px solid #01203f;
          a{
            color: #ffffff;
          }

        }
        .ivu-page-item-active{
          background-color: #01203f;
        }
      }

    }

  }

}

</style>
