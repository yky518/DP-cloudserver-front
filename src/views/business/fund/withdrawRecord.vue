<template>
  <div id="withdrawRecord">
    <div class="date">
      <span class="date_title">申请提现时间：</span>
      <Date-picker
        type="daterange"
        format="yyyy/MM/dd"
        placeholder="选择日期和时间"
        class="datePicker"
      ></Date-picker>
      <Button class="date_btn">搜索</Button>
    </div>
    <Table
      :columns="record"
      :data="recordList"
      :height="(500 / 1080) * screenHeight"
    ></Table>
    <Page style="text-align: center; margin-top: 20px"></Page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
      record: [
        {
          title: "提现单号",
          key: "recordOrder",
          minWidth: 60,
        },
        {
          title: "申请提现时间",
          key: "withdrawTime",
          minWidth: 50,
        },
        {
          title: "申请人",
          key: "applicant",
        },
        {
          title: "提现金额",
          key: "amount",
        },
        {
          title: "操作完成时间",
          key: "completeTime",
          minWidth: 50,
        },
        {
          title: "提现到账账号",
          key: "account",
        },
        {
          title: "状态",
          key: "state",
        },
      ],
      recordList: [
        {
          recordOrder: "300006667783140884",
          withdrawTime: "2021-01-05 19:18:03",
          applicant: "test1234",
          amount: "¥ 2000.00",
          completeTime: "2021-01-05 21:34:12",
          account: "110****403",
          state: "审核中",
        },
        {
          recordOrder: "300006667783140884",
          withdrawTime: "2021-01-05 19:18:03",
          applicant: "test1234",
          amount: "¥ 2000.00",
          completeTime: "2021-01-05 21:34:12",
          account: "110****403",
          state: "审核中",
        },
        {
          recordOrder: "300006667783140884",
          withdrawTime: "2021-01-05 19:18:03",
          applicant: "test1234",
          amount: "¥ 2000.00",
          completeTime: "2021-01-05 21:34:12",
          account: "110****403",
          state: "审核中",
        },
        {
          recordOrder: "300006667783140884",
          withdrawTime: "2021-01-05 19:18:03",
          applicant: "test1234",
          amount: "¥ 2000.00",
          completeTime: "2021-01-05 21:34:12",
          account: "110****403",
          state: "审核中",
        },
        {
          recordOrder: "300006667783140884",
          withdrawTime: "2021-01-05 19:18:03",
          applicant: "test1234",
          amount: "¥ 2000.00",
          completeTime: "2021-01-05 21:34:12",
          account: "110****403",
          state: "审核中",
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
};
</script>

<style lang="scss" scoped>
#withdrawRecord {
  .date {
    margin-bottom: 10px;
    .date_title {
      vertical-align: middle;
    }
    .datePicker {
      vertical-align: middle;
      display: inline-block;
      /deep/ .ivu-input {
        width: 220px;
        height: 38px;
        border-radius: 20px;
        border: 1px solid #e9e9e9;
      }
    }
    .date_btn {
      width: 120px;
      height: 38px;
      background: #13227a;
      border-radius: 20px;
      color: #ffffff;
      vertical-align: middle;
      display: inline-block;
      margin-left: 15px;
    }
  }
}
</style>