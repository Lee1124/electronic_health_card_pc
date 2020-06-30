import Vue from 'vue'


/**
 * 通知
 * @param {*} msg 通知内容
 * @param {*} type 类型（success,error,warning...） 
 * @param {*} title 标题
 */
export function notify(msg, type = 'success', title = '成功', duration = 2000) {
    Vue.prototype.$notify({
        title: title,
        message: msg,
        type: type,
        duration: duration
    });
}

/**
 * 根据时间戳获取年月日
 * @param {*} timestamp 时间戳
 */
export function getYMD(timestamp) {
    let time = new Date(timestamp)
    let year = time.getFullYear()
    const month = (time.getMonth() + 1).toString().padStart(2, '0')
    const date = (time.getDate()).toString().padStart(2, '0')
    return year + '-' + month + '-' + date
}

/**
 * 根据时间戳获取年月日时分秒
 * @param {*} timestamp 时间戳
 */
export function getYMDHMS(timestamp) {
    let time = new Date(timestamp)
    let year = time.getFullYear()
    const month = (time.getMonth() + 1).toString().padStart(2, '0')
    const date = (time.getDate()).toString().padStart(2, '0')
    const hours = (time.getHours()).toString().padStart(2, '0')
    const minute = (time.getMinutes()).toString().padStart(2, '0')
    const second = (time.getSeconds()).toString().padStart(2, '0')
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
}


/**
 * 根据数据字段筛选出来形成数组
 * @param {*} data 数据
 * @param {*} key 关键词
 */
export function getArrary(data, key) {
    let arr = [];
    data.forEach(item => {
        arr.push(item[key]);
    });
    return arr;
}

/**
 * 使用递归的方式实现数组、对象的深拷贝
* @obj {string} object 拷贝的对象
*/
export function deepClone(obj) {
    //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
    var objClone = Array.isArray(obj) ? [] : {};
    //进行深拷贝的不能为空，并且是对象或者是
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

/**
 * 时间转换(年月日时分秒)
 * @param {*} time 时间
 * @param {*} str 隔开符号
 */
export function getY_M_D_H_M_S(time, str = '-', hfm = true) {
    if (!Boolean(time)) {
        return '';
    }
    const d = new Date(time);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
    const day = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
    const hour = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
    const minute = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
    const second = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds();
    if (hfm) {
        const ts = year + str + month + str + day + ' ' + hour + ':' + minute + ':' + second;
        return ts;
    } else {
        const ts = year + str + month + str + day;
        return ts;
    }
}

/**
 * 选取时间区间，根据天数来确定范围（不包括今天）
 * @param {*} val 天数
 */
export function timeRangeNoToDay(val = 7) {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * (val + 1));
    end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
    const startTime = start.getFullYear() + '-' + ((start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : (start.getMonth() + 1)) + '-' + (start.getDate() < 10 ? "0" + start.getDate() : start.getDate());
    const endTime = end.getFullYear() + '-' + ((end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : (end.getMonth() + 1)) + '-' + (end.getDate() < 10 ? "0" + end.getDate() : end.getDate());
    return [startTime, endTime];
}


/**
 * 选取时间区间，根据天数来确定范围（包括今天）
 * @param {*} val 天数
 */
export function timeRangeInToDay(val = 7) {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * val);
    const startTime = start.getFullYear() + '-' + ((start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : (start.getMonth() + 1)) + '-' + (start.getDate() < 10 ? "0" + start.getDate() : start.getDate());
    const endTime = end.getFullYear() + '-' + ((end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : (end.getMonth() + 1)) + '-' + (end.getDate() < 10 ? "0" + end.getDate() : end.getDate());
    return [startTime, endTime];
}


/**
 * 根据无分隔符号的时间进行转化成有分隔符号的时间
 * @param {*} val 值 eg:20200623120012
 */
export function splitTime(val) {
    let arr = [];
    let str = '';
    for (let i = 0; i <= val.length; i++) {
        if (i % 2 == 0 && i != 0 && i != 2) {
            if (i === 6 || i === 8) {
                str = '-'
            } else if (i === 10) {
                str = ' '
            } else if (i === 12 || i === 14) {
                str = ':'
            }
            if (i === 4) {
                arr.push(val.substring(0, i))
            } else {
                arr.push(str + val.substring(i - 2, i))
            }
        }
    }

    return arr.join('')
}


/**
 * 根据value获取相应的label
 * @param {*} arr 数据
 */
export function findName(arr, val) {
    let name = arr.filter(item => item.value == val);
    name = name.length > 0 ? name[0].label : "";
    return name;
}

/**
 * 设置查询条件中的值
 * @param {*} that 执行域
 * @param {*} obj 数组 ["dept", "doctor"]
 * @param {*} valArr 值的数组 [arr1,arr2]
 */
export function setSearchValue(that, obj, valArr) {
    if (Array.isArray(obj)) {
        obj.forEach((key, index) => {
            that.searchQuery[key] = valArr ? valArr[index] ? valArr[index] : "" : "";
        });
    } else {
        Object.keys(obj).map((key, index) => obj[key] = valArr ? valArr[index] ? valArr[index] : "" : "")
    }
}

/**
 * 设置子组件的值
 * @param {*} that 执行域
 * @param {*} arr ["departments", "doctors"]
 * @param {*} valArr 值的数组 [val1,val2]
 */
export function setRefValue(that, arr, valArr) {
    arr.forEach((item, index) => {
        if (that.$refs[item]) that.$refs[item].value = valArr ? valArr[index] ? valArr[index] : "" : "";
    });
}

/**
 * 设置当前组件的值
 * @param {*} that 执行域
 * @param {*} arr ["departments", "doctors"]
 * @param {*} valArr 值的数组 [val1,val2]
 * @param {*} defaultVal 默认的值  "" , []
 */
export function setThisValue(that, arr, valArr, defaultVal = "") {
    arr.forEach((item, index) => {
        that[item] = valArr ? valArr[index] || valArr[index] == 0 ? valArr[index] : defaultVal : defaultVal;
    });
}


/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result
    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp
        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }
    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }
        return result
    }
}


