<template>
  <div id="infos">
    <Breadcrumb separator="—">
      <BreadcrumbItem>{{ i18n.总控制台 }}</BreadcrumbItem>
      <BreadcrumbItem>{{ i18n.总体信息 }}</BreadcrumbItem>
    </Breadcrumb>
    <div
      :style="{
        height: '30px',
        width: '100%',
        zIndex: '13',
        position: 'fixed',
        top: '0px',
        background: '#F5F7F9',
      }"
    ></div>
    <Card
      class="col-card"
      :style="'margin: 20px auto;height:' + (150 / 1080) * screenHeight + 'px;'"
    >
      <Row>
        <Col span="4">
          <div
            class="top-col"
            :style="{
              backgroundImage:
                'url(' + require('../assets/img/账户余额@2x.png') + ')',
              height: (120 / 1080) * screenHeight + 'px',
              width: (220 / 1920) * screenWidth + 'px',
              paddingTop: (15 / 1080) * screenHeight + 'px',
            }"
            @click="$router.push('/business/businessModule/businessHome')"
          >
            <p
              class="col-p"
              :style="{
                fontSize: (16 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ i18n.账户余额 }}
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              ¥{{ overviewInf.balance }}
            </h2>
          </div>
        </Col>
        <Col span="4">
          <div
            class="top-col"
            :style="{
              backgroundImage:
                'url(' + require('../assets/img/子用户数量@2x.png') + ')',
              height: (120 / 1080) * screenHeight + 'px',
              width: (220 / 1920) * screenWidth + 'px',
              paddingTop: (15 / 1080) * screenHeight + 'px',
            }"
            @click="$router.push('/admin/user_management')"
          >
            <p
              class="col-p"
              :style="{
                fontSize: (16 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ i18n.子用户数量 }}
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ overviewInf.sub_user_count }}个
            </h2>
          </div>
        </Col>
        <Col span="4">
          <div
            class="top-col"
            :style="{
              backgroundImage:
                'url(' + require('../assets/img/当前任务数@2x.png') + ')',
              height: (120 / 1080) * screenHeight + 'px',
              width: (220 / 1920) * screenWidth + 'px',
              paddingTop: (15 / 1080) * screenHeight + 'px',
            }"
            @click="$router.push('/result/task')"
          >
            <p
              class="col-p"
              :style="{
                fontSize: (16 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ i18n.当前任务数 }}
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ overviewInf.job_count }}个
            </h2>
          </div>
        </Col>
        <Col span="4">
          <div
            class="top-col"
            :style="{
              backgroundImage:
                'url(' + require('../assets/img/当前服务器数@2x.png') + ')',
              height: (120 / 1080) * screenHeight + 'px',
              width: (220 / 1920) * screenWidth + 'px',
              paddingTop: (15 / 1080) * screenHeight + 'px',
            }"
            @click="$router.push('/result/server')"
          >
            <p
              class="col-p"
              :style="{
                fontSize: (16 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ i18n.当前服务器数 }}
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ overviewInf.machine_count }}个
            </h2>
          </div>
        </Col>
        <Col span="4">
          <div
            class="top-col"
            :style="{
              backgroundImage:
                'url(' + require('../assets/img/集群储存量@2x.png') + ')',
              height: (120 / 1080) * screenHeight + 'px',
              width: (220 / 1920) * screenWidth + 'px',
              paddingTop: (15 / 1080) * screenHeight + 'px',
            }"
            @click="$router.push('/admin/authority')"
          >
            <p
              class="col-p"
              :style="{
                fontSize: (16 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ i18n.集群当前存储用量 }}
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ overviewInf.nas_size ? overviewInf.nas_size : "***" }}
            </h2>
          </div>
        </Col>
        <Col span="4">
          <div
            class="top-col"
            :style="{
              backgroundImage:
                'url(' + require('../assets/img/套餐储存量@2x.png') + ')',
              height: (120 / 1080) * screenHeight + 'px',
              width: (220 / 1920) * screenWidth + 'px',
              paddingTop: (15 / 1080) * screenHeight + 'px',
            }"
            @click="$router.push('/admin/authority')"
          >
            <p
              class="col-p"
              :style="{
                fontSize: (16 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ i18n.套餐当前存储用量 }}
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ overviewInf.oss_count ? overviewInf.oss_count : "***" }}
            </h2>
          </div>
        </Col>
      </Row>
    </Card>
    <Row :gutter="16">
      <Col span="10">
        <Card
          class="col-card"
          :style="{ height: (300 / 1080) * screenHeight + 'px' }"
        >
          <h2 slot="title" class="Title">
            <span
              style="vertical-align: middle"
              @click="$router.push('/business/businessModule/bill/expense')"
              >{{ i18n.费用统计 }}</span
            >
            <RadioGroup
              v-model="timeChosen"
              type="button"
              style="
                float: right;
                display: inline-block;
                vertical-align: middle;
                margin-top: -7px;
              "
            >
              <Radio label="0">{{ i18n.今日 }}</Radio>
              <Radio label="1">{{ i18n.本周 }}</Radio>
              <Radio label="2">{{ i18n.本月 }}</Radio>
            </RadioGroup>
          </h2>
          <div
            id="myPie"
            ref="myPie"
            :style="{
              height: (400 / 1080) * screenHeight + 'px',
              width: (700 / 1080) * screenHeight + 'px',
              marginLeft: (40 / 1080) * screenHeight + 'px',
            }"
          ></div>
        </Card>
      </Col>
      <Col span="14">
        <Card
          class="col-card"
          :style="{
            height: (300 / 1080) * screenHeight + 'px',
            marginBottom: (30 / 1080) * screenHeight + 'px',
          }"
        >
          <h2 slot="title" class="Title">
            <span
              @click="$router.push('/business/businessModule/bill/expense')"
              >{{ i18n.消费变化 }}</span
            >

            <RadioGroup
              v-model="consumeTimeChosen"
              type="button"
              style="
                float: right;
                margin-right: 20px;
                position: relative;
                margin-top: -7px;
              "
            >
              <!-- <span
                @click="
                  open = false;
                  customize = false;
                "
                ><Radio label="今日">{{ i18n.今日 }}</Radio></span
              > -->
              <span
                @click="
                  open = false;
                  customize = false;
                "
                ><Radio label="本周">{{ i18n.本周 }}</Radio></span
              >
              <span
                @click="
                  open = false;
                  customize = false;
                "
                ><Radio label="本月">{{ i18n.本月 }}</Radio></span
              >
              <span
                ><Radio label="自定义">{{
                  i18n.自定义
                }}</Radio></span
              >
              <DatePicker
                :open="open"
                :value="timeLimit"
                format="yyyy.MM.dd"
                type="daterange"
                placement="bottom-start"
                confirm
                @on-change="handleChange"
                @on-clear="handleClear"
                @on-ok="handleOk"
                class="consumeDate"
                v-show="consumeTimeChosen == '自定义' && customize"
              >
              </DatePicker>
            </RadioGroup>
          </h2>
          <div
            id="consume-line"
            :style="{
              height: (300 / 1080) * screenHeight + 'px',
              width: '100%',
              marginTop: '-20px',
            }"
          ></div>
        </Card>
      </Col>
    </Row>

    <Row :gutter="16">
      <Col span="10">
        <Card
          :style="{
            height: (215 / 1080) * screenHeight + 'px',
            minHeight: '210px',
          }"
        >
          <h2 slot="title" class="Title">
            <span
              style="vertical-align: middle"
              @click="$router.push('/result/task')"
              >{{ i18n.任务概览 }}</span
            >
          </h2>
          <div
            id="taskTable"
            :style="{
              height: (215 / 1080) * screenHeight + 'px',
              width: '100%',
              marginTop: -(50 / 1080) * screenHeight + 'px',
              minHeight: '210px',
            }"
          ></div>
        </Card>
        <Card
          lass="col-card"
          :style="{
            height: (215 / 1080) * screenHeight + 'px',
            marginTop: (30 / 1080) * screenHeight + 'px',
            minHeight: '200px',
          }"
        >
          <h2 slot="title" class="Title">
            <span @click="$router.push('/result/server')">{{
              i18n.服务器概览
            }}</span>
            <DatePicker
              format="yyyy.MM.dd"
              type="daterange"
              placement="bottom-start"
              placeholder="Select date"
              style="font-size: 14px !important; float: right; margin-top: -5px"
              @on-change="machineFilter"
            ></DatePicker>
            <span class="datePickerTitle">{{ i18n.创建时间 }}:</span>
          </h2>

          <div
            id="myLine"
            ref="myLine"
            :style="{
              height: (215 / 1080) * screenHeight + 'px',
              width: '100%',
              marginTop: -(50 / 1080) * screenHeight + 'px',
              minHeight: '200px',
            }"
          ></div>
        </Card>
      </Col>
      <Col span="14">
        <Card
          class="col-card"
          :style="{
            height: (460 / 1080) * screenHeight + 'px',
            minHeight: '430px',
          }"
        >
          <h2
            slot="title"
            class="Title"
            @click="$router.push('/admin/user_management')"
          >
            {{ i18n.Job收藏夹 }}
          </h2>
          <Row>
            <Col span="24" style="text-align: center">
              <Table
                :columns="columns3"
                :data="tableData3"
                :style="{
                  height: (460 / 1080) * screenHeight - 110 + 'px',
                  margin: '10px 24px',
                  minHeight: '320px',
                }"
                class="subUserTable"
              >
              </Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { overview, fee, feeChange, Job, Jobs, Machine } from "@/api/info";
let echarts = require("echarts/lib/echarts");
export default {
  name: "Infos",
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      overviewInf: {
        balance: "",
        sub_user_count: "",
        job_count: "",
        machine_count: "",
        nas_size: "",
        oss_count: "",
      },
      feeInf: {
        machine: 0,
        network_flow: 0,
        store: 0,
      },
      feeChangeInf: [],
      jobInf: {
        fail_count: 0,
        pending_count: 0,
        success_count: 0,
        total: 0,
        working_count: 0,
      },
      machineInf: [],
      jobTimeFilter: {},
      machineTimeFilter: {},
      open: false,
      timeLimit: "",
      consumeTimeChosen: "本周",
      customize: false,
      timeChosen: "0",
      all_job: 0,
      all_user: 0,
      all_machine: 0,
      spend_time: 0,
      cost: 0,
      all_task: 0,
      machine_info_type: "一周",
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
          title: "任务ID",
          key: "id",
          sortable: true,
        },
        {
          title: "任务类型",
          key: "type",
          sortable: true,
        },
        {
          title: "用户名",
          key: "username",
        },
        {
          title: "子任务数",
          key: "all_task",
        },
        {
          title: "已完成",
          key: "finished_task",
        },
        {
          title: "排队",
          key: "pending_task",
        },
        {
          title: "计算",
          key: "working_task",
        },
        {
          title: "失败",
          key: "failed_task",
        },
        {
          title: "创建时间",
          key: "create_time",
        },
        {
          title: "费用",
          key: "cost",
          sortable: true,
        },
      ],
      data1: [],
      tableData1: [],
      columns2: [
        {
          title: "机器ID",
          key: "machine_id",
        },
        {
          title: "核数",
          key: "cpu_core",
        },

        {
          title: "内存",
          key: "memory",
        },
        {
          title: "显卡类型",
          key: "gpu",
        },
        {
          title: "任务类型",
          key: "job_type",
        },
        {
          title: "用户名称",
          key: "username",
        },
        {
          title: "CPU负载",
          key: "cpu_ratio",
        },
        {
          title: "创建时间",
          key: "create_time",
        },
      ],
      tableData2: [],
      columns3: [
        {
          title: "编号",
          key: "id",
          align: "center",
          width: 80,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.编号);
          },
        },
        {
          title: "名称",
          key: "job_name",
          width: 100,
          tooltip: true,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.名称);
          },
        },
        {
          title: "状态",
          key: "status",
          width: 80,
          align: "center",
          render: (h, params) => {
            let bgColor = "#2EC6A8";
            if (params.row.state == "1") bgColor = "#F0C249";
            else if (params.row.state == "-1") bgColor = "#F06149";
            return h("div", {
              style: {
                width: "14px",
                height: "14px",
                background: bgColor,
                borderRadius: "100%",
              },
            });
          },
        },

        {
          title: "创建时间",
          key: "create_time",
          align: "center",
          width: 185,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.创建时间);
          },
          render: (h, params) => {
            return this.$createElement(
              "div",
              {
                ref: "test",
                class: "test1",
              },
              [h("span", {}, params.row.create_time)]
            );
          },
        },
        {
          title: "运行时间",
          key: "spend_time",
          align: "center",
          width: 120,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.运行时间);
          },
        },
        {
          title: "费用",
          key: "cost",
          sortable: true,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.费用);
          },
          render: (h, params) => {
            let a = require("../assets/img/wenti_icon@2x.png");
            return h("div", [
              h(
                "span",
                {
                  props: {},
                  style: {
                    verticalAlign: "middle",
                  },
                },
                "¥" + params.row.cost.toFixed(2)
              ),
            ]);
          },
        },
      ],
      tableData3: [],
      columns4: [
        {
          title: "消耗",
          key: "cost",
        },
        {
          title: "一天",
          key: "day",
        },
        {
          title: "一周",
          key: "week",
        },
        {
          title: "一月",
          key: "mouth",
        },
      ],
      tableData4: [],
      tableData5: [],
    };
  },
  watch: {
    timeChosen(newval, oldval) {
      let begin, end;
      let date = new Date();
      console.log(newval);
      end =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      if (newval == 0) {
        begin =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
      } else if (newval == 1) {
        var date2 = new Date(date);
        date2.setDate(date.getDate() - 7);
        begin =
          date2.getFullYear() +
          "-" +
          (date2.getMonth() + 1) +
          "-" +
          date2.getDate();
      } else {
        let date2 = new Date(date);
        date2.setDate(date.getDate() - 30);
        begin =
          date2.getFullYear() +
          "-" +
          (date2.getMonth()+1) +
          "-" +
          date2.getDate();
      }
      this.getFee(begin, end);
    },
    consumeTimeChosen(newval, oldval) {
      let begin, end;
      let date = new Date();
      console.log(newval);
      end =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      if (newval == "今日") {
        begin =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate();
      } else if (newval == "本周") {
        var date2 = new Date(date);
        date2.setDate(date.getDate() - 7);
        begin =
          date2.getFullYear() +
          "-" +
          (date2.getMonth() + 1) +
          "-" +
          date2.getDate();
      } else if (newval == "本月") {
        let date2 = new Date(date);
        date2.setDate(date.getDate() - 30);
        begin =
          date2.getFullYear() +
          "-" +
          (date2.getMonth()+1) +
          "-" +
          date2.getDate();
      } else {
        this.customize = !this.customize;
        this.open = !this.open;
        return;
      }
      this.getFeeChange(begin, end);
    },
  },
  computed: {
    i18n() {
      return this.$t("index.Info");
    },
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        this.screenHeight = window.fullHeight; // 高
        this.screenWidth = window.fullWidth; // 宽
      })();
    };
    document
      .getElementsByClassName("ivu-input")[0]
      .addEventListener("blur", () => {
        this.open = false;
      });

    //总览信息
    overview()
      .then((res) => {
        this.overviewInf = res;
      })
      .catch((err) => {
        console.log(err);
      });

    //费用统计
    let date = new Date();
    var date2 = new Date(date);
    date2.setDate(date.getDate() - 7);
    this.getFee(
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );

    //消费变化
    this.getFeeChange(
      date2.getFullYear() +"-" +(date2.getMonth() + 1) +"-" +date2.getDate(),
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );

    //任务概览
    this.getJob();

    //服务器概览
    this.getMachine();

    //收藏任务列表
    Jobs({ star: 1 })
      .then((res) => {
        this.tableData3 = res.items;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleChange(date) {
      let start = date[0].split(".");
      let end = date[1].split(".");
      this.timeLimit = {
        start: start.join("-"),
        end: end.join("-"),
      };
    },
    handleClear() {
      this.open = false;
      this.customize = false;
    },
    handleOk() {
      this.open = false;
      this.customize = false;
      this.getFeeChange(this.timeLimit.start, this.timeLimit.end);
    },

    //费用统计数据获取函数
    getFee(start, end) {
      fee({
        start: start,
        end: end,
      })
        .then((res) => {
          this.feeInf = res;
          const myPie = this.$echarts.init(document.getElementById("myPie"));
          const option = {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            title: {
              text:
                "{a|¥" + this.feeInf.total + "}\n{b|" + this.i18n.已消费 + "}",
              left: "19%",
              top: "27%",
              textAlign: "center",
              textStyle: {
                rich: {
                  a: {
                    color: "#333333",
                    fontSize: (24 / 1080) * this.screenHeight,
                    fontWeight: 600,
                    align: "center",
                    width: "3%",
                  },
                  b: {
                    color: "#333333",
                    fontSize: (20 / 1080) * this.screenHeight,
                    align: "center",
                    width: "3%",
                  },
                },
              },
            },
            legend: {
              data: [this.i18n.计算, this.i18n.存储, this.i18n.流量],
              left: "45%",
              top: "11%",
              orient: "vertical",
              align: "left",
              itemHeight: (14 / 1080) * this.screenHeight,
              itemWidth: (14 / 1080) * this.screenHeight,
              itemGap: (32 / 1080) * this.screenHeight,
              icon: "circle",
              formatter: (name) => {
                var index = 0;
                var clientlabels = [
                  this.i18n.计算,
                  this.i18n.存储,
                  this.i18n.流量,
                ];
                var clientcounts = [
                  this.feeInf.machine,
                  this.feeInf.store,
                  this.feeInf.network_flow,
                ];
                clientlabels.forEach(function (value, i) {
                  if (value == name) {
                    index = i;
                  }
                });
                console.log("这里")
                console.log(clientcounts[index] /0)
                if((clientcounts[0] + clientcounts[1] + clientcounts[2]) == 0)
                  return (
                  "{a|" +
                  name +
                  "}     {b|" +
                  '0'+
                  "%}   {c|¥" +
                  clientcounts[index] +
                  "}"
                );
                return (
                  "{a|" +
                  name +
                  "}     {b|" +
                  (
                    (clientcounts[index] /
                      (clientcounts[0] + clientcounts[1] + clientcounts[2])) *
                    100
                  ).toFixed(2) +
                  "%}   {c|¥" +
                  clientcounts[index] +
                  "}"
                );
              },
              textStyle: {
                rich: {
                  a: {
                    fontSize: (24 / 1080) * this.screenHeight,
                    color: "#000000",
                    width: 70,
                  },
                  b: {
                    fontSize: (24 / 1080) * this.screenHeight,
                    color: "#999999",
                    width: 80,
                  },
                  c: {
                    fontSize: (24 / 1080) * this.screenHeight,
                    color: "#999999",
                    width: 70,
                  },
                },
              },
            },
            color: ["#47A2FF", "#50CCCB", "#9860E5", "#008BF4"],
            series: [
              {
                startAngle: 180,
                name: this.i18n.费用统计,
                type: "pie",
                radius: ["35%", "50%"],
                center: ["20%", "32.5%"],
                avoidLabelOverlap: true,
                label: {
                  show: false,
                },
                data: [
                  { value: this.feeInf.machine, name: this.i18n.计算 },
                  { value: this.feeInf.store, name: this.i18n.存储 },
                  { value: this.feeInf.network_flow, name: this.i18n.流量 },
                ],
              },
            ],
          };
          myPie.setOption(option, true);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFeeChange(start, end) {
      feeChange({ start: start, end: end })
        .then((res) => {
          this.feeChangeInf = res.items;
          let x = [];
          let y = [];
          this.feeChangeInf.forEach((item) => {
            x.push(item.date);
            y.push(item.fee);
          });

          const consumeLine = this.$echarts.init(
            document.getElementById("consume-line")
          );
          const consumeLineOption = {
            xAxis: {
              type: "category",
              data: x,
              splitLine: { show: false },
              axisTick: { show: false },
              axisLine: { show: false },
              boundaryGap: false,
            },
            yAxis: {
              type: "value",
              axisTick: { show: false },
              axisLine: { show: false },
              axisLabel: { formatter: "¥{value} " },
              splitLine: {
                lineStyle: {
                  color: "#F9FAFD",
                },
              },
              min: "dataMin", // 最小值
            },
            series: [
              {
                data: y,
                type: "line",
                smooth: true,
                symbol: "none",
                areaStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#5B68B6", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#FFFFFF", // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
            ],
            itemStyle: {
              color: "#7682C7",
            },
          };
          consumeLine.setOption(consumeLineOption, true);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getJob() {
      Job()
        .then((res) => {
          this.jobInf = res;
          const taskTable = this.$echarts.init(
            document.getElementById("taskTable")
          );
          const taskOption = {
            tooltip: {},
            legend: {
              data: [],
            },

            xAxis: {
              data: [
                this.i18n.总数,
                this.i18n.完成,
                this.i18n.排队,
                this.i18n.计算中,
                this.i18n.失败,
              ],
              axisTick: { show: false },
              axisLine: { show: false },
            },
            yAxis: {
              axisTick: { show: false },
              axisLine: { show: false },
              splitLine: {
                lineStyle: {
                  color: "#F9FAFD",
                },
              },
            },

            series: [
              {
                name: this.i18n.任务,
                type: "bar",
                barWidth: 24,
                data: [
                  this.jobInf.total,
                  this.jobInf.success_count,
                  this.jobInf.pending_count,
                  this.jobInf.working_count,
                  this.jobInf.fail_count,
                ],
                itemStyle: {
                  normal: {
                    color: function (params) {
                      var colorList = [
                        new echarts.graphic.LinearGradient(
                          0,
                          0,
                          0,
                          1,
                          [
                            {
                              offset: 0,
                              color: "#03B957", // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#92DD87", // 100% 处的颜色
                            },
                          ],
                          false
                        ),
                        new echarts.graphic.LinearGradient(
                          0,
                          0,
                          0,
                          1,
                          [
                            {
                              offset: 0,
                              color: "#3357FE", // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#2893F7", // 100% 处的颜色
                            },
                          ],
                          false
                        ),
                        new echarts.graphic.LinearGradient(
                          0,
                          0,
                          0,
                          1,
                          [
                            {
                              offset: 0,
                              color: "#64E8F9", // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#23999D", // 100% 处的颜色
                            },
                          ],
                          false
                        ),
                        new echarts.graphic.LinearGradient(
                          0,
                          0,
                          0,
                          1,
                          [
                            {
                              offset: 0,
                              color: "#FFB92C", // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#E98216", // 100% 处的颜色
                            },
                          ],
                          false
                        ),
                        new echarts.graphic.LinearGradient(
                          0,
                          0,
                          0,
                          1,
                          [
                            {
                              offset: 0,
                              color: "#D37F09", // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#A84804", // 100% 处的颜色
                            },
                          ],
                          false
                        ),
                      ];
                      return colorList[params.dataIndex];
                    },
                  },
                },
              },
            ],
          };
          taskTable.setOption(taskOption, true);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMachine(start, end) {
      Machine({
        start: start,
        end: end,
      })
        .then((res) => {
          let cpu = [];
          let gpu = [];
          let time = [];
          res.items.forEach((item) => {
            cpu.push(item.cpu);
            gpu.push(item.gpu);
            time.push(item.time);
          });
          this.machineInf = {
            cpu: cpu,
            gpu: gpu,
            time: time,
          };
          const myLine = this.$echarts.init(document.getElementById("myLine"));
          const lineOptions = {
            tooltip: {
              trigger: "axis",
              formatter(params) {
                const item = params;
                return `
                CPU：${item[0].data}
                GPU：${item[1].data}
               `;
              },
            },
            color: ["#2E5BFF", "#FD3C05"],
            xAxis: {
              type: "category",
              data: this.machineInf.time,
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
            },
            yAxis: {
              type: "value",
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              splitLine: { show: false },
            },
            series: [
              {
                name: "CPU",
                type: "line",
                data: this.machineInf.cpu,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: "#2E5BFF",
                    },
                  },
                },
              },
              {
                name: "GPU",
                type: "line",
                data: this.machineInf.gpu,
                itemStyle: {
                  normal: {
                    lineStyle: {
                      color: "#FD3C05",
                    },
                  },
                },
              },
            ],
          };
          myLine.setOption(lineOptions, true);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    machineFilter(date) {
      let start = date[0].split(".");
      let end = date[1].split(".");
      this.machineTimeFilter = {
        start: start.join("-"),
        end: end.join("-"),
      };
      this.getMachine(this.machineTimeFilter.start, this.machineTimeFilter.end);
    },
  },
};
</script>

<style scoped lang="scss">
#infos {
  margin: 20px;
  /deep/ .ivu-breadcrumb {
    position: fixed;
    top: 0;
    color: #333333;
    margin-left: 5px;
    z-index: 14;
    span:last-child {
      color: #13227a;
      font-weight: 700;
    }
  }

  .top-col {
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
    .col-p {
      text-align: left;
      color: #999999;
    }
    .col-h2 {
      text-align: left;
    }
  }

  .row-panel {
    margin: 10px 0;
    border: 0;
    background: #ffffff;
    box-shadow: 0px 0px 12px 2px #f8f8f8;
    border-radius: 10px;

    .col-card {
      &:hover {
        border: 1px solid #2e5bff;
      }

      .job-row {
        margin: 20px 0;
      }

      min-height: 400px;

      .machine-number {
        margin-top: 24px;
        color: #333333;
        font-size: 22px;
      }

      .machine-desc {
        font-size: 20px;
        color: #b4b4b4;
      }

      .machine-info {
        margin: 10px 0;
        padding-top: 15px;
        padding-left: 15px;
        background-size: 100% 100%;
        width: 100%;
        height: 120px;
        box-shadow: 5px 5px 5px #888888;
      }

      .page {
        margin-top: 10px;
        text-align: center;
        .ivu-page-next,
        .ivu-page-prev,
        .ivu-page-item {
          background-color: transparent;
          border: 1px solid #01203f;
          a {
            color: #ffffff;
          }
        }
        .ivu-page-item-active {
          background-color: #01203f;
        }
      }
    }
  }
  .Title {
    font-size: 18px;
    /deep/ .ivu-radio-group {
      border: 1px solid #e9e9e9;
      border-color: #e9e9e9;
      border-radius: 20px;
      box-sizing: border-box;
      .ivu-radio-wrapper {
        color: #666666;
        border: none;
        border-radius: 20px;
      }
      .ivu-radio-wrapper::before {
        display: none;
      }
      .ivu-radio-wrapper::after {
        display: none;
      }
      .ivu-radio-wrapper-checked {
        border-color: #13227a;
        background: #13227a;
        color: #ffffff;
        border-radius: 20px;
      }
    }
    .titleTooltip {
      margin-left: 5px;
      display: inline-block;
      vertical-align: middle;
      /deep/ .ivu-tooltip-light .ivu-tooltip-content {
        font-size: 12px !important;
        font-weight: 500;
      }
      /deep/ .ivu-tooltip-inner-with-width {
        text-align: left;
      }
    }
  }
  #myPie {
    position: absolute;
    top: -10px;
    left: -10px;
  }
}
.consumeDate {
  font-size: 14px !important;
  float: right;
  position: absolute;
  left: 30px;
  top: 35px;
}
.datePickerTitle {
  display: inline-block;
  font-size: 12px !important;
  float: right;
  height: 20.8px;
  line-height: 20.8px;
  color: #666666;
  padding-right: 5px;
}
.col-card {
  /deep/ .ivu-card-body {
    padding: 0;
    position: relative;
  }
}

/deep/ .ivu-table-cell div {
  display: inline-block;
}
</style>
