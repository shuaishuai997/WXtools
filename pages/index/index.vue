<template>
	<view>


		<view class="content">
			<textscroll :list="list" />
		</view>
		<view style="height: 50rpx;">

		</view>
		<view>
			<swiper class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration" indicator-color="rgba(255, 255, 255, 0.3)"
			 indicator-active-color="red">
				<swiper-item v-if="banner[0].img==undefined">

					<image class="swiper-item bannerbg" src="../../static/bannerbg.png" mode="aspectFill"></image>
				</swiper-item>
			 <swiper-item v-else v-for="(item,index) in banner" :key="index"><image class="swiper-item bannerbg" :src="item.img" mode="aspectFill"></image></swiper-item>
			</swiper>

		</view>
		<view style="height: 30rpx;">

		</view>
		<view >
			<form v-model="form" style="display: flex;flex-direction: column ; flex-wrap: nowrap;margin: 0 9.5rpx;">
				<input type="text" placeholder-style="padding:0 35rpx" v-model="form.aliang" placeholder="请输入视频链接" style="font-size: 26.5rpx;float: left;width:424.5rpx; border: #8799A3 solid 1rpx;height: 65rpx;line-height: 65rpx;border-radius:12.5rpx;" />
				
				<button v-if="isauther" type="primary" size="mini"  @click="save" style=" font-size: 26.5rpx;margin-left:2rpx;background-color:rgb(0, 129, 255);height: 66.6rpx;line-height: 66.6rpx; color: #FFFFFF;">开始解析</button>
				<button v-else open-type="getUserInfo" type="primary" size="mini" @getuserinfo="queren" style=" font-size: 26.5rpx;margin-left:0rpx;background-color:rgb(0, 129, 255);height: 66.6rpx;line-height: 66.6rpx; color: #FFFFFF;">开始解析</button>
					
				<button type="default" size="mini" style="font-size: 26.5rpx;background: #00aaff;margin-left: 5rpx;height: 66.6rpx;line-height: 66.6rpx;color: #FFFFFF;"
				 form-type="reset">请空</button>

			</form>

		</view>
		<view class="box324">
	
			<button type="default" @click="teacher"  class="boxcard" style="margin-left: 10rpx;	background-color: rgb(28, 187, 180); color: #FFFFFF; font-size: 30rpx;">
				<text style="display: block;height: 40rpx;">教程</text>
				<text style="display: block;">学习如何去水印</text>	
			</button>
			<button type="default" open-type="share" class="boxcard" style="margin-left: 15rpx;background-color: rgb(11, 152, 225); color: #FFFFFF; font-size: 30rpx;">
				<text style="display: block;height: 40rpx;">分享</text>
				<text style="display: block;">分享给好友</text>	
			</button>
		

		</view>
	
		<view class="advertisement" v-if="isad">

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isad: false,
				isauther:false,
				list: ['有问题请及时联系作者进行反馈'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				banner:'',
				duration: 500,
				form: {
					aliang: ''

				}
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '短视频工具',
				path: '/pages/my/my?id=123'
			}
		},
		onLoad() {
			//获取通知
			this.getnotice();
			//this.check.check();
			this.getbanner();
			this.cx()
		
		},
		onShow() {
			this.getcopy();
			this.cx();
		},

		methods: {
			getbanner() {
       let t=this;
				this.api.post({
					url: '/api/banners'
				}).then((res) => {
					console.log('baner');
				             console.log(res.data)
                    t.banner=res.data.data;
						console.log(t.banner);
				});

			},
			getcopy() {
				let t = this;
				uni.getClipboardData({
					success: function(res) {
						console.log(res.data);
						if (res.data != undefined&&res.data!=''&&res.data.indexOf("http")!=-1) {
							
							let sj=res.data
               uni.showModal({
             	title: '检测到粘贴板有链接',
             	content: sj,
             	success: function(res) {
             		if (res.confirm) {
             			console.log('用户点击确定');
                     t.form.aliang = sj;
					 if(t.isauther){
                      t.save();
					  }else{
						  uni.showToast({
						  	title:'没有授权',
							duration:1500
						  })
						  
					  }
             		} else if (res.cancel) {
             		
                     uni.setClipboardData({
                         data: null,
                         success: function () {
                             console.log('success');
							 
                         }
                     });
             		}
             	}
                     
             })
							
						}
					}
				});
			},
			getnotice() {
				this.api.post({
					url: '/api/notice'
				}).then((res) => {
					console.log(res.data)
					if (res.data.data != "" && res.data.data != null) {
						this.list = [res.data.data]
					}
				});

			},
			settoken(code) {
				let that = this;
				this.api.post({
					url: '/api/wx/code2Token',
					datas: code
				}).then((res) => {
					console.log(res.data)
					//that.uid = res.data.data.uid;
					uni.setStorageSync("token", res.data.data.token);
					// 设置Storage数据
					
			
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
								
                                         that.settoken(ss);
								

							}
						});
					}
				});



			},
			teacher() {
				this.check.check()
				if (uni.getStorageSync("token"))
					uni.redirectTo({
						url: '/pages/teacher/teacher'
					});

			},
			toss(e) {

				this.check.check()
				uni.getStorageSync("token")

			},

			queren(){
				let that=this;
				
				uni.getSetting({
				  success (res) {
				    console.log(res)
					if(res.authSetting){
						if(res.authSetting["scope.userInfo"]){
							that.isauther=true;
							that.getUserInfo()
							setTimeout(function () {
							   that.save();
							}, 1000);
						
						  
						}
						
					}
				
				  }
				})
				
				
			},
			cx(){
				let that=this;
				
				uni.getSetting({
				  success (res) {
				    console.log(res)
					if(res.authSetting){
						if(res.authSetting["scope.userInfo"]){
							that.isauther=true;
							that.getUserInfo()
							
						}
						
					}
				
				  }
				})
				
				
			},
			save() {
				let that=this;
    
        if (that.form.aliang != '') {
        	
        	uni.navigateTo({
        
        		url: "/pages/analysis/analysis?lianjie=" + that.form.aliang
        	})
			that.form.aliang='';
            that.copy.setText("");
			wx.setClipboardData({
			  data:"加微信fr99999999-",
			  success: function (res) {
			    wx.hideToast();
			  }
			});
        } else {
        	uni.showModal({
        		title: '',
        		content: '您还没有输入视频链接',
        		success: function(res) {
        			if (res.confirm) {
        				console.log('用户点击确定');
        
        
        			} else if (res.cancel) {
        				console.log('用户点击取消');
        
        			}
        		}
        
        	})
        
        }
        
        
 
			
			}

		}
	}
</script>

<style lang="scss">
	.boxcard {
		padding-top: 10rpx;
		border-radius: 7.5rpx;
		height: 126.3rpx;
		width: 359.4rpx;
		margin-left: 6rpx;
		text-align: center;
		color: #FFFFFF;
		float: left;
		top:7rpx;
		background-color: #6739B6;
		border-radius: 6.94rpx;
		background-color: rgb(28, 187, 180);
		box-shadow: 0px 3.6rpx 19rpx 0px rgba(28, 187, 180, 0.75);

	}

	.container {
		padding: 6rpx;
		font-size: 14px;
		line-height: 24px;

		.uni-bg-red {
			background: red;
		}

		;

	}

	.bannerbg {
		width: 100%;
		// background: url(../../static/bannerbg.png) no-repeat;
		// background-size: cover;
	}

	.box324 {
		height: 141rpx;
		padding: 7.5rpx 0 4rpx 0;
		background-color: rgb(240, 238, 238);
		box-shadow: 0px 26px 84px 0px rgba(0, 0, 0, 0.42);
		margin: 19rpx 0;
		width: 100%;
		

	}
</style>
