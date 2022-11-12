<template>
  <div class="contact">
    <!-- 联系我们 -->

    <view>
      <img src="../../static/1f3bf6a1483fe602c8028714a45f7bd6.jpeg" alt="">
    </view>
    <view class="phone">
      <view @click="phoneClick">联系电话:40003223(点击拨打)</view>
    </view>
    <view class="address">地址: 北京市东城区景山前街4号</view>
    <map :longitude='longitude' :latitude='latitude' scale="12" :markers='markers'></map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      longitude: 114.28902,
      latitude: 39.765837,
      markers: [
        {
          longitude: 114.28902,
          latitude: 39.765837,
          iconPath: '../../static/icon/address.png',
          width: 40,
          height: 40
        }
      ]
    }
  },
  methods: {
    phoneClick() {
      uni.makePhoneCall({
        phoneNumber: '12345',
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .contact {
    font-size: 34rpx;
    view {
      // width: 100%;
      img {
        width: 100%;
      }
    }
    .phone {
      border-bottom: 2rpx solid #ccc;
      view {
      padding: 30rpx 15rpx;
      }
    }
    .address {
      padding: 30rpx 15rpx;
    }
    map {
      width: 100%;
      height: 50vh;
    }
  }
</style>