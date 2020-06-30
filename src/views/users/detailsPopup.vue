//详情弹窗
<template>
  <el-dialog
    title="用户详情"
    custom-class="dialogStyle1 detailsPopup"
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="show"
  >
    <el-form ref="form" :model="form" label-width="100px" v-if="form">
      <el-form-item label="电子健康卡ID:">
        <el-input v-model="form.ehealthCardId" disabled></el-input>
      </el-form-item>
      <el-form-item label="证件号:">
        <el-input v-model="form.idNo" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户姓名:">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户性别:">
        <el-input :value="sex(form.gender)" disabled></el-input>
      </el-form-item>
      <el-form-item label="出生日期:">
        <el-input :value="time(form.birthday)" disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号码:">
        <el-input v-model="form.cellphone" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系电话:">
        <el-input v-model="form.telephone" disabled></el-input>
      </el-form-item>
      <el-form-item label="创建时间:">
        <el-input :value="time(form.createTime)" disabled></el-input>
      </el-form-item>
      <el-form-item label="修改时间:">
        <el-input :value="time(form.editeTime)" disabled></el-input>
      </el-form-item>
      <el-form-item label="国籍:">
        <el-input v-model="form.nationality" disabled></el-input>
      </el-form-item>
      <el-form-item label="申请单位:">
        <el-input v-model="form.unit" disabled></el-input>
      </el-form-item>
      <el-form-item label="申请机构:">
        <el-input v-model="form.orgName" disabled></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import store from "@/store";
import { getYMD } from "@/utils/index";
export default {
  data() {
    return {
      show: false,
      form: null
    };
  },
  methods: {
    sex(val) {
      return val == 1 ? "男" : "女";
    },
    time(val) {
      if (val) return getYMD(parseInt(val));
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