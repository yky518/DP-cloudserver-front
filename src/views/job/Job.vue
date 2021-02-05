<template>
  <div id="job">
    <Row type="flex" justify="space-between" >
      <Col span="12">
        <Breadcrumb>
          <BreadcrumbItem>用户</BreadcrumbItem>
          <BreadcrumbItem :to="'/user/userinfo/'+this.$store.state.user.name">个人中心</BreadcrumbItem>
<!--          <BreadcrumbItem>{{data.root_job_id}}</BreadcrumbItem>-->
          <BreadcrumbItem>工作详情</BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Col span="2" style="text-align: right">
        <Icon type="md-refresh" color="#2E5BFF" class="icon-fresh" @click="refresh" />
      </Col>
    </Row>
    <Card class="card-panel">

      <Row :gutter="16" class="info-row">
        <Col span="12">
          <p>
            <img src="../../assets/img/任务名称.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    任务名称： {{ job_name }}
                  </span>

          </p>
        </Col>
      </Row>
      <Row :gutter="16" class="info-row">
        <Col span="8">
          <p>
            <img src="../../assets/img/工作编号.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    工作编号： {{data.root_job_id}}
                  </span>
          </p>
        </Col>
        <Col span="8">
          <p>
            <img src="../../assets/img/用户名.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    用户名： {{data.username}}
                  </span>

          </p>
        </Col>
        <Col span="8">
          <p>
            <img src="../../assets/img/任务类型2.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    任务类型： {{data.job_type}}
                  </span>

          </p>
        </Col>
      </Row>

      <Row :gutter="16" class="info-row">
        <Col span="8">
          <p>
            <img src="../../assets/img/运行时间.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    运行时间： {{parseTime(data.spend_time)}}
                  </span>

          </p>
        </Col>

        <Col span="8">
          <p>
            <img src="../../assets/img/总任务数2.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    子任务数： {{data.all_task}}
                  </span>

          </p>
        </Col>
        <Col span="8">
          <p>
            <img src="../../assets/img/失败任务数.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    失败任务数： {{data.failed_task}}
                  </span>

          </p>
        </Col>
        <Col span="8">
          <p>
            <img src="../../assets/img/完成任务数.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    完成任务数： {{data.finished_task}}
                  </span>

          </p>
        </Col>
        <Col span="8">
          <p>
            <img src="../../assets/img/排队任务数.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    排队任务数： {{data.pending_task}}
                  </span>

          </p>
        </Col>
        <Col span="8">
          <p>
            <img src="../../assets/img/正在运行.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    正在运行任务数： {{data.working_task}}
                  </span>

          </p>
        </Col>

        <Col span="8">
          <p>
            <img src="../../assets/img/任务名称.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    计算费用： {{ data.cost }}元
                  </span>

          </p>
        </Col>
      </Row>

      <Row :gutter="16" class="info-row">
        <Col span="12">
          <p>
            <img src="../../assets/img/创建时间.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    创建时间： {{data.create_time}}
                  </span>

          </p>
        </Col>
        <Col span="12">
          <p>
            <img src="../../assets/img/更新时间.png" alt="" class="info-icon">
            <span style="vertical-align: middle;font-size: 20px">
                    刷新时间： {{data.update_time}}
                  </span>

          </p>
        </Col>
      </Row>
    </Card>
    <div v-if="ifLog">
      <Card>
        <h3>日志信息</h3>
        <pre>
{{ logData }}
            </pre>
      </Card>

    </div>
    <Card class="card-panel">
      <h2>用户工作详情</h2>
      <RadioGroup v-model="status" @on-change="radioChange">
        <Radio label="全部"></Radio>
        <Radio label="排队"></Radio>
        <Radio label="计算中"></Radio>
        <Radio label="完成"></Radio>
        <Radio label="失败"></Radio>
      </RadioGroup>
      <Table :columns="taskColumns" :data="taskTable">
        <template slot-scope="{ row }" slot="log">
          <Button @click="showLog(row.log)">日志信息</Button>
        </template>
        <template slot-scope="{ row }" slot="status">
          {{ parseStatus(row) }}
        </template>
        <template slot-scope="{ row }" slot="result">
          <Button v-if="row.status === 0" type="primary" size="small"
                  @click="taskStop(row.task_id)">停止</Button>
          <div v-else-if="row.status === 1">
            <Button type="primary" size="small"
                    @click="taskStop(row.task_id)">停止</Button>
            <Button type="info" size="small" @click="toFtp(row.ip)">显示数据</Button>
          </div>
          <Button v-else-if="row.status === 2" type="primary" size="small"
                  :disabled="!row.result" @click="download(row)">下载</Button>
          <p v-else>Terminated</p>
        </template>

        <template slot-scope="{ row }" slot="input">
          <Button type="primary" size="small"
                  @click="downloadInput(row)">下载</Button>
        </template>
      </Table>
      <Page class="page" :current="page"
            :total="all_task" :page-size="10" @on-change="changePage" show-total/>
    </Card>
    <Card class="card-panel" v-if="showDpgen">
      <iter :id="this.$route.params.id"/>
    </Card>

  </div>
</template>

<script>

import Iter from '@/views/job/components/Iter.vue';
import { getStsToken } from '@/api/jobs';
import { getJobDetails, updateTaskOperation } from '@/api/info';

const OSS = require('ali-oss');
const FileSaver = require('file-saver');

export default {
  name: 'Task',
  data() {
    return {
      showDpgen: false,
      logData: '',
      page: 1,
      data: [],
      job_name: '',
      status: '全部',
      details: [],
      allList: [],
      all_task: 0,
      ifLog: false,
      taskColumns: [
        {
          title: '子任务id',
          key: 'task_id',
        },
        {
          title: 'log',
          key: 'log',
          slot: 'log',
        },
        {
          title: '状态',
          key: 'status',
          slot: 'status',
        },
        {
          title: '计算费用',
          key: 'cost',
        },
        {
          title: '创建时间',
          key: 'create_time',
        },
        {
          title: '输入参数',
          key: 'input_data',
          slot: 'input',
        },
        {
          title: '结果',
          key: 'result',
          slot: 'result',
          width: 180,
        },
      ],
      taskTable: [],
    };
  },
  created() {
    const params = {
      job_id: this.$route.params.id,
      page: 1,
    };
    getJobDetails(params).then((res) => {
      this.data = res.data;
      this.data.cost = this.data.cost.toFixed(2);
      if (this.data.job_type === 'dpgen') {
        this.showDpgen = true;
      }
      if (this.data.root_job_id) {
        this.details = res.details;
        this.allList = res.details;
        this.all_task = this.data.all_task;
        this.job_name = this.data.job_name;
        // eslint-disable-next-line no-plusplus
        for (const detail of this.details) {
          this.taskTable.push({
            task_id: detail.task_id,
            log: detail.log,
            cost: `${detail.cost.toFixed(2)}元`,
            create_time: detail.create_time,
            status: detail.status,
            input_data: detail.input_data,
            result: detail.result,
            ip: detail.ip,
          });
        }
      } else {
        alert(`当前任务id是${this.$route.params.id} 等待数据加载`);
      }
    }).catch((err) => {
      console.log(err);
    });
  },
  methods: {
    // eslint-disable-next-line camelcase
    taskStop(task_id) {
      const data = {
        task_id,
        operation: 'terminated',
      };
      updateTaskOperation(data).then((res) => {
        this.$Message.success('任务将在30秒后停止');
      }).catch((err) => {
        console.log(err);
      });
    },
    toFtp(ip) {
      window.open(`ftp://${ip}`);
    },
    changePage(page) {
      const params = {
        job_id: this.$route.params.id,
        page,
      };
      getJobDetails(params).then((res) => {
        if (this.data.root_job_id) {
          this.details = res.details;
          this.taskTable = [];
          // eslint-disable-next-line no-plusplus
          for (const detail of this.details) {
            this.taskTable.push({
              task_id: detail.task_id,
              log: detail.log,
              cost: `${detail.cost.toFixed(2)}元`,
              create_time: detail.create_time,
              status: detail.status,
              input_data: detail.input_data,
              result: detail.result,
              ip: detail.ip,
            });
          }
        } else {
          alert(`当前任务id是${this.$route.params.id} 等待数据加载`);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    download(row) {
      if (row.result) {
        console.log(row.result)
        getStsToken().then((res) => {
          const result = res;
          const client = new OSS({
            accessKeyId: result.AccessKeyId,
            accessKeySecret: result.AccessKeySecret,
            stsToken: result.SecurityToken,
            endpoint: 'oss-cn-shenzhen.aliyuncs.com',
            bucket: 'dpcloudserver',

          });
          const url = client.signatureUrl(row.result, { expires: 600 });
          console.log(url)
          // this.downloadFile(url);
          // this.downloadFile(url);
          // this.downloadFile(url);
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    downloadFile(url) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none'; // 防止影响页面
      iframe.style.height = 0; // 防止影响页面
      iframe.src = url;
      document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
      // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
      setTimeout(() => {
        iframe.remove();
      }, 5 * 60 * 1000);
    },
    downloadInput(row) {
      console.log(row.input_data);
      const blob = new Blob([JSON.stringify(row.input_data, null, 2)], { type: 'application/json' });

      FileSaver.saveAs(blob, 'input.json');
    },
    // eslint-disable-next-line consistent-return
    parseStatus(row) {
      // eslint-disable-next-line default-case
      switch (row.status) {
        case -1:
          return '失败';
        case 0:
          return '排队';
        case 1:
          return '计算中';
        case 2:
          return '完成';
      }
    },
    showLog(log) {
      if (log) {
        console.log(log);
        this.logData = JSON.stringify(log, null, 2);
        this.ifLog = true;
      } else {
        alert('日志为空');
      }
    },
    refresh() {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    },
    radioChange(value) {
      console.log(value);
      let status = 100;
      switch (value) {
        case '失败':
          status = -1;
          break;
        case '排队':
          status = 0;
          break;
        case '计算中':
          status = 1;
          break;
        case '完成':
          status = 2;
          break;
        case '全部':
          status = 100;
          break;
        default:
          status = 100;
      }
      this.page = 1;

      const params = {
        job_id: this.$route.params.id,
        page: this.page,
        status,
      };
      getJobDetails(params).then((res) => {
        if (this.data.root_job_id) {
          this.details = res.details;
          this.taskTable = [];
          // eslint-disable-next-line no-plusplus
          for (const detail of this.details) {
            this.taskTable.push({
              task_id: detail.task_id,
              log: detail.log,
              cost: `${detail.cost.toFixed(2)}元`,
              create_time: detail.create_time,
              status: detail.status,
              input_data: detail.input_data,
              result: detail.result,
              ip: detail.ip,
            });
          }
          console.log(this.taskTable);
        } else {
          alert(`当前任务id是${this.$route.params.id} 等待数据加载`);
        }
      }).catch((err) => {
        console.log(err);
      });

      this.all_task = this.details.length;
      this.taskTable = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < Math.min(4, this.all_task); i++) {
        this.taskTable.push({
          task_id: this.details[i].task_id,
          log: this.details[i].log,
          cost: `${this.details[i].cost.toFixed(2)}元`,
          create_time: this.details[i].create_time,
          status: this.details[i].status,
          input_data: this.details[i].input_data,
          result: this.details[i].result,
          ip: this.details[i].ip,
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
  },
  components: {
    Iter,
  },
};
</script>

<style scoped lang="scss">
  #job {

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

    .card-panel {
      margin: 10px 0;
      background-color: #ffffff;
      border: 0;
      color: #333333;

      .info-row .ivu-col {
        margin-top: 20px;

        .info-icon {
          width: 40px;
          vertical-align: middle
        }
      }

      /deep/ .ivu-page {
        text-align: center;
        margin-top: 20px;

        .ivu-page-next, .ivu-page-prev, .ivu-page-item {
          background-color: transparent;
          border: 1px solid #666666;

          a {
            color: #666666;
          }

        }

        .ivu-page-item-active {
          background-color: #2E5BFF;
          border: 1px solid #2E5BFF;

          a {
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
