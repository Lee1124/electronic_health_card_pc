//柱状图分析
<template>
  <div :class="className" :status="siderOpened" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
    }
  },
  data() {
    return {
      echartData: {
        title: "",
        legend: [],
        xData: [],
        yData1: []
      },
      chart: null,
      commonStyle: {
        //刻度线每个刻度的样式
        axisTick: {
          lineStyle: {
            color: "#999"
          }
        },
        //刻度轴线的样式
        axisLine: {
          lineStyle: {
            color: "#999"
          }
        },
        //刻度线对应的文字的样式
        axisLabel: {
          color: "#999",
          fontSize: "8",
          interval: false
        }
      }
    };
  },
  mounted() {
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      let self = this;
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        title: {
          text: self.echartData.title,
          left: "center",
          textStyle: {
            fontSize: "16px"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: self.echartData.legend,
          left: 10
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },

        xAxis: [
          {
            data: self.echartData.xData,
            ...this.commonStyle
          }
        ],
        yAxis: [
          {
            type: "value",
            name: self.echartData.legend ? self.echartData.legend[0] : "",
            axisLabel: {
              formatter: "{value}"
            },
            ...this.commonStyle
          }
        ],

        series: [
          {
            name: self.echartData.legend ? self.echartData.legend[0] : "",
            type: "bar",
            data: self.echartData.yData1,
            barMaxWidth: "20px",
            itemStyle: {
              borderColor: "#22E17E",
              color: "#A1F4C9"
            },
            markLine: {
              lineStyle: {
                type: "dashed",
                color: "#3366cc"
              }
            }
          },
          {
            name: self.echartData.legend ? self.echartData.legend[0] : "",
            type: "line",
            symbolSize: 10, //设定实心点的大小
            data: self.echartData.yData1,
            itemStyle: {
              color: "#22E17E"
            }
          }
        ]
      });
    }
  },
  computed: {
    siderOpened() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.__resizeHandler();
        },300);
      });
      return this.$store.state.app.sidebar.opened;
    }
  }
};
</script>
<style lang='scss' scoped>
</style>