//参数配置
const parameter = {
    namespaced: true,
    state: {
        updateTime: 20000,//首页数据更新时间间隔
        eventTypes: [
            { label: '申请', value: 1 },
            { label: '验证', value: 2 },
        ],
        rank1: [
            { label: "未定级", value: 0 },
            { label: "一级", value: 1 },
            { label: "二级", value: 2 },
            { label: "三级", value: 3 }
        ],
        rank2: [
            { label: "甲等", value: 0 },
            { label: "乙等", value: 1 },
            { label: "未知", value: 2 }
        ],
        rank3: [
            { label: "公立", value: 1 },
            { label: "民营", value: 2 }
        ]
    },
    getters: {
        updateTime: state => state.updateTime,
        eventTypes: state => state.eventTypes,
        rank1: state => state.rank1,
        rank2: state => state.rank2,
        rank3: state => state.rank3,
    }
}

export default parameter