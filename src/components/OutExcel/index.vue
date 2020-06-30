//通用导出表格按钮及功能
<template>
  <el-button size="medium" @click.stop="outExcel">{{btnText}}</el-button>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "outBtn",
  props: {
    idName: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "导出表格"
    },
    btnText:{
      type: String,
      default: "导出"
    }
  },
  methods: {
    outExcel() {
      /* generate workbook object from table */
      var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
      let wb = XLSX.utils.table_to_book(document.querySelector('#'+this.idName),xlsxParam);
      /* get binary string as output */
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
        compression:true,
        WTF:true
      });
      console.log(wb,wbout)
      let xlsxName = this.title + ".xlsx";
      try {
        FileSaver.saveAs(
          new Blob([wbout], {
            type: "application/octet-stream"
          }),
          xlsxName
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  }
};
</script>