//混合的表格请求数据
import { getORG, changeRes } from "@/api/common";
import { deepClone } from '@/utils/index';

export default {
    data() {
        return {
            orgs: []
        }
    },
    methods: {
        //初始化机构数据
        initORG() {
            return new Promise((resolve, reject) => {
                // 请求数据
                getORG().then(data => {
                    let res = changeRes(data);
                    if (res.status === 0) {
                        let data = deepClone(res.data);
                        data.unshift({ orgName: '全部', orgCode: "" })
                        this.orgs = data.map(item => {
                            return {
                                label: item.orgName,
                                value: item.orgCode
                            }
                        });
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}