<template>
	<view class="home">
		<!-- 首页 -->
		<!-- 轮播图 -->
		<swiper indicator-dots circular indicator-color="red" indicator-active-color="blue" autoplay duration="200" interval="3000"
		>
			<swiper-item v-for="(item,index) in swiper" :key="index">
				<image :src="item.image_src" alt="">
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nav">
			<div class="nav_item" v-for="(item, index) in nav" :key="index" @click="navItemClick(item.path)">
				<view class="imgbg">
					<view :class="item.icon"></view>
				</view>
				<text>{{item.title}}</text>
			</div>
			<!-- <div class="nav_item">
				<view class="imgbg">
					<view class="iconfont icon-xueshengchaoshixiaofei"></view>
				</view>
				<text>我的超市</text>
			</div>
			<div class="nav_item">
				<view class="imgbg">
					<view class="iconfont icon-guanyuwomen"></view>
				</view>
				<text>联系我们</text>
			</div>
			<div class="nav_item">
				<view class="imgbg">
					<view class="iconfont icon-tupian"></view>
				</view>
				<text>社区图片</text>
			</div>
			<div class="nav_item">
				<view class="imgbg">
					<view class="iconfont icon-shouye"></view>
				</view>
				<text>学习视频</text>
			</div> -->
		</view>
		<!-- 推荐 -->
		<view class="recommend">
			<view>推荐商品</view>
		</view>
		<!-- 商品 -->
		<goods-list :goodsList="goodsList" @getGoodsDetail1='goodsDetailClick'></goods-list>
		<!-- <view class="goods">
			<view class="goods_item" v-for="(item,index) in goodsList" :key="index">
				<view class="img">
					<img :src="item.goods_small_logo ? item.goods_small_logo : 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000632066713_1_400x400.jpg'" alt="">
				</view>
				<view class="text">
					<text>￥{{item.goods_price}}</text>
					<text>￥{{item.goods_price}}</text>
				</view>
				<view class="name">{{item.goods_name}}</view>
			</view>
		</view> -->
	</view>
</template>

<script>
import goodsList from '../../components/goods-list1/goods-list1.vue'


	export default {
		data() {
			return {
				swiper: [],
				goodsList: [],
				pagenum: 1,
				// 导航数据
				nav: [
					{
						icon: 'iconfont icon-xueshengchaoshixiaofei',
						title: '我的超市',
						path: '/pages/goods/goods'
					},
					{
						icon: 'iconfont icon-guanyuwomen',
						title: '联系我们',
						path: '/pages/contact/contact'
					},
					{
						icon: 'iconfont icon-tupian',
						title: '社区图片',
						path: '/pages/pics/pics'
					},
					{
						icon: 'iconfont icon-shouye',
						title: '学习视频',
						path: '/pages/videos/videos'
					},
				]
			}
		},
		// 注册组件
		components: {
			"goods-list": goodsList
		},
		// 页面生命周期函数   监听页面加载
		onLoad() {
			// 获取轮播图数据
			this.getSwiper()
			// 获取商品数据
			this.getGoodsList()
		},
		// 上拉触底 就会触发
		onReachBottom() {
			console.log('触底了')
		},
		methods: {
			// 请求轮播数据
			async getSwiper() {
				// 获取轮播数据
				// uni.request({
				// 	url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				// 	// 接收获取到的参数
				// 	success:function(res){
				// 		console.log(res)
				// 		if (res.data.statusCode !== 200) {
				// 			uni.showToast({
				// 				icon: 'error',
				// 				title: 'statusCode 不为 200'
				// 			})
				// 		}
				// 		uni.showToast({
				// 				icon: 'success',
				// 				title: 'statusCode 为 200'
				// 			})
				// 		this.swiper = res.data.message
				// 		console.log(this.swiper)
				// 	}
				// })

				
				// 使用封装后的 promise  ./util/api		
				const res = await this.$myRequest({
					url: '/api/public/v1/home/swiperdata'
				})
				console.log(res)
				this.swiper = res.data.message
			},
			// 请求商品数据
			async getGoodsList() {
				const res = await this.$myRequest({
					url: '/api/public/v1/goods/search?pagenum='+this.pagenum
				})
				console.log(res)
				this.goodsList = res.data.message.goods
				console.log(this.goodsList)
			},
			
			// 点击nav item
			navItemClick(url) {
				console.log(url)
				uni.navigateTo({
					url: url
				})
			},
			// 点击商品每一项 跳转到相对页面
			goodsDetailClick(goods_id) {
				uni.navigateTo({
					url:'/pages/goods-detail/goods-detail?goods_id='+ goods_id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		swiper {
			width: 750rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.nav {
			display: flex;
			justify-content: space-around;
			text-align: center;
			.nav_item {
				padding: 30rpx 0 20rpx;
				.imgbg {
					width: 120rpx;
					height: 120rpx;
					background-color: $shop-color;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;

					margin-bottom: 20rpx;
					.iconfont {
						font-size: 50rpx;
						color: white;
					}
					.icon-tupian {
						font-size: 48rpx;
					}
				}
				text {
					font-size: 30rpx;
				}
			}
		}
		.recommend {
			// padding: 30rpx 0;
			text-align: center;
			font-size: 38rpx;
			font-weight: 600;
			color: $shop-color;
			// 文字之间的距离
			letter-spacing: 30rpx;
			background-color: #eee;
			// 解决高度塌陷
			overflow: hidden;
			view {
				background-color: #fff;
				margin: 4rpx 0;
				padding: 20rpx 0;
			}
		}
		// 抽到 goods-list.vue中了
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

	}
</style>
