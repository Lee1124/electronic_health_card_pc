//系统请求参数
const api = {
    namespaced: true,
    state: {
        registerUser: "auth/dz_data/registerUser/selectAllUser",
        userCardData: "auth/dz_data/userCardData/selectAllUser",
        orgs: "auth/dz_data/home/selectNewOrg",
        userRegister: "auth/dz_data/home/mainEvent",
        dailyData: 'auth/dz_data/organization/selectNewOrg'
    },
    getters: {
        registerUser: state => state.registerUser,//查询所有注册用户
        userCardData: state => state.userCardData,//查询所有用卡数据
        orgs: state => state.orgs,//查询所有用卡数据
        userRegister: state => state.userRegister,//用户注册
        dailyData: state => state.dailyData,//每日数据
    }
}

export default api;