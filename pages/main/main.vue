<template>
	<view class="page">
		<view class="head">
			<view class="logo">
				<img src="/static/logo.png" alt="">贝利
			</view>
			<view class="census">
				<picker mode="date" fields="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="select_month">
						<text class="year">{{date.substr(0, 4)}}年</text><br/>
						<text class="month"><text class="big">{{date.substr(5)}}</text>月<text class="iconfont iconf11"></text></text>
					</view>
				</picker>
				<view class="statistic">
					<view class="income_num">
						<text class="title">收入</text><br/>
						<text class="num">0</text>
					</view>
					<view class="pay_num">
						<text class="title">支出</text><br/>
						<text class="num">0</text>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<m-notip v-if="has"></m-notip>
		</view>
		
		<!-- <view class="uni-list">
		    <view class="uni-list-cell">
		        <view class="uni-list-cell-db"> -->
		            
		              
		     <!--   </view>
		    </view>
		</view> -->
	</view>
</template>

<script>
	import MNotip from '../../components/m-notip/notip.vue'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				title: 'Hello',
				has: true,
				date: currentDate,
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		components: {
			MNotip
		},
		onLoad() {

		},
		methods: {
			bindDateChange: function(e) {
				console.log(e)
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				// let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				}
				month = month > 9 ? month : '0' + month;;
				// day = day > 9 ? day : '0' + day;
				return `${year}-${month}`;
			}
		}
	}
</script>

<style lang="scss">
	.head {
		background: $bg-main;
		.logo {
			font-size: 40upx;
			font-weight: bold;
			text-align: center;
			line-height: 120upx;
			img {
				width: 36upx;
				vertical-align: middle;
				margin-right: 10upx;
			}
		}
		.census {
			display: flex;
			.select_month {
				position: relative;
				width: 106upx;
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
				.year {
					line-height: 28upx;
					font-size: 24upx;
					color: #666;
				}
				.month {
					line-height: 60upx;
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
	}
	
</style>
