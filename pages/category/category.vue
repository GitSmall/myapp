<template>
	<view class="body">
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" tab-class="text-center" selectClass="text-black" />
		<swiper :current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)"
		 indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
			<swiper-item>
				<view class="content">
					<view class="line" v-for="(item, index) in icons.out" :key="index">
						<view class="item" v-for="(n, i) in item" :key="i" @tap="selectType(n.name)">
							<text :class="['img', n.name==select?'active':'']">
								<i :class="['iconfont', n.icon]"></i>
							</text>
							<text class="text">{{n.name}}</text>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="content">
					<view class="line" v-for="(item, index) in icons.in" :key="index">
						<view class="item" v-for="(n, i) in item" :key="i" @tap="selectType(n.name)">
							<text :class="['img', n.name==select?'active':'']">
								<i :class="['iconfont', n.icon]"></i>
							</text>
							<text class="text">{{n.name}}</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<uni-popup :show="showPopup" position="bottom" @hidePopup="hidePopup">
			<view class="insert_form">
				<view class="top">
					<view class="left">
						<text class="iconfont iconbeizhu"></text> 备注:
					</view>
					<input class="input" type="text" value="" placeholder="点击写备注..." />
					<text class="num">{{resNum}}</text>
				</view>
				<view class="grid">
					<view class="item" @tap="calcRes('num', '7')">7</view>
					<view class="item" @tap="calcRes('num', '8')">8</view>
					<view class="item" @tap="calcRes('num', '9')">9</view>
					<view class="item">
						<picker mode="date" fields="day" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<template v-if="currentDate == date"><text class="iconfont iconrili"></text>今天</template>
							<template v-else>{{changed(date)}}</template>
						</picker>
					</view>
					<view class="item" @tap="calcRes('num', '4')">4</view>
					<view class="item" @tap="calcRes('num', '5')">5</view>
					<view class="item" @tap="calcRes('num', '6')">6</view>
					<view class="item" @tap="calcRes('add')">+</view>
					<view class="item" @tap="calcRes('num', '1')">1</view>
					<view class="item" @tap="calcRes('num', '2')">2</view>
					<view class="item" @tap="calcRes('num', '3')">3</view>
					<view class="item" @tap="calcRes('cut')">-</view>
					<view class="item" @tap="calcRes('spot')">.</view>
					<view class="item" @tap="calcRes('num', '0')">0</view>
					<view class="item" @tap="calcRes('del')"><text class="iconfont iconiconfonttuige"></text></view>
					<view v-if="calc" class="item bg_main" @tap="calcRes('calc')">=</view>
					<view v-else class="item bg_main" @tap="addNote()">完成</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			console.log(currentDate)
			return {
				TabCur: 0, // 顶部tabbar下标
				showPopup: false, // 显示底部pupop
				select: null, // 是否选择
				calc: false, // 是否显示等号, 执行运算
				banInput: false, // 含小数点, 并小数点后满两位时, 禁止输入
				resNum: '0', // 输入结果值
				currentDate: this.getDate({
					format: true
				}),
				date: currentDate,
				tabList: [{
					name: '支出'
				}, {
					name: '收入'
				}],
				icons: {
					out: [
						[{
								'icon': 'iconcanyin',
								'name': '餐饮'
							},
							{
								'icon': 'icon213',
								'name': '购物'
							},
							{
								'icon': 'iconcat-4',
								'name': '日用'
							},
							{
								'icon': 'iconjiaotong',
								'name': '交通'
							}
						],
						[{
								'icon': 'iconshucai-copy',
								'name': '蔬菜'
							},
							{
								'icon': 'iconshuiguo',
								'name': '水果'
							},
							{
								'icon': 'iconlingshi',
								'name': '零食'
							},
							{
								'icon': 'iconyundongzu',
								'name': '运动'
							}
						],
						[{
								'icon': 'iconyule',
								'name': '娱乐'
							},
							{
								'icon': 'icontongxun',
								'name': '通讯'
							},
							{
								'icon': 'iconfushi',
								'name': '服饰'
							},
							{
								'icon': 'iconmeirong',
								'name': '美容'
							}
						],
						[{
								'icon': 'iconzhufang',
								'name': '住房'
							},
							{
								'icon': 'iconjujia',
								'name': '居家'
							},
							{
								'icon': 'iconhaizi',
								'name': '孩子'
							},
							{
								'icon': 'iconchangbei',
								'name': '长辈'
							}
						],
						[{
								'icon': 'iconshejiao',
								'name': '社交'
							},
							{
								'icon': 'iconlvxing',
								'name': '旅行'
							},
							{
								'icon': 'iconyanjiu',
								'name': '烟酒'
							},
							{
								'icon': 'iconshuma',
								'name': '数码'
							}
						],
						[{
								'icon': 'icongo',
								'name': '汽车'
							},
							{
								'icon': 'iconyiliao',
								'name': '医疗'
							},
							{
								'icon': 'iconshuji',
								'name': '书籍'
							},
							{
								'icon': 'iconxuexi',
								'name': '学习'
							}
						],
						[{
								'icon': 'icon222222228',
								'name': '宠物'
							},
							{
								'icon': 'iconlijin',
								'name': '礼金'
							},
							{
								'icon': 'iconliwu',
								'name': '礼物'
							},
							{
								'icon': 'iconbangong',
								'name': '办公'
							}
						],
						[{
								'icon': 'iconweixiu',
								'name': '维修'
							},
							{
								'icon': 'iconxiaoyoujuanzeng',
								'name': '捐赠'
							},
							{
								'icon': 'iconcaipiao',
								'name': '彩票'
							},
							{
								'icon': 'iconpengyou1',
								'name': '亲友'
							}
						],
						[{
								'icon': 'iconkuaidi',
								'name': '快递'
							},
							{
								'icon': 'iconshezhi',
								'name': '设置'
							}
						]
					],
					in: [
						[{
								'icon': 'icongongzi',
								'name': '工资'
							},
							{
								'icon': 'iconjianzhi',
								'name': '兼职'
							},
							{
								'icon': 'iconlicai',
								'name': '理财'
							},
							{
								'icon': 'iconlijin',
								'name': '礼金'
							}
						],
						[{
								'icon': 'iconqita',
								'name': '其他'
							},
							{
								'icon': 'iconshezhi',
								'name': '设置'
							}
						]
					]
				}
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
		watch: {
			resNum: function(val) {
				console.log('val = ' + val)
				console.log(typeof val)
				if (val.indexOf('.') != -1) {
					console.log('包含')
					if(val.indexOf('+') != -1) {
						var lastNum = val.split('+')[1];
						console.log(lastNum)
						if(lastNum.indexOf('.') != -1 && lastNum.length - lastNum.indexOf('.') == 3) {
							this.banInput = true;
						} else {
							this.banInput = false;
						}
					} else if(val.indexOf('-') != -1) {
						var lastNum = val.split('-')[1];
						if(lastNum.indexOf('.') != -1 && lastNum.length - lastNum.indexOf('.') == 3) {
							this.banInput = true;
						} else {
							this.banInput = false;
						}
					} else {
						if (val.length - val.indexOf('.') == 3) {
							console.log('禁止输入了')
							this.banInput = true;
						} else {
							this.banInput = false;
						}
					}
				} else {
					this.banInput = false;
				}
				
				
				if ((val.indexOf('+') != -1 && val[val.length-1] != '+') || val.indexOf('-') != -1 && val[val.length-1] != '-') {
					this.calc = true;
				} else {
					this.calc = false;
				}
			}
		},
		components: {
			WucTab,
			uniPopup
		},
		methods: {
			changed(str) {
				return str.replace(/\-/g,"/");
			},
			tabChange(index) {
				this.TabCur = index;
			},
			swiperChange(e) {
				this.TabCur = e.target.current;
			},
			selectType(name) {
				console.log(name)
				this.select = name;
				this.showPopup = true;
			},
			bindDateChange: function(e) {
				console.log(e)
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			hidePopup() {
				this.showPopup = false;
				this.select = null;
			},
			addNote() {
				// 判断末尾是否为+或者-
				if (this.resNum[this.resNum.length - 1] == '+' || this.resNum[this.resNum.length - 1] == '-' || this.resNum[this.resNum.length - 1] == '.' || this.resNum == '0') {
					uni.showToast({
						title: '请输入有效值',
						icon: 'none',
						position: 'bottom',
						duration: 1200
					});
				}
			},
			merge() {
				console.log('计算')
				var resArr, type = '+', result;
				if(this.resNum.indexOf('+') != -1) {
					resArr = this.resNum.split('+');
				} else if(this.resNum.indexOf('-') != -1) {
					resArr = this.resNum.split('-');
					type = '-';
				}
				console.log(resArr)
				resArr[0] =
					resArr[0] == '.' ? '0' : resArr[0];
				resArr[1] =
					resArr[1] == '.' ? '0' : resArr[1];
				console.log(resArr[0])
				console.log(resArr[1])
				result = 
					type=='+'
					? String(parseFloat(resArr[0]) + parseFloat(resArr[1])) 
					: String(parseFloat(resArr[0]) - parseFloat(resArr[1]))
				if(result.indexOf('.') != -1) { // 如果计算结果中含有小数点
					var floatNum = result.split('.')[1];
					var n = null;
					if(floatNum.length>2) {
						n = floatNum.length-2;
						console.log(n)
						result = parseFloat(result.substr(0, result.length-n))
					}
				} 
				this.resNum = String(result);
				console.log(this.resNum)
			},
			calcRes(type, num) {
				var resNum = this.resNum;
				if (type == 'num') { // 数字
					if (!this.banInput) {
						console.log('輸入數字: ' + num)
						resNum =
							resNum == 0 ?
							num :
							resNum + num
					}
					
					this.resNum = resNum;
				} else if (type == 'spot') { // 小数点
					if (resNum.indexOf('.') == -1) {
						console.log('-1')
						resNum =
							resNum == 0 ?
							'.' :
							resNum + '.'
					}
					if(resNum.indexOf('+') != -1 || resNum.indexOf('-') != -1) {
						if(resNum.indexOf('+') != -1) {
							var lastNum = resNum.split('+')[1];
						} else if(resNum.indexOf('-') != -1) {
							var lastNum = resNum.split('-')[1];
						}
						console.log(lastNum)
						if(lastNum.indexOf('.') == -1) {
						 // || (lastNum.indexOf('.') != -1 && lastNum.length - lastNum.indexOf('.') != 3)) {
							resNum = resNum + '.'
						}
					}
					
					this.resNum = resNum;
				} else if (type == 'del') { // 删除键
					resNum =
						resNum.length == 1 ?
						'0' :
						resNum.substring(0, resNum.length - 1);
						
					this.resNum = resNum;
				} else if (type == 'add') { // 加号
					// 判斷input是否含有 + 或 -
					// 有, 先執行加法或减法,再添加 +
					// 没有, 直接添加 +
					if(resNum.indexOf('+') == -1 && resNum.indexOf('-') == -1) {
						resNum =
							resNum == 0 ?
							'0' :
							resNum + '+'
					} else {
						
					}
					this.resNum = resNum;
				} else if (type == 'cut') { // 减号
					// 判斷input是否含有 + 或 -
					// 有, 先執行加法或减法,再添加 -
					// 没有, 直接添加 -
					if(resNum.indexOf('-') == -1 && resNum.indexOf('+') == -1) {
						resNum =
							resNum == 0 ?
							'0' :
							resNum + '-'
					} else {
						
					}
					this.resNum = resNum;
				} else if (type == 'calc') {
					console.log('===')
					// 执行里面的+ 或 -
					this.merge();
				}
			}
		}
	}
</script>

<style lang="scss">
	.body {
		display: flex;
		flex-direction: column;
		height: 100%;

		uni-scroll-view {
			background-color: $bg-main;
			font-size: 32upx;
		}

		uni-swiper {
			flex: 1;

			uni-swiper-item {
				overflow-y: scroll;

				.content {
					padding: 40upx 0;

					.line {
						.item {
							float: left;
							display: flex;
							width: 25%;
							height: 168upx;
							text-align: center;
							flex-direction: column;
							align-items: center;

							.img {
								width: 90upx;
								height: 90upx;
								line-height: 90upx;
								background-color: #f2f2f2;
								border-radius: 50%;

								&.active {
									background-color: $bg_main;
								}

								i {
									font-size: 50upx;
								}
							}

							.text {
								line-height: 56upx;
								font-size: 24upx;
							}
						}
					}
				}
			}
		}

		.insert_form {
			background-color: #f6f6f6;

			.top {
				display: flex;
				line-height: 100upx;
				padding: 0 10upx;

				.left {
					width: 140upx;

					.iconfont {
						margin-right: 10upx;
						color: $bg_main;
					}
				}

				.input {
					flex: 1;
					height: 100upx;
					line-height: 100upx;
					text-align: left;
					padding-right: 20upx;
				}

				text.num {
					min-width: 100upx;
					font-size: 40upx;
				}
			}

			.grid {
				display: flex;
				flex-wrap: wrap;

				.item {
					box-sizing: border-box;
					width: 25%;
					border-top: 1px solid #eee;
					border-right: 1px solid #eee;

					&.bg_main {
						background-color: $bg_main;
					}

					.iconfont {
						font-size: 36upx;
					}
				}
			}
		}
	}
</style>
