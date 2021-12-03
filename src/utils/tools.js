/**
 * @name: getMonthData
 * @msg: 获取某年某月的天数信息
 * @param {
 *  year: "2021"，默认值为当年
 *  month: 1 => 1月 默认为当前月
 * }
 * @return []
 */
const getMonthData = (month = new Date().getMonth() + 1, year = new Date().getFullYear()) => {
  month = month+'';
  year = year+"";
  year = year.replace(/\b(0+)/gi, "");
	month = month.replace(/\b(0+)/gi, "");
  year = Number(year); month = Number(month);
  let monthData = [
		{label: "日", mark: 'title'},
		{label: "一", mark: 'title'},
		{label: "二", mark: 'title'},
		{label: "三", mark: 'title'},
		{label: "四", mark: 'title'},
		{label: "五", mark: 'title'},
		{label: "六", mark: 'title'},
	];
  //1、获取当月有多少天
  let monthCount = getMonthDayCount(year, month); 
  //2、当年是不是闰年
  let isBissextile = year%4 == 0 && year%100 != 0 || year%400 == 0;
  //3、当月第一天星期几
  let firstDayOfWeek = getWeekFirstDay(year, month);
  //获取上个月多少天
	let lastMonth = month - 1 > 0 ? month - 1 : 12;
	let lastDays = getMonthDayCount(year, lastMonth);
  //补上上个月缺的天数
  for (let i = 0; i < firstDayOfWeek; i++) {
    monthData.push({
      label: lastDays - firstDayOfWeek + i + 1,
      mark: "prev",
    });
  }
  //填充当月的天数
  for (let i = 0; i < monthCount; i++) {
    monthData.push({ label: i + 1, mark: "current" });
  }
  //补上下个月剩的天数
    if (monthData.length % 7 !== 0) {
			let surplusDay = 7 - (monthData.length % 7);
			for (let i = 0; i < surplusDay; i++) {
				monthData.push({ label: i + 1, mark: "next" });
			}
		}
    //判断是否是当前月  并给当前月做个标记
    let curDay = new Date().getDate();
    let isCurrentMonth = month === new Date().getMonth() + 1 && year === new Date().getFullYear();
    if (isCurrentMonth){
      let index = monthData.findIndex(item => {
        return item.label == curDay && item.mark === 'current'
      })
      monthData[index].mark = "current today";
    }
  return monthData;
};

const getMonthDayCount = (year, month) => {
  return new Date(new Date(year, month, 1).getTime() - 864e5).getDate()
}
const getWeekFirstDay = (year, month) => {
	return new Date(year + "-" + month + "-" + "01").getDay();
};
export default getMonthData;
