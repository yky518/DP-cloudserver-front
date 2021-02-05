<template>
  <div id="log">
    <div>
      JobInfo: JobID:{{ logInf.job.job_id }}; JobName:{{ logInf.job.job_name }};
      JobType:{{ logInf.job.job_type }}; UserName:{{ logInf.job.username }}
    </div>
    <div>
      TaskInfo: TaskID:{{ logInf.task.task_id }};States:{{
        logInf.task.states
      }};IP:{{ logInf.task.ip }}
    </div>
    <Input
      type="textarea"
      :row="(screenHeight-30) / 22"
      v-model="log"
      :autosize="{ minRows: (screenHeight-30) / 22, maxRows: (screenHeight-50) / 22 }"
      style="margin-top: 12px;"
    >
    </Input>
    <Spin fix v-if="loading" class="spin">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>加载中</div>
    </Spin>
  </div>
</template>
<script>
import { getJobDetails } from "@/api/info";
export default {
  data() {
    return {
      logInf: {},
      log: "",
      loading: true,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
    };
  },
  mounted() {
    this.logInf = JSON.parse(this.$route.query.logInf);
    console.log(this.logInf);
    // document.getElementsByTagName("textarea")[0].readOnly = "true";
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        this.screenHeight = window.fullHeight; // 高
        this.screenWidth = window.fullWidth; // 宽
      })();
    };
    const params = {
      job_id: this.logInf.job.job_id,
      page: 1,
    };
    getJobDetails(params).then((res) => {
      let list = res.details;
      list.forEach((item) => {
        if (item.task_id == this.logInf.task.task_id) {
          let logs = "";
          item.log.log.forEach((item1) => {
            logs += item1;
            if (item1[item1.length - 1] != "\n") logs += "\n";
          });
          this.log = logs;
          this.loading = false;
          return;
        }
      });
    });
  },
  methods: {},
};
</script>
<style lang="scss" scope>
html,
body,
#main {
  width: 100%;
  height: 100%;
}
#log {
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  position: relative;
  /deep/ .ivu-input-wrapper {
    margin: 5px !important;
  }
}
.spin {
  position: absolute;
  top: 0;
  bottom: 0;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>