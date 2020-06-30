//表格分页器
<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total,slot, ->, prev, pager, next,sizes,jumper"
    :total="total"
  >
    <span class="pageShow">第{{pagePercentage}}页</span>
  </el-pagination>
</template>
<script>
export default {
  props: {
    //当前页
    currentPage: {
      type: Number,
      default: 0
    },
    //选择一页多少数据
    pageSizes: {
      type: Array,
      default: () => [2, 5, 10, 20]
    },
    //每页多少条数据
    pageSize: {
      type: Number,
      default: 10
    },
    //总条数
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // currentNum: 1,
      // currentPageSize: 0
    };
  },
  mounted() {
    // this.currentNum = this.currentPage;
    // this.currentPageSize = this.pageSize;
  },
  methods: {
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.currentPageSize = val;
      this.$emit("changeSize", val);
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentNum = val;
      this.$emit("changePage", val);
    }
  },
  computed: {
    pagePercentage() {
      return this.currentPage + "/" + Math.ceil(this.total / this.pageSize);
    }
  }
};
</script>
<style lang='scss' scoped>
/deep/ .btn-prev,
/deep/ .btn-next {
  padding: 0;
  width: 28px;
  height: 28px;
  min-width: auto;
  border: 1px solid #bbb;
  border-radius: 3px;
  margin-right: 4px;
}

/deep/ .el-pagination__total,
.pageShow {
  color: #999;
  font-size: 16px;
  font-weight: 400;
}
/deep/ .el-pager {
  .number {
    padding: 0 9px;
    height: 28px;
    line-height: 28px;
    min-width: auto;
    border: 1px solid #bbb;
    border-radius: 3px;
    margin: 0 4px;
    color: #999;
  }
  .number.active {
    background: rgba(231, 243, 255, 1);
    color: #3f98f7;
  }
}
/deep/ .el-pagination__sizes {
  margin-left: 10px;
}
/deep/ .el-pagination__jump {
  margin-left: 0;
}
</style>