<template>
  <div id="modify">
    <Breadcrumb :style="{ marginLeft: (30 / 1080) * screenHeight + 'px' }">
      <BreadcrumbItem>个人设置</BreadcrumbItem>
    </Breadcrumb>
    <Card
      :style="{
        height: (1000 / 1080) * screenHeight + 'px',
        textAlign: 'center',
        padding: '110px 400px 0 400px',
        margin: '10px 26px 10px 26px',
      }"
    >
      <img
        src="../assets/img/yonghutouxiang@2x.png"
        alt=""
        style="width: 80px; height: 80px; border-radius: 100%"
      />
      <h3 style="text-align: center; margin-bottom: 20px; font-size: 20px">
        test
      </h3>
      <div class="modifyItem">
        <img
          src="../assets/img/youxiang_icon@2x.png"
          alt=""
          class="modifyItemIcon"
        />
        <span class="modifyItemSpan">{{i18n.邮箱}}</span>
        <Input
          type="text"
          class="modifyItemInput"
          v-model="userInfo.email"
          :disabled="editNum == -1 || editNum != 1"
        ></Input>
        <Button class="modifyItemBtn" @click="modify(1)">{{i18n.修改}}</Button>
      </div>
      <div class="modifyItem">
        <img
          src="../assets/img/dianhua_icon@2x.png"
          alt=""
          class="modifyItemIcon"
        />
        <span class="modifyItemSpan">{{i18n.电话}}</span>
        <Input
          type="text"
          class="modifyItemInput"
          v-model="userInfo.phone"
          :disabled="editNum == -1 || editNum != 2"
        ></Input>
        <Button class="modifyItemBtn" @click="modify(2)">{{i18n.修改}}</Button>
      </div>
      <div class="modifyItem">
        <img
          src="../assets/img/mima_icon@2x.png"
          alt=""
          class="modifyItemIcon"
        />
        <span class="modifyItemSpan">{{i18n.密码}}</span>
        <Input
          type="text"
          class="modifyItemInput"
          v-model="pwd"
          disabled
        ></Input>
        <Button class="modifyItemBtn" @click="modify(3)">{{i18n.修改}}</Button>
      </div>
      <div class="modifyItem">
        <img
          src="../assets/img/jigou_icon @2x.png"
          alt=""
          class="modifyItemIcon"
        />
        <span class="modifyItemSpan">{{i18n.机构}}</span>
        <Input
          type="text"
          class="modifyItemInput"
          v-model="mechanism"
          disabled
        ></Input>
        <Button class="modifyItemBtn">{{i18n.修改}}</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { getUserDetails } from "@/api/info";
import { accountList, accountModify } from "@/api/user";
export default {
  data() {
    return {
      editNum: -1,
      userInfo: {},
      email: "",
      phone: "",
      pwd: "*************",
      mechanism: "",
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
    };
  },
  computed:{
    i18n(){
      return this.$t("index.Modify");
    }
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
    let params = {
      username: "1@test",
    };
    accountList(params).then((res) => {
      for (let item in res.items) {
        if (res.items[item].username == "1@test") {
          this.userInfo = res.items[item];
          console.log(this.userInfo);
          break;
        }
      }
    });
  },
  methods: {
    modify(num) {
      if (this.editNum == -1) {
        this.editNum = num;
        return;
      } else if (this.editNum == 3) {
        console.log("去邮箱修改");
        this.$router.push("/account/modify_password");
        return;
      }
      let data = {
        bid: this.userInfo.bid,
        username: this.userInfo.username,
        name: this.userInfo.name,
        phone: this.userInfo.phone,
        email: this.userInfo.email,
        role_id: this.userInfo.role_id,
        password: this.userInfo.password,
      };
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(this.userInfo.email) && this.userInfo.email != "") {
        this.$Message.error("邮箱格式错误");
        return;
      }
      this.editNum = -1;
      accountModify(data)
        .then((res) => {
          console.log(res);
          this.$Message.success("修改成功");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#modify {
  .modifyItem {
    height: 32px;
    line-height: 32px;
    margin-top: 4px;
    font-size: 18px;
    color: #333333;
  }
  .modifyItemIcon {
    width: 16px;
  }
  .modifyItemInput {
    display: inline-block;
    width: 260px;
    border: 0;
    margin: 0 20px;
    /deep/ .ivu-input {
      border: 0;
      background: #ffffff !important;
      border-radius: 0;
      border-bottom: 1px solid #dcdcdc;
    }
  }
  .modifyItemBtn {
    border: 0;
    background: #ffffff !important;
    color: #13227a;
  }
  /deep/ .ivu-icon::before {
    font-size: 20px !important;
  }
  /deep/ .ivu-breadcrumb {
    color: #333333;
    span:last-child {
      color: #13227a;
      font-weight: 700;
    }
  }
}
</style>