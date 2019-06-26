//auth.js
const app = getApp();
const util = require('../../utils/util.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getUserInfo: function(e) {
    // console.log(e);
    if (e.detail.errMsg === 'getUserInfo:ok') {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      wx.reLaunch({
        url: '../list/list'
      });
    } else {
      wx.showModal({
        title: '',
        content: '需要获取你的昵称头像等信息',
        showCancel: false,
        confirmColor: '#19aad1'
      });
    }
  },
  onLoad: function() {},
  onUnload: function() {}
})
