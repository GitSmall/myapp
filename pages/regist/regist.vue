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
				<input class="uni-input" v-model="pwd" placeholder="请输入密码" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">确认密码</view>
				<input class="uni-input" v-model="pwd2" placeholder="请输入密码" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">验证码</view>
				<input class="uni-input" v-model="code" placeholder="请输入验证码" />
			</view>
			<view class="uni-btn-v">
				<button formType="submit">完成</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {utils} from '../../common/js/utils.js'
	export default {
		data() {
			return {
				mobile: '',
				pwd: '',
				pwd2: '',
				code: ''
			}
		},
		methods: {
			formSubmit() {
				if(!utils.checkMobileReg(this.mobile)) {
					return utils.lightMsg('手机号码输入有误')
				}
				if(!utils.checkPwdReg(this.pwd)) {
					return utils.lightMsg('密码格式输入有误')
				}
				if(this.pwd2 !== this.pwd) {
					return utils.lightMsg('两次密码输入不一致')
				}
				
				uni.request({
					method: 'POST',
					url: 'http://192.168.1.169:3000/register', //仅为示例，并非真实接口地址。
					data: {
						mobile: this.mobile,
						password: this.pwd
					},
					success: (res) => {
						console.log(res.data);
						if(res.data.code == 0) {
							utils.lightMsg('注册成功, 2秒后跳转到登录页面', 2000);
							uni.redirectTo({
								url: '/pages/login/login'
							});
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
	}
</style>
