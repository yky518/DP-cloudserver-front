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
          <FormItem :label="i18n.创建时间+':'" prop="date" :style="{width: 85/1080*screenWidth+'px',verticalAlign: 'middle'}">
            <DatePicker
              v-model="searchData.date"
              format="yyyy-MM-dd"
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
              v-model="searchData.begin"
              style="width: 60px"
              class="searchFormItem"
            ></Input>
            —
            <Input
              type="number"
              :placeholder="i18n.终点"
              v-model="searchData.end"
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
              @click.native="searchJob()"
              class="searchFormBtn"
              >{{i18n.任务搜索}}</Button
            >
          </FormItem>
        </Form>
        <RadioGroup v-model="searchData.status" type="button" style="float: right;font-size:14px;font-weight:500;margin-top:1px;" size="small" @on-change="searchJob()">
          <Radio label="">{{i18n.全部}}({{ allJobNum }})</Radio>
          <Radio label="2">{{i18n.完成}}</Radio>
          <!-- ({{ finishedJobNum }}) -->
          <Radio label="1">{{i18n.运行}}</Radio>
          <!-- ({{ workingJobNum }}) -->
          <Radio label="star">{{i18n.收藏夹}}</Radio>
        </RadioGroup>
      </h2>
      <Table
        :columns="job"
        :data="jobList"
        ref="jobTable"
        @on-selection-change="jobIsSelect"
        @on-row-click="showTask"
        :height="530/1080*screenHeight"
        highlight-row
        :no-data-text="defaultUrl(jobUrlType)"
        :loading="jobLoading"
        @on-sort-change="sortJob"
      >
        <template slot-scope="{ row, index }" slot="star"> 
          <img :src="starIcon(row.star)" style="width: 18px; height: 18px" @click="Star(row,index)"/>
        </template>
        <template slot="subTask" slot-scope="{ row, index }">
          <div class="subTask">
            <div class="subTaskState">
              <!-- <span class="success">{{row.task_count[0]}}</span>/
              <span class="fail">{{row.task_count[1]}}</span>/
              <span class="run">{{row.task_count[2]}}</span>/
              <span class="wait">{{row.task_count[3]}}</span>
              <span class="allSubTask"> ({{row.task_count[0]+row.task_count[1]+row.task_count[2]+row.task_count[3]}})</span> -->
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
              <img src="../../assets/img/bianjiIcon.png" style="width: 18px; height: 18px"></img></Tooltip></Button>
          <Button
            type="text"
            size="small"
            style="margin-right: 5px; color: #13227a"
            :disabled="$refs.jobTable.objData[index]._isDisabled"
            @click="deleteJob(row, index)"
            ><Tooltip :content="i18n.删除"><img
              src="../../assets/img/shanchuIcon.png"
              alt=""
              style="width: 18px; height: 18px"
            /></Tooltip></Button>
          <!-- <Button
            type="text"
            size="small"
            style="margin-right: 5px; color: #13227a"
            :disabled="$refs.jobTable.objData[index]._isDisabled"
            ><Tooltip :content="i18n.下载"><img
              src="../../assets/img/xiazaiIcon.png"
              alt=""
              style="width: 18px; height: 18px"
            /></Tooltip></Button> -->
        </template>
        <div slot="footer" :style="'height:'+48/1080*screenHeight+'px;'" class="footer">
          <Checkbox
            style="display: inline-block"
            @on-change="selectAllJob"
            v-model="jobIsAllSelectd"
            >{{i18n.全选}}</Checkbox
          >
          <div style="display: inline-block; float: right" class="jobFooterBtn">
            {{i18n.共选中}}{{ jobChosenNum }}{{i18n.条}}
            <Button  class="footerBtn"
              :disabled="!jobIsSelectd"
              >
            <img src="../../assets/img/xiazaiIconWhite.png" style="width:12px;">{{i18n.输入}}</Button>
            <Dropdown trigger="hover" placement="top" @on-click="taskDownload">
              <Button
                class="footerBtn"
                :disabled="!jobIsSelectd"
                ><img src="../../assets/img/xiazaiIconWhite.png" style="width:12px;">{{i18n.输出}}<Icon type="ios-arrow-up" class="outputArrow"></Icon></Button
              >
              <DropdownMenu slot="list">
                <DropdownItem name="URL" :disabled="!jobIsSelectd">URL</DropdownItem>
                <DropdownItem name="wget" :disabled="!jobIsSelectd">wget</DropdownItem>
                <DropdownItem name="PowerShell" :disabled="!jobIsSelectd">PowerShell</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
            <Button
              class="footerBtn Del"
              :disabled="!jobIsSelectd"
              @click.native="deleteAllJob()"
              ><img src="../../assets/img/shanchuIconDel.png" style="width:16px;">{{i18n.删除}}</Button
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
              <Radio label="2">{{i18n.完成}}</Radio>
              <!-- ({{ finishedTaskNum }}) -->
              <Radio label="1">{{i18n.运行}}</Radio>
              <!-- ({{ workingTaskNum }}) -->
              <Radio label="-1">{{i18n.失败}}</Radio>
              <!-- ({{ failedTaskNum }}) -->
            </RadioGroup>
          </h2>
          <Table
            :columns="task"
            :data="taskList"
            ref="taskTable"
            highlight-row
            @on-selection-change="taskIsSelect"
            @on-row-click="showLog"
            :height="351/1080*screenHeight"
            :no-data-text="defaultUrl(taskUrlType)"
            :loading="taskLoading"
          >
            <template slot-scope="{ row, index }" slot="input">
              <Button
                size="small"
                style="
                  background: #b1b4ca;
                  color: #ffffff;
                  border-radius: 20px;
                "
                :disabled="$refs.taskTable.objData[index]._isDisabled&&!row.result"
                @click.native="downloadInput(row,0)"
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
                @click.native="downloadInput(row,1)">{{i18n.下载}}</Button
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
                <Button  class="footerBtn"
                  :disabled="!taskIsSelectd"
                  >
                <img src="../../assets/img/xiazaiIconWhite.png" style="width:12px;">{{i18n.输入}}</Button>
                <Dropdown trigger="hover" placement="top" @on-click="taskDownload">
                  <Button
                    class="footerBtn"
                    :disabled="!taskIsSelectd"
                    ><img src="../../assets/img/xiazaiIconWhite.png" style="width:12px;">{{i18n.输出}}<Icon type="ios-arrow-up" class="outputArrow"></Icon></Button
                  >
                  <DropdownMenu slot="list">
                    <DropdownItem name="所有task输出文件的URL" :disabled="!taskIsSelectd">URL</DropdownItem>
                    <DropdownItem name="所有task输出文件的脚本" :disabled="!taskIsSelectd">脚本</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                
                <Button
                class="footerBtn Del"
                  size="small"
                  :disabled="!taskIsSelectd"
                  @click.native="deleteAllTask()"
                  ><img src="../../assets/img/shanchuIconDel.png" style="width:12px;">{{i18n.删除}}</Button
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
import {
  getJobDetails,
  getUserDetails,
  Jobs,
  Tasks,
  Remark,
  deleteJob,
  star,
  log,
} from "@/api/info";
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
      logFullScreen: false,
      timeout: null,

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
      jobUrlType: 1,
      sortby: "id", //id（默认）/create_time/spend_time/cost
      reverse: 1,
      star: 0,
      jobEnd:false,

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
      taskEnd:false,

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
        date: ["", ""],
        begin: "",
        end: "",
        username: "",
        search: "",
        status: "",
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
      logInf: {
        log: "",
        task: "",
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
          width: 30,
          slot: "star",
        },
        {
          title: "编号",
          key: "id",
          sortable: true,
          align: "center",
          width: 100,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.编号);
          },
        },
        {
          title: "名称",
          key: "job_name",
          width: 60,
          tooltip: true,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.名称);
          },
        },

        {
          title: "用户",
          key: "user_name",
          width: 50,
          tooltip: true,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.用户);
          },
        },
        {
          title: "类型",
          key: "job_type",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.类型);
          },
        },
        {
          title: "状态",
          key: "status",
          width: 50,
          align: "center",
          render: (h, params) => {
            let bgColor = "#2EC6A8";
            if (params.row.state == "1") bgColor = "#F0C249";
            else if (params.row.state == "-1") bgColor = "#F06149";
            return h("div", {
              style: {
                width: "14px",
                height: "14px",
                marginLeft: "10px",
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
                    marginLeft: "5px",
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
                    marginLeft: "5px",
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
          width: 130,
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
              ),
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
                      this.editIndex = -1;
                    },
                    "on-blur": (e) => {
                      this.jobList[params.index].remarks = e.target.value;
                      Remark(params.row.id, { remark: e.target.value })
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => {
                          console.log(err);
                        }),
                        (this.editIndex = -1);
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
          title: "编号",
          key: "tasks_id",
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
          align: "center",
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
                marginLeft: "25px",
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
          align: "center",
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
    this.getJobList();
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
          if (this.jobLoading)
            return;
          if(this.jobEnd){
            if(this.timeout)
              clearTimeout(this.timeout)
            if(!this.timeout)
              this.$Message.warning("已经到底了");
            this.timeout = setTimeout(()=>{
              this.timeout = null;
            },2000)
            return;
          }
          if (
            Number.parseInt(
              e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
            ) <= 200
          ) {
            this.getJobList();
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
          if(this.taskEnd){
            if(this.timeout)
              clearTimeout(this.timeout)
            if(!this.timeout)
              this.$Message.warning("已经到底了");
            this.timeout = setTimeout(()=>{
              this.timeout = null;
            },2000)
            return;
          }
          if (
            Number.parseInt(
              e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
            ) <= 100
          ) {
            this.taskLoading = true;
            this.getTaskList();
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
        return `<img class='tipImg' src=${require("../../assets/img/暂无任务@2x.png")}><div class='tipTxt'>${this.$t(
          "index.Default.暂无任务"
        )}</div>`;
      } else if (type == 2) {
        return `<img class='tipImg' src=${require("../../assets/img/网络错误@2x.png")}><div class='tipTxt'>${this.$t(
          "index.Default.网络错误"
        )}</div>`;
      } else if (type == 3) {
        return `<img class='tipImg' src=${require("../../assets/img/无搜索内容@2x.png")}><div class='tipTxt'>${this.$t(
          "index.Default.无搜索内容"
        )}</div>`;
      } else if (type == 4) {
        return `<img class='tipImg' src=${require("../../assets/img/无权限@2x.png")}><div class='tipTxt'>${this.$t(
          "index.Default.无权限"
        )}</div>`;
      } else if (type == 5) {
        return `<img class='tipImg' src=${require("../../assets/img/404@2x.png")}><div class='tipTxt'>${this.$t(
          "index.Default.404报错"
        )}</div>`;
      }
    },

    //Job相关函数
    //获取job列表
    getJobList() {
      if(this.jobEnd)
        return;
      this.jobLoading = true;
      let params = {
        search_key: this.searchData.search,
        start_id: this.searchData.begin,
        end_id: this.searchData.end,
        start_time:
          this.searchData.date[0] == ""
            ? ""
            : this.searchData.date[0].getFullYear() +
              "-" +
              (this.searchData.date[0].getMonth() + 1) +
              "-" +
              this.searchData.date[0].getDate(),
        end_time:
          this.searchData.date[1] == ""
            ? ""
            : this.searchData.date[1].getFullYear() +
              "-" +
              (this.searchData.date[1].getMonth() + 1) +
              "-" +
              this.searchData.date[1].getDate(),
        status: this.searchData.status,
        sortby: this.sortby,
        reverse: this.reverse,
        star: this.star,
        page: this.jobPage,
        per_page: 20,
      };
      Object.keys(params).forEach((item) => {
        if (params[item] === "") delete params[item];
      });
      Jobs(params)
        .then((res) => {
          if(res.items.length == 0)
            this.jobEnd = true;
          this.jobList = [...this.jobList, ...res.items];
          if (this.allJobNum == 0) this.allJobNum = res.total;
          this.jobLoading = false;
          this.jobPage++;
          if (this.star == 1) {
            this.searchData.status = "star";
          }
          setTimeout(() => {
            let obj = this.$refs.jobTable.objData;
            for (let item in obj) {
              if (this.hasSelectJobs.indexOf(obj[item].id) != -1) {
                obj[item]._isChecked = true;
              }
            }
          }, 0);
        })
        .catch((err) => {
          this.jobList = [];
          this.jobUrlType = 2;
          this.jobLoading = false;
          console.log(err);
        });
    },
    //收藏job
    Star(row, index) {
      row.star = row.star == 0 ? 1 : 0;
      if (row.star == 0 && this.star == 1) {
        this.jobList.splice(index, 1);
      }
      star(row.id, { star: row.star })
        .then((res) => {
          if (row.star == 1) this.$Message.success("收藏成功");
          else this.$Message.success("取消收藏");
        })
        .catch((err) => {
          this.$Message.error("收藏失败");
        });
    },

    starIcon(star) {
      if (star == 0) return require("../../assets/img/weishoucang.png");
      else return require("../../assets/img/shoucang.png");
    },
    //单个删除
    deleteJob(row, index) {
      if (confirm("确认要删除吗?")) {
        if (this.$refs.jobTable.objData[index]._isChecked) {
          this.jobChosenNum--;
          this.hasSelectJobs.splice(this.hasSelectJobs.indexOf(row.id), 1);
          this.jobChosenCost = (this.jobChosenCost - row.cost).toFixed(2);
        }
        this.jobList.splice(index, 1);
        deleteJob(row.id)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //删除选中项
    deleteAllJob() {
      if (confirm("确认要删除吗?")) {
        for (let item in this.$refs.jobTable.objData) {
          if (this.$refs.jobTable.objData[item]._isChecked) {
            this.jobList.splice(item, 1);
            deleteJob(this.$refs.jobTable.objData[item].id)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
        this.hasSelectJobs = [];
        this.jobChosenNum = 0;
        this.jobChosenCost = "0.00";
        this.jobIsSelectd = false;
        this.jobIsAllSelectd = false;
      }
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
          hasSelect.push(this.$refs.jobTable.objData[item].id);
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
                this.$refs.jobTable.objData[item].id
              ) == -1
            )
              this.hasSelectJobs.push(this.$refs.jobTable.objData[item].id);
          } else {
            if (
              this.hasSelectJobs.indexOf(
                this.$refs.jobTable.objData[item].id
              ) != -1
            )
              this.hasSelectJobs.splice(
                this.hasSelectJobs.indexOf(
                  this.$refs.jobTable.objData[item].id
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
      this.selectJob = data.id;
      this.taskPage = 1;
      this.taskLoading = true;
      this.logInf.job = {
        id: this.jobList[index].id,
        username: this.jobList[index].user_name,
        job_type: this.jobList[index].job_type,
        job_name: this.jobList[index].job_name,
      };
      this.taskList = [];
      this.getTaskList(data.id);
    },
    sortJob(column) {
      this.sortby = column.key;
      this.reverse = column.order == "desc" ? 1 : 0;
      this.page = 1;
      // setTimeout(()=>{
      this.getJobList();
      // this.jobList = []
      // },2000)
      // this.getJobList();
    },

    //Task相关函数
    //获取task列表
    getTaskList(id) {
      if(this.taskEnd)
        return
      this.taskLoading = true;
      Tasks(id, { page: this.taskPage, per_page: 20 })
        .then((res) => {
          if(res.items.length == 0)
            this.taskEnd = true;
          this.taskList = [...this.taskList, ...res.items];
          this.taskLoading = false;
          this.taskPage++;
          this.taskIsAllSelectd = false;
          this.allTaskNum = res.total;
          setTimeout(() => {
            let obj = this.$refs.taskTable.objData;
            for (let item in obj) {
              if (this.hasSelectTasks.indexOf(obj[item].tasks_id) != -1) {
                obj[item]._isChecked = true;
              }
            }
          }, 0);
        })
        .catch((err) => {
          this.taskList = [];
          this.taskUrlType = 2;
          this.taskLoading = false;
          console.log(err);
        });
    },
    deleteTask(row, index) {
      if (confirm("确认要删除吗?")) {
        if (this.$refs.taskTable.objData[index]._isChecked) {
          this.taskChosenNum--;
          this.hasSelectTasks.splice(
            this.hasSelectTasks.indexOf(row.tasks_id),
            1
          );
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
    selectAllTask(state) {
      let num = 0,
        cost = 0,
        hasSelect = [];
      for (let item in this.$refs.taskTable.objData) {
        if (!this.$refs.taskTable.objData[item]._isDisabled) {
          this.$refs.taskTable.objData[item]._isChecked = state;
          cost += this.$refs.taskTable.objData[item].cost;
          num++;
          hasSelect.push(this.$refs.taskTable.objData[item].tasks_id);
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
                this.$refs.taskTable.objData[item].tasks_id
              ) == -1
            )
              this.hasSelectTasks.push(
                this.$refs.taskTable.objData[item].tasks_id
              );
          } else {
            if (
              this.hasSelectTasks.indexOf(
                this.$refs.taskTable.objData[item].tasks_id
              ) != -1
            )
              this.hasSelectTasks.splice(
                this.hasSelectTasks.indexOf(
                  this.$refs.taskTable.objData[item].tasks_id
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
      this.taskEnd = false;
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
        tasks_id: this.taskList[index].tasks_id,
        states: this.taskList[index].status,
      };

      ta.style.overflowY = "visible";
      log(data.tasks_id)
        .then((res) => {
          let logs = "";
          let test = eval("(" + res.log + ")").log;
          test.forEach((item) => {
            logs += item;
          });
          ta.value = logs;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //搜索Job
    searchJob() {
      this.jobEnd = false;
      if (this.searchData.status == "star") {
        this.searchData.status = "";
        this.star = 1;
      } else this.star = 0;
      this.hasSelectJobs = [];
      if (this.searchData.begin && !this.searchData.end) {
        let date = new Date();
        this.searchData.end =
          date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
      } else if (this.searchData.begin > this.searchData.end)
        [this.searchData.begin, this.searchData.end] = [
          this.searchData.end,
          this.searchData.begin,
        ];
      this.jobList = [];
      this.jobPage = 1;
      this.getJobList();
    },

    getJob(id) {
      for (let item in this.jobList) {
        if (item.id == id) {
          return item;
        }
      }
    },

    //Job表刷新
    refreshJob() {
      this.hasSelectJobs = [];
      this.jobList = [];
      this.jobPage = 1;
      this.jobLoading = true;
      this.jobEnd = false;
      this.jobIsAllSelectd = false;
      this.star = 0;
      this.searchData = {
        date: ["", ""],
        begin: "",
        end: "",
        username: "",
        search: "",
        status: "",
      };
      this.getJobList();
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
      this.taskEnd = false;
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
      const { href } = this.$router.resolve({
        path: "/log",
        query: {
          logInf: JSON.stringify(this.logInf),
        },
      });
      window.open(href, "_blank");
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
    downloadInput(row, type) {
      if (type == 0) this.downloadFile(row.input_data);
      else
        this.downloadFile(
          "http://dpcloudserver.oss-cn-shenzhen.aliyuncs.com/" + row.result
        );
      // FileSaver.saveAs(blob, "input.json");
    },
    setMachine(machine) {
      this.machine = machine;
    },

    edit(row, index) {
      this.showModal = true;
    },
    cancel() {
      this.showModal = false;
    },
    confirm() {
      this.showModal = false;
    },

    taskDownload(type) {
      this.$Message.success(type);
    },
  },
  computed: {
    i18n() {
      return this.$t("index.Task");
    },
  },
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
    .ivu-table-cell {
      padding: 0;
      width: 100%;
      text-align: center;
      div {
        display: inline-block;
      }
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
.jobFooterBtn{
  .ivu-dropdown:hover {
    .ivu-dropdown-rel .footerBtn span .ivu-icon {
      transform: rotate(180deg);
    }
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
  .ivu-dropdown:hover {
    .ivu-dropdown-rel .footerBtn span .ivu-icon {
      transform: rotate(180deg);
    }
  }
}
.footer {
  .footerBtn.ivu-btn {
    border-radius: 20px;
    display: inline-block;
    color: #ffffff;
    background: #13227a;
  }
  .footerBtn.ivu-btn[disabled] {
    background: #b1b4ca;
  }
  .footerBtn span .ivu-icon {
    transition: all 0.3s linear 0s;
  }
  // .footerBtn:hover {
  //   span .ivu-icon {
  //     transform: rotate(180deg);
  //   }
  // }
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