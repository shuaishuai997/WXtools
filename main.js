import Vue from 'vue'
import App from './App'
import screenTextScroll from './components/screenTextScroll.vue'
import api from './common/api.js'
import quanx from './common/quanx.js'
import uniPop from './components/uni-popup/uni-popup.vue'
import clipboard from "./common/dc-clipboard/clipboard.js"
Vue.component('uni-pop', uniPop) 
Vue.component('textscroll',screenTextScroll)
Vue.config.productionTip = false
Vue.prototype.api=api
Vue.prototype.check=quanx
Vue.prototype.copy=clipboard
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
