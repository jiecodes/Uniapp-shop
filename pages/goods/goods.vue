<template>
  <div>
    <!-- 我的超市 -->
    <goods-list :goodsList="goodsList" @getGoodsDetail1="goodsDetailClick"></goods-list>
    <view class="close" v-show="isActive">下一条请求数据 不够20条</view>

  </div>
</template>

<script>
import  goodsList from "../../components/goods-list1/goods-list1.vue";

export default {
  data() {
    return {
      // 商品列表当前页
      pagenum: 1,
      goodsList: [],
      isActive: false
    }
  },
  // 组件
  components: {
    "goods-list": goodsList
  },
  // 页面加载 执行
  onLoad() {
    this.getGoodsList();
  },
  // 页面上拉 加载下一页
  onReachBottom() {
    console.log(this.goodsList.length)
    // if (this.goodsList.length < 20 * this.pagenum) 
    if (this.goodsList.length % 20 != 0) 
    return this.isActive = true
    this.pagenum++;
    this.getGoodsList()
  },
  // 开启下拉刷新 先在 pages.json文件配置style属性
  onPullDownRefresh() {
    console.log('下拉刷新了')
    this.goodsList = []
    this.pagenum = 1
    setTimeout(() => {
      // 重新请求商品 数据
      this.getGoodsList(()=> {
        // 关闭下拉刷新
        uni.stopPullDownRefresh()
      })
    }, 500);
  },
  methods: {
    // 获取商品数据
    async getGoodsList(callBack) {
      const res = await this.$myRequest({
        url: '/api/public/v1/goods/search?pagenum='+this.pagenum
      })
      // 用于页面加载下一页数据
      this.goodsList = [...this.goodsList, ...res.data.message.goods]
      // this.goodsList = res.data.message.goods
      console.log(res)
      console.log(this.goodsList)
      console.log(...res.data.message.goods)
      // 取消下拉刷新 耗内存
      // uni.stopPullDownRefresh()
      // callBack(回调函数 接收关闭下拉刷新) 定时器结束后 发送网络请求 关闭下拉刷新 
      // 逻辑与 都为true才为true 有一个为false为false
      callBack && callBack()
    },
    // 点击商品每一项 跳转到相对页面
    goodsDetailClick(goods_id) {
      uni.navigateTo({
        url:'/pages/goods-detail/goods-detail?goods_id='+ goods_id
      })
    }
  }
}
</script>

<style scoped>
  .close {
    width: 100%;
    height: 30rpx;
    background-color: #fff;
  }
</style>