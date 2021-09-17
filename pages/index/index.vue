<template>
	<view class="home">
		<!-- <view>首页</view> -->
		<!-- 轮播图 -->
		<swiper indicator-dots circular autoplay interval="5000" >
			<swiper-item
			v-for="item in swipers" :key="item.goods_id"
			><image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<!-- 导航栏 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="navItemClick(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
			<!-- <view class="nav_item">
				<view class="iconfont icon-guanyuwomen"></view>
				<text>联系我们</text>
			</view>
			<view class="nav_item">
				<view class="iconfont icon-tupian"></view>
				<text>社区图片</text>
			</view>
			<view class="nav_item">
				<view class="iconfont icon-shipin"></view>
				<text>学习视频</text>
			</view> -->
		</view>
		<!-- 推荐商品 -->
		<view class="hot_goods">
			<view class="title">推荐商品</view>
			<!-- 商品列表 -->
			<!--  3 注册点击事件 -->
			<goods-list @goodsItemClick="goGoodsDetail" :goods="goods"></goods-list>
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		data() {
			return {
				// 渲染到页面上 定义数组 保存到本地
				swipers: [],
				goods: [],
				navs: [
					{
						icon: 'iconfont icon-ziyuan',
						title: '我的超市',
						path: '/pages/goods/goods'
					},
					{
						icon: 'iconfont icon-guanyuwomen',
						title: '关于我们',
						path: '/pages/contact/contact'
					},
					{
						icon: 'iconfont icon-tupian',
						title: '社区图片',
						path: '/pages/pics/pics'
					},
					{
						icon: 'iconfont icon-shipin',
						title: '学习视频',
						path: '/pages/videos/videos'
					}
				]
			}
		},
		// 页面加载
		onLoad() {
			this.getSwipers(),
			this.getHotGoods()
		},
		components: {
			"goods-list":goodsList
		},
		methods: {
			// 获取轮播图数据方法
			async getSwipers() {
				// console.log('获取了');
				// uni.request({
				// 	url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
				// 	success:res=>{
				// 		// 获取到的数据
				// 		console.log(res);
				// 		if(res.data.meta.status !== 200) {
				// 			return uni.showToast({
				// 				title: '获取数据失败'
				// 			})
				// 		}
				// 		this.swipers = res.data.message
				// 	}
				// })

				// 4 调用封装好的方法
				const res = await this.$myRequest({
					url: '/api/public/v1/home/swiperdata'
				})
				console.log(res);
				this.swipers = res.data.message
			},
			// 获取热门商品列表数据
			async getHotGoods() {
				const res = await this.$myRequest({
					url:'/api/public/v1/goods/search'
				})
				console.log(res);
				this.goods=res.data.message.goods
			},
			// 导航点击的处理函数
			navItemClick(url) {
				uni.navigateTo({
					url
				})
			},
			// 1 导航商品详情页
			goGoodsDetail(goods_id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?goods_id='+goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.home{
		// 轮播图
		swiper{
			width: 750rpx;
			height: 380rpx;
			image{
				height: 100%;
				width: 100%;
			}
		}
		// 导航栏
		.nav {
			display: flex;
			.nav_item {
				flex: 1;
				text-align: center;
				view{
					width: 120rpx;
					height: 120rpx;
					background: $shop-color;
					border-radius: 60rpx;
					margin: 10rpx auto;
					// 文字上下居中
					line-height: 120rpx;
					font-size: 50rpx;
					color: white;
				}
				.icon-tupian{
					font-size: 40rpx;
				}
				text{
					font-size: 30rpx;
				}
			}
		}
		// 推荐商品
		.hot_goods{
			background: #eee;
			overflow: hidden;
			margin-top: 10px;
			// 文字
			.title{
				height: 50px;
				line-height: 50px;
				color: $shop-color;
				font-size: 20px;
				background: #fff;
				// 垂直居中
				text-align: center;
				// 字与字之间的间距
				letter-spacing: 20px;
				margin: 10rpx 0;
			}
		}
	}
</style>
