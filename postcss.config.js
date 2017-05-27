const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    pxtorem({
      rootValue: 100,
      propWhiteList: []
    })
  ],
};