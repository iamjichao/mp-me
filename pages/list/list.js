//list.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
const calendar = require('../../utils/calendar.js');
import NumberAnimate from "../../utils/NumberAnimate";

Page({
  onShareAppMessage: function(res) {
    return {
      title: '今天的我',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(() => {
      // complete
      this.load();
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 800);
  },
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    planList: [],
    haveBirthday: false,
    num1: '0',
    durDay: 0
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  animate: function() {
    this.setData({
      num1: '0'
    });
    let num1 = this.data.durDay;
    let n1 = new NumberAnimate({
      from: num1,//开始时的数字
      speed: 1000,// 总时间
      refreshTime: 50,// 刷新一次的时间
      decimals: 0,//小数点后的位数
      onUpdate: () => {//更新回调函数
        this.setData({
          // num1: Number(n1.tempValue).toLocaleString()
          num1: n1.tempValue
        });
      },
      onComplete: () => {//完成回调函数
      }
    });
  },
  load: function() {
    // 计划list
    const plan = wx.getStorageSync('plan') || [];
    const planList = [];
    for (let i = 0; i < plan.length; i++) {
      const item = {
        id: plan[i].id,
        title: plan[i].title,
        remark: plan[i].remark
      }
      const remainDay = Math.ceil((new Date(plan[i].deadline).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24);
      item.remainDay = remainDay > 0 ? remainDay : 0;
      if (remainDay <= 7) {
        item.numColor = '#f05050';
      } else if (remainDay <= 30) {
        item.numColor = '#fad733';
        // item.numColor = '#ffed4c';
      } else {
        item.numColor = '#19aad1';
      }
      planList.push(item);
    }
    function compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    }
    planList.sort(compare('remainDay'))
    this.setData({ planList });
    // 生日item
    const birth = wx.getStorageSync('birth');
    if (birth) {
      // 获取当前时间与生日的毫秒差
      const seconds = new Date().getTime() - new Date(birth.dateStr).getTime() + 28800 * 1000;
      const durSecond = Math.floor(seconds / 1000);
      const durMinute = Math.floor(durSecond / 60);
      const durHour = Math.floor(durSecond / 3600);
      const durDay = Math.floor(durSecond / 86400);
      this.setData({
        haveBirthday: true,
        durDay
      }, () => {
        this.animate();
      });
    } else {
      this.setData({
        haveBirthday: false,
        durDay: 0
      });
    }
  },
  onLoad: function() {
    const date = util.formatTime(new Date().getTime(), 'yyyy年MM月dd日', true);
    wx.setNavigationBarTitle({
      title: `今天是${date}`
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
      // 未授权的回调
      app.userInfoNotReadyCallback = res => {
        wx.reLaunch({
          url: '../auth/auth'
        });
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.load();
  },
  onUnload: function() {}
})
