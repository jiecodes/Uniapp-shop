// 入口文件

import Vue from 'vue'
import App from './App'
// 2 接收util下api封装的组件        导入自己封装的promise请求接口
import { myRequest} from './util/api'

// 3 全局使用封装myRequest 的方法           为了其他页面可以使用,把 导入的promise 添加到Vue原型上 
Vue.prototype.$myRequest = myRequest

// 定义全局过滤器 用于格式时间
Vue.filter('formatDate',(date)=> {
    const nDate = new Date(date)
    // 年
    const year = nDate.getFullYear()
    // 月  如果是一位数 前面加0
    const month = nDate.getMonth().toString().padStart(2,0)
    // 日
    const day = nDate.getDate().toString().padStart(2,0)
    // 拼接 年 月 日
    return year+ '-' +month+ '-'+day
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
