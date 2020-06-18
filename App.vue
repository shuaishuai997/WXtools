

<script>
export default {
	onLaunch: function() {
     // this.check.check();
			
	},
	onShow: function() {
		console.log('App Show');
		
		
		
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>

/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
page{
	margin: 0;
	padding: 0;
}
.advertisement{
			height: 450rpx;
			width: 100%;
			background: #E03997;
		}
</style>
