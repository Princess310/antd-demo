
// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import request from 'utils/shareRequest';
import { setHongbaoInfo } from 'utils/utils';

// Import root app
import App from 'share/containers/App';

import 'sanitize.css/sanitize.css';

// Import Swiper css
import 'styles/swiper.scss';

// Import fast click
import FastClick from 'assets/lib/fastclick';


// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!../favicon.ico';
import '!file-loader?name=[name].[ext]!../manifest.json';
import 'file-loader?name=[name].[ext]!../.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

// Import CSS reset and Global Styles
import '../global-styles';

// inject fast click
FastClick.attach(document.body);

const render = (messages) => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
};

// render
request.doGet('user/js-api-config', {
  url: encodeURIComponent(location.href.split('#')[0]),
})
  .then((res) => {
    let { data, list } = res;
    list.debug = false;

    wx.config(list);
    setHongbaoInfo(data);
    render();
  })
  .catch(() => {
    render();
  });
// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed, for share page, it cause some err for realod page by offline mode
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }