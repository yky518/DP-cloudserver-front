<template>
  <div id="export">
    <div class="export_title">
      {{i18n.您导出的文件生成后暂存在平台上七天后会自动删除}}
    </div>
    <Table
      :columns="exportRecord"
      :data="exportList"
      :height="(770 / 1080) * screenHeight + 'px'"
      :no-data-text="defaultUrl(exportUrlType)"
    >
      <template slot="action">
        <img
          style="width: 16px"
          src="../../../assets/img/xiazaiIcon.png"
          alt=""
        />
      </template>
    </Table>
    <Page style="text-align: center; margin-top: 20px"></Page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exportUrlType:1,
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
      exportRecord: [
        {
          title: "文件名",
          key: "fileName",
          minWidth: 240,
          renderHeader: (h) => {
            return h("div", {}, this.i18n.文件名);
          },
        },
        {
          title: "类型",
          key: "type",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.类型);
          },
        },
        {
          title: "格式",
          key: "format",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.格式);
          },
        },
        {
          title: "状态",
          key: "state",
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.状态);
          },
        },
        {
          title: "创建时间",
          key: "create_time",
          minWidth: 60,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.创建时间);
          },
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          width: 90,
          align:"center",
          renderHeader: (h) => {
            return h("div", {}, this.i18n.操作);
          },
        },
      ],
      exportList: [
        {
          fileName: "1761286239356625-20201109134900_res_consume_detail",
          type: "计费项消费明细",
          format: "CSV",
          state: "已过期",
          create_time: "2020-11-09 13:49:00",
        },
        {
          fileName: "1761286239356625-20201109134900_res_consume_detail",
          type: "计费项消费明细",
          format: "CSV",
          state: "已过期",
          create_time: "2020-11-09 13:49:00",
        },
        {
          fileName: "1761286239356625-20201109134900_res_consume_detail",
          type: "计费项消费明细",
          format: "CSV",
          state: "已过期",
          create_time: "2020-11-09 13:49:00",
        },
        {
          fileName: "1761286239356625-20201109134900_res_consume_detail",
          type: "计费项消费明细",
          format: "CSV",
          state: "已过期",
          create_time: "2020-11-09 13:49:00",
        },
        {
          fileName: "1761286239356625-20201109134900_res_consume_detail",
          type: "计费项消费明细",
          format: "CSV",
          state: "已过期",
          create_time: "2020-11-09 13:49:00",
        },
      ],
    };
  },
  created() {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        this.screenHeight = window.fullHeight; // 高
        this.screenWidth = window.fullWidth; // 宽
      })();
    };
  },
  computed:{
    i18n(){
      return this.$t("index.Export");
    }
  },
  methods: {
    defaultUrl(type) {
      if (type == 1) {
        return `<img class='tipImg' src=${require("../../../assets/img/暂无任务@2x.png")}><div class='tipTxt'>${this.$t("index.Default.暂无任务")}</div>`;
      } else if (type == 2) {
        return `<img class='tipImg' src=${require("../../../assets/img/网络错误@2x.png")}><div class='tipTxt'>${this.$t("index.Default.网络错误")}</div>`;
      } else if (type == 3) {
        return `<img class='tipImg' src=${require("../../../assets/img/无搜索内容@2x.png")}><div class='tipTxt'>${this.$t("index.Default.无搜索结果")}</div>`;
      } else if (type == 4) {
        return `<img class='tipImg' src=${require("../../../assets/img/无权限@2x.png")}><div class='tipTxt'>${this.$t("index.Default.无权限")}</div>`;
      } else if (type == 5) {
        return `<img class='tipImg' src=${require("../../../assets/img/404@2x.png")}><div class='tipTxt'>${this.$t("index.Default.404报错")}</div>`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#export {
  /deep/ .ivu-table-tip {
    .tipImg {
      width: 15%;
    }
    .tipTxt {
      font-size: 12px;
    }
  }
  .export_title {
    font-size: 12px;
    color: #13227a;
    margin-bottom: 20px;
  }
  /deep/ .ivu-table-body {
    font-size: 12px;
  }
}
</style>