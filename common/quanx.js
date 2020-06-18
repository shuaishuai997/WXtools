const quanx={
	check:function(){
		uni.getSetting({
		  success (res) {
		    console.log(res)
			if(res.authSetting){
				if(!res.authSetting["scope.userInfo"]){
					 uni.showToast({
					             title: '请授权登录！',
					             icon: 'none',
					             duration: 1500,
					             success: function () {
					          //定时器，未授权1秒后跳转授权页面
					             
					             uni.reLaunch({
					             url: '/pages/index/login',
					                })
					             
					             }
					            })
			        return
				}
				
			}
		
		  }
		})
		
	}
	
}
export default quanx