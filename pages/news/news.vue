<template>
	<view class="news">
		<!-- 资讯 -->
		<view class="news_item" v-for="(item,index) in news" :key="index" @click="navigator(item.goods_id)">
			<view class="img">
				<img :src="item.goods_big_logo ? item.goods_big_logo : 'https://img1.baidu.com/it/u=1234898636,1354725942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1668186000&t=b8e12b00cbb7e7455853696d8e000877'" alt="">
			</view>
			<view class="info">
				<view class="name">{{item.goods_name}}</view>
				<view class="number">
					<view class="number_left">发表时间:{{item.upd_time | showDate}}</view>
					<view class="number_right">浏览:{{item.goods_price}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news: []
			}
		},
		// 进入页面就调用的方法
		onLoad() {
			this.getNews()
		},
		methods: {
			// 请求商品数据
			async getNews(){
				const res = await this.$myRequest({
					url: '/api/public/v1/goods/search',
				})
				console.log(res)
				this.news = res.data.message.goods
				console.log(this.news)
			},
			// 点击每一个商品 跳转 并且传递id
			navigator(goods_id) {
				uni.navigateTo({
					url: '/pages/news-detail/news-detail?goods_id='+ goods_id
				})
			}
		},
		filters: {
    showDate(value) {
      let newDate = new Date(value * 1000)
      let year = newDate.getFullYear()
      // let month = newDate.getMonth().toString().padStart(2,0)    俩位数
      let month = newDate.getMonth() + 1
      month = month < 10 ? '0' + month : month
      // let day = newDate.getDay().toString().padStart(2,0)
      let day = newDate.getDay()
      day = day < 10 ? '0' + day : day

      // let h = newDate.getHours();
      // h = h < 10 ? '0' + h : h    // 判断是否大于10 小于10前面加0
      // let m = newDate.getMinutes();
      // m = m < 10 ? '0' + m : m
      // let s = newDate.getSeconds();
      // s = s < 10 ? '0' + s : s
      // return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s 
      return year + '-' + month + '-' + day 
		}
  	}
	}
</script>

<style scoped lang="scss">
.news {
	.news_item {
		padding: 15rpx 35rpx 15rpx 15rpx;
		display: flex;
		border-bottom: 2rpx solid $shop-color;
  .img {
		min-width: 200rpx;
		max-width: 200rpx;

		flex: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
    img {
			width: 90%;
			height: 100%;
    }
  }
  .info {
		flex: 70%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
    .name {
			font-size: 30rpx;

    }
    .number {
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			display: flex;
      .number_left {
      }
      .number_right {

      }
    }
  }
}
}

</style>
