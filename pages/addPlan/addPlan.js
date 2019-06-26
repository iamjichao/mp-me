//addPlan.js
const utils = require('../../utils/util.js');
const calendar = require('../../utils/calendar.js');

Page({
  data: {
    curDate: utils.formatTime(new Date().getTime(), 'yyyy-MM-dd'),
    deadline: utils.formatTime(new Date().getTime(), 'yyyy-MM-dd'),
    buttonDisabled: true
  },
  titleInput: function(e) {
    console.log(e.detail.value);
    const value = e.detail.value;
    this.setData({
      buttonDisabled: !value
    })
  },
  deadlineChange: function(e) {
    this.setData({
      deadline: e.detail.value
    });
  },
  addPlan: function(e) {
    const plan = wx.getStorageSync('plan') || [];
    const value = e.detail.value;
    value.id = `plan${new Date().getTime()}`;
    plan.push(value);
    wx.setStorageSync('plan', plan);
    wx.showToast({
      title: '已添加',
      duration: 1500
    });
    setTimeout(() => {
      wx.reLaunch({
        url: '../list/list'
      });
    }, 1500);
  },
  onLoad: function() {
    
  }
})
