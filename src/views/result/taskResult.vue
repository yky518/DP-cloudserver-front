<template>
  <div>
    <Modal
      v-model="showModal"
      class="editModal"
      >
      <template slot="header"></template>
      <Machine type="lammps" @set="setMachine"></Machine>
      <template slot="footer">
        <Button class="cancelBtn" @click.native="cancel()">{{i18n.取消}}</Button>
        <Button class="confirmBtn" @click.native="confirm()">{{i18n.确定}}</Button>
      </template>
    </Modal>
    <Breadcrumb :style="{marginLeft:30/1080*screenHeight+'px',marginTop:'5px'}"  separator="-">
      <BreadcrumbItem>{{i18n.结果总览}}</BreadcrumbItem>
      <BreadcrumbItem>{{i18n.任务总览}}</BreadcrumbItem>
    </Breadcrumb>
    <Card class="col-card" ref="jobCard" :style="'height:'+590/1080*screenHeight+'px;margin:'+30/1080*screenHeight+'px;margin-top:0;'">
      <h2 slot="title" class="Title">
        <span class="tableTitle">{{i18n.Job概览}}</span>
        <div style="float:right;font-size: 12px;vertical-align: middle;margin-top:9px;padding:0 5px;" @click="refreshJob()">
          <img src="../../assets/img/shuaxin_icon@2x.png" alt="" style="height:14px;float:left;">
          <div style="height:14px;line-height:14px;float:left"></div>
        </div>
        <Form inline label-position="left" :model="searchData" class="searchForm">
          <FormItem FormItem :label="i18n.任务类型+':'" prop="type" :style="{width: 110/1080*screenWidth+'px'}">
            <Select v-model="searchData.type" style="width: 80px">
              <Option
                v-for="item in jobType"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </FormItem>
          <FormItem :label="i18n.创建时间+':'" prop="date" :style="{width: 85/1080*screenWidth+'px',verticalAlign: 'middle'}">
            <DatePicker
              v-model="searchData.date"
              format="yyyy.MM.dd"
              type="daterange"
              placement="bottom-start"
              placeholder="Select date"
              style="width: 15px;margin-top:8px;"
              :open="open"
              confirm
              @on-ok="open = false"
              @on-clear="open = false"
            >
            <img src="../../assets/img/rili_icon@2x.png" alt="" style="width:16px;" @click="open = true">
            </DatePicker>
          </FormItem>
          <FormItem :label="i18n.编号范围" prop="range" :style="{width: 155/1080*screenWidth+'px'}">
            <Input
              type="number"
              :placeholder="i18n.起点"
              v-model="searchData.range.begin"
              style="width: 60px"
              class="searchFormItem"
            ></Input>
            —
            <Input
              type="number"
              :placeholder="i18n.终点"
              v-model="searchData.range.end"
              style="width: 60px"
              class="searchFormItem"
            ></Input>
          </FormItem>
          <FormItem prop="search" :style="{width: 100/1080*screenWidth+'px'}">
            <Input
              type="text"
              :placeholder="i18n.输入编号名称类型以搜索"
              v-model="searchData.search"
              class="searchFormItem"
            ></Input>
          </FormItem>
          <FormItem prop="search">
            <Button
              type="primary"
              style="background: #13227a; border-radius: 20px;"
              @click.native="searchTask()"
              class="searchFormBtn"
              >{{i18n.任务搜索}}</Button
            >
          </FormItem>
        </Form>
        <RadioGroup v-model="jobChosen" type="button" style="float: right;font-size:14px;font-weight:500;margin-top:1px;" size="small">
          <Radio label="100">{{i18n.全部}}({{ allJobNum }})</Radio>
          <Radio label="2">{{i18n.完成}}({{ finishedJobNum }})</Radio>
          <Radio label="1">{{i18n.运行}}({{ workingJobNum }})</Radio>
        </RadioGroup>
      </h2>
      <Table
        :columns="job"
        :data="jobList"
        ref="jobTable"
        @on-selection-change="jobIsSelect"
        @on-row-click="showTask"
        :row-class-name="jobRowClassName"
        :height="530/1080*screenHeight"
        highlight-row
        :no-data-text="defaultUrl(jobUrlType)"
        :loading="jobLoading"
      >
        <template slot-scope="{ row, index }" slot="top"> 
          <img :src="getJobTop(index, 'zhiding')" style="width: 18px; height: 18px" @click="isJobTop( row, index )">
        </template>
        <template slot="subTask" slot-scope="{ row, index }">
          <div class="subTask">
            <div class="subTaskState">
              <span class="success">{{row.finished_task}}</span>/
              <span class="fail">{{row.failed_task}}</span>/
              <span class="run">{{row.working_task}}</span>/
              <span class="wait">{{row.pending_task}}</span>
              <span class="allSubTask"> ({{row.all_task}})</span>
            </div>
          </div>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="text"
            size="small"
            style="margin-right: 5px; color: #13227a"
            :disabled="$refs.jobTable.objData[index]._isDisabled"
            @click.native="edit(row,index)"
            ><Tooltip :content="i18n.编辑">
              <img :src="getJobUrl(index, 'bianji')" style="width: 18px; height: 18px"></img></Tooltip></Button>
          <Button
            type="text"
            size="small"
            style="margin-right: 5px; color: #13227a"
            :disabled="$refs.jobTable.objData[index]._isDisabled"
            @click="deleteJob(row, index)"
            ><Tooltip :content="i18n.删除"><img
              :src="getJobUrl(index, 'shanchu')"
              alt=""
              style="width: 18px; height: 18px"
            /></Tooltip></Button>
          <Button
            type="text"
            size="small"
            style="margin-right: 5px; color: #13227a"
            :disabled="$refs.jobTable.objData[index]._isDisabled"
            ><Tooltip :content="i18n.下载"><img
              :src="getJobUrl(index, 'xiazai')"
              alt=""
              style="width: 18px; height: 18px"
            /></Tooltip></Button>
        </template>
        <div slot="footer" :style="'height:'+48/1080*screenHeight+'px;'" class="footer">
          <Checkbox
            style="display: inline-block"
            @on-change="selectAllJob"
            v-model="jobIsAllSelectd"
            >{{i18n.全选}}</Checkbox
          >
          <div style="display: inline-block; float: right">
            {{i18n.共选中}}{{ jobChosenNum }}{{i18n.条}}
            <Button
                  class="footerBtn Del"
                  :disabled="!jobIsSelectd"
                  @click.native="deleteAllJob()"
                  ><img src="../../assets/img/shanchuIconDel.png" style="width:16px;">{{i18n.删除}}</Button
                >
                <Button
                  class="footerBtn"
                  :disabled="!jobIsSelectd"
                  ><img src="../../assets/img/xiazaiIconWhite.png" style="width:16px;">{{i18n.下载}}</Button
                >
          </div>
        </div>
      </Table>
    </Card>

    <Row :gutter="16">
      <Col span="10">
        <Card class="col-card" :style="'height:'+421/1080*screenHeight+'px;margin-left:'+30/1080*screenHeight+'px;'">
          <h2 slot="title" class="Title">
            <span class="tableTitle">{{i18n.Task概览}}</span>
            <div style="float:right;font-size: 12px;margin-top:9px;padding:0 5px;" @click="refreshTask()">
              <img src="../../assets/img/shuaxin_icon@2x.png" alt="" style="height:14px;float:left;">
              <div style="height:14px;line-height:14px;float:left"></div>
            </div>
            <RadioGroup v-model="taskChosen" type="button" style="float: right;font-size:14px;font-weight:500;margin-top:1px;" size="small" @on-change="taskListFilter">
              <Radio label="">{{i18n.全部}}({{ allTaskNum }})</Radio>
              <Radio label="2">{{i18n.完成}}({{ finishedTaskNum }})</Radio>
              <Radio label="1">{{i18n.运行}}({{ workingTaskNum }})</Radio>
              <Radio label="-1">{{i18n.失败}}({{ failedTaskNum }})</Radio>
            </RadioGroup>
          </h2>
          <Table
            :columns="task"
            :data="taskList"
            ref="taskTable"
            highlight-row
            @on-selection-change="taskIsSelect"
            @on-row-click="showLog"
            :row-class-name="taskRowClassName"
            :height="351/1080*screenHeight"
            :no-data-text="defaultUrl(taskUrlType)"
            :loading="taskLoading"
          >
            <template slot-scope="{ row, index }" slot="top"> 
              <img :src="getTaskTop(index, 'zhiding')" style="width: 18px; height: 18px" @click="isTaskTop(row,index)">
            </template>
            <template slot-scope="{ row, index }" slot="input">
              <Button
                size="small"
                style="
                  background: #b1b4ca;
                  color: #ffffff;
                  border-radius: 20px;
                "
                :disabled="$refs.taskTable.objData[index]._isDisabled&&!row.result"
                @click="download(row)"
                >{{i18n.下载}}</Button
              >
            </template>
            <template slot-scope="{ row, index }" slot="output">
              <Button
                size="small"
                style="
                  background: #b1b4ca;
                  color: #ffffff;
                  border-radius: 20px;
                "
                :disabled="$refs.taskTable.objData[index]._isDisabled"
                @click="downloadInput(row)">{{i18n.下载}}</Button
              >
            </template>

            <div slot="footer" class="footer">
              <Checkbox
                style="display: inline-block;margin-left:5px"
                @on-change="selectAllTask"
                v-model="taskIsAllSelectd"
                >{{i18n.全选}}</Checkbox
              >
              <div style="display: inline-block; float: right;font-size:12px;width:370px;" 
            class="taskFooterBtn">
                {{i18n.共选中}}{{ taskChosenNum }}{{i18n.条}},总计费￥{{taskChosenCost}}元
                <Button
                class="footerBtn Del"
                  size="small"
                  :disabled="!taskIsSelectd"
                  @click.native="deleteAllTask()"
                  ><img src="../../assets/img/shanchuIconDel.png" style="width:12px;">{{i18n.删除}}</Button
                >
                <Button  class="footerBtn"
                  size="small"
                  :disabled="!taskIsSelectd"
                  ><img src="../../assets/img/xiazaiIconWhite.png" style="width:12px;">{{i18n.输入}}</Button
                >
                <Button
                  class="footerBtn"
                  size="small"
                  :disabled="!taskIsSelectd"
                  ><img src="../../assets/img/xiazaiIconWhite.png" style="width:12px;">{{i18n.输出}}</Button
                >
              </div>
            </div>
          </Table>
        </Card>
      </Col>
      <Col span="14">
        <Card class="col-card" :style="'height:'+421/1080*screenHeight+'px;margin-right:'+30/1080*screenHeight+'px;'" ref="log">
          <h2 slot="title" class="Title">
            <span class="tableTitle">{{i18n.日志信息}}</span>
            <Icon :type="logFullScreen?'md-contract':'md-qr-scanner'" style="margin-top:5px;" @click.native="fullScreen()"/>
            <span style="font-size:12px;" @click="fullScreen()">{{!logFullScreen?i18n.全屏:i18n.缩小}}</span>
          <a
            style="
              float: right;
              margin-top:10px;
              font-size:12px;
              vertical-align: middle;
              margin-right:20px;
            "
            @click="log()"
            >{{i18n.在新标签页中展示日志信息}}</a
          >
          </h2>
          <Input
            type="textarea"
            v-model="journal"
            :row="(410/1080*screenHeight-100)/27"
            :autosize="{ minRows: (410/1080*screenHeight)/27, maxRows: (410/1080*screenHeight)/27 }"
            style="padding:12px"
          ></Input>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getJobDetails, getUserDetails } from "@/api/info";
import { getStsToken } from "@/api/jobs";
import Machine from "@/components/Machine.vue";
const OSS = require("ali-oss");
const FileSaver = require("file-saver");
export default {
  components: {
    Machine,
  },
  data() {
    return {
      open: false,
      editIndex: -1,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      showModal: false,
      logFullScreen:false,

      jobPage: 1,
      jobLoading: true,
      jobChosen: "100",
      jobChosenNum: 0,
      jobChosenCost: "0.00",
      jobIsSelectd: false,
      jobIsAllSelectd: false,
      allJobNum: 0,
      finishedJobNum: 0,
      workingJobNum: 0,
      selectJob: 0,
      hasSelectJobs: [],
      hasDeleteJobs: [],
      jobUrlType: 1,

      taskLoading: false,
      taskPage: 1,
      taskChosen: "",
      taskChosenNum: 0,
      taskChosenCost: "0.00",
      taskIsSelectd: false,
      taskIsAllSelectd: false,
      allTaskNum: 0,
      finishedTaskNum: 0,
      workingTaskNum: 0,
      failedTaskNum: 0,
      hasSelectTasks: [],
      taskUrlType: 1,

      machine: {
        platform: "ali",
        resources: {
          gpu_type: "",
          cpu_num: 16,
          mem_limit: 32,
          time_limit: "23:00:00",
          docker_name: "deepmd-kit",
          type: "",
          region: "",
          zone: "",
          image_name: "fep-beta-v8",
          version: "1.2",
        },
      },

      searchData: {
        type: "FEP",
        date: [],
        range: {
          begin: "",
          end: "",
        },
        username: "",
        search: "",
      },
      jobType: [
        {
          value: "FEP",
          label: "FEP",
        },
        {
          value: "fep",
          label: "fep",
        },
      ],
      usernameList: [
        {
          value: "Ding",
          label: "Ding",
        },
        {
          value: "Kai",
          label: "Kai",
        },
      ],
      logInf:{
        log:'',
        task:''
      },
      jobList: [],
      job: [
        {
          type: "selection",
          align: "center",
          width: 35,
        },
        {
          title: " ",
          align: "center",
          width: 40,
          slot: "top",
        },
        {
          title: "编号",
          key: "job_id",
          sortable: true,
          align: "center",
          width: 50,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.编号);
          },
        },
        {
          title: "名称",
          key: "all_task",
          width:60,
          tooltip:true,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.名称);
          },
        },

        {
          title: "用户",
          key: "username",
          width:50,
          tooltip:true,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.用户);
          },
        },
        {
          title: "类型",
          key: "job_type",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.类型);
          },
        },
        {
          title: "状态",
          key: "state",
          width: 50,
          align:"center",
          render: (h, params) => {
            let bgColor = "#2EC6A8";
            // if (params.row.state == "running") bgColor = "#F0C249";
            // else if (params.row.state == "ending") bgColor = "#F06149";
            return h("div", {
              style: {
                width: "14px",
                height: "14px",
                marginLeft:"10px",
                background: bgColor,
                borderRadius: "100%",
              },
            });
          },
          renderHeader: (h, params) => {
            let a = require("../../assets/img/wenti_icon@2x.png");
            return h("div", [
              h(
                "span",
                {
                  style: {
                    verticalAlign: "middle",
                  },
                },
                this.i18n.状态
              ),
              h(
                "Tooltip",
                {
                  props: {
                    placement: "bottom",
                    theme: "light",
                    transfer: true,
                  },
                  style: {
                    width: "16px",
                    height: "16px",
                    verticalAlign: "middle",
                    display: "inline-block",
                    marginLeft:"5px"
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
                        color: "#333333",
                        fontSize: "12px",
                      },
                    },
                    [
                      h("div", { style: { textAlign: "center" } }, [
                        h(
                          "span",
                          {
                            style: {
                              color: "#2EC6A8",
                            },
                          },
                          this.i18n.成功
                        ),
                        "/",
                        h(
                          "span",
                          {
                            style: {
                              color: "#F06149",
                            },
                          },
                          this.i18n.失败
                        ),
                        "/",
                        h(
                          "span",
                          {
                            style: {
                              color: "#F0C249",
                            },
                          },
                          this.i18n.运行
                        ),
                        "/",
                        h(
                          "span",
                          {
                            style: {
                              color: "#999999",
                            },
                          },
                          this.i18n.等待
                        ),
                      ]),
                    ]
                  ),
                ]
              ),
            ]);
          },
        },
        {
          title: "子任务数",
          slot: "subTask",
          align: "center",
          width: 130,
          renderHeader: (h, params) => {
            let a = require("../../assets/img/wenti_icon@2x.png");
            return h("div", [
              h(
                "span",
                {
                  style: {
                    verticalAlign: "middle",
                  },
                },
                this.i18n.子任务数
              ),
              h(
                "Tooltip",
                {
                  props: {
                    placement: "top",
                    theme: "light",
                    transfer: true,
                  },
                  style: {
                    width: "16px",
                    height: "16px",
                    verticalAlign: "middle",
                    display: "inline-block",
                    marginLeft:"5px"
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
                        color: "#333333",
                        fontSize: "12px",
                      },
                    },
                    [
                      h(
                        "div",
                        { style: { textAlign: "center" } },
                        this.i18n.总子任务数
                      ),
                      h("div", { style: { textAlign: "center" } }, [
                        h(
                          "span",
                          {
                            style: {
                              color: "#2EC6A8",
                            },
                          },
                          this.i18n.成功
                        ),
                        "/",
                        h(
                          "span",
                          {
                            style: {
                              color: "#F06149",
                            },
                          },
                          this.i18n.失败
                        ),
                        "/",
                        h(
                          "span",
                          {
                            style: {
                              color: "#F0C249",
                            },
                          },
                          this.i18n.运行
                        ),
                        "/",
                        h(
                          "span",
                          {
                            style: {
                              color: "#999999",
                            },
                          },
                          this.i18n.等待
                        ),
                      ]),
                    ]
                  ),
                ]
              ),
            ]);
          },
        },
        {
          title: "创建时间",
          key: "create_time",
          sortable: true,
          align: "center",
          width: 135,
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
          sortable: true,
          align: "center",
          width:120,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.运行时间);
          },
          render: (h, params) => {
            let hour = 0;
            let minute = 0;
            let second = 0;
            hour = Number.parseInt(params.row.spend_time / 3600);
            minute = Number.parseInt(
              (params.row.spend_time - hour * 3600) / 60
            );
            second = Number.parseInt(
              params.row.spend_time - hour * 3600 - minute * 60
            );
            return h("div", {style:{
              textAlign:"center",
              width:'120px',
            }}, hour + ":" + minute + ":" + second);
          },
        },
        {
          title: "费用",
          key: "cost",
          sortable: true,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.费用);
          },
          render: (h, params) => {
            let a = require("../../assets/img/wenti_icon@2x.png");
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
              )
            ]);
          },
        },
        {
          title: "备注",
          slot: "remarks",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.备注);
          },
          render: (h, params) => {
            let text = params.row.remarks;
            let toolText = text;
            let a = (85 / 1536) * this.screenWidth;
            if (!params.row.remarks) {
              text = "添加备注信息";
              toolText = "";
            }
            if (this.editIndex != params.index) {
              if (!params.row.remarks) {
                return h(
                  "div",
                  {
                    style: {
                      color: "#999999",
                      fontSize: "12px",
                    },
                    on: {
                      dblclick: () => {
                        if (
                          !this.$refs.jobTable.objData[params.index]._isDisabled
                        ) {
                          this.editIndex = params.index;
                        }
                      },
                    },
                  },
                  text
                );
              }
              return h("div", [
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "top",
                      transfer: true,
                    },
                  },
                  [
                    h(
                      "div",
                      {
                        style: {
                          width: a + "px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        },
                        on: {
                          dblclick: () => {
                            if (
                              !this.$refs.jobTable.objData[params.index]
                                ._isDisabled
                            ) {
                              this.editIndex = params.index;
                            }
                          },
                        },
                      },
                      text
                    ),
                    h(
                      "div",
                      {
                        slot: "content",
                        style: {
                          width: a * 2 + "px",
                          whiteSpace: "normal",
                          wordBreak: "break-all",
                          textAlign: "center",
                        },
                      },
                      toolText //整个的信息即气泡内文字)
                    ),
                  ]
                ),
              ]);
            } else {
              this.$nextTick(() => {
                this.$refs.editInput.focus();
              });
              return this.$createElement(
                "Input",
                {
                  ref: "editInput",
                  props: {
                    type: "text",
                    size: "small",
                    value: params.row.remarks,
                  },
                  on: {
                    "on-enter": (e) => {
                      this.jobList[params.index].remarks = e.target.value;
                      this.editIndex = -1;
                    },
                    "on-blur": (e) => {
                      this.jobList[params.index].remarks = e.target.value;
                      this.editIndex = -1;
                    },
                  },
                },
                text
              );
            }
          },
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 180,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.操作);
          },
        },
      ],
      taskList: [],
      task: [
        {
          type: "selection",
          align: "center",
          width: 35,
        },
        {
          title: " ",
          align: "center",
          width: 20,
          slot: "top",
        },
        {
          title: "编号",
          key: "task_id",
          sortable: true,
          width: 50,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.编号);
          },
        },
        {
          title: "状态",
          key: "state",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.状态);
          },
          render: (h, params) => {
            let bgColor = "#2EC6A8";
            if (params.row.state == 1) bgColor = "#F0C249";
            // else if (params.row.state == "ending") bgColor = "#F06149";
            return h("div", {
              style: {
                width: "14px",
                height: "14px",
                marginLeft:"25px",
                background: bgColor,
                borderRadius: "100%",
              },
            });
          },
        },
        {
          title: "运行时间",
          key: "spend_time",
          sortable: true,
          minWidth: 35,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.运行时间);
          },
        },
        {
          title: "费用",
          key: "cost",
          sortable: true,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.费用);
          },
          render: (h, params) => {
            return h("div", {}, "¥" + params.row.cost.toFixed(2));
          },
        },
        {
          title: "输入",
          slot: "input",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.输入);
          },
        },
        {
          title: "输出",
          slot: "output",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.输出);
          },
        },
      ],
      journal: "",
    };
  },
  mounted() {
    getUserDetails()
      .then((res) => {
        this.jobList = res.details.slice(0, 15);
        this.allJobNum = res.data.all_task;
        this.finishedJobNum = res.data.finished_task;
        this.workingJobNum = res.data.working_task;
        this.jobLoading = false;
      })
      .catch((err) => {
        this.jobList = [];
        this.jobUrlType = 2;
        this.jobLoading = false;
        console.log(err);
      });
    document.getElementsByTagName("textarea")[0].readOnly = "true";

    //当数据换行时,实现滚动效果
    this.$nextTick(() => {
      for (let item in document.getElementsByClassName("test1")) {
        if (document.getElementsByClassName("test1")[item].scrollHeight > 21)
          document.getElementsByClassName("test1")[item].className =
            "test1 test";
      }
      //job概览滚动加载
      this.$refs.jobTable.$el.addEventListener(
        "scroll",
        (e) => {
          if (this.jobLoading) return;
          if (
            Number.parseInt(
              e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
            ) <= 200
          ) {
            this.jobLoading = true;
            getUserDetails()
              .then((res) => {
                console.log(res);
                this.jobList.push(
                  ...res.details.slice(
                    15 * this.jobPage,
                    15 * this.jobPage + 15
                  )
                );
                this.jobPage++;
                this.jobLoading = false;
                //如果有新数据录入的话(等接口做好分页,根据返回的数据判断)
                this.jobIsAllSelectd = false;
                setTimeout(() => {
                  let obj = this.$refs.jobTable.objData;
                  for (let item in obj) {
                    if (this.hasSelectJobs.indexOf(obj[item].job_id) != -1) {
                      obj[item]._isChecked = true;
                    }
                    if (this.hasDeleteJobs.indexOf(obj[item].job_id) != -1) {
                      obj[item]._isDisabled = true;
                    }
                  }
                }, 0);
              })
              .catch((err) => {
                console.log(err);
                this.jobUrlType = 2;
                this.jobList = [];
                this.jobLoading = false;
              });
          }
        },
        true
      );
      //task概览滚动加载
      this.$refs.taskTable.$el.addEventListener(
        "scroll",
        (e) => {
          //滚动加载的防抖
          if (this.taskLoading) return;
          if (
            Number.parseInt(
              e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
            ) <= 100
          ) {
            this.taskLoading = true;
            const params = {
              job_id: this.selectJob,
              page: this.taskPage,
            };
            getJobDetails(params)
              .then((res) => {
                this.taskList.push(...res.details);
                this.taskPage++;
                this.taskLoading = false;
                //如果有新数据录入的话
                this.taskIsAllSelectd = false;
                setTimeout(() => {
                  let obj = this.$refs.taskTable.objData;
                  for (let item in obj) {
                    if (this.hasSelectTasks.indexOf(obj[item].task_id) != -1) {
                      obj[item]._isChecked = true;
                    }
                  }
                }, 0);
              })
              .catch((err) => {
                console.log(err);
                this.taskLoading = false;
                this.taskList = [];
                this.taskUrlType = 2;
              });
          }
        },
        true
      );
    });
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        this.screenHeight = window.fullHeight; // 高
        this.screenWidth = window.fullWidth; // 宽
        //长度超出可视范围后开始滚动(测试版)
        for (let item in document.getElementsByClassName("test1")) {
          document.getElementsByClassName("test1")[item].className = "test1";
          this.$nextTick(() => {
            if (
              document.getElementsByClassName("test1")[item].scrollHeight > 21
            )
              document.getElementsByClassName("test1")[item].className =
                "test1 test";
            else
              document.getElementsByClassName("test1")[item].className =
                "test1";
          });
        }
      })();
    };
  },
  methods: {
    defaultUrl(type) {
      if (type == 1) {
        return `<img class='tipImg' src=${require("../../assets/img/暂无任务@2x.png")}><div class='tipTxt'>${this.$t("index.Default.暂无任务")}</div>`;
      } else if (type == 2) {
        return `<img class='tipImg' src=${require("../../assets/img/网络错误@2x.png")}><div class='tipTxt'>${this.$t("index.Default.网络错误")}</div>`;
      } else if (type == 3) {
        return `<img class='tipImg' src=${require("../../assets/img/无搜索内容@2x.png")}><div class='tipTxt'>${this.$t("index.Default.无搜索结果")}</div>`;
      } else if (type == 4) {
        return `<img class='tipImg' src=${require("../../assets/img/无权限@2x.png")}><div class='tipTxt'>${this.$t("index.Default.无权限")}</div>`;
      } else if (type == 5) {
        return `<img class='tipImg' src=${require("../../assets/img/404@2x.png")}><div class='tipTxt'>${this.$t("index.Default.404报错")}</div>`;
      }
    },

    //Job相关函数
    //单个删除
    deleteJob(row, index) {
      if (confirm("确认要删除吗?")) {
        if (this.$refs.jobTable.objData[index]._isChecked) {
          this.jobChosenNum--;
          this.hasSelectJobs.splice(this.hasSelectJobs.indexOf(row.job_id), 1);
          this.jobChosenCost = (this.jobChosenCost - row.cost).toFixed(2);
        }
        if (this.$refs.jobTable.objData[index].isTop) {
          let delIndex = test.findIndex((item) => {
            return item.job_id == row.job_id;
          });
          test.splice(delIndex, 1);
        }
        this.hasDeleteJobs.push(row.job_id);
        this.$refs.jobTable.objData[index]._isDisabled = true;
        this.$refs.jobTable.objData[index]._isChecked = false;
      }
    },
    //删除选中项
    deleteAllJob() {
      if (confirm("确认要删除吗?")) {
        for (let item in this.$refs.jobTable.objData) {
          if (this.$refs.jobTable.objData[item]._isChecked) {
            this.$refs.jobTable.objData[item]._isChecked = false;
            this.$refs.jobTable.objData[item]._isDisabled = true;
            this.hasDeleteJobs.push(this.$refs.jobTable.objData[item].job_id);
          }
          if (this.$refs.jobTable.objData[item].isTop) {
            let delIndex = test.findIndex((index) => {
              return index.job_id == this.$refs.jobTable.objData[item].job_id;
            });
            test.splice(delIndex, 1);
            this.$refs.jobTable.objData[item].isTop = false;
            this.jobList[item].isTop = false;
          }
        }
        this.hasSelectJobs = [];
        this.jobChosenNum = 0;
        this.jobChosenCost = "0.00";
        this.jobIsSelectd = false;
        this.jobIsAllSelectd = false;
      }
    },
    jobRowClassName(row, index) {
      if (this.$refs.jobTable.objData[index]._isDisabled) {
        return "disabled";
      }
      return "";
    },
    getJobUrl(index, name) {
      let url = name + "Icon";
      if (this.$refs.jobTable.objData[index]._isDisabled) {
        url += "Del";
      }
      url += ".png";
      return require("../../assets/img/" + url);
    },
    getJobTop(index, name) {
      let url = name + "Icon";
      if (this.$refs.jobTable.objData[index].isTop) url += "Top";
      url += ".png";
      return require("../../assets/img/" + url);
    },
    //全选
    selectAllJob(state) {
      let num = 0,
        cost = 0,
        hasSelect = [];
      for (let item in this.$refs.jobTable.objData) {
        if (!this.$refs.jobTable.objData[item]._isDisabled) {
          this.$refs.jobTable.objData[item]._isChecked = state;
          cost += this.$refs.jobTable.objData[item].cost;
          num++;
          hasSelect.push(this.$refs.jobTable.objData[item].job_id);
        }
      }
      this.hasSelectJobs = state ? hasSelect : [];
      this.jobChosenCost = state ? cost.toFixed(2) : "0.00";
      this.jobIsSelectd = num != 0 ? state : false;
      this.jobChosenNum = state ? num : 0;
    },
    //单选
    jobIsSelect(selection) {
      let item,
        num = 0,
        cost = 0;
      for (item in this.$refs.jobTable.objData) {
        if (!this.$refs.jobTable.objData[item]._isDisabled) {
          num++;
          if (this.$refs.jobTable.objData[item]._isChecked) {
            cost += this.$refs.jobTable.objData[item].cost;
            if (
              this.hasSelectJobs.indexOf(
                this.$refs.jobTable.objData[item].job_id
              ) == -1
            )
              this.hasSelectJobs.push(this.$refs.jobTable.objData[item].job_id);
          } else {
            if (
              this.hasSelectJobs.indexOf(
                this.$refs.jobTable.objData[item].job_id
              ) != -1
            )
              this.hasSelectJobs.splice(
                this.hasSelectJobs.indexOf(
                  this.$refs.jobTable.objData[item].job_id
                ),
                1
              );
          }
        }
      }
      this.jobChosenCost = cost.toFixed(2);
      this.jobChosenNum = selection.length;
      this.jobIsSelectd = selection.length != 0 ? true : false;
      this.jobIsAllSelectd = selection.length == num ? true : false;
    },
    showTask(data, index) {
      this.selectJob = data.job_id;
      const params = {
        job_id: data.job_id,
        page: 1,
      };
      this.taskPage = 2;
      this.taskLoading = true;
      this.logInf.job = {
        job_id:this.jobList[index].job_id,
        username:this.jobList[index].username,
        job_type:this.jobList[index].job_type,
        job_name:this.jobList[index].job_name
      }
      getJobDetails(params)
        .then((res) => {
          if (res.details == []) this.taskUrlType = 3;
          this.taskList = res.details;
          this.allTaskNum = res.data.all_task;
          this.finishedTaskNum = res.data.finished_task;
          this.workingTaskNum = res.data.working_task;
          this.failedTaskNum = res.data.failed_task;
          this.taskLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.taskList = [];
          this.taskUrlType = 2;
          this.taskLoading = false;
        });
    },

    //Task相关函数
    deleteTask(row, index) {
      if (confirm("确认要删除吗?")) {
        if (this.$refs.taskTable.objData[index]._isChecked) {
          this.taskChosenNum--;
          this.hasSelectTasks.splice(
            this.hasSelectTasks.indexOf(row.task_id),
            1
          );
          console.log(this.taskChosenCost - row.cost);
          this.taskChosenCost = (this.taskChosenCost - row.cost).toFixed(2);
        }
        this.$refs.taskTable.objData[index]._isDisabled = true;
        this.$refs.taskTable.objData[index]._isChecked = false;
      }
    },
    deleteAllTask() {
      if (confirm("确认要删除吗?")) {
        for (let item in this.$refs.taskTable.objData) {
          if (this.$refs.taskTable.objData[item]._isChecked) {
            this.$refs.taskTable.objData[item]._isChecked = false;
            this.$refs.taskTable.objData[item]._isDisabled = true;
          }
        }
        this.hasSelectTasks = [];
        this.taskChosenNum = 0;
        this.taskChosenCost = "0.00";
        this.taskIsSelectd = false;
        this.taskIsAllSelectd = false;
      }
    },
    taskRowClassName(row, index) {
      if (this.$refs.taskTable.objData[index]._isDisabled) {
        return "disabled";
      }
      return "";
    },
    getTaskUrl(index, name) {
      let url = name + "Icon";
      if (this.$refs.taskTable.objData[index]._isDisabled) url += "Del";
      url += ".png";
      return require("../../assets/img/" + url);
    },
    getTaskTop(index, name) {
      let url = name + "Icon";
      if (this.$refs.taskTable.objData[index].isTop) url += "Top";
      url += ".png";
      return require("../../assets/img/" + url);
    },
    selectAllTask(state) {
      let num = 0,
        cost = 0,
        hasSelect = [];
      for (let item in this.$refs.taskTable.objData) {
        if (!this.$refs.taskTable.objData[item]._isDisabled) {
          this.$refs.taskTable.objData[item]._isChecked = state;
          cost += this.$refs.taskTable.objData[item].cost;
          num++;
          hasSelect.push(this.$refs.taskTable.objData[item].task_id);
        }
      }
      this.hasSelectTasks = state ? hasSelect : [];
      this.taskChosenCost = state ? cost.toFixed(2) : 0;
      this.taskIsSelectd = num != 0 ? state : false;
      this.taskChosenNum = state ? num : 0;
    },
    taskIsSelect(selection) {
      let item,
        num = 0,
        cost = 0;
      for (item in this.$refs.taskTable.objData) {
        if (!this.$refs.taskTable.objData[item]._isDisabled) {
          num++;
          if (this.$refs.taskTable.objData[item]._isChecked) {
            cost += this.$refs.taskTable.objData[item].cost;
            if (
              this.hasSelectTasks.indexOf(
                this.$refs.taskTable.objData[item].job_id
              ) == -1
            )
              this.hasSelectTasks.push(
                this.$refs.taskTable.objData[item].task_id
              );
          } else {
            if (
              this.hasSelectTasks.indexOf(
                this.$refs.taskTable.objData[item].task_id
              ) != -1
            )
              this.hasSelectTasks.splice(
                this.hasSelectTasks.indexOf(
                  this.$refs.taskTable.objData[item].task_id
                ),
                1
              );
          }
        }
      }
      this.taskChosenCost = cost.toFixed(2);
      this.taskChosenNum = num;
      this.taskIsSelectd = selection.length ? true : false;
      this.taskIsAllSelectd = selection.length == num ? true : false;
    },
    taskListFilter(status) {
      const params = {
        job_id: this.selectJob,
        page: 1,
        status: status,
      };
      getJobDetails(params).then((res) => {
        if (res.details.length == 0) {
          this.taskUrlType = 3;
        }
        this.taskList = res.details;
      });
    },
    showLog(data, index) {
      let ta = document.getElementsByTagName("textarea")[0];
      this.logInf.task = {
        task_id:this.taskList[index].task_id,
        ip:this.taskList[index].ip,
        states:this.taskList[index].status,
      }
      console.log(this.logInf);
      ta.style.overflowY = "visible";
      ta.value = "";
      let logs = "";
      data.log.log.forEach((item) => {
        logs += item;
        if (item[item.length - 1] != "\n") logs += "\n";
      });
      ta.value = logs;
    },

    //搜索Job
    searchTask() {
      // if (!this.searchData.range.end) console.log(this.searchData.date);
      // //   // this.searchData.range.end = now
      // // if (!this.searchData.range.begin)
      // else if (this.searchData.range.begin > this.searchData.range.end)
      //   [this.searchData.range.begin, this.searchData.range.end] = [
      //     this.searchData.range.end,
      //     this.searchData.range.begin,
      //   ];
      // console.log(this.searchData.date[0]);
      // console.log(new Date());
      //换行滚动效果
      // if (this.$refs.test.scrollHeight > 42) {
      //   this.$refs.test.className = "test";
      // }
    },

    isJobTop(row, index) {
      this.jobList[index].isTop = !this.jobList[index].isTop;
      if (this.jobList[index].isTop) {
        if (test == null) test = [];
        test.push(row);
      } else {
        let delIndex = test.findIndex((item) => {
          return item.job_id == row.job_id;
        });
        test.splice(delIndex, 1);
      }
      let a = this.jobList.splice(index, 1);
      for (let item in this.jobList) {
        if (!this.jobList[item].isTop) {
          let b = this.jobList.slice(0, item);
          b.push(a[0]);
          this.jobList = b.concat(this.jobList.slice(item));

          setTimeout(() => {
            let obj = this.$refs.jobTable.objData;
            for (let item in obj) {
              if (this.hasSelectJobs.indexOf(obj[item].job_id) != -1) {
                obj[item]._isChecked = true;
              }
              if (this.hasDeleteJobs.indexOf(obj[item].job_id) != -1) {
                obj[item]._isDisabled = true;
              }
            }
          }, 0);
          return;
        }
      }
      this.jobList.push(a[0]);
      setTimeout(() => {
        let obj = this.$refs.jobTable.objData;
        for (let item in obj) {
          if (this.hasSelectJobs.indexOf(obj[item].job_id) != -1) {
            obj[item]._isChecked = true;
          }
          if (this.hasDeleteJobs.indexOf(obj[item].job_id) != -1) {
            obj[item]._isDisabled = true;
          }
        }
      }, 0);
    },
    isTaskTop(row, index) {
      this.taskList[index].isTop = !this.taskList[index].isTop;
      let a = this.taskList.splice(index, 1);
      for (let item in this.taskList) {
        if (!this.taskList[item].isTop) {
          let b = this.taskList.slice(0, item);
          b.push(a[0]);
          this.taskList = b.concat(this.taskList.slice(item));
          return;
        }
      }
      this.taskList.push(a[0]);
    },
    //Job表刷新
    refreshJob() {
      this.hasSelectJobs = [];
      this.page = 1;
      this.jobLoading = true;
      getUserDetails()
        .then((res) => {
          console.log(res);
          this.jobList = res.details.slice(0, 15);
          this.allJobNum = res.data.all_task;
          this.finishedJobNum = res.data.finished_task;
          this.workingJobNum = res.data.working_task;
          document.getElementsByClassName("ivu-table-body")[0].scroll(0, 0);
          this.jobLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.jobList = [];
          this.jobUrlType = 2;
          this.jobLoading = false;
          document.getElementsByClassName("ivu-table-body")[0].scroll(0, 0);
        });
    },
    //task表刷新
    refreshTask() {
      this.hasSelectTasks = [];
      const params = {
        job_id: this.selectJob,
        page: 1,
      };
      this.taskChosen = "100";
      this.taskLoading = true;
      getJobDetails(params)
        .then((res) => {
          this.taskList = res.details;
          this.allTaskNum = res.data.all_task;
          this.finishedTaskNum = res.data.finished_task;
          this.workingTaskNum = res.data.working_task;
          this.failedTaskNum = res.data.failed_task;
          document.getElementsByClassName("ivu-table-body")[1].scroll(0, 0);
          this.taskLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.taskList = [];
          this.taskUrlType = 2;
          this.taskLoading = false;
        });
    },
    fullScreen() {
      this.logFullScreen = !this.logFullScreen;
      if (this.$refs.log.$el.style.position != "fixed") {
        this.$refs.log.$el.style.position = "fixed";
        this.$refs.log.$el.style.top = 0;
        this.$refs.log.$el.style.left = 200 + "px";
        this.$refs.log.$el.style.height = this.screenHeight + "px";
        this.$refs.log.$el.style.width = this.screenWidth - 200 + "px";
        this.$refs.log.$el.style.zIndex = 11;
        document.getElementsByTagName("textarea")[0].style.height =
          this.screenHeight - 100 + "px";
        document.getElementsByTagName("textarea")[0].style.minHeight =
          this.screenHeight - 100 + "px";
        document.getElementsByTagName("textarea")[0].style.maxHeight =
          this.screenHeight - 100 + "px";
      } else {
        this.$refs.log.$el.style.position = "";
        this.$refs.log.$el.style.top = "";
        this.$refs.log.$el.style.left = "";
        this.$refs.log.$el.style.zIndex = "";
        this.$refs.log.$el.style.width = "";
        this.$refs.log.$el.style.height =
          (421 / 1080) * this.screenHeight + "px";
        document.getElementsByTagName("textarea")[0].style.height =
          ((370 / 1080) * this.screenHeight - 100) / 0.75 + "px";
        document.getElementsByTagName("textarea")[0].style.minHeight =
          ((370 / 1080) * this.screenHeight - 100) / 0.75 + "px";
        document.getElementsByTagName("textarea")[0].style.maxHeight =
          ((370 / 1080) * this.screenHeight - 100) / 0.75 + "px";
      }
    },
    log() {
      // this.$router.push({name:'log', params:{ log: document.getElementsByTagName("textarea")[0].value,}})
      console.log(this.logInf);
      const { href } = this.$router.resolve({
        path:'/log',
        query: {
          logInf: JSON.stringify(this.logInf)
        },
      });
      window.open(href, "_blank");
    },
    download(row) {
      if (row.result) {
        getStsToken()
          .then((res) => {
            const result = res;
            const client = new OSS({
              accessKeyId: result.AccessKeyId,
              accessKeySecret: result.AccessKeySecret,
              stsToken: result.SecurityToken,
              endpoint: "oss-cn-shenzhen.aliyuncs.com",
              bucket: "dpcloudserver",
            });
            const url = client.signatureUrl(row.result, { expires: 600 });
            this.downloadFile(url);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    downloadFile(url) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none"; // 防止影响页面
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
      const blob = new Blob([JSON.stringify(row.input_data, null, 2)], {
        type: "application/json",
      });

      FileSaver.saveAs(blob, "input.json");
    },
    setMachine(machine) {
      this.machine = machine;
    },

    edit(row, index) {
      this.showModal = true;
      console.log(row);
    },
    cancel() {
      this.showModal = false;
    },
    confirm() {
      this.showModal = false;
    },
  },
  computed:{
    i18n(){
      return this.$t("index.Task");
    }
  }
};
</script>

<style lang="scss" scoped>
.editModal {
  /deep/ .ivu-modal {
    width: 900px !important;
  }
  .editModalHeader {
    width: 100%;
    text-align: center;
    font-size: 20px;
  }
  /deep/ .ivu-modal-footer {
    text-align: center;
  }
  .cancelBtn {
    width: 120px;
    height: 40px;
    background: #eaebef;
    color: #999999;
    border-radius: 20px;
    display: inline-block;
  }
  .confirmBtn {
    width: 120px;
    height: 40px;
    background: #13227a;
    color: #ffffff;
    border-radius: 20px;
    display: inline-block;
  }
}
.col-card {
  overflow: hidden;
  /deep/ .ivu-card-head {
    height: 45px;
    padding: 5px 0;
  }
  /deep/ .ivu-card-body {
    height: 35px;
    padding: 0 0 16px 0;
  }
  /deep/ .ivu-table {
    /deep/ .ivu-table-cell {
      padding: 0;
    }
  }
  /deep/ .ivu-table td,
  /deep/ .ivu-table th {
    height: 37px;
  }
  /deep/ .ivu-table .disabled td {
    color: #d8d8d8 !important;
    position: relative;
    /deep/ .ivu-table-cell {
      div {
        color: #d8d8d8 !important;
        /deep/ span {
          color: #d8d8d8 !important;
        }
      }
    }
  }
  /deep/ .ivu-table-tip {
    .tipImg {
      width: 15%;
    }
    .tipTxt {
      font-size: 12px;
    }
  }
  .Title {
    height: 100%;
    font-size: 18px;
    .tableTitle {
      display: inline-block;
      margin-top: 7px;
      margin-left: 10px;
      float: left;
      font-size: 16px;
    }
    .searchForm {
      margin-left: 10px;
      font-size: 12px;
      font-weight: 500;
      float: left;
      height: 100%;
      .searchFormItem {
        /deep/ .ivu-input {
          font-size: 12px;
        }
      }
      .searchFormBtn {
        background: #13227a;
        border-radius: 20px;
        width: 60px;
        font-size: 12px;
        padding: 0 5px;
      }
    }
    /deep/ .ivu-radio-group {
      border: 1px solid #e9e9e9;
      border-color: #e9e9e9;
      border-radius: 20px;
      .ivu-radio-wrapper {
        color: #666666;
        border: none;
        border-radius: 20px;
        height: 30px;
        line-height: 30px;
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
  }
}

.subTask {
  .subTaskState {
    text-align: center;
    color: #333333;
    .success {
      color: #2ec6a8;
    }
    .fail {
      color: #f06149;
    }
    .run {
      color: #f0c249;
    }
    .wait {
      color: #999999;
    }
    .allSubTask {
      color: #000000;
    }
  }
}
.deleteIcon {
  position: absolute;
  width: 30px;
  height: 30px;
  float: right;
  right: 0;
  top: 0;
}
//超出范围横向滚动(测试版)
.test {
  overflow: hidden;
  span {
    display: inline-block; /*inline样式不能使用动画*/
    animation: scroll 4s linear infinite;
    white-space: nowrap;
  }
}
@keyframes scroll {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}

/deep/ .ivu-breadcrumb {
  color: #333333;
  span:last-child {
    color: #13227a;
    font-weight: 700;
  }
}
.taskFooterBtn {
  /deep/ .ivu-btn {
    font-size: 12px;
  }
  /deep/ .ivu-btn-small {
    height: 30px;
    width: 60px;
    margin: 0 3px !important;
  }
}
.footer {
  .footerBtn.ivu-btn {
    margin-right: 20px;
    border-radius: 20px;
    display: inline-block;
    color: #ffffff;
    background: #13227a;
  }
  .footerBtn.ivu-btn[disabled] {
    background: #b1b4ca;
  }
  .Del.ivu-btn {
    color: #999999;
    background: #ffffff;
  }
  .Del.ivu-btn[disabled] {
    background: #eaebef;
  }
  /deep/ .ivu-checkbox-wrapper {
    margin-left: 9px;
  }
}
/deep/ .ivu-table:before {
  height: 0;
}
/deep/ .ivu-btn-text:hover {
  background-color: #ebf7ff;
}
/deep/ .ivu-spin-fix {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>