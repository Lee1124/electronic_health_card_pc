//级联选择器
<template>
  <div class="Cascader">
      <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
  </div>
</template>
<script>
export default {
  name: "Cascader",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {},
  data() {
    return {
      value: ["1", "1-1", "1-1-1", "1-1-1-1"],
      options: [
        {
          value: "1",
          label: "四川省",
          children: [
            {
              value: "1-1",
              label: "成都市",
              children: [
                {
                  value: "1-1-1",
                  label: "金堂县",
                  children: [{ value: "1-1-1-1", label: "哈哈" }]
                }
              ]
            },
            {
              value: "1-2",
              label: "巴中市",
              children: [{ value: "1-2-1", label: "南江县" }]
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
<style lang='scss' scoped>
@import "~@/assets/styles/btn.scss";
// .Cascader {
//   /deep/ .el-cascader {
//     //   width: 208px;
//   }
// }
</style>