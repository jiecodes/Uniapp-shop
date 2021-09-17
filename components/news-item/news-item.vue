<template>
  <view>
      <!-- 封装news里面的 -->
    <view class="new_item" @click="navigator(item.goods_id)" v-for="item in list" :key="item.goods_id">
        <image :src="item.goods_small_logo"></image>
        <view class="right">
            <view class="title">
                {{item.goods_name}}
            </view>
            <view class="info">
                <text>发表时间:{{item.add_time | formatDate}}</text>
                <text>浏览:{{item.goods_price}}</text>
            </view>
        </view>
    </view>
  </view>
</template>

<script>
export default {
    // 遍历的数据
    props: ['list'],
    // 定义过滤器  用于过滤时间格式
    filters: {
        formatDate(date) {
            const nDate = new Date(date)
            // 年
            const year = nDate.getFullYear()
            // 月  如果是一位数 前面加0
            const month = nDate.getMonth().toString().padStart(2,0)
            // 日
            const day = nDate.getDate().toString().padStart(2,0)
            // 拼接 年 月 日
            return year+ '-' +month+ '-'+day
        }
    },
    methods: {
        // 定义点击事件的方法
        navigator(goods_id) {
            // 2.1 子调用父组件事件
            this.$emit('itemClick',goods_id)
        }
    }
}
</script>

<style lang="scss">
    .new_item {
    display: flex;
    padding: 10rpx 20rpx;
    border-bottom: 1rpx solid $shop_color;
        image {
        min-width: 200rpx;
        max-width: 200rpx;
        height: 150rpx;
        }
        .right {
        margin-left: 15rpx;
        display: flex;
        /* // 侧轴 */
        flex-direction: column;
        justify-content: space-between;
            .title {
                font-size: 30rpx;
            }
            .info {
                text {
                font-size: 23rpx;
                }
                text:nth-child(2) {
                margin-left: 60rpx;
                }
            }
        }
    }
</style>