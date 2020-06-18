<template>
	<view class="flex">
		<button open-type="getUserInfo"  @getuserinfo="getuser" size="default" style="background-color: #39B54A;color: #FFFFFF;">点进微信授权</button>
	</view>
</template>

<script>
	export default{
		
		methods:{
			getuser(){
				
				
				 uni.reLaunch({
				 url: '/pages/my/my',
				    })
				 
			
			}
			
		}
		
	}
</script>

<style>
	.flex{
		display: flex;
		 justify-content: center; /* 水平居中 */
		            align-items: center;     /* 垂直居中 */
		            width: 100%;
		            height: 800rpx;
		            
		
		
	}
</style>
