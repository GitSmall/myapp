<template>
	<view class="page_view">
		<view class="head">
			<view class="selectType">
				支出 <text class="iconfont iconf11"></text>
			</view>
			<view class="date_tab">
				<text class="on">周</text>
				<text>月</text>
				<text>年</text>
			</view>
		</view>
		<view class="data_content">
			<view style="height: 60upx; border-bottom: 1px solid #ddd;"></view>
			<view class="chart_box">
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :style="{'width':cWidth*pixelRatio+'px','height':cHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-cWidth*(pixelRatio-1)/2+'px','margin-top':-cHeight*(pixelRatio-1)/2+'px'}"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaColumn=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:''
			}
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(360);
			this.getServerData();
		},
		methods: {
			getServerData(){
				
				let Column={categories:['1','2','3','4','5','6'],series:[]};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				// Column.categories=res.data.data.Column.categories;
				//这里的series数据是后台做好的，如果您的数据没有和前面我注释掉的格式一样，请自行拼接数据
				// Column.series=res.data.data.Column.series;
				Column.series = [
					{"name":"新成交量3","data":[35,36,31,33,850,34]}
				];
				this.showColumn("canvasColumn",Column);
			},
			showColumn(canvasId,chartData){
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					legend:false, // 图表底部是否显示更类别标识
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
						disabled: true,
						// disableGrid: true,
						splitNumber: 1,
						gridColor: '#FFDA44',
						gridType: 'dash'
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
						  width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
						}
					  }
				});
			},
		}
	}
</script>

<style lang='scss'>
	.head {
		/* background: $bg_main; */
		background: #f4f4f4;
		.selectType{
			text-align: center;
			line-height: 80upx;
			font-size: 30upx;
		}
		.date_tab {
			display: flex;
			padding: 0 30upx 30upx;
			text-align: center;
			text {
				flex: 1;
				height: 46upx;
				line-height: 46upx;
				font-size: 24upx;
				border-top: 1px solid #000;
				border-bottom: 1px solid #000;
				border-left: 1px solid #000;
				&:first-child {
					border-radius: 8upx 0 0 8upx;
				}
				&:last-child {
					border-right: 1px solid #000;
					border-radius: 0 8upx 8upx 0;
				}
				&.on {
					background: #000000;
					color: #fff;
				}
			}
		}
	}
</style>
