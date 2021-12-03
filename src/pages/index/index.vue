<template>
  <view class="index-wrap">
    <u-tabs bar-width='200' item-width='260' :list="monthType" name='label' show-bar bold :current="dateInfo.currentType" @change="tabChange"></u-tabs>
    <calendarDom ref='calendarRef' :currentYear='dateInfo.currentYear' :currentMonth='dateInfo.currentMonth' :currentDay='dateInfo.currentDay' :calenderType='dateInfo.currentType' @eventClick='calendarFn'></calendarDom>

    <view style='height:1000px'>

    </view>
    <u-back-top :scroll-top="scrollTop" duration='300' top="300" bottom='120' right='30'></u-back-top>
    <view class='btn-wrap'>
      <u-button size='medium' :plain="true" type="primary" shape="circle" @click='monthChangeHandler("prev")'>上一月</u-button>
      <u-button size='medium' @click="showPicker = true">{{dateInfo.currentYear+'年'}}</u-button>
      <u-button size='medium' :plain="true" type="success" shape="circle"  @click='monthChangeHandler("next")'>下一月</u-button>
    </view>

    <u-picker
      v-model="showPicker"
      title="请选择年份"
      mode='time'
      :params="{year: true}"
      :default-time="dateInfo.defaultYaer"
      :columns='pickerColumns'
      @confirm="handleYearChange"
    >
    </u-picker>
  </view>
</template>

<script>
import './index.scss';
import calendarDom from "../comp/calendar/index.vue"

  export default {
		data() {
			return {
        dateInfo: {
          currentYear: this.$utils.dateFormat("YYYY",new Date()),
          defaultYaer: this.$utils.dateFormat("YYYY-MM-dd",new Date()),
          currentMonth: new Date().getMonth() + 1,
          currentDay: new Date().getDate(),
          currentType: 0
        },
        showPicker: false,
        scrollTop: 0,
        monthType: [{
          label: '阳历',
          count: '推荐'
        },{
          label: '阴历'
        },{
          label: '佛历'
        },{
          label: '道历'
        }]
			}
		},
    components: {
      calendarDom
    },
    mounted() {
    },
		methods: {
      tabChange(val){
        this.dateInfo.currentType = val;
        this.$refs.calendarRef.getweekData()
      },
      calendarFn(row){
        let { year, month, day} = row;
        let {currentYear, currentMonth, currentDay} = this.dateInfo;
        this.dateInfo.currentYear = year || currentYear;
        this.dateInfo.currentMonth = month || currentMonth;
        this.dateInfo.currentDay = day || currentDay;
        this.$refs.calendarRef.getweekData();
      },
      monthChangeHandler(type){
        if(type == 'next'){
          this.dateInfo.currentMonth ++;
          if(this.dateInfo.currentMonth > 12){
            this.dateInfo.currentYear ++;
            this.dateInfo.currentMonth = 1;
          }
        }else{
          this.dateInfo.currentMonth --;
          if(this.dateInfo.currentMonth == 0){
            this.dateInfo.currentYear --;
            this.dateInfo.currentMonth = 12;
          }
        }
        this.$refs.calendarRef.getweekData()
      },
      handleYearChange(val){
        this.dateInfo.defaultYaer = val.year+'-1-1';
        this.dateInfo.currentYear = val.year;
        this.$refs.calendarRef.getweekData()
      }
		},
    onPageScroll(e) {
      this.scrollTop = e.scrollTop;
    },
    onLoad() {},
		onShow() {},
    onHide() {}
	}
</script>

