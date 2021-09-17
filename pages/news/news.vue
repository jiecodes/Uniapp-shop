<template>
  <view class="news">
      <view>资讯</view>
      <!-- 3 使用组件 -->
      <!-- 2.2 父组件定义事件 -->
      <new-item @itemClick="goDetail" :list="newsList"></new-item>
  </view>
</template>

<script>

// 1 引入封装好的new-item 组件
import newItem from '../../components/news-item/news-item.vue'

export default {
  data() {
    return({
      newsList: []
    })
  },
  methods: {
    async getNews() {
      const res = await this.$myRequest({
        url: '/api/public/v1/goods/search'
      })
      console.log(res);
      this.newsList = res.data.message.goods
    },
    // 点击跳转   父组件事件
    goDetail(goods_id) {
      uni.navigateTo({
        url: '/pages/news-detail/news-detail?goods_id='+goods_id
      })
    }
  },
  // 2 注册组件
  components: {
    "new-item": newItem
  },
  onLoad() {
    this.getNews()
  }
}
</script>

<style lang="scss"> 

</style>