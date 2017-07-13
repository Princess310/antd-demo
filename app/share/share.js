
// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import request from 'utils/shareRequest';

// Import root app
import ShareAppPage from 'share/containers/ShareAppPage';

import 'sanitize.css/sanitize.css';

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
    <ShareAppPage />,
    document.getElementById('app')
  );
};

// render
request.doGet('user/js-api-config', {
  url: encodeURIComponent(location.href.split('#')[0]),
})
  .then((res) => {
    let { list } = res;
    list.debug = false;

    wx.config(list);
    render();
  })
  .catch(() => {
    render();
  });
// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}