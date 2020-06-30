<template>
  <div class="users-container page-container">
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
            <!-- <el-form-item label="机构名称">
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
            </el-form-item> -->
            <el-form-item label="证件号">
              <el-input
                class="search-btn"
                size="small"
                :clearable="true"
                v-model="searchQuery.idNo"
                placeholder="证件号"
                @change="search()"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                class="search-btn"
                size="small"
                :clearable="true"
                v-model="searchQuery.name"
                placeholder="姓名"
                @change="search()"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input
                class="search-btn"
                size="small"
                :clearable="true"
                v-model="searchQuery.cellphone"
                placeholder="手机号"
                @change="search()"
              ></el-input>
            </el-form-item>
            <el-form-item label="注册时段">
              <el-date-picker
                class="search-btn"
                size="small"
                v-model="time"
                @change="changeDate"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="success" @click="search">查询</el-button>
              <el-button size="small" @click="reloadSearch">重置</el-button>
              <!-- <el-button size="small" type="primary">导出</el-button> -->
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
          <el-table-column prop="idNo" label="证件号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cellphone" label="手机号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.createTime | dealTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" round type="success" @click.stop="look(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-scrollbar>
    <!-- 分页器 -->
    <table-pagination
      :total="total"
      :currentPage="currentPage"
      :pageSize="pageSize"
      @changeSize="changeSize"
      @changePage="changePage"
      class="table-pagination"
    />

    <!-- 详情弹窗 -->
    <details-popup ref="detailsPopup" />
  </div>
</template>
<script>
import initData from "@/mixins/req";
import initORG from "@/mixins/org";
import detailsPopup from "./detailsPopup";
import store from "@/store";
import { setSearchValue } from "@/utils/index";
export default {
  name: "users",
  mixins: [initData, initORG],
  components: { detailsPopup },
  data() {
    return {
      searchQuery: {
        startTime: "", // 开始时间
        endTime: "", //结束时间
        cellphone: "", //手机号
        idNo: "", //证件号
        name: "", //姓名
        orgCode: "" //机构编码
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
      this.url = store.getters["api/registerUser"];
      this.searchParams = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...this.searchQuery
      };
      return true;
    },
    look(row) {
      this.$refs.detailsPopup.show = true;
      this.$refs.detailsPopup.form = row;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/page.scss";
@import "~@/assets/styles/table.scss";
</style>
