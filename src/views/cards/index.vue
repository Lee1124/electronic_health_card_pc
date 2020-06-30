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
            <el-form-item label="机构名称">
              <el-select
                v-model="searchQuery.orgCode"
                filterable
                placeholder="机构名称"
                class="search-btn"
              >
                <el-option
                  v-for="item in orgs"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="健康卡">
              <el-input
                class="search-btn"
                size="small"
                :clearable="true"
                v-model="searchQuery.ehealthCardId"
                placeholder="健康卡"
                @change="search()"
              ></el-input>
            </el-form-item>
            <el-form-item label="诊疗环节">
              <el-input
                class="search-btn"
                size="small"
                :clearable="true"
                v-model="searchQuery.medstepcode"
                placeholder="诊疗环节"
                @change="search()"
              ></el-input>
            </el-form-item>
            <el-form-item label="用卡终端">
              <el-input
                class="search-btn"
                size="small"
                :clearable="true"
                v-model="searchQuery.channelcode"
                placeholder="用卡终端"
                @change="search()"
              ></el-input>
            </el-form-item>
            <el-form-item label="用卡时间">
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
              <!-- <el-button size="small" type="primary" @click="reloadSearch">导出</el-button> -->
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
          v-loading="loading"
        >
          <el-table-column prop="orgName" label="机构名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ehealthCardId" label="健康卡ID" show-overflow-tooltip></el-table-column>
          <el-table-column prop="medstepName" label="诊疗环节" show-overflow-tooltip></el-table-column>
          <el-table-column prop="departMentName" label="科室" show-overflow-tooltip></el-table-column>
          <el-table-column prop="channelName" label="用卡终端" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="用卡时间" sortable show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.createTime | dealTime2}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-scrollbar>
    <!-- 分页器 -->
    <!-- 分页 -->
    <table-pagination
      :total="total"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @changeSize="changeSize"
      @changePage="changePage"
      class="table-pagination"
    />
  </div>
</template>
<script>
import { setSearchValue } from "@/utils/index";
import initData from "@/mixins/req";
import initORG from "@/mixins/org";
import store from "@/store";
export default {
  name: "cards",
  mixins: [initData, initORG],
  data() {
    return {
      searchQuery: {
        startTime: "", // 开始时间
        endTime: "", //结束时间
        ehealthCardId: "", //健康卡id
        medstepcode: "", //诊疗环节
        orgCode: "", //机构编码
        channelcode: "" //用卡终端
      }
    };
  },
  created() {
    this.initORG();
    this.init();
  },
  methods: {
    search() {
      this.init();
    },
    reloadSearch() {
      this.time = "";
      setSearchValue(this, this.searchQuery);
      this.init();
    },
    beforeInit() {
      this.url = store.getters["api/userCardData"];
      this.searchParams = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
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
