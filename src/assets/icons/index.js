import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)


// 安装模块 npm install svg-sprite-loader --save-dev
//使用：<svg-icon icon-class='logo'></svg-icon>
