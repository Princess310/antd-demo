import moment from 'moment/moment';
import locale_zh_cn from 'moment/locale/zh-cn';

moment.locale('zh-cn', locale_zh_cn);

const DEFAULT_FORMAT_DATE = 'YYYY-MM-DD HH:mm:ss';
// the time check value: 1 day for now
const CHECK_DEFAULT_TIME = 24 * 60 * 60 * 1000;

function zeroFull(str) {
  return str >= 10 ? str : `0${str}`;
}

const dateUtil = {
  /**
  * [format 时间戳格式化]
  * @param  {[Number || Object]} date   [时间戳或Date对象]
  * @param  {[转换格式]} format [需要转换的格式，不传则用DEFAULT_FORMAT_DATE]
  * @return {[String]}        [格式化后的时间]
  */
  format: (date, format) => {
    if (!format) {
      format = DEFAULT_FORMAT_DATE;
    }

    const m = moment(date);
    const dateStr = m.format(format);
    return dateStr;
  },
  /**
   * [dateSinceToday 计算日期距离当前时间多久]
   * @param  {[Number || Object]} date   [时间戳或Date对象]
   * @return {[String]}      [计算结果 如: 1分钟前]
   */
  dateSinceToday: (date) => {
    const value = moment(date).fromNow();
    return value;
  },
  /**
   * [getParseTime description]
   * @param  {[String]} times [Unix 时间戳]
   * @return {[String]}       [返回时间的时分 如12:20]
   */
  getParseTime: (times) => {
    const date = new Date(times * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${zeroFull(hours)}:${zeroFull(minutes)}`;
  },
  /**
   * [getRoundTimeStr 获取当前时间戳+1000-99999之间的随机数]
   * @return {[String]} [随机数]
   */
  getRoundTimeStr: () => {
    const date = new Date();
    const times = Math.round(date.getTime() / 1000);

    // 获取10000 ~ 99999之间的随机数
    const min = 1000;
    const max = 99999;
    const diff = max - min;
    const num = Math.round(Math.random() * diff) + min;

    return String(times) + num;
  },
  /**
   * [getTimeForNow 获取当前日期的时间戳]
   * @return {[Number]} [时间戳]
   */
  getTimeForNow: () => (new Date()).getTime(),
  /**
   * [checkDiffDate 判断2个日期间隔是否超过一定的时间]
   * @param  {[Number]} date1    [时间戳 小]
   * @param  {[Number]} date2    [时间戳 大]
   * @param  {[Number]} checkVal [时间间隔时间出戳]
   * @return {[Boolean]}          [判断结果]
   */
  checkDiffDate: (date1, date2, checkVal) => {
    if (!checkVal) {
      checkVal = CHECK_DEFAULT_TIME;
    }
    return ((date2 - date1) > checkVal);
  },
  /**
   * [isInSameDay 2个日期是否在相同一天]
   * @param  {[Number]}  date1 [时间戳1]
   * @param  {[Number]}  date2 [时间戳2]
   * @return {Boolean}       [判断结果]
   */
  isInSameDay: (date1, date2) => ((new Date(date1)).getDate() === (new Date(date2)).getDate()),
  getMonthNumber: (times) => {
    const date = new Date(times * 1000);

    return (date.getMonth() + 1);
  },
  /**
   * [getDayNumber 获取日期的天]
   * @param  {[Number]} times [时间戳]
   * @return {[Number]}       [天]
   */
  getDayNumber: (times) => {
    const date = new Date(times * 1000);

    return date.getDate();
  },
  parseDate: (value) => {
    const time = dateUtil.getTimeForNow();
    const dateStr = value * 1000;
    const diffTime = 1000 * 60 * 60 * 24 * 7; // 7 days diff
    let result;

    if (dateUtil.checkDiffDate(dateStr, time, diffTime)) {
      result = dateUtil.format(dateStr, 'YYYY-MM-DD');
    } else {
      result = dateUtil.dateSinceToday(value * 1000);
    }

    return result;
  },
};

export default dateUtil;
