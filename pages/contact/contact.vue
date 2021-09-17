<template>
    <view>
        <view>关于我们</view>
        <view class="contact">
            <image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
        </view>
        <view class="info">
            <view @click="phone">联系电话: 400-618-9090(点击拨打哦)</view>
            <view>地址:浙江省杭州市下沙经济开发区4号大街187号盛泰时代山</view>
        </view>
        <map class="map" :longitude="longitude" :scale="scale" :latitude="latitude" :markers="markers"></map>
    </view>
</template>

<script>
export default {
    data() {
        return {
            longitude: 114.285139,
            latitude: 39.769109,
            // 地图缩放程度
            scale: 10,
            markers: [
                {
                    longitude: 114.285139,
                    latitude: 39.769109,
                    iconPath: '../../static/hmlogo.png',
                    // 透明度
                    alpha: 0.4,
                    width: 40,
                    height: 40
                }
            ],
            methods: {
                phone() {
                    uni.makePhoneCall({
                        phoneNumber: '400-618-9090'
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .contact {
        .img {
            width: 750rpx;
            height: 320rpx;
        }
    }
    .info {
        padding: 10rpx 20rpx;
        font-size: 30rpx;
        view {
            line-height: 60rpx;
            border-bottom: 1rpx solid #333;
        }
    }
    .map {
        width: 750rpx;
        height: 750rpx;
    }
</style>