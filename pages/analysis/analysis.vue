<template>
	<view>
		<view class="advertisement" v-if="ad">

		</view>

		<video :src="src" controls style="width: 100%;" autoplay></video>
		   <progress :percent="jindu" show-info stroke-width="3" />
		<view class="buttonbox">
			<button type="default" @click="" class="btnc" size="mini" style="font-size: 34rpx;background: rgb(243, 123, 29);color: #FFFFFF ;"
			 @click="cpoywater">复制无水印链接</button>
			<button type="default" class="btnc" size="mini" style="font-size: 34rpx;margin-left: 14rpx; background: #39b54a; color: #FFFFFF ;"
			 @click="saveVidio">保存到手机</button>
			<button  v-if="ad" type="default" class="btnc" size="mini" style="font-size: 36rpx; background: #0081ff; color: #FFFFFF ;" @click="cpoywater">复制封面链接</button>
			<button  v-if="ad" type="default" class="btnc" style="margin-left: 14rpx;background-color:#8799a3; color: #FFFFFF ;" size="mini"
			 @click="copyview">保存封面</button>
			<button type="default" style="background-color: #1cbbb4;color: #FFFFFF ;" @click="ss">返回首页继续解析</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				src: '',
				title: '',
				cover: '',
				jindu:'',
				ad: false
			}

		},
		onLoad(options) {
			console.log(options)
		    
			let that = this;
			let so = 55555;
			uni.showToast({
				title: '解析中！',
				icon: 'loading',
				duration: so,

			})

			this.api.post({
				url: '/api/video/analysis',
				datas: {
					"info": options.lianjie
				}
			}).then((res) => {
				console.log(res.data)
				if (res.data.data) {
					that.src = res.data.data.url;
					that.cover = res.data.data.cover;
					uni.hideToast();
					
				} else {

					uni.hideToast();
					uni.showModal({
						title: 'erro',
						content: '解析失败',
						success: function(res) {
							if (res.confirm) {

							} else if (res.cancel) {
								uni.navigateBack({

								});
							}
						}
					});

				}
				console.log(that.src)
			});

		},
		methods: {
			ss() {
				uni.navigateBack({

				});

			},
			saveVidio() {
				let that = this;
				if (this.src) {
				uni.showToast({
					title: '保存中！',
					icon: 'loading',
					duration: 1500,
				
				})
				const downloadTask=uni.downloadFile({
						url: that.src,
						success: (res) => {
							console.log(res)
							if (res.statusCode === 200) {
								//console.log('下载成功');
								uni.saveVideoToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										uni.hideToast();
										uni.showToast({
											title: '保存成功！',
											icon: 'success',
											duration: 1500,

										})
									},
									fail: function(res) {
                                              console.log(res)
										uni.showToast({
											title: '失败！',
											icon: 'none',
											duration: 1500,

										})
									}
								});
							}
						},
						fail:(res)=>{
							uni.showToast({
								title: res,
								icon: 'none',
								duration: 1500,
							
							})
							
						}
						
					});
				
				
				
				//带进度条
				 
				downloadTask.onProgressUpdate((res) => {
					that.jindu=res.progress;
				    console.log('下载进度' + res.progress);
				    console.log('已经下载的数据长度' + res.totalBytesWritten);
				    console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				
				    // 测试条件，取消下载任务。
				    if (res.progress > 50) {
				        downloadTask.abort();
				    }
				});
				
				
				
				
				
				} else {
					uni.showToast({
						title: '无视频',
						icon: 'none',
						duration: 2000
					});

				}




			},
			cpoywater() {
                
					  if(this.cover!=''){ 
						  console.log(this.cover)
				uni.setClipboardData({
					data: this.cover,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'success',
							duration: 1500
						});
					}
				});
				 }else{		
						uni.showToast({
							title: '没有封面链接',	
							duration: 1500
						});
					
					 
				 }


			},
			copyview() {
				let that = this;
				if (this.cover != '') {
					uni.showToast({
						title: '保存中！',
						icon: 'loading',
						duration: 25000,

					})
					uni.downloadFile({
						url: that.cover,
						success: (res) => {
							console.log(res)
							if (res.statusCode === 200) {
								//console.log('下载成功');
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePath,
									success: function() {
										uni.hideToast();
										uni.showToast({
											title: '保存成功！',
											icon: 'success',
											duration: 1500,
					
										})
									},
									fail: function() {
										uni.hideToast();
										uni.showToast({
											title: '失败！',
											icon: 'none',
											duration: 1500,
					
										})
									}
								});
							}
						},
						fail: (res) => {
					
							uni.showToast({
								title: '失败！',
								duration: 1500,
					
							})
					
						}
					});
					
				} else {
					uni.showToast({
						title: '无封面！',
						icon: 'loading',
						duration: 1000,

					})
				
				}


			}

		}


	}
</script>

<style>
	.buttonbox {

		padding: 0 18rpx;
	}

	.btnc {
		margin: 10rpx 0;
		width: 348rpx;
		font-size: 35rpx;
		border-radius: 7rpx;
		background: rgb(243, 123, 29);
		box-shadow: 0px 10px 30px 0px rgba(243, 123, 29, 0.42);

	}
</style>
