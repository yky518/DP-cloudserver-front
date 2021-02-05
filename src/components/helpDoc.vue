<template>
  <div id="helpDoc">
    <Icon
      type="md-arrow-back"
      @click.native="back()"
      :class="history.length <= 1 ? 'cantback' : 'back'"
    />
    <Icon
      type="md-arrow-forward"
      @click.native="goahead()"
      :class="ahead.length <= 0 ? 'cantback' : 'back'"
    />
    <span @click="home()">homepage</span>
    <span v-if="history.length > 1"> / {{ componentName }}</span>
    <Dropdown
      trigger="custom"
      :visible="isShowSearch"
      @on-click="jump"
      class="drop"
    >
      <Input
        search
        placeholder="Enter something..."
        @on-search="search"
        @on-blur="isShowSearch = false"
        class="search"
      />

      <DropdownMenu slot="list">
        <DropdownItem
          v-for="(item, index) in searchList"
          :key="index"
          :name="item"
          >{{ item }}</DropdownItem
        >
        <DropdownItem v-if="searchList.length == 0">无搜索结果</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <component :is="componentName" class="component"></component>
  </div>
</template>

<script>
import Vue from "vue";
import homepage from "@/views/helpDoc/HomePage.vue";
import resultDoc from "@/views/helpDoc/resultDoc.vue";
import infoDoc from "@/views/helpDoc/infoDoc.vue";
Vue.component("homePage", homepage);
Vue.component("resultDoc", resultDoc);
Vue.component("infoDoc", infoDoc);
export default {
  data() {
    return {
      componentList: ["homePage", "resultDoc", "infoDoc"],
      componentName: "",
      isShowSearch: false,
      searchList: [],
      history: [],
      ahead: [],
    };
  },
  mounted() {
    this.jump("homePage");
  },
  methods: {
    home(){
      this.history = ["homePage"];
      this.ahead = [];
      this.componentName = "homePage";
    },
    jump(name) {
      if (this.componentName == name) return;
      this.componentName = name;
      this.isShowSearch = false;
      this.history.push(name);
      this.ahead = [];
    },
    back() {
      if (this.history.length == 1) return;
      this.ahead.push(this.history.pop());
      this.componentName = this.history[this.history.length - 1];
    },
    goahead() {
      if (this.ahead.length == 0) return;
      this.componentName = this.ahead.pop();
      this.history.push(this.componentName);
    },
    search(value) {
      if (value == "") return;
      let searchResult = [];
      this.componentList.forEach((item) => {
        if (item.toLowerCase().indexOf(value) != -1) searchResult.push(item);
      });
      this.searchList = searchResult;
      this.isShowSearch = true;
    },
  },
};
</script>

<style lang="scss" scoped>
body,
html,
#helpDoc {
  height: 100%;
}
.drop {
  width: 100%;
  /deep/ .ivu-select-dropdown {
    width: calc(100% - 32px);
  }
  .search {
    width: 100%;
  }
}
.back {
  color: #515a6e;
}
.cantback {
  color: #c1c7cd;
}
.component {
  height: calc(100% - 35px);
  overflow-y: auto;
  word-wrap: break-word;
  word-break: normal;
}
</style>