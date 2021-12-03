<template>
  <view class="calendar">
    <h3 class='month-title'>
      {{currentYear+' 年 '+currentMonth+' 月 '+ currentDay+' 日'}}
      <span @click='takeBack'>回到今日</span>
    </h3>
   <ul class='calendar-wrap'>
      <li v-for="(weekItem, weekIndex) in monthDay" :key='weekIndex' :class='weekItem.mark' @click='dayClick(weekItem)'>{{weekItem.label}}</li>
    </ul>
  </view>
</template>

<script>
const {Solar, Lunar, HolidayUtil} = require('lunar-javascript')
import getMonthData from "../../../utils/tools"
import './index.scss'

export default {
  data() {
    return {
      monthDay: [],
      changeInfo: {
        isChange: false,
        mark: ''
      }
    }
  },
  props: ['currentYear', 'currentMonth', 'currentDay', 'calenderType'],
  mounted(){
    this.getweekData()
  },
  methods: {
    getweekData(){
      this.$nextTick( () => {
        let tmpDate = getMonthData(this.currentMonth, this.currentYear)
        //是否设置非本月的样式
        let { isChange, mark } = this.changeInfo;
        if(isChange){
          let index = tmpDate.findIndex(item => {
            return item.label == this.currentDay && item.mark === 'current';
          })
          tmpDate[index].mark = `${mark} active`;
        }
        //获取对应日历类型的数据
        this.getTypeDate(tmpDate)
      })
    },
    getTypeDate(val) {
      let tmp = [], type = this.calenderType, year = this.currentYear, month = this.currentMonth, day = this.currentDay;
      if(type == 0){
        let data = Solar.fromYmd(year, month, day)
        var l = data.getFestivals();
        for (var i=0, j=l.length; i<j; i++){
          console.log(l[i], '获取阳历');
        }
        console.log('获取阳历',data, l)
      }else if(type == 1){
        console.log('获取阴历')

      }else if(type == 2){
        console.log('获取佛历')
      }else{
        console.log('获取道历')
      }

      this.monthDay = tmp.length || val;
    },
      dayClick(row){
        let mark = row.mark;
        if(mark == 'title') return;
        this.clearAllActive()
        let curIndex = -1;
        curIndex = this.monthDay.findIndex(item => {
          return item.label == row.label && item.mark === mark;
        })
        if(mark.indexOf('today') == -1){
          this.monthDay[curIndex].mark = `${mark} active`;
        }
        if(mark.indexOf('prev') != -1 || mark.indexOf('next') !== -1){
          this.monthChangeHandler(mark, row.label)
        }else if(mark.indexOf('today') == -1){
          this.changeInfo = {
            isChange: true,
            type: 'current'
          }
          this.$emit('eventClick', {
          "month": this.currentMonth,
          "year": this.currentYear,
          'day': row.label })
        }
      },
      takeBack(){
        this.changeInfo.isChange = false;
        this.clearAllActive()
        this.$emit('eventClick', {
          "month": new Date().getMonth() + 1,
          "year": new Date().getFullYear(),
          'day': new Date().getDate() })
      },
      clearAllActive(){
        for (let i = 0; i < this.monthDay.length; i++) {
          if(this.monthDay[i].mark.indexOf('active') != -1){
            this.monthDay[i].mark = this.monthDay[i].mark.replace(/ active/g, '')
          }
        }
      },
      monthChangeHandler(type, day){
        let count = this.currentMonth;
        let year = this.currentYear;
        if(type == 'next'){
          count ++;
          if(count > 12){
            year ++;
            count = 1;
          }
        }else{
          count --;
          if(count == 0){
            year --;
            count = 12;
          }
        }
        this.$emit('eventClick', {
          "month": count,
          "year": year,
          day })
        this.changeInfo = this.isChangeHandler(type, day)
      },
      //重新定位下个月或上个月
      isChangeHandler(val, day){
        let obj = {
          isChange: false,
          mark: ''
        };
        this.monthDay.map(item => {
          if(item.label == day && item.mark.indexOf(val) != -1){
            obj.isChange = true;
            obj.mark = val;
          }
        })
        return obj;
      }
  },
}
</script>

