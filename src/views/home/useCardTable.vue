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
        <el-table-column prop="orgName" label="机构名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ehealthCardId" label="健康卡ID" show-overflow-tooltip></el-table-column>
        <el-table-column prop="medstepName" width="60" label="用卡环节"></el-table-column>
        <el-table-column prop="createTime" label="用卡时间" sortable show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.createTime | dealTime2}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>
<script>
import initData from "@/mixins/req";
import store from "@/store";
export default {
  mixins: [initData],
  data() {
    return {
      timeId: null,
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
    this.init();
    this.updateData();
  },
  methods: {
    beforeInit() {
      this.url = store.getters["api/userCardData"];
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
  }
};
</script>
