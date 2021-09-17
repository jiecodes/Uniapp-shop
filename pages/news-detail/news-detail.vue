<template>
  <view class="news_detail">
      <!-- <view>资讯详情</view> -->
      <text  class="title">标题:{{detail.attr_name}}</text>
      <view class="info">
          <!-- 使用时间格式过滤器  -->
          <text>发表时间:{{detail.attr_id | formatDate }}</text>
          <text>浏览:{{detail.attr_value}}</text>
      </view>
      <!-- 富文本 解析html里的标签   uniapp<rich-text></rich-text>     v-html 
      <rich-text :nodes="detail.content"></rich-text> -->
      <view class="content">内容{{detail.attr_vals}}</view>
  </view>
</template>

<script>
export default {
    data() {
        return({
            goods_id: 1,
            detail: {},
        })
    },
    methods: {
        async getNewsDetail() {
            const res = await this.$myRequest({
                url: '/api/public/v1/goods/detail?goods_id='+this.goods_id
            })
            console.log(res);
            this.detail = res.data.message.attrs[6]
        }
    },
    onLoad(options) {
        this.goods_id = options.goods_id
        this.getNewsDetail()
    }
}
</script>

<style lang="scss">
    .news_detail {
        font-size: 30rpx;
        padding: 0 20rpx;
        .title {
            // 文字居中
            text-align: center;
            display: block;
            margin: 20rpx;
        }
        .info {
            display: flex;
            justify-content: space-between;
        }
    }
</style>