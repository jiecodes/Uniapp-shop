<template>
  <!-- 商品详情 -->
  <div class="goods_detail">
    <scroll-view scroll-y>
      <!-- 轮播图 -->
      <swiper indicator-dots interval="10000" indicator-color="red" indicator-active-color="blue" autoplay circular>
        <swiper-item v-for="(item,index) in goods_detail.pics" :key="index">
          <img :src="item.pics_sma_url" alt="">
        </swiper-item>
      </swiper>
      <view class="info">
        <view class="price">
          <view class="price_new">￥{{goods_detail.goods_price}}</view>
          <view class="price_old">￥{{goods_detail.goods_price}}</view>
        </view>
        <view class="name">{{goods_detail.goods_name}}</view>
        <view class="line"></view>
        <view class="number">
          <view class="number_top">库存:{{goods_detail.goods_id}}</view>
          <view class="number_right">货号:{{goods_detail.goods_number}}</view>
        </view>
        <view class="line"></view>
      </view>
      <view class="recommend">
        <view>详细介绍</view>
        <rich-text :nodes="goods_detail.goods_introduce"></rich-text>
      </view>
      <!-- 底部导航栏 导入的 -->
      <uni-goods-nav class="uni_goods_nav" :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </scroll-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      goods_detail: '',
      goods_id: 0,
      // 底部导航栏
      options: [{
			icon: 'headphones',
			text: '客服'
		}, {
			icon: 'shop',
			text: '店铺',
			info: 2,
			infoBackgroundColor:'#007aff',
			infoColor:"red"
		}, {
			icon: 'cart',
			text: '购物车',
			info: 2
		}],
	    buttonGroup: [{
	      text: '加入购物车',
	      backgroundColor: '#ff0000',
	      color: '#fff'
	    },
	    {
	      text: '立即购买',
	      backgroundColor: '#ffa200',
	      color: '#fff'
	    }
	    ]
    }
  },
  onLoad(option) {
    console.log(option)
    this.goods_id = option.goods_id
    this.getGoodsDetail()
  },
  methods: {
    // 请求商品详情页数据 通过goods_id请求
    async getGoodsDetail() {
      const res = await this.$myRequest({
        url: '/api/public/v1/goods/detail?goods_id=' + this.goods_id
      })
      console.log(res)
      this.goods_detail = res.data.message
    },
    // 底部导航栏
    onClick (e) {
      console.log(e)
	    uni.showToast({
	      title: `点击${e.content.text}`,
        icon: 'none'

	    })
	  },
	  buttonClick (e) {
	    console.log(e)
	    this.options[2].info++
	  }
	}
}
</script>

<style lang="scss" scoped>
.goods_detail {
  width: 100%;
  scroll-view {
    swiper {
      height: 800rpx;
      swiper-item {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  
  .info {
    padding: 30rpx;
    line-height: 60rpx;
    .price {
      display: flex;
      padding: 10rpx 0;
      .price_new {
        font-size: 38rpx;
        color: $shop-color;
      }
      .price_old {
        font-size: 30rpx;
        color: #ccc;
        text-decoration: line-through;
        padding-left: 20rpx;
        line-height: 70rpx;

      }
    }
    .name {
      font-size: 38rpx;
      padding: 10rpx 0;

      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .number {
      padding: 10rpx 0;
      font-size: 35rpx;
      .number_top {

      }
      .number_right {

      }
    }
  }
  .recommend {
    font-size: 40rpx;
      padding-bottom: 100rpx;
    view {
      border-bottom: 2rpx solid #ccc;
      padding: 0 20rpx 10rpx 20rpx;
      margin-bottom: 10rpx;
    }
  }
  // 底部导航栏
  .uni_goods_nav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
  // 横线
  .line {
    width: 100vw;
    height: 10rpx;
    background-color: #ccc;
    margin: 0 -30rpx ;
  }
  
}
</style>