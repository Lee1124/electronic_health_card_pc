<template>
  <div class="dashboard-container page-container">
    <el-scrollbar class="scroll-container">
      <div class="scroll-inner-container">
        <!-- head -->
        <el-row :gutter="10" class="row-bg">
          <el-col class="col" :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <!-- 搜索筛选 -->
            <el-form
              :inline="true"
              label-position="right"
              label-width="74px"
              size="small"
              :model="searchQuery"
              class="demo-form-inline"
            >
              <el-form-item label="机构">
                <el-select
                  v-model="searchQuery.orgCode"
                  filterable
                  placeholder="机构名称"
                  class="search-btn"
                  @change="search(1)"
                >
                  <el-option
                    v-for="item in orgs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间段">
                <el-select
                  v-model="time"
                  filterable
                  placeholder="时间段"
                  class="search-btn"
                  @change="changeTime"
                >
                  <el-option
                    v-for="item in timeRange"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col class="col" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <!-- 当前时间 -->
            <div class="currentTime">当前时间：{{currentTime}}</div>
          </el-col>
        </el-row>
        <!-- echart and card -->
        <el-row :gutter="10" class="row-bg">
          <!-- left -->
          <el-col class="col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <!-- 最近一周的用卡数据 -->
            <div
              class="echart-container"
              v-loading="loading1"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.5)"
            >
              <use-echart ref="useEchart" />
            </div>
            <!-- 最近一周的用户注册数据 -->
            <div
              class="echart-container"
              v-loading="loading2"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.5)"
            >
              <register-echart ref="registerEchart" />
            </div>
          </el-col>
          <!-- right -->
          <el-col class="col" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="card-container">
              <!-- 用卡情况 -->
              <div class="card-inner">
                <div class="label">用卡情况</div>
                <!-- 表头 -->
                <div class="table-container tableHead">
                  <div class="value">机构名称</div>
                  <div class="value">健康卡ID</div>
                  <div class="value" style="width:12%;">用卡环节</div>
                  <div class="value">用卡时间</div>
                </div>
                <!-- 表格内容 -->
                <use-card-table />
              </div>
              <!-- 用户注册 -->
              <div class="card-inner">
                <div class="label">用户事件</div>
                <!-- 表头 -->
                <div class="table-container tableHead userRegister-container">
                  <div class="value">事件来源</div>
                  <div class="value">处理结果</div>
                  <div class="value">事情时间</div>
                </div>
                <!-- 表格内容 -->
                <user-register-table />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
    <!-- footer -->
    <div class="footer-container">
      <ul class="clearfix summary">
        <li>达州市卫生健康委员会</li>
        <li>
          机构总数:
          <span class="value">{{pool.orgNum}}</span>
        </li>
        <li>
          注册用户数:
          <span class="value">{{pool.registerUserNum}}</span>
        </li>
        <li>
          用卡总数:
          <span class="value">{{pool.useCardNum}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import registerEchart from "@/components/Echarts/BarChart";
import useEchart from "@/components/Echarts/BarChart";
import initORG from "@/mixins/org";
import initData from "@/mixins/req";
import { changeRes } from "@/api/common";
import {
  getY_M_D_H_M_S,
  timeRangeInToDay,
  getArrary,
  deepClone,
  getYMD
} from "@/utils/index";
import userRegisterTable from "./home/userRegisterTable";
import useCardTable from "./home/useCardTable";
import { homeData } from "@/api/home";
export default {
  mixins: [initORG, initData],
  name: "Dashboard",
  components: {
    registerEchart,
    useEchart,
    userRegisterTable,
    useCardTable
  },
  data() {
    return {
      loading1: false,
      loading2: false,
      time: -1,
      timeID: null,
      timeRange: [
        { label: "全部", value: -1 },
        { label: "最近三月", value: 90 },
        { label: "最近一月", value: 30 },
        { label: "最近一周", value: 7 }
      ],
      currentTime: getY_M_D_H_M_S(new Date()),
      searchQuery: {
        orgCode: "",
        startTime: "",
        endTime: ""
      },
      pool: {
        orgNum: 0,
        registerUserNum: 0,
        useCardNum: 0
      }
    };
  },
  created() {
    this.initORG();
    this.initTime();
    this.search(0);
  },
  beforeDestroy() {
    clearInterval(this.timeID);
  },
  methods: {
    initTime() {
      if (this.timeID) clearInterval(this.timeID);
      this.timeID = setInterval(() => {
        this.currentTime = getY_M_D_H_M_S(new Date());
      }, 1000);
    },
    search(type) {
      this.initHomeData(type).then(data => {
        this.initRegisterEchart(data);
        this.initUserCardEchart(data);
        this.initPool(data);
      });
    },
    initHomeData(type) {
      this.loading1 = type === 2 ? false : true;
      this.loading2 = type > 0 ? false : true;
      return new Promise((reslove, reject) => {
        homeData(this.searchQuery)
          .then(data => {
            let res = changeRes(data);
            this.loading1 = false;
            this.loading2 = false;
            if (res.status === 0) {
              reslove(res.data);
            }
          })
          .catch(err => {
            this.loading1 = false;
            this.loading2 = false;
          });
      });
    },
    initRegisterEchart(data) {
      let list = deepClone(data.registerOneWeeks).map(item => {
        return {
          time: getYMD(item.start),
          value: item.registerNum
        };
      });
      this.$nextTick(() => {
        this.$refs.registerEchart.echartData = {
          title: "注册情况统计(最近一周)",
          legend: ["注册量"],
          xData: getArrary(list, "time"),
          yData1: getArrary(list, "value")
        };
        this.$refs.registerEchart.initChart();
      });
    },
    initUserCardEchart(data) {
      let list = deepClone(data.userCardOneWeeks).map(item => {
        return {
          time: getYMD(item.start),
          value: item.registerNum
        };
      });
      this.$nextTick(() => {
        this.$refs.useEchart.echartData = {
          title: "用卡情况统计(最近一周)",
          legend: ["用卡量"],
          xData: getArrary(list, "time"),
          yData1: getArrary(list, "value")
        };
        this.$refs.useEchart.initChart();
      });
    },
    initPool(data) {
      this.pool.orgNum = data.orgNum;
      this.pool.registerUserNum = data.registerUserNum;
      this.pool.useCardNum = data.useCardNum;
    },
    changeTime(val) {
      if (val === -1) {
        this.setTime();
      } else {
        this.setTime(timeRangeInToDay(val));
      }
      this.search(2);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/page.scss";
$cardContainerBg: #3366cc;
$labelColor: #cccc66;
$tableBodyBg: #333300;
.dashboard-container {
  background: rgb(48, 49, 139);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  .scroll-container {
    margin-bottom: 50px;
    padding-bottom: 10px;
    .row-bg {
      width: 100%;
      .col {
        margin-top: 10px;
      }
    }
    // 搜索筛选
    /deep/ .demo-form-inline {
      .el-form-item__label {
        color: #fff;
      }
      .search-btn {
        width: 200px;
      }
    }
    .currentTime {
      font-size: 14px;
      color: #fff;
      padding: 0 35px;
      height: 36px;
      line-height: 36px;
      text-align: right;
    }
    // echart图表数据
    .echart-container {
      width: 88%;
      min-width: 360px;
      height: 280px;
      background: rgba($color: #fff, $alpha: 0.85);
      margin-top: 20px;
      margin-left: 14px;
      padding-top: 10px;
      box-sizing: content-box;
      border-radius: 2px;
    }
    .echart-container:first-child {
      margin-top: 0;
    }
    .card-container {
      float: right;
      width: 95%;
      min-width: 360px;
      height: 600px;
      background: $cardContainerBg;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      padding: 10px;
      .card-inner {
        height: 50%;
        .label {
          color: $labelColor;
          font-weight: 700;
          font-size: 14px;
          position: relative;
          margin-left: 20px;
        }
        .label::before {
          content: "";
          width: 10px;
          height: 10px;
          background: $labelColor;
          position: absolute;
          left: -14px;
          top: 50%;
          transform: translateY(-50%);
        }
        .table-content-container {
          background-color: $tableBodyBg;
          height: 72%;
          border-radius: 2px;
          overflow: hidden;
          padding: 6px 0;
        }
        .table-container {
          display: flex;
          justify-content: space-between;
          .value {
            width: 25%;
            text-align: center;
            color: #fff;
            font-size: 11px;
            padding: 3px 6px;
          }
        }
        .userRegister-container {
          .value {
            width: 33.3%;
          }
        }
        .tableHead {
          padding: 10px 0;
        }
        /deep/ .el-table::before {
          height: 0 !important;
        }
        /deep/ .tableRowStyle td {
          background: $tableBodyBg !important;
          color: #fff;
          font-size: 12px;
          padding: 2px 0;
          text-align: center;
          border: 0;
          cursor: pointer;
        }
      }
    }
  }
  .footer-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: $cardContainerBg;
    display: flex;
    justify-content: center;
    height: 50px;
    .summary {
      display: flex;
      margin: 0;
      height: 100%;
      align-items: center;
      li {
        color: #fff;
        margin-right: 30px;
        font-size: 14px;
      }
      .value {
        color: $labelColor;
      }
    }
  }
}
</style>
