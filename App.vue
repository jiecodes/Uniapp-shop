<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
		// async await 防止回调地狱 将异步变同步
		// letter-spacing: 20rpx;  文字之间的距离
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static\font\iconfont.css");

	/* 导入 线上阿里图标 */
	@import url("//at.alicdn.com/t/c/font_3760038_1d6ri56o4zc.css");
</style>
