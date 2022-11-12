<template>
    <view class="goods_list">
        <view class="goods_item" v-for="item in goods" :key="item.goods_id"
        @click="navigator(item.goods_id)" >
            <image :src="item.goods_small_logo"></image>
            <view class="price">
                <text>￥{{item.goods_price}}</text>
                <text>￥{{item.goods_id}}</text>
            </view>
            <view class="name">{{item.goods_name}}</view>
        </view>
    </view>
</template>

<script>
export default {
    props: ['goods'],
    methods: {
        navigator(goods_id) {
            // 2 自定义事件 触发父组件事件
            this.$emit('goodsItemClick',goods_id)
        }
    }
}
</script>

<style lang="scss">
    /* 商品 */
    .goods_list{
        padding: 0 15rpx;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods_item{
            background: #fff;
            width: 355rpx;
            margin: 10rpx 0;
            padding: 0 15rpx;
            /* // 盒子不会挤大、 */
            box-sizing: border-box;
            image{
                width: 80%;
                height: 150px;
                /* // 图片居中 */
                display: block;
                margin: 0 auto;
            }
            .price{
                color: $shop-color;
                font-size: 35rpx;
                margin: 10rpx 0 5rpx 10rpx;
                text:nth-child(2){
                    color: #ccc;
                    font-size: 28rpx;
                    margin-left: 17rpx;
                    /* // 文字划线 */
                    text-decoration: line-through;
                }
            }
            .name{
                font-size: 28rpx;
                line-height: 50rpx;
                // flex-wrap: wrap;
                padding-bottom: 15rpx;
                padding-top: 10rpx;
            }
        }
    }

</style>