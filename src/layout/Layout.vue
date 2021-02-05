<template>
  <Layout :style="{ minHeight: '100vh' }">
    <!-- <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',
      position: 'fixed', paddingLeft: '0', width: '100%', zIndex: '100'}">
        <TopMenu :is-collapsed="isCollapsed" @toggle-collapse="$refs.sider.toggleCollapse();">
        </TopMenu>
      </Header> -->
    <layout>
      <Icon
        @click.native="collapsedSider"
        :class="rotateIcon"
        :style="{
          lineHeight: '30px',
          position: 'fixed',
          top: 0,
          left: isCollapsed ? '0px' : '200px',
        }"
        type="md-menu"
        size="24"
      ></Icon>
      <!-- <div ref="notice" :class="noticeIcon" @click="hideNotice()" v-drag>
        <Badge dot class="noticeBadge">
          <Icon type="ios-notifications-outline" size="26"></Icon>
        </Badge>
      </div> -->
      <div ref="notice" class="showNotice" @click="isShowDrawer = true">
        <Badge :dot="newNotice" class="noticeBadge">
          <Icon type="ios-notifications-outline" size="20" />
        </Badge>
      </div>
      <div ref="notice" class="helpDoc" @click="isShowHelpDoc = true">
        <img class="helpIcon" src="../assets/img/wenti_icon@2x.png" alt="" />
      </div>
      <Sider
        ref="sider"
        hide-trigger
        class="sider"
        collapsible
        :collapsed-width="0"
        v-model="isCollapsed"
        :style="{
          weight: '200px',
          position: 'fixed',
          top: '0px',
          left: 0,
          overflow: 'auto',
          backgroundColor: '#fff',
          zIndex: '10',
        }"
      >
        <LeftMenu :is-collapsed="isCollapsed"></LeftMenu>
      </Sider>
      <Content :style="{ marginLeft: isCollapsed ? '0px' : '200px' }">
        <router-view ref="routerView"></router-view>
      </Content>
      <Drawer
        v-model="isShowDrawer"
        :closable="false"
        class="noticeDrawer"
        @on-visible-change="drawerChange"
      >
        <template slot="header">
          <div class="noticeHeader">
            <span class="noticeTitle">通知({{ notice.length }})</span>
            <span class="noticeHasRead" @click="readAllNotice()"
              >全部标为已读</span
            >
          </div>
        </template>
        <Tabs
          size="small"
          v-model="noticeTabName"
          @on-click="noticeTab"
          class="noticeTab"
          ref="noticeTab"
        >
          <TabPane name="" label="全部"></TabPane>
          <TabPane name="error" label="警告"></TabPane>
          <TabPane name="warning" label="提醒"></TabPane>
        </Tabs>
        <div
          v-for="(item, index) in noticeList(noticeTabName)"
          :key="index"
          ref="noticeItem"
          class="noticeList"
          @click="readNotice(item, index)"
        >
          <img :src="noticeIcon(item.type)" alt="" class="noticeIcon" />
          <div class="noticeMain">
            <div class="noticeContent" ref="noticeContent">
              {{ item.content }}
            </div>
            <div class="noticeDate">{{ item.date }}</div>
            <span
              class="noticeUnfold"
              v-show="needUnfold(index)"
              @click="unfold(index)"
              >展开</span
            >
          </div>
          <Badge color="red" v-if="!item.hasRead" class="noticeBadge" />
        </div>
      </Drawer>
      <Modal
        v-model="isShowHelpDoc"
        draggable
        scrollable
        footer-hide
        :transfer="false"
        lock-scroll
        class="helpDocModal"
        ref="helpDocModal"
      >
        <template slot="header" ref="noticeHeader">
          <div class="noticeHeader">
            <span class="noticeTitle">帮助文档</span>
          </div>
        </template>
          <div id="topLine"></div>
        <div id="leftLine"></div>
        <div id="rightLine"></div>
        <div id="bottomLine"></div>
        <helpDoc></helpDoc>
      </Modal>
    </layout>
  </Layout>
</template>

<script>
import TopMenu from "@/components/TopMenu.vue";
import LeftMenu from "@/components/LeftMenu.vue";
import helpDoc from "@/components/helpDoc.vue";
export default {
  name: "MyLayout",
  mounted() {
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        this.screenHeight = window.fullHeight; // 高
        this.screenWidth = window.fullWidth; // 宽
      })();
    };
    if (!this.notice[0].hasRead) this.newNotice = true;
    let leftLine = document.getElementById("leftLine");
    let rightLine = document.getElementById("rightLine");
    let bottomLine = document.getElementById("bottomLine");
    let topLine = document.getElementById("topLine");
    this.$refs.helpDocModal.$el.children[0].children[0].children[0].style.width =
      "360px";
    this.$refs.helpDocModal.$el.children[0].children[0].children[0].style.left =
      this.screenWidth - 360 + "px";
    this.$refs.helpDocModal.$el.children[0].children[0].children[0].style.top =
      this.screenHeight * 0.05 + "px";
    leftLine.addEventListener("mousedown", (e) => {
      document.onmousemove = (e) => {
        e.preventDefault();
        
        let dom = this.$refs.helpDocModal.$el.children[0].children[0]
          .children[0];
        if (
          (dom.clientWidth + Number.parseInt(dom.style.left.slice(0, -2)) > this.screenWidth - 5 && e.movementX < 0) ||
          (dom.clientWidth < 300 && e.movementX > 0)||e.clientX <= 0
        )
          return;
        dom.style.width = dom.clientWidth - e.movementX*0.75 + "px";
        dom.style.left =
          Number.parseInt(dom.style.left.slice(0, -2)) + e.movementX*0.75 + "px";
      };
      document.addEventListener("mouseup", () => {
        document.onmousemove = null;
        document.onmouseup = null;
      });
    });

    rightLine.addEventListener("mousedown", (e) => {
      document.onmousemove = (e) => {
        e.preventDefault();
        let dom = this.$refs.helpDocModal.$el.children[0].children[0]
          .children[0];
        if (
          (dom.clientWidth + Number.parseInt(dom.style.left.slice(0, -2)) > this.screenWidth - 5 && e.movementX > 0) ||
          (dom.clientWidth < 300 && e.movementX < 0)||e.clientX >= this.screenWidth
        )
          return;
        dom.style.width = dom.clientWidth + e.movementX + "px";
      };
      document.addEventListener("mouseup", () => {
        document.onmousemove = null;
        document.onmouseup = null;
      });
    });

    bottomLine.addEventListener("mousedown", (e) => {
      document.onmousemove = (e) => {
        e.preventDefault();
        let dom = this.$refs.helpDocModal.$el.children[0].children[0]
          .children[0];
        if (
          (dom.clientHeight + Number.parseInt(dom.style.top.slice(0, -2)) >
            this.screenHeight -2 &&
            e.movementY > 0) ||
          (dom.clientHeight < 400 && e.movementY < 0) || e.clientY >= this.screenHeight
        )
          return;
        dom.style.height = dom.clientHeight + e.movementY + "px";
      };

      document.addEventListener("mouseup", () => {
        document.onmousemove = null;
        document.onmouseup = null;
      });
    });

    topLine.addEventListener("mousedown", (e) => {
      e.preventDefault();
      document.onmousemove = (e) => {
        e.preventDefault();
        console.log(e.screenY)
        let dom = this.$refs.helpDocModal.$el.children[0].children[0]
          .children[0];
        if (
          (dom.clientHeight + Number.parseInt(dom.style.top.slice(0, -2)) >=
            this.screenHeight - 2 &&
            e.movementY < 0) ||
          (dom.clientHeight <= 400 && e.movementY > 0)||e.clientY <=0
        )
          return;
        dom.style.height = dom.clientHeight - e.movementY + "px";
        dom.style.top =
          Number.parseInt(dom.style.top.slice(0, -2)) + e.movementY + "px";
      };
      document.addEventListener("mouseup", () => {
        document.onmousemove = null;
        document.onmouseup = null;
      });
    });

    //限制拖拽范围,禁止拖出界外
    let MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    let dragModal = document.querySelectorAll(".ivu-modal-content-drag")[0];
    let observer = new MutationObserver((mutationList) => {
      let dom = this.$refs.helpDocModal.$el.children[0].children[0]
          .children[0];
      let top = getComputedStyle(dragModal).getPropertyValue("top");
      let left = getComputedStyle(dragModal).getPropertyValue("left");
      let bottom = this.screenHeight - Number.parseInt(top.slice(0,-2)) - dom.clientHeight;
      let right = this.screenWidth - Number.parseInt(left.slice(0,-2)) - dom.clientWidth;
      if (top[0] == "-") {
        dragModal.style.top = "2px";
      }
      if (left[0] == "-") {
        dragModal.style.left = "2px";
      }
      if(bottom < 0){
        dragModal.style.top = this.screenHeight - dom.clientHeight - 5 + 'px';
      }
      if(right < 0){
        dragModal.style.left = this.screenWidth - dom.clientWidth - 5 + 'px';
      }
    });
    observer.observe(dragModal, {
      attributes: true,
      attributeFilter: ["style"],
      attributeOldValue: true,
    });

    // document.getElementsByClassName("ivu-modal-header")[0].addEventListener("dblclick",(e)=>{
    //   console.log(123)
    //   let dom = this.$refs.helpDocModal.$el.children[0].children[0].children[0];
    //   dom.style.left = "5px";
    //   dom.style.top = "5px";
    //   dom.style.width = this.screenWidth - 10 +"px";
    //   dom.style.height = this.screenHeight - 10 +"px";
    // })
  },
  data() {
    return {
      isCollapsed: false,
      isNotice: true,
      noticeDirection: "showNotice",
      isShowDrawer: false,
      isShowHelpDoc: false,
      newNotice: false,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      notice: [
        {
          id: 0,
          type: "error",
          content: "错误",
          date: "01-18 17:28",
          hasRead: false,
        },
        {
          id: 1,
          type: "warning",
          content:
            "余额不足提示：账户余额不足，为保证正常使用，请您尽快充值。111111111111111111111",
          date: "01-12 06:12",
          hasRead: false,
        },
        {
          id: 2,
          type: "warning",
          content:
            "余额不足提示：账户余额不足，为保证正常使用，请您尽快充值。11111111111111111111",
          date: "10-03 12:01",
          hasRead: true,
        },
        {
          id: 3,
          type: "success",
          content: "任务已完成",
          date: "10-23 17:28",
          hasRead: false,
        },
      ],
      noticeTabName: "",
    };
  },
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
  },
  components: {
    LeftMenu,
    TopMenu,
    helpDoc,
  },
  methods: {
    noticeList(name) {
      let list = [];
      if (name == "") {
        list = this.notice;
      } else {
        this.notice.forEach((item) => {
          if (item.type == name) list.push(item);
        });
      }
      return list;
    },
    noticeIcon(type) {
      let url = "";
      if (type == "success") url = "success.png";
      else if (type == "warning") url = "tishi@2x.png";
      else url = "error.png";
      return require("../assets/img/" + url);
    },
    noticeTab(name) {
      this.noticeTabName = name;
      let solution = 0;
      for (let item in this.notice) {
        if (this.notice[item].type == name) {
          solution = item;
          break;
        }
      }
      this.$nextTick(() => {
        this.$set(
          this.notice[solution],
          "hasRead",
          !this.notice[solution].hasRead
        );
        this.$set(
          this.notice[solution],
          "hasRead",
          !this.notice[solution].hasRead
        );
      });
    },
    collapsedSider() {
      console.log(this.$refs.helpDocModal);
      this.isCollapsed = !this.isCollapsed;
      this.$refs.routerView.collapsedSider(this.isCollapsed);
    },
    //用id去已读,index在切换状态时失效
    readNotice(data, index) {
      // this.notice[].hasRead = true;
      let bool = true;
      this.notice.forEach((item) => {
        if (item.id == data.id) item.hasRead = true;
        if (!item.hasRead) bool = false;
      });
      if (bool) this.newNotice = false;
    },
    readAllNotice() {
      this.notice.forEach((item) => {
        item.hasRead = true;
      });
      this.newNotice = false;
    },
    needUnfold(index) {
      let item = document.getElementsByClassName("noticeContent")[index];
      if (!item) return false;
      if (item.scrollHeight > 42) {
        return true;
      } else return false;
    },
    drawerChange(state) {
      this.$nextTick(() => {
        this.$set(this.notice[0], "hasRead", !this.notice[0].hasRead);
        this.$set(this.notice[0], "hasRead", !this.notice[0].hasRead);
      });
      if (state) {
        this.noticeTabName = 0;
        this.$refs.noticeTab.activeKey = 0;
      }
    },
    unfold(index) {
      if (this.$refs.noticeItem[index].className == "noticeList") {
        this.$refs.noticeItem[index].className = "testList";
        this.$refs.noticeItem[index].children[1].children[2].innerHTML = "收起";
      } else {
        this.$refs.noticeItem[index].className = "noticeList";
        this.$refs.noticeItem[index].children[1].children[2].innerHTML = "展开";
      }
    },
  },
};
</script>


<style scope lang="scss">
.ivu-layout-content {
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: hidden;
}
.sider {
  height: 100%;
}
.sider::-webkit-scrollbar {
  display: none;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.showNotice {
  width: 35px;
  height: 35px;
  border-radius: 35px 0 0 35px;
  position: fixed;
  right: 0;
  top: calc(20vh);
  background: #13227a;
  padding: 8px 0 0 8px;
  z-index: 12;
  .noticeBadge {
    /deep/ .ivu-icon {
      color: #ffffff;
    }
  }
}
.helpDoc {
  width: 35px;
  height: 35px;
  border-radius: 35px 0 0 35px;
  position: fixed;
  right: 0;
  top: calc(20vh + 40px);
  background: #13227a;
  padding: 8px 0 0 8px;
  z-index: 12;
  .helpIcon {
    width: 20px;
    height: 20px;
  }
}
.noticeDrawer {
  /deep/ .ivu-drawer-body {
    padding-top: 0;
  }
  /deep/ .ivu-drawer {
    width: 350px !important;
  }
  /deep/ .ivu-drawer-content {
    border-radius: 10px;
  }
}
.noticeTab {
  /deep/ .ivu-tabs-bar {
    margin: 0;
    border: 0;
  }
  /deep/ .ivu-tabs-ink-bar {
    display: none;
  }
  /deep/ .ivu-tabs-nav .ivu-tabs-tab-active {
    color: #1f2676;
  }
}
.noticeHeader {
  overflow: hidden;
  .noticeTitle {
    font-size: 18px;
    float: left;
    vertical-align: middle;
  }
  .noticeHasRead {
    font-size: 12px;
    float: right;
    color: #999999;
    vertical-align: middle;
  }
}
.noticeList {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #f5f5f5;
  font-size: 14px;
  .noticeIcon {
    float: left;
    width: 40px;
    height: 40px;
    margin-top: 15px;
  }
  .noticeMain {
    float: left;
    height: 100%;
    width: 260px;
    padding-top: 6px;
    padding-left: 8px;
    position: relative;
    .noticeContent {
      font-size: 14px;
      height: 42px;
      line-height: 21px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
      -webkit-line-clamp: 2; //显示的行
    }
    .noticeDate {
      position: absolute;
      bottom: 4px;
      font-size: 12px;
      color: #999999;
    }
    .noticeUnfold {
      position: absolute;
      bottom: 4px;
      right: 4px;
      font-size: 12px;
    }
  }
  .noticeBadge {
    float: right;
    height: 100%;
    padding-top: 25px;
  }
}

.testList {
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  font-size: 14px;
  overflow: hidden;
  .noticeIcon {
    float: left;
    width: 40px;
    height: 40px;
    margin-top: 15px;
  }
  .noticeMain {
    float: left;
    height: 100%;
    width: 260px;
    padding-top: 6px;
    padding-left: 8px;
    position: relative;
    .noticeContent {
      font-size: 14px;
      line-height: 21px;
      margin-bottom: 20px;
    }
    .noticeDate {
      position: absolute;
      bottom: 4px;
      font-size: 12px;
      color: #999999;
    }
    .noticeUnfold {
      position: absolute;
      bottom: 4px;
      right: 4px;
      font-size: 12px;
    }
  }
  .noticeBadge {
    float: right;
    height: 100%;
    padding-top: 25px;
  }
}
.helpDocModal {
  height: 100%;
  /deep/ .ivu-modal-content {
    position: fixed;
    height: 90%;
    animation: help 0.5s ease-in-out;
  }
  /deep/ .ivu-modal-body {
    height: calc(100% - 50px);
    #topLine {
      position: absolute;
      top: 0px;
      height: 3px;
      width: 100%;
      cursor: row-resize;
    }
    #leftLine {
      position: absolute;
      left: 0;
      width: 5px;
      height: 100%;
      cursor: col-resize;
    }
    #rightLine {
      position: absolute;
      right: 0;
      width: 5px;
      height: 100%;
      cursor: col-resize;
    }
    #bottomLine {
      position: absolute;
      bottom: 0;
      height: 3px;
      width: 100%;
      cursor: row-resize;
    }
  }
  @keyframes help {
    0% {
      transform: translateX(360px);
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>
