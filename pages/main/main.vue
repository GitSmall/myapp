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
			<!-- <input type="text" v-model="title"> -->
			<!-- <m-notip v-if="has"></m-notip> -->
			<template>
				<view class="block" v-for="(item, index) in reslist" :key="index">
					<view class="title">
						{{formatDate(item.date)}}
					</view>
					<view class="items">
						<view class="item" v-for="(item, index) in item.arr" :key="index">
							<view class="lf">
								<i :class="['iconfont', item.icon]"></i>
								<text>{{item.remark?item.remark:item.name}}</text>
							</view>
							<view class="rt">
								{{item.status==0 ? '-'+item.money : item.money}}
							</view>
						</view>
					</view>
				</view>
			</template>
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
	import MNotip from '../../components/m-notip/notip.vue';
	import { types } from '@/common/js/types.js'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				title: 'Hello',
				has: true,
				date: currentDate,
				list: [
					{icon: 'icongongzi', name: '工资', type: '1', status: '1', money: '56.3', remark: '', date: '2019-06-12'},
					{icon: 'icontongxun', name: '通讯', type: '10', status: '0', money: '45', remark: '备注a ', date: '2019-06-10'},
					{icon: 'iconmeirong', name: '美容', type: '12', status: '0', money: '860', remark: '', date: '2019-06-10'},
					{icon: 'iconshucai-copy', name: '蔬菜', type: '5', status: '0', money: '12.5', remark: '备注dd', date: '2019-06-10'},
				],
				reslist: []
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
			this.handleList(this.list)
		},
		methods: {
			formatDate(str) {
				return str.substr(5, 2) + '月' + str.substr(8, 2) + '日'
			},
			bindDateChange: function(e) {
				console.log(e)
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;

				if (type === 'start') {
					year = year - 60;
				}
				month = month > 9 ? month : '0' + month;;
				return `${year}-${month}`;
			},
			handleList(list) {
				console.log(list)
				console.log(list.length)
				// for(let i = 0; i++; i<list.length) {
					// console.log(i)
					// if(i == 0) {
					// 	times.push(list[i].date);
					// } else {
					// 	if(!times.includes(list[i].date)) {
					// 		times.push(list[i].date);
					// 	}
					// }
				// }
				var times = [], resArr = []; 
				for (var i in list) {
					console.log(i)
					if(i == 0) {
						times.push(list[i].date);
					} else {
						if(!times.includes(list[i].date)) {
							times.push(list[i].date);
						}
					}
				}
				console.log(times)
				for (var i in times) {
					var obj = {};
					obj['date'] = times[i];
					console.log('-------')
					// console.log(times[i])
					console.log(list.filter(item => {
						return item.date == times[i]
					}))
					obj['arr'] = list.filter(item => {
						return item.date == times[i]
					});
					resArr.push(obj)
					this.reslist = resArr;
				}
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
			padding-bottom: 20upx;
			.select_month {
				position: relative;
				width: 116upx;
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
	.block {
		.title {
			border-bottom: 1px solid #ddd;
			line-height: 70upx;
			font-size: 24upx;
			padding: 0 30upx;
			color: #848484;
		}
		.items{
			padding: 0 30upx;
			.item {
				overflow: hidden;
				border-top: 1px solid #f1f1f1;
				line-height: 96upx;
				font-size: 28upx;
				&:first-child {
					border-top: none;
				}
				.lf {
					.iconfont {
						// color: $bg_main;
						margin-right: 30upx;
					}
				}
			}
		}
	}
</style>
