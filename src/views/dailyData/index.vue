// 每日数据统计
<template>
  <div class="cards-container page-container">
    <el-scrollbar class="scroll-container">
      <div class="scroll-inner-container">
        <!-- 工具栏 -->
        <div class="head-container">
          <!-- 搜索 -->
          <el-form
            :inline="true"
            label-position="right"
            label-width="74px"
            size="small"
            :model="searchQuery"
            class="demo-form-inline"
          >
            <el-form-item label="筛选">
              <el-date-picker
                class="search-btn"
                size="small"
                v-model="time"
                @change="changeDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="success" @click="search">查询</el-button>
              <el-button size="small" @click="reloadSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格渲染 -->
        <el-table
          header-row-class-name="table-header-style"
          :row-class-name="tableRowStyle"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          show-summary
          v-loading="loading"
        >
          <el-table-column prop="orgName" label="机构名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="gh" label="挂号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zd" label="诊断" show-overflow-tooltip></el-table-column>
          <el-table-column prop="kf" label="开方" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qy" label="取药" show-overflow-tooltip></el-table-column>
          <el-table-column prop="jc" label="检查" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sh" label="手术" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sf" label="收费" show-overflow-tooltip></el-table-column>
          <el-table-column prop="qt" label="其他" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import { setSearchValue } from "@/utils/index";
import initData from "@/mixins/req";
import store from "@/store";
export default {
  name: "cards",
  mixins: [initData],
  data() {
    return {
      searchQuery: {
        startTime: "", // 开始时间
        endTime: "" //结束时间
      }
    };
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      this.init().then(res => {
        this.tableData = res.data;
      });
    },
    reloadSearch() {
      this.time = "";
      setSearchValue(this, this.searchQuery);
      this.search();
    },
    beforeInit() {
      this.url = store.getters["api/dailyData"];
      this.searchParams = {
        ...this.searchQuery
      };
      return true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/page.scss";
@import "~@/assets/styles/table.scss";
</style>
