<template>
	<view class="">
		
		<text>{{context}}</text>
	</view>
</template>

<script>
	export default{
		data(){
			
			return{
				context:"",
				
			}
		},
		onLoad() {	
			this.api.post({
				url: '/api/help'
			}).then((res) => {
					console.log(res.data)	
					this.context=res.data.data
					});		
		}
		
		
	}
</script>

<style>
</style>
