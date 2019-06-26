//birth.js
const util = require('../../utils/util.js');
const calendar = require('../../utils/calendar.js');

Page({
  data: {
    showDatePicker: false,
    dateStr: '',
    dateType: ''
  },
  handleLunarDate: function(date) {
    const months = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"];
    const days = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
    const l = date.length;
    const lunarYear = date.substring(0, 4);
    const lunarMonth = date.substring(l-4, l-2);
    const lunarDay = date.substring(l-2, l);
    const isLeap = date.indexOf('闰') > -1;
    const dateInfo = calendar.lunar2solar(Number(lunarYear), months.indexOf(lunarMonth) + 1, days.indexOf(lunarDay)+1, isLeap);
    const y = dateInfo.cYear;
    const m = dateInfo.cMonth < 10 ? `0${dateInfo.cMonth}` : dateInfo.cMonth;
    const d = dateInfo.cDay < 10 ? `0${dateInfo.cDay}` : dateInfo.cDay;
    return `${y}-${m}-${d}`;
  },
  submit: function(e) {
    const dateType = e.detail.dateType;
    const isLunar = dateType === '农历';
    let dateStr = e.detail.dateStr;
    if (dateType === '农历') {
      dateStr = this.handleLunarDate(dateStr);
    }
    wx.setStorageSync('birth', {
      isLunar,
      dateStr,
      lunarDateStr: isLunar ? e.detail.dateStr : ''
    });
    wx.redirectTo({
      url: '../index/index'
    });
  },
  onLoad: function() {
    this.setData({
      showDatePicker: true
    });
    // if (wx.getStorageSync('birth')) {
    //   wx.reLaunch({
    //     url: '../index/index'
    //   });
    //   return;
    // }
  }
})
