// 医疗机构查询
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
            <el-form-item label="机构编号">
              <el-input
                class="search-btn"
                size="small"
                :clearable="true"
                v-model="orgCode"
                placeholder="机构编号"
                @change="search()"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="机构类型">
            <el-input
              class="search-btn"
              size="small"
              :clearable="true"
              v-model="searchQuery.orgLevel"
              placeholder="机构类型"
              @change="search()"
            ></el-input>
            </el-form-item>-->
            <el-form-item label="APPID">
              <el-input
                class="search-btn"
                size="small"
                :clearable="true"
                v-model="searchQuery.appId"
                placeholder="APPID"
                @change="search()"
              ></el-input>
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
          <el-table-column prop="orgCode" label="机构编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="orgLevelName" label="机构类型" show-overflow-tooltip></el-table-column>
          <el-table-column prop="appSecret" label="appSecret" show-overflow-tooltip></el-table-column>
          <el-table-column prop="appId" label="appId" show-overflow-tooltip></el-table-column>
          <el-table-column prop="rigTime" label="注册时间" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.rigTime | rigTime}}</span>
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
import detailsPopup from "./detailsPopup";
import { setSearchValue,setThisValue, deepClone, findName, splitTime } from "@/utils/index";
import initData from "@/mixins/req";
import initORG from "@/mixins/org";
import store from "@/store";
export default {
  name: "cards",
  mixins: [initData, initORG],
  components: { detailsPopup },
  data() {
    return {
      searchQuery: {
        startTime: "", // 开始时间
        endTime: "", //结束时间
        orgName: "", //机构名称
        orgCode: "", //机构编码
        appId: "" //appid
      },
      orgCode: ""
    };
  },
  created() {
    this.initORG();
    this.init();
  },
  methods: {
    look(row) {
      this.$refs.detailsPopup.show = true;
      this.$refs.detailsPopup.form = row;
    },
    search() {
      this.init();
    },
    reloadSearch() {
      setSearchValue(this, this.searchQuery);
      setThisValue(this,['orgCode'])
      this.init();
    },
    beforeInit() {
      this.url = store.getters["api/orgs"];
      let searchQuery = deepClone(this.searchQuery);
      if (this.orgCode != "") searchQuery.orgCode = this.orgCode;
      this.searchParams = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...searchQuery
      };
      return true;
    }
  },
  filters: {
    rigTime(val) {
      return val ? splitTime(val) : "";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/assets/styles/page.scss";
@import "~@/assets/styles/table.scss";
</style>
