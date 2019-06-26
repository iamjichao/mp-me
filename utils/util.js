const formatTime = (time, format = 'yyyy-MM-dd HH:mm:ss', showSingleNum = false) => {
  if (!time || typeof time !== 'number') {
    return '';
  }

  const fixZero = function (num) {
    if (num < 10 && !showSingleNum) {
      return `0${num}`;
    }

    return num;
  };

  const timeObj = new Date(time);

  const fullYear = timeObj.getFullYear();
  const year = fullYear.toString().slice(2);
  const month = timeObj.getMonth() + 1;
  const day = timeObj.getDate();
  const hour = timeObj.getHours();
  const minute = timeObj.getMinutes();
  const second = timeObj.getSeconds();

  return format
    .replace(/yyyy/g, fullYear)
    .replace(/yy/g, year)
    .replace(/MM/g, fixZero(month))
    .replace(/dd/g, fixZero(day))
    .replace(/HH/g, fixZero(hour))
    .replace(/mm/g, fixZero(minute))
    .replace(/ss/g, fixZero(second));
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
