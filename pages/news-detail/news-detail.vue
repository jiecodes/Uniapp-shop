<template>
  <!-- 资讯详情页 -->
  <view class="goods_detail">
    <!-- 滚动 -->
    <scroll-view scroll-y>
      <!-- 轮播图 -->
      <swiper indicator-dots autoplay interval="2000" duration="800" circular>
        <swiper-item  v-for="(item, index) in newsDetail.pics" :key="index">
          <img :src="item.pics_sma_url" alt="">
        </swiper-item>
      </swiper>
      <!-- 文字 -->
      <view class="info">
        <view class="name">{{newsDetail.goods_name}}</view>
        <view class="number">
          <view class="price"><text>价格：</text>{{newsDetail.goods_price}}</view>
          <view class="id">{{newsDetail.goods_id}}</view>
        </view>
      </view>
      <!-- 富文本 -->
      <!-- <view v-html="newsDetail.goods_introduce"></view>  可能错误 -->
      <rich-text :nodes="newsDetail.goods_introduce"></rich-text>
      
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goods_id: 0,
      newsDetail: '',
    }
  },
  methods: {
    async getNewsDetail() {
      const res = await this.$myRequest({
        url: '/api/public/v1/goods/detail?goods_id=' + this.goods_id
      })
      console.log(res)
      this.newsDetail = res.data.message
      console.log(this.newsDetail)
    }
  },
  // 页面加载 用option获取上个页面传递过来的 数据
  onLoad(option) {
    console.log(option)
    this.goods_id = option.goods_id

    this.getNewsDetail()
  }
}
</script>

<style scoped lang="scss">
.goods_detail {
  scroll-view {
    width: 100%;
    height: 100vh;
    swiper {
      height: 800rpx;
      width: 100%;
      swiper-item {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .info {
      padding: 30rpx;
      .name {
        font-size: 35rpx;
        font-weight: 600;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .number {
        padding: 20rpx 0;
        display: flex;
        justify-content: space-between;
        .price {
          color: $shop-color;
          text {
            color: black;
          }
        }
      }
    }

  }
}

</style>