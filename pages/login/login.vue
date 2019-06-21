<template>
	<view class="page_content">
		<img class="logo" src="/static/logo.png" alt="">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="title">手机号</view>
				<input class="uni-input" v-model="mobile" placeholder="请输入手机号码" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码</view>
				<input class="uni-input" type="password" v-model="password" placeholder="请输入密码" />
			</view>
			<view class="uni-btn-v">
				<button formType="submit">登录</button>
			</view>
		</form>
		<view class="other">
			<text>找回密码</text>
			<text @tap="goRegist()">注册</text>
		</view>
	</view>
</template>

<script>
	import { utils } from '../../common/js/utils.js'
	export default {
		data() {
			return {
				mobile: '13523025110',
				password: '123456'
			}
		},
		methods: {
			goRegist() {
				uni.navigateTo({
					url: '/pages/regist/regist'
				});
			},
			formSubmit() {
				if(!utils.checkMobileReg(this.mobile)) {
					return utils.lightMsg('手机号码输入有误')
				}
				if(!utils.checkPwdReg(this.pwd)) {
					return utils.lightMsg('密码格式输入有误')
				}
				uni.request({
					method: 'POST',
					url: 'http://192.168.1.169:3000/login', //仅为示例，并非真实接口地址。
					data: {
						mobile: this.mobile,
						password: this.password
					},
					success: (res) => {
						console.log(res.data);
						if(res.data.code == 0) {
							utils.lightMsg('登录成功');
							try {
								uni.setStorageSync('userInfo', res.data);
							} catch (e) {
								// error
							}
							// setTimeout(function() {
							// 	console.log('000')
							// 	uni.switchTab({
							// 		url: '/pages/index/index'
							// 	});
							// }, 1200)
						} else {
							utils.lightMsg(res.data.message)
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.page_content {
		padding: 100upx 60upx 60upx 60upx;
		.logo {
			display: block;
			width: 50upx;
			margin: 0 auto 40upx;
		}
		.uni-btn-v {
			margin-top: 90upx;
		}
		.other {
			display: flex;
			justify-content: space-between;
			line-height: 120upx;
			color: #848484;
		}
	}
</style>
