<template>
  <div id="userinfo">
    <Row type="flex" justify="space-between" >
      <Col span="12">
        <Breadcrumb>
          <BreadcrumbItem>用户</BreadcrumbItem>
          <BreadcrumbItem>个人中心</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col span="2" style="text-align: right">
        <Icon type="md-refresh" color="#2E5BFF" class="icon-fresh" @click="refresh" />
      </Col>
    </Row>

    <div class="row-panel">
      <Row :gutter="16">
        <Col span="12">
          <Card class="col-card">
            <p>
              <img src="../assets/img/用户名.png" alt="" style="vertical-align: middle">
              <span style="vertical-align: middle;font-size: 20px">
                    用户名： {{data.username}}
                  </span>

            </p>
            <p>
              <img src="../assets/img/总任务数2.png" alt="" style="vertical-align: middle">
              <span style="vertical-align: middle;font-size: 20px">
                    子任务数： {{data.all_job}}
                  </span>
            </p>
            <p>
              <img src="../assets/img/任务类型2.png" alt="" style="vertical-align: middle">
              <span style="vertical-align: middle;font-size: 20px">
                    任务类型： {{ data.job_type }}
                  </span>
            </p>
            <p>
              <img src="../assets/img/运行时间.png" alt="" style="vertical-align: middle">
              <span style="vertical-align: middle;font-size: 20px">
                    运行时间： {{ parseTime(data.spend_time) }}
                  </span>
            </p>
            <p>
              <img src="../assets/img/创建时间.png" alt="" style="vertical-align: middle">
              <span style="vertical-align: middle;font-size: 20px">
                    创建时间： {{ data.create_time }}
                  </span>
            </p>
            <p>
              <img src="../assets/img/更新时间.png" alt="" style="vertical-align: middle">
              <span style="vertical-align: middle;font-size: 20px">
                    更新时间： {{ data.update_time }}
                  </span>
            </p>
          </Card>
        </Col>
        <Col span="12">
          <Card class="col-card">
            <div id="mybar" ref="mybar" :style="{ height: '300px',width: '500px'}"></div>
          </Card>
        </Col>
      </Row>
    </div>

    <Card class="card-panel">
      <Table :columns="jobColumns" :data="jobTable" @on-row-click="toJob">
      </Table>
      <Page class="page" :total="all_job" :page-size="4" @on-change="changePage"/>
    </Card>

    <Card class="card-panel">
      <Table :columns="machineColumns" :data="machineTable">
        <template slot="operation" slot-scope="{row}">
          <Button :disabled="row.operation === 'terminated'"
                  @click.stop="machineDel(row.task_id)">停止</Button>
        </template>
      </Table>
      <Page class="page" :total="all_machine" :page-size="4"
            @on-change="changeMachinePage" show-total/>
    </Card>

  </div>
</template>

<script>
import { getUserDetails, getAliveMachine, updateTaskOperation } from '@/api/info';

export default {
  name: 'UserInfo',
  data() {
    return {
      page: 1,
      data: [],
      details: [],
      all_job: 0,
      all_machine: 0,

      jobColumns: [
        {
          title: '任务id',
          key: 'job_id',
        },
        {
          title: '任务名称',
          key: 'job_name',
        },
        {
          title: '任务类型',
          key: 'job_type',
        },
        {
          title: '子任务数',
          key: 'all_task',
        },
        {
          title: '子任务完成率',
          key: 'rate',
        },
        {
          title: '计算费用',
          key: 'cost',
        },
      ],
      jobTable: [],
      machineColumns: [
        {
          title: '任务id',
          key: 'job_id',
        },
        {
          title: '子任务id',
          key: 'task_id',
        },
        {
          title: 'ip',
          key: 'ip',
        },
        {
          title: 'gpu',
          key: 'gpu',
        },
        {
          title: 'v_cpu',
          key: 'v_cpu',
        },
        {
          title: '机器类型',
          key: 'machine_type',
        },
        {
          title: 'memory',
          key: 'memory',
        },
        {
          title: 'operation',
          slot: 'operation',
        },
      ],
      machineData: [],
      machineTable: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    toJob(data) {
      this.$router.push(`/user/job/${data.job_id}`);
    },
    /*    parseRate(index){
      console.log(this.details[index].finished_task)
      return this.details[index].finished_task/this.details[index].all_task
    }, */
    changePage(page) {
      this.page = page;
      this.jobTable = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < Math.min(4, this.all_job - page * 4 + 4); i++) {
        this.$set(this.jobTable, i, {
          job_id: this.details[page * 4 - 4 + i].job_id,
          job_type: this.details[page * 4 - 4 + i].job_type,
          job_name: this.details[page * 4 - 4 + i].job_name,
          all_task: this.details[page * 4 - 4 + i].all_task,
          // eslint-disable-next-line no-mixed-operators
          rate: `${Math.floor(this.details[page * 4 - 4 + i].finished_task * 100 / this.details[page * 4 - 4 + i].all_task)}%`,
          spend_time: this.details[page * 4 - 4 + i].spend_time,
          cost: `${this.details[page * 4 - 4 + i].cost.toFixed(2)}元`,
        });
      }
    },
    // eslint-disable-next-line camelcase
    machineDel(task_id) {
      const data = {
        task_id,
        operation: 'terminated',
      };
      updateTaskOperation(data).then((res) => {
        this.$Modal.success({
          title: '停止成功',
          content: '机器将在30秒后关闭',
          onOk: () => {
            window.location.reload();
          },
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    changeMachinePage(page) {
      this.machinePage = page;
      this.machineTable = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < Math.min(4, this.all_machine - page * 4 + 4); i++) {
        this.machineTable.push(this.machineData[i]);
      }
    },
    getData() {
      getUserDetails().then((data) => {
        this.data = data.data;
        this.details = data.details;
        this.all_job = data.details.length;

        this.jobTable = [];

        const mybar = this.$echarts.init(document.getElementById('mybar'));
        const option = {
          xAxis: {
            type: 'category',
            data: [''],
          },
          yAxis: {
            type: 'value',
          },
          /*          tooltip: {
            trigger: 'item',
            formatter: '{a}: {c}',
          }, */
          legend: {
            /*          orient: 'vertical',
                      icon : 'circle',
                      right: 20,
                      top: 110, */
            data: ['总数', '完成', '排队', '计算中', '失败'],
          },
          label: {},
          color: ['#4CA21B', '#4F96E5', '#62E5F6', '#A84804', '#C0AB16'],
          series: [
            {
              name: '总数',
              data: [this.data.all_task],
              type: 'bar',
              label: {
                show: true,
                position: 'inside',
                formatter: '{a}: {c}',
              },

            },
            {
              name: '完成',
              data: [this.data.finished_task],
              type: 'bar',
              label: {
                show: true,
                position: 'inside',
                formatter: '{a}: {c}',
              },

            },
            {
              name: '排队',
              data: [this.data.pending_task],
              type: 'bar',
              label: {
                show: true,
                position: 'inside',
                formatter: '{a}: {c}',
              },

            },
            {
              name: '计算中',
              data: [this.data.working_task],
              type: 'bar',
              label: {
                show: true,
                position: 'inside',
                formatter: '{a}: {c}',
              },
            },
            {
              name: '失败',
              data: [this.data.failed_task],
              type: 'bar',
              label: {
                show: true,
                position: 'inside',
                formatter: '{a}: {c}',
              },

            },

            /*          itemStyle: {
                        normal: {
                          //这里是重点
                          color: function(params) {
                            //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                            var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae'];
                            return colorList[params.dataIndex]
                          }
                        }
                      } */
          ],
        };

        mybar.setOption(option);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < Math.min(4, this.all_job); i++) {
          this.jobTable.push({
            job_id: this.details[i].job_id,
            job_type: this.details[i].job_type,
            job_name: this.details[i].job_name,
            all_task: this.details[i].all_task,
            // eslint-disable-next-line no-mixed-operators
            rate: `${Math.floor(this.details[i].finished_task * 100 / this.details[i].all_task)}%`,
            cost: `${this.details[i].cost.toFixed(2)}元`,
          });
        }
      }).catch((err) => {
        console.log(err);
      });

      getAliveMachine().then((res) => {
        this.machineData = res.alive_machine;
        this.all_machine = this.machineData.length;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < Math.min(4, this.all_machine); i++) {
          this.machineTable.push(this.machineData[i]);
        }
      });
    },
    refresh() {
      window.location.reload();
    },
    parseTime(time) {
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
  },
};
</script>

<style scoped lang="scss">

  #userinfo{
    .icon-fresh{
      font-size: 20px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
    }

    /deep/ .ivu-breadcrumb {
      color: #333333;
      font-size: 20px;

      span:last-child {
        color: #2E5BFF;
        font-weight: 700;
      }
    }

    .row-panel {
      margin: 10px 0;
      border: 0;

      .col-card {

        p{
          margin:10px 0;
        }

        height: 400px;

        h3 {
          color: #333333;
        }

      }

    }
    .page{
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

</style>
