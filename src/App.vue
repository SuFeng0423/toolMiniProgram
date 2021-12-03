<script>
import utils from  'utils/index.js'
const getSystemInfo = utils.promisify(uni.getSystemInfo)
	export default {
		globalData: {
			systemInfo: null,
			userInfo: null,  // 完整的用户信息
			sessionKey: '', // 登录凭证sesionKey
			code: null,  // 本地登录成功code
			pageInfo: null, //查看到了首页的信息是来自收藏列表还是初识首页
			indexBaseInfo: null,
		},
		onLaunch: function() {
			// console.log('App Launch')
			getSystemInfo().then((res)=>{
				// getApp().globalData.systemInfo = res
			})
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// getApp().globalData.indexBaseInfo = null;
		}
	}
</script>

<style lang="scss">
@import "uview-ui/index.scss";
@font-face {
    font-family: 'diyfont';
    src: url('https://img-fe.tengzhihh.com/file/5ae7e48d-761d-4675-9939-ed0cf5b00c6b.ttf')
}
body{
	font-family: 'diyfont';
}
</style>
