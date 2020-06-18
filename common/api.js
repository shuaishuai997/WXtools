
const baseUrl = "https://nnsy.hnlemon.com";  // 请求地址
let token='';
const api = {
		get: function({
			url,
			param,
			header
		}) {
			
			return new Promise(function(resolve, reject) {
				uni.request({
					url: baseUrl + url,
					data: param,
					method: "GET",
					success: function(res) {
						if (res.statusCode !== 200) {
							reject(res);
						} else {
							resolve(res);
						}
					},
					fail: function(err) {
						reject(err);
					}
				})
			})
		},
		post: function({
			url,
			datas,
			header
		}) {
			token=uni.getStorageSync("token")
			return new Promise(function(resolve, reject) {
				
				uni.request({
					url: baseUrl + url,
					data:datas,
					method: "POST",
					dataType:'json',
					header: {
						'Token':token,
						'Content-Type': 'application/json'
					},
					success: function(res) {
						console.log(datas)
						if (res.statusCode !== 200) {
							reject(res)
						} else {
							resolve(res);
								console.log(datas)
						}
					},
					fail: function(err) {
						reject(err)
					}
				})
			})
		},
		postJSON: function({
			url,
			data,
			header
		}) {
			return new Promise(function(resolve, reject) {
				uni.request({
					url: baseUrl + url,
					data: data,
					method: "POST",
					header: {
						'Token':token,
						'Content-Type': 'application/json;charset=UTF-8'
					},
					success: function(res) {
						if (res.statusCode !== 200) {
							reject(res)
						} else {
							resolve(res);
						}
					},
					fail: function(err) {
						reject(err)
					}
				})
			})
		},
		upImg: function({
			url,
			imgUrl
		}) {
			return new Promise(function(resolve, reject) {
				uni.uploadFile({
					url: "baseUrl" + url,
					filePath: imgUrl,
					name: 'file',
					success: function(uploadFileRes) {
						resolve(uploadFileRes);
					},
 
					fail: function(err) {
						reject(err)
					}
				});
			})
		}
	}
export default api;
