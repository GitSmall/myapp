<template>
	<view class="">
		<view class="user_info">
			<view class="top">
				<view class="left">
					<image class="head_img" src="/static/timg.jpg" mode=""></image>
					<text>贝利_ysjdjT</text>
				</view>
				<view class="right">
					<template v-if=false>
						<image class="icon" src="/static/call.png" mode=""></image>
						打卡
					</template>
					<template v-else>
						已打卡
					</template>
				</view>
			</view>
			<view class="census">
				<view class="item">
					<text class="num">0</text>
					<text class="text">已连续打卡</text>
				</view>
				<view class="item">
					<text class="num">0</text>
					<text class="text">记账总天数</text>
				</view>
				<view class="item">
					<text class="num">0</text>
					<text class="text">记账总笔数</text>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="grid">
				<view class="item">
					<text class="img iconfont iconhuizhang"></text>
					<text class="text">我的徽章</text>
				</view>
				<view class="item">
					<text class="img iconfont iconweixiu"></text>
					<text class="text">类别设置</text>
				</view>
				<view class="item">
					<text class="img iconfont iconyaoqinghaoyou"></text>
					<text class="text">邀请好友</text>
				</view>
				<view class="item">
					<text class="img iconfont iconshezhi"></text>
					<text class="text">设置</text>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="top_title hide">
				<text class="lf">账单</text>
				<i class="rt iconfont iconarrow-right-copy-copy-copy"></i>
			</view>
			<view class="census">
				<view class="select_month">
					<text class="month"><text class="big">06</text>月</text>
				</view>
				<view class="statistic">
					<view class="income_num">
						<text class="title">收入</text><br/>
						<text class="num">0</text>
					</view>
					<view class="pay_num">
						<text class="title">支出</text><br/>
						<text class="num">0</text>
					</view>
					<view class="pay_num">
						<text class="title">结余</text><br/>
						<text class="num">0</text>
					</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="top_title hide">
				<text class="lf">常用功能</text>
			</view>
			<view class="grid">
				<view class="item">
					<text class="img iconfont iconhuizhang"></text>
					<text class="text">我的徽章</text>
				</view>
				<view class="item">
					<text class="img iconfont iconweixiu"></text>
					<text class="text">类别设置</text>
				</view>
				<view class="item">
					<text class="img iconfont iconyaoqinghaoyou"></text>
					<text class="text">邀请好友</text>
				</view>
				<view class="item">
					<text class="img iconfont iconshezhi"></text>
					<text class="text">设置</text>
				</view>
			</view>
			<view class="grid" style="margin-top: 30upx;">
				<view class="item">
					<text class="img iconfont iconhuizhang"></text>
					<text class="text">我的徽章</text>
				</view>
				<view class="item">
					<text class="img iconfont iconweixiu"></text>
					<text class="text">类别设置</text>
				</view>
				<view class="item">
					<text class="img iconfont iconyaoqinghaoyou"></text>
					<text class="text">邀请好友</text>
				</view>
				<view class="item">
					<text class="img iconfont iconshezhi"></text>
					<text class="text">设置</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	uni-page-body {
		background: #f6f6f6;
		.user_info {
			background-color: $bg-main;
			border-radius: 0 0 20upx 20upx;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30upx 40upx;
				image {
					vertical-align: middle;
				}
				.left {
					font-weight: bold;
					.head_img {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
						margin-right: 20upx;
					}
				}
				.right {
					background-color: #fff;
					padding: 0 14upx;
					height: 44upx;
					line-height: 44upx;
					border-radius: 22upx;
					font-size: 24upx;
					.icon {
						position: relative;
						width: 36upx;
						height: 36upx;
						margin-right: 6upx;
						top: -4upx;
					}
				}
			}
			.census {
				display: flex;
				justify-content: space-between;
				padding: 20upx 70upx 60upx;
				.item {
					display: flex;
					flex-direction: column;
					text-align: center;
					.num {
						font-size: 32upx;
						font-weight: bold;
					}
					.text {
						padding-top: 6upx;
						font-size: 24upx;
						color: #848484;
					}
				}
			}
		}
		.card {
			background-color: #fff;
			margin: 20upx 30upx;
			padding: 20upx 0;
			border-radius: 10upx;
		}
	}
	.top_title {
		padding: 0 30upx 30upx;
	}
	.grid {
		display: flex;
		justify-content: space-between;
		.item {
			flex: 25%;
			display: flex;
			flex-direction: column;
			text-align: center;
			.img.iconfont {
				font-size: 50upx;
			}
			.text {
				padding-top: 6upx;
				color: #666;
			}
		}
	}
	
	.census {
		display: flex;
		.select_month {
			position: relative;
			padding: 0 30upx;
			&:after {
				content: '';
				position: absolute;
				right: 0;
				top: 25upx;
				width: 1px;
				height: 50upx;
				background-color: #666;
			}
			.month {
				line-height: 90upx;
				.big {
				font-size: 38upx;
				}
			}
		}
		.statistic {
			flex: 1;
			display: flex;
			justify-content: space-around;
			.title {
				line-height: 28upx;
				font-size: 24upx;
				color: #666;
			}
			.num {
				line-height: 60upx;
				font-size: 34upx;
			}
		}
	}
</style>
