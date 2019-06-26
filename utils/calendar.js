/**
 * 公历[1900-1-31,2100-12-31]时间区间内的公历、农历互转
 * @公历转农历：solar2lunar(1987,11,01);
 * @农历转公历：lunar2solar(1987,09,10);
 **/

const lunarInfo = [
0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 
0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, 0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, 0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, 0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, 0x0d520
]

// 公历每个月份的天数普通表
const solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// 获取农历y年一整年的总天数
const lYearDays = y => {
  var i, sum = 348;
  for (i = 0x8000; i > 0x8; i >>= 1) {
    sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
  }
  return (sum + leapDays(y));
}

// 获取农历y年闰月是哪个月；若y年没有闰月 则返回0
const leapMonth = y => {
  return (lunarInfo[y - 1900] & 0xf);
}

// 获取农历y年闰月的天数；若该年没有闰月则返回0
const leapDays = y => {
  if (leapMonth(y)) {
    return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
  }
  return (0);
}

// 获取农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
const monthDays = (y, m) => {
  if (m > 12 || m < 1) {
    return -1
  }
  return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}

// 获取公历y年m月的天数
const solarDays = (y, m) => {
  if (m > 12 || m < 1) {
    return -1;
  }
  var ms = m - 1;
  if (ms == 1) {
    // 2月份的闰平规律测算后确认返回28或29
    return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
  } else {
    return (solarMonth[ms]);
  }
}

// 农历年份转换为干支纪年
const toGanZhiYear = y => {
  // 天干地支之天干速查表
  var Gan = ["\u7532", "\u4e59", "\u4e19", "\u4e01", "\u620a", "\u5df1", "\u5e9a", "\u8f9b", "\u58ec", "\u7678"];
  // 天干地支之地支速查表
  var Zhi = ["\u5b50", "\u4e11", "\u5bc5", "\u536f", "\u8fb0", "\u5df3", "\u5348", "\u672a", "\u7533", "\u9149", "\u620c", "\u4ea5"];
  var ganKey = (y - 3) % 10;
  var zhiKey = (y - 3) % 12;
  if (ganKey == 0) ganKey = 10;// 如果余数为0则为最后一个天干
  if (zhiKey == 0) zhiKey = 12;// 如果余数为0则为最后一个地支
  return Gan[ganKey - 1] + Zhi[zhiKey - 1];
}

// 公历月、日判断所属星座
const toAstro = (m, d) => {
  var s = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
  var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 23, 22];
  return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2) + "\u5ea7";//座
}

// 传入公历年月日获得详细的公历、农历 JSON object信息
const solar2lunar = (y, m, d) => {
  // 年份限定
  if (y < 1900 || y > 2100) {
    return -1;
  }
  // 公历传参最下限
  if (y == 1900 && m == 1 && d < 31) {
    return -1;
  }
  // 未传参;获得当天
  var objDate = null;
  if (!y) {
    objDate = new Date();
  } else {
    objDate = new Date(y, parseInt(m) - 1, d)
  }
  var i, leap = 0, temp = 0;
  // 修正ymd参数
  var y = objDate.getFullYear(),
      m = objDate.getMonth() + 1,
      d = objDate.getDate();
  var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
  for (i = 1900; i < 2101 && offset > 0; i++) {
    temp = lYearDays(i);
    offset -= temp;
  }
  if (offset < 0) {
    offset += temp;
    i--;
  }
  // 是否今天
  var isTodayObj = new Date(),
      isToday = false;
  if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
    isToday = true;
  }
  // 农历年
  var year = i;
  // 闰哪个月
  var leap = leapMonth(i);
  var isLeap = false;
  // 效验闰月
  for (i = 1; i < 13 && offset > 0; i++) {
    if (leap > 0 && i == (leap + 1) && isLeap == false) {
      --i;
      isLeap = true;
      temp = leapDays(year);
    } else {
      temp = monthDays(year, i);
    }
    // 解除闰月
    if (isLeap == true && i == (leap + 1)) {
      isLeap = false;
    }
    offset -= temp;
  }
  // 闰月导致数组下标重叠取反
  if (offset == 0 && leap > 0 && i == leap + 1) {
    if (isLeap) {
      isLeap = false;
    } else {
      isLeap = true; --i;
    }
  }
  if (offset < 0) {
    offset += temp; --i;
  }
  // 农历月
  var month = i;
  // 农历日
  var day = offset + 1;
  // 指定日期与 1900/1/1 相差天数
  var dayCyclical = Date.UTC(y, m - 1, d, 0, 0, 0, 0) / 86400000 + 25567 + 10;
  var gzY = toGanZhiYear(year);
  var astro = toAstro(m, d);
  return {
    lYear: year,
    lMonth: month,
    lDay: day,
    cYear: y,
    cMonth: m,
    cDay: d,
    isToday: isToday,
    isLeap: isLeap,
    gzYear: gzY,
    astro: astro
  };
}

// 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历 JSON object信息
const lunar2solar = (y, m, d, isLeapMonth) => {
  // 年份限定
  if (y < 1900 || y > 2100) {
    return -1;
  }
  // 农历传参最上限
  if (y == 2100 && m == 12 && d > 1) {
    return -1;
  }
  var isLeapMonth = !!isLeapMonth;
  var _month = leapMonth(y);
  if (isLeapMonth && (_month != m)) {
    // 计算得出的闰月与传参的月份不同
    return -1;
  }
  var day = monthDays(y, m);
  var _day = day;
  if (isLeapMonth) {
    _day = leapDays(y, m);
  }
  if (d > _day) {
    // 传参的日期大于计算得出的农历当月的天数
    return -1;
  }
  // 计算传入时间相对于农历1900年正月初一的时间差
  var offset = 0;
  for (var i = 1900; i < y; i++) {
    offset += lYearDays(i);
  }
  for (var i = 1; i < m; i++) {
    if (i == leapMonth) {
      // 处理闰月
      offset += leapDays(y);
    }
    offset += monthDays(y, i);
  }
  // 如果是闰月，需补充该年闰月的前一个月的时差
  if (isLeapMonth) {
    offset += day;
  }
  // 农历1900年正月初一的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
  var stmap = Date.UTC(1900, 0, 30, 0, 0, 0);
  var calObj = new Date((offset + d) * 86400000 + stmap);
  var cY = calObj.getUTCFullYear();
  var cM = calObj.getUTCMonth() + 1;
  var cD = calObj.getUTCDate();
  return solar2lunar(cY, cM, cD);
}

module.exports = {
  solar2lunar: solar2lunar,
  lunar2solar: lunar2solar,
  toAstro: toAstro
}
