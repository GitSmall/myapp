<template>
	<view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			try {
			    const value = uni.getStorageSync('launchFlag');
			    if (value) {
			        if (value == true) {
			            uni.switchTab({
			                url: '/pages/main/main'
			            });
			        } else {
			            uni.redirectTo({
			                url: '/pages/index/guide'
			            });
			        }
			    } else {
			        uni.setStorage({
			            key: 'launchFlag',
			            data: true,
			            success: function() {
							console.log('存储launchFlag');
						}
			        });
			        uni.redirectTo({
			            url: '/pages/index/guide'
			        });
			    }
			} catch(e) { 
				// error 
				uni.setStorage({ 
					key: 'launchFlag', 
					data: true, 
					success: function () {
						console.log('error时存储launchFlag');
					} 
				}); 
				uni.redirectTo({ url: '/pages/index/guide' }); 
			}
		}
		
	}
</script>

<style>
</style>
