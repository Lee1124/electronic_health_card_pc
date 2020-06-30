//混合的表格请求数据
import { initData } from '@/api/data'
import { Notification } from 'element-ui';
import { changeRes } from "@/api/common";
import {
    setRefValue,
    setSearchValue,
    setThisValue,
    getYMDHMS,
    getYMD,
    findName
} from '@/utils/index'
import { mapGetters } from "vuex";
import store from "@/store";
export default {
    computed: {

    },
    data() {
        return {
            time: '',
            //表格数据
            tableData: [
                { demo: '某某某' },
            ],
            //数据总条数
            total: 0,
            //当前页
            currentPage: 1,
            //每页数据条数
            pageSize: 10,
            //请求数据的url
            url: '',
            // 查询数据的参数
            searchParams: {},
            // 待查询的对象
            // query: {},
            // 表格 Loading 属性
            loading: false,

            echartData: [], //图表数据
        }
    },
    methods: {
        //初始化数据
        async init(type = 0) {
            if (!await this.beforeInit()) {
                return
            }
            return new Promise((resolve, reject) => {
                if (type === 0)
                    this.loading = true
                // 请求数据
                // console.log('请求所传的值：', this.getQueryParame())
                initData(this.url, this.getQueryParame()).then(data => {
                    let res = changeRes(data);
                    if (res.status != 0) {
                        Notification.error({
                            title: res.msg
                        })
                    } else {
                        if (!res.data) {
                            this.tableData = [];
                            this.total=this.currentPage=0;
                        } else {
                            this.total = res.data.total;
                            this.tableData = res.data.list;
                        }
                    }
                    // time 毫秒后显示表格
                    setTimeout(() => {
                        this.loading = false
                    }, this.time)
                    resolve(res)
                }).catch(err => {
                    this.loading = false
                    reject(err)
                })
            })
        },
        //改变每页多少条数据
        changeSize(val) {
            this.pageSize = val;
            this.init();
        },
        //改变当前页
        changePage(val) {
            this.currentPage = val;
            this.init();
        },
        getQueryParame() {
            return {
                ...this.searchParams
            }
        },
        changeDate(time) {
            this.setTime(time);
        },
        //设置时间
        setTime(timeArr) {
            let startTime = timeArr ? getYMD(timeArr[0]) + " 00:00:00" : "";
            let endTime = timeArr ? getYMD(timeArr[1]) + " 23:59:59" : "";
            setSearchValue(this, ["startTime", "endTime"], [startTime, endTime]);
        },
        // 表格通用样式
        tableRowStyle({ row, rowIndex }) {
            let className =
                (rowIndex + 1) % 2 === 0
                    ? "table-row-style table-row-style-2n"
                    : "table-row-style table-row-style-1n";
            return className;
        },
        updateData() {
            if (this.timeId) clearInterval(this.timeId);
            this.timeId = setInterval(() => {
                this.init(1);
            }, store.getters['parameter/updateTime']);
        }
    },

    filters: {
        dealTime(time) {
            return time ? getYMDHMS(parseInt(time)) : "";
        },
        dealTime2(time) {
            return time ? getYMDHMS(time) : "";
        }
    }
}