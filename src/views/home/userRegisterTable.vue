<template>
  <div
    class="table-content-container"
    v-loading="loading"
    element-loading-text="加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <el-scrollbar style="height:100%">
      <el-table
        row-class-name="tableRowStyle"
        :show-header="false"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="eventSource" label="时间来源" show-overflow-tooltip></el-table-column>
        <el-table-column  prop="processResults" label="处理结果" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createTime" label="事件时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dealTime}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>
<script>
import initData from "@/mixins/req";
import store from "@/store";
import { findName } from "@/utils/index";
export default {
  mixins: [initData],
  data() {
    return {
      timeId: null
    };
  },
  created() {
    this.init();
    this.updateData();
  },
  methods: {
    beforeInit() {
      this.url = store.getters["api/userRegister"];
      this.currentPage = 1;
      this.pageSize = 10;
      this.searchParams = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...this.searchQuery
      };
      return true;
    }
  },
  beforeDestroy() {
    clearInterval(this.timeId);
  },
  filters: {
    eventType(val) {
      return val ? findName(store.getters["parameter/eventTypes"], val) : "";
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
