<template>
	<view class="">
		<view v-for="(item,index) in dataList" :key="index">
			
		</view>
		<view style="background: #FFFFFF;color: #7aa2bd;margin-bottom: 2rpx;">
			<text>把梦想卖了吧，换成丽江的一米阳光。#浪计划 #旅 行推荐官 https://v.douyin.com/JdEGgK2/</text>
		</view>
		<view style="background: #FFFFFF;color: #7aa2bd;">
			<text>把梦想卖了吧，换成丽江的一米阳光。#浪计划 #旅 行推荐官 https://v.douyin.com/JdEGgK2/</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				dataList:[]
				
			}
		},onLoad(options) {
			  this.gethistory();
		},
		methods:{
			gethistory(){
				let t=this;
				this.api.get({
					url: '/vidio/rlist'
				}).then((res) => {
						console.log(res.data)	
						t.dataList=res.data.data;
						});		
				
			}
			
			
		}
		
		
	}
</script>

<style>
</style>
