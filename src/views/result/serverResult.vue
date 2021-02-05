<template>
  <div>
    <Breadcrumb
      :style="{ marginLeft: (30 / 1080) * screenHeight + 'px' }"
      separator="-"
    >
      <BreadcrumbItem>结果总览</BreadcrumbItem>
      <BreadcrumbItem>服务器总览</BreadcrumbItem>
    </Breadcrumb>
    <Card
      class="col-card"
      :style="
        'height:' +
        (578 / 1080) * screenHeight +
        'px;margin:' +
        (30 / 1080) * screenHeight +
        'px;margin-top:0;'
      "
    >
      <h2 slot="title" class="Title">
        <span class="tableTitle">服务器概览</span>
        <div
          style="
            float: right;
            font-size: 12px;
            margin-top: 10px;
            padding: 0 5px;
          "
          @click="refreshServer()"
        >
          <img
            src="../../assets/img/shuaxin_icon@2x.png"
            alt=""
            style="height: 14px; float: left"
          />
          <div style="height: 14px; line-height: 14px; float: left"></div>
        </div>
        <RadioGroup v-model="serverChosen" type="button" style="float: right">
          <Radio label="GPU">GPU({{ serverChosenNum }})</Radio>
          <Radio label="CPU">CPU({{ serverChosenNum }})</Radio>
        </RadioGroup>
      </h2>
      <Table
        :columns="server"
        :data="serverList"
        ref="serverTable"
        @on-selection-change="serverIsSelect"
        :height="(520 / 1080) * screenHeight"
        :no-data-text="defaultUrl(serverUrlType)"
        :loading="serverLoading"
      >
        <template slot-scope="{ row, index }" slot="top">
          <img
            :src="getServerTop(index, 'zhiding')"
            style="width: 18px; height: 18px"
            @click="isServerTop(row, index)"
          />
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="text"
            size="small"
            style="margin-right: 5px; color: #13227a"
            :disabled="
              $refs.serverTable && $refs.serverTable.objData[index]._isDisabled
            "
            @click="deleteServer(row, index)"
            ><img
              src="../../assets/img/shanchuIcon.png"
              alt=""
              style="width: 18px; height: 18px"
          /></Button>
          <Button
            type="text"
            size="small"
            style="margin-right: 5px; color: #13227a"
            :disabled="
              $refs.serverTable && $refs.serverTable.objData[index]._isDisabled
            "
            ><Icon type="ios-play"
          /></Button>
          <Button
            type="text"
            size="small"
            style="margin-right: 5px; color: #13227a"
            :disabled="
              $refs.serverTable && $refs.serverTable.objData[index]._isDisabled
            "
            @click.native="createMirror(row, index)"
            ><img
              src="../../assets/img/创建镜像@2x.png"
              alt=""
              style="width: 18px; height: 18px"
          /></Button>
        </template>

        <div slot="footer" class="footer">
          <Checkbox
            style="display: inline-block"
            @on-change="selectAllServer"
            v-model="serverIsAllSelectd"
            >全选</Checkbox
          >
          <div style="display: inline-block; float: right">
            共选中任务{{ serverChosenNum }}条,总计费￥432.00元
            <Button
              class="footerBtn Del"
              :disabled="!serverIsSelectd"
              @click.native="deleteAllServer()"
              ><img
                src="../../assets/img/shanchuIconDel.png"
                style="width: 16px"
              />删除</Button
            >
            <Button
              type="primary"
              class="footerBtn"
              :disabled="!serverIsSelectd"
              ><img
                src="../../assets/img/xiazaiIconWhite.png"
                style="width: 16px"
              />下载</Button
            >
          </div>
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
        <span class="tableTitle">镜像概览</span>
        <div
          style="
            float: right;
            font-size: 12px;
            margin-top: 10px;
            padding: 0 5px;
          "
        >
          <img
            src="../../assets/img/shuaxin_icon@2x.png"
            alt=""
            style="height: 14px; float: left"
          />
          <div style="height: 14px; line-height: 14px; float: left"></div>
        </div>
        <RadioGroup v-model="mirrorChosen" type="button" style="float: right">
          <Radio label="GPU">GPU({{ serverChosenNum }})</Radio>
          <Radio label="CPU">CPU({{ serverChosenNum }})</Radio>
        </RadioGroup>
      </h2>
      <Table
        :columns="mirror"
        :data="mirrorList"
        ref="mirrorTable"
        @on-selection-change="mirrorIsSelect"
        :height="(375 / 1080) * screenHeight"
        :no-data-text="defaultUrl(mirrorUrlType)"
      >
        <template slot-scope="{ row, index }" slot="top">
          <img
            :src="getMirrorTop(index, 'zhiding')"
            style="width: 18px; height: 18px"
            @click="isMirrorTop(row, index)"
          />
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="text"
            size="small"
            style="margin-right: 5px; color: #13227a"
            :disabled="
              $refs.mirrorTable && $refs.mirrorTable.objData[index]._isDisabled
            "
            @click.native="deleteMirror(row, index)"
            ><img
              src="../../assets/img/shanchuIcon.png"
              alt=""
              style="width: 18px; height: 18px"
          /></Button>
          <Button
            type="text"
            size="small"
            style="margin-right: 5px; color: #13227a"
            :disabled="
              $refs.mirrorTable && $refs.mirrorTable.objData[index]._isDisabled
            "
            ><img
              src="../../assets/img/chongqiIcon.png"
              alt=""
              style="width: 18px; height: 18px"
          /></Button>
        </template>

        <div slot="footer" class="footer">
          <Checkbox
            style="display: inline-block"
            @on-change="selectAllMirror"
            v-model="mirrorIsAllSelectd"
            >全选</Checkbox
          >
          <div style="display: inline-block; float: right">
            共选中任务{{ mirrorChosenNum }}条,总计费￥432.00元
            <Button
              class="footerBtn Del"
              :disabled="!mirrorIsSelectd"
              @click.native="deleteAllMirror()"
              ><img
                src="../../assets/img/shanchuIconDel.png"
                style="width: 16px"
              />删除</Button
            >
            <Button
              type="primary"
              class="footerBtn"
              :disabled="!mirrorIsSelectd"
              ><img
                src="../../assets/img/xiazaiIconWhite.png"
                style="width: 16px"
              />下载</Button
            >
          </div>
        </div>
      </Table>
    </Card>
    <Modal v-model="createMirrorModal" title="" class="createMirror">
      <template slot="header">
        <div class="createMirrorTitle">创建个人镜像</div>
      </template>
      个人镜像名称:<Input placeholder="" class="createMirrorInput"></Input>
      <template slot="footer">
        <Button class="createMirrorBtn">保存镜像</Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import { getMachineSummary } from "@/api/info";
export default {
  data() {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      serverChosenNum: 0,
      serverChosen: "GPU",
      serverIsSelectd: false,
      serverIsAllSelectd: false,
      serverList: [],
      serverPage: 1,
      serverLoading: false,
      hasSelectServers: [],
      serverUrlType: 1,
      createMirrorModal: false,

      mirrorChosenNum: 0,
      mirrorChosen: "GPU",
      mirrorIsSelectd: false,
      mirrorIsAllSelectd: false,
      mirrorList: [
        {
          mirror_id: 1,
          mirror_name: "DPtech_test_indicate",
          username: "test1",
          IP: "255.255.255.0",
          GPU: "T4*1",
          CPU: "16",
          Memory: "62GB",
          create_time: "2020/08/24 09:07:35",
          isTop: false,
        },
        {
          mirror_id: 2,
          mirror_name: "DPtech_test_indicate",
          username: "test2",
          IP: "255.255.255.0",
          GPU: "T4*1",
          CPU: "16",
          Memory: "62GB",
          create_time: "2020/08/24 09:07:35",
          isTop: false,
        },
        {
          mirror_id: 3,
          mirror_name: "DPtech_test_indicate",
          username: "test2",
          IP: "255.255.255.0",
          GPU: "T4*1",
          CPU: "16",
          Memory: "62GB",
          create_time: "2020/08/24 09:07:35",
          isTop: false,
        },
        {
          mirror_id: 4,
          mirror_name: "DPtech_test_indicate",
          username: "test2",
          IP: "255.255.255.0",
          GPU: "T4*1",
          CPU: "16",
          Memory: "62GB",
          create_time: "2020/08/24 09:07:35",
          isTop: false,
        },
      ],
      mirrorPage: 1,
      mirrorLoading: false,
      hasSelectMirrors: [],
      mirrorUrlType: 1,

      server: [
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
          key: "machine_id",
          tooltip: true,
          sortable: true,
          align: "center",
          width: 80,
        },
        {
          title: "名称",
          key: "server_name",
          tooltip: true,
          sortable: true,
          align: "center",
          width: 80,
        },

        {
          title: "IP",
          key: "ip",
          minWidth: 50,
        },
        {
          title: "用户",
          key: "username",
        },
        {
          title: "GPU",
          key: "gpu",
        },
        {
          title: "CPU",
          key: "cpu_core",
        },
        {
          title: "Memory",
          key: "memory",
        },
        {
          title: "创建时间",
          key: "create_time",
          sortable: true,
          minWidth: 80,
        },
        {
          title: "运行时长",
          key: "alive_time",
          sortable: true,
        },
        {
          title: "累计费用",
          key: "cost",
          sortable: true,
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
                "¥" + params.row.cost
              ),
              h(
                "Tooltip",
                {
                  style: {
                    verticalAlign: "middle",
                    width: "16px",
                    height: "16px",
                    display: "inline-block",
                  },
                  props: {
                    placement: "bottom",
                    theme: "light",
                    transfer: true,
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
                      },
                    },
                    [
                      h("div", {}, "已结算费用: 计算公式"),
                      h("div", {}, "未结算费用: 计算公式"),
                    ]
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
          width: 150,
        },
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
        },
        {
          title: "名称",
          key: "mirror_name",
          minWidth: 80,
        },
        {
          title: "用户",
          key: "username",
        },
        {
          title: "IP",
          key: "IP",
          minWidth: 50,
        },
        {
          title: "GPU",
          key: "GPU",
        },
        {
          title: "CPU",
          key: "CPU",
        },
        {
          title: "Memory",
          key: "Memory",
        },
        {
          title: "创建时间",
          key: "create_time",
          sortable: true,
          minWidth: 80,
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          minWidth: 80,
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
    this.serverLoading = true;
    getMachineSummary()
      .then((res) => {
        this.serverList = res.alive_machines.slice(0, 15);
        this.serverLoading = false;
      })
      .catch((err) => {
        console.log(err);
        this.serverList = [];
        this.serverUrlType = 2;
        this.serverLoading = false;
      });

    this.$nextTick(() => {
      //当数据换行时,实现滚动效果
      for (let item in document.getElementsByClassName("test1")) {
        if (document.getElementsByClassName("test1")[item].scrollHeight > 21)
          document.getElementsByClassName("test1")[item].className =
            "test1 test";
      }
      //server概览滚动加载
      this.$refs.serverTable.$el.addEventListener(
        "scroll",
        (e) => {
          //滚动加载防抖
          if (this.serverLoading) return;
          if (
            Number.parseInt(
              e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
            ) <= 200
          ) {
            this.serverLoading = true;
            getMachineSummary()
              .then((res) => {
                this.serverList.push(
                  ...res.alive_machines.slice(
                    15 * this.serverPage,
                    15 * this.serverPage + 15
                  )
                );
                this.serverPage++;
                this.serverLoading = false;
                this.serverIsAllSelectd = false;
                // 恢复选中 & 删除状态;
                this.serverRestore();
              })
              .catch((err) => {
                console.log(err);
                this.serverLoading = false;
              });
          }
        },
        true
      );
    });
  },
  methods: {
    defaultUrl(type) {
      if (type == 1) {
        return `<img class='tipImg' src=${require("../../assets/img/暂无任务@2x.png")}><div class='tipTxt'>暂无任务</div>`;
      } else if (type == 2) {
        return `<img class='tipImg' src=${require("../../assets/img/网络错误@2x.png")}><div class='tipTxt'>网络错误</div>`;
      } else if (type == 3) {
        return `<img class='tipImg' src=${require("../../assets/img/无搜索内容@2x.png")}><div class='tipTxt'>无搜索结果</div>`;
      } else if (type == 4) {
        return `<img class='tipImg' src=${require("../../assets/img/无权限@2x.png")}><div class='tipTxt'>无权限</div>`;
      } else if (type == 5) {
        return `<img class='tipImg' src=${require("../../assets/img/404@2x.png")}><div class='tipTxt'>404报错</div>`;
      }
    },

    // 恢复选中状态;
    serverRestore() {
      setTimeout(() => {
        let obj = this.$refs.serverTable.objData;
        for (let item in obj) {
          if (this.hasSelectServers.indexOf(obj[item].machine_id) != -1) {
            obj[item]._isChecked = true;
          }
        }
      }, 0);
    },
    //镜像文件相关函数
    deleteServer(row, index) {
      //删除
      if (confirm("确认要删除吗?")) {
        if (this.$refs.serverTable.objData[index]._isChecked) {
          this.serverChosenNum--;
          this.hasSelectServers.splice(
            this.hasSelectServers.indexOf(row.machine_id),
            1
          );
        }
        this.serverList.splice(index, 1);
        this.serverRestore();
      }
    },
    deleteAllServer() {
      //删除选中
      if (confirm("确认要删除吗?")) {
        let delNum = 0;
        for (let item in this.$refs.serverTable.objData) {
          if (this.$refs.serverTable.objData[item]._isChecked) {
            this.serverList.splice(item - delNum, 1);
            delNum++;
          }
        }
        this.hasSelectServers = [];
        this.serverChosenNum = 0;
        this.serverIsSelectd = false;
        this.serverIsAllSelectd = false;
        this.serverRestore();
      }
    },

    getServerTop(index, name) {
      let url = name + "Icon";
      if (this.$refs.serverTable?.objData[index].isTop) url += "Top";
      url += ".png";
      return require("../../assets/img/" + url);
    },
    selectAllServer(state) {
      //全选
      let num = 0,
        hasSelect = [];
      for (let item in this.$refs.serverTable.objData) {
        if (!this.$refs.serverTable.objData[item]._isDisabled) {
          this.$refs.serverTable.objData[item]._isChecked = state;
          num++;
          hasSelect.push(this.$refs.serverTable.objData[item].machine_id);
        }
      }
      this.hasSelectServers = state ? hasSelect : [];
      this.serverIsSelectd = num != 0 ? state : 0;
      this.serverChosenNum = state ? num : 0;
    },
    serverIsSelect(selection) {
      //单选
      let item,
        num = 0;
      for (item in this.$refs.serverTable.objData) {
        if (!this.$refs.serverTable.objData[item]._isDisabled) {
          num++;
          if (this.$refs.serverTable.objData[item]._isChecked) {
            // cost += this.$refs.serverTable.objData[item].cost;
            if (
              this.hasSelectServers.indexOf(
                this.$refs.serverTable.objData[item].machine_id
              ) == -1
            )
              this.hasSelectServers.push(
                this.$refs.serverTable.objData[item].machine_id
              );
          } else {
            if (
              this.hasSelectServers.indexOf(
                this.$refs.serverTable.objData[item].machine_id
              ) != -1
            )
              this.hasSelectServers.splice(
                this.hasSelectServers.indexOf(
                  this.$refs.serverTable.objData[item].machine_id
                ),
                1
              );
          }
        }
      }
      this.serverChosenNum = selection.length;
      this.serverIsSelectd = selection.length ? true : false;
      this.serverIsAllSelectd = selection.length == num ? true : false;
    },
    refreshServer() {
      this.serverLoading = true;
      getMachineSummary()
        .then((res) => {
          this.serverList = res.alive_machines.slice(0, 15);
          document.getElementsByClassName("ivu-table-body")[0].scroll(0, 0);
          this.serverLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.serverList = [];
          this.serverUrlType = 2;
          this.serverLoading = false;
        });
    },
    createMirror(row, index) {
      this.createMirrorModal = true;
    },
    //镜像文件相关函数
    //恢复选中状态
    mirrorRestore() {
      setTimeout(() => {
        let obj = this.$refs.mirrorTable.objData;
        for (let item in obj) {
          if (this.hasSelectMirrors.indexOf(obj[item].mirror_id) != -1) {
            obj[item]._isChecked = true;
          }
        }
      }, 0);
    },
    deleteMirror(row, index) {
      //删除
      if (confirm("确认要删除吗?")) {
        if (this.$refs.mirrorTable.objData[index]._isChecked) {
          this.mirrorChosenNum--;
          this.hasSelectMirrors.splice(
            this.hasSelectMirrors.indexOf(row.mirror_id),
            1
          );
        }
        this.mirrorList.splice(index, 1);
        // 恢复选中 & 删除状态;
        this.mirrorRestore();
      }
    },
    deleteAllMirror() {
      //删除选中
      if (confirm("确认要删除吗?")) {
        let delNum = 0;
        for (let item in this.$refs.mirrorTable.objData) {
          if (this.$refs.mirrorTable.objData[item]._isChecked) {
            this.mirrorList.splice(item - delNum, 1);
            delNum++;
          }
        }
        console.log(this.mirrorList);
        this.hasSelectMirrors = [];
        this.mirrorChosenNum = 0;
        this.mirrorIsSelectd = false;
        this.mirrorIsAllSelectd = false;
        // 恢复选中 & 删除状态;
        this.mirrorRestore();
      }
    },
    getMirrorTop(index, name) {
      let url = name + "Icon";
      if (this.$refs.mirrorTable?.objData[index].isTop) url += "Top";
      url += ".png";
      return require("../../assets/img/" + url);
    },
    selectAllMirror(state) {
      //全选
      let num = 0,
        hasSelect = [];
      for (let item in this.$refs.mirrorTable.objData) {
        if (!this.$refs.mirrorTable.objData[item]._isDisabled) {
          this.$refs.mirrorTable.objData[item]._isChecked = state;
          num++;
          hasSelect.push(this.$refs.mirrorTable.objData[item].mirror_id);
        }
      }
      this.hasSelectMirrors = state ? hasSelect : [];
      this.mirrorIsSelectd = num != 0 ? state : 0;
      this.mirrorChosenNum = state ? num : 0;
    },
    mirrorIsSelect(selection) {
      //单选时操作
      let item,
        num = 0;
      for (item in this.$refs.mirrorTable.objData) {
        if (!this.$refs.mirrorTable.objData[item]._isDisabled) {
          num++;
          if (this.$refs.mirrorTable.objData[item]._isChecked) {
            // cost += this.$refs.serverTable.objData[item].cost;
            if (
              this.hasSelectMirrors.indexOf(
                this.$refs.mirrorTable.objData[item].mirror_id
              ) == -1
            )
              this.hasSelectMirrors.push(
                this.$refs.mirrorTable.objData[item].mirror_id
              );
          } else {
            if (
              this.hasSelectMirrors.indexOf(
                this.$refs.mirrorTable.objData[item].mirror_id
              ) != -1
            )
              this.hasSelectMirrors.splice(
                this.hasSelectMirrors.indexOf(
                  this.$refs.mirrorTable.objData[item].machine_id
                ),
                1
              );
          }
        }
      }
      this.mirrorChosenNum = selection.length;
      this.mirrorIsSelectd = selection.length ? true : false;
      this.mirrorIsAllSelectd = selection.length == num ? true : false;
    },
    isServerTop(row, index) {
      this.serverList[index].isTop = !this.serverList[index].isTop;
      let a = this.serverList.splice(index, 1);
      for (let item in this.serverList) {
        if (!this.serverList[item].isTop) {
          let b = this.serverList.slice(0, item);
          b.push(a[0]);
          this.serverList = b.concat(this.serverList.slice(item));
          return;
        }
      }
      this.serverList.push(a[0]);
    },
    isMirrorTop(row, index) {
      this.mirrorList[index].isTop = !this.mirrorList[index].isTop;
      let a = this.mirrorList.splice(index, 1);
      for (let item in this.mirrorList) {
        if (!this.mirrorList[item].isTop) {
          let b = this.mirrorList.slice(0, item);
          b.push(a[0]);
          this.mirrorList = b.concat(this.mirrorList.slice(item));
          return;
        }
      }
      this.mirrorList.push(a[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.col-card {
  overflow: hidden;
  /deep/ .ivu-card-head {
    height: 35px;
    padding: 0;
  }
  /deep/ .ivu-card-body {
    height: 35px;
    padding-top: 0;
  }
  /deep/ .ivu-table-wrapper {
  }
  /deep/ .ivu-table {
    /deep/.ivu-table-cell {
      padding: 0;
    }
  }
  /deep/.ivu-table td,
  /deep/.ivu-table th {
    height: 37px;
  }
  /deep/ .ivu-table .disabled td {
    color: #d8d8d8 !important;
    position: relative;
    /deep/ .ivu-table-cell div {
      color: #d8d8d8 !important;
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
}

.footer {
  border-top: 1px solid #ebebeb;
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
    color: #999999 !important;
    background: #ffffff;
  }
  .Del.ivu-btn[disabled] {
    background: #eaebef;
  }
  .ivu-checkbox-wrapper {
    margin-left: 9px;
  }
}
.Title {
  font-size: 18px;
  .tableTitle {
    display: inline-block;
    margin-top: 7px;
    margin-left: 10px;
  }
  /deep/ .ivu-radio-group {
    border: 1px solid #e9e9e9;
    border-color: #e9e9e9;
    border-radius: 20px;
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
}
.deleteIcon {
  position: absolute;
  width: 30px;
  height: 30px;
  float: right;
  right: 0;
  top: 0;
}

.createMirror {
  /deep/ .ivu-modal-body {
    padding: 20px 50px;
  }
  .createMirrorTitle {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
  .createMirrorInput {
    width: 50%;
  }
  .createMirrorBtn {
    width: 120px;
    height: 40px;
    background: #13227a;
    border-radius: 20px;
    color: #ffffff;
  }
  /deep/ .ivu-modal-footer {
    text-align: center;
  }
}

/deep/ .ivu-table:before {
  display: none;
  color: #13227a;
}
/deep/ .ivu-btn-text:hover {
  background-color: #ebf7ff;
}
/deep/ .ivu-spin-fix {
  background-color: rgba(255, 255, 255, 0.5);
}
/deep/ .ivu-breadcrumb {
  color: #333333;
  span:last-child {
    color: #13227a;
    font-weight: 700;
  }
}
</style>