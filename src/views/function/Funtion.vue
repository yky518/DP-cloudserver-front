<template>
  <div id="function">
    <Breadcrumb separator="-" style="z-index:14;">
      <BreadcrumbItem>功能模块</BreadcrumbItem>
      <BreadcrumbItem>功能选择</BreadcrumbItem>
      <BreadcrumbItem>{{title}}</BreadcrumbItem>
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
    <div class="function-sider">
      <Dropdown trigger="custom" :visible="isShowSearch" class="searchBox" @on-click="searchJump">
        <Input prefix="ios-search" placeholder="Enter text" style="width: auto;border-radius: 20px;" v-model="searchTxt" @on-change="search()" @on-focus="search()" @on-blur="isShowSearch = false"/>
        <DropdownMenu slot="list">
          <DropdownItem v-for="(item,index) in searchList" :key="index" :name="index">{{item.title}}</DropdownItem>
          <DropdownItem v-if="searchList.length == 0">无搜索结果</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Menu theme="light" style="width: 215px" :active-name="title" @on-select="selectMenu" ref="funcMenu">
        <MenuItem
          v-for="(item, index) in list"
          :key="index"
          @click.native="jump(item)"
          class="function-item"
           :name="item.title"
           ref="funcMenuItem"
           draggable="true"
          >
          {{ item.title }}
          <img src="../../assets/img/tuodong_icon@2x.png" alt="" class="menuIcon">
          </MenuItem
        >
      </Menu>
      <div
        style="
          position: absolute;
          bottom: 30px;
          width: 100%;
          text-align: center;
          color: #999999;
          font-size: 12px;
        "
        @click="showContactModal = true"
      >
        我想使用的软件不在列表中？
      </div>
    </div>
    <Modal v-model="showStateModal" footer-hide width="50rem">
      <div style="text-align:center;">
        <img :src="imgUrl" style="display:inline-block;width:5rem;"></img>
        <h5 style="text-align:center;">{{State?"任务已提交":"任务提交失败"}}</h5>
        <Table 
        :columns="taskStateTable"
        :data="taskState"
        ref="taskStateTable">
      </Table>
      <Button style="width:200px;height:40px;background:#13227A;border-radius: 20px;display: inline-block;color:#FFFFFF;">{{State?"查看结果":"重新编辑"}}</Button>
      </div>
    </Modal>

    <Modal v-model="showContactModal" footer-hide width="30rem" id="contactUs" label-position="top">
      <h3 style="text-align: center">联系我们</h3>
      <Form ref="formInline" :model="formContact" style="padding: 0px 60px" :rules="formRule">
        <FormItem prop="email" label="邮箱">
          <Input type="text" v-model="formContact.email" placeholder="Username">
            <img src="../../assets/img/youxiang_icon@2x.png" alt="" class="contactIcon" slot="prefix">
          </Input>
        </FormItem>
        <FormItem prop="weixin" label="微信">
          <Input
            type="text"
            v-model="formContact.weixin"
            placeholder="Password"
          >
            <img src="../../assets/img/weixin_icon @2x.png" alt="" class="contactIcon" slot="prefix">
          </Input>
        </FormItem>
        <FormItem prop="phone" label="电话">
          <Input type="text" v-model="formContact.phone" placeholder="Password">
            <img src="../../assets/img/dianhua_icon@2x.png" alt="" class="contactIcon" slot="prefix">
            
          </Input>
        </FormItem>
        <FormItem prop="question" label="请描述你的问题">
          <Input
            v-model="formContact.question"
            type="textarea"
            placeholder="请把你的问题写在这里"
            :row="4"
            :autosize="{ minRows: 4, maxRows: 4 }"
          />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            long
            class="contact-button"
            @click="contactSubmit()"
            >提交</Button
          >
        </FormItem>
      </Form>
    </Modal>
    <main style="margin-left: 240px;padding-top:1px;">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { parseFunctions } from "../../utils/parse";

export default {
  name: "Funtion",
  data() {
    // 验证邮箱格式
    const emailRule = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(value) && value != "") {
        callback(new Error("邮箱格式错误"));
      } else if (value == "") {
        callback("邮箱不能为空");
      } else {
        callback();
      }
    };
    return {
      list: [],
      title: "",
      showStateModal: false,
      showContactModal: false,
      State: false,
      searchTxt: "",
      taskState: [],
      taskStateTable: [
        {
          title: "编号",
          key: "task_id",
        },
        {
          title: "名称",
          key: "task_name",
        },
        {
          title: "类型",
          key: "task_type",
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
          title: "子任务数",
          key: "subtask",
        },
      ],
      formContact: {
        email: "",
        weixin: "",
        phone: "",
        question: "",
      },
      formRule: {
        email: [{
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },{ validator: emailRule, trigger: "blur" }],
      },
      isShowSearch: false,
      searchInput: null,
      searchList: [],
    };
  },
  computed: {
    imgUrl: function () {
      let url = this.State ? "chenggong" : "shibai";
      return require("../../assets/img/tijiao" + url + ".png");
    },
  },
  created() {
    const functionList = ["dpkit", "cp2k", "lammps", "vasp"];
    this.list = parseFunctions(functionList);
    this.$nextTick(() => {
      // 左侧菜单拖动事件绑定
      for (let item in this.$refs.funcMenuItem) {
        this.$refs.funcMenuItem[item].$el.addEventListener("dragstart", (e) => {
          this.downId = item;
        });
        this.$refs.funcMenuItem[item].$el.addEventListener("dragover", (e) => {
          e.preventDefault();
        });
        this.$refs.funcMenuItem[item].$el.addEventListener("drop", (e) => {
          e.preventDefault();
          this.upId = item;
          let a = this.list[this.downId];
          this.$set(this.list, this.downId, this.list[this.upId]);
          this.$set(this.list, this.upId, a);
          this.$set(this.$refs.funcMenu, "activeName", this.title);
          this.$nextTick(() => {
            this.$refs.funcMenu.updateActiveName();
          });
        });
      }
    });
    let url = this.$route.path.split("/");
    if (url[3]) this.title = url[3];
    else {
      this.title = "Lammps";
      this.$router.push("/jobs/function/lammps");
    }
  },
  methods: {
    jump(item) {
      this.title = item.title;
      this.$router.push(item.path);
    },
    searchJump(index) {
      if (this.searchList.length == 0) return;
      this.title = this.searchList[index].title;
      this.$router.push(this.searchList[index].path);
      this.searchTxt = "";
      this.searchList = [];
      this.isShowSearch = false;
    },
    // 提交结果
    changeState(state, task) {
      this.State = state;
      this.$set(this.taskState, 0, task);
      this.showStateModal = true;
    },
    selectMenu(name) {
      this.title = name;
    },
    search() {
      this.searchList = [];
      if (this.searchTxt == "") {
        this.isShowSearch = false;
        clearTimeout(this.searchInput);
        return;
      }
      let that = this;
      if (this.searchInput) clearTimeout(this.searchInput);
      this.searchInput = setTimeout(function () {
        let l = [];
        that.list.forEach((item) => {
          let t = item.title;
          if (t.toLowerCase().indexOf(that.searchTxt.toLowerCase()) != -1)
            l.push(item);
        });
        that.searchList = l;
        that.isShowSearch = true;
      }, 1000);
    },

    contactSubmit() {
      this.showContactModal = false;
    },
  },
};
</script>

<style scoped lang="scss">
#function {
  margin: 20px;
  /deep/ .ivu-breadcrumb {
    position: fixed;
    top: 0;
    color: #333333;
    margin-left: 5px;
    span:last-child {
      color: #13227a;
      font-weight: 700;
    }
  }
  .ivu-list-item {
    justify-content: space-between;
  }

  .function-sider {
    background-color: #ffffff;
    padding: 5px;
    position: fixed;
    margin-top: 10px;
    margin-left: 5px;
    height: calc(100vh - 35px);
    .searchBox {
      /deep/ .ivu-input {
        border-radius: 20px;
        margin-bottom: 5px;
      }
      /deep/ .ivu-select-dropdown {
        width: 95%;
        left: 0;
        z-index: 10000;
      }
    }
  }
  .function-item {
    cursor: pointer;
    border-bottom: 1px solid #f4f4f4;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
}
.contact-button {
  width: 100%;
  height: 40px;
  background: #13227a !important;
  border-radius: 20px;
}
.contactIcon {
  width: 16px;
  margin-top: 10px;
}
.menuIcon {
  width: 16px;
  float: right;
}
</style>
