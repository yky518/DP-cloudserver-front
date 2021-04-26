<template>
  <div style="height: 100%" id="home" ref="home">
    <div
      id="trend"
      ref="trend"
      :style="{
        height: (840 / 1080) * screenHeight + 'px',
        width: '100%',
      }"
    ></div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
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
    const trend = this.$echarts.init(document.getElementById("trend"));
    const trendOption = {
      tooltip: {},
      legend: {
        data: [],
      },

      xAxis: {
        data: [
          "2020-01",
          "2020-02",
          "2020-03",
          "2020-04",
          "2020-05",
          "2020-06",
          "2020-07",
          "2020-08",
          "2020-09",
          "2020-10",
          "2020-11",
          "2020-12",
        ],
        axisTick: { show: false },
        axisLine: { show: false },
      },
      yAxis: {
        axisTick: { show: false },
        axisLine: { show: false },
      },

      series: [
        {
          name: "任务",
          type: "bar",
          barWidth: 24,
          data: [
            1900,
            2200,
            100,
            300,
            150,
            1100,
            5900,
            7000,
            4200,
            8100,
            1500,
            5200,
          ],
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#13227A", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#4F60A9", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    };

    setTimeout(() => {
      this.$refs.trend.style.height = this.$refs.home.clientHeight * 0.8;
      trend.setOption(trendOption);
    }, 0);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#trend {
  width: 100%;
  height: 80%;
}
</style>