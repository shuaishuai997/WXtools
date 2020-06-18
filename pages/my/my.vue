<template>
	<view>
		<view class="container" v-if="islogin">
			<view style="text-align: center;">您还没有登录!</view>
			<!-- 	<image src="" mode=""></image> -->
          
			<button open-type="getUserInfo" @getuserinfo="getUserInfo()" @click="login">登录</button>
		</view>
		<view class="container" v-else style="width: 100%;background: url(https://nnsy.hnlemon.com/wd-bg.png) no-repeat;background-size: cover;height: 332rpx;padding: 27.7rpx; color: #FFFFFF;font-size: 30rpx; line-height: 35rpx;">
			<!-- <view style="text-align: center;">登录成功!</view> -->
			<view style="height:115rpx;">
				
			</view>
			<view style="width: 88rpx;height: 88rpx; background: #A5673F;float: left;">
				<image :src="userInfo.avatarUrl" mode="aspectFill" style="width: 88rpx;height: 88rpx;"></image>
			</view>

			<view style="float: left;margin-left: 24.5rpx;height: 88rpx; font-size: 30rpx; line-height: 48rpx;white-space:nowrap ; letter-spacing:1rpx;">
				<text>昵称: {{userInfo.nickName}}</text>
				<br />
				<text>ID: {{uid}}</text>
			</view>

		</view>
		<view style="height: 133rpx;background: #FFFFFF;">
			<view class="listbottom" @click="history">
				<image src="../../static/1.png" mode="aspectFill"></image>
				<text style="display: block;">解析记录</text>
			</view>
			<view class="listbottom" @click="teacher">
				<image src="../../static/wenti.png" mode="aspectFill"></image>
				<text style="display: block;">常见问题</text>
			</view>
			<view class="listbottom" @click="teacher" style="margin-left: 88rpx;">
				<image src="../../static/jiaocheng.png" mode="aspectFill" style="margin-left: 7rpx;"></image>
				<text style="display: block;">教程</text>
			</view>
			<view class="listbottom" style="margin-left: 84rpx;" @click="lianxiwomen">
				<image src="../../static/lianxi.png" mode="aspectFill"></image>
				<text style="display: block;">联系我们</text>
			</view>
		</view>
		<button open-type='contact'  type="default" style="font-size: 30rpx; border-radius: 6.94rpx;width: 700rpx;color: #FFFFFF;margin-top: 50rpx;
  background-color: rgb(22, 167, 248);">在线联系客服</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				islogin: false,
				uid: '',
				userInfo: {
					nickName: '',
					avatarUrl: ''

				}

			}

		},
		onLoad() {
			//this.check.check()
            console.log(333)

		},
		onShow() {
			this.check.check()
			this.getUserInfo()
		},
		methods: {
			lianxiwomen(){
				
				uni.showModal({
					
					content:'请添加微信fr99999999-',
					showCancel:false
				})
				
			},
			settoken(code) {
				let that = this;
				this.api.post({
					url: '/api/wx/code2Token',
					datas: code
				}).then((res) => {
					console.log(res.data)
					that.uid = res.data.data.uid;
					uni.setStorageSync("token", res.data.data.token);
					// 设置Storage数据
					that.api.post({
						url: '/api/member/upinfo',
						datas: that.userInfo
					}).then((res) => {
						console.log(res.data)
						if (res.data.code === 421) {


						}
					});

				});
			},
			getUserInfo() {
				let that = this;
				let codes = '';
				 
				uni.getProvider({
					// oauth  代表授权登录
					service: 'oauth',
					success: function(res) {
						// 登录
						uni.login({
							// 表示授权方式  如果不设置则弹出登录列表选择界面
							provider: 'weixin',
							success: function(res) {
								// 获取用户信息
								codes = {
									"code": res.code
								};
								let ss = JSON.stringify(codes);

								uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
										console.log('-------获取微信用户所有-----')
										console.log(JSON.stringify(infoRes.userInfo));
										uni.setStorageSync("userInfo", infoRes.userInfo);
										that.userInfo = infoRes.userInfo;
										console.log(that.userInfo)
										that.settoken(ss);
									}
								});

							}
						});
					}
				});



			},

			history() {
				uni.navigateTo({
					url: "/pages/analysis/history"
				});
			},
			teacher() {
				uni.navigateTo({
					url: "/pages/teacher/teacher"
				});

			},login(){
				
				this.islogin=false
			}

		}


	}
</script>

<style lang="scss">
	.listbottom {
		letter-spacing: 2rpx;
		margin-left: 72rpx;
	  float: left;
      font-size: 25rpx;
      color: #666666;
	  margin-top: 34rpx;
		image {

			margin-left: 30rpx;
			width: 42rpx;
			height: 35rpx;
		}


	}
</style>
