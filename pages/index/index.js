//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
const calendar = require('../../utils/calendar.js');
import NumberAnimate from "../../utils/NumberAnimate";

const sentences = [
  '生活不是等待风暴过去，而是学会在雨中翩翩起舞。',
  '学会一个人生活，不论身边是否有人疼爱。做好自己该做的，有爱或无爱，都安然对待。',
  '人有两条路要走，一条是必须走的，一条是想走的，你必须把必须走的路走漂亮，才可以走想走的路。',
  '生活就像一盒巧克力，你永远不知道下一颗是什么味道。',
  '生命可以归结为一种简单的选择：要么忙于生存，要么赶着去死。',
  '生命中真正重要的不是你遭遇了什么，而是你记住了哪些事，又是如何铭记的。',
  '每个人都会有缺陷，就像被上帝咬过的苹果，有的人缺陷比较大，正是因为上帝特别喜欢他的芬芳。',
  '生活不可能像你想象的那么好，但也不会像你想象的那么糟。人的脆弱和坚强都超乎自己的想象。',
  '世界上最宽阔的是海洋，比海洋更宽阔的是天空，比天空更宽阔的是人的心灵。',
  '记住该记住的，忘记该忘记的。改变能改变的，接受不能改变的。',
  '每一天都是一个新的日子。走运当然是好的，不过我情愿做到分毫不差。这样，运气来的时候，你就有所准备了。',
  '生活总是让我们遍体鳞伤，但到后来，那些受伤的地方一定会变成我们最强壮的地方。',
  '每天给自己一个希望，努力做好自己，不为明天烦恼，不为昨天叹息。当梦想还在，告诉自己：努力，总能遇见更好的自己！',
  '所有漂亮的结果都是在行动中收获的，你不需要很厉害才能开始，但你需要开始，才能变得很厉害。',
  '只要面对着阳光努力向上，日子就会变得单纯而美好。',
  '失去了昨日的繁星并不可怕，可怕的是你又错过了今天的朝阳。',
  '勇敢地迎接逆境，即使不能实现最初的梦想，也会打开另一扇梦想的大门。',
  '现实是此岸，理想是彼岸，中间隔着湍急的河流，行动则是架在河上的桥梁。',
  '对于攀登者来说，失掉往昔的足迹并不可惜，迷失了继续前时的方向却很危险。',
  '人生的价值，并不是用时间，而是用深度去衡量的。'
];

Page({
  onShareAppMessage: function(res) {
    return {
      title: '今天的我',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    per: 0,
    lPer: 0,
    percent: 0,
    lPercent: 0,
    year: '2018',
    lYear: '2018',
    date: '',
    lunarDate: '',
    num1: '0',
    num2: '0',
    num3: '0',
    num4: '0',
    durDay: 0,
    durHour: 0,
    durMinute: 0,
    durSecond: 0,
    sentence: '',
    birthday: '',
    isBirthday: false,
    age: 0,
    astro: ''
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.clearStorageSync('birth');
    wx.redirectTo({
      url: '../birth/birth'
    });
  },
  swiperChange: function(e) {
    const current = e.detail.current;
    if (current === 0) {
      // this.animate();
      // this.setData({
      //   percent: 0,
      //   lPercent: 0
      // });
    } else if (current === 1) {
      this.setData({
        percent: this.data.per,
        lPercent: this.data.lPer
      });
    } else if (current === 2) {
      // this.setData({
      //   percent: 0,
      //   lPercent: 0
      // });
    }
  },
  animate: function() {
    this.setData({
      num1: '0',
      num2: '0',
      num3: '0',
      num4: '0'
    });
    let num1 = this.data.durDay;
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
    let num2 = this.data.durHour;
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
    let num3 = this.data.durMinute;
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
          const durMinute = this.data.durMinute + 1;
          this.setData({
            durMinute,
            num3: durMinute.toLocaleString()
          });
        }, 60000);
      }
    });
    let num4 = this.data.durSecond;
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
        clearInterval(this.sTimer);
        this.sTimer = setInterval(() => {
          const durSecond = this.data.durSecond + 1;
          this.setData({
            durSecond,
            num4: durSecond.toLocaleString()
          });
        }, 1000);
      }
    });
  },
  onLoad: function () {
    const birth = wx.getStorageSync('birth');
    if (!birth) {
      wx.redirectTo({
        url: '../birth/birth'
      });
      return;
    }
    if (birth.isLunar) {
      this.setData({
        birthday: birth.lunarDateStr
      });
    } else {
      const birthArr = birth.dateStr.split('-');
      this.setData({
        birthday: `${birthArr[0]}年${birthArr[1]}月${birthArr[2]}日`
      });
    }
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
    const date = util.formatTime(new Date().getTime(), 'yyyy年MM月dd日', true);
    const lunarDate = calendar.solar2lunar(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    const months = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"];
    const days = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
    // const birthYear = birth.dateStr.substring(0, 4);
    const birthMonth = birth.dateStr.substring(5, 7);
    const birthday = birth.dateStr.substring(8);
    const astro = calendar.toAstro(+birthMonth, +birthday);
    this.setData({
      year: date.substring(0, 4),
      lYear: `${lunarDate.lYear}`,
      date,
      lunarDate: `${lunarDate.lYear}${lunarDate.gzYear}年${months[lunarDate.lMonth-1]}${days[lunarDate.lDay-1]}`,
      astro
    });
    // 获取当前时间与生日的毫秒差
    const seconds = new Date().getTime() - new Date(birth.dateStr).getTime() + 28800 * 1000;
    const durSecond = Math.floor(seconds / 1000);
    const durMinute = Math.floor(durSecond / 60);
    const durHour = Math.floor(durSecond / 3600);
    const durDay = Math.floor(durSecond / 86400);
    this.setData({
      durDay,
      durHour,
      durMinute,
      durSecond
    }, () => {
      this.animate();
    });
    // 计算进度条
    const year = date.substring(0, 4);
    const start = new Date(year).getTime();
    const end = new Date(`${Number(year)+1}`).getTime();
    const LStart = calendar.lunar2solar(lunarDate.lYear, 1, 1);
    const lStart = new Date(`${LStart.cYear}-${LStart.cMonth < 10 ? ('0' + LStart.cMonth) : LStart.cMonth}-${LStart.cDay < 10 ? ('0' + LStart.cDay): LStart.cDay}`).getTime();
    const LEnd = calendar.lunar2solar(lunarDate.lYear+1, 1, 1);
    const lEnd = new Date(`${LEnd.cYear}-${LEnd.cMonth < 10 ? ('0' + LEnd.cMonth) : LEnd.cMonth}-${LEnd.cDay < 10 ? ('0' + LEnd.cDay) : LEnd.cDay}`).getTime();
    const now = new Date().getTime();
    const per = (now - start + 28800 * 1000) / (end - start);
    const lPer = (now - lStart + 28800 * 1000) / (lEnd - lStart);
    this.setData({
      per: Math.floor(per * 100),
      lPer: Math.floor(lPer * 100)
    });
    // 判断当天是否为生日
    let isBirthday = false;
    if (birth.isLunar) {
      const l = birth.lunarDateStr.length;
      isBirthday = birth.lunarDateStr.substring(l-4, l) === `${months[lunarDate.lMonth - 1]}${days[lunarDate.lDay - 1]}`;
    } else {
      const l = birth.dateStr.length;
      isBirthday = birth.dateStr.substring(l-5, l) === util.formatTime(new Date().getTime(), 'MM-dd');
    }
    if (isBirthday) {
      this.setData({
        isBirthday,
        age: year - birth.dateStr.substring(0, 4)
      });
    } else {
      // 随机句子
      const random = Math.floor(Math.random() * 20);
      this.setData({
        sentence: sentences[random]
      });
    }
  },
  onUnload: function() {
    clearInterval(this.mTimer);
    clearInterval(this.sTimer);
  }
})
