const dateUtil = {
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
  getFormatDate: (times) => {
    const date = new Date(times);
    const y = date.getFullYear();
    const mon = dateUtil.getZeroFull(date.getMonth() + 1);
    const d = dateUtil.getZeroFull(date.getDate());
    const h = dateUtil.getZeroFull(date.getHours());
    const m = dateUtil.getZeroFull(date.getMinutes());
    const s = dateUtil.getZeroFull(date.getSeconds());

    return `${y}-${mon}-${d} ${h}:${m}:${s}`;
  },
  getZeroFull: (n) => (
    Number(n) > 10 ? n : `0${n}`
  ),
};

export default dateUtil;
