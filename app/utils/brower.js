const ua = navigator.userAgent.toLowerCase(); 

const brower = {
  checkIfWeixin: () => {
    return (ua.match(/MicroMessenger/i) == "micromessenger");
  },

  checkIfIOS: () => {
    return (ua.match(/(iphone|ipod|ipad);?/i));
  },

  checkIfAndroid: () => {
    return (ua.match(/android/i));
  },

  checkIphone: () => {
    return (ua.indexOf('iPhone') > -1);
  },

  checkIpad: () => {
    return (ua.indexOf('iPad') > -1);
  },

  checkMobile: () => {
    return ua.match(/AppleWebKit.*Mobile.*/);
  },

  checkIfInMobile: () => {
    return (
      brower.checkIfWeixin() || brower.checkIfIOS() || brower.checkIfAndroid() || 
      brower.checkIphone() || brower.checkIpad() || brower.checkMobile
    );
  },
};

export default brower;