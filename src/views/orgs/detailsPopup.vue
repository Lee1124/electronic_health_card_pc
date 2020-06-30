//详情弹窗
<template>
  <el-dialog
    title="详情查看"
    custom-class="dialogStyle1 detailsPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
  >
    <el-form ref="form" :model="form" label-width="100px" v-if="form">
      <el-form-item label="appSecret:">
        <el-input v-model="form.appSecret" disabled></el-input>
      </el-form-item>
      <el-form-item label="appId:">
        <el-input v-model="form.appId" disabled></el-input>
      </el-form-item>
      <el-form-item label="机构名称:">
        <el-input v-model="form.orgName" disabled></el-input>
      </el-form-item>
      <el-form-item label="机构编号:">
        <el-input v-model="form.orgCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="机构类型:">
        <el-input v-model="form.orgLevelName" disabled></el-input>
      </el-form-item>
      <el-form-item label="注册时间:">
        <el-input :value="time(form.rigTime)" disabled></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import store from "@/store";
import { splitTime } from "@/utils/index";
export default {
  data() {
    return {
      show: false,
      form: null
    };
  },
  methods: {
    time(val) {
      return val ? splitTime(val) : "";
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/dialog.scss";
/deep/ .detailsPopup {
  width: 750px;
}
</style>