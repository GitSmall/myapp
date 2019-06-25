<template>
	<view class="">
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange">
		  <swiper-item v-for="(item,index) in tabList" :key="index">
			<div>{{item.name}}</div>
		  </swiper-item>
		</swiper>
	</view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';

export default {
    data() {
        return {
          TabCur: 0,
          tabList: [{ name: '精选' }, { name: '订阅' }],
        }},
    components: { WucTab },
    methods: {
        tabChange(index) {
            this.TabCur = index;
        },
		swiperChange(e) {
			this.TabCur = e.target.current;
		},
    }
}
</script>

<style>
</style>
