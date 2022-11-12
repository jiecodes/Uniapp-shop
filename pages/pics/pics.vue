<template>
  <div class="pics">
    <!-- 图片 -->
    <scroll-view class="left" scroll-y>
      <view @click="picsClick(index,item.cat_id)"
      v-bind:class="active===index ? 'active' : ''" 
      v-for="(item, index) in pics" :key="index">
        {{item.cat_name}}
      </view>
    </scroll-view>
    <scroll-view class="right" scroll-y :scroll-top="scrollTop" >
      <view v-for="(item,index) in rightPics" :key="index">
        <view v-for="(item1,index1) in item.children">
          <view v-for="(item2,index2) in item1.children">
            <img @click="previewImg(item2, index2)" :src="item2.cat_icon" alt="">
            <text>{{item2.cat_name}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pics: [],
      rightPics: [],
      active: 0,
      scrollTop: 0
    }
  },
  onLoad() {
    this.getPics()
  },
  methods: {
    // 请求商品分类数据
    async getPics() {
      const res = await this.$myRequest({
        url: '/api/public/v1/categories'
      })
      console.log(res)
      this.pics = res.data.message
      console.log(this.pics)

      // 进入页面先 调用点击左侧数据的请求
      this.picsClick(0,this.pics[0].cat_id)
    },
    // 点击左侧每一项
    async picsClick (index, cat_id) {
      
      console.log(index)
      this.active = index
        this.scrollTop = this.scrollTop + 222
      // 请求右侧数据 二级分类
      const res = await this.$myRequest({
        url: '/api/public/v1/categories?cat_id=' + cat_id
      })
      console.log(res)
      this.rightPics = res.data.message
      console.log(this.rightPics)
      
    },
    // 点击预览图片
    previewImg(item2, index2) {
      const urls = item2.cat_icon
      // const urls = this.rightPics.map(item => item.children)
      console.log(urls)
      uni.previewImage({
        urls: [urls],
        current: index2
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .pics {
    display: flex;
    .left {
      height: 100vh;
      width: 200rpx;
      text-align: center;
      border-right: 2rpx solid #ccc;
      view {
        padding: 30rpx 0;
        font-size: 34rpx;
        border-top: 2rpx solid #ccc;
      }
      view:last-child {
        border-bottom: 2rpx solid #ccc;
      }
    }
    .right {
      width: 530rpx;
      height: 100vh;
      margin: 0 auto;
      view {
        img {
          width: 100%;
        }
        text {
          text-align: left;
          font-size: 33rpx;
        }
      }
    }
    .active {
      color: white;
      background-color: $shop-color;
      border-radius: 10rpx;
    }
  }

</style>