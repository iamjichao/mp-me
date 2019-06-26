//plan.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
const calendar = require('../../utils/calendar.js');
import NumberAnimate from "../../utils/NumberAnimate";

Page({
  data: {
    date: '',
    lunarDate: '',
    num1: '0',
    num2: '0',
    num3: '0',
    num4: '0',
    curPlan: {}
  },
  animate: function() {
    this.setData({
      num1: '0',
      num2: '0'
    });
    let num1 = this.data.curPlan.remainDay;
    let n1 = new NumberAnimate({
      from: num1,//开始时的数字
      speed: 1000,// 总时间
      refreshTime: 50,// 刷新一次的时间
      decimals: 0,//小数点后的位数
      onUpdate: () => {//更新回调函数
        this.setData({
          num1: Number(n1.tempValue).toLocaleString()
        });
      },
      onComplete: () => {//完成回调函数
      }
    });
    let num2 = this.data.curPlan.remainHour;
    let n2 = new NumberAnimate({
      from: num2,
      speed: 1500,
      decimals: 0,
      refreshTime: 50,
      onUpdate: () => {
        this.setData({
          num2: Number(n2.tempValue).toLocaleString()
        });
      },
      onComplete: () => {}
    });
    let num3 = this.data.curPlan.remainMinute;
    let n3 = new NumberAnimate({
      from: num3,
      speed: 2000,
      refreshTime: 50,
      decimals: 0,
      onUpdate: () => {
        this.setData({
          num3: Number(n3.tempValue).toLocaleString()
        });
      },
      onComplete: () => {
        clearInterval(this.mTimer);
        this.mTimer = setInterval(() => {
          const durMinute = this.data.curPlan.remainMinute - 1;
          if (durMinute > 0) {
            this.setData({
              curPlan: {
                ...this.data.curPlan,
                remainMinute: durMinute
              },
              num3: durMinute.toLocaleString()
            });
          } else {
            clearInterval(this.mTimer);
          }
        }, 60000);
      }
    });
    let num4 = this.data.curPlan.remainSecond;
    let n4 = new NumberAnimate({
      from: num4,
      speed: 2500,
      refreshTime: 50,
      decimals: 0,
      onUpdate: () => {
        this.setData({
          num4: Number(n4.tempValue).toLocaleString()
        });
      },
      onComplete: () => {
        this.sTimer = setInterval(() => {
          const durSecond = this.data.curPlan.remainSecond - 1;
          if (durSecond > 0) {
            this.setData({
              curPlan: {
                ...this.data.curPlan,
                remainSecond: durSecond
              },
              num4: durSecond.toLocaleString()
            });
          } else {
            clearInterval(this.sTimer);
          }
        }, 1000);
      }
    });
  },
  deletePlan: function() {
    wx.showModal({
      title: '',
      content: '删除后无法恢复，确定删除吗？',
      confirmColor: '#19aad1',
      success: e => {
        if (e.confirm) {
          const plan = wx.getStorageSync('plan') || [];
          const planList = [];
          for (let i = 0; i < plan.length; i++) {
            if (plan[i].id !== this.data.curPlan.id) {
              planList.push(plan[i]);
            }
          }
          wx.setStorageSync('plan', planList);
          wx.showToast({
            title: '已删除',
            duration: 1500
          });
          setTimeout(() => {
            wx.reLaunch({
              url: '../list/list'
            });
          }, 1500);
        }
      }
    });
  },
  onLoad: function(options) {
    console.log(options);
    const plan = wx.getStorageSync('plan') || [];
    let curPlan = {};
    for (let i = 0; i < plan.length; i++) {
      if (plan[i].id === options.id) {
        const dlArr = plan[i].deadline.split('-');
        const item = {
          id: plan[i].id,
          title: plan[i].title,
          remark: plan[i].remark,
          deadline: `${dlArr[0]}年${dlArr[1]}月${dlArr[2]}日`
        }
        const remainTime = new Date(plan[i].deadline).getTime() - new Date().getTime();
        const remainSecond = Math.ceil(remainTime / 1000);
        const remainMinute = Math.ceil(remainTime /1000 / 60);
        const remainHour = Math.ceil(remainTime / 1000 / 60 / 60)
        const remainDay = Math.ceil(remainTime / 1000 / 60 / 60 / 24);
        item.remainSecond = remainSecond > 0 ? remainSecond : 0;
        item.remainMinute = remainMinute > 0 ? remainMinute : 0;
        item.remainHour = remainHour > 0 ? remainHour : 0;
        item.remainDay = remainDay > 0 ? remainDay : 0;
        if (remainDay <= 7) {
          item.numColor = '#f05050';
        } else if (remainDay <= 30) {
          item.numColor = '#fad733';
        } else {
          item.numColor = '#19aad1';
        }
        curPlan = item;
        break;
      }
    }
    this.setData({ curPlan }, () => {
      this.animate();
    });
    const date = util.formatTime(new Date().getTime(), 'yyyy年MM月dd日', true);
    const lunarDate = calendar.solar2lunar(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    const months = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"];
    const days = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
    this.setData({
      date,
      lunarDate: `${lunarDate.lYear}${lunarDate.gzYear}年${months[lunarDate.lMonth-1]}${days[lunarDate.lDay-1]}`,
    });
  },
  onUnload: function() {
    clearInterval(this.mTimer);
    clearInterval(this.sTimer);
  }
})
