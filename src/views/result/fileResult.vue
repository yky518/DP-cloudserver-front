<template>
  <div>
    <Breadcrumb
      :style="{ marginLeft: (30 / 1080) * screenHeight + 'px',marginTop:'.3125rem' }"
      separator="-"
    >
      <BreadcrumbItem>{{i18n.结果总览}}</BreadcrumbItem>
      <BreadcrumbItem>{{i18n.文件总览}}</BreadcrumbItem>
    </Breadcrumb>
    <Card
      class="col-card"
      :style="
        'height:' +
        (580 / 1080) * screenHeight +
        'px;margin:' +
        (30 / 1080) * screenHeight +
        'px;margin-top:0;'
      "
    >
      <h2 slot="title" class="Title">
        <Tabs :value="fileChosen" @on-click="fileTab" class="titleTab">
          <TabPane :label="i18n.输出文件" name="all"></TabPane>
          <TabPane :label="i18n.回收站" name="delete"></TabPane>
        </Tabs>
        <div
          style="
            float: right;
            font-size: .75rem;
            margin-top: .625rem;
            padding: 0 .3125rem;
          "
        >
          <img
            src="../../assets/img/shuaxin_icon@2x.png"
            alt=""
            style="height: .875rem; float: left"
          />
          <div style="height: .875rem; line-height: .875rem; float: left"></div>
        </div>
      </h2>
      <Table
        :columns="file"
        :data="fileDataFilter(fileList)"
        :row-class-name="fileRowClassName"
        ref="fileTable"
        @on-selection-change="fileIsSelect"
        :height="(520 / 1080) * screenHeight"
        :no-data-text="defaultUrl(fileUrlType)"
        :disabled-hover="fileChosen == 'delete'"
      >
        <template slot-scope="{ row, index }" slot="top">
          <img
            src="../../assets/img/yiguoqi.png"
            alt=""
            v-if="$refs.fileTable.objData[index]._isDisabled"
            class="deleteIcon"
          />
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="text"
            size="small"
            style="margin-right: .3125rem; color: #13227a"
            @click.native="deleteFile(row, index)"
            :disabled="$refs.fileTable.objData[index]._isDisabled"
          >
            <Tooltip :content="$refs.fileTable.objData[index].isDel||$refs.fileTable.objData[index].recycleBin? i18n.彻底删除:i18n.移至回收站"
              ><img
                :src="getFileUrl(index, 'shanchu')"
                alt=""
                style="width: 1.125rem; height: 1.125rem"
            /></Tooltip>
          </Button>
          <Button
            type="text"
            size="small"
            style="margin-right: .3125rem; color: #13227a"
            :disabled="$refs.fileTable.objData[index]._isDisabled"
            @click.native="downloadFile(row, index)"
          >
            <Tooltip :content="$refs.fileTable.objData[index].isDel||$refs.fileTable.objData[index].recycleBin? i18n.恢复:i18n.下载"
              ><img
                :src="getFileUrl(index, 'xiazai')"
                alt=""
                style="width: 1.125rem; height: 1.125rem"
            /></Tooltip>
          </Button>
        </template>

        <div slot="footer" class="footer">
          <Row>
            <Col span="24">
              <Checkbox
                style="display: inline-block"
                @on-change="selectAllFile"
                v-model="fileIsAllSelectd"
                >{{i18n.全选}}</Checkbox
              >
              <div style="display: inline-block; float: right">
                {{i18n.共选中}}{{ fileChosenNum }}{{i18n.条}}

                <Button
                  class="footerBtn Del"
                  :disabled="!fileIsSelectd"
                  @click.native="deleteAllFile()"
                  ><img
                    src="../../assets/img/shanchuIconDel.png"
                    style="width: 1rem"
                  />{{
                    fileChosen == "all" ? i18n.移至回收站 : i18n.彻底删除
                  }}</Button
                >
                <Button
                  :disabled="!fileIsSelectd || fileChosen == 'delete'"
                  class="footerBtn"
                  ><img
                    :src="
                      fileChosen == 'all'
                        ? require('../../assets/img/xiazaiIconWhite.png')
                        : require('../../assets/img/daochu_按钮@2x.png')
                    "
                    style="width: 1rem"
                  />{{ fileChosen == "all" ? i18n.下载 : i18n.恢复 }}</Button
                >
              </div>
            </Col>
          </Row>
        </div>
      </Table>
    </Card>

    <Card
      class="col-card"
      :style="
        'height:' +
        (433 / 1080) * screenHeight +
        'px;margin:' +
        (30 / 1080) * screenHeight +
        'px;margin-bottom:0;'
      "
    >
      <h2 slot="title" class="Title">
        <Tabs :value="mirrorChosen" @on-click="mirrorTab" class="titleTab">
          <TabPane :label="i18n.镜像文件" name="all"></TabPane>
          <TabPane :label="i18n.回收站" name="delete"></TabPane>
        </Tabs>
        <div
          style="
            float: right;
            font-size: .75rem;
            margin-top: .625rem;
            padding: 0 .3125rem;
          "
        >
          <img
            src="../../assets/img/shuaxin_icon@2x.png"
            alt=""
            style="height: .875rem; float: left"
          />
          <div style="height: .875rem; line-height: .875rem; float: left"></div>
        </div>
      </h2>
      <Table
        :columns="mirror"
        :data="mirrorDataFilter(mirrorList)"
        :row-class-name="mirrorRowClassName"
        ref="mirrorTable"
        @on-selection-change="mirrorIsSelect"
        :height="(375 / 1080) * screenHeight"
        :no-data-text="defaultUrl(mirrorUrlType)"
        :disabled-hover="mirrorChosen == 'delete'"
      >
        <template slot-scope="{ row, index }" slot="top">
          <img
            src="../../assets/img/yiguoqi.png"
            alt=""
            v-if="$refs.mirrorTable.objData[index]._isDisabled"
            class="deleteIcon"
          />
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="text"
            size="small"
            style="margin-right: .3125rem; color: #13227a"
            :disabled="$refs.mirrorTable.objData[index]._isDisabled"
            @click.native="deleteMirror(row, index)"
          >
          <Tooltip :content="$refs.mirrorTable.objData[index].isDel||$refs.mirrorTable.objData[index].recycleBin? i18n.彻底删除:i18n.移至回收站">
            <img
              :src="getMirrorUrl(index, 'shanchu')"
              alt=""
              style="width: 1.125rem; height: 1.125rem"
            /></Tooltip>
          </Button>
          <Button
            type="text"
            size="small"
            style="margin-right: .3125rem; color: #13227a"
            :disabled="$refs.mirrorTable.objData[index]._isDisabled"
            @click.native="downloadMirror(row, index)"
          ><Tooltip :content="$refs.mirrorTable.objData[index].isDel||$refs.mirrorTable.objData[index].recycleBin? i18n.恢复:i18n.下载">
            <img
              :src="getMirrorUrl(index, 'xiazai')"
              alt=""
              style="width: 1.125rem; height: 1.125rem"
            /></Tooltip>
          </Button>
        </template>

        <div slot="footer" class="footer">
          <Checkbox
            style="display: inline-block"
            @on-change="selectAllMirror"
            v-model="mirrorIsAllSelectd"
            >{{i18n.全选}}</Checkbox
          >
          <div style="display: inline-block; float: right">
            {{i18n.共选中}}{{ mirrorChosenNum }}{{i18n.条}}

            <Button
              class="footerBtn Del"
              :disabled="!mirrorIsSelectd"
              @click.native="deleteAllMirror()"
              ><img
                src="../../assets/img/shanchuIconDel.png"
                style="width: 1rem"
              />{{ mirrorChosen == "all" ? i18n.移至回收站 : i18n.彻底删除 }}</Button
            >

            <Button
              type="primary"
              class="footerBtn"
              :disabled="!mirrorIsSelectd || mirrorChosen == 'delete'"
              ><img
                :src="
                  mirrorChosen == 'all'
                    ? require('../../assets/img/xiazaiIconWhite.png')
                    : require('../../assets/img/daochu_按钮@2x.png')
                "
                style="width: 1rem"
              />{{ mirrorChosen == "all" ? i18n.下载 : i18n.恢复 }}</Button
            >
          </div>
        </div>
      </Table>
    </Card>

    <Modal v-model="restoreModal" title="" class="restore">
      <template slot="header"
        ><div class="restoreTitle">{{i18n.恢复成功}}</div></template
      >
      <div class="restoreContent">{{i18n.文件已恢复}}</div>
      <template slot="footer">
        <Button class="restoreBtn" @click.native="restoreModal = false"
          >{{i18n.确定}}</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script>
import { Files, delFile, fileRemark} from '@/api/info';
export default {
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      restoreModal: false,
      editIndex: -1,
      fileChosenNum: 0,
      fileChosen: "all",
      fileIsSelectd: false,
      fileIsAllSelectd: false,
      fileUrlType: 1,
      mirrorChosenNum: 0,
      mirrorChosen: "all",
      mirrorIsSelectd: false,
      mirrorIsAllSelectd: false,
      mirrorUrlType: 1,
      fileList: [],
      file: [
        {
          type: "selection",
          align: "center",
          width: 35,
        },
        {
          title: " ",
          align: "center",
          width: 30,
          slot: "top",
        },
        {
          title: "编号",
          key: "file_id",
          sortable: true,
          width: 50,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.编号);
          },
        },
        {
          title: "名称",
          key: "task_name",
          sortable: true,
          tooltip: true,
          minWidth: 80,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.名称);
          },
        },
        {
          title: "JOB ID",
          key: "job_id",
          sortable: true,
          tooltip: true,
          minWidth: 40,
          align: "center",
        },

        {
          title: "文件名称",
          key: "fileName",
          sortable: true,
          tooltip: true,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.文件名称);
          },
        },
        {
          title: "创建时间",
          key: "createTime",
          sortable: true,
          tooltip: true,
          minWidth: 80,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.创建时间);
          },
        },
        {
          title: "文件大小",
          key: "fileSize",
          sortable: true,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.文件大小);
          },
        },
        {
          title: "存储时长",
          key: "duration",
          sortable: true,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.存储时长);
          },
        },
        {
          title: "费用",
          key: "cost",
          width: 110,
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
                params.row.cost
              ),
              h(
                "Tooltip",
                {
                  style: {
                    verticalAlign: "middle",
                    width: "1rem",
                    height: "1rem",
                    display: "inline-block",
                    marginLeft: ".3125rem",
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "1rem",
                      height: "1rem",
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
                      },
                    },
                    "Cost: ¥10/h✖10.3h = ¥322.00" //整个的信息即气泡内文字)
                  ),
                ]
              ),
            ]);
          },
        },
        {
          title: "备注",
          slot: "remarks",
          align: "center",
          width: 200,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.备注);
          },
          render: (h, params) => {
            let text = params.row.remarks;
            let toolText = text;
            let a = (180 / 1536) * this.screenWidth;
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
                    },
                    on: {
                      dblclick: () => {
                        if (
                          !this.$refs.fileTable.objData[params.index]
                            ._isDisabled
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
                    //这个中括号表示是Tooltip标签的子标签
                    //表格列显示文字
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
                              !this.$refs.fileTable.objData[params.index]
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
                          width: a + "px",
                          whiteSpace: "normal",
                          wordBreak: "break-all",
                          maxHeight: "25rem",
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
                      this.fileList[params.index].remarks = e.target.value;
                      fileRemark(params.row.id,{remark:e.target.value}).then(res=>{
                        console.log(res);
                      }).catch(err=>{
                        console.log(err)
                      })
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
          width: 150,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.操作);
          },
        },
      ],
      mirrorList: [
        
      ],
      mirror: [
        {
          type: "selection",
          align: "center",
          width: 35,
        },
        {
          title: " ",
          align: "center",
          width: 30,
          slot: "top",
        },
        {
          title: "编号",
          key: "mirror_id",
          sortable: true,
          width: 50,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.编号);
          },
        },
        {
          title: "名称",
          key: "mirror_name",
          minWidth: 80,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.名称);
          },
        },
        {
          title: "用户",
          key: "username",
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.用户);
          },
        },
        {
          title: "GPU",
          key: "GPU",
          align: "center",
        },
        {
          title: "CPU",
          key: "CPU",
          align: "center",
        },
        {
          title: "Memory",
          key: "Memory",
          align: "center",
        },

        {
          title: "存储时长",
          key: "save_time",
          sortable: true,
          align: "center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.存储时长);
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
                params.row.cost
              ),
              h(
                "Tooltip",
                {
                  style: {
                    verticalAlign: "middle",
                    width: "1rem",
                    height: "1rem",
                    display: "inline-block",
                    marginLeft: ".3125rem",
                  },
                },
                [
                  h("img", {
                    style: {
                      width: "1rem",
                      height: "1rem",
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
                      },
                    },
                    "Cost: ¥10/h✖10.3h = ¥322.00" //整个的信息即气泡内文字)
                  ),
                ]
              ),
            ]);
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
    Files().then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err)
    })
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

    //File相关函数
    deleteFile(row, index) {
      if (this.fileChosen == "delete") {
        if (confirm("确认要删除吗?")) {
          if (this.$refs.fileTable.objData[index]._isChecked)
            this.fileChosenNum--;
          this.fileList[index].isDel = true;
          delFile(row.file_id).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err);
          })
        }
      } else if (this.fileChosen == "all") {
        if (confirm("确认要移入回收站吗?")) {
          if (this.$refs.fileTable.objData[index]._isChecked)
            this.fileChosenNum--;
          this.fileList[index].recycleBin = true;
          delFile(row.file_id).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err);
          })
        }
      }
    },
    deleteAllFile() {
      if (this.fileChosen == "delete") {
        if (confirm("确认要删除吗?")) {
          for (let item in this.$refs.fileTable.objData) {
            if (this.$refs.fileTable.objData[item]._isChecked) {
              this.fileList[item].isDel = true;
              delFile(this.$refs.fileTable.objData[item].file_id).then(res=>{
                console.log(res)
              }).catch(err=>{
                console.log(err);
              })
            }
          }
          this.fileChosenNum = 0;
          this.fileIsSelectd = false;
          this.fileIsAllSelectd = false;
        }
      } else if (this.fileChosen == "all") {
        if (confirm("确认要移入回收站吗?")) {
          for (let item in this.$refs.fileTable.objData) {
            if (this.$refs.fileTable.objData[item]._isChecked) {
              this.fileList[item].recycleBin = true;
              delFile(this.$refs.fileTable.objData[item].file_id).then(res=>{
                console.log(res)
              }).catch(err=>{
                console.log(err);
              })
            }
          }
          this.fileChosenNum = 0;
          this.fileIsSelectd = false;
          this.fileIsAllSelectd = false;
        }
      }
    },
    fileRowClassName(row, index) {
      if (this.$refs.fileTable.objData[index]._isDisabled) {
        return "disabled";
      } else if (this.$refs.fileTable.objData[index].recycleBin) {
        return "recycleBin";
      }
      return "";
    },
    getFileUrl(index, name) {
      let url = name + "Icon";
      if (
        this.$refs.fileTable.objData[index]._isDisabled ||
        this.$refs.fileTable.objData[index].recycleBin
      )
        url += "Del";
      url += ".png";
      if (
        name == "xiazai" &&
        (this.$refs.fileTable.objData[index].recycleBin ||
          this.$refs.fileTable.objData[index].isDel)
      )
        return require("../../assets/img/daochu_按钮@2x.png");
      return require("../../assets/img/" + url);
    },
    getFileTop(index, name) {
      let url = name + "Icon";
      if (this.$refs.fileTable.objData[index].isTop) url += "Top";
      url += ".png";
      return require("../../assets/img/" + url);
    },
    selectAllFile(state) {
      let num = 0;
      for (let item in this.$refs.fileTable.objData) {
        if (!this.$refs.fileTable.objData[item]._isDisabled) {
          this.$refs.fileTable.objData[item]._isChecked = state;
          num++;
        }
      }
      this.fileIsSelectd = num != 0 ? state : false;
      this.fileChosenNum = state ? num : 0;
    },
    fileIsSelect(selection) {
      let item,
        num = 0;
      for (item in this.$refs.fileTable.objData) {
        if (!this.$refs.fileTable.objData[item]._isDisabled) num++;
      }
      this.fileChosenNum = selection.length;
      this.fileIsSelectd = selection.length ? true : false;
      this.fileIsAllSelectd = selection.length == num ? true : false;
    },
    downloadFile(row, index) {
      if (row.recycleBin) {
        this.fileList[index].recycleBin = false;
        this.restoreModal = true;
      } else {
        //下载
      }
    },
    fileTab(name) {
      this.fileChosen = name;
      if (name == "delete") {
        this.file[10] = {
          title: "状态",
          slot: "expire",
          align: "center",
          render: (h, params) => {
            if (params.row.isDel) return h("div", {}, "已过期");
            else
              return h(
                "div",
                { style: { color: "#ED382A !important" } },
                params.row.expire + "天后过期"
              );
          },
        };
      } else {
        this.file[10] = {
          title: "备注",
          slot: "remarks",
          align: "center",
          width: 200,
          render: (h, params) => {
            let text = params.row.remarks;
            let toolText = text;
            let a = (180 / 1536) * this.screenWidth;
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
                    },
                    on: {
                      dblclick: () => {
                        if (
                          !this.$refs.fileTable.objData[params.index]
                            ._isDisabled
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
                    //这个中括号表示是Tooltip标签的子标签
                    //表格列显示文字
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
                              !this.$refs.fileTable.objData[params.index]
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
                          width: a + "px",
                          whiteSpace: "normal",
                          wordBreak: "break-all",
                          maxHeight: "25rem",
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
                      this.fileList[params.index].remarks = e.target.value;
                      this.editIndex = -1;
                    },
                    "on-blur": (e) => {
                      this.fileList[params.index].remarks = e.target.value;
                      this.editIndex = -1;
                    },
                  },
                },
                text
              );
            }
          },
        };
      }
      var colsWithId = this.$refs.fileTable.makeColumnsId(this.file);
      this.$refs.fileTable.cloneColumns = this.$refs.fileTable.makeColumns(
        colsWithId
      );
    },
    //镜像文件相关函数
    deleteMirror(row, index) {
      //删除
      if (this.mirrorChosen == "all") {
        if (confirm("确认要移入回收站吗?")) {
          if (this.$refs.mirrorTable.objData[index]._isChecked)
            this.mirrorChosenNum--;
          this.mirrorList[index].recycleBin = true;
        }
      } else if (this.mirrorChosen == "delete") {
        if (confirm("确认要删除吗?")) {
          if (this.$refs.mirrorTable.objData[index]._isChecked)
            this.mirrorChosenNum--;
          this.mirrorList[index].isDel = true;
        }
      }
    },
    deleteAllMirror() {
      //删除选中
      if (this.mirrorChosen == "all") {
        if (confirm("确认要移入到回收站吗?")) {
          for (let item in this.$refs.mirrorTable.objData) {
            if (this.$refs.mirrorTable.objData[item]._isChecked) {
              this.mirrorList[item].recycleBin = true;
            }
          }
          this.mirrorChosenNum = 0;
          this.mirrorIsSelectd = false;
          this.mirrorIsAllSelectd = false;
        }
      } else if (this.mirrorChosen == "delete") {
        if (confirm("确认要删除吗?")) {
          for (let item in this.$refs.mirrorTable.objData) {
            if (this.$refs.mirrorTable.objData[item]._isChecked) {
              this.mirrorList[item].isDel = true;
            }
          }
          this.mirrorChosenNum = 0;
          this.mirrorIsSelectd = false;
          this.mirrorIsAllSelectd = false;
        }
      }
    },
    mirrorRowClassName(row, index) {
      //删除后class
      if (this.$refs.mirrorTable.objData[index]._isDisabled) {
        return "disabled";
      } else if (this.$refs.mirrorTable.objData[index].recycleBin) {
        return "recycleBin";
      }
      return "";
    },
    getMirrorUrl(index, name) {
      //删除后Icon的URL
      let url = name + "Icon";
      if (
        this.$refs.mirrorTable.objData[index]._isDisabled ||
        this.$refs.mirrorTable.objData[index].recycleBin
      )
        url += "Del";
      url += ".png";
      if (
        name == "xiazai" &&
        (this.$refs.mirrorTable.objData[index].recycleBin ||
          this.$refs.mirrorTable.objData[index].isDel)
      )
        return require("../../assets/img/daochu_按钮@2x.png");
      return require("../../assets/img/" + url);
    },
    getMirrorTop(index, name) {
      let url = name + "Icon";
      if (this.$refs.mirrorTable.objData[index].isTop) url += "Top";
      url += ".png";
      return require("../../assets/img/" + url);
    },
    selectAllMirror(state) {
      //全选
      let num = 0;
      for (let item in this.$refs.mirrorTable.objData) {
        if (!this.$refs.mirrorTable.objData[item]._isDisabled) {
          this.$refs.mirrorTable.objData[item]._isChecked = state;
          num++;
        }
      }
      this.mirrorIsSelectd = num != 0 ? state : 0;
      this.mirrorChosenNum = state ? num : 0;
    },
    mirrorIsSelect(selection) {
      //单选时操作
      let item,
        num = 0;
      for (item in this.$refs.mirrorTable.objData) {
        if (!this.$refs.mirrorTable.objData[item]._isDisabled) num++;
      }
      this.mirrorChosenNum = selection.length;
      this.mirrorIsSelectd = selection.length ? true : false;
      this.mirrorIsAllSelectd = selection.length == num ? true : false;
    },
    downloadMirror(row, index) {
      if (row.recycleBin) {
        this.mirrorList[index].recycleBin = false;
        this.restoreModal = true;
      } else {
        //下载
      }
    },
    mirrorTab(name) {
      if (this.mirrorChosen == name) return;
      this.mirrorChosen = name;
      if (name == "delete") {
        this.mirror.splice(9, 0, this.mirror[9]);
        this.mirror[10] = {
          title: "状态",
          slot: "expire",
          align: "center",
          render: (h, params) => {
            if (params.row.isDel) return h("div", {}, "已过期");
            else
              return h(
                "div",
                { style: { color: "#ED382A !important" } },
                params.row.expire + "天后过期"
              );
          },
        };
      } else {
        console.log("i");
        this.mirror.splice(10, 1);
      }
      var colsWithId = this.$refs.mirrorTable.makeColumnsId(this.mirror);
      this.$refs.mirrorTable.cloneColumns = this.$refs.mirrorTable.makeColumns(
        colsWithId
      );
    },
    //自定义数据过滤器
    fileDataFilter(dataList) {
      let list = [];
      for (let item in dataList) {
        if (
          (dataList[item].isDel || dataList[item].recycleBin) &&
          this.fileChosen == "delete"
        )
          list.push(dataList[item]);
        else if (
          !dataList[item].isDel &&
          !dataList[item].recycleBin &&
          this.fileChosen == "all"
        )
          list.push(dataList[item]);
      }
      if (this.fileChosen == "delete") {
        this.$nextTick(() => {
          for (let item in this.$refs.fileTable.objData) {
            if (this.$refs.fileTable.objData[item].isDel)
              this.$refs.fileTable.objData[item]._isDisabled = true;
          }
        });
      }
      if (list.length == 0) this.fileUrlType = 3;
      return list;
    },
    mirrorDataFilter(dataList) {
      let list = [];
      for (let item in dataList) {
        if (
          (dataList[item].isDel || dataList[item].recycleBin) &&
          this.mirrorChosen == "delete"
        )
          list.push(dataList[item]);
        else if (
          !dataList[item].isDel &&
          !dataList[item].recycleBin &&
          this.mirrorChosen == "all"
        )
          list.push(dataList[item]);
      }
      if (this.mirrorChosen == "delete") {
        this.$nextTick(() => {
          for (let item in this.$refs.mirrorTable.objData) {
            if (this.$refs.mirrorTable.objData[item].isDel)
              this.$refs.mirrorTable.objData[item]._isDisabled = true;
          }
        });
      }
      if (list.length == 0) this.mirrorUrlType = 3;
      return list;
    },
  },
  computed:{
    i18n(){
      return this.$t("index.File");
    }
  }
};
</script>

<style lang="scss" scoped>
.col-card {
  overflow: hidden;
  /deep/ .ivu-card-head {
    height: 2.8125rem;
    padding: .3125rem 0;
  }
  /deep/ .ivu-card-body {
    height: 2.1875rem;
    padding: 0 0 1rem 0;
  }
  /deep/ .ivu-table {
    .ivu-table-cell {
      padding: 0;
      width:100%;
      div{
        display:inline-block;
      }
    }
  }
  /deep/.ivu-table td,
  /deep/.ivu-table th {
    height: 2.3125rem;
  }
  /deep/ .ivu-table .disabled td {
    color: #d8d8d8 !important;
    position: relative;
    /deep/ .ivu-table-cell div {
      color: #d8d8d8 !important;
    }
  }

  /deep/ .ivu-table .recycleBin td {
    color: #959595 !important;
    position: relative;
    /deep/ .ivu-table-cell div {
      color: #959595 !important;
    }
  }

  /deep/ .ivu-table-tip {
    .tipImg {
      width: 15%;
    }
    .tipTxt {
      font-size: .75rem;
    }
  }
}
.Title {
  font-size: 1.125rem;
  .tableTitle {
    display: inline-block;
    margin-top: .4375rem;
    margin-left: .625rem;
  }
  .ivu-tabs {
    top: .25rem;
  }
  .titleTab {
    display: inline-block;
    width: 20%;
    /deep/ .ivu-tabs-ink-bar {
      background-color: #13227a;
    }
    /deep/ .ivu-tabs-nav .ivu-tabs-tab-active {
      color: #13227a;
    }
    /deep/ .ivu-tabs-nav .ivu-tabs-tab:hover {
      color: #13227a;
    }
  }
  /deep/ .ivu-radio-group {
    border: .0625rem solid #e9e9e9;
    border-color: #e9e9e9;
    border-radius: 1.25rem;
    .ivu-radio-wrapper {
      color: #666666;
      border: none;
      border-radius: 1.25rem;
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
      border-radius: 1.25rem;
    }
  }
  /deep/ .ivu-table-tip {
    .tipImg {
      width: 15%;
    }
    .tipTxt {
      font-size: .75rem;
    }
  }
}

.deleteIcon {
  position: absolute;
  width: 1.875rem;
  height: 1.875rem;
  // float: right;
  left: -2.1875rem;
  top: 0;
}
.ivu-table::before {
  display: none;
}
/deep/ .ivu-breadcrumb {
  color: #333333;
  span:last-child {
    color: #13227a;
    font-weight: 700;
  }
}
.footer {
  .footerBtn.ivu-btn {
    margin-right: 1.25rem;
    border-radius: 1.25rem;
    display: inline-block;
    color: #ffffff;
    background: #13227a;
  }
  .footerBtn.ivu-btn[disabled] {
    background: #b1b4ca;
  }
  .Del.ivu-btn {
    color: #999999 !important;
    background: #ffffff;
  }
  .Del.ivu-btn[disabled] {
    background: #eaebef;
  }
  .ivu-checkbox-wrapper {
    margin-left: .3125rem;
  }
}

.restore {
  /deep/ .ivu-modal {
    width: 25rem !important;
  }
  /deep/ .ivu-modal-header {
    border: 0;
  }
  .restoreTitle {
    font-size: 1.125rem;
    font-weight: 600;
    text-align: center;
  }
  .restoreContent {
    text-align: center;
    padding: .5rem 0;
  }
  .restoreBtn {
    width: 7.5rem;
    height: 2.5rem;
    background: #13227a;
    border-radius: 1.25rem;
    color: #ffffff;
  }
  /deep/ .ivu-modal-footer {
    text-align: center;
    border: 0;
  }
}

/deep/ .ivu-table:before {
  display: none;
}
/deep/ .ivu-btn-text[disabled]:hover {
  background-color: #ffffff;
}
/deep/ .ivu-btn-text:hover {
  background-color: #ebf7ff;
}
/deep/ .ivu-spin-fix {
  background-color: rgba(255, 255, 255, 0.5);
}
</style>