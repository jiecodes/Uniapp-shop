<template>
    <view class="goods_list">
        <view>我的超市</view>
                        <!-- 3 使用组件 -->
        <goods-list @goodsItemClick="goGoodsDetail" :goods="goods"></goods-list>
        <view class="isOver" v-if="flag">---没有数据----</view>
    </view>
</template>

<script>
import goodsList from '../../components/goods-list/goods-list.vue'
export default {
    data() {
        return{
            pagenum: 1,
            goods: [],
            flag: false
        }
    },
    components: {
        "goods-list": goodsList
    },
    methods: {
        // 获取商品列表的数据
        async getGoodsList(callBack) {
            const res = await this.$myRequest({
                url: '/api/public/v1/goods/search?pagenum=' + this.pagenum 
            })
            console.log(res);
            this.goods = [...this.goods,...res.data.message.goods]
            // 下拉刷新成功后隐藏
            // uni.stopPullDownRefresh()
            callBack && callBack()
        },
        onLoad() {
            this.getGoodsList()
        },
        // 向下滚动触发事件
        onReachBottom() {
            console.log(this.goods.length);
            if(this.goods.length<this.pagenum*20) return this.flag =true
            this.pagenum++
            this.getGoodsList()
        },
        // 监听下拉刷新
        onPullDownRefresh() {
            // 清空数据
            this.pagenum = 1
            this.goods = []
            this.flag = false
            // 延迟1秒显示数据
            setTimeout(()=> {
                this.getGoodsList(()=> {
                    uni.stopPullDownRefresh() 
                })
            },1000)
        },
        // 1 导航跳到商品详情页
        goGoodsDetail(goods_id) {
            uni.navigateTo({
                url: '/pages/goods-detail/goods-detail?goods_id='+goods_id
            })
        }
    }
}
</script>

<style lang="scss">
    .goods_list {
        background: #eee;
    }
    .isOver {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 28rpx;
    }
</style>