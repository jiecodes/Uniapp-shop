<template>
  <view class="goods_detail">
      <!-- <view>商品详情页</view> -->
      <!-- 轮播图 -->
      <swiper indicator-dots="true" indicator-active-color="#FF0000" autoplay="true" interval="6000" circular="true">
          <swiper-item v-for="(item,index) in swipers" :key="index">
              <image :src="item.pics_sma_url"></image>
          </swiper-item>
      </swiper>
      <view class="box1">
          <view class="price">
              <text>￥{{info.goods_price}}</text>
              <text>￥{{info.goods_id}}</text>
          </view>
          <view class="goods_name">{{info.goods_name}}</view>
      </view>
      <view class="line"></view>
      <view class="box2">
          <view>货号:{{info.cat_id}}</view>
          <view>库存:{{info.goods_cat}}</view>
      </view>
      <view class="line"></view>
      <view class="box3">
          <view class="title">详情介绍</view>
          <view class="content">内容:
              <!-- 富文本渲染 -->
              <rich-text :nodes="content"></rich-text>
          </view>
      </view>

      <!-- 使用官方 goodsNav组件 -->
      <view class="goods_nav">
        <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
      </view>
  </view>
</template>

<script>

// 导入官方的goodsNav
import uniGoodsNav from 'uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'

export default {
    data() {
        return{
            goods_id: 0,
            // 默认数据接收轮播图数据
            swipers: [],
            // 内容上面的数据
            info: {},
            // 内容数据
            content: '',
            
            // 引入官方的数组
            options: [
                {
                    icon: 'headphones',
                    text: '客服ya'
                }, 
                {
                    icon: 'shop',
                    text: '店铺',
                    info: 2,
                    infoBackgroundColor:'#007aff',
                    infoColor:"red"
                }, {
                    icon: 'cart',
                    text: '购物车',
                    info: 999
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
    methods: {
        async getSwipers() {
            const res = await this.$myRequest({
                url: '/api/public/v1/goods/detail?goods_id=' + this.goods_id
            })
            console.log(res);
            this.swipers = res.data.message.pics
        },
        // 获取详情页的内容数据
        async getDetailInfo() {
            const res = await this.$myRequest({
                url: '/api/public/v1/goods/detail?goods_id=' +this.goods_id
            })
            // console.log(res);
            // this.info = res.data.message[0]      取出数组第0项
            this.info = res.data.message
            // 获取内容数据
            this.content = res.data.message.goods_introduce
        },
        // 引入官方的方法
        onClick (e) {
        uni.showToast({
          title: `点击${e.content.text}`,
          icon: 'none'
            })
        },
        buttonClick (e) {
            console.log(e)
            this.options[2].info++
        }

    },
    // 注册官方提供的组件
    components: {
        uniGoodsNav
    },

    // 获取上个页面传过来的数据
    onLoad(options) {
        // console.log(options);    打印传过来的goods_id
        this.goods_id = options.goods_id
        this.getSwipers()
        this.getDetailInfo()
    }
}
</script>

<style lang="scss">
    // 轮播图
    .goods_detail {
        swiper {
            height: 700rpx;
            image {
                width: 100%;
                height: 100%;
            }
        }
    }
    // 信息栏
    .box1 {
        padding: 20rpx;
        .price {
            font-size: 35rpx;
            color: $shop-color;
            // 行高
            line-height: 80rpx;
            text:nth-child(2){
                color: #ccc;
                font-size: 30rpx;
                // 文字横线
                text-decoration: line-through;
                padding-left: 20rpx;
            }
        }
        .goods_name{
            font-size: 32rpx;
            line-height: 60rpx;
        }
    }
    .line {
        height: 10rpx;
        width: 750px;
        background: #eee;
    }
    .box2 {
        padding: 0 20rpx;
        font-size: 35rpx;
        line-height: 80rpx;
    }
    .box3 {
        padding-bottom: 55px;
        .title{
            font-size: 37rpx;
            padding-left: 30rpx;
            border-bottom: 1rpx solid #eee;
            line-height: 100rpx;
        }
        .content{
            padding: 15rpx;
            font-size: 30rpx;
            color: #333;
        }
    }
    // 官方提供组件
    .goods_nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>