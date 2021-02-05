<template>
  <div id="infos">
    <Breadcrumb separator="—">
      <BreadcrumbItem>总控制台</BreadcrumbItem>
      <BreadcrumbItem>总体信息</BreadcrumbItem>
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
              账户余额
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              ¥{{ all_user }}
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
              子用户数量
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              ¥{{ cost }}
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
              当前任务数
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ all_job }}
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
              当前服务器数
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ all_task }}
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
              集群当前存储用量
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ all_task }}
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
              套餐当前存储用量
            </p>
            <h2
              class="col-h2"
              :style="{
                fontSize: (20 / 1080) * screenHeight + 'px',
                marginLeft: (50 / 1080) * screenWidth + 'px',
              }"
            >
              {{ all_task }}
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
            <span style="vertical-align: middle" @click="$router.push('/business/businessModule/bill/expense')">费用统计</span>
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
              <Radio label="今日"></Radio>
              <Radio label="本周"></Radio>
              <Radio label="本月"></Radio>
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
            <span @click="$router.push('/business/businessModule/bill/expense')">消费变化</span>

            <RadioGroup
              v-model="consumeTimeChosen"
              type="button"
              style="
                float: right;
                margin-right: 20px;
                position: relative;
                margin-top: -7px;
              "
              @on-change="handleClick"
            >
              <span
                @click="
                  open = false;
                  customize = false;
                "
                ><Radio label="今日"></Radio
              ></span>
              <span
                @click="
                  open = false;
                  customize = false;
                "
                ><Radio label="本周"></Radio
              ></span>
              <span
                @click="
                  open = false;
                  customize = false;
                "
                ><Radio label="本月"></Radio
              ></span>
              <span
                ><Radio label="自定义" @click.native.stop="handleClick"></Radio
              ></span>
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
            <span style="vertical-align: middle" @click="$router.push('/result/task')">任务概览</span>
            <Tooltip
              content="创建时间在区间中的任务的状态"
              placement="right"
              theme="light"
              max-width="80"
              class="titleTooltip"
            >
              <img
                src="../assets/img/shuoming_icon@2x.png"
                alt=""
                style="width: 16px"
              />
            </Tooltip>
            <DatePicker
              format="yyyy.MM.dd"
              type="daterange"
              placement="bottom-start"
              placeholder="Select date"
              style="font-size: 14px !important; float: right; margin-top: -5px"
            ></DatePicker>
            <span class="datePickerTitle">创建时间:</span>
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
            <span @click="$router.push('/result/server')">服务器概览</span>
            <DatePicker
              format="yyyy.MM.dd"
              type="daterange"
              placement="bottom-start"
              placeholder="Select date"
              style="font-size: 14px !important; float: right; margin-top: -5px"
            ></DatePicker>
            <span class="datePickerTitle">创建时间:</span>
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
          <h2 slot="title" class="Title" @click="$router.push('/admin/user_management')">子用户统计</h2>
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
              >
              </Table>
              <Page
                class="page"
                :total="all_user"
                :page-size="6"
                @on-change="changePage3"
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getJobSummary, getMachineSummary, getUserSummary } from "@/api/info";
let echarts = require("echarts/lib/echarts");
export default {
  name: "Infos",
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      open: false,
      timeLimit: "",
      consumeTimeChosen: "今日",
      customize: false,
      timeChosen: "今日",
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
          title: "用户名",
          key: "username",
        },
        {
          title: "总任务数",
          key: "all_task",
        },
        {
          title: "未完成任务数",
          key: "working_task",
        },
        {
          title: "最后提交时间",
          key: "create_time",
          sortable: true,
          minWidth: 80,
        },
        {
          title: "费用",
          key: "cost",
          renderHeader: (h, params) => {
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
                "费用"
              ),
              h(
                "Tooltip",
                {
                  props: {
                    placement: "top",
                    transfer: true,
                    theme:"light"
                  },
                  style: {
                    width: "16px",
                    height: "16px",
                    verticalAlign: "middle",
                    display: "inline-block",
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "16px",
                      height: "16px",
                    },
                    domProps: {
                      src: a,
                    },
                  }),
                  h(
                    "div",
                    {
                      slot: "content",
                      style: {
                        whiteSpace: "normal",
                        fontSize:"12px",
                      },
                    },
                    "创建该子用户以来的所有费用"
                  ),
                ]
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

    // 任务
    getJobSummary()
      .then((res) => {
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

        this.tableData5.push({
          all_task: all.all_task,
          finished_task: all.finished_task,
          pending_task: all.pending_task,
          working_task: all.working_task,
          failed_task: all.failed_task,
        });

        const taskTable = this.$echarts.init(
          document.getElementById("taskTable")
        );
        const taskOption = {
          tooltip: {},
          legend: {
            data: [],
          },

          xAxis: {
            data: ["总数", "完成", "排队", "计算中", "失败"],
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
              name: "任务",
              type: "bar",
              barWidth: 24,
              data: [
                all.all_task,
                all.finished_task,
                all.pending_task,
                all.working_task,
                all.failed_task,
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
        taskTable.setOption(taskOption);

        const myPie = this.$echarts.init(document.getElementById("myPie"));
        const option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          title: {
            text:
              "{a|¥" +
              (
                this.finished_task +
                this.pending_task +
                this.working_task
              ).toFixed(2) +
              "}\n{b|已消费}",
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
            data: ["计算", "存储", "流量"],
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
              var clientlabels = ["计算", "存储", "流量"];
              var clientcounts = [
                this.finished_task,
                this.pending_task,
                this.working_task,
              ];
              clientlabels.forEach(function (value, i) {
                if (value == name) {
                  index = i;
                }
              });
              return (
                "{a|" +
                name +
                "}     {b|" +
                (
                  (clientcounts[index] /
                    (clientcounts[0] + clientcounts[1] + clientcounts[2])) *
                  100
                ).toFixed(2) +
                "%}      {c|¥" +
                clientcounts[index] +
                "}"
              );
            },
            textStyle: {
              rich: {
                a: {
                  fontSize: (24 / 1080) * this.screenHeight,
                  color: "#000000",
                },
                b: {
                  fontSize: (24 / 1080) * this.screenHeight,
                  color: "#999999",
                  width: "80%",
                },
                c: {
                  fontSize: (24 / 1080) * this.screenHeight,
                  color: "#999999",
                  width: "10%",
                },
              },
            },
          },
          color: ["#47A2FF", "#50CCCB", "#9860E5", "#008BF4"],
          series: [
            {
              startAngle: 180,
              name: "费用统计",
              type: "pie",
              radius: ["35%", "50%"],
              center: ["20%", "32.5%"],
              avoidLabelOverlap: true,
              label: {
                show: false,
              },
              data: [
                { value: this.finished_task, name: "计算" },
                { value: this.pending_task, name: "存储" },
                { value: this.working_task, name: "流量" },
              ],
            },
          ],
        };
        myPie.setOption(option);

        const consumeLine = this.$echarts.init(
          document.getElementById("consume-line")
        );
        const consumeLineOption = {
          xAxis: {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            splitLine: { show: false },
            axisTick: { show: false },
            axisLine: { show: false },
            boundaryGap: false,
          },
          yAxis: {
            type: "value",
            axisTick: { show: false },
            axisLine: { show: false },
            splitLine: {
              lineStyle: {
                color: "#F9FAFD",
              },
            },
            min: "dataMin", // 最小值
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
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
        consumeLine.setOption(consumeLineOption);
        this.data1 = data;
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
            cost: `¥${data[i].cost.toFixed(2)}`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // 机器
    getMachineSummary()
      .then((data) => {
        this.all_machine = data.alive_machines.length;

        this.machine_data = {
          machines_1_day: data.machines_1_day,
          machines_7_day: data.machines_7_day,
          machines_30_day: data.machines_30_day,
        };
        this.machine_count = data.machines_7_day.count;
        this.cpu = data.machines_7_day.cpu;
        this.gpu = data.machines_7_day.gpu;
        this.data2 = data.alive_machines;
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
        const xData = [];
        const cpuData = [];
        const gpuData = [];
        for (const key in data.history) {
          xData.push(key.split(" ")[1]);
          cpuData.push(data.history[key].cpu);
          gpuData.push(data.history[key].gpu);
        }
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
            data: xData,
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
              data: cpuData,
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
              data: gpuData,
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
        myLine.setOption(lineOptions);
      })
      .catch((err) => {
        console.log(err);
      });
    // 用户
    getUserSummary()
      .then((data) => {
        this.all_user = data.length;
        this.data3 = data;
        for (let i = 0; i < 6; i++) {
          this.tableData3.push({
            username: data[i].username,
            all_task: data[i].all_task,
            working_task:data[i].working_task,
            cost: `¥${data[i].cost.toFixed(2)}`,
            create_time: data[i].create_time,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    changePage1(page) {
      this.tableData1 = [];
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
          cost: `¥${this.data1[page * 4 - 4 + i].cost.toFixed(2)}`,
        });
      }
    },
    changePage2(page) {
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
      this.tableData3 = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < Math.min(6, this.all_user - page * 6 + 6); i++) {
        this.$set(this.tableData3, i, {
          username: this.data3[page * 6 - 6 + i].username,
          all_task: this.data3[page * 6 - 6 + i].all_task,
          working_task: this.data3[page * 6 - 6 + i].working_task,
          cost: `¥${this.data3[page * 6 - 6 + i].cost.toFixed(2)}`,
          create_time: this.data3[page * 6 - 6 + i].create_time,
        });
      }
    },
    parseTime(time) {
      let timeString = "";
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
      if (value === "一天") {
        this.machine_count = this.machine_data.machines_1_day.count;
        this.cpu = this.machine_data.machines_1_day.cpu;
        this.gpu = this.machine_data.machines_1_day.gpu;
      } else if (value === "一周") {
        this.machine_count = this.machine_data.machines_7_day.count;
        this.cpu = this.machine_data.machines_7_day.cpu;
        this.gpu = this.machine_data.machines_7_day.gpu;
      } else if (value === "一月") {
        this.machine_count = this.machine_data.machines_30_day.count;
        this.cpu = this.machine_data.machines_30_day.cpu;
        this.gpu = this.machine_data.machines_30_day.gpu;
      }
    },
    handleClick(e) {
      if (this.consumeTimeChosen == "自定义") {
        this.consumeTimeChosen = "自定义";
        if (e.target?.tagName === "INPUT") return;
        this.customize = !this.customize;
        this.open = !this.open;
      }
    },
    handleChange(date) {
      this.timeLimit = date;
    },
    handleClear() {
      this.open = false;
      this.customize = false;
    },
    handleOk() {
      this.open = false;
      this.customize = false;
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
      display: inline-block;
      vertical-align: middle;
      /deep/ .ivu-tooltip-light .ivu-tooltip-content {
        font-size: 12px !important;
        font-weight: 500;
      }
      /deep/ .ivu-tooltip-inner-with-width{
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
</style>
