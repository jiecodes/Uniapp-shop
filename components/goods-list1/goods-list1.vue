<template>
  <!-- 对应这次项目的 文件 -->

  
  <view class="goods">
			<view class="goods_item" v-for="(item,index) in goodsList" :key="index" @click="itemClick(item.goods_id)">
				<view class="img">
					<img :src="item.goods_small_logo ? item.goods_small_logo : 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000632066713_1_400x400.jpg'" alt="">
				</view>
				<view class="text">
					<text>￥{{item.goods_price}}</text>
					<text>￥{{item.goods_price}}</text>
				</view>
				<view class="name">{{item.goods_name}}</view>
			</view>
		</view>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
	},
	methods: {
		// 点击按钮跳转到 详情页 子传父
		itemClick(goods_id) {
			this.$emit('getGoodsDetail1',goods_id)
		}
	}
}
</script>

<style lang='scss' scoped>
.goods {
			background-color: #eee;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			.goods_item {
				margin-top: 18rpx;
				width: 48%;
				background-color: #fff;
				.img {
					padding: 20rpx 0;
					width: 100%;
					text-align: center;
					img {
						width: 100%;
					}
				}
				.text {
					text:nth-child(1) {
						color: $shop-color;
						font-size: 35rpx;
						padding: 0 20rpx;
					}
					text:nth-child(2) {
						color: #ccc;
						font-size: 26rpx;
						text-decoration: line-through;
					}
				}
				.name {
					padding: 25rpx 20rpx 0;
					margin-bottom: 25rpx;
					line-height: 60rpx;
					font-size: 40rpx;
					color: black;

					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;

					// word-break:break-all;
				}
			}
		}
</style>