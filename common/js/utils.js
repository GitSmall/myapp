export const utils = {
	checkMobileReg: (mobile) => { //1开头的11位数字
		let reg = /^1\d{10}$/;
		// console.log(reg.test(mobile))
		return reg.test(mobile)
	},
	checkPwdReg: (pwd) => { //英文字母或数字 6-15位
		let reg = /^[0-9A-Za-z]{6,15}$/; 
		// console.log(reg.test(pwd))
		return reg.test(pwd)
	},
	lightMsg: (msg, time) => { // 无icon, 轻提示
		uni.showToast({
			title: msg,
			icon: 'none',
			position: 'bottom',
			duration: time || 1200
		});
	}
}