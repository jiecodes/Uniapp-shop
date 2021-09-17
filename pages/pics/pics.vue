<template>
    <view class="pics">
        <!-- <view>图片</view> -->
        <scroll-view class="left" scroll-y>
            <view :class="active===index?'active':''" v-for="(item,index) in cates" :key="item.cat_id"
            @click="leftClickHandle(index,item.cat_id)">
                {{item.cat_name}}
            </view>
        </scroll-view>
        <scroll-view class="right" scroll-y>
            <view class="item" v-for="(item1,index) in thirdData" :key="item1.cat_id">
                <image @click="previewImg(item1.cat_icon)" :src="item1.cat_icon"></image>
                <text>{{item1.cat_name}}</text>
                <!-- <text v-if="secondData.length === 0">无数据</text> -->
            </view>
        </scroll-view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            cates: [],
            active: 0,
            secondData: [],
            thirdData: [],
        }
    },
    methods: {
        // 左侧数据
        async getPicsCate() {
            const res = await this.$myRequest({
                url: '/api/public/v1/categories'
            })
            this.cates = res.data.message
            // this.leftClickHandle(0,this.cates[0].cat_id)
        },
        // 点击切换active
        async leftClickHandle(index,cat_id) {
            this.active = index
            // console.log(cat_id);
            // 获取右侧的数据
            const res = await this.$myRequest({
                url: '/api/public/v1/categories'
            })
            console.log(res);
            this.secondData = this.cates[index].children
            this.thirdData = this.secondData[index].children
        },
        // 点击图片预览
        previewImg(current) {
            const urls = this.thirdData.map(item=> {
                return item.cat_icon
            })
            uni.previewImage({
                current,
                urls
            })
        }
    },
    onLoad() {
        this.getPicsCate()
    }
}
</script>

<style lang="scss">
page {
    height: 100%;
}
    .pics {
        height: 100%;
        display: flex;
        .left {
            width: 200rpx;
            height: 100%;
            border-right: 1rpx solid #eee;
            view {
                height: 60px;
                line-height: 60px;
                font-size: 30rpx;
                text-align: center;
                border-top: 1rpx solid #eee;
            }
            .active {
                background: $shop-color;
                color: white
            }
        }
        .right {
            height: 100%;
            width: 520rpx;
            margin: 10rpx auto;
            .item {
                image {
                    width: 520rpx;
                    height: 420rpx;
                    border-radius: 5px;
                }
                text {
                    font-size: 26rpx;
                    // 行高
                    line-height: 60rpx;
                }
            }
        }
    }
</style>